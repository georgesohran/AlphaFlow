from django.urls import path, include
from . import views

urlpatterns = [
    path('get_events', view=views.get_events, name='get_events'),
    path('get_notes', view=views.get_notes, name='get_notes'),
    path('get_goals', view=views.get_goals, name='get_goals')
]