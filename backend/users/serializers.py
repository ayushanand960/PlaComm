from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, Student, TrainingOfficer

# ------------------------------------
# JWT Login Serializer
# ------------------------------------
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = "unique_id"

    def validate(self, attrs):
        unique_id = attrs.get("unique_id")
        password = attrs.get("password")
        role = self.initial_data.get("role")  # Frontend must send 'role'

        if not unique_id or not password or not role:
            raise serializers.ValidationError("Provide unique_id, password, and role")

        # Authenticate user
        user = authenticate(username=unique_id, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid credentials")

        # Check role
        if user.role != role:
            raise serializers.ValidationError("Role mismatch")

        refresh = self.get_token(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "role": user.role,
            "unique_id": user.unique_id
        }
# ------------------------------------
# Student Registration Serializer
# ------------------------------------
class StudentSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = Student
        fields = [
            "rum_number", "first_name", "middle_name", "last_name",
            "email", "phone", "course", "branch", "year", "gender", "password"
        ]

    def create(self, validated_data):
        unique_id = validated_data.pop("rum_number")
        password = validated_data.pop("password")
        email = validated_data.get("email")

        # Create User
        user = User.objects.create(unique_id=unique_id, email=email,
                                   first_name=validated_data.get("first_name"),
                                   last_name=validated_data.get("last_name"),
                                   role="student")
        user.set_password(password)
        user.save()

        # Create Student Profile
        student = Student.objects.create(user=user, rum_number=unique_id, **validated_data)
        return student

# ------------------------------------
# Training Officer Registration Serializer
# ------------------------------------
class TrainingOfficerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = TrainingOfficer
        fields = [
            "employee_id", "first_name", "middle_name", "last_name",
            "email", "password", "department", "designation", "phone"
        ]

    def create(self, validated_data):
        unique_id = validated_data.pop("employee_id")
        password = validated_data.pop("password")
        email = validated_data.pop("email")
        first_name = validated_data.pop("first_name")
        middle_name = validated_data.pop("middle_name", "")
        last_name = validated_data.pop("last_name")

        # ✅ Create User
        user = User.objects.create(
            unique_id=unique_id,
            email=email,
            first_name=first_name,
            last_name=last_name,
            role="officer"
        )
        user.set_password(password)
        user.save()

        # ✅ Create Officer Profile (with remaining fields)
        officer = TrainingOfficer.objects.create(
            user=user,
            employee_id=unique_id,
            first_name=first_name,
            middle_name=middle_name,
            last_name=last_name,
            email=email,
            department=validated_data.get("department"),
            designation=validated_data.get("designation"),
            phone=validated_data.get("phone"),
        )
        return officer


class UserRoleUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["role"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["unique_id", "first_name", "last_name", "email", "role"]