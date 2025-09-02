from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.views import APIView
from django.conf import settings


    

class CookieTokenRefreshView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        if not refresh_token:
            return Response({"error": "Refresh token missing"}, status=401)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            response = Response({"success": True})
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None'
            )
            return response
        except Exception:
            return Response({"error": "Invalid refresh token"}, status=401)


class CookieLoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            data = response.data
            refresh = data.get("refresh")
            access = data.get("access")

            # Set cookies
            # response.set_cookie(
            #     key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            #     value=refresh,
            #     httponly=True,
            #     secure=False,  # True in production with HTTPS
            #     samesite="Lax"
            # )
            # response.set_cookie(
            #     key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
            #     value=access,
            #     httponly=True,
            #     secure=False,
            #     samesite="Lax"
            # )
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
                value=access,
                httponly=True,
                secure=True,          # must be True for SameSite=None
                samesite="None"       # allows cross-site requests (localhost:5173 -> 127.0.0.1:8000)
            )
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=refresh,
                httponly=True,
                secure=True,
                samesite="None"
            )

            # Optionally remove tokens from response body
            response.data = {"message": "Login successful"}
        return response
    
class LogoutView(APIView):
    def post(self, request):
        response = Response({"success": "Logged out"})
        response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'])
        response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        return response


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def ping(request):
#     return Response({
#     'ok': True,
#     'service': 'placomm-api',
#     'message': 'pong you are authenticated',
#     })


class PingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'ok': True,
            'service': 'placomm-api',
            'message': 'pong you are authenticated',
        })