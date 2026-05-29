using Data;

namespace Services;

public static class DemoReadinessCheck
{
    public static void Run()
    {
        string tempDirectory = Path.Combine(Path.GetTempPath(), "DecisionDeskDemoCheck");
        string tempFile = Path.Combine(tempDirectory, "data.csv");

        if (Directory.Exists(tempDirectory))
        {
            Directory.Delete(tempDirectory, true);
        }

        try
        {
            var repository = new FileRepository(tempFile);
            var service = new DecisionService(repository);

            Print("Initial data loaded", service.ListAll().Count >= 5);

            bool invalidAdd = !service.Add("", "price", 100, 0.2, out _);
            Print("Validation rejects empty name", invalidAdd);

            bool added = service.Add("Demo Decision", "price", 1200, 0.4, out _);
            var addedDecision = service.ListAll().FirstOrDefault(d => d.GetName() == "Demo Decision");
            Print("Add decision", added && addedDecision != null);

            bool filtered = service.ListAll("price").Any(d => d.GetName() == "Demo Decision");
            Print("Filter by type", filtered);

            bool updated = addedDecision != null &&
                service.Update(addedDecision.GetId(), "Updated Demo Decision", 1300, out _);
            bool updateVisible = service.ListAll().Any(d => d.GetName() == "Updated Demo Decision");
            Print("Update decision", updated && updateVisible);

            bool deleted = addedDecision != null && service.Delete(addedDecision.GetId(), out _);
            bool deleteVisible = !service.ListAll().Any(d => d.GetName() == "Updated Demo Decision");
            Print("Delete decision", deleted && deleteVisible);

            Console.WriteLine();
            Console.WriteLine("Demo readiness check completed.");
        }
        finally
        {
            if (Directory.Exists(tempDirectory))
            {
                Directory.Delete(tempDirectory, true);
            }
        }
    }

    private static void Print(string name, bool passed)
    {
        string status = passed ? "PASS" : "FAIL";
        Console.WriteLine($"{status} - {name}");
    }
}
