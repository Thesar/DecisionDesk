namespace Services;

public class SimulationService
{
    public double CalculatePriceImpact(double percent)
    {
        return percent * 0.8;
    }
}
