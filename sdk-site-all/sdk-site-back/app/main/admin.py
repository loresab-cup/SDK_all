from django.contrib import admin
from .models import (
    Product, Grade, Surface, Width, ProductVariant,
    Cart, CartItem, Order, OrderItem, CallbackRequest,
    Session, OrderStatus
)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin): # Настройка для товара
    list_display = ['name', 'category', 'is_active', 'created_at'] # Показ колонок в списке товаров
    list_filter = ['is_active', 'category'] # Фильтры в правой части экрана
    search_fields = ['name', 'category'] # Поиск


@admin.register(ProductVariant)  # Настройка для варианта товара (добавляет конкретные разеры и цены)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ['product', 'grade', 'surface', 'width', 'thickness', 'length', 'price_per_m3', 'is_active']
    list_filter = ['is_active', 'product', 'grade']
    search_fields = ['product__name']


@admin.register(Cart) # Настройка для корзины
class CartAdmin(admin.ModelAdmin):
    list_display = ['id', 'session', 'created_at', 'updated_at']
    readonly_fields = ['created_at', 'updated_at'] # Автоматически создаются даты


@admin.register(CartItem) # Товары в корзине
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['cart', 'variant', 'quantity', 'price_at_moment']


@admin.register(Order) # Настройка для заказов
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_number', 'client_surname', 'client_name', 'phone', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['order_number', 'client_name', 'client_surname', 'phone'] #Поля для поиска
    readonly_fields = ['order_number', 'created_at', 'updated_at'] # поля для чтения


@admin.register(OrderItem) # Настройка для товаров в заказе
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'variant', 'quantity', 'price']


@admin.register(CallbackRequest) # Настройка для заявки для звонков
class CallbackRequestAdmin(admin.ModelAdmin):
    list_display = ['phone', 'created_at', 'is_processed']
    list_filter = ['is_processed', 'created_at']
    search_fields = ['phone']


admin.site.register(Grade)
admin.site.register(Surface)
admin.site.register(Width)
admin.site.register(Session)
admin.site.register(OrderStatus)
