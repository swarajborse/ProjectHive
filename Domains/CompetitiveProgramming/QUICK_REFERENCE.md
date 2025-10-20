# 🚀 Quick Reference: Contributing CP Solutions

## ⚠️ Important: Accepted Platforms Only

✅ **Codeforces** - https://codeforces.com/  
✅ **CodeChef** - https://www.codechef.com/  
✅ **LeetCode** - https://leetcode.com/  
❌ **NO Generic/GFG problems** - Must include valid problem link from above platforms

## Language Folder Structure

```
Programs/
├── C++/       ← Add .cpp files here
├── Python/    ← Add .py files here
└── Java/      ← Add .java files here
```

## Quick Steps to Contribute

1. **Find a problem** from Codeforces, CodeChef, or LeetCode
2. **Pick your language folder** (C++, Python, or Java)
3. **Create your solution file** (e.g., `MergeSort.cpp`)
4. **Use the template below** with valid problem link
5. **Test with multiple cases**
6. **Submit PR**
7. **Wait 24 hours after merge for contributor badge!**

## Solution Template

### C++
```cpp
/*
Problem: [Problem Name]
Platform: [Codeforces/CodeChef/LeetCode]
Problem Code: [Problem Code/Number]
Difficulty: [Easy/Medium/Hard]
Link: [Direct Problem URL]

Problem Statement:
[Description]

Approach:
[Your approach]

Time Complexity: O(?)
Space Complexity: O(?)

Contributor: YourGitHubUsername
*/

#include <bits/stdc++.h>
using namespace std;

// Your solution here

int main() {
    // Test cases
    return 0;
}
```

### Python
```python
"""
Problem: [Problem Name]
Platform: [Codeforces/CodeChef/LeetCode]
Problem Code: [Problem Code/Number]
Difficulty: [Easy/Medium/Hard]
Link: [Direct Problem URL]

Problem Statement:
[Description]

Approach:
[Your approach]

Time Complexity: O(?)
Space Complexity: O(?)

Contributor: YourGitHubUsername
"""

def solution():
    # Your solution here
    pass

if __name__ == "__main__":
    # Test cases
    pass
```

### Java
```java
/*
Problem: [Problem Name]
Platform: [Codeforces/CodeChef/LeetCode]
Problem Code: [Problem Code/Number]
Difficulty: [Easy/Medium/Hard]
Link: [Direct Problem URL]

Problem Statement:
[Description]

Approach:
[Your approach]

Time Complexity: O(?)
Space Complexity: O(?)

Contributor: YourGitHubUsername
*/

public class Solution {
    // Your solution here
    
    public static void main(String[] args) {
        // Test cases
    }
}
```

## Naming Conventions

- **Use PascalCase**: `TwoSum.cpp`, `BinarySearch.py`, `MergeSort.java`
- **Be descriptive**: Name should reflect the problem
- **Match problem name**: Use official problem name when possible

## What to Include

✅ **Must Have:**
- Problem statement
- Problem link
- Your approach explanation
- Clean, commented code
- Multiple test cases
- Time & space complexity
- Your GitHub username

❌ **Don't:**
- Copy-paste without understanding
- Skip test cases
- Forget complexity analysis
- Leave out your username

## Contributor Badge Info

### When will my badge appear?

- ✅ **Within 24 hours** of PR merge
- ✅ **Automatically** in Contributors section
- ✅ **Requires** git email to match GitHub account

### Check your git config:
```bash
git config user.email  # Should match GitHub email
git config user.name   # Your GitHub username
```

### Badge not showing?
1. Verify GitHub email is confirmed
2. Check git commit email matches
3. Ensure you added `**Contributor:** YourUsername` in your code
4. Wait 24 hours after merge

## Quick Examples

### Easy Problem Example
- Two Sum
- Palindrome Check
- Fibonacci Number
- Binary Search

### Medium Problem Example
- Longest Common Subsequence
- Graph BFS Traversal
- Dynamic Programming problems

### Where to Find Problems?
- [Codeforces](https://codeforces.com/) ✅ ACCEPTED
- [CodeChef](https://www.codechef.com/) ✅ ACCEPTED
- [LeetCode](https://leetcode.com/) ✅ ACCEPTED

**Note:** Only problems from above platforms are accepted. Generic/GFG problems will be rejected.

## Common Mistakes to Avoid

1. ❌ Using Generic/GFG problems (Must be from Codeforces/CodeChef/LeetCode)
2. ❌ Missing problem link or invalid link
3. ❌ Putting solution in wrong language folder
4. ❌ Not including test cases
5. ❌ Missing complexity analysis
6. ❌ Forgetting to add username
7. ❌ Not testing code before PR
8. ❌ Using incorrect file naming (use PascalCase!)
9. ❌ Missing problem code/number in header

## After Your PR is Merged

1. ✅ Check [Leaderboard](../../DomainsLeaderboards/Overall.md)
2. ✅ Watch for contributor badge (24 hours)
3. ✅ Consider adding solutions in other languages
4. ✅ Help review other PRs
5. ✅ Share your achievement on social media!

## Need Help?

- 📖 Read full [CONTRIBUTING.md](../../CONTRIBUTING.md)
- 💬 Open an issue with questions
- 👀 Look at existing solutions for reference
- 🤝 Join discussions in PRs

---

**Pro Tip**: Start with an easy problem in your comfort language, then try implementing the same problem in other languages to learn different approaches!

---

Happy Coding! 🎯
