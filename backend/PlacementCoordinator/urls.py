# job/urls.py
from django.urls import path
from .views import (
    JobPostingListCreateAPIView, JobPostingDetailAPIView, JobApplicationAPIView,MyJobApplicationsAPIView,CompanySummaryView,CompanyDetailsView
    
)

urlpatterns = [
    path("job-postings/", JobPostingListCreateAPIView.as_view(),
         name="jobposting-list-create"),
    path("job-postings/<str:pk>/", JobPostingDetailAPIView.as_view(),
         name="jobposting-detail"),                
    path("job-postings/<str:pk>/apply/", JobApplicationAPIView.as_view(),
         name="job-apply"),                        
    path("my-applications/", MyJobApplicationsAPIView.as_view(),
         name="my-applications"),
     path("companies-summary/", CompanySummaryView.as_view(), name="company-summary"),
     path("company-details/<str:company_name>/",CompanyDetailsView.as_view(), name="company-details"),
]