/*
Problem: Asteroid Collision
Platform: Leetcode
Problem Code: 735
Difficulty: Medium
Link: https://leetcode.com/problems/asteroid-collision/

Description:
Simulate collisions between moving asteroids.
Positive values move right, negative values move left.
Collisions occur when a positive asteroid meets a negative one.
Return the state of asteroids after all collisions.

Example: 
Input: 
    -4 -1 10 2 -1 8 -9 -6 5 2 
Output: 
    -4 -1 10 5 2

Approach: 
1. Traverse through the asteroids.
2. Use a vector as a stack to simulate collisions.
3. If a positive asteroid meets a smaller negative one, remove the smaller.
4. If both are equal, both explode.
5. Continue until all collisions are resolved.

Time Complexity: O(n)
Space Complexity: O(n)

Contributor: Paila-Sahitya

*/

#include<bits/stdc++.h>
using namespace std;



vector<int> asteroidCollision(vector<int>& asteroids) {
    int n=asteroids.size();
    vector<int> result;

    for(int i=0;i<n;i++){
        if(asteroids[i]>0){
            result.push_back(asteroids[i]);
        }

        else{
            while(!result.empty() && result.back()>0 && result.back()<abs(asteroids[i])){
                result.pop_back();
            }

            if(!result.empty() && result.back()==abs(asteroids[i])){
                result.pop_back();
            }
            else if(result.empty() || result.back()<0){
                result.push_back(asteroids[i]);
            }
        }
    }
    return result;
}

int main(){

    vector<int> asteroids = {-4, -1, 10, 2, -1, 8, -9, -6, 5, 2};
    cout << "Initial Asteroids: ";
    for (auto a: asteroids){
        cout <<a<< " ";
    }
    cout << endl;

    vector<int> ans = asteroidCollision(asteroids);

    cout << "Result after collisions: ";
    for (auto it: ans){
        cout <<it<< " ";
    }
    cout << endl;

    return 0;
}