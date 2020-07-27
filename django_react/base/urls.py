from django.urls import path
from django_react.urls import router

from base.views import UserList
from . import viewsets

router.register('users', viewsets.UserViewSet)

urlpatterns = [
    path('user-list/', UserList.as_view())
]
