# Generated by Django 2.1.2 on 2018-11-10 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('barns', '0005_sensordatapoint_barn'),
    ]

    operations = [
        migrations.CreateModel(
            name='Thresholds',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('temperature_minimum', models.DecimalField(decimal_places=4, default=18, max_digits=12)),
                ('temperature_maximum', models.DecimalField(decimal_places=4, default=25, max_digits=12)),
                ('humidity_minimum', models.DecimalField(decimal_places=4, default=40, max_digits=12)),
                ('humidity_maximum', models.DecimalField(decimal_places=4, default=50, max_digits=12)),
                ('air_quality_minimum', models.DecimalField(decimal_places=4, default=100, max_digits=12)),
                ('air_quality_maximum', models.DecimalField(decimal_places=4, default=200, max_digits=12)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]