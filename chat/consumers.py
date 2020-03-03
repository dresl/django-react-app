from asgiref.sync import async_to_sync, sync_to_async
from channels.db import database_sync_to_async

from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
import json
from django.contrib.auth.models import User
from .models import ChatGroup, ChatMessage


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        username = text_data_json['user']
        message = text_data_json['message']
        room_name = text_data_json['roomName']

        await self.create_message(username, room_name, message)

        # Send to frontend
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
            }
        )

    @database_sync_to_async
    def create_message(self, username, room_name, message):
        print(username, room_name, message)
        user = User.objects.get(username=username)
        room_name = ChatGroup.objects.get(slug=room_name)
        ChatMessage.objects.create(text=message, user=user, chat=room_name)

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
