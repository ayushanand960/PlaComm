# training/serializers.py
from rest_framework import serializers
from .models import Activity
from PlacementCoordinator.models import JobPosting

class JobPostingDropdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPosting
        fields = ["id", "company_name", "job_title"]

class ActivitySerializer(serializers.ModelSerializer):
    job = JobPostingDropdownSerializer(read_only=True)       # nested job info
    job_id = serializers.PrimaryKeyRelatedField(queryset=JobPosting.objects.all(), source="job", write_only=True)

    class Meta:
        model = Activity
        fields = [
            "id",
            "type",
            "job",
            "job_id",
            "topic",
            "session",
            "date",
            "result_date",
            "max_marks",
            "min_marks",
            "nominee",
            "remark",
            "courses",
            "created_at",
            "updated_at",
        ]