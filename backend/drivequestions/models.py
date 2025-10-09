from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class DriveQuestion(models.Model):
    QUESTION_TYPES = [
        ('Technical', 'Technical'),
        ('Aptitude', 'Aptitude'),
        ('Reasoning', 'Reasoning'),
        ('Programming', 'Programming'),
        ('DSA', 'DSA'),
    ]

    company = models.ForeignKey(
        Company, related_name="questions",
        on_delete=models.CASCADE,
        null=True, blank=True  # 👈 Allow no company
    )
    question = models.TextField()
    solution = models.TextField(blank=True, null=True)
    type = models.CharField(max_length=50, choices=QUESTION_TYPES)
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='uploaded_questions')
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.company.name if self.company else 'General'} - {self.question[:50]}"

