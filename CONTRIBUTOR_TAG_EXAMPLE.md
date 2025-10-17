# 📋 Example: How to Add Your Contributor Tag

## ⚠️ IMPORTANT: This is COMPULSORY!

To appear on the leaderboard, you **MUST** add the contributor tag to your project's README.md file.

---

## ✅ Correct Examples

### Example 1: Basic Project

```markdown
# My Todo App
**Contributor:** john-doe

## Description
A simple todo application built with React.

## Tech Stack
- React
- CSS
- JavaScript

## How to Run
1. Clone the repository
2. Run `npm install`
3. Run `npm start`
```

### Example 2: Python Project

```markdown
# Weather API
**Contributor:** jane-smith

## Description
A REST API that provides weather information.

## Tech Stack
- Python
- Flask
- SQLite

## Installation
```bash
pip install -r requirements.txt
python app.py
```
\```

### Example 3: Full-Stack Project

```markdown
# E-Commerce Platform
**Contributor:** dev-master123

## Description
A complete e-commerce platform with user authentication and payment integration.

## Features
- User Authentication
- Product Catalog
- Shopping Cart
- Payment Gateway

## Tech Stack
- Frontend: React, Redux
- Backend: Node.js, Express
- Database: MongoDB

## Setup
See INSTALLATION.md for details.
```

---

## ❌ Common Mistakes (DON'T DO THIS!)

### ❌ Wrong: Using Placeholder Text

```markdown
# My Project
**Contributor:** YourUsername
```

**Problem:** "YourUsername" is a placeholder, not your actual GitHub username!

### ❌ Wrong: Missing Contributor Tag

```markdown
# My Project

## Description
This is my awesome project.
```

**Problem:** No contributor tag at all - you won't appear on the leaderboard!

### ❌ Wrong: Wrong Format

```markdown
# My Project
Contributor: john-doe
```

**Problem:** Missing the bold markdown (`**`). While this might work, use the correct format to be safe.

### ❌ Wrong: Tag Not at the Start

```markdown
# My Project

## Description
This is my project.

## Features
- Feature 1
- Feature 2

**Contributor:** john-doe
```

**Problem:** Contributor tag should be at the START of your README, right after the title!

---

## ✅ The Perfect Format

```markdown
# [Your Project Title]
**Contributor:** your-actual-github-username

## Description
[Rest of your README content...]
```

---

## 🔍 Quick Checklist

Before submitting your PR, verify:

- [ ] ✅ Added `**Contributor:** username` line
- [ ] ✅ Used my **actual** GitHub username (not "YourUsername" or placeholder)
- [ ] ✅ Placed it at the **start** of the README, right after the title
- [ ] ✅ Used correct format with double asterisks (`**`)
- [ ] ✅ My username matches my GitHub profile exactly (case-sensitive!)

---

## 🎯 Where to Add This?

Add the contributor tag in **YOUR PROJECT'S README.md** file:

```
Domains/
└── [YourDomain]/
    └── MiniProjects/
        └── YourProjectName/
            └── README.md  👈 Add your contributor tag HERE!
```

**Example Path:**
```
Domains/Frontend/MiniProjects/TodoApp/README.md
```

**NOT** in the main repository README.md!

---

## 🧪 How to Test

After adding your contributor tag, you can test locally:

```bash
cd ProjectHive
node scripts/testLeaderboard.js
```

This will scan all files and show if your username was detected correctly.

---

## 🆘 Still Having Issues?

If you've added the contributor tag but still don't appear on the leaderboard:

1. **Check your username spelling** - It must match your GitHub profile exactly
2. **Check the format** - Use `**Contributor:** username` (with double asterisks)
3. **Wait 2-3 minutes** after PR merge - The automation takes a moment to run
4. **Check Actions tab** - Look for any errors in the workflow
5. **Ask for help** - Open an issue or discussion

---

## 📚 More Information

- [LEADERBOARD_GUIDE.md](LEADERBOARD_GUIDE.md) - Complete guide on how the leaderboard works
- [CONTRIBUTING.md](CONTRIBUTING.md) - Full contribution guidelines
- [QUICK_START.md](QUICK_START.md) - Quick 5-minute start guide

---

**Remember: No contributor tag = No leaderboard recognition!** ⚠️
