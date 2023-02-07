## Spuštění backedu

    cd website
    py manage.py runserver

## Spuštění frontendu

    cd website/frontend
    npm run dev

## Údaje superuživatele

>name: admin
>
>password: admin

# Todo

- [ ] Formulář testu
    - [x] API
    - [ ] HTML formulář
    - [ ] React Hook
- [ ] Vypsat sekce u testu a jejich bodování
- [ ] Odpočet půl hodiny u testu
- [ ] Styl výpisu posledních odpovědí
- [ ] Doplnit data
    - 134 jine odpovedi (nevadi)
    - temata: pojmy(0/119), jizda(0/160), A(0/0), B(0/0), CD(0/0)
    - dodelat test, jestli konci otazka ? nebo :
    - od otazky 960 (vcetne), ma kazda id + 1 kvuli vymazani jedne zastarale
    - Vsechny otazky - 996
    - Temata - 119,160,116,204,98,79,78,105,25,39,35 = 1058
    - 996 - (116 + 204 + 98 + 25 + 39 + 35) = 517
- [ ] Pravděpodobnost úspěšnosti testu
    - prehozeny pocet u zdravi a predpisu
    - [x] (0, 0, 0, 0, 0, 0, 0) 1
    - [x] (0, 0, 0, 0, 0, 0, 1) 4
    - [x] (0, 0, 0, 0, 0, 0, 2)
    - [x] (0, 0, 0, 0, 0, 0, 3) 1
    - [x] (0, 0, 0, 0, 0, 0, 4) 4
    - [x] (0, 0, 0, 0, 0, 0, 6)
    - [x] (0, 0, 0, 0, 0, 1, 1)
    - [ ] (0, 0, 0, 0, 0, 1, 2)
    - [x] (0, 0, 0, 0, 0, 1, 3) 2
    - [ ] (0, 0, 0, 0, 0, 1, 4)
    - [ ] (0, 0, 0, 0, 0, 1, 6)
    - [ ] (0, 0, 0, 0, 0, 2, 2)
    - [x] (0, 0, 0, 0, 0, 2, 3) 3
    - [ ] (0, 0, 0, 0, 0, 2, 4)
    - [ ] (0, 0, 0, 0, 0, 3, 4) 4
    - [x] (0, 0, 0, 0, 1, 1, 1)
    - [ ] (0, 0, 0, 0, 1, 1, 2)
    - [x] (0, 0, 0, 0, 1, 1, 3) 1
    - [ ] (0, 0, 0, 0, 1, 1, 4)
    - [ ] (0, 0, 0, 0, 1, 2, 2)
    - [ ] (0, 0, 0, 0, 1, 2, 3)
    - [ ] (0, 0, 0, 0, 1, 2, 4)
    - [x] (0, 0, 0, 0, 2, 2, 2)
    - [ ] (0, 0, 0, 0, 2, 2, 3) 
    - [x] (0, 0, 0, 1, 1, 1, 2) 3
    - [ ] (0, 0, 0, 1, 1, 1, 4) 4
    - [ ] (0, 0, 0, 1, 1, 2, 2)
    - [ ] (0, 0, 0, 1, 1, 2, 3) 3
    - [ ] (0, 0, 0, 1, 2, 2, 2)
    - [ ] (0, 0, 1, 1, 1, 2, 2) 3

# Pravděpodobnost zvládnutí testu

Pravděpodobnost jevu A: "Maximální ztráta sedmi bodů v testu" je součtem pravděpodobností ztráty sedmi, šesti, pěti, čtyř, tří, dvou, jednoho a žádného bodu.

$$ P_A = P_0 + P_1 + P_2 + P_3 + P_4 + P_5 + P_6 + P_7 $$
$$ P_A = \sum_{i=7}^7 P_i $$
