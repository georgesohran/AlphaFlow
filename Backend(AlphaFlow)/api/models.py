from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    pass


class TimeEvent(models.Model):
    description = models.TextField(max_length=512)
    color = models.CharField(max_length=7, default='#f01e2c')
    # picture = models.ImageField(null=True, blank=True, upload_to='images')

    class Meta:
        abstract = True



class OneTimeEvent(TimeEvent):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_one_event')
    start = models.DateTimeField()
    end = models.DateTimeField()

class WeaklyEvent(TimeEvent):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_weak_event')
    DAY_CHOICES = (
        ('MON', 'monday'),
        ('TUE', 'tuesday'),
        ('WED', 'wednesday'),
        ('THU', 'thursday'),
        ('FRI', 'friday'),
        ('SAT', 'saturday'),
        ('SUN', 'sunday'),
    )

    day = models.CharField(max_length=9, choices=DAY_CHOICES, default='MON')
    start = models.TimeField()
    end = models.TimeField()
    
class DaylyEvent(TimeEvent):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_day_event')
    start = models.TimeField()
    end = models.TimeField()



class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_note')
    contents = models.TextField()



class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_goal')
    notes = models.ForeignKey(Note, on_delete=models.CASCADE, related_name='notes', blank=True, null=True)
    events = models.ForeignKey(DaylyEvent, on_delete=models.CASCADE, related_name='events', blank=True, null=True)
    contents = models.TextField()
    reached = models.BooleanField()
    


