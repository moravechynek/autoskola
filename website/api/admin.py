from django.contrib import admin
from .models import Otazka, Odpoved, Topic

admin.site.register(Otazka)
admin.site.register(Odpoved)
admin.site.register(Topic)