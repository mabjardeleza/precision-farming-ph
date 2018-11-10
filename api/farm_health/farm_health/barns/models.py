import uuid

from django.db import models
from model_utils import Choices
from model_utils.models import TimeStampedModel


class Barn(TimeStampedModel):
    reference_id = models.UUIDField(default=uuid.uuid4, unique=True)

    def __str__(self):
        return self.reference_id


class PigQuerySet(models.QuerySet):
    def alive_in_barn(self, barn):
        return self.filter(barn=barn, alive=True)

    def dead_in_barn(self, barn):
        return self.filter(barn=barn, alive=False)

    def alive(self):
        return self.filter(alive=True)

    def dead(self):
        return self.filter(alive=False)

    def in_barn(self, barn):
        return self.filter(barn=barn)


class Pig(TimeStampedModel):
    barn = models.ForeignKey(Barn, on_delete=models.CASCADE)
    alive = models.BooleanField(default=True)
    death_date = models.DateTimeField(null=True, blank=True)

    objects = PigQuerySet.as_manager()


class Sensor(TimeStampedModel):
    reference_id = models.UUIDField(default=uuid.uuid4, unique=True)
    barn = models.ForeignKey(Barn, on_delete=models.CASCADE)

    def __str__(self):
        return self.reference_id


class SensorDataPoint(TimeStampedModel):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    humidity = models.DecimalField(decimal_places=4, max_digits=12, null=True, blank=True)
    temperature = models.DecimalField(decimal_places=4, max_digits=12, null=True, blank=True)
    air_quality = models.DecimalField(decimal_places=4, max_digits=12, null=True, blank=True)
    image_feed = models.ImageField(upload_to='uploads/feed/')

    def __str__(self):
        return '{} - {} - {}'.format(self.sensor.barn, self.sensor, self.created)
