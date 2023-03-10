# Generated by Django 4.1.5 on 2023-01-24 09:55

import api.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Otazka',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('otazka', models.TextField(max_length=150)),
                ('file', models.FileField(blank=True, upload_to=api.models.get_image_otazky)),
                ('odpoved_a', models.TextField(max_length=300)),
                ('a_id', models.IntegerField(default=0)),
                ('odpoved_b', models.TextField(max_length=300)),
                ('b_id', models.IntegerField(default=0)),
                ('odpoved_c', models.TextField(max_length=300)),
                ('c_id', models.IntegerField(default=0)),
                ('spravna_odpoved', models.CharField(max_length=1)),
                ('orig_topic', models.CharField(choices=[('Pojmy', 'Zákon č. 361/2000Sb. (Pojmy, povinnosti)'), ('Jizda', 'Zákon č. 361/2000Sb. (Jízda vozidly)'), ('Ostatni', 'Zákon č. 361/2000Sb. (Ostatní ustanovení)'), ('Znacky', 'Dopravní značky'), ('Situace', 'Řešení dopravních situací'), ('BezpecnostA', 'Zásady bezpečné jízdy [A]'), ('BezpecnostB', 'Zásady bezpečné jízdy [B]'), ('BezpecnostCD', 'Zásady bezpečné jízdy [C,D]'), ('Predpisy', 'Související předpisy'), ('Provoz', 'Podmínky provozu vozidel'), ('Zdravi', 'Zdravotnická příprava'), ('Default', 'default')], default='default', max_length=12)),
            ],
            options={
                'verbose_name': 'Otázka',
                'verbose_name_plural': 'Otázky',
            },
        ),
        migrations.CreateModel(
            name='Odpoved',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('odpoved', models.TextField(max_length=5)),
                ('timestamp', models.DateField(auto_now_add=True)),
                ('FK_otazka', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.otazka')),
            ],
            options={
                'verbose_name': 'Odpověď',
                'verbose_name_plural': 'Odpovědi',
            },
        ),
    ]
