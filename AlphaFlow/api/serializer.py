from rest_framework import serializers
from .models import *


class DailyEventSerializer(serializers.ModelSerializer):
    class Meta():
        model = DailyEvent
        fields = '__all__'

class WeeklyEventSerializer(serializers.ModelSerializer):
    class Meta():
        model = WeeklyEvent
        fields = '__all__'

class OneTimeEventSerializer(serializers.ModelSerializer):
    class Meta():
        model = OneTimeEvent
        fields = '__all__'



class NoteSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    contents = serializers.CharField(required=False, max_length=1000, allow_null=True)
    class Meta():
        model = Note
        fields = ('contents', 'id')

class TaskSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    contents = serializers.CharField(required=False, max_length=1000, allow_null=True)
    deadline = serializers.DateField()
    stage = serializers.CharField(required=False, max_length=11)
    class Meta():
        model = Task
        fields = ['id','contents', 'deadline', 'stage']


class GoalSerializer(serializers.ModelSerializer):
    goal_tasks = TaskSerializer(many=True, read_only=True)
    id = serializers.IntegerField(read_only=True)
    contents = serializers.CharField(max_length=216)
    class Meta():
        model = Goal
        fields = ['contents', 'id', 'goal_tasks']


