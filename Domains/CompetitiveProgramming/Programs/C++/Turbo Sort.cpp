/*
Problem: Turbo Sort
Platform: CodeChef
Problem Code: TSORT
Difficulty: Easy
Link: https://www.codechef.com/problems/TSORT

Problem Statement:
Given the list of numbers, you are to sort them in non-decreasing order.

Input:
The first line contains integer t, the number of integers in the list (1 ≤ t ≤ 10^6).
Next t lines contain one integer each (integers are in the range [1, 10^6]).

Output:
Output the sorted list of integers, one per line.

Examples:
Input:
5
5
3
6
7
1

Output:
1
3
5
6
7

Approach:
1. Read all numbers into a vector
2. Sort the vector
3. Print sorted numbers

Time Complexity: O(n log n)
Space Complexity: O(n)

Contributor: SampleContributor
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    cin >> t;
    
    vector<int> numbers(t);
    
    for (int i = 0; i < t; i++) {
        cin >> numbers[i];
    }
    
    // Sort the numbers
    sort(numbers.begin(), numbers.end());
    
    // Print sorted numbers
    for (int i = 0; i < t; i++) {
        cout << numbers[i] << endl;
    }
    
    return 0;
}

/*
Test Cases:
Input:
5
5
3
6
7
1

Output:
1
3
5
6
7

Input:
3
100
50
75

Output:
50
75
100
*/
