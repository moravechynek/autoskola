# Generated by Django 4.1.5 on 2023-02-07 12:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_topic_alter_otazka_odpoved_a_alter_otazka_otazka'),
    ]

    operations = [
        migrations.AddField(
            model_name='otazka',
            name='topic',
            field=models.ManyToManyField(to='api.topic'),
        ),
    ]