from django.urls import path
from .views import (
    StudentRegistrationView,
    TrainingOfficerRegistrationView,
    CookieLoginView,
    CookieTokenRefreshView,
    LogoutView,
    UserProfileView,
    ListUsersView,
    UpdateUserRoleView,
    UserDetailView,StudentDetailView,PersonalDetailViewSet
)
personal_detail = PersonalDetailViewSet.as_view({
    "get": "list",
    "put": "update",
})

urlpatterns = [
    # Registration
    path("register/student/", StudentRegistrationView.as_view(), name="student-register"),
    path("register/officer/", TrainingOfficerRegistrationView.as_view(), name="officer-register"),
    
    # Authentication
    path("login/", CookieLoginView.as_view(), name="cookie-login"),
    path("refresh/", CookieTokenRefreshView.as_view(), name="token-refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
    
    # User profile
    path("profile/", UserProfileView.as_view(), name="user-profile"),
    path("personal-details/", personal_detail, name="personal-details"),
    
    # Admin-only user management
    path("users/", ListUsersView.as_view(), name="list-users"),
    path("users/<path:unique_id>/", UserDetailView.as_view(), name="user-detail"),# Replace UserDetailView for student dashboard
path("users/student/<path:unique_id>/", StudentDetailView.as_view(), name="user-detail"),

    
    path("<path:unique_id>/role/", UpdateUserRoleView.as_view(), name="update-user-role"),
]
