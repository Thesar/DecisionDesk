# DecisionDesk Architecture

## Layers

### Web UI

Përmban faqen vizuale të projektit:

- `wwwroot/index.html`
- `wwwroot/styles.css`
- `wwwroot/app.js`

Kjo pjesë shfaq dashboard-in, tabelën e vendimeve, filtrimin, kërkimin dhe formën për shtim/përditësim.

### C# API

`Program.cs` hap aplikacionin web dhe ofron endpoints:

- `GET /api/decisions`
- `GET /api/decisions/{id}`
- `POST /api/decisions`
- `PUT /api/decisions/{id}`
- `DELETE /api/decisions/{id}`

### Models

Përmbajnë strukturat e të dhënave, si `Decision`.

### Services

Përmbajnë logjikën kryesore të biznesit:

- validim i inputit
- shtim i vendimeve
- përditësim
- fshirje
- filtrim

### Data

Menaxhon ruajtjen dhe leximin e të dhënave përmes `FileRepository` dhe `Data/data.csv`.

### Console UI

`ConsoleUI` mbetet si backup dhe mund të hapet me:

```bash
dotnet run -- --console
```

## Flow

HTML/CSS/JavaScript UI -> C# API -> DecisionService -> FileRepository -> CSV

## Pse kjo arkitekturë?

- Ndarje e qartë e përgjegjësive
- Website për demo vizuale
- C# API për lidhjen mes UI dhe logjikës
- Repository Pattern për ruajtjen e të dhënave
- Console UI si plan B

## Repository Pattern

Repository Pattern përdoret për të ndarë logjikën e aksesit në të dhëna nga logjika e biznesit. `DecisionService` nuk e di si ruhen të dhënat; ai përdor vetëm `IRepository<Decision>`.

## Single Responsibility Principle

- `Decision` -> përfaqëson të dhënat
- `DecisionService` -> menaxhon logjikën dhe validimin
- `FileRepository` -> lexon dhe ruan CSV
- `wwwroot` -> shfaq ndërfaqen web
- `ConsoleUI` -> shërben si backup console
- `DemoReadinessCheck` -> verifikon flow-in kryesor për demo
