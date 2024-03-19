from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import * 
from .serializer import *


# Create your views here.
@api_view(['GET'])
def get_events(request):
    
    events = TimeEvent.objects.filter(user = request.user)
    serialized_events = TimeEventSerializer(events, many=True)

    return Response(serialized_events.data)



@api_view(['GET'])
def get_notes(request):
    
    notes = Note.objects.filter(user=request.user)
    serialized_notes = NoteSerializer(notes, many=True)

    return Response(serialized_notes.data)



@api_view(['GET'])
def get_goals(request):
    
    goals = Goal.objects.filter(user=request.user)
    serialized_goals = GoalSerializer(goals, many=True)

    return Response(serialized_goals.data)