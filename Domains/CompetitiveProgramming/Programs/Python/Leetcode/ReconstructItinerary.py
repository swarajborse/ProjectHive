"""
Problem: Reconstruct Itinerary
Platform: LeetCode
Problem Code: 332
Difficulty: Hard
Link: https://leetcode.com/problems/reconstruct-itinerary/

Problem Statement:
You are given a list of airline `tickets` where `tickets[i] = [fromi, toi]`.
Reconstruct the itinerary in order and return it. All tickets must be used exactly once.
If there are multiple valid itineraries, return the one that is lexicographically smallest.
You may assume all tickets form at least one valid itinerary and all begin from "JFK".

Example:
Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]

Approach:
This is an Eulerian Path problem. We need to find a path that visits every edge (ticket) exactly once. Since we need the lexicographically smallest result, we should always try to visit the smallest airport code first.

1.  **Build Graph:** Create an adjacency list (e.g., a `defaultdict(list)`) where each key is an `origin` and the value is a list of `destinations`.
2.  **Sort Destinations:** For each `origin`, sort its list of destinations lexicographically. This is crucial for finding the smallest itinerary.
3.  **Post-order DFS (Hierholzer's Algorithm):**
    a.  We maintain a `path` (the result).
    b.  Start a DFS from "JFK".
    c.  In the `dfs(airport)` function:
        i.   Look up the destinations from `airport`.
        ii.  While there are destinations left:
             - Pop the *first* (lexicographically smallest) destination from the list.
             - Recursively call `dfs(destination)`.
        iii. *After* the loop finishes (meaning we've used all tickets from `airport` and hit a dead end), add `airport` to the `path`.
4.  **Reverse Result:** Because we add airports in post-order, the final `path` will be in reverse. We return `path[::-1]`.

Time Complexity: O(E log E) where E is the number of tickets. O(E) for building the graph, O(E log E) or O(E log(D_max)) for sorting the adjacency lists (D_max is max out-degree), and O(E) for the DFS (each edge is visited once).
Space Complexity: O(E) for the graph and the recursion stack.
Contributor: atharvaparab9160
"""

from typing import List
import collections

class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        # Build the graph
        graph = collections.defaultdict(list)
        for origin, dest in tickets:
            graph[origin].append(dest)
        
        # Sort destinations lexicographically
        for origin in graph:
            graph[origin].sort()
            
        path = []
        
        def dfs(airport):
            # Visit all destinations
            while graph[airport]:
                # Pop the smallest destination to visit it
                next_dest = graph[airport].pop(0)
                dfs(next_dest)
            
            # Add the airport to path after all its children are visited
            # This is post-order traversal
            path.append(airport)
            
        dfs("JFK")
        
        # The path is built in reverse, so we return the reversed path
        return path[::-1]

if __name__ == "__main__":
    sol = Solution()

    # Test Case 1
    tickets1 = [["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]
    print(f"Test Case 1: {sol.findItinerary(tickets1)}")
    # Expected: ['JFK', 'MUC', 'LHR', 'SFO', 'SJC']

    # Test Case 2
    tickets2 = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
    print(f"Test Case 2: {sol.findItinerary(tickets2)}")
    # Expected: ['JFK', 'ATL', 'JFK', 'SFO', 'ATL', 'SFO']
    
    # Test Case 3 (re-run to show sorting matters)
    sol3 = Solution()
    tickets3 = [["JFK", "KUL"], ["JFK", "NRT"], ["NRT", "JFK"]]
    print(f"Test Case 3: {sol3.findItinerary(tickets3)}")
    # Expected: ['JFK', 'NRT', 'JFK', 'KUL']