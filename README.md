# DecisionDesk

DecisionDesk është një aplikacion web me C#, HTML, CSS dhe JavaScript për menaxhimin e vendimeve të biznesit. Projekti ndihmon një përdorues të ruajë, kontrollojë dhe përditësojë vendime në mënyrë të strukturuar, në vend që t'i mbajë të shpërndara në Excel, dokumente ose shënime të paorganizuara.

## Problemi që zgjidh

Në një biznes të vogël, vendimet si ndryshimi i çmimit, punësimi, investimi ose marketingu shpesh ruhen pa strukturë të qartë. Kjo e bën të vështirë të shihet çfarë vendimesh janë marrë, cili është tipi i tyre, çfarë vlere kanë dhe sa risk përmbajnë.

DecisionDesk e zgjidh këtë problem duke ofruar një rrjedhë të thjeshtë:

Add Decision -> Validate -> Save -> List -> Update/Delete

## Përdoruesit kryesorë

- Business Owner
- Studentë ose persona që duan të organizojnë vendime biznesi
- Përdorues që duan një historik të thjeshtë vendimesh

## Funksionalitetet aktuale

- Listimi i vendimeve
- Shtimi i një vendimi të ri
- Kërkimi sipas ID
- Përditësimi i emrit dhe vlerës së vendimit
- Fshirja e vendimit
- Filtrimi sipas tipit
- Dashboard web për vizualizimin e vendimeve
- API endpoints në C# për listim, shtim, përditësim dhe fshirje
- Validim i inputeve numerike dhe tekstit
- Ruajtje dhe lexim nga CSV
- Arkitekturë me shtresa: UI, Services, Data, Models
- Repository Pattern
- Demo readiness check me komandën `dotnet run -- --demo-check`

## Teknologjitë e përdorura

- C#
- .NET Web Application
- HTML
- CSS
- JavaScript
- CSV file handling
- Git dhe GitHub

## Si hapet projekti

Kërkohet .NET SDK 9.0 ose më i ri.

```bash
dotnet build
dotnet run
```

Pas komandës `dotnet run`, hapet website-i në URL-në që shfaq terminali, zakonisht:

```text
http://localhost:5000
```

Versioni console ende ekziston për backup:

```bash
dotnet run -- --console
```

## Deployment në Vercel

Vercel shërben pjesën statike të website-it nga folderi `wwwroot`. Kjo është konfiguruar në `vercel.json`.

Në Vercel, website-i përdor të dhëna demo në browser përmes `localStorage`, sepse C# API ekzekutohet lokalisht me `dotnet run`. Lokalisht, i njëjti UI lidhet me C# API dhe CSV.

Për të kontrolluar shpejt nëse flow-i kryesor është gati për demo:

```bash
dotnet run -- --demo-check
```

## Flow-i për demo live

Flow-i që duhet të prezantohet live është:

1. Hap aplikacionin me `dotnet run`
2. Hap website-in në browser
3. Shton një vendim të ri nga forma `Add Decision`
4. E sheh vendimin në tabelë dhe te statistikat
5. Përdor filter/search për ta gjetur
6. Klikon `Edit` për ta përditësuar
7. Klikon `Delete` për ta fshirë

Ky flow tregon input, validim, ruajtje në CSV, lexim, përditësim dhe fshirje.

## Struktura e projektit

```text
DecisionDesk/
  Data/
    FileRepository.cs
    IRepository.cs
    data.csv
  Models/
    Decision.cs
  Services/
    DecisionService.cs
    DemoReadinessCheck.cs
    SimulationService.cs
  UI/
    ConsoleUI.cs
  wwwroot/
    index.html
    styles.css
    app.js
  docs/
    demo-plan.md
    demo-checklist.md
    demo-output.txt
    architecture.md
    class-diagram.md
```

## Statusi

Versioni aktual është i përgatitur për demo të flow-it kryesor CRUD në website. Role system dhe simulime më të avancuara mbeten ide për zgjerim, jo pjesë që do të prezantohen si funksionale live në këtë version.

## Dobësitë e njohura

- Ruajtja në CSV është e mirë për demo dhe projekt bazik, por jo për sistem të madh.
- Nuk ka unit tests me framework të jashtëm, por ka kontroll të brendshëm për demo me `--demo-check`.
