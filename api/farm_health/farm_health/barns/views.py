from rest_framework import viewsets

from farm_health.barns import models, serializers


class BarnViewSet(viewsets.ModelViewSet):
    queryset = models.Barn.objects.all()
    serializer_class = serializers.BarnDataSerializer
