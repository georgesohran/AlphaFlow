from django.urls import path
from . import views

urlpatterns = [
    path('login', view=views.api_login, name='login'),
    path('logout', view=views.api_logout, name='logout'),
    path('register', view=views.api_register, name='register'),
    path('session', views.session_view, name='session'),

    path('daily_events', view=views.daily_events, name='daily_events'),
    path('weekly_events', view=views.weekly_events, name='weekly_events'),
    path('onetime_events', view=views.onetime_events, name='onetime_events'),
    path('get_upcoming_events', view=views.get_upcoming_events, name='get_upcoming_events'),

    path('notes', view=views.notes, name='notes'),
    path('goals', view=views.goals, name='goals'),
    path('tasks', view=views.tasks, name='tasks')
]