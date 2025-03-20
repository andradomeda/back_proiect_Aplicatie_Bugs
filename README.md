Bug Tracking System - Backend

Descriere:
Aplicație web ce implementeaza un sistem de gestionare a bugurilor, destinat echipelor de dezvoltare software. Scopul său principal este de a facilita comunicarea dintre membrii echipei


Tehnologii Utilizate:

Express.js - Framework pentru crearea de API-uri RESTful.
MariaDB - Baza de date relațională folosită pentru stocarea datelor.
Postman - Folosit pentru testarea rutelelor API.
Node.js - Platforma pe care rulează aplicația.


Funcționalități principale:

Gestionarea proiectelor: Un membru de proiect (MP) poate înregistra un proiect software pentru a fi monitorizat.Se poate specifica repository-ul proiectului și echipa de dezvoltare. MP poate vizualiza toate bugurile asociate proiectelor din care face parte si isi poate asigna rezolvarea unui singur bug la un moment dat.

Înregistrarea bugurilor: Un utilizator care nu este membru într-un proiect poate solicita să fie tester (TST). Un TST poate adăuga buguri înregistrând oferind informatii legate de severitatea bugului, link catre un repo al bug ului si o descriere.

Gestionarea bugurilor: După rezolvarea unui bug, MP poate adăuga un status al rezolvării și un link către commit-ul aferent. MP poate actualiza starea unui bug.

Structura Proiectului
1. DataAccess
În această secțiune sunt definite funcțiile care interacționează cu baza de date pentru fiecare entitate din proiect. Aceste funcții permit crearea, citirea, actualizarea și ștergerea (CRUD) entităților.

2. Entities
Definite entitățile utilizate de aplicație: utilizatorii, proiectele, bug-urile și echipele.

3. Routes
Rutele API sunt definite în acest folder, fiecare rută gestionând operații CRUD pentru entitățile respective. Rutele sunt testate cu Postman pentru a asigura corectitudinea și funcționalitatea completă.
