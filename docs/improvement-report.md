# Improvement Report — Thesar Habibaj

## Cilat 3 përmirësime i realizova

1. Përmirësova strukturën e kodit duke kaluar dependency injection në Program.cs.
2. Përmirësova reliability përmes validimit të inputit dhe trajtimit të gabimeve.
3. Përmirësova qartësinë e sistemit me mesazhe më të mira dhe flow më të kuptueshëm.

---

## Përmirësimi 1 — Strukturë më e pastër

- Çka ishte problem më parë:
  ConsoleUI krijonte vetë FileRepository dhe DecisionService, gjë që e lidhte shumë UI me shtresat tjera.

- Çfarë ndryshova:
  Tani Program.cs krijon repository, service dhe UI. ConsoleUI merr vetëm DecisionService si parametër.

- Pse versioni i ri është më i mirë:
  Arkitektura është më e pastër, ndjek më mirë ndarjen e përgjegjësive dhe është më e lehtë për zgjerim.

---

## Përmirësimi 2 — Validim dhe error handling më i mirë

- Çka ishte problem më parë:
  Inputet jo numerike mund të shkaktonin crash. Po ashtu, kërkimi me ID jo ekzistuese nuk jepte trajtim mjaftueshëm të sigurt.

- Çfarë ndryshova:
  Shtova metoda të sigurta për leximin e numrave me `TryParse`, validim për emra bosh dhe mesazhe të qarta kur itemi nuk gjendet.

- Pse versioni i ri është më i mirë:
  Programi është më stabil, nuk crashon lehtë dhe komunikon më mirë me përdoruesin.

---

## Përmirësimi 3 — Trajtim më i mirë i file-it dhe shpjegueshmëri

- Çka ishte problem më parë:
  Nëse file mungonte, programi mund të dështonte. Gjithashtu, output-i nuk ishte shumë i qartë.

- Çfarë ndryshova:
  Shtova kontroll për file mungues, krijim automatik të file-it me të dhëna fillestare, dhe përmirësova output-in përmes `ToString()` dhe mesazheve më të qarta.

- Pse versioni i ri është më i mirë:
  Aplikacioni është më i besueshëm, më i lexueshëm dhe më i lehtë për t’u përdorur.

---

## Çka mbetet ende e dobët në projekt

- Nuk ka ende unit tests.
- UI mbetet bazik sepse është console application.
- Ruajtja në CSV është e thjeshtë dhe nuk është zgjidhje ideale për projekte më të mëdha.
- Ka ende hapësirë për përmirësim në dokumentim dhe setup instructions.