from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password required"}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken"}, status=400)

        user = User.objects.create_user(username=username, password=password)
        return Response({"message": "User registered successfully!"}, status=201)
