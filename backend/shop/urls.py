from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, test_view, register_view

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = router.urls + [
    path('test/', test_view),
    path('register/', register_view),
]
