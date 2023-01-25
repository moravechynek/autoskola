from django.shortcuts import render
from django.http import HttpResponse
from .models import Otazka, Odpoved
from rest_framework import generics
from .serializers import OtazkaSerializer, OdpovedSerializer

def main(request):
    return HttpResponse('<h1>API</h1>')

def test(request):
    otazka = Otazka.objects.all()[0]
    return HttpResponse(otazka)

class TestView(generics.ListAPIView):
    queryset = Otazka.objects.all()[0:1]
    serializer_class = OtazkaSerializer

class OdpovediView(generics.ListAPIView):
    queryset = Odpoved.objects.order_by('-timestamp')[0:3]
    serializer_class = OdpovedSerializer