from rest_framework import serializers
from .models import JobPosting, JobApplication

class JobPostingSerializer(serializers.ModelSerializer):
    coordinator = serializers.ReadOnlyField(source="coordinator.username")
    application_status = serializers.SerializerMethodField()
    job_id = serializers.CharField(read_only=True)

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

class MyJobApplicationSerializer(serializers.ModelSerializer):
    job = JobPostingSerializer(read_only=True)  # full job details inside

    class Meta:
        model = JobApplication
        fields = [
            "id",
            "job",              # nested job info
            "status",
            "applied_at",
            "updated_at",
        ]
#--------------------------------------------------------------------------------------------------
from rest_framework import serializers
from .models import JobPosting, JobApplication
from users.models import Student



class StudentInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['rum_number', 'first_name', 'middle_name', 'last_name', 'email', 'phone']


# 💼 Job details with student list
class JobWithStudentsSerializer(serializers.Serializer):
    job_id = serializers.CharField()
    title = serializers.CharField()
    applications_count = serializers.IntegerField()
    students = StudentInfoSerializer(many=True)


# 🏢 Company summary for dashboard
class CompanySummarySerializer(serializers.Serializer):
    company_name = serializers.CharField()
    total_applications = serializers.IntegerField()
    unique_jobs = serializers.IntegerField()
