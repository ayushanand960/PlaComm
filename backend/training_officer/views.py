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
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from users.models import User
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
        - Validates roll_no exists and marks >= min_marks
        - Saves EvaluationResult rows
        """
        file = request.FILES.get("file")
        activity_id = request.data.get("activity_id")

        if not file or not activity_id:
            return Response(
                {"detail": "Missing file or activity_id."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate activity
        try:
            activity = Activity.objects.get(pk=activity_id)
        except Activity.DoesNotExist:
            return Response(
                {"detail": "Activity not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Read Excel
        try:
            df = pd.read_excel(file)
        except Exception as e:
            return Response(
                {"detail": f"Invalid Excel file: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Expected columns
        required_cols = {"roll_no", "name", "marks"}
        if not required_cols.issubset(df.columns.str.lower()):
            return Response(
                {"detail": "Excel must contain columns: roll_no, name, marks"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        results = []
        invalid = []
        min_marks = activity.min_marks

        # Normalize column names
        df.columns = [c.lower() for c in df.columns]

        with transaction.atomic():
            for _, row in df.iterrows():
                roll = str(row["roll_no"]).strip()
                marks = float(row["marks"])
                name = str(row.get("name", "")).strip()

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
                result, created = EvaluationResult.objects.update_or_create(
                    activity=activity,
                    job=activity.job,
                    student=student,
                    defaults={
                        "marks": marks,
                        "eligible": eligible,
                    },
                )
                results.append({
                    "roll_number": roll,
                    "name": getattr(student, "name", None) 
            or getattr(student, "username", None) 
            or f"{getattr(student, 'first_name', '')} {getattr(student, 'last_name', '')}".strip() 
            or name,
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