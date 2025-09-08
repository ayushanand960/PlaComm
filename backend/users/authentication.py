from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.conf import settings
from users.models import User

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'])
        if not access_token:
            return None
        
        try:
            validated_token = self.get_validated_token(access_token)
            # Instead of default get_user, manually fetch by unique_id
            user_id = validated_token.get("user_id")  # JWT default claim
            if not user_id:
                return None
            user = User.objects.filter(pk=user_id).first()  # use pk if your JWT uses PK
            if user is None:
                return None
            return (user, validated_token)
        except (InvalidToken, TokenError):
            return None

# from rest_framework_simplejwt.authentication import JWTAuthentication
# from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
# from django.conf import settings

# class CookieJWTAuthentication(JWTAuthentication):
#     def authenticate(self, request):
#         access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'])
#         if not access_token:
#             return None
        
#         try:
#             validated_token = self.get_validated_token(access_token)
#             user = self.get_user(validated_token)
#             return user, validated_token
#         except (InvalidToken, TokenError):
#             return None
