from rest_framework import viewsets, permissions
from .models import Company, DriveQuestion
from .serializers import CompanySerializer, DriveQuestionSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().order_by('name')
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class DriveQuestionViewSet(viewsets.ModelViewSet):
    queryset = DriveQuestion.objects.all().order_by('-created_at')
    serializer_class = DriveQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)
