from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'flashcards', views.FlashcardView, 'flashcard')


urlpatterns = [
    path('', views.index, name='index'),
    path('api/', include(router.urls))
]