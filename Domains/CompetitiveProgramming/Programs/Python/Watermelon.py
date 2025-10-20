"""
Problem: Watermelon
Platform: Codeforces
Problem Code: 4A
Difficulty: Easy
Link: https://codeforces.com/problemset/problem/4/A

Problem Statement:
One hot summer day Pete and his friend Billy decided to buy a watermelon. 
They chose the biggest and the ripest one, in their opinion. After that the 
watermelon was weighed, and the scales showed w kilos. They rushed home, dying 
of thirst, and decided to divide the berry, so that each of them gets a part of 
at least 2 kilograms, and each piece is of even weight.

The boys are extremely tired and want to start their meal as soon as possible, 
could you help them and find out if they can divide the watermelon in the way they want?

Input:
The first (and the only) input line contains integer w (1 ≤ w ≤ 100) — the weight of the watermelon.

Output:
Print YES, if the boys can divide the watermelon in the way they want, and NO in the opposite case.

Examples:
Input: 8
Output: YES

Approach:
The problem asks if we can divide w into two even positive numbers.
For this to be possible:
1. w must be even (sum of two even numbers is even)
2. w must be greater than 2 (each part should be at least 2)

Time Complexity: O(1)
Space Complexity: O(1)

Contributor: SampleContributor
"""

w = int(input())

if w % 2 == 0 and w > 2:
    print("YES")
else:
    print("NO")

"""
Test Cases:
Input: 8
Output: YES

Input: 3
Output: NO

Input: 2
Output: NO
"""
