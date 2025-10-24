import java.util.ArrayList;
import java.util.Scanner;

public class DropoutManagementSystem {

    // Inner class to represent a Student
    static class Student {
        private int id;
        private String name;
        private String course;
        private boolean isDroppedOut;

        public Student(int id, String name, String course) {
            this.id = id;
            this.name = name;
            this.course = course;
            this.isDroppedOut = false;
        }

        public int getId() { return id; }
        public String getName() { return name; }
        public String getCourse() { return course; }
        public boolean isDroppedOut() { return isDroppedOut; }

        public void setDroppedOut(boolean droppedOut) {
            isDroppedOut = droppedOut;
        }

        @Override
        public String toString() {
            String status = isDroppedOut ? "❌ Dropped Out" : "✅ Enrolled";
            return id + " | " + name + " | " + course + " | " + status;
        }
    }

    // Main list and scanner
    static ArrayList<Student> students = new ArrayList<>();
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        int choice;

        do {
            System.out.println("\n===== 🎓 UNIVERSITY DROPOUT MANAGEMENT SYSTEM =====");
            System.out.println("1. Add Student");
            System.out.println("2. View All Students");
            System.out.println("3. Mark Student as Dropped Out");
            System.out.println("4. View Dropout Students");
            System.out.println("5. Search Student by ID");
            System.out.println("6. Delete Student");
            System.out.println("7. Exit");
            System.out.print("Enter your choice: ");
            choice = sc.nextInt();

            switch (choice) {
                case 1 -> addStudent();
                case 2 -> viewAllStudents();
                case 3 -> markDropout();
                case 4 -> viewDropouts();
                case 5 -> searchStudent();
                case 6 -> deleteStudent();
                case 7 -> System.out.println("Exiting... Thank you for using the system!");
                default -> System.out.println("⚠️ Invalid choice! Please try again.");
            }
        } while (choice != 7);

        sc.close();
    }

    // Add a new student
    static void addStudent() {
        System.out.print("Enter Student ID: ");
        int id = sc.nextInt();
        sc.nextLine();
        System.out.print("Enter Student Name: ");
        String name = sc.nextLine();
        System.out.print("Enter Course: ");
        String course = sc.nextLine();

        students.add(new Student(id, name, course));
        System.out.println("✅ Student added successfully!");
    }

    // View all students
    static void viewAllStudents() {
        System.out.println("\n--- All Students ---");
        if (students.isEmpty()) {
            System.out.println("No records found!");
            return;
        }
        for (Student s : students)
            System.out.println(s);
    }

    // Mark student as dropped out
    static void markDropout() {
        System.out.print("Enter Student ID to mark as dropout: ");
        int id = sc.nextInt();

        for (Student s : students) {
            if (s.getId() == id) {
                if (s.isDroppedOut()) {
                    System.out.println("⚠️ Student is already marked as dropout!");
                } else {
                    s.setDroppedOut(true);
                    System.out.println("✅ Student marked as dropout successfully!");
                }
                return;
            }
        }
        System.out.println("❌ Student not found!");
    }

    // View only dropout students
    static void viewDropouts() {
        System.out.println("\n--- Dropout Students ---");
        boolean found = false;
        for (Student s : students) {
            if (s.isDroppedOut()) {
                System.out.println(s);
                found = true;
            }
        }
        if (!found) System.out.println("No dropout students found!");
    }

    // Search student by ID
    static void searchStudent() {
        System.out.print("Enter Student ID to search: ");
        int id = sc.nextInt();

        for (Student s : students) {
            if (s.getId() == id) {
                System.out.println("\n--- Student Found ---");
                System.out.println(s);
                return;
            }
        }
        System.out.println("❌ Student not found!");
    }

    // Delete a student record
    static void deleteStudent() {
        System.out.print("Enter Student ID to delete: ");
        int id = sc.nextInt();

        for (Student s : students) {
            if (s.getId() == id) {
                students.remove(s);
                System.out.println("🗑️ Student deleted successfully!");
                return;
            }
        }
        System.out.println("❌ Student not found!");
    }
}
