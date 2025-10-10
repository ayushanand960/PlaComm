# # training/views.py
# from rest_framework import viewsets, permissions
# from .models import Activity,EvaluationResult
# from .serializers import ActivitySerializer
# from .serializers import EvaluationResultSerializer


# class ActivityViewSet(viewsets.ModelViewSet):
#     serializer_class = ActivitySerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         """
#         Optionally filter by type, e.g. ?type=GD
#         """
#         qs = Activity.objects.all().order_by("-created_at")
#         activity_type = self.request.query_params.get("type")
#         if activity_type:
#             qs = qs.filter(type=activity_type.upper())
#         return qs

#     def perform_create(self, serializer):
#         serializer.save(created_by=self.request.user)
        
# class EvaluationResultViewSet(viewsets.ModelViewSet):
#     queryset = EvaluationResult.objects.all().order_by("-created_at")
#     serializer_class = EvaluationResultSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def create(self, request, *args, **kwargs):
#         # Handle bulk list of students from Excel
#         if isinstance(request.data, list):
#             serializer = self.get_serializer(data=request.data, many=True)
#             serializer.is_valid(raise_exception=True)
#             self.perform_bulk_create(serializer)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return super().create(request, *args, **kwargs)

#     def perform_bulk_create(self, serializer):
#         serializer.save()



# training/views.py
import pandas as pd
from rest_framework.decorators import action
from django.db.models import Avg, F, FloatField,Q
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from users.models import User,Student
from PlacementCoordinator.models import JobPosting
from .models import Activity, EvaluationResult
from .serializers import (
    ActivitySerializer,
    EvaluationResultSerializer,
)
from rest_framework import viewsets, permissions

class ActivityViewSet(viewsets.ModelViewSet):
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = Activity.objects.all().order_by("-created_at")
        t = self.request.query_params.get("type")
        if t:
            qs = qs.filter(type=t.upper())
        return qs

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class EvaluationResultViewSet(viewsets.ModelViewSet):
    queryset = EvaluationResult.objects.all().order_by("-created_at")
    serializer_class = EvaluationResultSerializer
    permission_classes = [permissions.IsAuthenticated]

    # existing bulk create logic remains...

    @action(detail=False, methods=["post"], url_path="upload-excel")
    def upload_excel(self, request):
        """
        Handle Excel upload for an activity:
        - Columns expected: roll_no, name, marks
        - Validates roll_no exists
        - For each valid student creates or updates EvaluationResult
        - Always keeps low-mark students (eligible=False)
        - Reuploading overwrites previous results for that activity/job
        """
        file = request.FILES.get("file")
        activity_id = request.data.get("activity_id")

        if not file or not activity_id:
            return Response(
                {"detail": "Missing file or activity_id."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ▶ Validate activity
        try:
            activity = Activity.objects.get(pk=activity_id)
        except Activity.DoesNotExist:
            return Response(
                {"detail": "Activity not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # ▶ Read Excel
        try:
            df = pd.read_excel(file)
        except Exception as e:
            return Response(
                {"detail": f"Invalid Excel file: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ▶ Normalize & validate columns
        df.columns = [c.lower().strip() for c in df.columns]
        required_cols = {"roll_no", "name", "marks"}
        if not required_cols.issubset(set(df.columns)):
            return Response(
                {"detail": "Excel must contain columns: roll_no, name, marks"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        min_marks = activity.min_marks
        results, invalid = [], []

        with transaction.atomic():
            # 💥 delete previous results for this same Activity + Job
            EvaluationResult.objects.filter(activity=activity, job=activity.job).delete()

            for _, row in df.iterrows():
                roll = str(row.get("roll_no", "")).strip()
                name = str(row.get("name", "")).strip()
                marks_val = row.get("marks", "")

                # skip empty marks
                try:
                    marks = float(marks_val)
                except (ValueError, TypeError):
                    continue

                try:
                    student = User.objects.get(unique_id=roll, role="student")
                except User.DoesNotExist:
                    invalid.append({
                        "roll_no": roll,
                        "name": name,
                        "reason": "Student not found",
                    })
                    continue

                eligible = marks >= min_marks

                EvaluationResult.objects.update_or_create(
                    activity=activity,
                    job=activity.job,
                    student=student,
                    defaults={"marks": marks, "eligible": eligible},
                )

                results.append({
                    "roll_number": roll,
                    "name": (
                        getattr(student, "name", None)
                        or getattr(student, "username", None)
                        or f"{getattr(student, 'first_name', '')} {getattr(student, 'last_name', '')}".strip()
                        or name
                    ),
                    "marks": marks,
                    "eligible": eligible,
                })

        return Response(
            {
                "message": f"Upload complete. {len(results)} processed, {len(invalid)} invalid.",
                "results": results,
                "invalid": invalid,
            },
            status=status.HTTP_201_CREATED,
        )
        
    
class PriorityListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Returns sorted students by average normalized marks (0–100).
        Optional filters:
          ?activity=GD   → only Group Discussion results
          ?job=infosys_01 → only a specific job (job_id)
        """
        activity_filter = request.query_params.get("activity")
        job_filter = request.query_params.get("job")

        results = []
        # distinct students with results
        student_ids = EvaluationResult.objects.values_list("student", flat=True).distinct()

        for sid in student_ids:
            qs = (
                EvaluationResult.objects
                .filter(student_id=sid)
                .select_related("activity", "student", "job")
            )

            if activity_filter:
                qs = qs.filter(activity__type__iexact=activity_filter)
            if job_filter:
                qs = qs.filter(job__job_id=job_filter)

            if not qs.exists():
                continue

            total_norm = 0
            count = 0
            for res in qs:
                max_marks = res.activity.max_marks or 1
                norm = (float(res.marks) / float(max_marks)) * 100
                total_norm += norm
                count += 1

            avg_score = total_norm / count if count else 0
            student = qs.first().student
            results.append({
                "Student_id": student.unique_id,
                "Student_Name": f"{student.first_name} {student.last_name}",
                "Average_score": round(avg_score, 2),
                "Total_activities": count,
            })

        # sort descending
        results.sort(key=lambda x: x["Average_score"], reverse=True)
        
        limit = request.query_params.get("limit")
        if limit:
            try:
                limit = int(limit)
                results = results[:limit]
            except ValueError:
                pass
    
        return Response(results)
    
    
# class PriorityListView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         """
#         Returns students ranked by a weighted score that combines
#         average normalized marks and participation count.

#         Optional filters:
#           ?activity=GD      → only Group Discussion results
#           ?job=infosys_01   → only a specific job (job_id)
#           ?limit=10         → limit number of results
#         """
#         activity_filter = request.query_params.get("activity")
#         job_filter = request.query_params.get("job")
#         limit_param = request.query_params.get("limit")

#         # weights you can tune
#         WEIGHT_MARKS = 0.7
#         WEIGHT_PARTICIPATION = 0.3

#         # total possible distinct activity types for normalizing participation
#         total_possible = Activity.objects.values_list("type", flat=True).distinct().count() or 1

#         results = []
#         student_ids = EvaluationResult.objects.values_list("student", flat=True).distinct()

#         for sid in student_ids:
#             qs = (
#                 EvaluationResult.objects
#                 .filter(student_id=sid)
#                 .select_related("activity", "student", "job")
#             )

#             if activity_filter:
#                 qs = qs.filter(activity__type__iexact=activity_filter)
#             if job_filter:
#                 qs = qs.filter(job__job_id=job_filter)

#             count = qs.count()
#             if count == 0:
#                 continue

#             total_norm = 0
#             for res in qs:
#                 max_marks = res.activity.max_marks or 1
#                 total_norm += (float(res.marks) / float(max_marks)) * 100

#             avg_score = total_norm / count
#             participation_pct = (count / total_possible) * 100
#             final_score = (avg_score * WEIGHT_MARKS) + (participation_pct * WEIGHT_PARTICIPATION)

#             student = qs.first().student
#             results.append({
#                 "Student_id": student.unique_id,
#                 "Student_Name": f"{student.first_name} {student.last_name}",
#                 "Average_score": round(avg_score, 2),
#                 "Total_activities": count,
#                 "Participation_%": round(participation_pct, 2),
#                 "Final_score": round(final_score, 2),
#             })

#         # sort descending by the weighted final score
#         results.sort(key=lambda x: x["Final_score"], reverse=True)

#         # optional limit
#         if limit_param:
#             try:
#                 limit = int(limit_param)
#                 results = results[:limit]
#             except ValueError:
#                 pass

#         return Response(results)