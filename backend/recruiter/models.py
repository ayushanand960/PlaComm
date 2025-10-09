from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# ---------------- Recruiter User Manager ----------------
class RecruiterManager(BaseUserManager):
    def create_user(self, email, company_name, password=None):
        if not email:
            raise ValueError("Recruiter must have an email address")
        recruiter = self.model(email=self.normalize_email(email), company_name=company_name)
        recruiter.set_password(password)
        recruiter.save(using=self._db)
        return recruiter


# ---------------- Recruiter Model ----------------
class Recruiter(AbstractBaseUser):
    company_name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    contact_number = models.CharField(max_length=15, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = RecruiterManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['company_name']

    def __str__(self):
        return self.company_name


# ---------------- Job Model ----------------
class Job(models.Model):
    recruiter = models.ForeignKey(Recruiter, on_delete=models.CASCADE, related_name="jobs")
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    salary = models.CharField(max_length=100)
    job_type = models.CharField(max_length=100, choices=[('Full-time', 'Full-time'), ('Internship', 'Internship')])
    posted_on = models.DateTimeField(auto_now_add=True)
    deadline = models.DateField()

    def __str__(self):
        return f"{self.title} - {self.recruiter.company_name}"


# ---------------- Job Applications ----------------
class JobApplication(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    student_name = models.CharField(max_length=200)
    student_email = models.EmailField()
    applied_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student_name} → {self.job.title}"
