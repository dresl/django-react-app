import json
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, generics, permissions, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import UserWithTokenSerializer


class UserViewSet(viewsets.ViewSet):
    
    permission_classes = []
    serializer_class = UserWithTokenSerializer
    queryset = get_user_model().objects.all()
    ordering = 'username'

    def list(self, request):
        return Response({'data'})
    
    def retrieve(self, request, pk=None):
        current_user = get_user_model().objects.get(pk=pk)
        res = {
            'id': current_user.id,
            'username': current_user.username
        }
        return Response(res)
    
    @action(methods=['GET'], detail=True)
    def chat_groups(self, request, pk=None):
        current_user = get_user_model().objects.get(pk=pk)
        if int(request.user.id) == int(pk):
            res = [{ 'name': group.name } for group in current_user.chat_groups.all()]
            return Response(res, status=status.HTTP_200_OK)
        return Response({}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['POST'], detail=False)
    def signup(self, request):
        serializer = UserWithTokenSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=['GET'], detail=False)
    def current(self, request):
        return Response({'username': request.user.username})

    @action(methods=['POST'], detail=False)
    def exists(self, request):
        exists = False
        try:
            user = get_user_model().objects.get(username=request.data['username'])
            exists = True
        except get_user_model().DoesNotExist:
            pass
        return JsonResponse({'exists': exists}, safe=False)
