"""
Problem: Sliding Window Maximum
Platform: LeetCode
Problem Code: 239
Difficulty: Hard
Link: https://leetcode.com/problems/sliding-window-maximum/

Problem Statement:
You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.

Example:
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

Approach:
A naive solution would be O(n*k). The optimal solution uses a Monotonic Deque (a double-ended queue that maintains elements in a specific order).
This deque will store *indices* of `nums` in decreasing order of their values.

1.  Initialize an empty deque `q` and a `result` list.
2.  Iterate through `nums` with index `i`.
3.  **Maintain Deque (Left Side):** Remove indices from the *left* of `q` that are now out of the window (i.e., `q[0] == i - k`).
4.  **Maintain Deque (Right Side):** While `q` is not empty and the number at the index at the end of the deque (`nums[q[-1]]`) is *smaller* than the current number `nums[i]`, pop from the *right* of `q`. This ensures the deque always holds indices in decreasing value order.
5.  **Add Current Index:** Append the current index `i` to the right of `q`.
6.  **Add to Result:** Once the window is full (i.e., `i >= k - 1`), the maximum element for this window is the number at the index at the *front* of the deque (`nums[q[0]]`). Append this to `result`.
7.  Return `result`.

Time Complexity: O(n) - Each element is added to and removed from the deque at most once.
Space Complexity: O(k) - The deque will store at most k indices.
Contributor: atharvaparab9160
"""

from typing import List
import collections

class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        result = []
        # q will store indices
        q = collections.deque()
        
        for i in range(len(nums)):
            # 1. Remove indices from the left that are out of the window
            if q and q[0] == i - k:
                q.popleft()
                
            # 2. Maintain monotonic decreasing property
            # Remove smaller numbers from the right
            while q and nums[q[-1]] < nums[i]:
                q.pop()
                
            # 3. Add the current index
            q.append(i)
            
            # 4. Add to result if window is full
            if i >= k - 1:
                result.append(nums[q[0]])
                
        return result

if __name__ == "__main__":
    sol = Solution()

    # Test Case 1
    nums1 = [1, 3, -1, -3, 5, 3, 6, 7]
    k1 = 3
    print(f"Test Case 1: {sol.maxSlidingWindow(nums1, k1)}") # Expected: [3, 3, 5, 5, 6, 7]

    # Test Case 2
    nums2 = [1]
    k2 = 1
    print(f"Test Case 2: {sol.maxSlidingWindow(nums2, k2)}") # Expected: [1]
    
    # Test Case 3
    nums3 = [1, -1]
    k3 = 1
    print(f"Test Case 3: {sol.maxSlidingWindow(nums3, k3)}") # Expected: [1, -1]
    
    # Test Case 4
    nums4 = [9, 11]
    k4 = 2
    print(f"Test Case 4: {sol.maxSlidingWindow(nums4, k4)}") # Expected: [11]