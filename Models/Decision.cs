namespace Models;

public class Decision
{
    private int id;
    private string name;
    private string type;
    private double value;
    private double risk;

    public Decision(int id, string name, string type, double value, double risk)
    {
        this.id = id;
        this.name = name;
        this.type = type;
        this.value = value;
        this.risk = risk;
    }

    public int GetId() => id;
    public string GetName() => name;
    public string GetTypeName() => type;
    public double GetValue() => value;
    public double GetRisk() => risk;
}
