from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    pass


class TimeEvent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_event')
    description = models.TextField(max_length=512)
    start = models.DateTimeField()
    end = models.DateTimeField()
    color = models.CharField(max_length=7, default='#f01e2c')
    picture = models.ImageField(null=True, blank=True, upload_to='images')



class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_note')
    contents = models.TextField()


class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_goal')
    notes = models.ForeignKey(Note, on_delete=models.CASCADE, related_name='notes', blank=True, null=True)
    events = models.ForeignKey(TimeEvent, on_delete=models.CASCADE, related_name='events', blank=True, null=True)
    contents = models.TextField()
    reached = models.BooleanField()
    


