# your_app/permissions.py
from rest_framework.permissions import BasePermission

class IsAdminCoordinatorOfficerOrAuthority(BasePermission):
    """
    Allows access to users with role in ['admin', 'placement_coordinator', 'officer', 'authority'].
    """

    allowed_roles = ["admin", "placement_coordinator", "officer", "authority"]

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and getattr(request.user, "role", None) in self.allowed_roles
        )
