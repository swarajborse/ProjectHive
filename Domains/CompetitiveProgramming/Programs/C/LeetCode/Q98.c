/*
===============================================================
98. Validate Binary Search Tree
===============================================================

Difficulty: Medium
Tags: Binary Tree, Recursion, Depth-First Search

---------------------------------------------------------------
Problem Statement:
---------------------------------------------------------------
Given the root of a binary tree, determine if it is a valid 
binary search tree (BST).

A valid BST is defined as follows:
1. The left subtree of a node contains only nodes with keys 
   strictly less than the node's key.
2. The right subtree of a node contains only nodes with keys 
   strictly greater than the node's key.
3. Both the left and right subtrees must also be binary search trees.

---------------------------------------------------------------
Example 1:
---------------------------------------------------------------
Input: root = [2,1,3]
Output: true

Explanation:
The tree is a valid BST:
    2
   / \
  1   3

---------------------------------------------------------------
Example 2:
---------------------------------------------------------------
Input: root = [5,1,4,null,null,3,6]
Output: false

Explanation:
The root node's value is 5 but its right child's value is 4, 
which violates the BST property.

---------------------------------------------------------------
Constraints:
---------------------------------------------------------------
- The number of nodes in the tree is in the range [1, 10^4].
- -2^31 <= Node.val <= 2^31 - 1
===============================================================
*/

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */


/**
 * Function: isValidBST
 * --------------------
 * Checks whether a binary tree is a valid binary search tree (BST).
 *
 * @param root : Pointer to the root of the tree.
 * @return     : true if the tree is a valid BST, false otherwise.
 *
 * Approach:
 * 1. For each node, check all nodes in the left subtree are strictly less.
 * 2. Check all nodes in the right subtree are strictly greater.
 * 3. Recursively validate left and right subtrees.
 */

bool isValidBST(struct TreeNode* root) {
    bool isValid = true;

    if (root != NULL) {
        // Step 1: Validate left subtree values are less than root
        isValid = isValidLeftSubTree(root, root->left);
        if (isValid == false)
            return false;

        // Step 2: Validate right subtree values are greater than root
        isValid = isValidRightSubTree(root, root->right);
        if (isValid == false)
            return false;

        // Step 3: Recursively validate left subtree
        isValid = isValidBST(root->left);
        if (isValid == false)
            return false;

        // Step 4: Recursively validate right subtree
        isValid = isValidBST(root->right);
    }

    return isValid;
}

/**
 * Function: isValidLeftSubTree
 * ----------------------------
 * Checks if all nodes in the left subtree are strictly less than root's value.
 */
 
bool isValidLeftSubTree(struct TreeNode* root, struct TreeNode* p) {
    bool isValid = true;

    if (p != NULL) {
        // If any node violates BST property, return false
        if (root->val <= p->val)
            return false;

        // Recursively check left child
        isValid = isValidLeftSubTree(root, p->left);
        if (isValid == false)
            return false;

        // Recursively check right child
        isValid = isValidLeftSubTree(root, p->right);
    }

    return isValid;
}

/**
 * Function: isValidRightSubTree
 * -----------------------------
 * Checks if all nodes in the right subtree are strictly greater than root's value.
 */
bool isValidRightSubTree(struct TreeNode* root, struct TreeNode* p) {
    bool isValid = true;

    if (p != NULL) {
        // If any node violates BST property, return false
        if (root->val >= p->val)
            return false;

        // Recursively check left child
        isValid = isValidRightSubTree(root, p->left);
        if (isValid == false)
            return false;

        // Recursively check right child
        isValid = isValidRightSubTree(root, p->right);
    }

    return isValid;
}
