"""
Problem: The Minion Game
Platform: HackerRank
Difficulty: Medium
Link: https://www.hackerrank.com/challenges/the-minion-game/problem?isFullScreen=true

Problem Statement:
Kevin and Stuart want to play the 'The Minion Game'.

Game Rules

Both players are given the same string, S.
Both players have to make substrings using the letters of the string S.
Stuart has to make words starting with consonants.
Kevin has to make words starting with vowels.
The game ends when both players have made all possible substrings.

Scoring
A player gets +1 point for each occurrence of the substring in the string S.

Example:
String S = BANANA
Kevin's vowel beginning word = ANA
Here, ANA occurs twice in BANANA. Hence, Kevin will get 2 Points.

Approach:
The approach avoids generating all substrings explicitly by using a counting method. For each character in the string, we calculate the number of possible substrings starting from that position as (length – index). If the character is a vowel, the points go to Kevin; otherwise, to Stuart. Finally, the scores are compared to determine the winner. This method achieves linear time and constant space complexity.

Time Complexity: O(n)
Space Complexity: O(1)

Contributor: Ansh-1019
"""

def minion_game(string):
    vowels='AEIOU'
    stuart_score=0
    kevin_score=0
    lenght=len(string)
    for i in range(lenght):
        if string[i] in vowels:
            kevin_score+=lenght-i
        else:
            stuart_score+=lenght-i
    if kevin_score>stuart_score:
        print("Kevin",kevin_score)
    elif stuart_score>kevin_score:
        print("Stuart",stuart_score)
    else:
        print("Draw")
   
if __name__ == '__main__':
    s = input()
    minion_game(s)

"""
Test Cases:
Input:
BANANA

Output:
Stuart 12

"""