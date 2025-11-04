from rest_framework import viewsets, permissions
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from .models import Academic, Experience, Project, Skill, Certification, Document
from .serializers import (
    AcademicSerializer, ExperienceSerializer, ProjectSerializer,
    SkillSerializer, CertificationSerializer, DocumentSerializer
)
from users.authentication import CookieJWTAuthentication
from .models import SocialLink
from .serializers import SocialLinkSerializer


class IsStudentOwner(permissions.BasePermission):
    """
    Allow access only to objects that belong to request.user.student
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        return hasattr(request.user, "student") and obj.student == request.user.student


# class BaseStudentViewSet(viewsets.ModelViewSet):
#     """
#     Common logic for all student-owned viewsets
#     """
#     permission_classes = [permissions.IsAuthenticated, IsStudentOwner]
#     authentication_classes = [CookieJWTAuthentication]
#     parser_classes = [JSONParser]  # ✅ default JSON for most models

#     def get_queryset(self):
#         student = getattr(self.request.user, "student", None)
#         if not student:
#             return self.queryset.none()
#         return self.queryset.filter(student=student).order_by("-created_at")

#     def perform_create(self, serializer):
#         student = getattr(self.request.user, "student", None)
#         serializer.save(student=student)



class BaseStudentViewSet(viewsets.ModelViewSet):
    """
    Common logic for all student-owned viewsets
    """
    permission_classes = [permissions.IsAuthenticated, IsStudentOwner]
    authentication_classes = [CookieJWTAuthentication]
    # allow JSON and multipart form uploads by default
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get_queryset(self):
        student = getattr(self.request.user, "student", None)
        if not student:
            return self.queryset.none()
        # order by PK (id) - works for all models and is predictable
        return self.queryset.filter(student=student).order_by("-id")

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


# class CertificationViewSet(BaseStudentViewSet):
#     queryset = Certification.objects.all()
#     serializer_class = CertificationSerializer


# class DocumentViewSet(BaseStudentViewSet):
#     queryset = Document.objects.all()
#     serializer_class = DocumentSerializer
#     parser_classes = [MultiPartParser, FormParser]  # ✅ only here for file uploads



class CertificationViewSet(BaseStudentViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]  # add this if you upload files here

class DocumentViewSet(BaseStudentViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    parser_classes = [MultiPartParser, FormParser]  # ok


class SocialLinkViewSet(viewsets.ModelViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get_queryset(self):
        student = getattr(self.request.user, "student", None)
        if not student:
            return SocialLink.objects.none()
        return SocialLink.objects.filter(student=student)

    def perform_create(self, serializer):
        serializer.save(student=self.request.user.student)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context




from .serializers import StudentFullProfileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser , AllowAny
from django.shortcuts import get_object_or_404
from users.models import Student

class AdminStudentProfileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, rum_number):
        student = get_object_or_404(Student.objects.select_related("user"), rum_number=rum_number)
        serializer = StudentFullProfileSerializer(student, context={"request": request})
        return Response(serializer.data)
