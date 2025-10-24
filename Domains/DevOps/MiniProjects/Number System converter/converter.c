#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

// Function prototypes
void decToBin(int n);
void decToOct(int n);
void decToHex(int n);
int binToDec(long long n);
int octToDec(int n);
int hexToDec(char hex[]);

int main() {
    int choice;
    do {
        printf("\n=== NUMBER SYSTEM CONVERTER ===\n");
        printf("1. Decimal to Binary, Octal, Hexadecimal\n");
        printf("2. Binary to Decimal\n");
        printf("3. Octal to Decimal\n");
        printf("4. Hexadecimal to Decimal\n");
        printf("5. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        if(choice == 1) {
            int dec;
            printf("Enter decimal number: ");
            scanf("%d", &dec);
            decToBin(dec);
            decToOct(dec);
            decToHex(dec);
        }
        else if(choice == 2) {
            long long bin;
            printf("Enter binary number: ");
            scanf("%lld", &bin);
            printf("Decimal: %d\n", binToDec(bin));
        }
        else if(choice == 3) {
            int oct;
            printf("Enter octal number: ");
            scanf("%o", &oct); // %o reads octal
            printf("Decimal: %d\n", octToDec(oct));
        }
        else if(choice == 4) {
            char hex[20];
            printf("Enter hexadecimal number: ");
            scanf("%s", hex);
            printf("Decimal: %d\n", hexToDec(hex));
        }
        else if(choice == 5) {
            printf("Exiting... Goodbye!\n");
        }
        else {
            printf("Invalid choice! Try again.\n");
        }

    } while(choice != 5);

    return 0;
}

// Decimal to Binary
void decToBin(int n) {
    int bin[32], i = 0;
    int temp = n;
    while (temp > 0) {
        bin[i++] = temp % 2;
        temp /= 2;
    }
    printf("Binary: ");
    if(n==0) printf("0");
    else
        for(int j=i-1;j>=0;j--) printf("%d", bin[j]);
    printf("\n");
}

// Decimal to Octal
void decToOct(int n) {
    int oct[32], i = 0;
    int temp = n;
    while (temp > 0) {
        oct[i++] = temp % 8;
        temp /= 8;
    }
    printf("Octal: ");
    if(n==0) printf("0");
    else
        for(int j=i-1;j>=0;j--) printf("%d", oct[j]);
    printf("\n");
}

// Decimal to Hexadecimal
void decToHex(int n) {
    char hex[32];
    int i = 0;
    int temp = n;
    while(temp > 0) {
        int r = temp % 16;
        if(r < 10) hex[i++] = r + '0';
        else hex[i++] = r - 10 + 'A';
        temp /= 16;
    }
    printf("Hexadecimal: ");
    if(n==0) printf("0");
    else {
        for(int j=i-1;j>=0;j--) printf("%c", hex[j]);
    }
    printf("\n");
}

// Binary to Decimal
int binToDec(long long n) {
    int dec = 0, i = 0;
    while(n != 0) {
        int rem = n % 10;
        dec += rem * (1 << i); // 2^i
        n /= 10;
        i++;
    }
    return dec;
}

// Octal to Decimal
int octToDec(int n) {
    int dec = 0, i = 0;
    while(n != 0) {
        int rem = n % 10;
        dec += rem * pow(8, i);
        n /= 10;
        i++;
    }
    return dec;
}

// Hexadecimal to Decimal
int hexToDec(char hex[]) {
    int dec = 0;
    int len = strlen(hex);
    for(int i = 0; i < len; i++) {
        char c = hex[len-i-1];
        int val;
        if(c >= '0' && c <= '9') val = c - '0';
        else if(c >= 'A' && c <= 'F') val = c - 'A' + 10;
        else if(c >= 'a' && c <= 'f') val = c - 'a' + 10;
        else val = 0;
        dec += val * pow(16, i);
    }
    return dec;
}
