using Data;
using Models;
using Services;
using UI;

if (args.Contains("--demo-check"))
{
    DemoReadinessCheck.Run();
    return;
}

if (args.Contains("--console"))
{
    var consoleRepository = new FileRepository("Data/data.csv");
    var consoleService = new DecisionService(consoleRepository);
    var consoleUi = new ConsoleUI(consoleService);

    consoleUi.ShowMenu();
    return;
}

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IRepository<Decision>>(_ => new FileRepository("Data/data.csv"));
builder.Services.AddSingleton<DecisionService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api/decisions", (DecisionService service, string? type) =>
{
    return service.ListAll(type).Select(ToDto);
});

app.MapGet("/api/decisions/{id:int}", (DecisionService service, int id) =>
{
    var decision = service.GetById(id);
    return decision == null ? Results.NotFound() : Results.Ok(ToDto(decision));
});

app.MapPost("/api/decisions", (DecisionService service, DecisionRequest request) =>
{
    bool result = service.Add(request.Name, request.Type, request.Value, request.Risk, out string message);

    if (!result)
    {
        return Results.BadRequest(new ApiMessage(message));
    }

    var created = service.ListAll().OrderByDescending(d => d.GetId()).First();
    return Results.Created($"/api/decisions/{created.GetId()}", ToDto(created));
});

app.MapPut("/api/decisions/{id:int}", (DecisionService service, int id, DecisionRequest request) =>
{
    bool result = service.Update(id, request.Name, request.Value, out string message);

    if (!result)
    {
        return Results.BadRequest(new ApiMessage(message));
    }

    var updated = service.GetById(id);
    return updated == null ? Results.NotFound() : Results.Ok(ToDto(updated));
});

app.MapDelete("/api/decisions/{id:int}", (DecisionService service, int id) =>
{
    bool result = service.Delete(id, out string message);
    return result ? Results.Ok(new ApiMessage(message)) : Results.NotFound(new ApiMessage(message));
});

app.MapFallbackToFile("index.html");

app.Run();

static DecisionDto ToDto(Decision decision)
{
    return new DecisionDto(
        decision.GetId(),
        decision.GetName(),
        decision.GetTypeName(),
        decision.GetValue(),
        decision.GetRisk()
    );
}

public record DecisionDto(int Id, string Name, string Type, double Value, double Risk);

public record DecisionRequest(string Name, string Type, double Value, double Risk);

public record ApiMessage(string Message);
