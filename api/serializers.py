from dataclasses import field
from rest_framework.serializers import ModelSerializer
from .models import Product

class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class NewProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'name',
            'amount',
            'price'
        ]