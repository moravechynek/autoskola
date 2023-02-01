from django.test import TestCase
import sqlite3

con = sqlite3.connect('../db.sqlite3')
cur = con.cursor()

print('NESMYSLNE ODPOVEDI')
for row in cur.execute("""
SELECT id,spravna_odpoved FROM api_otazka
WHERE spravna_odpoved NOT IN ('a', 'b', 'c');
"""):
    print(row)

print('NESMYSLNE TEMATA')
for row in cur.execute("""
SELECT id,orig_topic FROM api_otazka
WHERE orig_topic NOT IN ('Pojmy','Jizda','Ostatni','Znacky',
'Situace','BezpecnostA','BezpecnostB','BezpecnostCD',
'Predpisy','Provoz','Zdravi');
"""):
    print(row)

con.close()