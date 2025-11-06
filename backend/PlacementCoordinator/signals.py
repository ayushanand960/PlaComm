# placement_app/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mass_mail
from users.models import User  # use your custom User model
from .models import JobPosting, Notification
from django.core.mail import EmailMessage

@receiver(post_save, sender=JobPosting)
def send_job_notification(sender, instance, created, **kwargs):
    if created:
        students = User.objects.filter(role="student", is_active=True).exclude(email="")

        for student in students:
            Notification.objects.create(
                recipient=student,
                title=f"New Job Posting: {instance.company_name}",
                message=f"A new job '{instance.job_title}' has been posted.",
            )

        email_list = list(students.values_list("email", flat=True))

        if email_list:
            email = EmailMessage(
                subject=f"New Job Opportunity: {instance.company_name}",
                body=f"A new job '{instance.job_title}' has been posted. Check portal.",
                from_email="pla.ramauniversity@gmail.com",
                to=[email_list[0]],
                cc=email_list[1:],
            )
            email.send(fail_silently=True)
