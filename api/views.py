from itertools import product
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProductSerializer, NewProductSerializer, UpdateSerializer
from .models import Product

# Create your views here.

@api_view(['GET'])
def getRoute(request):

    routes = [
        {
            'Endpoint': '/products/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of products'
        },
        {
            'Endpoint': '/products/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new products with data sent in post request'
        },
        {
            'Endpoint': '/products/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing product with data sent in post request'
        },
        {
            'Endpoint': '/products/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting product'
        },
    ]

    return Response(routes)


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all().order_by('-updated')
    serializer = ProductSerializer(products, many=True)
    print(serializer.data)
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


@api_view(["PUT"])
def updateProduct(request, pk):
    data= request.data
    true_data = {"amount":data[0],"price":data[1]}
    product = Product.objects.get(id=pk)
    print(data)
    serializer = UpdateSerializer(instance=product, data=true_data)

    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)