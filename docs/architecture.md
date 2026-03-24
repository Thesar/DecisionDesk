# 🏗 DecisionDesk Architecture

## Layers

### Models
Përmbajnë strukturat e të dhënave (Decision).

### Services
Përmbajnë logjikën e biznesit dhe simulimet.

### Data
Menaxhojnë ruajtjen dhe leximin e të dhënave (Repository Pattern).

### UI
Ndërfaqja e përdoruesit (Console UI).

---

## Pse kjo arkitekturë?

- Ndarje e përgjegjësive
- Lehtësi për mirëmbajtje
- Kod më i organizuar
- Zgjerim i lehtë në të ardhmen

---

## Repository Pattern

Përdoret për të ndarë logjikën e aksesit në të dhëna nga logjika e biznesit.

---

## SOLID Principle

### Single Responsibility Principle (SRP)

Çdo klasë ka një rol të vetëm:
- Decision → data
- SimulationService → logjikë
- FileRepository → ruajtje
- ConsoleUI → ndërfaqe

Kjo e bën sistemin më të pastër dhe të lehtë për mirëmbajtje.
