from rest_framework import serializers
from .models import Otazka, Odpoved

class OtazkaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Otazka
        fields = ('id','otazka','file','odpoved_a','odpoved_b','odpoved_c','spravna_odpoved','orig_topic','skore')
    
class OdpovedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Odpoved
        fields = ('FK_otazka','odpoved','timestamp')

class OtazkaSkoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Otazka
        fields = ('orig_topic', 'skore')