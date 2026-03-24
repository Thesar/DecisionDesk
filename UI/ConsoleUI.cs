using Services;

namespace UI;

public class ConsoleUI
{
    private SimulationService service = new SimulationService();

    public void ShowMenu()
    {
        Console.WriteLine("DecisionDesk");
        Console.WriteLine("1. Price Simulation");

        var choice = Console.ReadLine();

        if (choice == "1")
        {
            Console.Write("Enter price change %: ");

            string input = Console.ReadLine() ?? "";

            double percent;

            if (!double.TryParse(input, out percent))
            {
                Console.WriteLine("Invalid input");
                return;
            }

            double result = service.CalculatePriceImpact(percent);

            Console.WriteLine($"Estimated impact: {result}");
        }
    }
}
