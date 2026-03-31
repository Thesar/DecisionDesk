using Models;
using Data;

namespace Services;

public class DecisionService
{
    private IRepository<Decision> repo;

    public DecisionService(IRepository<Decision> repo)
    {
        this.repo = repo;
    }

    public List<Decision> ListAll(string typeFilter = "")
    {
        var list = repo.GetAll();

        if (!string.IsNullOrEmpty(typeFilter))
        {
            list = list.Where(d => d.GetTypeName() == typeFilter).ToList();
        }

        return list;
    }

    public void Add(string name, string type, double value, double risk)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new Exception("Name cannot be empty");

        if (value <= 0)
            throw new Exception("Value must be > 0");

        var list = repo.GetAll();
        int newId = list.Count + 1;

        var decision = new Decision(newId, name, type, value, risk);
        repo.Add(decision);
    }

    public Decision? GetById(int id)
    {
        return repo.GetById(id);
    }

    public void Update(int id, string name, double value)
    {
        var existing = repo.GetById(id);

        if (existing == null)
            throw new Exception("Not found");

        if (string.IsNullOrWhiteSpace(name))
            throw new Exception("Name cannot be empty");

        if (value <= 0)
            throw new Exception("Value must be > 0");

        var updated = new Decision(id, name, existing.GetTypeName(), value, existing.GetRisk());

        repo.Update(updated);
    }

    public void Delete(int id)
    {
        var existing = repo.GetById(id);

        if (existing == null)
            throw new Exception("Not found");

        repo.Delete(id);
    }
}
