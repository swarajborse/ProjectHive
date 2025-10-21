/*
Problem: Binary Tree Maximum Path Sum
Platform: LeetCode
Problem Code: 124
Difficulty: Hard
Link: https://leetcode.com/problems/binary-tree-maximum-path-sum/

A path in a binary tree is a sequence of nodes where each pair of adjacent nodes 
has an edge connecting them. A node can appear in the path at most once. The path 
does not necessarily need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.

Example 1:
Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 → 1 → 3, which gives a path sum of 6.

Example 2:
Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 → 20 → 7, which gives a path sum of 42.

Approach:
1. Use post-order DFS traversal to compute the maximum path sum passing through each node.
2. For every node, calculate:
   - `l_sum`: maximum sum path in the left subtree.
   - `r_sum`: maximum sum path in the right subtree.
3. The best path through the current node could include:
   - only the node value,
   - the node and left subtree,
   - the node and right subtree,
   - or both subtrees through the node.
4. Update a global `max_sum` with the maximum path found so far.
5. Return to the parent the maximum single-path sum (either left or right) plus current node value.

Time Complexity: O(n) — each node is visited once.
Space Complexity: O(h) — recursion stack, where h is the height of the tree.

Contributor: shwetakul2005
*/

#include <bits/stdc++.h>
using namespace std;

// Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    int calc_sum(TreeNode* root, int& max_sum) {
        if (root == NULL) return 0;

        int l_sum = calc_sum(root->left, max_sum);
        int r_sum = calc_sum(root->right, max_sum);

        int c_sum = root->val;
        if (l_sum > 0) c_sum += l_sum;
        if (r_sum > 0) c_sum += r_sum;

        // Update global maximum
        max_sum = max(max_sum, c_sum);

        // Return maximum path sum for parent usage
        return max(0, max(l_sum, r_sum)) + root->val;
    }

    int maxPathSum(TreeNode* root) {
        int max_sum = root->val;
        calc_sum(root, max_sum);
        return max_sum;
    }
};
