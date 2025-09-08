# job/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from users.authentication import CookieJWTAuthentication 

from .models import JobPosting
from .serializers import JobPostingSerializer
from users.permissions import IsPlacementCoordinator  # import your custom permission


class JobPostingListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated, IsPlacementCoordinator]
    authentication_classes = [CookieJWTAuthentication]


    def get(self, request):
        jobs = JobPosting.objects.all().order_by("-created_at")
        serializer = JobPostingSerializer(jobs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = JobPostingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(coordinator=request.user)  # ✅ logged-in coordinator
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JobPostingDetailAPIView(APIView):
    permission_classes = [IsAuthenticated, IsPlacementCoordinator]
    authentication_classes = [CookieJWTAuthentication]


    def get(self, request, pk):
        job = get_object_or_404(JobPosting, pk=pk)
        serializer = JobPostingSerializer(job)
        return Response(serializer.data)

    def put(self, request, pk):
        job = get_object_or_404(JobPosting, pk=pk)
        serializer = JobPostingSerializer(job, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(coordinator=request.user)  # update with current coordinator
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        job = get_object_or_404(JobPosting, pk=pk)
        job.delete()
        return Response({"detail": "Job deleted successfully"}, status=status.HTTP_204_NO_CONTENT)