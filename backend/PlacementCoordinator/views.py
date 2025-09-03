from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from .models import JobPosting
from .serializers import JobPostingSerializer
from django.contrib.auth import get_user_model

class IsCoordinator(permissions.BasePermission):
    def has_permission(self, request, view):
        # Customize this: you can check user role field if you have it
        return request.user.is_authenticated and request.user.is_staff  

class JobPostingViewSet(viewsets.ModelViewSet):
    queryset = JobPosting.objects.all().order_by("-created_at")
    serializer_class = JobPostingSerializer
    permission_classes = [permissions.AllowAny]#[permissions.IsAuthenticated, IsCoordinator]

    def perform_create(self, serializer):
        # serializer.save(coordinator=self.request.user)
        User = get_user_model()
        coordinator = User.objects.first()  # ✅ pick the first user in DB  after that replace with coordinator = self.request.user

        serializer.save(coordinator=coordinator)
    # def perform_create(self, serializer):
    #     User = get_user_model()
    #     coordinator = User.objects.first()
    #     if not coordinator:
    #         raise ValueError("⚠️ No users found in the database. Please create a user first.")
    #     serializer.save(coordinator=coordinator)
