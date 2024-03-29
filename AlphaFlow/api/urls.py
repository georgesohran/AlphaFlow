from django.urls import path
from . import views

urlpatterns = [
    path('login', view=views.api_login, name='login'),
    path('logout', view=views.api_logout, name='logout'),
    path('register', view=views.api_register, name='register'),
    path('csrf', views.get_csrf, name='api_csrf'),

    path('daily_events', view=views.daily_events, name='daily_events'),
    path('weakly_events', view=views.weakly_events, name='weakly_events'),
    path('onetime_events', view=views.onetime_events, name='onetime_events'),
    path('notes', view=views.notes, name='notes'),
    path('goals', view=views.goals, name='goals'),
]