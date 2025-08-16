from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer, SignupSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by("-created_at")
    serializer_class = ProductSerializer

    def get_permissions(self):
        # List/retrieve: public; create/update/delete: auth required
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsAuthenticatedOrReadOnly()]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

@api_view(["POST"])
@permission_classes([AllowAny])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
