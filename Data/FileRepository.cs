using Models;

namespace Data;

public class FileRepository : IRepository<Decision>
{
    private string filePath = "Data/data.csv";

    public List<Decision> GetAll()
    {
        var list = new List<Decision>();

        if (!File.Exists(filePath))
            return list;

        var lines = File.ReadAllLines(filePath);

        foreach (var line in lines)
        {
            var parts = line.Split(',');

            int id = int.Parse(parts[0]);
            string name = parts[1];
            string type = parts[2];
            double value = double.Parse(parts[3]);
            double risk = double.Parse(parts[4]);

            list.Add(new Decision(id, name, type, value, risk));
        }

        return list;
    }

    public Decision? GetById(int id)
    {
        return GetAll().FirstOrDefault(d => d.GetId() == id);
    }

    public void Add(Decision item)
    {
        var list = GetAll();
        list.Add(item);
        Save(list);
    }

    public void Update(Decision updated)
    {
        var list = GetAll();

        var existing = list.FirstOrDefault(d => d.GetId() == updated.GetId());

        if (existing != null)
        {
            list.Remove(existing);
            list.Add(updated);
            Save(list);
        }
    }

    public void Delete(int id)
    {
        var list = GetAll();

        var item = list.FirstOrDefault(d => d.GetId() == id);

        if (item != null)
        {
            list.Remove(item);
            Save(list);
        }
    }

    public void Save(List<Decision> list)
    {
        var lines = list.Select(d =>
            $"{d.GetId()},{d.GetName()},{d.GetTypeName()},{d.GetValue()},{d.GetRisk()}");

        File.WriteAllLines(filePath, lines);
    }
}
