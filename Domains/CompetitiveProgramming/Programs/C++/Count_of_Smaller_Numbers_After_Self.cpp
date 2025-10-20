/*
Problem: Count of Smaller Numbers After Self
Platform: LeetCode
Problem Code: 315
Difficulty: Hard
Link: https://leetcode.com/problems/count-of-smaller-numbers-after-self/

Problem Statement:
Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].

Example:
Input: nums = [5,2,6,1]
Output: [2,1,1,0]

Approach:
We can solve this problem efficiently using a modified Merge Sort. 
During merge, we count the number of elements that move before each element from the left subarray. 
This count represents the number of smaller elements to the right of the current element.


Contributor: alisha1510
*/

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> countSmaller(vector<int>& nums) {
        int n = nums.size();
        vector<int> counts(n, 0);
        vector<pair<int,int>> arr(n); // pair of (value, index)
        
        for(int i=0; i<n; i++) arr[i] = {nums[i], i};
        
        mergeSort(arr, 0, n-1, counts);
        return counts;
    }
    
private:
    void mergeSort(vector<pair<int,int>>& arr, int l, int r, vector<int>& counts) {
        if(l >= r) return;
        int mid = l + (r-l)/2;
        mergeSort(arr, l, mid, counts);
        mergeSort(arr, mid+1, r, counts);
        merge(arr, l, mid, r, counts);
    }
    
    void merge(vector<pair<int,int>>& arr, int l, int mid, int r, vector<int>& counts) {
        vector<pair<int,int>> temp(r-l+1);
        int i = l, j = mid+1, k = 0;
        int rightCount = 0;
        
        while(i <= mid && j <= r) {
            if(arr[j].first < arr[i].first) {
                temp[k++] = arr[j++];
                rightCount++;
            } else {
                counts[arr[i].second] += rightCount;
                temp[k++] = arr[i++];
            }
        }
        
        while(i <= mid) {
            counts[arr[i].second] += rightCount;
            temp[k++] = arr[i++];
        }
        
        while(j <= r) {
            temp[k++] = arr[j++];
        }
        
        for(int m = 0; m < temp.size(); m++) {
            arr[l + m] = temp[m];
        }
    }
};

// Example usage
int main() {
    Solution sol;
    vector<int> nums = {5,2,6,1};
    vector<int> result = sol.countSmaller(nums);
    
    for(int x : result) cout << x << " ";
    cout << endl;
    return 0;
}
