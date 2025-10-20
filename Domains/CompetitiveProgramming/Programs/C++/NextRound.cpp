/*
Problem: Next Round
Platform: Codeforces
Problem Code: 158A
Difficulty: Easy
Link: https://codeforces.com/problemset/problem/158/A

Problem Statement:
"Contestant who earns a score equal to or greater than the k-th place finisher's 
score will advance to the next round, as long as the contestant earns a positive 
score..." — an excerpt from the rules.

A total of n participants took part in the contest. The scores are given in 
non-increasing order. How many participants will advance to the next round?

Input:
First line: two integers n and k (1 ≤ k ≤ n ≤ 50)
Second line: n space-separated integers a1, a2, ..., an (0 ≤ ai ≤ 100), 
where ai is the score of the i-th participant in non-increasing order.

Output:
Output the number of participants who advance to the next round.

Examples:
Input:
8 5
10 9 8 7 7 7 5 5

Output:
6

Explanation: 
The k-th (5th) place finisher scored 7. So participants with score ≥ 7 and > 0 advance.
That's 6 participants: 10, 9, 8, 7, 7, 7

Approach:
1. Read scores and find k-th place score
2. Count participants with score ≥ k-th score AND score > 0

Time Complexity: O(n)
Space Complexity: O(n)

Contributor: SampleContributor
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    
    vector<int> scores(n);
    for (int i = 0; i < n; i++) {
        cin >> scores[i];
    }
    
    int kth_score = scores[k - 1];
    int count = 0;
    
    for (int i = 0; i < n; i++) {
        if (scores[i] >= kth_score && scores[i] > 0) {
            count++;
        }
    }
    
    cout << count << endl;
    
    return 0;
}

/*
Test Cases:
Input:
8 5
10 9 8 7 7 7 5 5

Output:
6

Input:
4 2
0 0 0 0

Output:
0

Input:
3 3
10 10 10

Output:
3
*/
