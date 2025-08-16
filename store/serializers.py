from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id","name","description","price","image","image_url","created_at"]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and hasattr(obj.image, "url"):
            url = obj.image.url
            return request.build_absolute_uri(url) if request else url
        return None

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ("username", "password")
    def create(self, validated_data):
        user = User(username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()
        return user
