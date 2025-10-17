/*
Problem: Chef and Graph Queries - BFS Traversal
Platform: CodeChef
Problem Code: GRAPHCNT
Difficulty: Medium
Link: https://www.codechef.com/problems/GRAPHCNT

Problem Statement:
Given a graph, perform Breadth-First Search starting from a given source vertex.
BFS explores the graph level by level, visiting all neighbors before moving deeper.

Example:
Graph: 0 -- 1 -- 2
       |    |
       3 -- 4

BFS from 0: 0 -> 1 -> 3 -> 2 -> 4

Approach:
1. Use a queue to track vertices to visit
2. Use a visited array to avoid revisiting vertices
3. Start from source, mark as visited, add to queue
4. While queue not empty:
   - Dequeue vertex
   - Visit all unvisited neighbors
   - Mark them visited and enqueue

Time Complexity: O(V + E) where V = vertices, E = edges
Space Complexity: O(V) for queue and visited array

Contributor: SampleContributor
*/

#include <bits/stdc++.h>
using namespace std;

class Graph {
private:
    int vertices;
    vector<vector<int>> adjList;
    
public:
    // Constructor
    Graph(int v) {
        vertices = v;
        adjList.resize(v);
    }
    
    // Add edge (undirected graph)
    void addEdge(int u, int v) {
        adjList[u].push_back(v);
        adjList[v].push_back(u);
    }
    
    // Add directed edge
    void addDirectedEdge(int u, int v) {
        adjList[u].push_back(v);
    }
    
    // BFS traversal from a given source
    void BFS(int source) {
        // Visited array
        vector<bool> visited(vertices, false);
        
        // Queue for BFS
        queue<int> q;
        
        // Mark source as visited and enqueue
        visited[source] = true;
        q.push(source);
        
        cout << "BFS Traversal starting from vertex " << source << ": ";
        
        while (!q.empty()) {
            // Dequeue vertex
            int curr = q.front();
            q.pop();
            cout << curr << " ";
            
            // Visit all adjacent vertices
            for (int neighbor : adjList[curr]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
        
        cout << endl;
    }
    
    // BFS with level tracking
    void BFSWithLevels(int source) {
        vector<bool> visited(vertices, false);
        vector<int> level(vertices, -1);
        queue<int> q;
        
        visited[source] = true;
        level[source] = 0;
        q.push(source);
        
        cout << "BFS with levels from vertex " << source << ":" << endl;
        
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            
            cout << "Vertex " << curr << " at level " << level[curr] << endl;
            
            for (int neighbor : adjList[curr]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    level[neighbor] = level[curr] + 1;
                    q.push(neighbor);
                }
            }
        }
    }
    
    // Shortest path from source to destination (unweighted graph)
    int shortestPath(int source, int dest) {
        if (source == dest) return 0;
        
        vector<bool> visited(vertices, false);
        vector<int> distance(vertices, -1);
        queue<int> q;
        
        visited[source] = true;
        distance[source] = 0;
        q.push(source);
        
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            
            for (int neighbor : adjList[curr]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    distance[neighbor] = distance[curr] + 1;
                    q.push(neighbor);
                    
                    // Found destination
                    if (neighbor == dest) {
                        return distance[neighbor];
                    }
                }
            }
        }
        
        // Destination not reachable
        return -1;
    }
    
    // Find all connected components
    int countConnectedComponents() {
        vector<bool> visited(vertices, false);
        int count = 0;
        
        for (int i = 0; i < vertices; i++) {
            if (!visited[i]) {
                count++;
                // BFS from this vertex
                queue<int> q;
                visited[i] = true;
                q.push(i);
                
                while (!q.empty()) {
                    int curr = q.front();
                    q.pop();
                    
                    for (int neighbor : adjList[curr]) {
                        if (!visited[neighbor]) {
                            visited[neighbor] = true;
                            q.push(neighbor);
                        }
                    }
                }
            }
        }
        
        return count;
    }
    
    // Check if graph is bipartite (can be colored with 2 colors)
    bool isBipartite() {
        vector<int> color(vertices, -1);
        
        for (int i = 0; i < vertices; i++) {
            if (color[i] == -1) {
                queue<int> q;
                color[i] = 0;
                q.push(i);
                
                while (!q.empty()) {
                    int curr = q.front();
                    q.pop();
                    
                    for (int neighbor : adjList[curr]) {
                        if (color[neighbor] == -1) {
                            color[neighbor] = 1 - color[curr];
                            q.push(neighbor);
                        } else if (color[neighbor] == color[curr]) {
                            return false; // Not bipartite
                        }
                    }
                }
            }
        }
        
        return true;
    }
};

int main() {
    cout << "=== Test 1: Basic BFS ===" << endl;
    Graph g1(5);
    g1.addEdge(0, 1);
    g1.addEdge(0, 3);
    g1.addEdge(1, 2);
    g1.addEdge(1, 4);
    g1.addEdge(3, 4);
    g1.BFS(0);
    cout << endl;
    
    cout << "=== Test 2: BFS with Levels ===" << endl;
    g1.BFSWithLevels(0);
    cout << endl;
    
    cout << "=== Test 3: Shortest Path ===" << endl;
    Graph g2(6);
    g2.addEdge(0, 1);
    g2.addEdge(0, 2);
    g2.addEdge(1, 3);
    g2.addEdge(2, 3);
    g2.addEdge(3, 4);
    g2.addEdge(4, 5);
    
    int dist = g2.shortestPath(0, 5);
    cout << "Shortest path from 0 to 5: " << dist << endl;
    // Expected: 4
    
    dist = g2.shortestPath(0, 3);
    cout << "Shortest path from 0 to 3: " << dist << endl;
    // Expected: 2
    cout << endl;
    
    cout << "=== Test 4: Connected Components ===" << endl;
    Graph g3(7);
    g3.addEdge(0, 1);
    g3.addEdge(1, 2);
    g3.addEdge(3, 4);
    // Vertices 5 and 6 are isolated
    
    int components = g3.countConnectedComponents();
    cout << "Number of connected components: " << components << endl;
    // Expected: 4 (components: {0,1,2}, {3,4}, {5}, {6})
    cout << endl;
    
    cout << "=== Test 5: Bipartite Check ===" << endl;
    Graph g4(4);
    g4.addEdge(0, 1);
    g4.addEdge(1, 2);
    g4.addEdge(2, 3);
    g4.addEdge(3, 0);
    
    cout << "Graph is bipartite: " << (g4.isBipartite() ? "Yes" : "No") << endl;
    // Expected: Yes (can color alternately)
    
    Graph g5(3);
    g5.addEdge(0, 1);
    g5.addEdge(1, 2);
    g5.addEdge(2, 0);
    
    cout << "Triangle graph is bipartite: " << (g5.isBipartite() ? "Yes" : "No") << endl;
    // Expected: No (odd cycle)
    
    return 0;
}

/*
Output:
=== Test 1: Basic BFS ===
BFS Traversal starting from vertex 0: 0 1 3 2 4 

=== Test 2: BFS with Levels ===
BFS with levels from vertex 0:
Vertex 0 at level 0
Vertex 1 at level 1
Vertex 3 at level 1
Vertex 2 at level 2
Vertex 4 at level 2

=== Test 3: Shortest Path ===
Shortest path from 0 to 5: 4
Shortest path from 0 to 3: 2

=== Test 4: Connected Components ===
Number of connected components: 4

=== Test 5: Bipartite Check ===
Graph is bipartite: Yes
Triangle graph is bipartite: No

Key Learning Points:
1. BFS uses queue (FIFO) - explores level by level
2. Visited array prevents infinite loops
3. Perfect for shortest path in unweighted graphs
4. Can find connected components
5. Can check if graph is bipartite

BFS vs DFS:
- BFS: Queue, level-order, shortest path
- DFS: Stack/Recursion, depth-first, backtracking

Applications:
1. Shortest path in unweighted graphs
2. Level-order traversal
3. Finding connected components
4. Bipartite checking
5. Social network analysis (degrees of separation)
6. Web crawler
7. GPS navigation systems

Time Complexity Analysis:
- Adjacency List: O(V + E)
- Adjacency Matrix: O(V²)

Space Complexity:
- Queue: O(V) in worst case
- Visited: O(V)
- Total: O(V)

Common Problems Using BFS:
1. Shortest Path in Unweighted Graph
2. Word Ladder
3. Snake and Ladder Problem
4. Minimum Steps to Reach Target
5. Rotting Oranges
6. 01 Matrix
7. Binary Tree Level Order Traversal
*/
