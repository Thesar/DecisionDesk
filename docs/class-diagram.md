# 📊 DecisionDesk - Class Diagram

## Decision
- id: int
- type: string
- value: double

+ GetId()
+ GetDecisionType()
+ GetValue()

---

## SimulationService
+ CalculatePriceImpact(percent: double): double

---

## IRepository<T>
+ GetAll(): List<T>
+ GetById(id: int): T
+ Add(entity: T)
+ Save()

---

## FileRepository
- data: List<Decision>
- filePath: string

+ GetAll()
+ GetById(id)
+ Add(entity)
+ Save()

---

## ConsoleUI
+ ShowMenu()

---

## Relationships
- ConsoleUI → uses SimulationService
- SimulationService → uses Decision
- FileRepository → implements IRepository
