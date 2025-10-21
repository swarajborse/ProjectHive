/*
Problem: Merge k Sorted Lists
Platform: LeetCode
Problem Code: 23
Difficulty: Hard
Link: https://leetcode.com/problems/merge-k-sorted-lists/

You are given an array of k linked-lists, each linked-list is sorted in ascending order.
Merge all the linked-lists into one sorted linked-list and return it.

Example 1:
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]

Example 2:
Input: lists = []
Output: []

Example 3:
Input: lists = [[]]
Output: []

Approach:
1. Traverse through each linked list and push all node values into a min-heap (priority queue).
2. Extract the smallest element one by one from the heap to form a new sorted linked list.
3. This approach ensures a sorted result, though it uses extra memory for all node values.

Time Complexity: O(N log N) where N is the total number of nodes (since we push and pop each node in the heap).
Space Complexity: O(N) for storing all values in the priority queue.

Contributor: shwetakul2005
*/

#include <bits/stdc++.h>
using namespace std;

// Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        int n = lists.size();
        priority_queue<int, vector<int>, greater<int>> pq; // min-heap

        // Step 1: Push all node values into heap
        for (int i = 0; i < n; i++) {
            ListNode* temp = lists[i];
            while (temp != nullptr) {
                pq.push(temp->val);
                temp = temp->next;
            }
        }

        // Step 2: Handle empty case
        if (pq.empty()) return nullptr;

        // Step 3: Construct the new sorted list
        ListNode* res = new ListNode(pq.top());
        pq.pop();
        ListNode* temp = res;

        while (!pq.empty()) {
            temp->next = new ListNode(pq.top());
            temp = temp->next;
            pq.pop();
        }

        return res;
    }
};
