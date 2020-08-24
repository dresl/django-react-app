import json
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
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


@csrf_exempt
def handle_slack_request(request):
    if request.method == 'POST':
        print(json.loads(request.body))
        return JsonResponse({})
    else:
        return HttpResponse('slack handle')
