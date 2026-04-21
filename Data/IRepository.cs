namespace Data;

public interface IRepository<T>
{
    List<T> GetAll();
    T? GetById(int id);
    bool Add(T entity);
    bool Update(T entity);
    bool Delete(int id);
    bool Save(List<T> list);
}