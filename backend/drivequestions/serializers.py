from rest_framework import serializers
from .models import Company, DriveQuestion

class DriveQuestionSerializer(serializers.ModelSerializer):
    uploaded_by_name = serializers.CharField(source='uploaded_by.username', read_only=True)

    class Meta:
        model = DriveQuestion
        fields = "__all__"


class CompanySerializer(serializers.ModelSerializer):
    questions = DriveQuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ["id", "name", "questions", "created_at"]
