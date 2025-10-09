from django.urls import path
from .views import (
    RecruiterRegisterView,
    RecruiterLoginView,
    JobListCreateView,
    JobApplicationsView
)

urlpatterns = [
    path('register/', RecruiterRegisterView.as_view(), name='recruiter-register'),
    path('login/', RecruiterLoginView.as_view(), name='recruiter-login'),
    path('jobs/', JobListCreateView.as_view(), name='recruiter-jobs'),
    path('jobs/<int:job_id>/applications/', JobApplicationsView.as_view(), name='job-applications'),
]
