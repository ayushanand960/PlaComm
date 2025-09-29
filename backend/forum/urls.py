from django.urls import path
from . import views

urlpatterns = [
    path("categories/", views.CategoryListView.as_view(), name="category-list"),
    path("categories/<int:category_id>/threads/", views.ThreadListCreateView.as_view(), name="thread-list"),
    path("threads/<int:pk>/", views.ThreadDetailView.as_view(), name="thread-detail"),
    path("threads/<int:thread_id>/replies/", views.ReplyListCreateView.as_view(), name="reply-list"),
]
