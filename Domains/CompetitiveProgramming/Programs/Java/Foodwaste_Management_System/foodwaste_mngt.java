import java.util.ArrayList;
import java.util.Scanner;

public class FoodWasteManagementSystem {

    // Inner class to represent a Food Donation
    static class Donation {
        private int id;
        private String donorName;
        private String foodItem;
        private int quantity; // in kg
        private String recipient;

        public Donation(int id, String donorName, String foodItem, int quantity, String recipient) {
            this.id = id;
            this.donorName = donorName;
            this.foodItem = foodItem;
            this.quantity = quantity;
            this.recipient = recipient;
        }

        public int getId() { return id; }
        public String getDonorName() { return donorName; }
        public String getFoodItem() { return foodItem; }
        public int getQuantity() { return quantity; }
        public String getRecipient() { return recipient; }

        @Override
        public String toString() {
            return id + " | Donor: " + donorName + " | Food: " + foodItem + 
                   " | Qty: " + quantity + " kg | Recipient: " + recipient;
        }
    }

    // List to store donations and scanner for input
    static ArrayList<Donation> donations = new ArrayList<>();
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        int choice;
        do {
            System.out.println("\n===== FOOD WASTE MANAGEMENT SYSTEM =====");
            System.out.println("1. Add Donation");
            System.out.println("2. View All Donations");
            System.out.println("3. Search Donation by Donor Name");
            System.out.println("4. Delete Donation by ID");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");
            choice = sc.nextInt();
            sc.nextLine(); // consume newline

            switch (choice) {
                case 1 -> addDonation();
                case 2 -> viewAllDonations();
                case 3 -> searchDonation();
                case 4 -> deleteDonation();
                case 5 -> System.out.println("Exiting system. Thank you!");
                default -> System.out.println("Invalid choice! Please try again.");
            }
        } while (choice != 5);

        sc.close();
    }

    // Add a new donation
    static void addDonation() {
        System.out.print("Enter Donation ID: ");
        int id = sc.nextInt();
        sc.nextLine();
        System.out.print("Enter Donor Name: ");
        String donorName = sc.nextLine();
        System.out.print("Enter Food Item: ");
        String foodItem = sc.nextLine();
        System.out.print("Enter Quantity (kg): ");
        int quantity = sc.nextInt();
        sc.nextLine();
        System.out.print("Enter Recipient: ");
        String recipient = sc.nextLine();

        donations.add(new Donation(id, donorName, foodItem, quantity, recipient));
        System.out.println("Donation added successfully!");
    }

    // View all donations
    static void viewAllDonations() {
        System.out.println("\n--- All Donations ---");
        if (donations.isEmpty()) {
            System.out.println("No donations recorded!");
            return;
        }
        for (Donation d : donations)
            System.out.println(d);
    }

    // Search donation by donor name
    static void searchDonation() {
        System.out.print("Enter Donor Name to search: ");
        String name = sc.nextLine();
        boolean found = false;
        for (Donation d : donations) {
            if (d.getDonorName().equalsIgnoreCase(name)) {
                System.out.println(d);
                found = true;
            }
        }
        if (!found) System.out.println("No donations found for donor: " + name);
    }

    // Delete donation by ID
    static void deleteDonation() {
        System.out.print("Enter Donation ID to delete: ");
        int id = sc.nextInt();
        for (Donation d : donations) {
            if (d.getId() == id) {
                donations.remove(d);
                System.out.println("Donation deleted successfully!");
                return;
            }
        }
        System.out.println("Donation ID not found!");
    }
}
