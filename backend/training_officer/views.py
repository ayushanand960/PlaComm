# training/views.py
from rest_framework import viewsets, permissions
from .models import Activity
from .serializers import ActivitySerializer

class ActivityViewSet(viewsets.ModelViewSet):
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Optionally filter by type, e.g. ?type=GD
        """
        qs = Activity.objects.all().order_by("-created_at")
        activity_type = self.request.query_params.get("type")
        if activity_type:
            qs = qs.filter(type=activity_type.upper())
        return qs

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)