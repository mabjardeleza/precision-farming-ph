from django.urls import path, include
from rest_framework.routers import SimpleRouter

router = SimpleRouter()

app_name = 'barns'
url_patterns = [
    path('', include(router.urls)),
]
