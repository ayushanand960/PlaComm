from rest_framework import serializers
from .models import Academic, Experience, Project, Skill, Certification, Document

class AcademicSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Academic
        fields = "__all__"
        read_only_fields = ["student", "created_at"]

class ExperienceSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Experience
        fields = "__all__"
        read_only_fields = ["student", "created_at"]

class ProjectSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ["student", "created_at"]

class SkillSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Skill
        fields = "__all__"
        read_only_fields = ["student", "created_at"]

class CertificationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    file = serializers.FileField(required=False, allow_null=True)
    class Meta:
        model = Certification
        fields = "__all__"
        read_only_fields = ["student", "created_at"]

class DocumentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    file = serializers.FileField()
    class Meta:
        model = Document
        fields = "__all__"
        read_only_fields = ["student", "uploaded_at"]
