/*
Problem: ATM
Platform: CodeChef
Problem Code: HS08TEST
Difficulty: Easy
Link: https://www.codechef.com/problems/HS08TEST

Problem Statement:
Pooja would like to withdraw X $US from an ATM. The cash machine will only accept 
the transaction if X is a multiple of 5, and Pooja's account balance has enough 
money to cover the withdrawal amount plus a bank's transaction fee of 0.50 $US.

Input:
Positive integer 0 < X ≤ 2000 and nonnegative number 0 ≤ Y ≤ 2000 with two digits of precision.

Output:
Output the account balance after the attempted transaction, with two digits of precision.

Examples:
Input: 30 120.00
Output: 89.50

Approach:
1. Check if X is multiple of 5
2. Check if balance >= X + 0.50
3. If both true, deduct X + 0.50 from balance

Time Complexity: O(1)
Space Complexity: O(1)

Contributor: SampleContributor
*/

import java.util.*;
import java.text.DecimalFormat;

public class ATM {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        double y = sc.nextDouble();
        
        // Check if withdrawal is valid
        if (x % 5 == 0 && y >= x + 0.50) {
            y = y - x - 0.50;
        }
        
        // Print with 2 decimal places
        DecimalFormat df = new DecimalFormat("0.00");
        System.out.println(df.format(y));
        
        sc.close();
    }
}

/*
Test Cases:
Input: 30 120.00
Output: 89.50

Input: 42 120.00
Output: 120.00

Input: 300 120.00
Output: 120.00
*/
