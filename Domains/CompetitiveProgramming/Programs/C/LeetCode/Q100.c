/*
===============================================================
100. Same Tree
===============================================================

Difficulty: Easy
Tags: Binary Tree, Depth-First Search, Recursion

Contributor: SOHAM-GADEKAR

---------------------------------------------------------------
Problem Statement:
---------------------------------------------------------------
Given the roots of two binary trees p and q, write a function
to check if they are the same or not.

Two binary trees are considered the same if they are
structurally identical and the nodes have the same value.

---------------------------------------------------------------
Example 1:
---------------------------------------------------------------
Input: p = [1,2,3], q = [1,2,3]
Output: true

---------------------------------------------------------------
Example 2:
---------------------------------------------------------------
Input: p = [1,2], q = [1,null,2]
Output: false

---------------------------------------------------------------
Example 3:
---------------------------------------------------------------
Input: p = [1,2,1], q = [1,1,2]
Output: false

---------------------------------------------------------------
Constraints:
---------------------------------------------------------------
- The number of nodes in both trees is in the range [0, 100].
- -10^4 <= Node.val <= 10^4
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
 * Function: isSameTree
 * --------------------
 * Checks whether two binary trees (p and q) are structurally identical
 * and have the same node values.
 *
 * @param p : Pointer to the root node of the first tree
 * @param q : Pointer to the root node of the second tree
 *
 * @return  : true if both trees are identical, false otherwise
 */


bool isSameTree(struct TreeNode* p, struct TreeNode* q) {

    // Assume both trees are the same initially
    bool isValid = true;

    // If both nodes are not NULL, compare their values
    if (p != NULL && q != NULL)
    {
        // Check if the current node values are equal
        if (p->val == q->val)
        {
            // Recursively check the left subtrees
            isValid = isSameTree(p->left, q->left);

            // If left subtrees are not the same, return false immediately
            if (isValid == false)
                return false;
            
            // Recursively check the right subtrees
            isValid = isSameTree(p->right, q->right);
        }
        else
        {
            // Node values differ → trees are not the same
            return false;
        }
    }
    // If one node is NULL and the other is not → trees differ
    else if (p != NULL || q != NULL)
    {
        return false;
    }

    // Return true only if all comparisons matched
    return isValid;
}

