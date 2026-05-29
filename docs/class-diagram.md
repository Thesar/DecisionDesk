# DecisionDesk - Class Diagram

## Decision

- id: int
- name: string
- type: string
- value: double
- risk: double

+ GetId()
+ GetName()
+ GetTypeName()
+ GetValue()
+ GetRisk()

---

## DecisionService

- repo: IRepository<Decision>

+ ListAll(typeFilter)
+ Add(name, type, value, risk, message)
+ GetById(id)
+ Update(id, name, value, message)
+ Delete(id, message)

---

## IRepository<T>

+ GetAll(): List<T>
+ GetById(id: int): T
+ Add(entity: T)
+ Update(entity)
+ Delete(id)
+ Save(list)

---

## FileRepository

- filePath: string

+ GetAll()
+ GetById(id)
+ Add(entity)
+ Update(entity)
+ Delete(id)
+ Save(list)

---

## ConsoleUI

- service: DecisionService

+ ShowMenu()
+ ListDecisions()
+ AddDecision()
+ FindDecisionById()
+ UpdateDecision()
+ DeleteDecision()
+ FilterByType()

---

## Web UI

- wwwroot/index.html
- wwwroot/styles.css
- wwwroot/app.js

+ List decisions
+ Filter and search decisions
+ Add decision
+ Edit decision
+ Delete decision
+ Update dashboard metrics

---

## C# API Endpoints

+ GET /api/decisions
+ GET /api/decisions/{id}
+ POST /api/decisions
+ PUT /api/decisions/{id}
+ DELETE /api/decisions/{id}

---

## DemoReadinessCheck

+ Run()

---

## SimulationService

+ CalculatePriceImpact(percent: double): double

---

## Relationships

- Program -> starts the web app by default
- Program -> can start ConsoleUI with `--console`
- Web UI -> uses C# API endpoints
- C# API endpoints -> use DecisionService
- ConsoleUI -> uses DecisionService as backup
- DecisionService -> uses IRepository<Decision>
- FileRepository -> implements IRepository<Decision>
- FileRepository -> reads and writes Data/data.csv
- DemoReadinessCheck -> verifies the demo flow with temporary CSV data
