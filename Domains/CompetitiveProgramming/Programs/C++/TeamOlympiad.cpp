/*
Problem: Team Olympiad
Platform: Codeforces
Problem Code: 490A
Difficulty: Easy
Link: https://codeforces.com/problemset/problem/490/A

Problem Statement:
The School of Fine Arts in Berland is preparing to celebrate the 100th anniversary. 
For this, they want to form teams of three students. Each team must have exactly one 
programmer (type 1), one mathematician (type 2), and one sportsman (type 3).

Given the skills of all students, determine the maximum number of teams that can be 
formed and print the composition of each team.

Input:
First line: n (1 ≤ n ≤ 5000) — number of students
Second line: n integers t1, t2, ..., tn where ti is the skill type (1, 2, or 3)

Output:
First line: maximum number of teams w
Next w lines: three numbers i, j, k — indices of students in each team

Examples:
Input:
7
1 3 1 3 2 1 2

Output:
2
1 5 2
3 7 4

Approach:
1. Count students of each type
2. Maximum teams = min(count1, count2, count3)
3. Iterate and form teams by picking one from each type

Time Complexity: O(n)
Space Complexity: O(n)

Contributor: SampleContributor
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    vector<int> type1, type2, type3;
    
    for (int i = 0; i < n; i++) {
        int type;
        cin >> type;
        
        if (type == 1) type1.push_back(i + 1);
        else if (type == 2) type2.push_back(i + 1);
        else type3.push_back(i + 1);
    }
    
    // Maximum teams is minimum of three counts
    int teams = min({type1.size(), type2.size(), type3.size()});
    
    cout << teams << endl;
    
    // Print team compositions
    for (int i = 0; i < teams; i++) {
        cout << type1[i] << " " << type2[i] << " " << type3[i] << endl;
    }
    
    return 0;
}

/*
Test Cases:
Input:
7
1 3 1 3 2 1 2

Output:
2
1 5 2
3 7 4

Input:
4
2 1 3 2

Output:
1
2 1 3
*/
