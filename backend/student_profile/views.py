from rest_framework import viewsets, permissions
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from .models import Academic, Experience, Project, Skill, Certification, Document
from .serializers import (
    AcademicSerializer, ExperienceSerializer, ProjectSerializer,
    SkillSerializer, CertificationSerializer, DocumentSerializer
)
from users.authentication import CookieJWTAuthentication


class IsStudentOwner(permissions.BasePermission):
    """
    Allow access only to objects that belong to request.user.student
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        return hasattr(request.user, "student") and obj.student == request.user.student


class BaseStudentViewSet(viewsets.ModelViewSet):
    """
    Common logic for all student-owned viewsets
    """
    permission_classes = [permissions.IsAuthenticated, IsStudentOwner]
    authentication_classes = [CookieJWTAuthentication]
    parser_classes = [JSONParser]  # ✅ default JSON for most models

    def get_queryset(self):
        student = getattr(self.request.user, "student", None)
        if not student:
            return self.queryset.none()
        return self.queryset.filter(student=student).order_by("-created_at")

    def perform_create(self, serializer):
        student = getattr(self.request.user, "student", None)
        serializer.save(student=student)


class AcademicViewSet(BaseStudentViewSet):
    queryset = Academic.objects.all()
    serializer_class = AcademicSerializer


class ExperienceViewSet(BaseStudentViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class ProjectViewSet(BaseStudentViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class SkillViewSet(BaseStudentViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class CertificationViewSet(BaseStudentViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer


class DocumentViewSet(BaseStudentViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    parser_classes = [MultiPartParser, FormParser]  # ✅ only here for file uploads
