**Contributor** SOSWAL007
# Expression Balancer

A simple Java program that checks whether a given mathematical or logical expression has balanced parentheses, curly braces, and square brackets using a Stack data structure.

---

### Project Overview

This program verifies if the brackets in an expression are properly opened and closed in the correct order.  
It supports:
- Round brackets ()
- Curly brackets {}
- Square brackets []

The implementation uses Java’s built-in `Stack` class to push opening brackets and pop them when matching closing brackets appear.

---

### Features

- Checks for balanced brackets in any given string  
- Supports multiple types of brackets  
- Uses Stack — a core Data Structure concept  
- Simple command-line input/output  
- Beginner-friendly and easy to understand  

---

### Working Principle

1. Traverse each character of the input expression.
2. If the character is an opening bracket — push it to the stack.  
3. If the character is a closing bracket:
   - Check if the stack is empty (if yes → unbalanced).  
   - Pop the top element and verify if it matches the type of closing bracket.  
   - If it doesn’t match → unbalanced.  
4. After traversal, if the stack is empty → expression is balanced.


