from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


# -------------------------------
# Custom User Manager
# -------------------------------
class CustomUserManager(BaseUserManager):
    def create_user(self, unique_id, password=None, **extra_fields):
        if not unique_id:
            raise ValueError("The Unique ID must be set")
        user = self.model(unique_id=unique_id, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, unique_id, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "admin")

        if not extra_fields.get("role"):
            raise ValueError("Superuser must have a role")
        return self.create_user(unique_id, password, **extra_fields)



class User(AbstractBaseUser, PermissionsMixin):

    ROLE_CHOICES = [
        ('student', 'Student'),
        ('placement_coordinator', 'Placement Cell Coordinator'),
        ('officer', 'Training Officer'),
        ('authority', 'Authority'),
        ('admin', 'Admin'),
        ('recruiter', 'Recruiter'),
    ]
    unique_id = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    role = models.CharField(max_length=30, choices=ROLE_CHOICES)
    is_blocked = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'unique_id'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']
    
    def __str__(self):
        return f"{self.unique_id} ({self.role})"

# -------------------------------
# Student Model
# -------------------------------
class Student(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    rum_number = models.CharField(max_length=10, unique=True)  # Will be same as user.unique_id
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, null=True, blank=True)
    phone = models.CharField(max_length=15)
    faculty = models.CharField(max_length=150) 
    course = models.CharField(max_length=150)
    year = models.CharField(max_length=50)
    gender = models.CharField(max_length=10, choices=[("Male","Male"),("Female","Female"),("Other","Other")])
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_coordinator = models.BooleanField(default=False)
    USERNAME_FIELD = 'unique_id'
    REQUIRED_FIELDS = ["password"]

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        # Automatically set rum_number = user's unique_id
        if not self.rum_number:
            self.rum_number = self.user.unique_id
        super().save(*args, **kwargs)

# -------------------------------
# Training Officer Model
# -------------------------------
class TrainingOfficer(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    employee_id = models.CharField(max_length=20, unique=True)  # Will be same as user.unique_id
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, null=True, blank=True)
    faculty = models.CharField(max_length=150) 
    designation = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_coordinator = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_authority = models.BooleanField(default=False)

    USERNAME_FIELD = 'unique_id'
    REQUIRED_FIELDS = ["password"]

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        # Automatically set employee_id = user's unique_id
        if not self.employee_id:
            self.employee_id = self.user.unique_id
        super().save(*args, **kwargs)



class Recruiter(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    username = models.CharField(max_length=50, unique=True)  # Will be same as user.unique_id
    company = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    
    USERNAME_FIELD = 'unique_id'
    REQUIRED_FIELDS = ["password"]

    objects = CustomUserManager()


    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.user.unique_id
        super().save(*args, **kwargs)