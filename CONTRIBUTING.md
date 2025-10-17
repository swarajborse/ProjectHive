# 🤝 Contributing to ProjectHive

Thank you for your interest in contributing to **ProjectHive**! We welcome contributions from developers of all skill levels. This guide will help you get started.

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Types of Contributions](#types-of-contributions)
- [Contribution Workflow](#contribution-workflow)
- [Project Guidelines](#project-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Leaderboard Recognition](#leaderboard-recognition)
- [Code of Conduct](#code-of-conduct)

---

## 🚀 Getting Started

### Prerequisites
- Git installed on your machine
- A GitHub account
- Basic knowledge of Markdown
- (Optional) Familiarity with your chosen domain's tech stack

### First-Time Contributors
If this is your first time contributing to open source, don't worry! Here's what you need to know:

1. **Fork** the repository (creates your own copy)
2. **Clone** your fork to your local machine
3. **Create a branch** for your contribution
4. **Make changes** following our guidelines
5. **Commit** your changes with a clear message
6. **Push** to your fork on GitHub
7. **Create a Pull Request** to the main repository

---

## 📚 Types of Contributions

### 1. 🎨 Mini-Projects

Add complete, functional project examples that demonstrate specific concepts or technologies.

**⚠️ IMPORTANT: Mini-Projects are actual working code folders, not just markdown files!**

**Requirements:**
- Must be a complete, working project with actual code files
- Create a project folder with all necessary files (HTML, CSS, JS, Python, etc.)
- Include a README.md inside the project folder for documentation
- Include your GitHub username in the README.md
- Project must be runnable/testable

**Project Structure Example:**
```
Domains/Frontend/MiniProjects/
└── TodoApp/                    # Your project folder
    ├── index.html              # Your code files
    ├── styles.css
    ├── script.js
    └── README.md               # Project documentation
```

**README.md Format (inside your project folder):**
```markdown
# Project Title
**Contributor:** YourGitHubUsername
**Domain:** [Frontend/Backend/AI-ML/etc.]
**Difficulty:** [Beginner/Intermediate/Advanced]
**Tech Stack:** [HTML, CSS, JavaScript, etc.]

## 📝 Description
A clear and concise description of what the project does.

## 🎯 Features
- Feature 1
- Feature 2
- Feature 3

## 🛠️ Tech Stack
- Technology 1
- Technology 2
- Technology 3

##  How to Run
1. Clone the repository
2. Navigate to this project folder
3. Install dependencies (if any): `npm install`
4. Run the project: Open index.html or `npm start`

## 📁 Project Structure
```
YourProjectName/
├── index.html
├── styles.css
├── script.js
├── package.json (if needed)
└── README.md
```

## 💻 Code Highlights
```javascript
// Show important code snippets
```

## 📚 Learning Outcomes
- What you learned from building this
- Skills you developed
- Challenges you overcame

## � License
MIT License
```

**Examples to Follow:**
- Frontend: Check `Domains/Frontend/MiniProjects/TodoApp/`
- Backend: Check `Domains/Backend/MiniProjects/SimpleAPI/`

**Where to Add:**
1. Navigate to `Domains/[YourDomain]/MiniProjects/`
2. Create a new folder: `YourProjectName/`
3. Add all your code files in that folder
4. Include a README.md documenting your project

**Example Folder Names:**
- `TodoApp/` (Frontend)
- `WeatherApp/` (Frontend)
- `SimpleAPI/` (Backend)
- `ChatBot/` (AI-ML)

### 2. 📦 Starter Templates

Provide boilerplate code and setup instructions to help others jumpstart their projects.

**⚠️ Similar to Mini-Projects: These are also actual code folders, not markdown files!**

**Requirements:**
- Must include all necessary configuration files
- Complete folder structure with actual files
- Should be well-documented
- Must follow best practices for the tech stack
- Include setup and usage instructions

**Example Format:**
```markdown
# [Framework/Library] Starter Template
**Contributor:** YourGitHubUsername
**Domain:** [Frontend/Backend/etc.]

## 📦 What's Included
- Pre-configured setup
- Essential dependencies
- Recommended folder structure
- Sample components/modules
- Configuration files

## 🚀 Quick Start
```bash
# Clone the template
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm start
```

## 📁 Project Structure
```
template/
├── src/
│   ├── components/
│   ├── utils/
│   └── index.js
├── public/
├── package.json
└── README.md
```

## ⚙️ Configuration
- Environment variables setup
- Build configuration
- Development vs Production settings

## 🎯 Features
- Feature 1
- Feature 2

## 📚 Additional Resources
- [Documentation Link]
- [Tutorial Link]
- [Community Link]
```

**Where to Add:**
- Navigate to `Domains/[YourDomain]/Starter-Templates/`
- Create a new file: `TemplateName_Domain.md`
- Example: `ReactBoilerplate_Frontend.md`, `FlaskAPI_Backend.md`

### 3. 🗺️ Roadmaps

Enhance existing domain roadmaps with learning resources, best practices, or new sections.

**Requirements:**
- Must be accurate and up-to-date
- Include quality resources (official docs, tutorials, courses)
- Organize content logically (beginner to advanced)
- Add value to existing content

**Where to Contribute:**
- Navigate to `Domains/[YourDomain]/Roadmap.md`
- Add new sections or enhance existing ones
- Follow the existing structure

### 4. 📝 Documentation

Improve existing documentation, fix typos, or add clarifications.

**Where to Contribute:**
- README.md
- CONTRIBUTING.md
- Domain-specific documentation

---

## 🔄 Contribution Workflow

### Step 1: Fork the Repository
Click the "Fork" button at the top right of the [ProjectHive repository](https://github.com/Tejas-Santosh-Nalawade/ProjectHive).

### Step 2: Clone Your Fork
```bash
git clone https://github.com/YOUR-USERNAME/ProjectHive.git
cd ProjectHive
```

### Step 3: Create a New Branch
```bash
git checkout -b descriptive-branch-name
```

**Branch Naming Convention:**
- `add-[domain]-[project-name]` (e.g., `add-frontend-todo-app`)
- `update-[domain]-roadmap` (e.g., `update-backend-roadmap`)
- `fix-[issue-description]` (e.g., `fix-typo-in-readme`)

### Step 4: Make Your Changes
- Add your contribution following the appropriate template
- Test your code if applicable
- Ensure all links work correctly

### Step 5: Commit Your Changes
```bash
git add .
git commit -m "Add: [Domain] - [Project/Template Name]"
```

See [Commit Message Guidelines](#commit-message-guidelines) below.

### Step 6: Push to Your Fork
```bash
git push origin your-branch-name
```

### Step 7: Create a Pull Request
1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill in the PR template with all required information
4. Click "Create pull request"

### Step 8: Wait for Review
- Maintainers will review your PR within 2-3 days
- Address any requested changes
- Once approved, your PR will be merged!
- You'll automatically appear on the leaderboard 🎉

---

## 📖 Project Guidelines

### ✅ DO's

- ✅ **Follow Templates**: Use the provided formats for consistency
- ✅ **Include Your Username**: Always add `**Contributor:** YourGitHubUsername`
- ✅ **Write Clear Descriptions**: Help others understand your contribution
- ✅ **Test Your Code**: Ensure everything works before submitting
- ✅ **Use Meaningful Names**: Clear, descriptive file and project names
- ✅ **Add Comments**: Well-commented code helps others learn
- ✅ **Check for Duplicates**: Make sure your contribution is unique
- ✅ **Follow Best Practices**: Use industry-standard coding practices
- ✅ **Be Original**: Create your own projects, don't copy others

### ❌ DON'Ts

- ❌ **Don't Plagiarize**: All content must be your original work
- ❌ **Don't Submit Spam**: Low-quality or irrelevant contributions
- ❌ **Don't Break Structure**: Maintain the existing folder organization
- ❌ **Don't Submit Broken Code**: Test before submitting
- ❌ **Don't Modify Others' Work**: Without explicit permission
- ❌ **Don't Use Offensive Content**: Keep everything professional
- ❌ **Don't Submit Without Testing**: Ensure your code runs

### 📝 File Naming Conventions

**Mini-Projects:**
```
ProjectName_Domain.md
```
Examples:
- `WeatherApp_Frontend.md`
- `RestAPI_Backend.md`
- `SentimentAnalysis_NLP.md`

**Starter Templates:**
```
TemplateName_Domain.md
```
Examples:
- `VueJSStarter_Frontend.md`
- `DjangoBoilerplate_Backend.md`
- `TensorFlowTemplate_AI-ML.md`

### 📂 Folder Structure

```
Domains/
└── [YourDomain]/
    ├── MiniProjects/
    │   └── YourProject_Domain.md
    ├── Starter-Templates/
    │   └── YourTemplate_Domain.md
    └── Roadmap.md
```

---

## 💬 Commit Message Guidelines

Write clear, descriptive commit messages using this format:

### Format
```
Type: [Domain] - Brief description

[Optional detailed description]
```

### Types
- **Add**: Adding new content
- **Update**: Modifying existing content
- **Fix**: Fixing bugs or errors
- **Docs**: Documentation changes only
- **Style**: Formatting, missing semicolons, etc.
- **Refactor**: Code restructuring without changing functionality

### Examples

**Good Commit Messages:**
```
Add: Frontend - Todo App with React and TypeScript
Update: Backend - Enhance Node.js roadmap with new resources
Fix: Correct broken links in AI-ML roadmap
Docs: Improve CONTRIBUTING.md with detailed examples
```

**Bad Commit Messages:**
```
update
fixed stuff
Added project
changes made
```

---

## 🔍 Pull Request Process

### Before Creating a PR

1. **Ensure your code works** - Test thoroughly
2. **Update documentation** - If you changed functionality
3. **Follow the style guide** - Consistent formatting
4. **Check for conflicts** - Sync with the main branch if needed

### PR Title Format
```
[Domain] Add/Update/Fix: Brief description
```

**Examples:**
- `[Frontend] Add: Portfolio Website Template`
- `[Backend] Update: Express.js Roadmap`
- `[AI-ML] Fix: Broken links in Image Classification project`

### PR Description Template

```markdown
## 📝 Description
Brief description of what this PR does

## 🎯 Type of Contribution
- [ ] Mini-Project
- [ ] Starter Template
- [ ] Roadmap Enhancement
- [ ] Documentation
- [ ] Bug Fix

## 📂 Domain
- [ ] AI-ML
- [ ] Frontend
- [ ] Backend
- [ ] Other: [specify]

## ✅ Checklist
- [ ] I have read the CONTRIBUTING.md guidelines
- [ ] My code follows the project's style guidelines
- [ ] I have tested my changes
- [ ] I have added my GitHub username as the contributor
- [ ] I have used the correct file naming convention
- [ ] All links in my documentation work correctly

## 📸 Screenshots (if applicable)
[Add screenshots or GIFs if relevant]

## 📚 Additional Notes
[Any additional information reviewers should know]
```

### Review Process

1. **Automated Checks**: GitHub Actions will run automatically
2. **Maintainer Review**: A maintainer will review your code
3. **Feedback**: You may receive comments or change requests
4. **Approval**: Once approved, your PR will be merged
5. **Leaderboard Update**: Your contribution will be reflected automatically!

---

## 🏆 Leaderboard Recognition

### How It Works

Once your Pull Request is **merged**, you'll automatically appear on the [ProjectHive Leaderboard](DomainsLeaderboards/Overall.md)!

### Requirements for Leaderboard Entry

1. **Include Your Username**: Add this line to your contribution:
   ```markdown
   **Contributor:** YourGitHubUsername
   ```

2. **PR Must Be Merged**: Only merged PRs count toward the leaderboard

3. **Follow Guidelines**: Spam or low-quality contributions won't be merged

### Leaderboard Features

- **Automatic Updates**: GitHub Actions workflow updates the leaderboard
- **Domain Tracking**: See which domain you contributed to
- **PR Count**: Track your total contributions
- **Hall of Fame**: Top contributors get featured!

### Contributor Badges

**When do badges appear?**

After your PR is merged:
- ✅ Your GitHub profile automatically appears in the repository's **Contributors** section
- ✅ Your contributor badge shows up within **24 hours**
- ✅ You're added to the domain-specific leaderboard
- ✅ Your contribution count is updated

**Important:** Make sure your git commits are properly linked to your GitHub account. To verify:
```bash
git config user.email  # Should match your GitHub email
```

If your badge doesn't appear, check that your GitHub email is verified and matches your commit email.

### Checking Your Status

Visit the [Overall Leaderboard](DomainsLeaderboards/Overall.md) to see:
- Your current rank
- Total number of contributions
- Domain contributions

---

## 🎖️ Hall of Fame

Top contributors each month are featured in our [Hall of Fame](HallOfFame/README.md)!

**How to Get Featured:**
- Make quality contributions consistently
- Help review others' PRs (if you're experienced)
- Engage with the community
- Follow best practices

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. 

### Our Standards

**Positive Behavior:**
- ✅ Using welcoming and inclusive language
- ✅ Being respectful of differing viewpoints
- ✅ Gracefully accepting constructive criticism
- ✅ Focusing on what is best for the community
- ✅ Showing empathy towards others

**Unacceptable Behavior:**
- ❌ Trolling, insulting, or derogatory comments
- ❌ Public or private harassment
- ❌ Publishing others' private information
- ❌ Spam or low-quality contributions
- ❌ Any conduct that could be considered unprofessional

### Enforcement

Violations of the code of conduct may result in:
- Warning
- Temporary ban from contributing
- Permanent ban from the project

---

## 🆘 Need Help?

### Resources
- 📖 [README.md](README.md) - Project overview
- 🔍 [Existing Examples](Domains/) - See how others have contributed
- 💬 [GitHub Discussions](https://github.com/Tejas-Santosh-Nalawade/ProjectHive/discussions) - Ask questions
- 🐛 [Issues](https://github.com/Tejas-Santosh-Nalawade/ProjectHive/issues) - Report bugs

### Common Questions

**Q: I'm a complete beginner. Where should I start?**
A: Start with simpler projects or documentation improvements. Check out existing examples for inspiration!

**Q: Can I contribute to multiple domains?**
A: Absolutely! Contribute to as many domains as you like.

**Q: How long does PR review take?**
A: Typically 2-3 days. Be patient, and we'll review it!

**Q: My PR was rejected. What should I do?**
A: Read the feedback carefully, make requested changes, and resubmit. We're here to help you succeed!

---

## 🙏 Thank You!

Thank you for contributing to ProjectHive! Your contributions help create a valuable resource for developers worldwide. 

Every contribution, no matter how small, makes a difference. 🌟

---

**Happy Contributing! 🚀**

---

<div align="center">

Made with ❤️ by the Open Source Community

[⬆ Back to Top](#-contributing-to-projecthive)

</div>
