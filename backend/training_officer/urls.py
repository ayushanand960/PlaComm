# training/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ActivityViewSet ,EvaluationResultViewSet

router = DefaultRouter()
router.register(r"activities", ActivityViewSet, basename="activities")
router.register(r"evaluations", EvaluationResultViewSet, basename="evaluations")

urlpatterns = [
    path("training/", include(router.urls)),
]