from django.contrib import admin

from .models import * 

admin.site.register(Customer)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)

# @admin.register(Customer)
# class CustomerAdmin(admin.ModelAdmin):
#     list_display = ('name',)
    
# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ('name', 'price')

# @admin.register(Order)
# class OrderAdmin(admin.ModelAdmin):
#     list_display = ('id',)

# @admin.register(OrderItem)
# class OrderItemAdmin(admin.ModelAdmin):
#     list_display = ('name',)

# @admin.register(ShippingAddress)
# class ShippingAddressAdmin(admin.ModelAdmin):
#     list_display = ('address',)