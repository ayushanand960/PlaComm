from django.db import models
from django.contrib.auth import get_user_model
from PlacementCoordinator.models import JobPosting

User = get_user_model()

class Activity(models.Model):
    ACTIVITY_TYPES = [
        ("GD", "Group Discussion"),
        ("APT", "Aptitude Test"),
        ("TECH", "Technical Assessment"),
        ("MOCK", "Mock Interview"),
        ("PI", "Personal Interview"),
    ]

    type = models.CharField(max_length=10, choices=ACTIVITY_TYPES)
    job = models.ForeignKey(JobPosting, on_delete=models.CASCADE, related_name="activities")
    topic = models.CharField(max_length=200, blank=True, null=True)
    session = models.CharField(max_length=50)
    date = models.DateField()
    result_date = models.DateField()
    max_marks = models.IntegerField(default=50)
    min_marks = models.IntegerField(default=20)
    nominee = models.CharField(max_length=100, blank=True, null=True)
    remark = models.TextField(blank=True, null=True)

    # ✅ Multi-select field for frontend "courses" (SQLite-friendly)
    courses = models.JSONField(default=list, blank=True, null=True)

    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_activities")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.get_type_display()} | {self.job.company_name} - {self.topic or ''}"
