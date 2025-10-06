from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class JobPosting(models.Model):
    job_id = models.CharField(max_length=50, primary_key=True)
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

    def save(self, *args, **kwargs):
        if not self.job_id:
        # prefix bana company ke naam se (lowercase aur space remove)
            prefix = self.company_name.lower().replace(" ", "")

        # find last job_id for this company
            last_job = JobPosting.objects.filter(company_name__iexact=self.company_name).order_by("-created_at").first()

            if last_job and "_" in last_job.job_id:
                try:
                    last_number = int(last_job.job_id.split("_")[-1])
                except ValueError:
                    last_number = 0
            else:
                last_number = 0

        # new job id with next number (e.g., tcs_03)
            self.job_id = f"{prefix}_{last_number + 1:02d}"

        super().save(*args, **kwargs)



class JobApplication(models.Model):
    STATUS_CHOICES = [
        ("applied", "Applied"),
        ("not_interested", "Not Interested"),
    ]

    job = models.ForeignKey(JobPosting, on_delete=models.CASCADE, related_name="applications", to_field="job_id")
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name="applications")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="applied")
    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("job", "student")

    def __str__(self):
        return f"{self.student.username} - {self.job.job_id} ({self.status})"
