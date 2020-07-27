import json
from random import randint
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, generics, permissions, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_action_permissions import DjangoActionPermissions

from .models import ChatGroup, ChatMessage
from .serializers import ChatGroupSerializer, ChatMessageSerializer


class ChatGroupPermission(permissions.BasePermission):
    """
    Chat group permissions
    """

    def has_permission(self, request, view):
        if view.action == 'memory' or request.user.is_authenticated:
            return True
        return False


class ChatGroupViewSet(viewsets.ViewSet):

    permission_classes = [ChatGroupPermission]
    serializer_class = ChatGroupSerializer
    queryset = ChatGroup.objects.all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    # pagination_class = StandardResultsSetPagination
    filterset_fields = ['users']
    ordering_fields = ['name', 'slug']
    ordering = ['name']

    @action(methods=['GET'], detail=True)
    def messages(self, request, pk=None):
        current_user = get_user_model().objects.get(pk=request.user.id)
        group = ChatGroup.objects.get(pk=pk)
        if group in current_user.chat_groups.all():
            res = [{
                "id": msg.id,
                "text": msg.text,
                "date": msg.date,
                "username": msg.user.username,
                "user": msg.user.get_full_name(),
                } for msg in group.messages.all()]               
            return Response(res)
        return Response({}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        current_user = get_user_model().objects.get(pk=request.user.id)
        res = [{ 'name': group.name, 'id': group.id } for group in current_user.chat_groups.all()]
        return Response(res)

    def retrieve(self, request, pk=None):
        current_user = get_user_model().objects.get(pk=request.user.id)
        group = ChatGroup.objects.get(pk=pk)
        if group in current_user.chat_groups.all():
            return Response({
                'name': group.name,
                'id': group.id
            })
        return Response({}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['GET'], detail=False)
    def memory(self, request):
        data = {
            'memory-usage': randint(20, 80) / 100
        }
        return Response(data)


class ChatMessageViewSet(viewsets.ModelViewSet):
    
    serializer_class = ChatMessageSerializer
    queryset = ChatMessage.objects.all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ('text', 'date', 'chat', 'user')
    ordering_fields = ('date', 'user')
    ordering = 'date'

    def filter_queryset(self, queryset):
        queryset = super(ChatMessageViewSet, self).filter_queryset(queryset)
        return queryset.order_by('date')
