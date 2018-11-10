from django.urls import path, include
from rest_framework.routers import SimpleRouter

router = SimpleRouter()

app_name = 'barns'
urlpatterns = [
    path('', include(router.urls)),
]
