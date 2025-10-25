/*
Probelm: Reverse Integer
Platform: Leetcode
problem Code: 7
Difficulty: Medium
Link: https://leetcode.com/problems/reverse-integer/description/

Problem Statement:
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

 

Example 1:

Input: x = 123
Output: 321
Example 2:

Input: x = -123
Output: -321
Example 3:

Input: x = 120
Output: 21
 

Constraints:

-231 <= x <= 231 - 1

Approach:
1. extracted the least significant digit(one's place)
2. added it as the most significant digit
3. looped this till completion

Time Complexity: O(n)
Space Complexity: O(1)

Contributor: SamaKool
*/

class Solution {
public:
    int reverse(int x) {
        long revn = 0;
        
        while(x != 0) {
            int lastd = x % 10;
            revn = revn * 10 + lastd;
            x /= 10;
        }
        if (revn > INT_MAX || revn < INT_MIN) {
            return 0;
        }

        return revn;
    }
};