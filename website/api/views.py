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
    pojmy = list(random.choice(list(Otazka.objects.filter(topic__id=1)),size=10,replace=False))
    bezpecnost = list(random.choice(list(Otazka.objects.filter(topic__id=7)),size=4,replace=False))
    znacky = list(Otazka.objects.filter(topic__id=4)[0:3])
    situace = list(Otazka.objects.filter(topic__id=5)[0:3])
    predpisy_o_provozu_vozidel = list(Otazka.objects.filter(topic__id=9)[0:2])
    predpisy_provozu_na_komunikacich = list(Otazka.objects.filter(topic__id=10)[0:2])
    zdravi = list(Otazka.objects.filter(topic__id=11)[0:1])

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
    otazky = []
    A = Otazka.objects.filter(topic__id=7)
    otazky += A
    # A-24,B-4,C-31
    # AB-1,AC-0,BC-19
    # ABC-54
    # 59 + 20 + 54 = 133
    #Otazka.objects.filter(Q(topic__id=6) & ~Q(topic__id=7) & ~Q(topic__id=8))
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
        'Z??kon ??. 361/2000Sb. (Pojmy, povinnosti)',
        'Z??kon ??. 361/2000Sb. (J??zda vozidly)',
        'Z??kon ??. 361/2000Sb. (Ostatn?? ustanoven??)',
        'Dopravn?? zna??ky',
        '??e??en?? dopravn??ch situac??',
        'Z??sady bezpe??n?? j??zdy [A]',
        'Z??sady bezpe??n?? j??zdy [B]',
        'Z??sady bezpe??n?? j??zdy [C,D]',
        'Souvisej??c?? p??edpisy',
        'Podm??nky provozu vozidel',
        'Zdravotnick?? p????prava'
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