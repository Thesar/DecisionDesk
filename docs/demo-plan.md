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

**Add Decision → Validate → Save → List → Update/Delete**

Pse e zgjodha këtë:
Sepse ky flow demonstron të gjithë sistemin:

* input nga useri
* validim
* ruajtje në CSV
* leximi dhe shfaqja e të dhënave
* modifikimi i tyre

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

* UI është ende bazik (console application)
* Nuk ka unit tests të plota
* Ruajtja në CSV nuk është ideale për projekte më të mëdha

---

## 7. Struktura e prezantimit (5–7 min)

**Hyrja (1 min)**

* Çka është DecisionDesk
* Çfarë problemi zgjidh

**Demo live (2–3 min)**

* Shtoj një vendim
* E listoj
* E përditësoj ose e fshij

**Shpjegimi teknik (1–2 min)**

* Arkitektura: UI → Service → Repository
* Ruajtja në CSV

**Problemi + zgjidhja (1 min)**

* Input validation dhe error handling

**Mbyllja (30 sek)**

* Çfarë mund të përmirësohet në të ardhmen

---

## Plan B

Në rast se diçka nuk funksionon live:

* Do të përdor screenshot të output-it
* Do të shpjegoj flow-in në mënyrë teorike
* Repo në GitHub do të jetë i hapur si referencë