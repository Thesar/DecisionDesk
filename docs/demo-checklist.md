# Demo Checklist

## Para prezantimit

- Repo në GitHub është i përditësuar.
- README shpjegon problemin, flow-in dhe komandat kryesore.
- `docs/demo-plan.md` është i plotësuar.
- `docs/demo-output.txt` ekziston si backup.
- Projekti kompajlohet me `dotnet build`.
- Demo readiness check kalon me `dotnet run -- --demo-check`.

## Gjatë prezantimit

- Shpjego shkurt problemin: vendimet e biznesit ruhen shpesh pa strukturë.
- Trego përdoruesin kryesor: Business Owner.
- Hap website-in me `dotnet run`.
- Demonstro flow-in: Login/Register -> Dashboard -> Add -> Search/Filter -> Update -> Delete -> Export.
- Shpjego teknikisht arkitekturën: HTML/CSS/JS UI -> C# API -> Service -> Repository -> CSV.
- Trego problemin real të zgjidhur: input validation me `TryParse`.
- Mbylle me dobësitë reale: CSV për ruajtje të thjeshtë, mungesë unit tests me framework të jashtëm.

## Plan B

- Nëse demo live dështon, përdor `docs/demo-output.txt`.
- Nëse website-i nuk hapet, përdor README për komandat dhe flow-in.
- Nëse ka problem me të dhënat në CSV, përdor `dotnet run -- --demo-check`, sepse ky kontroll përdor file të përkohshëm dhe nuk prek `Data/data.csv`.
- Nëse export-i nuk hap download në browser, trego mesazhin në UI dhe shpjego që CSV ruhet në browser si plan B për Vercel.
