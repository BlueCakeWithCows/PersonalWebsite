from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Website, Joke


class WebsiteAdmin(admin.ModelAdmin):
    list_display = ('nickname', 'full_name', 'url')


class JokeAdmin(admin.ModelAdmin):
    list_display = ('joke', 'answer', 'source')


# Register your models here.

admin.site.register(Website, WebsiteAdmin)
admin.site.register(Joke, JokeAdmin)
