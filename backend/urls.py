from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView

urlpatterns = [
    re_path('.*', TemplateView.as_view(template_name='index.html')),
    path('', include('restapi.urls')),
]
