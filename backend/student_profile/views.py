from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Academic, Experience, Project, Skill, Certification, Document
from .serializers import (
    AcademicSerializer, ExperienceSerializer, ProjectSerializer,
    SkillSerializer, CertificationSerializer, DocumentSerializer
)
from users.authentication import CookieJWTAuthentication  # adjust path if needed

class IsStudentOwner(permissions.BasePermission):
    """
    Allow access only to objects that belong to request.user.student
    """

    def has_permission(self, request, view):
        # require authenticated
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        # obj must have attribute student
        return hasattr(request.user, "student") and obj.student == request.user.student

class BaseStudentViewSet(viewsets.ModelViewSet):
    # common behaviors will be inherited
    permission_classes = [permissions.IsAuthenticated, IsStudentOwner]
    authentication_classes = [CookieJWTAuthentication]
    filterset_fields = []  # add if needed
    parser_classes = [MultiPartParser, FormParser]  # file uploads

    def get_queryset(self):
        # limit to the student's objects
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
