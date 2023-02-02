from django.shortcuts import render
from django.http import HttpResponse
from .models import Otazka, Odpoved
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import OtazkaSerializer, OdpovedSerializer, OtazkaSkoreSerializer
from rest_framework.decorators import api_view
from django.db.models import Q


class TestView(generics.ListAPIView):
    #data = Otazka.objects.all().order_by('skore')[0:1]
    queryset = Otazka.objects.filter(Q(id=1) | Q(id=3)| Q(id=11) | Q(id=12))

    serializer_class = OtazkaSerializer

class OdpovediView(generics.ListAPIView):
    queryset = Odpoved.objects.order_by('-timestamp')[0:3]
    serializer_class = OdpovedSerializer

@api_view(['POST'])
def odpovedCreate(request):
    serializer = OdpovedSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

def testOtazek(request):
    otazky = Otazka.objects.all()
    return render(request, 'test.html', {'otazky': otazky})

def statistiky(request):
    TOPICS = [
        'Pojmy','Jizda',
        'Ostatni','Znacky',
        'Situace','BezpecnostA',
        'BezpecnostB','BezpecnostCD',
        'Predpisy','Provoz',
        'Zdravi'
    ]
    LABELS = [
        'Zákon č. 361/2000Sb. (Pojmy, povinnosti)',
        'Zákon č. 361/2000Sb. (Jízda vozidly)',
        'Zákon č. 361/2000Sb. (Ostatní ustanovení)',
        'Dopravní značky',
        'Řešení dopravních situací',
        'Zásady bezpečné jízdy [A]',
        'Zásady bezpečné jízdy [B]',
        'Zásady bezpečné jízdy [C,D]',
        'Související předpisy',
        'Podmínky provozu vozidel',
        'Zdravotnická příprava'
    ]
    context = {}
    for topic in TOPICS:
        positive = Otazka.objects.filter(orig_topic=topic).filter(skore__gt=0).count()
        negative = Otazka.objects.filter(orig_topic=topic).filter(skore__lt=0).count()
        neutral = Otazka.objects.filter(orig_topic=topic).filter(skore=0).count()
        context[topic] = [positive, neutral, negative]

    print(context)
    print(LABELS)

    return render(request, 'stat.html', {"data":context, "labels":LABELS})

    