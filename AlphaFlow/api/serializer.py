from rest_framework import serializers
from .models import *


class DailyEventSerializer(serializers.ModelSerializer):
    class Meta():
        model = DailyEvent
        fields = '__all__'

class WeaklyEventSerializer(serializers.ModelSerializer):
    class Meta():
        model = WeaklyEvent
        fields = '__all__'

class OneTimeEventSerializer(serializers.ModelSerializer):
    class Meta():
        model = OneTimeEvent
        fields = '__all__'



class GoalSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    contents = serializers.CharField(max_length=216)
    deadline = serializers.DateField()
    class Meta():
        model = Goal
        fields = ('contents', 'id', 'deadline')


class NoteSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    contents = serializers.CharField(required=False, max_length=1000, allow_null=True)
    class Meta():
        model = Note
        fields = ('contents', 'id')