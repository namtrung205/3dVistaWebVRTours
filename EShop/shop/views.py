from django.shortcuts import render
from django.http import JsonResponse
import json
import datetime
from .models import * 

# Create your views here.

def shop(request):
	products = Product.objects.all()
	context = {'products':products}
	return render(request, 'shop/shop.html', context)

def cart(request):
    context = {}
    return render(request, 'shop/cart.html', context)

def checkout(request):
    context = {}
    return render(request, 'shop/checkout.html', context)

def goVR(request):
    context = {}
    return render(request, 'VR\VRPanorama.htm', context)