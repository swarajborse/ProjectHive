#include <stdio.h>
#include <stdlib.h>

struct Weather {
    int day;
    float temperature;
    float humidity;
    float windSpeed;
};

void addRecord();
void viewRecords();
void analyzeData();
void clearRecords();

int main() {
    int choice;

    while (1) {
        printf("\n===== WEATHER DATA LOGGER =====\n");
        printf("1. Add Daily Weather Record\n");
        printf("2. View All Records\n");
        printf("3. Analyze Data (Min/Max/Average)\n");
        printf("4. Clear All Records\n");
        printf("5. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                addRecord();
                break;
            case 2:
                viewRecords();
                break;
            case 3:
                analyzeData();
                break;
            case 4:
                clearRecords();
                break;
            case 5:
                printf("\nExiting program... Goodbye!\n");
                exit(0);
            default:
                printf("\nInvalid choice! Try again.\n");
        }
    }

    return 0;
}

// Function to add a new weather record
void addRecord() {
    struct Weather w;
    FILE *fp = fopen("weather.dat", "ab");
    if (fp == NULL) {
        printf("Error opening file!\n");
        return;
    }

    printf("\nEnter Day Number: ");
    scanf("%d", &w.day);
    printf("Enter Temperature (°C): ");
    scanf("%f", &w.temperature);
    printf("Enter Humidity (%%): ");
    scanf("%f", &w.humidity);
    printf("Enter Wind Speed (km/h): ");
    scanf("%f", &w.windSpeed);

    fwrite(&w, sizeof(struct Weather), 1, fp);
    fclose(fp);

    printf("\nRecord added successfully!\n");
}

// Function to view all stored records
void viewRecords() {
    struct Weather w;
    FILE *fp = fopen("weather.dat", "rb");
    if (fp == NULL) {
        printf("\nNo records found!\n");
        return;
    }

    printf("\n=== STORED WEATHER RECORDS ===\n");
    printf("%-10s %-15s %-15s %-15s\n", "Day", "Temperature", "Humidity", "Wind Speed");
    printf("-----------------------------------------------------------\n");

    while (fread(&w, sizeof(struct Weather), 1, fp)) {
        printf("%-10d %-15.2f %-15.2f %-15.2f\n", w.day, w.temperature, w.humidity, w.windSpeed);
    }

    fclose(fp);
}

// Function to analyze data (min, max, avg)
void analyzeData() {
    struct Weather w;
    FILE *fp = fopen("weather.dat", "rb");
    if (fp == NULL) {
        printf("\nNo records found for analysis!\n");
        return;
    }

    float sumTemp = 0, sumHum = 0, sumWind = 0;
    float maxTemp, minTemp, maxHum, minHum, maxWind, minWind;
    int count = 0;

    if (fread(&w, sizeof(struct Weather), 1, fp)) {
        // Initialize with first record
        maxTemp = minTemp = w.temperature;
        maxHum = minHum = w.humidity;
        maxWind = minWind = w.windSpeed;
        sumTemp = w.temperature;
        sumHum = w.humidity;
        sumWind = w.windSpeed;
        count = 1;
    }

    while (fread(&w, sizeof(struct Weather), 1, fp)) {
        if (w.temperature > maxTemp) maxTemp = w.temperature;
        if (w.temperature < minTemp) minTemp = w.temperature;

        if (w.humidity > maxHum) maxHum = w.humidity;
        if (w.humidity < minHum) minHum = w.humidity;

        if (w.windSpeed > maxWind) maxWind = w.windSpeed;
        if (w.windSpeed < minWind) minWind = w.windSpeed;

        sumTemp += w.temperature;
        sumHum += w.humidity;
        sumWind += w.windSpeed;
        count++;
    }

    fclose(fp);

    if (count == 0) {
        printf("\nNo data to analyze!\n");
        return;
    }

    printf("\n=== WEATHER ANALYSIS ===\n");
    printf("Total Days Logged: %d\n", count);
    printf("\nTemperature -> Min: %.2f°C | Max: %.2f°C | Avg: %.2f°C", minTemp, maxTemp, sumTemp/count);
    printf("\nHumidity    -> Min: %.2f%% | Max: %.2f%% | Avg: %.2f%%", minHum, maxHum, sumHum/count);
    printf("\nWind Speed  -> Min: %.2fkm/h | Max: %.2fkm/h | Avg: %.2fkm/h\n", minWind, maxWind, sumWind/count);
}

// Function to clear all records
void clearRecords() {
    FILE *fp = fopen("weather.dat", "wb");
    if (fp == NULL) {
        printf("Error clearing records!\n");
        return;
    }
    fclose(fp);
    printf("\nAll records cleared successfully!\n");
}
