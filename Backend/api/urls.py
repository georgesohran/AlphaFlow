from django.urls import path, include
from . import views

urlpatterns = [
    path('get_daily_events', view=views.get_daily_events, name='get_daily_events'),
    path('get_weakly_events', view=views.get_weakly_events, name='get_weakly_events'),
    path('get_onetime_events', view=views.get_onetime_events, name='get_onetime_events'),
    path('get_notes', view=views.get_notes, name='get_notes'),
    path('get_goals', view=views.get_goals, name='get_goals')
]