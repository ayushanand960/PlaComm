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
)

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
    
    # Admin-only user management
    path("users/", ListUsersView.as_view(), name="list-users"),
    path("<path:unique_id>/role/", UpdateUserRoleView.as_view(), name="update-user-role"),
]
