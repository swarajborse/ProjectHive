/*
Problem: Split Array Largest Sum
Platform: LeetCode
Problem Code: 410
Difficulty: Medium
Link: https://leetcode.com/problems/split-array-largest-sum/

Given an array `arr` of non-negative integers and an integer `m`, split the array into `m` non-empty continuous subarrays. 
Write an algorithm to minimize the largest sum among these `m` subarrays.

Example 1:
Input: arr = [7,2,5,10,8], m = 2
Output: 18
Explanation: There are four ways to split arr into two subarrays. The best way is [7,2,5] and [10,8], 
which has the largest sum = max(7+2+5,10+8) = 18.

Example 2:
Input: arr = [1,2,3,4,5], m = 2
Output: 9

Approach:
1. Use binary search on the range of possible sums: 
   - `low = max element of array` (minimum possible largest sum)
   - `high = sum of array` (maximum possible largest sum)
2. For a candidate sum `mid`, check if it is possible to split the array into ≤ m subarrays such that no subarray sum exceeds `mid`.
3. If possible, try a smaller `mid` (move `high`), else increase `mid` (move `low`).
4. Continue until `low > high`, and the minimum feasible `mid` is the answer.

Time Complexity: O(n log(sum-max)), where sum-max = total sum of array minus max element.
Space Complexity: O(1) extra space.

Contributor: shwetakul2005
*/

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Check if we can split array into ≤ m subarrays with max sum ≤ mid
    bool ispos(vector<int>& v, int mid, int m) {
        int n = v.size();
        int s = 0, cnt = 0;

        for (int i = 0; i < n; i++) {
            s += v[i];
            if (s == mid) {
                cnt++;
                s = 0;
            } 
            else if (s > mid) {
                cnt++;
                s = v[i];
                if (i == n - 1) {
                    cnt++;
                }
            } 
            else if (s < mid && i == n - 1) {
                cnt++;
            }
        }

        return cnt <= m;
    }

    int splitArray(vector<int>& arr, int m) {
        int n = arr.size();
        if (n < m) return -1;

        int tot_sum = 0, maxi = INT_MIN;
        for (int i = 0; i < n; i++) {
            tot_sum += arr[i];
            maxi = max(maxi, arr[i]);
        }

        int low = maxi, high = tot_sum;
        int ans = tot_sum;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (ispos(arr, mid, m)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }
};