# Generated by Django 4.2.8 on 2024-04-14 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_rename_end_dailyevent_finish_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weeklyevent',
            name='day',
            field=models.CharField(choices=[('Mon', 'monday'), ('Tue', 'tuesday'), ('Wed', 'wednesday'), ('Thu', 'thursday'), ('Fri', 'friday'), ('Sat', 'saturday'), ('Sun', 'sunday')], default='MON', max_length=9),
        ),
    ]