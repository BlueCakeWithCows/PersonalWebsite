from django.shortcuts import render

from django.http import HttpResponse
from rest_framework import viewsets

from .models import Flashcard
from .serializer import FlashcardSerializer


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

class FlashcardView(viewsets.ModelViewSet):
    serializer_class = FlashcardSerializer
    queryset = Flashcard.objects.all()