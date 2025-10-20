/*
Problem: Valid Parentheses
Platform: LeetCode
Problem Code/Number: 20
Difficulty: Easy
Link: https://leetcode.com/problems/valid-parentheses/

Problem Statement:
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', 
determine if the input string is valid.
An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Approach:
Use a stack to store opening brackets. Traverse the string:
- Push opening brackets onto the stack.
- For closing brackets, check if the top of the stack matches the corresponding opening bracket.
- If it matches, pop the stack; otherwise, the string is invalid.
- The string is valid if the stack is empty at the end.

Time Complexity: O(n)
Space Complexity: O(n)

Contributor: alisha1510
*/

#include <iostream>
#include <stack>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if (st.empty()) return false;
                char top = st.top();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) {
                    return false;
                }
                st.pop();
            }
        }
        return st.empty();
    }
};

int main() {
    Solution sol;
    vector<string> testCases = {"()", "()[]{}", "(]", "([])", "([)]"};
    for (auto &s : testCases) {
        cout << s << " -> " << (sol.isValid(s) ? "Valid" : "Invalid") << endl;
    }
    return 0;
}
