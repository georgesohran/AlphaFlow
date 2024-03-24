from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import * 
from .serializer import *


# Create your views here.
@api_view(['GET'])
def get_daily_events(request):
    
    events = DailyEvent.objects.filter(user = request.user)
    serialized_events = DailyEventSerializer(events, many=True)

    return Response(serialized_events.data)

@api_view(['GET'])
def get_weakly_events(request):
    
    events = WeaklyEvent.objects.filter(user = request.user)
    serialized_events = WeaklyEventSerializer(events, many=True)

    return Response(serialized_events.data)

@api_view(['GET'])
def get_onetime_events(request):
    
    events = OneTimeEvent.objects.filter(user = request.user)
    serialized_events = OneTimeEventSerializer(events, many=True)

    return Response(serialized_events.data)



@api_view(['GET'])
def get_notes(request):
    
    notes = Note.objects.all()
    #for now it is all, later user-specific

    serialized_notes = NoteSerializer(notes, many=True)
    print(serialized_notes.data)

    return Response(serialized_notes.data)



@api_view(['GET'])
def get_goals(request):
    
    goals = Goal.objects.filter(user=request.user)
    serialized_goals = GoalSerializer(goals, many=True)

    return Response(serialized_goals.data)