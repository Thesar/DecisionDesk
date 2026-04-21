using Services;

namespace UI;

public class ConsoleUI
{
    private readonly DecisionService service;

    public ConsoleUI(DecisionService service)
    {
        this.service = service;
    }

    public void ShowMenu()
    {
        while (true)
        {
            Console.WriteLine("\n=== DecisionDesk ===");
            Console.WriteLine("1. List Decisions");
            Console.WriteLine("2. Add Decision");
            Console.WriteLine("3. Find by ID");
            Console.WriteLine("4. Update Decision");
            Console.WriteLine("5. Delete Decision");
            Console.WriteLine("6. Filter by Type");
            Console.WriteLine("0. Exit");
            Console.Write("Zgjedhja juaj: ");

            string choice = Console.ReadLine() ?? "";

            switch (choice)
            {
                case "1":
                    ListDecisions();
                    break;
                case "2":
                    AddDecision();
                    break;
                case "3":
                    FindDecisionById();
                    break;
                case "4":
                    UpdateDecision();
                    break;
                case "5":
                    DeleteDecision();
                    break;
                case "6":
                    FilterByType();
                    break;
                case "0":
                    Console.WriteLine("Programi u mbyll.");
                    return;
                default:
                    Console.WriteLine("Zgjedhje e pavlefshme.");
                    break;
            }
        }
    }

    private void ListDecisions()
    {
        var list = service.ListAll();

        if (!list.Any())
        {
            Console.WriteLine("Nuk ka vendime të ruajtura.");
            return;
        }

        foreach (var decision in list)
        {
            Console.WriteLine(decision);
        }
    }

    private void AddDecision()
    {
        Console.Write("Name: ");
        string name = Console.ReadLine() ?? "";

        Console.Write("Type: ");
        string type = Console.ReadLine() ?? "";

        double value = ReadDouble("Value: ");
        double risk = ReadDouble("Risk: ");

        bool result = service.Add(name, type, value, risk, out string message);
        Console.WriteLine(message);
    }

    private void FindDecisionById()
    {
        int id = ReadInt("ID: ");
        var decision = service.GetById(id);

        if (decision == null)
        {
            Console.WriteLine("Itemi nuk u gjet.");
            return;
        }

        Console.WriteLine(decision);
    }

    private void UpdateDecision()
    {
        int id = ReadInt("ID: ");

        Console.Write("New Name: ");
        string name = Console.ReadLine() ?? "";

        double value = ReadDouble("New Value: ");

        bool result = service.Update(id, name, value, out string message);
        Console.WriteLine(message);
    }

    private void DeleteDecision()
    {
        int id = ReadInt("ID: ");

        bool result = service.Delete(id, out string message);
        Console.WriteLine(message);
    }

    private void FilterByType()
    {
        Console.Write("Shkruaj tipin për filtrim: ");
        string filter = Console.ReadLine() ?? "";

        var list = service.ListAll(filter);

        if (!list.Any())
        {
            Console.WriteLine("Nuk u gjet asnjë rezultat.");
            return;
        }

        foreach (var decision in list)
        {
            Console.WriteLine(decision);
        }
    }

    private int ReadInt(string message)
    {
        while (true)
        {
            Console.Write(message);
            string input = Console.ReadLine() ?? "";

            if (int.TryParse(input, out int result))
            {
                return result;
            }

            Console.WriteLine("Ju lutem shkruani numër valid.");
        }
    }

    private double ReadDouble(string message)
    {
        while (true)
        {
            Console.Write(message);
            string input = Console.ReadLine() ?? "";

            if (double.TryParse(input, out double result))
            {
                return result;
            }

            Console.WriteLine("Ju lutem shkruani numër valid.");
        }
    }
}