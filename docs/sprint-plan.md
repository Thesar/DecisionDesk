# Sprint Plan - Demo Preparation

Data: 29 May 2026

## Gjendja aktuale

Funksionon:

- Listimi i vendimeve
- Shtimi i vendimeve
- Kërkimi sipas ID
- Përditësimi i vendimeve
- Fshirja e vendimeve
- Filtrimi sipas tipit
- Ruajtja dhe leximi nga CSV
- Validimi i inputit numerik
- Trajtimi i ID që nuk ekziston
- Demo readiness check me `dotnet run -- --demo-check`

Programi kompajlohet dhe ekzekutohet: Po.

## Flow-i kryesor për demo

Add Decision -> Validate -> Save -> List -> Update/Delete

Ky flow është zgjedhur sepse demonstron të gjithë zinxhirin teknik:

- UI merr input nga përdoruesi
- Service bën validimin dhe logjikën
- Repository ruan të dhënat
- CSV mban historikun e vendimeve

## Rreziqet para demos

- Nëse ambienti nuk ka .NET SDK 9.0 ose më të ri, projekti nuk hapet.
- Nëse `Data/data.csv` ndryshohet gabimisht, të dhënat live mund të duken ndryshe.
- Console UI është bazik, prandaj prezantimi duhet të fokusohet në flow dhe arkitekturë.

## Plan B

- Përdor `docs/demo-output.txt` si output backup.
- Përdor `dotnet run -- --demo-check` për të provuar logjikën pa prekur të dhënat kryesore.
- Përdor README dhe `docs/class-diagram.md` për të shpjeguar sistemin nëse demo live dështon.

## Checklist

- `dotnet build`
- `dotnet run -- --demo-check`
- `dotnet run`
- Add -> List -> Update -> Delete -> Exit
