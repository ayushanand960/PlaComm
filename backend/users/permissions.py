# users/permissions.py
from rest_framework import permissions

class IsPlacementCoordinator(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "placement_coordinator"
        )