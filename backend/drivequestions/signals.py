from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import DriveQuestion
from django.core.mail import send_mail

@receiver(post_save, sender=DriveQuestion)
def notify_coordinator(sender, instance, created, **kwargs):
    if created:
        send_mail(
            subject="New Drive Question Uploaded",
            message=f"{instance.uploaded_by} uploaded a new question for {instance.company.name}.",
            from_email="noreply@college.com",
            recipient_list=["placement@college.com"],
            fail_silently=True,
        )
