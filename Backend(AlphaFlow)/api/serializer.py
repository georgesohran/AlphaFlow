from rest_framework import serializers
from .models import *

class TimeEventSerializer(serializers.ModelSerializer):
    class Meta():
        model = TimeEvent
        fields = '__all__'


class GoalSerializer(serializers.ModelSerializer):
    class Meta():
        model = Goal
        fields = '__all__'


class NoteSerializer(serializers.Serializer):
    class Meta():
        model = Note
        fields = '__all__'