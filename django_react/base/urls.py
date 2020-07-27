from django.urls import path
from django_react.urls import router

from . import viewsets

router.register('users', viewsets.UserViewSet)

urlpatterns = []
