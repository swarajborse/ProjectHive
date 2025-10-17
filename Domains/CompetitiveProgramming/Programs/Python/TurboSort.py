"""
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
1. Read all numbers into a list
2. Sort the list
3. Print sorted numbers

Time Complexity: O(n log n)
Space Complexity: O(n)

Contributor: SampleContributor
"""

t = int(input())
numbers = []

for _ in range(t):
    numbers.append(int(input()))

# Sort the numbers
numbers.sort()

# Print sorted numbers
for num in numbers:
    print(num)

"""
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
"""
