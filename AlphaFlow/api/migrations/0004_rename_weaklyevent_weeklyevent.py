# Generated by Django 4.2.8 on 2024-04-12 16:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_goal_deadline'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='WeaklyEvent',
            new_name='WeeklyEvent',
        ),
    ]
