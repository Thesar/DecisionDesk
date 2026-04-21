using Data;
using Services;
using UI;

var repository = new FileRepository("Data/data.csv");
var service = new DecisionService(repository);
var ui = new ConsoleUI(service);

ui.ShowMenu();