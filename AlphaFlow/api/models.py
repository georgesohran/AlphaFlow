from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass
    

class TimeEvent(models.Model):
    description = models.TextField(max_length=512)
    color = models.CharField(max_length=7, default='#f44336')

    class Meta:
        abstract = True

class OneTimeEvent(TimeEvent):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_one_event')
    start = models.DateTimeField()
    finish = models.DateTimeField()

class WeeklyEvent(TimeEvent):
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
    finish = models.TimeField()
    
class DailyEvent(TimeEvent):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_day_event')
    start = models.TimeField()
    finish = models.TimeField()



class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_goal')
    contents = models.TextField()
    deadline = models.DateField()
    reached = models.BooleanField(default=False)



class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_note')
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE, related_name='goal_notes', blank=True, null=True)
    contents = models.TextField()



class Task(models.Model):
    TASK_STAGES = (
        ('Delayed','Delayed'),
        ('TODO', 'TODO'),
        ('In Progress','In Progress'),
        ('Done','Done')
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_task')
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE, related_name='goal_tasks')
    contents = models.TextField()
    stage = models.CharField(max_length=11, choices=TASK_STAGES, default='TODO')
    deadline = models.DateField()
    