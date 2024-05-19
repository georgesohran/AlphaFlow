from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db import IntegrityError
from django.utils import timezone

from .models import * 
from .serializer import *


@api_view(['GET'])
def session_view(request):
    if request.user.is_authenticated:
        return Response({"isauthenticated":True})
    return Response({"isauthenticated":False})



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



@api_view(['POST', 'PUT', 'DELETE'])
@ensure_csrf_cookie
def daily_events(request):
    if not request.user.is_authenticated:
        return Response({"detail":"not authorized"}, status=400)
    
    if request.method == 'POST':
        start = request.data.get('start')
        finish = request.data.get('finish')
        description = request.data.get('description')
        color = request.data.get('color')
        
        if not color:
            color = '#f44336'

        if not start or not finish or not description:
            return Response({"detail":"not enough info"})
        
        DailyEvent.objects.create(start=start, finish=finish, color=color, description=description, user=request.user)
    
    elif request.method == 'PUT':
        start = request.data.get('start')
        finish = request.data.get('finish')
        description = request.data.get('description')
        color = request.data.get('color')
        
        if not color:
            color = '#f44336'

        if not start or not finish or not description:
            return Response({"detail":"not enough info"})

        id = request.data.get('id')
        event = DailyEvent.objects.get(id=id)
        event.start = start
        event.finish = finish
        event.description = description
        event.color = color
        event.save()

    elif request.method=='DELETE':
        id = request.data.get('id')
        if not id: 
            return Response({"detail":"not enough info"})
        event = DailyEvent.objects.get(id=id)
        event.delete()

    return Response({"detail":"success"})

@api_view(['POST', 'PUT', 'DELETE'])
@ensure_csrf_cookie
def weekly_events(request):
    if not request.user.is_authenticated:
        return Response({"detail":"not authorized"}, status=400)
    
    if request.method == 'POST':
        start = request.data.get('start')
        finish = request.data.get('finish')
        day = request.data.get('day')
        description = request.data.get('description')
        color = request.data.get('color')
        
        if not color:
            color = '#f44336'

        if not start or not finish or not description:
            return Response({"detail":"not enough info"})
        
        WeeklyEvent.objects.create(start=start, finish=finish, day=day, color=color, description=description, user=request.user)
    
    elif request.method == 'PUT':
        start = request.data.get('start')
        finish = request.data.get('finish')
        day = request.data.get('day')
        description = request.data.get('description')
        color = request.data.get('color')

        if not color:
            color = '#f44336'

        if not start or not finish or not description:
            return Response({"detail":"not enough info"})

        id = request.data.get('id')
        event = WeeklyEvent.objects.get(id=id)
        event.start = start
        event.finish = finish
        event.day = day
        event.description = description
        event.color = color
        event.save()

    elif request.method=='DELETE':
        id = request.data.get('id')
        if not id: 
            return Response({"detail":"not enough info"})
        event = WeeklyEvent.objects.get(id=id)
        event.delete()

    return Response({"detail":"success"})

@api_view(['POST', 'PUT', 'DELETE'])
@ensure_csrf_cookie
def onetime_events(request):
    if not request.user.is_authenticated:
        return Response({"detail":"not authorized"}, status=400)
    
    if request.method == 'POST':
        start = request.data.get('start')
        finish = request.data.get('finish')
        description = request.data.get('description')
        color = request.data.get('color')
        
        if not color:
            color = '#f44336'

        if not start or not finish or not description:
            return Response({"detail":"not enough info"})
        
        OneTimeEvent.objects.create(start=start, finish=finish, color=color, description=description, user=request.user)
    
    elif request.method == 'PUT':
        start = request.data.get('start')
        finish = request.data.get('finish')
        description = request.data.get('description')
        color = request.data.get('color')
        
        if not color:
            color = '#f44336'

        if not start or not finish or not description:
            return Response({"detail":"not enough info"})

        id = request.data.get('id')
        event = OneTimeEvent.objects.get(id=id)
        event.start = start
        event.finish = finish
        event.description = description
        event.color = color
        event.save()

    elif request.method=='DELETE':
        id = request.data.get('id')
        if not id: 
            return Response({"detail":"not enough info"})
        event = OneTimeEvent.objects.get(id=id)
        event.delete()

    return Response({"detail":"success"})



@api_view(['GET'])
@ensure_csrf_cookie
def get_upcoming_events(request):
    if not request.user.is_authenticated:
        return Response({"detail":"not authorized"}, status=400)
    
    events = OneTimeEvent.objects.filter(user=request.user)
    onetime_events_ser = OneTimeEventSerializer(events, many=True)
    
    events = DailyEvent.objects.filter(user=request.user)
    daily_events_ser = DailyEventSerializer(events, many=True)

    events = WeeklyEvent.objects.filter(user=request.user)
    Weekly_events_ser = WeeklyEventSerializer(events, many=True)
    
    return Response({
        "onetime_events": onetime_events_ser.data,
        "daily_events": daily_events_ser.data,
        "weekly_events": Weekly_events_ser.data
    })




@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@ensure_csrf_cookie
def notes(request):
    if not request.user.is_authenticated:
        return Response({"detail":"not authorized"}, status=400)
        
    if request.method == 'POST':
        contents = request.data.get('contents')

        if not contents:
            return Response({"detail":"no contents found"}, status=400)

        new_note = Note(user = request.user, contents=contents)
        new_note.save()

    if request.method == 'PUT':
        contents = request.data.get('contents')
        id = request.data.get('id')

        if not contents:
            return Response({"detail":"no contents found"}, status=400)
        if not id:
            return Response({"detail":"no id found"}, status=400)

        note = Note.objects.get(id=id)
        note.contents = contents
        note.save()

    if request.method == 'DELETE':
        id = request.data.get('id')
        if not id:
            return Response({'detail':'no id found'})

        note = Note.objects.get(id=id)
        note.delete()

    notes = Note.objects.filter(user = request.user)
    serialized_notes = NoteSerializer(notes, many=True)
    return Response(serialized_notes.data)



@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@ensure_csrf_cookie
def tasks(request):
    if not request.user.is_authenticated:
        return Response({'detail':'not authorized'}, status=400)


    if request.method == 'POST':
        contents = request.data.get('contents')
        deadline = request.data.get('deadline')
        stage = request.data.get('stage')

        deadline = '-'.join(reversed(deadline.split('.')))

        goal_id = request.data.get('goal_id')
        if not goal_id:
            return Response({'detail':'no goal id found'})

        if not contents or not deadline:
            return Response({'detail': 'not enough info'})
        
        if stage:
            Task.objects.create(user=request.user, contents=contents, deadline=deadline, goal_id=goal_id, stage=stage)
        else:
            Task.objects.create(user=request.user, contents=contents, deadline=deadline, goal_id=goal_id)

    if request.method == 'PUT':
        contents = request.data.get('contents')
        deadline = request.data.get('deadline')
        stage = request.data.get('stage')
        
        deadline = '-'.join(reversed(deadline.split('.')))

        task_id = request.data.get('id')

        goal_id = request.data.get('goal_id')
        if not goal_id:
            return Response({'detail':'no goal id found'})

        if not contents or not deadline:
            return Response({'detail': 'not enough info'})
        
        Task.objects.filter(id=task_id).update(contents=contents, deadline=deadline, stage=stage)

    if request.method == 'DELETE':
        task_id = request.data.get('id')
        
        task = Task.objects.get(id=task_id)
        task.delete()

    # tasks = Task.objects.filter(user=request.user)
    # serialized_tasks = TaskSerializer(tasks, many=True)

    return Response({"detail":"success"})



@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@ensure_csrf_cookie
def goals(request):
    if not request.user.is_authenticated:
        return Response({"detail":"not authorized"}, status=400)

    if request.method == 'POST':
        contents = request.data.get('contents')
        
        if not contents:
            return Response({'detail': 'not enough info'})

        goal = Goal.objects.create(user=request.user, contents=contents)
 
    if request.method == 'PUT':
        contents = request.data.get('contents')
        id = request.data.get('id')

        if not contents :
            return Response({"detail":"not enough info"}, status=400)
        if not id:
            return Response({"detail":"no id found"}, status=400)
        
        Goal.objects.filter(id=id).update(contents=contents)

    if request.method == 'DELETE':
        id = request.data.get('id')
        if not id:
            return Response({'detail':'no id found'})
        
        goal = Goal.objects.get(id=id)
        goal.delete()

    goals = Goal.objects.filter(user=request.user)
    serialized_goals = GoalSerializer(goals, many=True)
    return Response(serialized_goals.data)

