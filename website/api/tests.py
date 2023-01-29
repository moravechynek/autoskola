from django.test import TestCase
import sqlite3

con = sqlite3.connect('../db.sqlite3')
cur = con.cursor()

for row in cur.execute("""
SELECT id,spravna_odpoved FROM api_otazka
WHERE spravna_odpoved NOT IN ('a', 'b', 'c');
"""):
    print(row)

con.close()