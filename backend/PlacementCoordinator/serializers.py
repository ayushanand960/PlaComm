from rest_framework import serializers
from .models import JobPosting, JobApplication

class JobPostingSerializer(serializers.ModelSerializer):
    coordinator = serializers.ReadOnlyField(source='coordinator.username')

    class Meta:
        model = JobPosting
        fields = "__all__"


class JobApplicationSerializer(serializers.ModelSerializer):
    student = serializers.ReadOnlyField(source='student.username')
    job_title = serializers.ReadOnlyField(source='job.job_title')

    class Meta:
        model = JobApplication
        fields = "__all__"
