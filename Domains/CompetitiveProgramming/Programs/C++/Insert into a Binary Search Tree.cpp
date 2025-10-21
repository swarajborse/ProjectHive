/*
Problem: Insert into a Binary Search Tree
Platform: LeetCode
Problem Code: 701
Difficulty: Medium
Link: https://leetcode.com/problems/insert-into-a-binary-search-tree/

Given the root of a binary search tree (BST) and a value to insert into the tree, 
insert the value into the BST. Return the root of the BST after the insertion. 
It is guaranteed that the new value does not exist in the original BST.

Notice that there may exist multiple valid ways for the insertion, as long as the tree 
remains a BST after insertion. You can return any of them.

Example 1:
Input: root = [4,2,7,1,3], val = 5
Output: [4,2,7,1,3,5]

Example 2:
Input: root = [40,20,60,10,30,50,70], val = 25
Output: [40,20,60,10,30,50,70,null,null,25]

Approach:
1. Recursively traverse the tree to find the correct position for the new value.
2. If the value is less than the current node, go to the left subtree.
3. If the value is greater, go to the right subtree.
4. When a NULL position is found, create a new node with the given value.
5. Return the root of the updated BST.

Time Complexity: O(h), where h is the height of the BST.
Space Complexity: O(h) due to recursion stack.

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
    TreeNode* insertIntoBST(TreeNode* root, int val) {
        if (root == NULL) return new TreeNode(val);
        if (val < root->val) root->left = insertIntoBST(root->left, val);
        else root->right = insertIntoBST(root->right, val);
        return root;
    }
};
