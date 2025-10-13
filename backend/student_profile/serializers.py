# from rest_framework import serializers
# from .models import Academic, Experience, Project, Skill, Certification, Document 

# class AcademicSerializer(serializers.ModelSerializer):
#     id = serializers.IntegerField(read_only=True)

#     class Meta:
#         model = Academic
#         fields = "__all__"
#         read_only_fields = ["student", "created_at"]

# class ExperienceSerializer(serializers.ModelSerializer):
#     id = serializers.IntegerField(read_only=True)

#     class Meta:
#         model = Experience
#         fields = "__all__"
#         read_only_fields = ["student", "created_at"]

# class ProjectSerializer(serializers.ModelSerializer):
#     id = serializers.IntegerField(read_only=True)

#     class Meta:
#         model = Project
#         fields = "__all__"
#         read_only_fields = ["student", "created_at"]

# class SkillSerializer(serializers.ModelSerializer):
#     id = serializers.IntegerField(read_only=True)

#     class Meta:
#         model = Skill
#         fields = "__all__"
#         read_only_fields = ["student", "created_at"]

# class CertificationSerializer(serializers.ModelSerializer):
#     id = serializers.IntegerField(read_only=True)
#     file = serializers.FileField(required=False, allow_null=True)

#     class Meta:
#         model = Certification
#         fields = "__all__"
#         read_only_fields = ["student", "created_at"]

# class DocumentSerializer(serializers.ModelSerializer):
#     id = serializers.IntegerField(read_only=True)
#     file = serializers.FileField()

#     class Meta:
#         model = Document
#         fields = "__all__"
#         read_only_fields = ["student", "uploaded_at"]




from rest_framework import serializers
from users.models import Student
from PlacementCoordinator.models import JobApplication
from PlacementCoordinator.serializers import JobPostingSerializer
from .models import Academic, Experience, Project, Skill, Certification, Document


# ---------- Related serializers ----------
class AcademicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Academic
        fields = ["degree", "branch", "institute", "year_of_passing", "cgpa"]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ["company", "role", "start_date", "end_date", "description"]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["title", "description", "tech_stack", "repo_link"]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["name", "level"]


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ["name", "provider", "date", "file"]


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ["title", "file", "uploaded_at"]


class JobApplicationMiniSerializer(serializers.ModelSerializer):
    job = JobPostingSerializer(read_only=True)

    class Meta:
        model = JobApplication
        fields = ["id", "status", "applied_at", "job"]


# ---------- Main student serializer ----------
class StudentFullProfileSerializer(serializers.ModelSerializer):
    academics = AcademicSerializer(many=True, read_only=True)
    experiences = ExperienceSerializer(many=True, read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    certifications = CertificationSerializer(many=True, read_only=True)
    documents = DocumentSerializer(many=True, read_only=True)
    applications = JobApplicationMiniSerializer(source="user.applications", many=True, read_only=True)

    class Meta:
        model = Student
        fields = [
            "rum_number",
            "first_name",
            "middle_name",
            "last_name",
            "email",
            "phone",
            "course",
            "branch",
            "year",
            "gender",
            # Related data
            "academics",
            "experiences",
            "projects",
            "skills",
            "certifications",
            "documents",
            "applications",
        ]
