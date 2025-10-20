/*
Problem: Next Round
Platform: Codeforces
Problem Code: 158A
Difficulty: Easy
Link: https://codeforces.com/problemset/problem/158/A

Problem Statement:
"Contestant who earns a score equal to or greater than the k-th place finisher's 
score will advance to the next round, as long as the contestant earns a positive 
score..."

A total of n participants took part in the contest. How many will advance?

Input:
First line: two integers n and k (1 ≤ k ≤ n ≤ 50)
Second line: n space-separated integers

Output:
Output the number of participants who advance to the next round.

Examples:
Input:
8 5
10 9 8 7 7 7 5 5

Output:
6

Approach:
Count participants with score ≥ k-th score AND score > 0

Time Complexity: O(n)
Space Complexity: O(n)

Contributor: SampleContributor
*/

import java.util.*;

public class NextRound {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        
        int[] scores = new int[n];
        for (int i = 0; i < n; i++) {
            scores[i] = sc.nextInt();
        }
        
        int kthScore = scores[k - 1];
        int count = 0;
        
        for (int i = 0; i < n; i++) {
            if (scores[i] >= kthScore && scores[i] > 0) {
                count++;
            }
        }
        
        System.out.println(count);
        
        sc.close();
    }
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
*/
