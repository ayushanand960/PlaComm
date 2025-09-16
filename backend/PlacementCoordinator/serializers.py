from rest_framework import serializers
from .models import JobPosting, JobApplication

class JobPostingSerializer(serializers.ModelSerializer):
    coordinator = serializers.ReadOnlyField(source="coordinator.username")
    application_status = serializers.SerializerMethodField()

    class Meta:
        model = JobPosting
        fields = "__all__"  # or list explicitly
        extra_fields = ["application_status"]

    def get_application_status(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return None
        application = obj.applications.filter(student=request.user).first()
        return application.status if application else None



class JobApplicationSerializer(serializers.ModelSerializer):
    student_username = serializers.ReadOnlyField(source='student.username')
    student_email = serializers.ReadOnlyField(source='student.email')
    job_title = serializers.ReadOnlyField(source='job.job_title')

    class Meta:
        model = JobApplication
        fields = [
            "id", "job", "job_title", "student", "student_username",
            "student_email", "status", "applied_at"
        ]
        read_only_fields = ["student", "applied_at"]
