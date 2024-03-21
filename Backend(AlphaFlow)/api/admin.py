from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(DaylyEvent)
admin.site.register(WeaklyEvent)
admin.site.register(OneTimeEvent)
admin.site.register(User)
admin.site.register(Note)
admin.site.register(Goal)
