import uuid
import datetime

from django.db import models
from django.db.models import Avg
from django.utils import timezone
from model_utils.models import TimeStampedModel


class SingletonModel(models.Model):

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super(SingletonModel, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj


class Thresholds(SingletonModel):
    # Source for default values on temperature and humidity
    # https://www.heatstress.info/LostProduction/Wherefarmedanimalsbirdsaremostcomfortable/PigTHI.aspx
    temperature_minimum = models.DecimalField(max_digits=12, decimal_places=4, default=18)
    temperature_maximum = models.DecimalField(max_digits=12, decimal_places=4, default=25)
    humidity_minimum = models.DecimalField(max_digits=12, decimal_places=4, default=40)
    humidity_maximum = models.DecimalField(max_digits=12, decimal_places=4, default=50)
    air_quality_minimum = models.DecimalField(max_digits=12, decimal_places=4, default=100)
    air_quality_maximum = models.DecimalField(max_digits=12, decimal_places=4, default=200)


class Barn(TimeStampedModel):
    reference_id = models.UUIDField(default=uuid.uuid4, unique=True)

    def __str__(self):
        return str(self.reference_id)

    def get_aggregated_sensor_data(self):
        return self.sensordatapoint_set.aggregate(
            aggregate_temperature=Avg('temperature'),
            aggregate_humidity=Avg('humidity'),
            aggregate_air_quality=Avg('air_quality'),
        )

    def get_pig_count(self):
        return self.pig_set.alive_in_barn(barn=self).count()

    def get_death_today_count(self):
        return self.pig_set.dead_today(barn=self).count()


class PigQuerySet(models.QuerySet):
    def alive_in_barn(self, barn):
        return self.filter(barn=barn, alive=True)

    def dead_in_barn(self, barn):
        return self.filter(barn=barn, alive=False)

    def dead_today(self, barn):
        today = timezone.now().replace(hour=0, minute=0, second=0, microsecond=0)
        tomorrow = today + datetime.timedelta(days=1)
        return self.filter(barn=barn, death_date__range=(today, tomorrow))

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
        return str(self.reference_id)


class SensorDataPoint(TimeStampedModel):
    barn = models.ForeignKey(Barn, on_delete=models.CASCADE)
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    humidity = models.DecimalField(decimal_places=4, max_digits=12, null=True, blank=True)
    temperature = models.DecimalField(decimal_places=4, max_digits=12, null=True, blank=True)
    air_quality = models.DecimalField(decimal_places=4, max_digits=12, null=True, blank=True)
    image_feed = models.ImageField(upload_to='uploads/feed/')

    def __str__(self):
        return '{} - {} - {}'.format(self.sensor.barn, self.sensor, self.created)
