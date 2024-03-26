from django.urls import path
from . import views

urlpatterns = [
    path('login', view=views.api_login, name='login'),
    path('logout', view=views.api_logout, name='logout'),
    path('register', view=views.api_register, name='register'),

    path('get_daily_events', view=views.get_daily_events, name='get_daily_events'),
    path('get_weakly_events', view=views.get_weakly_events, name='get_weakly_events'),
    path('get_onetime_events', view=views.get_onetime_events, name='get_onetime_events'),
    path('get_notes', view=views.get_notes, name='get_notes'),
    path('get_goals', view=views.get_goals, name='get_goals'),
]