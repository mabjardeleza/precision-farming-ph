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


class BarnStatusSerializer(serializers.Serializer):
    temperature = serializers.BooleanField()
    humidity = serializers.BooleanField()
    air_quality = serializers.BooleanField()
    overall = serializers.BooleanField()


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
            'status',
        )

    def get_status(self, barn):
        sensor_data = barn.get_aggregated_sensor_data()
        all_none = False
        for key, value in sensor_data.items():
            all_none = (value is not None) or all_none
        if not all_none:
            return 'unknown'
        else:
            # Complex logic for determining status!
            thresholds = models.Thresholds.load()
            statuses = {}
            overall = True
            if sensor_data.get('aggregate_temperature', None):
                statuses['temperature'] = thresholds.temperature_minimum <= sensor_data.get('aggregate_temperature') <= thresholds.temperature_maximum
                overall = False if not statuses['temperature'] else overall
            else:
                statuses['temperature'] = None

            if sensor_data.get('aggregate_humidity', None):
                statuses['humidity'] = thresholds.humidity_minimum <= sensor_data.get('aggregate_humidity') <= thresholds.humidity_maximum
                overall = False if not statuses['humidity'] else overall
            else:
                statuses['humidity'] = None

            if sensor_data.get('aggregate_air_quality', None):
                statuses['air_quality'] = thresholds.air_quality_minimum <= sensor_data.get('aggregate_air_quality') <= thresholds.air_quality_maximum
                overall = False if not statuses['air_quality'] else overall
            else:
                statuses['air_quality'] = None

            statuses['overall'] = overall

            return BarnStatusSerializer(statuses).data

    def get_aggregate_temperature(self, barn):
        return barn.get_aggregated_sensor_data()['aggregate_temperature']

    def get_aggregate_humidity(self, barn):
        return barn.get_aggregated_sensor_data()['aggregate_humidity']

    def get_aggregate_air_quality(self, barn):
        return barn.get_aggregated_sensor_data()['aggregate_air_quality']


class OverviewSerializer(serializers.Serializer):
    health = serializers.SerializerMethodField()
    dailies = serializers.DictField(
        child=serializers.BooleanField()
    )
    todos = serializers.SerializerMethodField()
