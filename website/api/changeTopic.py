import sqlite3

con = sqlite3.connect('../db.sqlite3')
cur = con.cursor()


cur.execute("UPDATE api_otazka SET topic = 1 WHERE orig_topic LIKE Pojmy;")

con.commit()

con.close()