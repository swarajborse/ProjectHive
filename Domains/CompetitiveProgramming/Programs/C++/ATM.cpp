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
Positive integer 0 < X ≤ 2000 - the amount of cash which Pooja wishes to withdraw.
Nonnegative number 0 ≤ Y ≤ 2000 with two digits of precision - Pooja's initial 
account balance.

Output:
Output the account balance after the attempted transaction, given as a number with 
two digits of precision. If the transaction is unsuccessful, output the current 
bank balance.

Examples:
Input: 30 120.00
Output: 89.50

Input: 42 120.00
Output: 120.00

Input: 300 120.00
Output: 120.00

Approach:
1. Check if X is multiple of 5
2. Check if balance >= X + 0.50
3. If both true, deduct X + 0.50 from balance
4. Otherwise, keep balance unchanged

Time Complexity: O(1)
Space Complexity: O(1)

Contributor: SampleContributor
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    int x;
    double y;
    cin >> x >> y;
    
    // Check if withdrawal is valid
    if (x % 5 == 0 && y >= x + 0.50) {
        y = y - x - 0.50;
    }
    
    // Print with 2 decimal places
    cout << fixed << setprecision(2) << y << endl;
    
    return 0;
}

/*
Test Cases:
Input: 30 120.00
Output: 89.50

Input: 42 120.00
Output: 120.00

Input: 300 120.00
Output: 120.00

Input: 5 5.50
Output: 0.00
*/
