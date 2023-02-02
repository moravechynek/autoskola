import sqlite3

con = sqlite3.connect('../db.sqlite3')
cur = con.cursor()

for i in range(0, 1000):
    for row in cur.execute("""
    SELECT id,orig_topic FROM api_otazka
    WHERE orig_topic LIKE '%\n';
    """):
        print(row)
        string = row[1].replace('\n','')
        cur.execute("UPDATE api_otazka SET orig_topic = ? WHERE id = ?;", (string, row[0]))

con.commit()

con.close()