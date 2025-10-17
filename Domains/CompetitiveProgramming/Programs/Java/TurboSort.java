/*
Problem: Turbo Sort
Platform: CodeChef
Problem Code: TSORT
Difficulty: Easy
Link: https://www.codechef.com/problems/TSORT

Problem Statement:
Given the list of numbers, you are to sort them in non-decreasing order.

Input:
The first line contains integer t (1 ≤ t ≤ 10^6).
Next t lines contain one integer each.

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
1. Read all numbers into an array
2. Sort the array
3. Print sorted numbers

Time Complexity: O(n log n)
Space Complexity: O(n)

Contributor: SampleContributor
*/

import java.util.*;

public class TurboSort {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        
        int[] numbers = new int[t];
        
        for (int i = 0; i < t; i++) {
            numbers[i] = sc.nextInt();
        }
        
        // Sort the numbers
        Arrays.sort(numbers);
        
        // Print sorted numbers
        for (int i = 0; i < t; i++) {
            System.out.println(numbers[i]);
        }
        
        sc.close();
    }
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
*/
