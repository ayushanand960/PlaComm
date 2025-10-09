from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, DriveQuestionViewSet

router = DefaultRouter()
router.register("companies", CompanyViewSet)
router.register("questions", DriveQuestionViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
