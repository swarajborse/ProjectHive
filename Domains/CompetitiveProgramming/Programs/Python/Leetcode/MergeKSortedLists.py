"""
Problem: Merge k Sorted Lists
Platform: LeetCode
Problem Code: 23
Difficulty: Hard
Link: https://leetcode.com/problems/merge-k-sorted-lists/

Problem Statement:
You are given an array of k linked-lists `lists`, each linked-list is sorted in ascending order.
Merge all the linked-lists into one sorted linked-list and return it.

Example:
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
Merging them into one sorted list:
1->1->2->3->4->4->5->6

Approach:
The most efficient approach uses a min-heap (priority queue) to keep track of the smallest node among all `k` lists.

1. We need to define the `ListNode` class and, importantly, add a less-than comparison method (`__lt__`) so the `heapq` module can compare `ListNode` objects directly based on their `val`.
2. Create a min-heap.
3. Iterate through the input `lists`. For each non-empty list, push its head node onto the min-heap.
4. Create a `dummy` node to act as the head of the new merged list, and a `current` pointer to build the list.
5. While the min-heap is not empty:
   - Pop the smallest node (`smallest_node`) from the heap.
   - Append it to the merged list: `current.next = smallest_node`.
   - Move the `current` pointer: `current = current.next`.
   - If `smallest_node` has a next element (`smallest_node.next`), push that next element onto the heap.
6. Return `dummy.next`, which is the true head of the merged sorted list.

Time Complexity: O(N log k) where N is the total number of nodes and k is the number of lists.
Space Complexity: O(k) for storing at most k nodes in the min-heap.
Contributor: atharvaparab9160
"""

import heapq
from typing import List, Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    
    def __lt__(self, other):
        # This allows heapq to compare ListNode objects
        return self.val < other.val
    
    def __repr__(self):
        # Helper for printing
        return f"ListNode({self.val})"

class Solution:
    ####################
    # MAIN LOGIC OF CODE
    #################### 
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        min_heap = []
        
        # Add the head of each non-empty list to the heap
        for head in lists:
            if head:
                heapq.heappush(min_heap, head)
                
        # Dummy head for the result list
        dummy = ListNode()
        current = dummy
        
        while min_heap:
            # Pop the smallest node
            smallest_node = heapq.heappop(min_heap)
            
            # Append it to the result list
            current.next = smallest_node
            current = current.next
            
            # If this node has a next element, add it to the heap
            if smallest_node.next:
                heapq.heappush(min_heap, smallest_node.next)
                
        return dummy.next
    


    
##############################
# Helper functions for testing
##############################
def create_list(arr: List[int]) -> Optional[ListNode]:
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

def print_list(node: Optional[ListNode]):
    result = []
    while node:
        result.append(str(node.val))
        node = node.next
    print(" -> ".join(result))

if __name__ == "__main__":
    sol = Solution()

    # Test Case 1
    l1 = create_list([1, 4, 5])
    l2 = create_list([1, 3, 4])
    l3 = create_list([2, 6])
    merged1 = sol.mergeKLists([l1, l2, l3])
    print("Test Case 1:")
    print_list(merged1) # Expected: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6

    # Test Case 2
    l4 = create_list([])
    l5 = create_list([1])
    merged2 = sol.mergeKLists([l4, l5])
    print("Test Case 2:")
    print_list(merged2) # Expected: 1
    
    # Test Case 3
    merged3 = sol.mergeKLists([])
    print("Test Case 3:")
    print_list(merged3) # Expected: (empty)