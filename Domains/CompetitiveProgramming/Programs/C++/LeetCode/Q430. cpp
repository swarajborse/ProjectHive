/*
===============================================================
430. Flatten a Multilevel Doubly Linked List
===============================================================

Difficulty: Medium
Tags: Linked List, Depth-First Search, Doubly Linked List

---------------------------------------------------------------
Problem Statement:
---------------------------------------------------------------
You are given a doubly linked list that contains nodes with:
- a 'next' pointer,
- a 'prev' pointer,
- and an additional 'child' pointer.

The 'child' pointer may or may not point to another doubly linked list.
These child lists may have their own children, and so on, creating a 
multilevel data structure.

Given the head of the first level of the list, flatten the list so that 
all the nodes appear in a single-level, doubly linked list.

Let 'curr' be a node with a child list. 
The nodes in the child list should appear *after curr* and *before curr->next*
in the flattened list.

Return the head of the flattened list. 
All 'child' pointers in the flattened list must be set to NULL.

---------------------------------------------------------------
Example 1:
---------------------------------------------------------------
Input:  head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
Output: [1,2,3,7,8,11,12,9,10,4,5,6]

Explanation:
The multilevel linked list in the input is shown below:
1---2---3---4---5---6--NULL
        |
        7---8---9---10--NULL
            |
            11--12--NULL

After flattening, the list becomes:
1---2---3---7---8---11---12---9---10---4---5---6--NULL

---------------------------------------------------------------
Example 2:
---------------------------------------------------------------
Input:  head = [1,2,null,3]
Output: [1,3,2]

Explanation:
The multilevel linked list is:
1---2--NULL
|
3--NULL
After flattening, it becomes:
1---3---2--NULL

---------------------------------------------------------------
Example 3:
---------------------------------------------------------------
Input:  head = []
Output: []

Explanation:
The list may be empty.

---------------------------------------------------------------
Constraints:
---------------------------------------------------------------
- The number of nodes will not exceed 1000.
- 1 <= Node.val <= 10^5

---------------------------------------------------------------
Representation Notes:
---------------------------------------------------------------
The multilevel linked list from Example 1 is represented as:
Level 1: [1,2,3,4,5,6,null]
Level 2: [7,8,9,10,null]
Level 3: [11,12,null]

Merged representation (serialization):
[1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
===============================================================
*/

/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* prev;
    Node* next;
    Node* child;
};
*/

class Q430{
public:
    Node* flatten(Node* head) {
        // Pointer to traverse the linked list
        Node* curr = head;

        // Traverse through all nodes in the list
        while (curr) {

            // If the current node has a child, we need to flatten that child list
            if (curr->child) {

                // Step 1: Find the tail of the child list
                Node* temp = curr->child;
                while (temp->next) 
                    temp = temp->next;

                // Step 2: Connect the tail of the child list to curr->next
                temp->next = curr->next;

                // If there is a next node, update its prev pointer
                if (curr->next) 
                    curr->next->prev = temp;

                // Step 3: Connect the child list to the main list
                curr->next = curr->child;
                curr->child->prev = curr;

                // Step 4: Remove the child pointer (since it's now flattened)
                curr->child = nullptr;
            }

            // Move to the next node in the list
            curr = curr->next;
        }

        // Return the head of the flattened list
        return head;
    }
};
