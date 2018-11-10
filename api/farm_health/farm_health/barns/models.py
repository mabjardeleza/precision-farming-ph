import uuid

from django.db import models
from model_utils.models import TimeStampedModel


class Barn(TimeStampedModel):
    reference_id = models.UUIDField(default=uuid.uuid4, unique=True)

    def __str__(self):
        return self.reference_id


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
