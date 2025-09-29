from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Thread(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="threads")
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="threads")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_pinned = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Reply(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name="replies")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="replies")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    upvotes = models.PositiveIntegerField(default=0)
    
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="children"
    )

    def __str__(self):
        # Try full name first, fallback to ID if not available
        if hasattr(self.author, "get_full_name") and self.author.get_full_name():
            author_name = self.author.get_full_name()
        elif hasattr(self.author, "first_name") and hasattr(self.author, "last_name"):
            author_name = f"{self.author.first_name} {self.author.last_name}".strip()
        else:
            author_name = f"User {self.author.id}"  # fallback to unique ID

        return f"{author_name}: {self.content[:30]}"
