/*
Problem: Binary Search
Platform: CodeChef
Problem Code: BINSEARCH
Difficulty: Easy
Link: https://www.codechef.com/problems/BINSEARCH

Problem Statement:
Given a sorted array arr[] of n elements, write a function to search a given 
element x in arr[]. Return the index if found, otherwise return -1.

Example:
Input: arr[] = {2, 3, 4, 10, 40}, x = 10
Output: 3
Explanation: Element 10 is present at index 3

Approach:
1. Binary search works on sorted arrays
2. Compare middle element with target
3. If equal, return index
4. If target is smaller, search left half
5. If target is larger, search right half
6. Repeat until found or search space is empty

Time Complexity: O(log n) - Halving search space each iteration
Space Complexity: O(1) - Iterative approach uses constant space

Contributor: SampleContributor
*/

#include <bits/stdc++.h>
using namespace std;

// Iterative Binary Search
int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        // Calculate middle index (avoids overflow)
        int mid = left + (right - left) / 2;
        
        // Check if target is present at mid
        if (arr[mid] == target) {
            return mid;
        }
        
        // If target greater, ignore left half
        if (arr[mid] < target) {
            left = mid + 1;
        }
        // If target smaller, ignore right half
        else {
            right = mid - 1;
        }
    }
    
    // Target not found
    return -1;
}

// Recursive Binary Search
int binarySearchRecursive(vector<int>& arr, int left, int right, int target) {
    if (left > right) {
        return -1;
    }
    
    int mid = left + (right - left) / 2;
    
    if (arr[mid] == target) {
        return mid;
    }
    
    if (arr[mid] < target) {
        return binarySearchRecursive(arr, mid + 1, right, target);
    }
    
    return binarySearchRecursive(arr, left, mid - 1, target);
}

// Lower Bound: First position where element >= target
int lowerBound(vector<int>& arr, int target) {
    int left = 0, right = arr.size();
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

// Upper Bound: First position where element > target
int upperBound(vector<int>& arr, int target) {
    int left = 0, right = arr.size();
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

int main() {
    vector<int> arr = {2, 3, 4, 10, 40};
    
    // Test Case 1: Element exists
    int target1 = 10;
    int result1 = binarySearch(arr, target1);
    cout << "Search for " << target1 << ": Index = " << result1 << endl;
    // Expected: 3
    
    // Test Case 2: Element doesn't exist
    int target2 = 5;
    int result2 = binarySearch(arr, target2);
    cout << "Search for " << target2 << ": Index = " << result2 << endl;
    // Expected: -1
    
    // Test Case 3: Recursive search
    int target3 = 40;
    int result3 = binarySearchRecursive(arr, 0, arr.size() - 1, target3);
    cout << "Recursive search for " << target3 << ": Index = " << result3 << endl;
    // Expected: 4
    
    // Test Case 4: Lower bound
    vector<int> arr2 = {1, 2, 2, 2, 3, 4, 5};
    int lb = lowerBound(arr2, 2);
    cout << "Lower bound of 2: Index = " << lb << endl;
    // Expected: 1 (first occurrence of 2)
    
    // Test Case 5: Upper bound
    int ub = upperBound(arr2, 2);
    cout << "Upper bound of 2: Index = " << ub << endl;
    // Expected: 4 (first element > 2)
    
    return 0;
}

/*
Output:
Search for 10: Index = 3
Search for 5: Index = -1
Recursive search for 40: Index = 4
Lower bound of 2: Index = 1
Upper bound of 2: Index = 4

Key Learning Points:
1. Binary search only works on sorted data
2. O(log n) is significantly faster than O(n) for large arrays
3. Careful with mid calculation to avoid integer overflow
4. Lower/Upper bound are useful variations for finding ranges
5. Both iterative and recursive approaches work
6. Iterative is preferred for space efficiency

Common Pitfalls:
- Forgetting array must be sorted
- Infinite loop when left/right pointers don't converge
- Integer overflow in mid calculation (use left + (right-left)/2)
- Off-by-one errors with <= vs < in while condition
*/
