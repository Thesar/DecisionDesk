# Project Audit — Thesar Habibaj

## 1. Përshkrimi i shkurtër i projektit

DecisionDesk është një aplikacion console për menaxhimin e vendimeve të biznesit. Sistemi u lejon përdoruesve të ruajnë, shikojnë, përditësojnë dhe fshijnë vendime duke përdorur operacione CRUD.

Përdoruesi kryesor i sistemit është Business Owner, i cili përdor aplikacionin për të organizuar dhe analizuar vendime të ndryshme biznesi.

Funksionaliteti kryesor i projektit është:
- listimi i vendimeve
- shtimi i vendimeve të reja
- kërkimi sipas ID
- përditësimi i vendimeve
- fshirja e vendimeve
- filtrimi sipas tipit

Të dhënat ruhen në një file CSV dhe sistemi është i ndarë në shtresa: UI, Service dhe Repository.

---

## 2. Çka funksionon mirë?

- Arkitektura me shtresa është e qartë dhe ndan përgjegjësitë në mënyrë të mirë.
- Operacionet CRUD funksionojnë nga UI deri te file CSV.
- Repository Pattern është implementuar dhe përdoret nga Service.
- Programi kompajlohet dhe ekzekutohet me sukses.
- Të dhënat lexohen dhe ruhen në mënyrë të vazhdueshme në file.

---

## 3. Dobësitë e projektit

- Në versionin e mëparshëm, UI krijonte vetë repository-n dhe kjo e dobësonte ndarjen e përgjegjësive.
- Inputet jo numerike mund të shkaktonin crash gjatë parsimit.
- Nëse file mungonte, programi mund të dështonte.
- Nëse përdoruesi kërkonte një ID që nuk ekzistonte, trajtimi nuk ishte mjaftueshëm i qartë.
- Dokumentimi nuk e shpjegonte mjaftueshëm flow-in e sistemit.
- Nuk ka ende unit tests.
- UI është ende bazik dhe i kufizuar në console.

---

## 4. 3 përmirësime që do t’i implementoj

### Përmirësimi 1 — Ndarje më e mirë e strukturës
- Problemi: ConsoleUI krijonte vetë FileRepository dhe DecisionService.
- Zgjidhja: Krijimi i varësive u zhvendos në Program.cs dhe UI tani merr service si parametër.
- Pse ka rëndësi: Kjo e bën arkitekturën më të pastër dhe më të lehtë për mirëmbajtje.

### Përmirësimi 2 — Validim dhe error handling më i mirë
- Problemi: Input i gabuar ose ID jo ekzistuese mund të shkaktonin probleme.
- Zgjidhja: U shtuan metoda të sigurta për lexim të numrave, validim i inputit dhe mesazhe të qarta për userin.
- Pse ka rëndësi: Programi bëhet më i qëndrueshëm dhe nuk crashon lehtë.

### Përmirësimi 3 — Trajtim më i mirë i file-it dhe shpjegueshmëri më e qartë
- Problemi: File mungues ose rreshta të dëmtuar mund të krijonin probleme.
- Zgjidhja: U shtua kontroll për ekzistencën e file-it, krijim automatik i tij dhe trajtim më i kujdesshëm gjatë leximit.
- Pse ka rëndësi: Aplikacioni bëhet më i besueshëm dhe më i kuptueshëm për përdoruesin.

---

## 5. Një pjesë që ende nuk e kuptoj plotësisht

Një pjesë që ende nuk e kuptoj plotësisht është testimi automatik me unit tests dhe si të ndaj në mënyrë edhe më të mirë përgjegjësitë kur projekti rritet. E kuptoj bazën e arkitekturës me shtresa, por dua të kuptoj më thellë si të testoj service dhe repository në mënyrë profesionale.