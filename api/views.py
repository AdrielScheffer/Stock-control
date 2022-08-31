from itertools import product
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProductSerializer, NewProductSerializer
from .models import Product

# Create your views here.

@api_view(['GET'])
def getRoute(request):

    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]

    return Response(routes)


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all().order_by('-updated')
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createProduct(request):
    data= request.data
    products = Product.objects.create(
        name = data[0],
        amount = data[1],
        price= data[2]
        )
    serializer = NewProductSerializer(products)
    return Response(serializer.data)


@api_view(["DELETE"])
def deleteProduct(request,pk):
    product = Product.objects.get(id=pk)
    product.delete()
    return Response('note was deleted!')