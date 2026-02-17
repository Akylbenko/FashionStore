from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Product
from .serializers import ProductSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])

def test_view(request):
    return Response({"message": "Ты авторизован!"})

@api_view(['POST'])
def register_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if User.objects.filter(username=username).exists():
        return Response({"error": "Пользователь уже существует"}, status=400)

    user = User.objects.create_user(username=username, password=password)
    return Response({"message": "Пользователь создан"}, status=201)