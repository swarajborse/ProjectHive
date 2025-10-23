/*
Problem: Police Recruits
Platform: Codeforces
Problem Code: 427A
Difficulty: Easy
Link: https://codeforces.com/problemset/problem/427/A

Problem Statement:
Given a sequence of events representing crimes and police recruitments:
- Each -1 represents a crime.
- Each positive number represents the number of police officers recruited.
When a crime occurs and there are no available officers, it goes untreated. 
Find the total number of untreated crimes.

Example:
Input:
    7
    -1 -1 1 1 -1 -1 1

Output:
    2

Approach:
1. Traverse through the list of events.
2. Maintain a count of active police officers.
3. If a crime occurs and no officer is available, increase the untreated crimes count.
4. Otherwise, assign one available officer to handle the crime.

Time Complexity: O(n)
Space Complexity: O(1)

Contributor: Paila-Sahitya

*/

#include<bits/stdc++.h>
using namespace std;
 
int policeRecruits(int n, vector<int> &arr){
    int crimeCount=0;
    int activePolice=0;
    for(int i=0;i<n;i++){
        if(arr[i]==-1 && activePolice==0) crimeCount++;
        else if(arr[i]==-1){
            activePolice--;
        }
        else activePolice+=arr[i];
    }
    return crimeCount;
}
 
int main(){
    int n;
    cin>>n;
    vector<int> arr(n);
    for(int i=0;i<n;i++){
        cin>>arr[i];
    }
    cout<<policeRecruits(n, arr)<<endl;
    return 0;
}