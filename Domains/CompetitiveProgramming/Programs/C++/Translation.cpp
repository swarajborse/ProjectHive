/*
Problem: Translation
Platform: Codeforces
Problem Code: 41A
Difficulty: Easy (800 rated)
Link: https://codeforces.com/problemset/problem/41/A

The translation from the Berland language into the Birland language is not an easy task. Those languages are very similar: a Berlandish word differs from a Birlandish word with the same meaning a little: it is spelled (and pronounced) reversely. For example, a Berlandish word code corresponds to a Birlandish word edoc. However, making a mistake during the "translation" is easy. Vasya translated the word s from Berlandish into Birlandish as t. Help him: find out if he translated the word correctly.

Input
The first line contains word s, the second line contains word t. The words consist of lowercase Latin letters. The input data do not contain unnecessary spaces. The words are not empty and their lengths do not exceed 100 symbols.

Output
If the word t is a word s, written reversely, print YES, otherwise print NO.

Examples:

Input:
code
edoc
Output:
YES

Input:
abb
aba
Output:
NO

Input:
code
code
Output:
NO

Approach:
1. Checking if letters of s are similar to reverse of t.

Time Complexity: O(n)
Space Complexity: O(1)

Contributor: SamaKool
*/


#include<bits/stdc++.h>
using namespace std; 

int main(){
    string s, t;
    cin >> s;
    cin >> t;
    bool x = true;
    for (int i = 0; i < s.length(); i++){
        if(s.length() != t.length()){
            x = false;
            break;
        }
        if(s[i] != t[t.length() - i - 1]) {
            x = false;
            break;
        }
    }
    if(x == true) cout<<"YES";
    else cout<<"NO";
    return 0;
}