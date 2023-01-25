from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('test', index),
    path('historie', index),
]