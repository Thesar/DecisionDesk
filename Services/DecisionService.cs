using Data;
using Models;

namespace Services;

public class DecisionService
{
    private readonly IRepository<Decision> repo;

    public DecisionService(IRepository<Decision> repo)
    {
        this.repo = repo;
    }

    public List<Decision> ListAll(string? typeFilter = null)
    {
        var list = repo.GetAll();

        if (!string.IsNullOrWhiteSpace(typeFilter))
        {
            list = list
                .Where(d => d.GetTypeName().Contains(typeFilter, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        return list;
    }

    public bool Add(string name, string type, double value, double risk, out string message)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            message = "Emri nuk mund të jetë bosh.";
            return false;
        }

        if (string.IsNullOrWhiteSpace(type))
        {
            message = "Tipi nuk mund të jetë bosh.";
            return false;
        }

        if (value <= 0)
        {
            message = "Vlera duhet të jetë më e madhe se 0.";
            return false;
        }

        if (risk < 0)
        {
            message = "Risku nuk mund të jetë negativ.";
            return false;
        }

        var list = repo.GetAll();
        int newId = list.Any() ? list.Max(d => d.GetId()) + 1 : 1;

        var decision = new Decision(newId, name, type, value, risk);
        bool result = repo.Add(decision);

        message = result ? "Vendimi u shtua me sukses." : "Vendimi nuk u ruajt.";
        return result;
    }

    public Decision? GetById(int id)
    {
        return repo.GetById(id);
    }

    public bool Update(int id, string name, double value, out string message)
    {
        var existing = repo.GetById(id);

        if (existing == null)
        {
            message = "Itemi nuk u gjet.";
            return false;
        }

        if (string.IsNullOrWhiteSpace(name))
        {
            message = "Emri nuk mund të jetë bosh.";
            return false;
        }

        if (value <= 0)
        {
            message = "Vlera duhet të jetë më e madhe se 0.";
            return false;
        }

        var updated = new Decision(
            id,
            name,
            existing.GetTypeName(),
            value,
            existing.GetRisk()
        );

        bool result = repo.Update(updated);
        message = result ? "Vendimi u përditësua me sukses." : "Përditësimi dështoi.";
        return result;
    }

    public bool Delete(int id, out string message)
    {
        var existing = repo.GetById(id);

        if (existing == null)
        {
            message = "Itemi nuk u gjet.";
            return false;
        }

        bool result = repo.Delete(id);
        message = result ? "Vendimi u fshi me sukses." : "Fshirja dështoi.";
        return result;
    }
}