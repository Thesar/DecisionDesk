using System.IO;

namespace Data;

public class FileRepository<T> : IRepository<T>
{
    private List<T> data = new List<T>();

    public List<T> GetAll() => data;

    public T GetById(int id) => data[id];

    public void Add(T entity) => data.Add(entity);

    public void Save()
    {
        File.WriteAllText("data.csv", "saved");
    }
}
