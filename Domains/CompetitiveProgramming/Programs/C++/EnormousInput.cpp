/*
Problem: Enormous Input Test
Platform: CodeChef
Problem Code: INTEST
Difficulty: Easy
Link: https://www.codechef.com/problems/INTEST

Problem Statement:
The purpose of this problem is to verify whether the method you are using to read 
input data is sufficiently fast to handle problems branded with the enormous Input/Output 
warning. You are expected to be able to process at least 2.5MB of input data per second 
at runtime.

Input:
The input begins with two positive integers n k (n, k ≤ 10^7). The next n lines of 
input contain one positive integer ti, not greater than 10^9, each.

Output:
Write a single integer to output, denoting how many integers ti are divisible by k.

Examples:
Input:
7 3
1
51
966369
7
9
999996
11

Output:
4

Explanation: 4 numbers are divisible by 3 (51, 966369, 9, 999996)

Approach:
1. Read n and k
2. For each of n numbers, check if divisible by k
3. Count and return the result
Note: Use fast I/O for large inputs

Time Complexity: O(n)
Space Complexity: O(1)

Contributor: SampleContributor
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, k;
    cin >> n >> k;
    
    int count = 0;
    
    for (int i = 0; i < n; i++) {
        int t;
        cin >> t;
        
        if (t % k == 0) {
            count++;
        }
    }
    
    cout << count << endl;
    
    return 0;
}

/*
Test Cases:
Input:
7 3
1
51
966369
7
9
999996
11

Output:
4

Input:
5 2
2
4
6
8
10

Output:
5
*/
