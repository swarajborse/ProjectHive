/*
Problem: Twins
Platform: Codeforces
Problem Code: 160A
Difficulty: Easy
Link: https://codeforces.com/problemset/problem/160/A

Problem Statement: 
Two brothers have a collection of coins of different values.
The goal is to find the minimum number of coins one brother must take 
so that the total value of his coins becomes strictly greater than the 
total value of the remaining coins.

Example:
Input:
    4
    3 3 4 3
Output:
    2

Approach: 
1. Sort the coins in descending order.
2. Keep picking the largest coins until the sum of selected coins > sum of remaining coins.
3. Return the number of coins picked.

Time Complexity: O(n log n)
Space Complexity: O(1)

Contributor: Paila-Sahitya
*/

#include<bits/stdc++.h>
using namespace std;
 
int minimumCoins(int n, vector<int>&arr){
    sort(arr.begin(), arr.end(), greater<int>());
    int total=0;
    for(int i=0;i<n;i++){
        total+=arr[i];
    }
    int sum=0;
    int count=0;
    for(int i=0;i<n;i++){
        sum+=arr[i];
        count++;
        if(sum>total-sum) return count;
    }
    return count;
}

int main(){
    int n;
    cin>>n;
    vector<int> arr(n);
    for(int i=0;i<n;i++){
        cin>>arr[i];
    }
    cout<<minimumCoins(n, arr)<<endl;
    return 0;
}