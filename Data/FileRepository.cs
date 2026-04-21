using Models;

namespace Data;

public class FileRepository : IRepository<Decision>
{
    private readonly string filePath;

    public FileRepository(string filePath)
    {
        this.filePath = filePath;

        string? directory = Path.GetDirectoryName(filePath);
        if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        if (!File.Exists(filePath))
        {
            Console.WriteLine("File nuk u gjet, po krijoj file të ri...");
            File.WriteAllLines(filePath, new[]
            {
                "1,Price Change,price,10,0.2",
                "2,Hiring,hiring,5000,0.3",
                "3,Marketing,marketing,2000,0.25",
                "4,Expansion,investment,10000,0.5",
                "5,Discount,price,5,0.15"
            });
        }
    }

    public List<Decision> GetAll()
    {
        var list = new List<Decision>();

        try
        {
            var lines = File.ReadAllLines(filePath);

            foreach (var line in lines)
            {
                var parts = line.Split(',');

                if (parts.Length != 5)
                {
                    continue;
                }

                bool idOk = int.TryParse(parts[0], out int id);
                string name = parts[1];
                string type = parts[2];
                bool valueOk = double.TryParse(parts[3], out double value);
                bool riskOk = double.TryParse(parts[4], out double risk);

                if (!idOk || !valueOk || !riskOk)
                {
                    continue;
                }

                list.Add(new Decision(id, name, type, value, risk));
            }
        }
        catch
        {
            Console.WriteLine("Ndodhi problem gjatë leximit të file-it.");
        }

        return list;
    }

    public Decision? GetById(int id)
    {
        return GetAll().FirstOrDefault(d => d.GetId() == id);
    }

    public bool Add(Decision item)
    {
        var list = GetAll();
        list.Add(item);
        return Save(list);
    }

    public bool Update(Decision updated)
    {
        var list = GetAll();
        int index = list.FindIndex(d => d.GetId() == updated.GetId());

        if (index == -1)
        {
            return false;
        }

        list[index] = updated;
        return Save(list);
    }

    public bool Delete(int id)
    {
        var list = GetAll();
        var item = list.FirstOrDefault(d => d.GetId() == id);

        if (item == null)
        {
            return false;
        }

        list.Remove(item);
        return Save(list);
    }

    public bool Save(List<Decision> list)
    {
        try
        {
            var lines = list.Select(d =>
                $"{d.GetId()},{d.GetName()},{d.GetTypeName()},{d.GetValue()},{d.GetRisk()}");

            File.WriteAllLines(filePath, lines);
            return true;
        }
        catch
        {
            Console.WriteLine("Ndodhi problem gjatë ruajtjes së të dhënave.");
            return false;
        }
    }
}