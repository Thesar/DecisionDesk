# Demo Plan — Thesar Habibaj

## 1. Titulli i projektit

DecisionDesk — Business Decision Simulation Platform

---

## 2. Problemi që zgjidh

DecisionDesk zgjidh problemin e menaxhimit të vendimeve të biznesit në mënyrë të strukturuar.
Shumë vendime ruhen në mënyrë të paorganizuar (në mendje, Excel ose dokumente), gjë që e bën të vështirë analizimin dhe ndjekjen e tyre.

Ky sistem lejon përdoruesin të ruajë, analizojë dhe menaxhojë vendimet në një vend të vetëm.

---

## 3. Përdoruesit kryesorë

* Business Owner
* Persona që marrin vendime biznesi dhe duan t’i organizojnë ato

---

## 4. Flow-i që do ta demonstroj

Flow-i kryesor që do të tregoj është:

**Register/Login → Dashboard → Add Decision → Validate → Save → List/Search → Update/Delete → Export**

Pse e zgjodha këtë:
Sepse ky flow demonstron të gjithë sistemin:

* input nga useri
* validim
* ruajtje në CSV
* leximi dhe shfaqja e të dhënave
* modifikimi i tyre
* plan B me export/README/demo-check

Ky është flow-i më i plotë dhe më i rëndësishëm i aplikacionit.

---

## 5. Një problem real që e kam zgjidhur

Problemi:
Programi crashonte kur përdoruesi shkruante input jo valid (p.sh. tekst në vend të numrit).

Ku ishte problemi:
Në UI gjatë parsimit të inputit (`double.Parse` dhe `int.Parse`).

Si e zgjidha:

* Përdora `TryParse` për input numerik
* Shtova validim për input
* Shtova mesazhe të qarta për përdoruesin

Rezultati:
Programi nuk crashon më dhe është më i qëndrueshëm.

---

## 6. Çka mbetet ende e dobët

* Login/Register është i mjaftueshëm për demo, por nuk është autentikim production me databazë dhe password hashing
* Nuk ka unit tests të plota
* Ruajtja në CSV nuk është ideale për projekte më të mëdha

---

## 7. Struktura e prezantimit (5–7 min)

**Hyrja (1 min)**

* Çka është DecisionDesk
* Çfarë problemi zgjidh

**Demo live (2–3 min)**

* Hap website-in
* Bëj login me demo account ose krijo account të ri
* Shtoj një vendim
* E filtroj ose kërkoj
* E përditësoj ose e fshij
* Tregoj Export/Help si plan B

**Shpjegimi teknik (1–2 min)**

* Arkitektura: HTML/CSS/JS UI → C# API → Service → Repository
* Ruajtja në CSV

**Problemi + zgjidhja (1 min)**

* Input validation dhe error handling

**Mbyllja (30 sek)**

* Çfarë mund të përmirësohet në të ardhmen

---

## Plan B

Në rast se diçka nuk funksionon live:

* Do të përdor `docs/demo-output.txt` si output të gatshëm të flow-it kryesor
* Do të hap README për të treguar komandat dhe flow-in e demos
* Në Vercel, website-i punon si static UI me të dhëna demo në browser
* Do të përdor `dotnet run -- --demo-check` për të verifikuar shpejt që logjika CRUD funksionon
* Do të shpjegoj flow-in përmes `docs/class-diagram.md` dhe arkitekturës UI -> Service -> Repository -> CSV
* Repo në GitHub do të jetë i hapur si referencë

## Checklist para prezantimit

* `git status` nuk duhet të ketë ndryshime të papërfunduara
* `dotnet build` duhet të përfundojë pa error
* `dotnet run -- --demo-check` duhet të shfaqë vetëm rezultate `PASS`
* `dotnet run` duhet të hapë website-in
* Duhet të dihet rendi i saktë i demos: Add -> List/Search -> Update -> Delete
