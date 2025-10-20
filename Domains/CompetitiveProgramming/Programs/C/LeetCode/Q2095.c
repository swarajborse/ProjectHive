/*
===============================================================
2095. Delete the Middle Node of a Linked List
===============================================================

Difficulty: Medium
Tags: Linked List, Two Pointers

Contributor: SOHAM-GADEKAR

---------------------------------------------------------------
Problem Statement:
---------------------------------------------------------------
You are given the head of a linked list. 
Delete the middle node, and return the head of the modified linked list.

The middle node of a linked list of size n is the ⌊n / 2⌋th node 
(from the start, using 0-based indexing), where ⌊x⌋ denotes the 
largest integer less than or equal to x.

For n = 1, 2, 3, 4, and 5, the middle nodes are indices:
0, 1, 1, 2, and 2 respectively.

---------------------------------------------------------------
Example 1:
---------------------------------------------------------------
Input: head = [1,3,4,7,1,2,6]
Output: [1,3,4,1,2,6]

Explanation:
The linked list has 7 nodes. The middle node is at index 3 
(value = 7). After removing it, the new list is [1,3,4,1,2,6].

---------------------------------------------------------------
Example 2:
---------------------------------------------------------------
Input: head = [1,2,3,4]
Output: [1,2,4]

Explanation:
The middle node (index 2, value = 3) is removed, 
leaving [1,2,4].

---------------------------------------------------------------
Example 3:
---------------------------------------------------------------
Input: head = [2,1]
Output: [2]

Explanation:
For n = 2, the middle node is index 1 (value = 1).
After removing it, only [2] remains.

---------------------------------------------------------------
Constraints:
---------------------------------------------------------------
- The number of nodes in the list is in the range [1, 10^5].
- 1 <= Node.val <= 10^5
===============================================================
*/

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */

struct ListNode* deleteMiddle(struct ListNode* head) {
    struct ListNode* p = head;  // Pointer for traversal
    struct ListNode* q;         // Temporary pointer for the node to delete

    // Case 1: If there is only one node in the list
    if (p->next == NULL) {
        head = NULL;   // The list becomes empty
        free(p);       // Free the single node
    }

    // Case 2: If there are only two or three nodes
    else if (p->next->next == NULL || p->next->next->next == NULL) {
        q = p->next;   // q points to the second node

        if (q->next == NULL) {
            // Case: List has exactly two nodes → remove the second one
            p->next = NULL;
        } else {
            // Case: List has three nodes → remove the middle one
            p->next = q->next;
        }
    }

    // Case 3: For lists having more than three nodes
    else {
        int count = 0, i = 1;

        // Step 1: Count total number of nodes
        for (; p != NULL; p = p->next, ++count);

        // Step 2: Move p to the node just before the middle node
        for (p = head; i < count / 2; p = p->next, i++);

        // Step 3: Delete the middle node
        q = p->next;           // q points to the middle node
        p->next = q->next;     // Bypass the middle node
    }

    // Free memory of the deleted node
    free(q);

    // Return the updated head pointer
    return head;
}
