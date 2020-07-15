from django.conf.urls import include
from django.urls import path
from django.contrib import admin
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    path('chat/', include('chat.urls')),
    path('admin/', admin.site.urls),
    path('api/v2/', include(router.urls))
]
