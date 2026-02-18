from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="products/", null=True, blank=True)
    stock = models.PositiveIntegerField(default=1)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products", default = 1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
