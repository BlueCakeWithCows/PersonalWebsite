from django.db import models


# Create your models here.

class Flashcard(models.Model):
    front_side = models.CharField(max_length=500, default='')
    back_side = models.CharField(max_length=500, default='')
    notes = models.CharField(max_length=500, default='')

    def _str_(self):
        return str(self.id)
