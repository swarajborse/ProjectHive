"""
Problem: Count of Smaller Numbers After Self
Platform: LeetCode
Problem Code: 315
Difficulty: Hard
Link: https://leetcode.com/problems/count-of-smaller-numbers-after-self/

Problem Statement:
Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].

Example:
Input: nums = [5,2,6,1]
Output: [2,1,1,0]
Explanation:
To the right of 5 are 2 and 1.
To the right of 2 is 1.
To the right of 6 is 1.
To the right of 1 is 0.

Approach:
This problem can be solved by processing the array from right to left and using a data structure to efficiently query the count of numbers smaller than the current number. A Segment Tree (or a Fenwick Tree/BIT) is perfect for this.

1.  **Coordinate Compression:** The values in `nums` can be large or negative. We only care about their relative order. We create a "rank" for each unique number. For example, `[5, 2, 6, 1]` becomes `[2, 1, 3, 0]` (representing the 0-indexed sorted order).
2.  **Segment Tree:** We initialize a Segment Tree over the range of ranks (from 0 to `k-1`, where `k` is the number of unique elements). This tree will store the *count* of each number we have seen so far.
3.  **Right-to-Left Traversal:** We iterate through `nums` from right to left.
4.  For each number `nums[i]`:
    a.  Find its rank `r`.
    b.  Query the Segment Tree for the sum in the range `[0, r-1]`. This sum represents the count of numbers we have already processed (which are to the right of `i`) that have a rank smaller than `r` (i.e., are smaller than `nums[i]`).
    c.  Store this sum in our `result` array at index `i`.
    d.  Update the Segment Tree at position `r` by adding 1, marking that we have now seen this number.
5.  Return the `result` array.

Time Complexity: O(n log n) - O(n log n) for coordinate compression (sorting) and O(n log k) for n (query + update) operations, where k is the number of unique elements (k <= n).
Space Complexity: O(n) - For the result array, the mapping, and the Segment Tree.
Contributor: atharvaparab9160
"""

from typing import List

class SegmentTree:
    def __init__(self, size):
        self.tree = [0] * (4 * size)
        self.size = size

    # Updates the count of the element at 'index'
    def update(self, index, value, tree_index, l, r):
        if l == r:
            self.tree[tree_index] += value
            return
        
        mid = (l + r) // 2
        if index <= mid:
            self.update(index, value, 2 * tree_index + 1, l, mid)
        else:
            self.update(index, value, 2 * tree_index + 2, mid + 1, r)
        
        self.tree[tree_index] = self.tree[2 * tree_index + 1] + self.tree[2 * tree_index + 2]

    # Queries the sum of counts in the range [query_l, query_r]
    def query(self, query_l, query_r, tree_index, l, r):
        if query_l <= l and r <= query_r:
            return self.tree[tree_index]
        
        if query_l > r or query_r < l:
            return 0
        
        mid = (l + r) // 2
        left_sum = self.query(query_l, query_r, 2 * tree_index + 1, l, mid)
        right_sum = self.query(query_l, query_r, 2 * tree_index + 2, mid + 1, r)
        return left_sum + right_sum

class Solution:
    def countSmaller(self, nums: List[int]) -> List[int]:
        if not nums:
            return []
        
        n = len(nums)
        
        # Coordinate Compression
        sorted_unique_nums = sorted(list(set(nums)))
        rank_map = {num: i for i, num in enumerate(sorted_unique_nums)}
        num_ranks = len(rank_map)
        
        # Initialize Segment Tree
        seg_tree = SegmentTree(num_ranks)
        result = [0] * n
        
        # Traverse from right to left
        for i in range(n - 1, -1, -1):
            num = nums[i]
            rank = rank_map[num]
            
            # Query for counts of numbers with rank < current rank
            if rank > 0:
                count = seg_tree.query(0, rank - 1, 0, 0, num_ranks - 1)
                result[i] = count
            
            # Add current number to the tree
            seg_tree.update(rank, 1, 0, 0, num_ranks - 1)
            
        return result

if __name__ == "__main__":
    sol = Solution()

    # Test Case 1
    nums1 = [5, 2, 6, 1]
    print(f"Test Case 1: {sol.countSmaller(nums1)}") # Expected: [2, 1, 1, 0]

    # Test Case 2
    nums2 = [-1, -1]
    print(f"Test Case 2: {sol.countSmaller(nums2)}") # Expected: [0, 0]
    
    # Test Case 3
    nums3 = [2, 0, 1]
    print(f"Test Case 3: {sol.countSmaller(nums3)}") # Expected: [2, 0, 0]