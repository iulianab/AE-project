# Magazin online de jucarii
# Teste de performanta

 S-au efectuat teste de performanta pe componenta lista de produse.

1. Test api /products

![alt_text](https://github.com/iulianab/AE-project/blob/main/Screenshot%202021-01-03%20at%2018.21.37.png)

![alt_text](https://github.com/iulianab/AE-project/blob/main/Screenshot%202021-01-03%20at%2018.28.38.png)

Testul a rulat cu succes, dar s-au observat mici variatii pentru timpul de raspuns si rata de request-uri. 

In medie se pot servii 26 de request-uri fata de 30 cate au fost stabilite initial.

Timpul mediu de raspuns analizat pentru 95% dintre request-uri este de 377 ms.

Timpul minim inregistrat este de 102 ms, iar cel maxim atinge 563 ms.




2. Test pagina produse

![alt_text](https://github.com/iulianab/AE-project/blob/main/Screenshot%202021-01-03%20at%2018.30.05.png)

![alt_text](https://github.com/iulianab/AE-project/blob/main/Screenshot%202021-01-03%20at%2018.31.11.png)

Testul a rulat cu succes, dar s-au observat destul de multe variatii pentru timpul de raspuns si rata de request-uri. 

Cele mai costisitoare request-uri au fost /favicon.ico care a consumat aproximativ 4045 ms si /static/js/bundle.js cu un timp de 1519 ms.


Imbunatatiri:

- Utilizare caching, acolo unde este posibil, pentru a evita apeluri multiple catre baza de date;
- Paralelizare instanta => mai multe thread-uri pot duce la cresterea performantei.

