"""
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
Second line: n space-separated integers a1, a2, ..., an (0 ≤ ai ≤ 100)

Output:
Output the number of participants who advance to the next round.

Examples:
Input:
8 5
10 9 8 7 7 7 5 5

Output:
6

Approach:
1. Read scores and find k-th place score
2. Count participants with score ≥ k-th score AND score > 0

Time Complexity: O(n)
Space Complexity: O(n)

Contributor: SampleContributor
"""

n, k = map(int, input().split())
scores = list(map(int, input().split()))

kth_score = scores[k - 1]
count = 0

for score in scores:
    if score >= kth_score and score > 0:
        count += 1

print(count)

"""
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
"""
