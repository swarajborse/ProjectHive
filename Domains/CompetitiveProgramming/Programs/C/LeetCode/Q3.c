/*
===============================================================
3. Longest Substring Without Repeating Characters
===============================================================

Difficulty: Medium
Tags: Hash Table, String, Sliding Window

Contributor: SOHAM-GADEKAR

---------------------------------------------------------------
Problem Statement:
---------------------------------------------------------------
Given a string s, find the length of the longest substring 
without repeating characters.

---------------------------------------------------------------
Example 1:
---------------------------------------------------------------
Input: s = "abcabcbb"
Output: 3

Explanation:
The answer is "abc", with the length of 3. 
Note that "bca" and "cab" are also correct answers.

---------------------------------------------------------------
Example 2:
---------------------------------------------------------------
Input: s = "bbbbb"
Output: 1

Explanation:
The answer is "b", with the length of 1.

---------------------------------------------------------------
Example 3:
---------------------------------------------------------------
Input: s = "pwwkew"
Output: 3

Explanation:
The answer is "wke", with the length of 3.
Notice that the answer must be a substring, 
"pwke" is a subsequence and not a substring.

---------------------------------------------------------------
Constraints:
---------------------------------------------------------------
- 0 <= s.length <= 5 * 10^4
- s consists of English letters, digits, symbols, and spaces
===============================================================
*/


int lengthOfLongestSubstring(char* s) {
    // Array to track all printable ASCII characters (from space ' ' to '~')
    // ' ' = 32, '~' = 126 → total 95 characters
    int allCharacter[95] = {0};  

    int maxLength = 0; // Store the length of the longest substring

    // Loop over each character in the string as starting point
    for (int i = 0; s[i] != '\0'; i++) {
        int currMaxLength = 0; // Length of substring starting at index i
        int flag = 0;          // Flag to break inner loop if a duplicate is found

        // Explore substring starting at index i
        for (int j = i; s[j] != '\0'; j++) {
            // Check if character is printable ASCII (from space ' ' to '~')
            if (s[j] >= ' ' && s[j] <= '~') {
                // Check if character has already appeared in current substring
                if (allCharacter[s[j] - 32] == 0) {
                    allCharacter[s[j] - 32] = 1; // Mark character as seen
                    currMaxLength++;             // Increase current substring length
                } else {
                    // Duplicate character found → stop current substring
                    flag = 1;
                    break;
                }
            } else {
                // Non-printable character → stop current substring
                break;
            }
        }

        // Update maximum length if current substring is longer
        if (currMaxLength > maxLength) {
            maxLength = currMaxLength;
        }

        // If no duplicate was found, remaining substrings cannot be longer
        if (flag == 0) {
            break;
        } else {
            // Reset allCharacter array for the next starting index
            for (int k = 0; k < 95; k++)
                allCharacter[k] = 0;
        }
    }

    return maxLength; // Return the length of the longest substring without repeating characters
}
