from django.conf.urls import include
from django.urls import path
from django.contrib import admin
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/', include('chat.urls')),
    path('base/', include('base.urls')),
    path('api/v2/', include(router.urls)),
    path('api/v2/auth/token/', obtain_jwt_token),
    path('api/v2/auth/token/refresh/', refresh_jwt_token),
]
