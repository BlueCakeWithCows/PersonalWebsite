from django.contrib import admin
from .models import Flashcard


class FlashcardsAdmin(admin.ModelAdmin):
    list_display = ('front_side', 'back_side', 'notes')


# Register your models here.

admin.site.register(Flashcard, FlashcardsAdmin)
from django.contrib import admin

# Register your models here.
