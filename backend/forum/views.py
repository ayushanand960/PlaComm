# views.py
from rest_framework import generics, permissions
from .models import Category, Thread, Reply
from .serializers import CategorySerializer, ThreadSerializer, ReplySerializer
from .permissions import CanCreateCategory



# ----------------------
# Custom Permissions
# ----------------------
class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Allow read-only methods for any authenticated user.
    Only admins/staff can POST/PUT/DELETE.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated
        return request.user and request.user.is_staff


# =========================
# Categories
# =========================
class CategoryListView(generics.ListCreateAPIView):
    """
    GET: List all categories → any authenticated user
    POST: Create category → admin, placement coordinator, or training officer
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [CanCreateCategory]  # Updated permission



# =========================
# Threads
# =========================
class ThreadListCreateView(generics.ListCreateAPIView):
    """
    GET: List all threads in a category → any authenticated user
    POST: Create thread → any authenticated user
    """
    serializer_class = ThreadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        category_id = self.kwargs.get("category_id")
        return Thread.objects.filter(category_id=category_id).order_by("-created_at")

    def perform_create(self, serializer):
        category = generics.get_object_or_404(Category, pk=self.kwargs.get("category_id"))
        serializer.save(author=self.request.user, category=category)


class ThreadDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Retrieve thread → any authenticated user
    PUT/PATCH/DELETE: Update/delete → author or admin only
    """
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    permission_classes = [permissions.IsAuthenticated]


# =========================
# Replies
# =========================
class ReplyListCreateView(generics.ListCreateAPIView):
    """
    GET: List top-level replies for a thread → any authenticated user
    POST: Create reply → any authenticated user
    """
    serializer_class = ReplySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        thread_id = self.kwargs.get("thread_id")
        # Only top-level replies; nested replies handled by serializer
        return Reply.objects.filter(thread_id=thread_id, parent__isnull=True).order_by("created_at")

    def perform_create(self, serializer):
        thread = generics.get_object_or_404(Thread, pk=self.kwargs.get("thread_id"))
        parent_id = self.request.data.get("parent")
        parent_reply = None

        if parent_id:
            try:
                parent_reply = Reply.objects.get(pk=parent_id, thread=thread)
            except Reply.DoesNotExist:
                parent_reply = None  # Invalid parent, fallback to top-level

        serializer.save(
            author=self.request.user,
            thread=thread,
            parent=parent_reply
        )
