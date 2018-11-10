import uuid

from django.db import models
from model_utils.models import TimeStampedModel


class Barn(TimeStampedModel):
    reference_id = models.UUIDField(default=uuid.uuid4, unique=True)

    def __str__(self):
        return self.reference_id


class SensorDataPoint(TimeStampedModel):
    barn = models.ForeignKey(Barn, on_delete=models.CASCADE)
    humidity = models.DecimalField(decimal_places=4, max_digits=12, null=True, blank=True)
    temperature = models.DecimalField(decimal_places=4, max_digits=12, null=True, blank=True)
    air_quality = models.DecimalField(decimal_places=4, max_digits=12, null=True, blank=True)
    image_feed = models.ImageField(upload_to='uploads/feed/')

    def __str__(self):
        return '{}: {}'.format(self.barn, self.created)
