from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Product, Favorite, Profile
from .serializers import ProductSerializer, UserSerializer, FavoriteSerializer, ProfileSerializer
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .permissions import IsOwnerOrReadOnly

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by("-created_at")
    serializer_class = ProductSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=["post"])
    def remove(self, request):
        product_id = request.data.get("product")

        favorite = Favorite.objects.filter(
            user=request.user,
            product_id=product_id
        ).first()

        if favorite:
            favorite.delete()
            return Response({"message": "Удалено"})

        return Response({"error": "Нет в избранном"}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])

def test_view(request):
    return Response({"message": "Ты авторизован!"})

@api_view(['POST'])
def register_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")

    if User.objects.filter(username=username).exists():
        return Response({"error": "Пользователь уже существует"}, status=400)

    user = User.objects.create_user(
        username=username,
        password=password,
        email=email
    )

    return Response({"message": "Пользователь создан"}, status=201)

@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def me_view(request):
    profile = request.user.profile

    if request.method == "GET":
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    if request.method == "PUT":
        serializer = ProfileSerializer(
            profile,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)