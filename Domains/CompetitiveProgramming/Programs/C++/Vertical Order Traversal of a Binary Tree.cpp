/*
Problem: Vertical Order Traversal of a Binary Tree
Platform: LeetCode
Problem Code: 987
Difficulty: Medium
Link: https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/

Given the root of a binary tree, calculate the vertical order traversal of the binary tree.

For each node at position (row, col):
- The root is at (0, 0).
- Left child is at (row+1, col-1)
- Right child is at (row+1, col+1)

Return a list of non-empty reports of nodes for each column sorted from left to right. 
- Nodes in the same row and column are sorted by value.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: [[9],[3,15],[20],[7]]

Example 2:
Input: root = [1,2,3,4,5,6,7]
Output: [[4],[2],[1,5,6],[3],[7]]

Approach:
1. Perform a DFS traversal of the tree while recording (col, row, value) for each node.
2. Store all nodes in a vector of tuples: (col, row, value).
3. Sort the vector:
   - first by column (left to right)
   - then by row (top to bottom)
   - then by node value (ascending) if row and column are the same
4. Group the sorted nodes by column to get the final vertical order.

Time Complexity: O(n log n) — due to sorting all n nodes.
Space Complexity: O(n) — for storing node tuples.

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
    // DFS traversal storing (col, row, value)
    void traversal(TreeNode* root, vector<tuple<int,int,int>>& st, int col=0, int row=0){
        if(root == NULL) return;

        st.push_back({col, row, root->val});
        traversal(root->left, st, col-1, row+1);
        traversal(root->right, st, col+1, row+1);
    }

    vector<vector<int>> verticalTraversal(TreeNode* root) {
        vector<tuple<int,int,int>> st; // store (col, row, value)
        traversal(root, st);

        // Sort by column, then row, then value
        sort(st.begin(), st.end(), [](const auto& a, const auto& b) {
            if (get<0>(a) != get<0>(b)) return get<0>(a) < get<0>(b);
            if (get<1>(a) != get<1>(b)) return get<1>(a) < get<1>(b);
            return get<2>(a) < get<2>(b);
        });

        // Group by column
        vector<vector<int>> ans;
        vector<int> res;
        int k = get<0>(st[0]);
        for (int i = 0; i < st.size(); i++) {
            if (get<0>(st[i]) != k) {
                ans.push_back(res);
                res.clear();
                k = get<0>(st[i]);
            }
            res.push_back(get<2>(st[i]));
        }
        if (!res.empty()) ans.push_back(res);
        return ans;
    }
};
