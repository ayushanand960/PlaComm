# training/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ActivityViewSet ,EvaluationResultViewSet,PriorityListView

router = DefaultRouter()
router.register(r"activities", ActivityViewSet, basename="activities")
router.register(r"evaluations", EvaluationResultViewSet, basename="evaluations")
# router.register(r"priority-list/", PriorityListView, name="priority-list"),

urlpatterns = [
    path("training/", include(router.urls)),
    path("training/priority-list/", PriorityListView.as_view(), name="priority-list"),
]