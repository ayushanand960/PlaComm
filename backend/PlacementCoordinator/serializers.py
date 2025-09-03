from rest_framework import serializers
from .models import JobPosting

class JobPostingSerializer(serializers.ModelSerializer):
    coordinator = serializers.ReadOnlyField(source='coordinator.username')

    class Meta:
        model = JobPosting
        fields = "__all__"
