from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, signup, ProductUpdateView
from . import views


router = DefaultRouter()
router.register(r"products", ProductViewSet, basename="product")

urlpatterns = [
    path("", include(router.urls)),
    path("signup/", signup),
    path('products/<int:pk>/', views.product_detail, name='product_detail'),
    path('products/<int:pk>/edit/', ProductUpdateView.as_view(), name='product-edit'),


]


