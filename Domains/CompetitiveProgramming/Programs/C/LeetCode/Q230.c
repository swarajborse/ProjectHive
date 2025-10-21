/*
===============================================================
230. Kth Smallest Element in a BST
===============================================================

Difficulty: Medium
Tags: Binary Search Tree, Depth-First Search, Tree, Binary Tree

Contributor: SOHAM-GADEKAR

---------------------------------------------------------------
Problem Statement:
---------------------------------------------------------------
Given the root of a binary search tree (BST) and an integer k,
return the kth smallest value (1-indexed) among all the values
of the nodes in the tree.

---------------------------------------------------------------
Example 1:
---------------------------------------------------------------
Input: root = [3,1,4,null,2], k = 1
Output: 1

Explanation:
The in-order traversal of the BST is [1, 2, 3, 4].
The 1st smallest element is 1.

---------------------------------------------------------------
Example 2:
---------------------------------------------------------------
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3

Explanation:
The in-order traversal of the BST is [1, 2, 3, 4, 5, 6].
The 3rd smallest element is 3.

---------------------------------------------------------------
Constraints:
---------------------------------------------------------------
- The number of nodes in the tree is n.
- 1 <= k <= n <= 10^4
- 0 <= Node.val <= 10^4

---------------------------------------------------------------
Hint:
---------------------------------------------------------------
- The in-order traversal of a BST gives the elements
  in sorted order.
- You can stop traversing early once you reach the kth element.
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
 * Function: inorder
 * -----------------
 * Performs an in-order traversal of the BST to find the kth smallest element.
 * 
 * @param p     : Pointer to the current node in the BST.
 * @param k     : The target position (kth smallest element to find).
 * @param temp  : Temporary variable to store the current result.
 * 
 * @return      : The kth smallest value if found, otherwise returns temp.
 */

 
int inorder(struct TreeNode* p, int k, int temp)
{
    // Base case: if the current node is NULL, simply return temp
    if (p != NULL)
    {
        // Traverse the left subtree first (smallest elements come first in BST)
        temp = inorder(p->left, k - 1, temp);

        // If k reaches 0, we have found the kth smallest node
        if (k == 0)
        {
            return p->val;
        }

        // Continue traversal in the right subtree
        temp = inorder(p->right, k - 1, temp);
    }

    // Return the temporary result if kth element is not found yet
    return temp;
}
