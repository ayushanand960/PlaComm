# serializers.py
from rest_framework import serializers
from .models import Category, Thread, Reply

# ----------------------
# Reply Serializer
# ----------------------
class ReplySerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    author_role = serializers.CharField(source="author.role", read_only=True) 
    children = serializers.SerializerMethodField()  # Nested replies

    class Meta:
        model = Reply
        fields = [
            "id",
            "content",
            "author_name",
            "author_role",
            "created_at",
            "upvotes",
            "parent",   # assign parent when creating reply
            "children"
        ]
        read_only_fields = ["author_name", "created_at", "upvotes", "children","author_role"]

    def get_author_name(self, obj):
        return f"{obj.author.first_name} {obj.author.last_name}".strip() if obj.author else None

    def get_children(self, obj):
        # recursively serialize child replies
        qs = obj.children.all()  # related_name="children" on parent FK
        return ReplySerializer(qs, many=True, context=self.context).data


# ----------------------
# Thread Serializer
# ----------------------
class ThreadSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    author_role = serializers.CharField(source="author.role", read_only=True) 
    replies = ReplySerializer(many=True, read_only=True)  # top-level replies

    class Meta:
        model = Thread
        fields = [
            "id",
            "title",
            "content",
            "author_name",
            "category",
            "author_role",
            "created_at",
            "updated_at",
            "is_pinned",
            "replies"
        ]
        read_only_fields = ["author_name", "category", "created_at", "updated_at", "is_pinned","author_role"]

    def get_author_name(self, obj):
        return f"{obj.author.first_name} {obj.author.last_name}".strip() if obj.author else None


# ----------------------
# Category Serializer
# ----------------------
class CategorySerializer(serializers.ModelSerializer):
    threads = ThreadSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "description", "threads"]
        read_only_fields = ["id", "threads"]
