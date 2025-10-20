/*
Problem: Jump Game
Platform: LeetCode
Problem Code/Number: 55
Difficulty: Medium
Link: https://leetcode.com/problems/jump-game/

Problem Statement:
You are given an integer array nums. You are initially positioned at the array's first index, 
and each element in the array represents your maximum jump length at that position.
Return true if you can reach the last index, or false otherwise.

Approach:
Use a greedy approach to track the farthest index you can reach:
- Initialize a variable 'farthest' to 0.
- Traverse the array:
  - If the current index i is greater than 'farthest', return false (stuck, cannot move forward).
  - Update 'farthest' as max(farthest, i + nums[i]).
  - If 'farthest' >= last index, return true.
- If the loop ends, return true.

Time Complexity: O(n)
Space Complexity: O(1)

Contributor: alisha1510
*/

#include <iostream>
#include <stack>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    bool canJump(vector<int>& nums) {
        int farthest = 0;
        int n = nums.size();
        
        for (int i = 0; i < n; i++) {
            if (i > farthest) return false;
            farthest = max(farthest, i + nums[i]);
            if (farthest >= n - 1) return true;
        }
        
        return true;
    }
};
