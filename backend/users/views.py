from django.db import IntegrityError
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .authentication import CookieJWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

from .serializers import StudentSerializer, TrainingOfficerSerializer, CustomTokenObtainPairSerializer
from .models import User


# ------------------------------------
# Utility: Cookie config (secure in prod, lax in dev)
# ------------------------------------
SECURE_COOKIE = not settings.DEBUG  # True in production with HTTPS


# ------------------------------------
# Student Registration View
# ------------------------------------
class StudentRegistrationView(APIView):
    permission_classes = [AllowAny] 
    def post(self, request, *args, **kwargs):
        serializer = StudentSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            student = serializer.save()
            return Response(
                {
                    "message": "Student registered successfully",
                    "student": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        except IntegrityError:
            return Response(
                {"error": "RUM number, email, or phone already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# ------------------------------------
# Training Officer Registration View
# ------------------------------------
class TrainingOfficerRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = TrainingOfficerSerializer(data=request.data)
        if serializer.is_valid():
            officer = serializer.save()
            return Response(
                {
                    "message": "Training Officer registered successfully",
                    "officer": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        else:
            # ✅ Return the real validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ------------------------------------
# Cookie-based JWT Login
# ------------------------------------
class CookieLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            data = response.data
            refresh = data.get("refresh")
            access = data.get("access")

            samesite = "None" if SECURE_COOKIE else "Lax"

            # Set cookies for access + refresh
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
                value=access,
                httponly=True,
                secure=SECURE_COOKIE,
                samesite=samesite,
            )
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=refresh,
                httponly=True,
                secure=SECURE_COOKIE,
                samesite=samesite,
            )

            response.data = {"message": "Login successful"}
        return response

# ------------------------------------
# Refresh Token (from cookie)
# ------------------------------------
class CookieTokenRefreshView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get(
            settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH']
        )
        if not refresh_token:
            return Response({"error": "Refresh token missing"}, status=401)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            response = Response({"success": True})
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
                value=access_token,
                httponly=True,
                secure=SECURE_COOKIE,
                samesite="None",
            )
            return response
        except Exception:
            return Response({"error": "Invalid refresh token"}, status=401)


# ------------------------------------
# Logout (clear cookies)
# ------------------------------------
class LogoutView(APIView):
    def post(self, request):
        response = Response({"success": "Logged out"})
        response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'])
        response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        return response


# class UserProfileView(APIView):
#     permission_classes = [IsAuthenticated]
#     authentication_classes = [CookieJWTAuthentication]

#     def get(self, request):
#         user = request.user
#         data = {
#             "unique_id": user.unique_id,
#             "email": user.email,
#             "role": user.role
#         }

#         if user.role == "student" and hasattr(user, "student") and user.student:
#             data.update(StudentSerializer(user.student).data)
#         elif user.role == "officer" and hasattr(user, "trainingofficer") and user.trainingofficer:
#             data.update(TrainingOfficerSerializer(user.trainingofficer).data)

#         return Response(data)
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get(self, request):
        user = request.user
        data = {
            "unique_id": user.unique_id,
            "email": user.email,
            "role": user.role
        }

        if user.role == "student" and hasattr(user, "student") and user.student:
            data.update(StudentSerializer(user.student).data)
        elif user.role == "officer" and hasattr(user, "trainingofficer") and user.trainingofficer:
            data.update(TrainingOfficerSerializer(user.trainingofficer).data)
        else:
            # For other roles (admin, coordinator, authority, recruiter)
            data.update({
                "unique_id": user.unique_id,
                "email": user.email,
                "role": user.role
            })

        return Response(data)


# ------------------------------------
# List Users (Admin only)
# ------------------------------------
class ListUsersView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = User.objects.all().order_by('role', 'first_name')
        data = [
            {
                "unique_id": u.unique_id,
                "first_name": u.first_name,
                "last_name": u.last_name,
                "email": u.email,
                "role": u.role,
            }
            for u in users
        ]
        return Response(data)


# ------------------------------------
# Update User Role (Admin only)
# ------------------------------------
class UpdateUserRoleView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, unique_id):
        valid_roles = [choice[0] for choice in User._meta.get_field('role').choices]
        role = request.data.get("role")

        if role not in valid_roles:
            return Response({"error": "Invalid role"}, status=400)

        try:
            user = User.objects.get(unique_id=unique_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        user.role = role
        user.save()
        return Response({"message": f"Role updated to '{role}' successfully"})