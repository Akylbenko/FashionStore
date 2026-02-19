from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, FavoriteViewSet, test_view, register_view, me_view

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'favorites', FavoriteViewSet, basename='favorite')

urlpatterns = router.urls + [
    path('test/', test_view),
    path('register/', register_view),
    path('me/', me_view),
]   
