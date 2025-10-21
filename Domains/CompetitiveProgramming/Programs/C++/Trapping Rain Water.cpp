/*
Problem: Trapping Rain Water
Platform: LeetCode
Problem Code: 42
Difficulty: Hard
Link: https://leetcode.com/problems/trapping-rain-water/

Given n non-negative integers representing an elevation map where the width of each bar is 1, 
compute how much water it can trap after raining.

Example 1:
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. 
In this case, 6 units of rain water (blue section) are being trapped.

Example 2:
Input: height = [4,2,0,3,2,5]
Output: 9

Approach:
1. Use two pointers — one from the left and one from the right.
2. Maintain two variables `leftMax` and `rightMax` to store the maximum height encountered so far from each side.
3. Move the pointer with the smaller height inward.
   - If the current height is less than the corresponding max, water can be trapped = max - height.
   - Otherwise, update the max height.
4. Continue until both pointers meet.
5. This approach eliminates the need for extra arrays and efficiently computes the trapped water.

Time Complexity: O(n)
Space Complexity: O(1)

Contributor: shwetakul2005
*/

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        if (n == 0) return 0;

        int left = 0, right = n - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                // Update left max
                if (height[left] >= leftMax)
                    leftMax = height[left];
                else
                    water += leftMax - height[left];
                left++;
            } 
            else {
                // Update right max
                if (height[right] >= rightMax)
                    rightMax = height[right];
                else
                    water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
};
