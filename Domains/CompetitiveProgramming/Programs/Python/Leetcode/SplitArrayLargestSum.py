"""
Problem: Split Array Largest Sum
Platform: LeetCode
Problem Code: 410
Difficulty: Hard
Link: https://leetcode.com/problems/split-array-largest-sum/

Problem Statement:
Given an integer array `nums` and an integer `k`, split `nums` into `k` non-empty subarrays such that the largest sum of any subarray is minimized. Return the minimized largest sum.

Example:
Input: nums = [7,2,5,10,8], k = 2
Output: 18
Explanation:
There are four ways to split nums into 2 subarrays.
The best way is to split it into [7,2,5] and [10,8],
where the largest sum among the two subarrays is 18.

Approach:
This is a classic "Binary Search on the Answer" problem. The answer (the minimum largest sum) must lie within a specific range.
- The minimum possible value is `max(nums)` (if we split the array into `n` subarrays).
- The maximum possible value is `sum(nums)` (if we have only `k=1` subarray).

We can binary search for the "target sum" in this range `[max(nums), sum(nums)]`.

1.  Set `low = max(nums)` and `high = sum(nums)`.
2.  While `low <= high`:
    a.  Calculate `mid = (low + high) // 2`. This `mid` is our *hypothetical* maximum allowed sum for any subarray.
    b.  Write a helper function `canSplit(target_sum)` that checks if it's possible to split `nums` into `k` or fewer subarrays such that no subarray's sum exceeds `target_sum`.
    c.  `canSplit` works by greedily forming subarrays. It counts how many subarrays are *required*. If the required count is `<= k`, then `target_sum` is a valid possibility.
    d.  If `canSplit(mid)` is `True`, it means `mid` is a possible answer. We try for an even smaller sum: `ans = mid`, `high = mid - 1`.
    e.  If `canSplit(mid)` is `False`, it means `mid` is too small, and we must increase our allowed sum: `low = mid + 1`.
3.  Return the final `ans`.

Time Complexity: O(n log S) where n is the length of `nums` and S is the sum of `nums`.
Space Complexity: O(1)
Contributor: atharvaparab9160
"""

from typing import List

class Solution:
    def splitArray(self, nums: List[int], k: int) -> int:
        
        def canSplit(target_sum: int) -> bool:
            """Checks if we can split nums into k or fewer subarrays with max sum target_sum."""
            subarrays_needed = 1
            current_sum = 0
            for num in nums:
                if current_sum + num > target_sum:
                    # Start a new subarray
                    subarrays_needed += 1
                    current_sum = num
                else:
                    # Add to current subarray
                    current_sum += num
            
            return subarrays_needed <= k

        low = max(nums)  # A single number is the min possible largest sum
        high = sum(nums) # The whole array is the max possible largest sum
        ans = high
        
        while low <= high:
            mid = (low + high) // 2
            
            if canSplit(mid):
                # This 'mid' is a possible answer. Try for a smaller one.
                ans = mid
                high = mid - 1
            else:
                # This 'mid' is too small. Need a larger max sum.
                low = mid + 1
                
        return ans

if __name__ == "__main__":
    sol = Solution()

    # Test Case 1
    nums1 = [7, 2, 5, 10, 8]
    k1 = 2
    print(f"Test Case 1: {sol.splitArray(nums1, k1)}") # Expected: 18

    # Test Case 2
    nums2 = [1, 2, 3, 4, 5]
    k2 = 2
    print(f"Test Case 2: {sol.splitArray(nums2, k2)}") # Expected: 9
    
    # Test Case 3
    nums3 = [1, 4, 4]
    k3 = 3
    print(f"Test Case 3: {sol.splitArray(nums3, k3)}") # Expected: 4