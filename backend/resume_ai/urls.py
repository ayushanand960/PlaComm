from django.urls import path
from .views import ResumePDFAnalysisAPIView

urlpatterns = [
    path("analyze/", ResumePDFAnalysisAPIView.as_view(), name="resume-analyze"),
]
