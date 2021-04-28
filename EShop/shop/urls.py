from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.shop, name="shop"),
    path('cart/', views.cart, name="cart"),
    path('checkout/', views.checkout, name="checkout"),
    path('VR/', views.goVR, name="vr"),
]
