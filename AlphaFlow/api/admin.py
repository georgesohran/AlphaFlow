from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(User)
admin.site.register(DailyEvent)
admin.site.register(WeeklyEvent)
admin.site.register(OneTimeEvent)
admin.site.register(Note)
admin.site.register(Goal)
