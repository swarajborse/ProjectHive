"""
Problem: Binary Tree Maximum Path Sum
Platform: LeetCode
Problem Code: 124
Difficulty: Hard
Link: https://leetcode.com/problems/binary-tree-maximum-path-sum/

Problem Statement:
A "path" is a sequence of nodes from some starting node to any node in the tree along parent-child connections. The path must contain at least one node and does not need to pass through the root.
Given the `root` of a binary tree, return the maximum path sum.

Example:
Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a sum of 2 + 1 + 3 = 6.

Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a sum of 15 + 20 + 7 = 42.

Approach:
This problem requires a post-order Depth First Search (DFS). For any given node, a "path" can either:
1.  Pass *through* the node (using its left and right children).
2.  *End* at the node (coming from either its left or right child, but not both).

We need a helper function that does two things:
1.  **Returns** the maximum path sum *as a branch* (i.e., path ending at the current node, which can be extended by its parent).
2.  **Updates** a global `max_sum` variable if the path *through* the current node is the new maximum.

Helper function `dfs(node)`:
-   Base case: `if not node: return 0`.
-   Recursively get `left_branch = max(dfs(node.left), 0)`. We use `max(..., 0)` because we don't want to include negative paths.
-   Recursively get `right_branch = max(dfs(node.right), 0)`.
-   **Update global max:** The path *through* this node is `node.val + left_branch + right_branch`. We check this against our `self.max_sum`.
-   **Return branch value:** The path that can be extended upwards is `node.val + max(left_branch, right_branch)`.
-   The final answer is the global `self.max_sum`.

Time Complexity: O(n) - We visit every node exactly once.
Space Complexity: O(h) - For the recursion stack, where h is the height of the tree.
Contributor: atharvaparab9160
"""

from typing import Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def __init__(self):
        # Use an instance variable to store the global maximum
        self.max_sum = float('-inf')

    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        self.dfs(root)
        return self.max_sum

    def dfs(self, node: Optional[TreeNode]) -> int:
        """
        Returns the max path sum *as a branch* ending at 'node'.
        Updates self.max_sum with the max path sum *through* 'node'.
        """
        if not node:
            return 0
        
        # 1. Recursively get max path sum from left and right children
        # Use max(..., 0) to ignore negative paths
        left_branch_sum = max(self.dfs(node.left), 0)
        right_branch_sum = max(self.dfs(node.right), 0)
        
        # 2. Update the global maximum
        # This is the sum of the path *passing through* the current node
        current_path_sum = node.val + left_branch_sum + right_branch_sum
        self.max_sum = max(self.max_sum, current_path_sum)
        
        # 3. Return the max path sum *as a branch*
        # This is the path that a parent node can use
        return node.val + max(left_branch_sum, right_branch_sum)

# Helper function to create a tree for testing
def create_tree(arr, index=0):
    if index >= len(arr) or arr[index] is None:
        return None
    
    root = TreeNode(arr[index])
    root.left = create_tree(arr, 2 * index + 1)
    root.right = create_tree(arr, 2 * index + 2)
    return root

if __name__ == "__main__":
    # Test Case 1
    sol1 = Solution()
    root1 = create_tree([1, 2, 3])
    print(f"Test Case 1: {sol1.maxPathSum(root1)}") # Expected: 6

    # Test Case 2
    sol2 = Solution()
    root2 = create_tree([-10, 9, 20, None, None, 15, 7])
    print(f"Test Case 2: {sol2.maxPathSum(root2)}") # Expected: 42
    
    # Test Case 3
    sol3 = Solution()
    root3 = create_tree([5, 4, 8, 11, None, 13, 4, 7, 2, None, None, None, 1])
    print(f"Test Case 3: {sol3.maxPathSum(root3)}") # Expected: 48