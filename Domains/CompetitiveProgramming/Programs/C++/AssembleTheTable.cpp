/*
Problem: Собери стол (Assemble the table)
Platform: Codeforces
Problem Code: 648B
Difficulty: Easy (800 rated)
Link: https://codeforces.com/problemset/problem/648/B

Vasya bought a table with n legs. Each leg consists of two parts that connect to each other. Each part can have any positive length, but it is guaranteed that it is possible to compose n legs of the same length from all 2n parts . When composing a leg , any two parts can be connected to each other. Initially, all the table legs are disassembled, and you are given the lengths of the 2n parts in any order.

Help Vasya assemble all the table legs so that they are all the same length by pairing the given 2n pieces correctly. Each leg must be made of exactly two pieces; using only one piece as a leg is not allowed.

Input data
The first line contains the number n ( 1 ≤  n  ≤ 1000 ) — the number of legs on the table bought by Vasya.

The second line contains a sequence of 2 n positive integers a 1 ,  a 2 , ...,  a 2 n ( 1 ≤  a i  ≤ 100 000 ) — the lengths of the parts of the table legs in random order.

Output data
Print n lines of two integers each—the lengths of the leg pieces that need to be joined together. It is guaranteed that it is always possible to assemble n legs of the same length. If there are multiple answers, you are allowed to print any of them.

Examples:
Input data
3 
1 3 2 4 5 3
Output data
1 5 
2 4 
3 3

Input data
3 
1 1 1 2 2 2
Output data
1 2 
2 1 
1 2

Approach:
1. Sorted the given array.
2. returned pairs of {ith, (size - i)th}, where i < size/2.

Time Complexity: O(n log n)
Space Complexity: O(n)

Contributor: SamaKool
*/

#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm>
using namespace std;

class Solution
{
public:
    int n;
    vector<int> sizes;
};
int main()
{
    Solution lol;
    cin >> lol.n;
    lol.sizes.reserve(2*lol.n);
    copy_n(istream_iterator<int>(cin), 2*lol.n, back_inserter(lol.sizes));
    sort(lol.sizes.begin(), lol.sizes.end());
    for(int i = 0; i < lol.n; i++){
        cout << lol.sizes[i] << " " << lol.sizes[2*lol.n - i - 1] << endl;
    }
    return 0;
}