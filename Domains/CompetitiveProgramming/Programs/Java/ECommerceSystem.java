//E-commerce System

import java.util.*;

public class ECommerceSystem {
    static class Product {
        private String name;
        private double price;
        private int quantity;

        
        
        public Product(String name, double price, int quantity) {
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }

        public double getTotal() {
            return price * quantity;
        }

        public String getName() {
            return name;
        }

        public double getPrice() {
            return price;
        }

        public int getQuantity() {
            return quantity;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Product> cart = new ArrayList<>();

    
        System.out.print("Enter number of products to add: ");
        int n = Integer.parseInt(scanner.nextLine());
        for (int i = 0; i < n; i++) {
            System.out.print("Product name: ");
            String name = scanner.nextLine();
            System.out.print("Product price: ");
            double price = Double.parseDouble(scanner.nextLine());
            System.out.print("Product quantity: ");
            int quantity = Integer.parseInt(scanner.nextLine());
            cart.add(new Product(name, price, quantity));
        }


        double subtotal = 0.0;
        for (Product p : cart) {
            subtotal += p.getTotal();
        }


        double discount = 0.0;
        if (subtotal > 5999) {
            discount = subtotal * 0.10;
        }
        double total = subtotal - discount;


        System.out.println("\n--- Invoice ---");
        System.out.printf("%-15s %-10s %-10s %-10s\n", "Product", "Price", "Qty", "Total");
        for (Product p : cart) {
            System.out.printf("%-15s $%-9.2f %-10d $%-9.2f\n", p.getName(), p.getPrice(), p.getQuantity(), p.getTotal());
        }
        System.out.println("-------------------------------");
        System.out.printf("Subtotal: $%.2f\n", subtotal);
        System.out.printf("Discount: $%.2f\n", discount);
        System.out.printf("Total:    $%.2f\n", total);
    }
    
}

