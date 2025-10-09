from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Recruiter, Job, JobApplication
from .serializers import RecruiterSerializer, JobSerializer, JobApplicationSerializer
from django.contrib.auth import authenticate


# ---------------- Recruiter Register ----------------
class RecruiterRegisterView(generics.CreateAPIView):
    queryset = Recruiter.objects.all()
    serializer_class = RecruiterSerializer

    def perform_create(self, serializer):
        password = self.request.data.get('password')
        recruiter = serializer.save()
        recruiter.set_password(password)
        recruiter.save()


# ---------------- Recruiter Login ----------------
class RecruiterLoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        recruiter = authenticate(request, email=email, password=password)
        if recruiter:
            refresh = RefreshToken.for_user(recruiter)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "recruiter": RecruiterSerializer(recruiter).data
            })
        return Response({"error": "Invalid credentials"}, status=400)


# ---------------- Job Views ----------------
class JobListCreateView(generics.ListCreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(recruiter=self.request.user)

    def perform_create(self, serializer):
        serializer.save(recruiter=self.request.user)


# ---------------- Applications ----------------
class JobApplicationsView(generics.ListAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        job_id = self.kwargs['job_id']
        return JobApplication.objects.filter(job__id=job_id)
