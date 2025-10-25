**contributor** "Samikshaa-A"
# 🧩 Sudoku Solver (MAC-3 + MRV + LCV)

This project implements an **AI-based Sudoku Solver** in Python using **Constraint Satisfaction Problem (CSP)** techniques.  
It uses **MAC-3 (Maintaining Arc Consistency)** with **MRV (Minimum Remaining Values)** and **LCV (Least Constraining Value)** heuristics to efficiently solve Sudoku puzzles.

---

## 🚀 Features

- ✅ Solves standard **9x9 Sudoku puzzles**
- 🧠 Uses **MAC-3 algorithm** for maintaining arc consistency
- 🔢 Employs **MRV** heuristic for selecting the next variable to assign
- 🎯 Implements **LCV** heuristic to choose the least constraining value
- 💡 Automatically updates domains and propagates constraints efficiently
- 🧾 Well-structured, modular, and easy to modify or extend

---

## 🧠 Concepts Used

### 1. **Constraint Satisfaction Problem (CSP)**
Sudoku is modeled as a CSP where:
- **Variables** → Each empty cell  
- **Domain** → Possible numbers (1–9)  
- **Constraints** → No duplicates in row, column, or 3×3 box  

### 2. **MAC-3 (Maintaining Arc Consistency)**
Ensures every variable’s domain remains consistent with its neighbors (peers).  
Whenever a cell is assigned, the algorithm **propagates constraints** to other cells.

### 3. **MRV (Minimum Remaining Values)**
Selects the **most constrained cell** (with the fewest possible values) first.

### 4. **LCV (Least Constraining Value)**
Chooses the value that **restricts the fewest choices** for neighboring cells.

---

## 🧱 Code Overview

| Function | Description |
|-----------|--------------|
| `initialize_domains()` | Initializes possible values (domains) for each unfilled cell |
| `revise()` | Removes inconsistent values between neighboring cells |
| `mac_propagate()` | Applies arc consistency and constraint propagation |
| `select_unassigned_variable_mrv()` | Uses MRV to pick the next cell |
| `order_domain_values_lcv()` | Orders possible values using LCV heuristic |
| `solve_mac()` | Main recursive backtracking solver |
| `print_board()` | Prints the Sudoku grid in readable format |

---
