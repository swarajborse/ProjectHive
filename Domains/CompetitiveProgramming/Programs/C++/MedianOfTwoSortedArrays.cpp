/*
Problem: Median of Two Sorted Arrays
Platform: LeetCode
Problem Code: 4
Difficulty: Hard
Link: https://leetcode.com/problems/median-of-two-sorted-arrays/description/

Problem Statement:
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 
Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106

Approach:
1. Made a vector to store all values
2. Looped through both arrays simultaneously, and pushed elements in ascending order into the vector.
3. If there exists "a" median element, then return it, else return average of the 2 medians.

Time Complexity: O(m+n)
Space Complexity: O(n)

Contributor: SamaKool
*/
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size();
        int n = nums2.size();
        vector<int> lol;
        int j = 0;
        int i = 0;
        while (i < m && j < n) {
            if (nums1[i] < nums2[j]) {
                lol.push_back(nums1[i]);
                i++;
            } else {
                lol.push_back(nums2[j]);
                j++;
            }
        }
        while (i < m) {
            lol.push_back(nums1[i]);
            i++;
        }
        while (j < n) {
            lol.push_back(nums2[j]);
            j++;
        }
        if((m+n)%2 != 0){
            return lol[((m+n-1)/2)];
        }
        else{
            return (lol[(m+n)/2] + lol[((m+n)/2) - 1]) / 2.0;
        }
    }
};