from rest_framework import serializers
from .models import *

class DaylyEventSerializer(serializers.ModelSerializer):
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
    class Meta():
        model = Goal
        fields = '__all__'


class NoteSerializer(serializers.Serializer):
    class Meta():
        model = Note
        fields = '__all__'