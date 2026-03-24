using System.IO;
using Models;

namespace Data;

public class FileRepository : IRepository<Decision>
{
    private List<Decision> data = new List<Decision>();
    private string filePath = "data.csv";

    public List<Decision> GetAll()
    {
        return data;
    }

    public Decision GetById(int id)
    {
        return data.FirstOrDefault(d => d.GetId() == id)!;
    }

    public void Add(Decision entity)
    {
        data.Add(entity);
    }

    public void Save()
    {
        using (StreamWriter writer = new StreamWriter(filePath))
        {
            foreach (var d in data)
            {
                writer.WriteLine($"{d.GetId()},{d.GetDecisionType()},{d.GetValue()}");
            }
        }
    }
}
