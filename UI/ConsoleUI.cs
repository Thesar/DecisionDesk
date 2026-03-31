using Services;
using Data;

namespace UI;

public class ConsoleUI
{
    private DecisionService service;

    public ConsoleUI()
    {
        service = new DecisionService(new FileRepository());
    }

    public void ShowMenu()
    {
        while (true)
        {
            Console.WriteLine("\nDecisionDesk");
            Console.WriteLine("1. List Decisions");
            Console.WriteLine("2. Add Decision");
            Console.WriteLine("3. Find by ID");
            Console.WriteLine("4. Update Decision");
            Console.WriteLine("5. Delete Decision");
            Console.WriteLine("0. Exit");

            var choice = Console.ReadLine();

            if (choice == "1")
            {
                var list = service.ListAll();
                foreach (var d in list)
                {
                    Console.WriteLine($"{d.GetId()} - {d.GetName()} - {d.GetValue()}");
                }
            }
            else if (choice == "2")
            {
                Console.Write("Name: ");
                string name = Console.ReadLine() ?? "";

                Console.Write("Type: ");
                string type = Console.ReadLine() ?? "";

                Console.Write("Value: ");
                double value = double.Parse(Console.ReadLine() ?? "0");

                Console.Write("Risk: ");
                double risk = double.Parse(Console.ReadLine() ?? "0");

                service.Add(name, type, value, risk);
            }
            else if (choice == "3")
            {
                Console.Write("ID: ");
                int id = int.Parse(Console.ReadLine() ?? "0");

                var d = service.GetById(id);

                if (d != null)
                    Console.WriteLine($"{d.GetName()} - {d.GetValue()}");
                else
                    Console.WriteLine("Not found");
            }
            else if (choice == "4")
            {
                Console.Write("ID: ");
                int id = int.Parse(Console.ReadLine() ?? "0");

                Console.Write("New Name: ");
                string name = Console.ReadLine() ?? "";

                Console.Write("New Value: ");
                double value = double.Parse(Console.ReadLine() ?? "0");

                service.Update(id, name, value);
                Console.WriteLine("Updated!");
            }
            else if (choice == "5")
            {
                Console.Write("ID: ");
                int id = int.Parse(Console.ReadLine() ?? "0");

                service.Delete(id);
                Console.WriteLine("Deleted!");
            }
            else if (choice == "0")
            {
                break;
            }
        }
    }
}
