from django.db import models

# Create your models here.

class Product(models.Model):
    name = models.TextField(null=True,blank=True)
    amount = models.PositiveIntegerField(null=True,blank=True)
    price = models.PositiveIntegerField(null=True,blank=True)
    updated = models.DateTimeField(auto_now= True)
    created= models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.name