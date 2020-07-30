import json
from asgiref.sync import async_to_sync, sync_to_async

from channels.db import database_sync_to_async
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer

from django.contrib.auth.models import User
from .models import ChatGroup, ChatMessage


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = 'chat_%s' % self.room_id

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

        # save message to db
        await self.create_message(text_data_json)

        # Send to frontend
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'room_id': text_data_json['roomId'],
                'text': text_data_json['text'],
                'msg_type': text_data_json['type'],
                'username': text_data_json['username'],
                'date': text_data_json['date']
            }
        )

    @database_sync_to_async
    def create_message(self, text_data_json):
        print(text_data_json)
        user = User.objects.get(username=text_data_json['username'])
        chat_group = ChatGroup.objects.get(pk=text_data_json['roomId'])
        ChatMessage.objects.create(text=text_data_json['text'], msg_type=text_data_json['type'], user=user, chat=chat_group)

    # Receive message from room group
    async def chat_message(self, event):
        print("send to frontend: ", event)

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'room_id': event['room_id'],
            'text': event['text'],
            'type': event['msg_type'],
            'username': event['username'],
            'date': event['date']
        }))
