from django.shortcuts import render
from django.http import HttpResponse
from .models import Otazka, Odpoved
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import OtazkaSerializer, OdpovedSerializer, OtazkaSkoreSerializer
from rest_framework.decorators import api_view
from django.db.models import Q
from numpy import random


class TestView(generics.ListAPIView):
    pojmy = list(random.choice(list(Otazka.objects.filter(orig_topic='Pojmy')),size=10,replace=False))
    bezpecnost = list(random.choice(list(Otazka.objects.filter(orig_topic='BezpecnostB')),size=4,replace=False))
    znacky = list(Otazka.objects.filter(orig_topic='Znacky')[0:3])
    situace = list(Otazka.objects.filter(orig_topic='Situace')[0:3])
    predpisy_o_provozu_vozidel = list(Otazka.objects.filter(orig_topic='Predpisy')[0:2])
    predpisy_provozu_na_komunikacich = list(Otazka.objects.filter(orig_topic='Provoz')[0:2])
    zdravi = list(Otazka.objects.filter(orig_topic='Zdravi')[0:1])

    queryset = pojmy + bezpecnost + znacky + situace + predpisy_o_provozu_vozidel + predpisy_provozu_na_komunikacich + zdravi
    
    serializer_class = OtazkaSerializer

class TreninkView(generics.ListAPIView):
    queryset = Otazka.objects.all().order_by('skore')[0:1]
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
    otazky = Otazka.objects.filter(orig_topic='Pojmy')
    #filter(orig_topic='Jizda')
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

from math import factorial
def binom(n,k):
    return factorial(n)/(factorial(k)*factorial(n-k))

def sjednoceniPravdepodobnosti(P1,P2,P3,P4,P5,P6,P7):
    return P1 * P2 * P3 * P4 * P5 * P6 * P7

def pravdepodobnost(pravdive, vsechny, pocet):
    if pravdive < pocet: return 0
    return binom(pravdive,pocet) / binom(vsechny,pocet)

from itertools import combinations_with_replacement
"""for i in range(0,8):
    comb = combinations_with_replacement([1, 2, 4],i)
    for i in list(comb):
        if sum(i) <= 7:
            print(i)"""
"""
(1, 2, 4)
(1, 1, 1, 4)
(1, 2, 2, 2)
(1, 1, 1, 2, 2)
(1, 1, 1, 1, 1, 2)
(1, 1, 1, 1, 1, 1, 1)
"""

def p50(x1,x2,x3,x4,x5,x6,x7):
    P1 = pravdepodobnost(x1,119,10)
    P2 = pravdepodobnost(x2,78,4)
    P3 = pravdepodobnost(x3,204,3)
    P4 = pravdepodobnost(x4,98,3)
    P5 = pravdepodobnost(x5,25,2)
    P6 = pravdepodobnost(x6,39,2)
    P7 = pravdepodobnost(x7,35,1)#ok
    return sjednoceniPravdepodobnosti(P1,P2,P3,P4,P5,P6,P7)

def p49(x1,x2,x3,x4,x5,x6,x7):
    P1 = pravdepodobnost(x1,119,10)
    P2 = pravdepodobnost(x2,78,4)
    P3 = pravdepodobnost(x3,204,3)
    P4 = pravdepodobnost(x4,98,3)
    P5 = pravdepodobnost(x5,25,2)
    P6 = pravdepodobnost(x6,39,1)
    P7 = pravdepodobnost(x7,35,1)
    return sjednoceniPravdepodobnosti(P1,P2,P3,P4,P5,P6,P7)

#print(p50(119,78,204,98,25,38,35))
#print(p49(119,78,204,98,25,38,35))