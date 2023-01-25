from django.contrib import admin
from .models import Otazka
from .models import Odpoved

admin.site.register(Otazka)
admin.site.register(Odpoved)