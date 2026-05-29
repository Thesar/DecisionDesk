# Implementation

## Features

- List Decisions
- Add Decision
- Find by ID
- Update Decision
- Delete Decision
- Filter by Type
- Web dashboard with HTML, CSS and JavaScript
- C# API endpoints for CRUD operations
- Demo readiness check

## Flow

HTML/CSS/JavaScript UI -> C# API -> Service -> Repository -> CSV

## Validation

- Numeric input is read with `TryParse`.
- Empty names and types are rejected.
- Negative risk values are rejected.
- Values must be greater than 0.
- Commas in name/type are rejected to keep CSV data valid.

## Test

All CRUD operations can be checked through the website.

The console UI is still available as a backup with:

```bash
dotnet run -- --console
```

The automated demo check can be run with:

```bash
dotnet run -- --demo-check
```
