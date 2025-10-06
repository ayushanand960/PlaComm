from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from users.authentication import CookieJWTAuthentication
from .models import JobPosting, JobApplication
from .serializers import JobPostingSerializer,JobApplicationSerializer,MyJobApplicationSerializer
from users.models import User


# -------------------------------
# Job Posting List + Create
# -------------------------------
class JobPostingListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get(self, request):
        """Return all job postings (visible to everyone)."""
        jobs = JobPosting.objects.all().order_by("-created_at")
        serializer = JobPostingSerializer(jobs, many=True, context={"request": request})
        return Response(serializer.data)


    def post(self, request):
        """Only Placement Coordinator can create job postings."""
        if request.user.role != "placement_coordinator":
            return Response(
                {"detail": "Only Placement Coordinators can create job postings."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = JobPostingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(coordinator=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------------------
# Job Posting Detail (view, update, delete)
# -------------------------------
class JobPostingDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get(self, request, pk):
        """Anyone can view job details."""
        job = get_object_or_404(JobPosting, pk=pk)
        # serializer = JobPostingSerializer(job)
        serializer = JobPostingSerializer(job, context={"request": request})

        return Response(serializer.data)

    def put(self, request, pk):
        """Coordinator (who posted it) OR Admin can update."""
        job = get_object_or_404(JobPosting, pk=pk)

        if request.user.role not in ["placement_coordinator", "admin"]:
            return Response(
                {"detail": "Not allowed to update this job."},
                status=status.HTTP_403_FORBIDDEN,
            )

        if request.user.role == "placement_coordinator" and job.coordinator != request.user:
            return Response(
                {"detail": "You can only update your own job postings."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = JobPostingSerializer(job, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(coordinator=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """Coordinator (who posted it) OR Admin can delete."""
        job = get_object_or_404(JobPosting, pk=pk)

        if request.user.role not in ["placement_coordinator", "admin"]:
            return Response(
                {"detail": "Not allowed to delete this job."},
                status=status.HTTP_403_FORBIDDEN,
            )

        if request.user.role == "placement_coordinator" and job.coordinator != request.user:
            return Response(
                {"detail": "You can only delete your own job postings."},
                status=status.HTTP_403_FORBIDDEN,
            )

        job.delete()
        return Response({"detail": "Job deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# -------------------------------
# Student Apply / Not Interested
# -------------------------------
class JobApplicationAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def post(self, request, pk):
        """Students can apply or mark not interested for a job."""
        if request.user.role != "student":
            return Response(
                {"detail": "Only students can apply to jobs."},
                status=status.HTTP_403_FORBIDDEN,
            )

        job = get_object_or_404(JobPosting, pk=pk)
        status_choice = request.data.get("status")

        if status_choice not in ["applied", "not_interested"]:
            return Response(
                {"detail": "Invalid status. Use 'applied' or 'not_interested'."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        application, created = JobApplication.objects.update_or_create(
            job=job,
            student=request.user,
            defaults={"status": status_choice},
        )

        return Response(JobApplicationSerializer(application).data, status=status.HTTP_200_OK)

    def get(self, request, pk):
        """List all applications for a given job posting."""
        job = get_object_or_404(JobPosting, pk=pk)
        applications = JobApplication.objects.filter(job=job)
        serializer = JobApplicationSerializer(applications, many=True)
        return Response(serializer.data)

# -------------------------------
# Student’s Applied Jobs
# -------------------------------
class MyJobApplicationsAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get(self, request):
        """List all jobs the logged-in student has applied to or marked not interested."""
        if request.user.role != "student":
            return Response(
                {"detail": "Only students can view their applications."},
                status=status.HTTP_403_FORBIDDEN,
            )

        applications = JobApplication.objects.filter(student=request.user).select_related("job")
        serializer = MyJobApplicationSerializer(applications, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

