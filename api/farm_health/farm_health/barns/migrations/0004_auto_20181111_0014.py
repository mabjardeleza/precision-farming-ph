# Generated by Django 2.1.2 on 2018-11-10 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('barns', '0003_pig'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pig',
            name='status',
        ),
        migrations.AddField(
            model_name='pig',
            name='alive',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='pig',
            name='death_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
