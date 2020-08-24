from django.urls import path
from django_react.urls import router

from . import views
from . import viewsets

router.register('chat-group', viewsets.ChatGroupViewSet)
router.register('chat-message', viewsets.ChatMessageViewSet)

urlpatterns = [
    path('', views.index, name='index'),
    path('slack/', views.handle_slack_request, name='slack'),
    path('<str:room_name>/', views.room, name='room'),
]
