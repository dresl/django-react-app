from django.conf.urls import include
from django.urls import path

from base.views import current_user, UserList

urlpatterns = [
    path('current-user/', current_user),
    path('user-list/', UserList.as_view())
]
