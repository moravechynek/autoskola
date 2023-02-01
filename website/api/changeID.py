import sqlite3

con = sqlite3.connect('../db.sqlite3')
cur = con.cursor()

cur.execute("""
UPDATE api_otazka
              SET id = 958
              WHERE id = 959
""")

con.commit()

con.close()