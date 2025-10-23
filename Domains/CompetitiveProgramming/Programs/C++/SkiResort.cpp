/*
Problem: Ski Resort
Platform: Codeforces
Problem Code: 1840C
Dificulty: Medium
Link: https://codeforces.com/problemset/problem/1840/C

Problem Statement:
Dima wants to go skiing for at least k consecutive days during his n-day vacation.
He can only go if the temperature does not exceed q degrees on all days of the vacation.
Count the number of ways to choose consecutive vacation dates satisfying the conditions.

Approach:
1. Iterate over the array of temperatures and split it into segments where all temperatures ≤ q.
2. For each segment of length L ≥ k, the number of valid subarrays of length ≥ k is:
   (L - k + 1) + (L - k) + ... + 1 = (L - k + 1)*(L - k + 2)/2
3. Sum these counts over all segments to get the answer.

Time Complexity: O(n) per test case
Space Complexity: O(1) extra space (ignoring input)

Contributor: SrushtiV12
*/

#include <bits/stdc++.h>
using namespace std;

long long countVacationWays(vector<int>& temps, int k, int q) {
    long long totalWays = 0; // Stores total number of valid sequences
    long long currentLen = 0; // Length of the current valid segment

    for (int temp : temps) {
        if (temp <= q) {
            // Temperature is within limit, extend current segment
            currentLen++;
        } else {
            // Temperature exceeded q, segment ends here
            if (currentLen >= k) {
                // Count subarrays of length ≥ k within this segment
                totalWays += (currentLen - k + 1LL) * (currentLen - k + 2LL) / 2LL;
            }
            currentLen = 0; // Reset for next segment
        }
    }

    // Handle last segment if it ends at the last day
    if (currentLen >= k) {
        totalWays += (currentLen - k + 1LL) * (currentLen - k + 2LL) / 2LL;
    }

    return totalWays;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t; 
    cin >> t;

    while (t--) {
        int n, k, q;
        cin >> n >> k >> q; 

        vector<int> temps(n);
        for (int i = 0; i < n; i++) cin >> temps[i]; 

        cout << countVacationWays(temps, k, q) << "\n";
    }

    return 0;
}

/*
Test Cases:

Input:
7
3 1 15
-5 0 -10
5 3 -33
8 12 9 0 5
4 3 12
12 12 10 15
4 1 -5
0 -1 2 5
5 5 0
3 -1 4 -5 -3
1 1 5
5
6 1 3
0 3 -2 5 -4 -4

Output:
6
0
1
0
0
1
9
*/
