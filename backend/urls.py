from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    re_path('.*', TemplateView.as_view(template_name='index.html')),
    path('', include('restapi.urls')),
]
