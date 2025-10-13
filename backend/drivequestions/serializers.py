# from rest_framework import serializers
# from .models import Company, DriveQuestion

# class DriveQuestionSerializer(serializers.ModelSerializer):
#     uploaded_by_name = serializers.CharField(source='uploaded_by.username', read_only=True)

#     class Meta:
#         model = DriveQuestion
#         fields = "__all__"


# class CompanySerializer(serializers.ModelSerializer):
#     questions = DriveQuestionSerializer(many=True, read_only=True)

#     class Meta:
#         model = Company
#         fields = ["id", "name", "questions", "created_at"]




# from rest_framework import serializers
# from .models import Company, DriveQuestion

# class DriveQuestionSerializer(serializers.ModelSerializer):
#     uploaded_by_name = serializers.CharField(source='uploaded_by.username', read_only=True)
#     company_name = serializers.CharField(source='company.name', read_only=True)
#     updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

#     class Meta:
#         model = DriveQuestion
#         fields = [
#             "id",
#             "question",
#             "type",
#             "solution",
#             "uploaded_by_name",
#             "drive_name",
#             "company_name",
#             "updated_at",
#         ]


# class CompanySerializer(serializers.ModelSerializer):
#     questions = DriveQuestionSerializer(many=True, read_only=True)
#     created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

#     class Meta:
#         model = Company
#         fields = ["id", "name", "questions", "created_at"]




from rest_framework import serializers
from .models import DriveQuestion, Company

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name']


class DriveQuestionSerializer(serializers.ModelSerializer):
    uploaded_by_name = serializers.SerializerMethodField()
    company_name = serializers.CharField(source='company.name', read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    uploaded_by = serializers.IntegerField(source='uploaded_by.id', read_only=True)  # ✅ add this
    can_delete = serializers.SerializerMethodField()  # 👈 add this


    class Meta:
        model = DriveQuestion
        fields = [
            'id',
            'question',
            'solution',
            'type',
            'drive_name',
            'company',
            'company_name',
            'uploaded_by',
            'uploaded_by_name',
            'created_at',
            'updated_at',
            'can_delete',  # 👈 add this
        ]

    def get_uploaded_by_name(self, obj):
        if obj.uploaded_by:
            full_name = f"{obj.uploaded_by.first_name} {obj.uploaded_by.last_name}".strip()
            return full_name if full_name else obj.uploaded_by.unique_id
        return "Unknown Student"

    def get_can_delete(self, obj):
        request = self.context.get('request')
        if request and request.user and request.user.is_authenticated:
            return obj.uploaded_by_id == request.user.id
        return False