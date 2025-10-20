/*
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

Input:
The first (and the only) input line contains integer w (1 ≤ w ≤ 100).

Output:
Print YES, if the boys can divide the watermelon in the way they want, and NO otherwise.

Examples:
Input: 8
Output: YES

Approach:
Check if w is even and greater than 2.

Time Complexity: O(1)
Space Complexity: O(1)

Contributor: SampleContributor
*/

import java.util.*;

public class Watermelon {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int w = sc.nextInt();
        
        if (w % 2 == 0 && w > 2) {
            System.out.println("YES");
        } else {
            System.out.println("NO");
        }
        
        sc.close();
    }
}

/*
Test Cases:
Input: 8
Output: YES

Input: 3
Output: NO

Input: 2
Output: NO
*/
