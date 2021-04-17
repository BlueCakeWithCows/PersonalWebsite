from rest_framework import serializers

from .models import Website, Joke


class WebsiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Website
        fields = ('nickname', 'full_name', 'url')


class JokeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Joke
        fields = ('joke', 'answer', 'source')
