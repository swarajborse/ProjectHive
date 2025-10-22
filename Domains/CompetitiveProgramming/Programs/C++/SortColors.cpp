/*
Probelm: Sort Colors
Platform: Leetcode
problem Code: 75
Difficulty: Medium
Link: https://leetcode.com/problems/sort-colors/description/

Problem Statement:
Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

 

Example 1:

Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
Example 2:

Input: nums = [2,0,1]
Output: [0,1,2]
 

Constraints:

n == nums.length
1 <= n <= 300
nums[i] is either 0, 1, or 2.

Approach:
1. applied a basic sorting algorithm

Time Complexity: O(n^2)
Space Complexity: O(1)

Contributor: SamaKool
*/

class Solution {
public:
    void sortColors(vector<int>& nums) {
        int n = nums.size();
        for (int i = n-1; i >= 1; i--){
	        int did_swap = 0;
            for (int j = 0; j <= i-1; j++){
                if(nums[j] > nums[j+1]){
                    int temp = nums[j];
                    nums[j] = nums[j+1];
                    nums[j+1] = temp;
                    did_swap += 1;
                }
        }
        if(did_swap == 0){
	        break;
        }
    }
    }
};