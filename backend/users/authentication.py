# from rest_framework_simplejwt.authentication import JWTAuthentication
# from django.conf import settings

# class CookieJWTAuthentication(JWTAuthentication):
#     def authenticate(self, request):
#         access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'])
#         if not access_token:
#             return None
#         validated_token = self.get_validated_token(access_token)
#         return self.get_user(validated_token), validated_token


from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.conf import settings

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'])
        if not access_token:
            return None
        
        try:
            validated_token = self.get_validated_token(access_token)
            user = self.get_user(validated_token)
            return user, validated_token
        except (InvalidToken, TokenError):
            return None
