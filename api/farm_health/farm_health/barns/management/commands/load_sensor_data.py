import csv

from django.core.management.base import BaseCommand, CommandError
from farm_health.barns import models


class Command(BaseCommand):
    help = 'Loads sensor data from a file and adds it to the database.'

    def add_arguments(self, parser):
        parser.add_argument('filename', type=str)

    def handle(self, *args, **options):
        csv_file = csv.DictReader(open(options['filename'], 'r'))

        for row in csv_file:
            models.SensorDataPoint.objects.create(
                barn=models.Barn.objects.get(pk=row['barn']),
                sensor=models.Sensor.objects.get(pk=row['sensor']),
                temperature=row['aggregated_temperature'],
                humidity=row['aggregated_humidity'],
                air_quality=row['aggregated_air_quality'],
                image_feed=row['image_feed'],
                created=row['time'],
                modified=row['time'],
            )

        self.stdout.write('Successfully loaded sensor data from {}.'.format(options['filename']))
