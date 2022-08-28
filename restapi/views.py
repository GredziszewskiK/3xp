from urllib import request
from django.db.models import Q
from rest_framework.decorators import action
from rest_framework import permissions, viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt import views
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

from restapi.models import Project, Comment, User
from restapi.permissions import IsOwnerOrReadOnly, IsProjectUser
from restapi.serializers import ProjectSerializer, CommentSerializer, UserSerializer, LoginSerializer, RegisterSerializer, PasswordSerializer

from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os
import datetime


class LoginViewSet(viewsets.ModelViewSet, views.TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class RegistrationViewSet(viewsets.ModelViewSet, views.TokenObtainPairView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']
    def create(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

        return Response({
            "user": serializer.data,
            "refresh": res["refresh"],
            "token": res["access"]
        }, status=status.HTTP_201_CREATED)


class RefreshViewSet(viewsets.ViewSet, views.TokenRefreshView):
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsProjectUser)
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    @action(detail=True, methods=['post'])
    def add_comment(self, request, pk=None):
        project = self.get_object()
        owner = request.user
        content = request.data['description']
        comment = Comment(project=project, owner=owner, created=datetime.datetime.now(), content=content)
        comment.save()
        queryset = Project.objects.get(id=project.id)
        serializer = ProjectSerializer(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = Project.objects.filter(Q(owner=request.user.id) | Q(users__user=request.user.id)).distinct()
        serializer = ProjectSerializer(queryset, many=True)
        return Response(serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    queryset = User.objects.all()
    serializer_class = UserSerializer   

    @action(detail=True, methods=['post'])
    def set_password(self, request, pk=None):
        user = self.get_object()
        serializer = PasswordSerializer(data=request.data)
        if serializer.is_valid():
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({'status': 'password set'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Add this CBV
class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()