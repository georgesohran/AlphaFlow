from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError

from .models import * 
from .serializer import *

import json

def get_csrf(request):
    response = Response({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


@api_view(['POST'])
@ensure_csrf_cookie
def api_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username:
        return Response({"detail":"insert your username"}, status=400)
    if not password:
        return Response({"detail":"insert your password"}, status=400) 
    
    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"detail":"invalid password/username"}, status=400)
    
    login(request,user)
    return Response({"detail":"success"}, status=200)


@api_view(['POST'])
@ensure_csrf_cookie
def api_logout(request):
    if not request.user.is_authenticated:
        return Response({"detail":"You are not even logged in yet!"}, status=400)
    logout(request)
    return Response({"detail":"success"}, status=200)


@api_view(['POST'])
@ensure_csrf_cookie
def api_register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    password_repeat = request.data.get('password_repeat')

    if not username:
        return Response({"detail": "insert your username"}, status=400)
    
    if not email:
        return Response({"detail": "insert your email"}, status=400)
    
    if not password or not password_repeat :
        return Response({"detail": "insert your password"}, status=400)
    
    if password != password_repeat:
        return Response({"detail":"1th password doesn't match 2nd"}, status=400)

    try:
        new_user = User.objects.create(username=username, email=email, password=password)
        new_user.save()
    except IntegrityError:
        return Response({"detail":"username has already been taken"}, status=400)
    
    user = User.objects.get(username=username)

    login(request,user)

    return Response({"detail": "success"}, status=200)



@api_view(['GET'])
def daily_events(request):
    
    events = DailyEvent.objects.filter(user = request.user)
    serialized_events = DailyEventSerializer(events, many=True)

    return Response(serialized_events.data)

@api_view(['GET'])
def weakly_events(request):
    
    events = WeaklyEvent.objects.filter(user = request.user)
    serialized_events = WeaklyEventSerializer(events, many=True)

    return Response(serialized_events.data)

@api_view(['GET'])
def onetime_events(request):
    
    events = OneTimeEvent.objects.filter(user = request.user)
    serialized_events = OneTimeEventSerializer(events, many=True)

    return Response(serialized_events.data)



@api_view(['GET'])
@ensure_csrf_cookie
@login_required(login_url='/login')
def notes(request):
    notes = Note.objects.filter(user = request.user)
    serialized_notes = NoteSerializer(notes, many=True)
    return Response(serialized_notes.data)



@api_view(['GET'])
def goals(request):
    
    goals = Goal.objects.filter(user=request.user)
    serialized_goals = GoalSerializer(goals, many=True)

    return Response(serialized_goals.data)