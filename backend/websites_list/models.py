from django.db import models


# Create your models here.
class Website(models.Model):
    nickname = models.CharField(max_length=500, default='')
    full_name = models.CharField(max_length=500, default='')
    url = models.CharField(max_length=500, default='')

    def _str_(self):
        return str(self.full_name)


class Joke(models.Model):
    joke = models.CharField(max_length=500, default='', blank=True)
    answer = models.CharField(max_length=500, default='', blank=True)
    source = models.CharField(max_length=500, default='', blank=True)

    def _str_(self):
        return str(self.full_name)
