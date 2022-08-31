from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoute, name="routes"),
    path('products/', views.getProducts, name="products"),
    path('products/create/', views.createProduct, name="product-create"),
    path('products/<str:pk>/delete/', views.deleteProduct, name="product-delete")
    
]
