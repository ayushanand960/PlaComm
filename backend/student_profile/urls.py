from django.urls import path
from .views import (
    AcademicViewSet, ExperienceViewSet, ProjectViewSet,
    SkillViewSet, CertificationViewSet, DocumentViewSet, AdminStudentProfileView, SocialLinkViewSet
)

urlpatterns = [
    # Academics
    path("academics/", AcademicViewSet.as_view({
        "get": "list",
        "post": "create"
    }), name="academics-list"),
    path("academics/<int:pk>/", AcademicViewSet.as_view({
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy"
    }), name="academics-detail"),

    # Experiences
    path("experiences/", ExperienceViewSet.as_view({
        "get": "list",
        "post": "create"
    }), name="experiences-list"),
    path("experiences/<int:pk>/", ExperienceViewSet.as_view({
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy"
    }), name="experiences-detail"),

    # Projects
    path("projects/", ProjectViewSet.as_view({
        "get": "list",
        "post": "create"
    }), name="projects-list"),
    path("projects/<int:pk>/", ProjectViewSet.as_view({
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy"
    }), name="projects-detail"),

    # Skills
    path("skills/", SkillViewSet.as_view({
        "get": "list",
        "post": "create"
    }), name="skills-list"),
    path("skills/<int:pk>/", SkillViewSet.as_view({
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy"
    }), name="skills-detail"),

    # Certifications
    path("certifications/", CertificationViewSet.as_view({
        "get": "list",
        "post": "create"
    }), name="certifications-list"),
    path("certifications/<int:pk>/", CertificationViewSet.as_view({
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy"
    }), name="certifications-detail"),

    # Documents
    path("documents/", DocumentViewSet.as_view({
        "get": "list",
        "post": "create"
    }), name="documents-list"),
    path("documents/<int:pk>/", DocumentViewSet.as_view({
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy"
    }), name="documents-detail"),

    path("students/<str:rum_number>/", AdminStudentProfileView.as_view(), name="admin-student-profile"),


     # ✅ Social Links
    path("social-links/", SocialLinkViewSet.as_view({
        "get": "list",
        "post": "create"
    }), name="social-links-list"),

    path("social-links/<int:pk>/", SocialLinkViewSet.as_view({
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy"
    }), name="social-links-detail"),

]


#----------------------------------------------------------------------------

# from django.urls import path
# from .views import AdminStudentProfileView

# urlpatterns = [
#     path("students/<str:rum_number>/", AdminStudentProfileView.as_view(), name="admin-student-profile"),
# ]
