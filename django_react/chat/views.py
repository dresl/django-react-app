from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import ChatGroup


def index(request):
    return render(request, 'chat/index.html', {})


@login_required
def room(request, room_name):
    room = ChatGroup.objects.get(slug=room_name)
    print(vars(room))
    return render(request, 'chat/room.html', {
        'room': room
    })
