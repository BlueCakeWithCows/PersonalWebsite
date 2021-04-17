from django.shortcuts import render
from rest_framework import viewsets

from .serializer import WebsiteSerializer, JokeSerializer
from .models import Website, Joke


# Create your views here.

class WebsiteView(viewsets.ModelViewSet):
    serializer_class = WebsiteSerializer
    queryset = Website.objects.all()


class JokeView(viewsets.ModelViewSet):
    serializer_class = JokeSerializer
    queryset = Joke.objects.all()
