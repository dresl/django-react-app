from django.shortcuts import render
from .models import ChatGroup


def index(request):
    return render(request, 'chat/index.html', {})


def room(request, room_name):
    room = ChatGroup.objects.get(slug=room_name)
    print(vars(room))
    return render(request, 'chat/room.html', {
        'room': room
    })
