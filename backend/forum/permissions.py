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
