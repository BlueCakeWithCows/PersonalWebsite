from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'websites', views.WebsiteView, 'websites')
router.register(r'joke', views.JokeView, 'joke')

urlpatterns = [
    path('api/', include(router.urls))
]
