from django.db import models
from django.conf import settings
from users.models import Student  # adjust import path if different

def cert_upload_to(instance, filename):
    return f"certifications/{instance.student.rum_number}/{filename}"

def doc_upload_to(instance, filename):
    return f"documents/{instance.student.rum_number}/{filename}"

class Academic(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="academics")
    degree = models.CharField(max_length=150)
    branch = models.CharField(max_length=150, blank=True)
    institute = models.CharField(max_length=255, blank=True)
    year_of_passing = models.IntegerField(blank=True, null=True)
    cgpa = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.rum_number} - {self.degree}"

class Experience(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="experiences")
    company = models.CharField(max_length=255)
    role = models.CharField(max_length=200)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.rum_number} - {self.company}"

class Project(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="projects")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    tech_stack = models.CharField(max_length=300, blank=True)
    repo_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.rum_number} - {self.title}"

class Skill(models.Model):
    LEVEL_CHOICES = [
        ("Beginner", "Beginner"),
        ("Intermediate", "Intermediate"),
        ("Advanced", "Advanced"),
    ]
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="skills")
    name = models.CharField(max_length=100)
    level = models.CharField(max_length=30, choices=LEVEL_CHOICES, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.rum_number} - {self.name}"

class Certification(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="certifications")
    name = models.CharField(max_length=255)
    provider = models.CharField(max_length=255, blank=True)
    date = models.DateField(blank=True, null=True)
    file = models.FileField(upload_to=cert_upload_to, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.rum_number} - {self.name}"

class Document(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="documents")
    title = models.CharField(max_length=255, blank=True)
    file = models.FileField(upload_to=doc_upload_to)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.rum_number} - {self.title or self.file.name}"
