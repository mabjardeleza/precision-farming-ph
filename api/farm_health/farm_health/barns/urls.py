from django.urls import path, include
from rest_framework.routers import SimpleRouter

from farm_health.barns import views

router = SimpleRouter()
router.register('barns', views.BarnViewSet, base_name='barns')

app_name = 'barns'
urlpatterns = [
    path('', include(router.urls)),
]
