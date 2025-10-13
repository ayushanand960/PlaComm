

# from rest_framework import viewsets, permissions
# from .models import Company, DriveQuestion
# from .serializers import CompanySerializer, DriveQuestionSerializer

# class CompanyViewSet(viewsets.ModelViewSet):
#     """
#     Handles CRUD for Company model.
#     Returns all companies with related drive questions.
#     """
#     queryset = Company.objects.all().order_by('name')
#     serializer_class = CompanySerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# class DriveQuestionViewSet(viewsets.ModelViewSet):
#     """
#     Handles CRUD for Drive Questions.
#     Includes student info, company name, and upload date.
#     """
#     serializer_class = DriveQuestionSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]
#     queryset = DriveQuestion.objects.all().order_by('-created_at')

#     def get_queryset(self):
#         """
#         Order by most recent uploads first.
#         Select related fields for optimization.
#         """
#         return DriveQuestion.objects.select_related('uploaded_by', 'company').order_by('-updated_at', '-created_at')

#     def perform_create(self, serializer):
#         """
#         Auto-attach the logged-in student as 'uploaded_by'
#         when they upload a question.
#         """
#         serializer.save(uploaded_by=self.request.user)



from rest_framework import viewsets, permissions
from .models import Company, DriveQuestion
from .serializers import CompanySerializer, DriveQuestionSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().order_by('name')
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class DriveQuestionViewSet(viewsets.ModelViewSet):
    serializer_class = DriveQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = DriveQuestion.objects.all().order_by('-created_at')

    def get_queryset(self):
        """
        Optimized query for DriveQuestions with related user and company.
        """
        return DriveQuestion.objects.select_related('uploaded_by', 'company').order_by('-updated_at', '-created_at')

    def perform_create(self, serializer):
        """
        Auto-attach the logged-in student as 'uploaded_by'
        and auto-create or link Company based on 'drive_name'.
        """
        drive_name = self.request.data.get('drive_name', '').strip()
        company = None

        if drive_name:
            company, _ = Company.objects.get_or_create(
                name__iexact=drive_name,  # case-insensitive match
                defaults={'name': drive_name}
            )

        serializer.save(uploaded_by=self.request.user, company=company)
