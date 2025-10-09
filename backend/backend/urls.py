"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include   
from testAPI.views import CookieLoginView, CookieTokenRefreshView, LogoutView
from django.conf import settings
from django.conf.urls.static import static 
urlpatterns = [
    path('admin/', admin.site.urls),    
    path('users/', include('users.urls')),
    path("placements/", include("PlacementCoordinator.urls")),
    path("students/", include("student_profile.urls")),
    path("resume/", include("resume_ai.urls")),
    path("forum/", include("forum.urls")),
    path("", include("training_officer.urls")),
    path("drive/", include("drivequestions.urls")),


    # Cookie-based auth endpoints
    # path("auth/login/", CookieLoginView.as_view(), name="cookie_login"),
    # path("auth/refresh/", CookieTokenRefreshView.as_view(), name="cookie_refresh"),
    # path("auth/logout/", LogoutView.as_view(), name="cookie_logout"),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)