from django.conf import settings
from rest_framework import serializers

from farm_health.barns import models


class BarnSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Barn
        fields = (
            'id',
            'reference_id',
        )


class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Sensor
        fields = (
            'id',
            'reference_id',
        )


class BarnDataSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    aggregate_temperature = serializers.SerializerMethodField()
    aggregate_humidity = serializers.SerializerMethodField()
    aggregate_air_quality = serializers.SerializerMethodField()

    class Meta:
        model = models.Barn
        fields = (
            'id',
            'reference_id',
            'aggregate_temperature',
            'aggregate_humidity',
            'aggregate_air_quality',
        )

    def get_status(self, barn):
        sensor_data = barn.get_aggregated_sensor_data()
        all_none = False
        for key, value in sensor_data.items():
            all_none = all_none or (value is not None)
        if all_none:
            return 'unknown'
        else:
            # Complex logic for determining status!
            temp_threshold = settings.get('THRESHOLD_TEMPERATURE', None) or barn.sensor

    def get_aggregate_temperature(self, barn):
        return barn.get_aggregated_sensor_data()['aggregate_temperature']

    def get_aggregate_humidity(self, barn):
        return barn.get_aggregated_sensor_data()['aggregate_humidity']

    def get_aggregate_air_quality(self, barn):
        return barn.get_aggregated_sensor_data()['aggregate_air_quality']
