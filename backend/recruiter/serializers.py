from rest_framework import serializers
from .models import Recruiter, Job, JobApplication

class RecruiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruiter
        fields = ['id', 'company_name', 'email', 'contact_number']


class JobSerializer(serializers.ModelSerializer):
    recruiter = RecruiterSerializer(read_only=True)

    class Meta:
        model = Job
        fields = '__all__'


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = '__all__'
