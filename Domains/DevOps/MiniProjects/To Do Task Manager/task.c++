#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

// Function prototypes
void addTask();
void viewTasks();
void deleteTask();

int main() {
    int choice;
    while (true) {
        cout << "\n=== TO-DO TASK MANAGER ===\n";
        cout << "1. Add Task\n";
        cout << "2. View Tasks\n";
        cout << "3. Delete Task\n";
        cout << "4. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
            case 1: addTask(); break;
            case 2: viewTasks(); break;
            case 3: deleteTask(); break;
            case 4: cout << "Exiting... Goodbye!\n"; return 0;
            default: cout << "Invalid choice! Try again.\n";
        }
    }
    return 0;
}

// Function to add a task
void addTask() {
    ofstream file("tasks.txt", ios::app);
    if (!file) {
        cout << "Error opening file!\n";
        return;
    }
    cin.ignore();
    string task;
    cout << "Enter task description: ";
    getline(cin, task);
    file << task << endl;
    file.close();
    cout << "Task added successfully!\n";
}

// Function to view all tasks
void viewTasks() {
    ifstream file("tasks.txt");
    if (!file) {
        cout << "No tasks found!\n";
        return;
    }
    string line;
    int i = 1;
    cout << "\n=== YOUR TASKS ===\n";
    while (getline(file, line)) {
        cout << i++ << ". " << line << endl;
    }
    file.close();
}

// Function to delete a task
void deleteTask() {
    ifstream file("tasks.txt");
    if (!file) {
        cout << "No tasks found!\n";
        return;
    }

    vector<string> tasks;
    string line;
    while (getline(file, line)) {
        tasks.push_back(line);
    }
    file.close();

    if (tasks.empty()) {
        cout << "No tasks to delete!\n";
        return;
    }

    cout << "\n=== TASK LIST ===\n";
    for (int i = 0; i < tasks.size(); i++)
        cout << i + 1 << ". " << tasks[i] << endl;

    int del;
    cout << "Enter task number to delete: ";
    cin >> del;
    if (del < 1 || del > tasks.size()) {
        cout << "Invalid task number!\n";
        return;
    }

    tasks.erase(tasks.begin() + del - 1);

    ofstream out("tasks.txt");
    for (auto &t : tasks)
        out << t << endl;
    out.close();

    cout << "Task deleted successfully!\n";
}
