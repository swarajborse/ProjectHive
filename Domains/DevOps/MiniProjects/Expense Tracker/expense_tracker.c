#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Expense {
    char category[20];
    float amount;
};

// Function prototypes
void addExpense();
void viewExpenses();
void analyzeExpenses();
void clearExpenses();

int main() {
    int choice;

    while (1) {
        printf("\n=== PERSONAL EXPENSE TRACKER ===\n");
        printf("1. Add Expense\n");
        printf("2. View All Expenses\n");
        printf("3. Analyze Expenses\n");
        printf("4. Clear All Expenses\n");
        printf("5. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: addExpense(); break;
            case 2: viewExpenses(); break;
            case 3: analyzeExpenses(); break;
            case 4: clearExpenses(); break;
            case 5: printf("\nExiting... Goodbye!\n"); exit(0);
            default: printf("Invalid choice! Try again.\n");
        }
    }

    return 0;
}

// Function to add a new expense
void addExpense() {
    struct Expense e;
    FILE *fp = fopen("expenses.dat", "ab");
    if (fp == NULL) {
        printf("Error opening file!\n");
        return;
    }

    printf("\nEnter category (Food, Travel, etc.): ");
    scanf("%s", e.category);
    printf("Enter amount: ");
    scanf("%f", &e.amount);

    fwrite(&e, sizeof(struct Expense), 1, fp);
    fclose(fp);

    printf("Expense added successfully!\n");
}

// Function to view all expenses
void viewExpenses() {
    struct Expense e;
    FILE *fp = fopen("expenses.dat", "rb");
    if (fp == NULL) {
        printf("\nNo expenses found!\n");
        return;
    }

    printf("\n%-20s %-10s\n", "Category", "Amount");
    printf("------------------------------\n");

    while (fread(&e, sizeof(struct Expense), 1, fp)) {
        printf("%-20s %.2f\n", e.category, e.amount);
    }

    fclose(fp);
}

// Function to analyze total and category-wise expenses
void analyzeExpenses() {
    struct Expense e;
    FILE *fp = fopen("expenses.dat", "rb");
    if (fp == NULL) {
        printf("\nNo expenses found!\n");
        return;
    }

    float total = 0;
    printf("\n=== EXPENSE ANALYSIS ===\n");

    while (fread(&e, sizeof(struct Expense), 1, fp)) {
        total += e.amount;
    }

    printf("Total Expenses: ₹%.2f\n", total);

    fclose(fp);
}

// Function to clear all expenses
void clearExpenses() {
    FILE *fp = fopen("expenses.dat", "wb");
    if (fp == NULL) {
        printf("Error clearing expenses!\n");
        return;
    }
    fclose(fp);
    printf("All expenses cleared successfully!\n");
}
