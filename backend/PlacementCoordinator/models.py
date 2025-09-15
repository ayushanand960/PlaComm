from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class JobPosting(models.Model):
    coordinator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="job_postings")
    company_name = models.CharField(max_length=255)
    job_title = models.CharField(max_length=255, null=True, blank=True)
    job_description = models.TextField()
    positions = models.TextField(help_text="Comma separated positions")  
    number_of_candidates = models.IntegerField()
    eligibility_criteria = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    package = models.CharField(max_length=100, blank=True, null=True)
    deadline = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.company_name} - {self.job_title}"


class JobApplication(models.Model):
    STATUS_CHOICES = [
        ("applied", "Applied"),
        ("not_interested", "Not Interested"),
    ]

    job = models.ForeignKey(JobPosting, on_delete=models.CASCADE, related_name="applications")
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name="applications")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES,default="applied")
    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        unique_together = ("job", "student")  # student can respond only once

    def __str__(self):
        return f"{self.student.username} - {self.job.job_title} ({self.status})"
