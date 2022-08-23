from django.urls import include, path
from rest_framework.routers import DefaultRouter

from restapi import views

router = DefaultRouter()
router.register(r'projects', views.ProjectViewSet, basename='projects')
router.register(r'comments', views.CommentViewSet, basename='comments')
router.register(r'users', views.UserViewSet, basename='users')

router.register(r'auth/login', views.LoginViewSet, basename='auth-login')
router.register(r'auth/register', views.RegistrationViewSet, basename='auth-register')
router.register(r'auth/refresh', views.RefreshViewSet, basename='auth-refresh')



urlpatterns = [
    path('', include(router.urls)),
]
