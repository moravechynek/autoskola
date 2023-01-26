import os
from django.db import models

def get_image_otazky(instance, filename):
    return os.path.join('otazky', filename)

class Otazka(models.Model):
    otazka = models.TextField(max_length=250)
    file = models.FileField(upload_to=get_image_otazky,
        blank=True)
    odpoved_a = models.TextField(max_length=300)
    odpoved_b = models.TextField(max_length=300)
    odpoved_c = models.TextField(max_length=300, null=True, blank=True)
    spravna_odpoved = models.CharField(max_length=1)
    TOPICS = [
        ('Pojmy', 'Zákon č. 361/2000Sb. (Pojmy, povinnosti)'),
        ('Jizda', 'Zákon č. 361/2000Sb. (Jízda vozidly)'),
        ('Ostatni', 'Zákon č. 361/2000Sb. (Ostatní ustanovení)'),
        ('Znacky', 'Dopravní značky'),
        ('Situace', 'Řešení dopravních situací'),
        ('BezpecnostA', 'Zásady bezpečné jízdy [A]'),
        ('BezpecnostB', 'Zásady bezpečné jízdy [B]'),
        ('BezpecnostCD', 'Zásady bezpečné jízdy [C,D]'),
        ('Predpisy', 'Související předpisy'),
        ('Provoz', 'Podmínky provozu vozidel'),
        ('Zdravi', 'Zdravotnická příprava'),
        ('Default','default')
    ]
    orig_topic = models.CharField(
        max_length=12,
        choices=TOPICS,
        default='default'
    )

    def __str__ (self):
        return (str(self.id) + ") " + self.otazka)

    class Meta:
        verbose_name = 'Otázka'
        verbose_name_plural = 'Otázky'

class Odpoved(models.Model):
    FK_otazka = models.ForeignKey(
        'Otazka',
        on_delete=models.CASCADE,
        default= 1,
    )
    odpoved = models.TextField(max_length=5)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.FK_otazka).split(')')[0] + ') ' + self.odpoved + ' ' + str(self.timestamp)

    class Meta:
        verbose_name = 'Odpověď'
        verbose_name_plural = 'Odpovědi'