namespace Models;

public class Decision
{
    private int id;
    private string type = "";
    private double value = 0;

    public int GetId() => id;
    public string GetDecisionType() => type;
    public double GetValue() => value;
}
