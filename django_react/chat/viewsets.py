import json
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action

from .models import ChatGroup, ChatMessage
from .serializers import ChatGroupSerializer, ChatMessageSerializer


class ChatGroupViewSet(viewsets.ModelViewSet):
    
    permission_classes = []
    serializer_class = ChatGroupSerializer
    queryset = ChatGroup.objects.all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    # pagination_class = StandardResultsSetPagination
    filterset_fields = ('name', 'slug', 'users')
    ordering_fields = ('slug')
    ordering = 'slug'

    @action(methods=['get'], detail=True)
    def messages(self, request, pk=None):
        group = ChatGroup.objects.get(pk=pk)
        #msg for msg in group.messages.all()
        res = [
        ]
        for msg in group.messages.all():
            res.append({
                "id": msg.id,
                "text": msg.text,
                "date": msg.date,
                "chat": msg.chat.id,
                "user": msg.user.id
            })
        return JsonResponse(res, safe=False)

    def filter_queryset(self, queryset):
        queryset = super(ChatGroupViewSet, self).filter_queryset(queryset)
        return queryset.order_by('slug')


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
