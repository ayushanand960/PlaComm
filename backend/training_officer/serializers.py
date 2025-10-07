# training/serializers.py
from rest_framework import serializers
from .models import Activity
from PlacementCoordinator.models import JobPosting
from .models import EvaluationResult

class JobPostingDropdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPosting
        fields = ["job_id", "company_name", "job_title"]

class ActivitySerializer(serializers.ModelSerializer):
    job = JobPostingDropdownSerializer(read_only=True)       # nested job info
    job_id = serializers.SlugRelatedField(      
        slug_field="job_id",
        queryset=JobPosting.objects.all(),
        source="job",
        write_only=True,
    )

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

class EvaluationResultSerializer(serializers.ModelSerializer):
    student_roll_number = serializers.CharField(write_only=True)

    class Meta:
        model = EvaluationResult
        fields = ["id", "activity", "job", "student", "marks", "eligible", "student_roll_number", "created_at"]
        read_only_fields = ["student", "eligible"]

    def create(self, validated_data):
        roll_number = validated_data.pop("student_roll_number")
        marks = validated_data["marks"]

        # Verify student roll number in DB
        try:
            student = User.objects.get(unique_id=roll_number, role="student")
        except User.DoesNotExist:
            raise serializers.ValidationError({"student_roll_number": f"Roll number {roll_number} not found"})

        # Verify eligibility
        activity = validated_data["activity"]
        eligible = marks >= activity.min_marks

        # Create record
        result = EvaluationResult.objects.create(
            student=student,
            eligible=eligible,
            **validated_data
        )
        return result