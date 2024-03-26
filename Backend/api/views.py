from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import * 
from .serializer import *

import json


@api_view(['POST'])
def api_login(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if not username:
        return Response({"detail":"insert your username"})
    if not password:
        return Response({"detail":"insert your password"}) 
    
    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"detail":"invalid password/username"})
    
    login(request,user)
    return Response({"detail":"success"})


@api_view(['POST'])
def api_logout(request):
    if not request.user.is_authenticated:
        return Response({"detail":"You are not even logged in!"})
    
    return Response({"detail":"success"})

@api_view(['POST'])
def api_register(request):
    data = json.loads(request.body)

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    password_repeat = data.get('password_repeat')

    if not username:
        return Response({"detail": "insert your username"})
    
    if not email:
        return Response({"detail": "insert your email"})
    
    if not password or not password_repeat :
        return Response({"detail": "insert your password"})
    
    if password != password_repeat:
        return Response({"detail":"1th password doesn't match 2nd"})

    try:
        new_user = User.objects.create(username=username, email=email, password=password)
        new_user.save()
    except Exception:
        return Response({"detail":"something went wrong"})

    login(new_user)

    return Response({"detail": "success"})



@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def get_daily_events(request):
    
    events = DailyEvent.objects.filter(user = request.user)
    serialized_events = DailyEventSerializer(events, many=True)

    return Response(serialized_events.data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def get_weakly_events(request):
    
    events = WeaklyEvent.objects.filter(user = request.user)
    serialized_events = WeaklyEventSerializer(events, many=True)

    return Response(serialized_events.data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def get_onetime_events(request):
    
    events = OneTimeEvent.objects.filter(user = request.user)
    serialized_events = OneTimeEventSerializer(events, many=True)

    return Response(serialized_events.data)



@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def get_notes(request):
    
    notes = Note.objects.filter(user = request.user)

    serialized_notes = NoteSerializer(notes, many=True)
    print(serialized_notes.data)

    return Response(serialized_notes.data)



@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def get_goals(request):
    
    goals = Goal.objects.filter(user=request.user)
    serialized_goals = GoalSerializer(goals, many=True)

    return Response(serialized_goals.data)