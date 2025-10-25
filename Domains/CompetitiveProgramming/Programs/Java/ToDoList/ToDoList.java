import java.io.*;
import java.util.*;

class Task implements Serializable {
    private static final long serialVersionUID = 1L;
    private String description;
    private boolean isCompleted;

    public Task(String description) {
        this.description = description;
        this.isCompleted = false;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void markCompleted() {
        isCompleted = true;
    }

    @Override
    public String toString() {
        return (isCompleted ? "[✔] " : "[ ] ") + description;
    }
}

public class ToDoListApp {
    private static final String FILE_NAME = "tasks.txt";
    private static ArrayList<Task> tasks = new ArrayList<>();

    public static void main(String[] args) {
        loadTasks();

        Scanner sc = new Scanner(System.in);
        int choice;

        System.out.println("===== TO-DO LIST APPLICATION =====");

        do {
            System.out.println("\n1. Add Task");
            System.out.println("2. View Tasks");
            System.out.println("3. Mark Task as Completed");
            System.out.println("4. Delete Task");
            System.out.println("5. Exit and Save");
            System.out.print("Enter your choice: ");
            choice = sc.nextInt();
            sc.nextLine(); // consume newline

            switch (choice) {
                case 1:
                    addTask(sc);
                    break;
                case 2:
                    viewTasks();
                    break;
                case 3:
                    markTaskCompleted(sc);
                    break;
                case 4:
                    deleteTask(sc);
                    break;
                case 5:
                    saveTasks();
                    System.out.println("💾 Tasks saved. Goodbye!");
                    break;
                default:
                    System.out.println("⚠️ Invalid choice! Try again.");
            }
        } while (choice != 5);

        sc.close();
    }

    private static void addTask(Scanner sc) {
        System.out.print("Enter task description: ");
        String desc = sc.nextLine();
        tasks.add(new Task(desc));
        System.out.println("✅ Task added successfully!");
    }

    private static void viewTasks() {
        if (tasks.isEmpty()) {
            System.out.println("📭 No tasks found!");
        } else {
            System.out.println("\nYour Tasks:");
            for (int i = 0; i < tasks.size(); i++) {
                System.out.println((i + 1) + ". " + tasks.get(i));
            }
        }
    }

    private static void markTaskCompleted(Scanner sc) {
        viewTasks();
        if (tasks.isEmpty()) return;
        System.out.print("Enter task number to mark completed: ");
        int num = sc.nextInt();
        if (num < 1 || num > tasks.size()) {
            System.out.println("⚠️ Invalid task number!");
        } else {
            tasks.get(num - 1).markCompleted();
            System.out.println("✅ Task marked as completed!");
        }
    }

    private static void deleteTask(Scanner sc) {
        viewTasks();
        if (tasks.isEmpty()) return;
        System.out.print("Enter task number to delete: ");
        int num = sc.nextInt();
        if (num < 1 || num > tasks.size()) {
            System.out.println("⚠️ Invalid task number!");
        } else {
            tasks.remove(num - 1);
            System.out.println("🗑️ Task deleted!");
        }
    }

    private static void saveTasks() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(FILE_NAME))) {
            oos.writeObject(tasks);
        } catch (IOException e) {
            System.out.println("⚠️ Error saving tasks: " + e.getMessage());
        }
    }

    @SuppressWarnings("unchecked")
    private static void loadTasks() {
        File file = new File(FILE_NAME);
        if (!file.exists()) {
            // No saved file yet
            return;
        }
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(FILE_NAME))) {
            tasks = (ArrayList<Task>) ois.readObject();
            System.out.println("📂 Loaded " + tasks.size() + " task(s) from previous session.");
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("⚠️ Error loading tasks: " + e.getMessage());
        }
    }
}
