# permissions.py
from rest_framework import permissions

class IsForumUserOrReadOnly(permissions.BasePermission):
    """
    Allow access to forum for specific roles: student, training_officer, admin, placement_coordinator
    """

    allowed_roles = ["student", "training_officer", "admin", "placement_coordinator"]

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role in self.allowed_roles
        )


class CanCreateCategory(permissions.BasePermission):
    """
    Allow category creation for admin, placement coordinator, or training officer.
    Read-only for all other authenticated users.
    """

    allowed_roles = ["admin", "placement_coordinator", "training_officer"]

    def has_permission(self, request, view):
        # Read-only access for all authenticated users
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated

        # POST/PUT/DELETE allowed only for allowed roles
        return request.user and request.user.is_authenticated and request.user.role in self.allowed_roles