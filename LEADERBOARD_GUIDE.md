# 📊 Leaderboard & Hall of Fame Guide

## How It Works

ProjectHive automatically tracks contributors and updates the leaderboard and Hall of Fame when pull requests are merged.

---

## ✅ How to Ensure You Get Recognition

### Step 1: Add Contributor Tag in Your README

When you create a project, **you must include** this line in your project's `README.md`:

```markdown
**Contributor:** YourGitHubUsername
```

### Accepted Formats

The automation script recognizes several formats:

✅ `**Contributor:** username`  
✅ `**Contributor**: username`  
✅ `Contributor: **username**`  
✅ `Contributor: username`

### Example Project README

```markdown
# My Awesome Project
**Contributor:** john-doe

## Description
This is my awesome project that does amazing things!

## Tech Stack
- React
- Node.js
- MongoDB

## How to Run
1. Clone the repository
2. Run `npm install`
3. Run `npm start`
```

---

## 🚫 Common Mistakes to Avoid

❌ **Don't use placeholder names:**
- `**Contributor:** YourUsername`
- `**Contributor:** YourGitHubUsername`
- `**Contributor:** username`

✅ **Use your actual GitHub username:**
- `**Contributor:** john-doe`
- `**Contributor:** jane-smith`

❌ **Don't forget the Contributor line:**
Without this line, your contribution won't be counted!

❌ **Don't use special characters in incorrect places:**
- `**Contributor::** username` (double colons)
- `Contributor username` (missing colon)

---

## ⏱️ When Will I Appear on the Leaderboard?

1. **Submit PR:** Create your pull request with your project.
2. **PR Merged:** Wait for a maintainer to review and merge your PR.
3. **Automatic Update:** Within 2-3 minutes of merge, GitHub Actions will:
   - Scan all project files
   - Find your contributor tag
   - Update the leaderboard
   - Update the Hall of Fame (if you're in top 10)

---

## 🏆 Leaderboard Features

### Overall Leaderboard
- Shows all contributors ranked by total contributions
- Displays domains you've contributed to
- Updates automatically with each merged PR

View: [DomainsLeaderboards/Overall.md](DomainsLeaderboards/Overall.md)

### Hall of Fame
- Features the top 10 contributors
- Displays your GitHub profile picture
- Shows your total contributions and domains

View: [HallOfFame/README.md](HallOfFame/README.md)

---

## 🔧 Troubleshooting

### My PR was merged but I'm not on the leaderboard

**Check these things:**

1. **Did you include the contributor tag?**
   - Open your project's README.md
   - Look for `**Contributor:** YourUsername`
   - Make sure your actual GitHub username is there

2. **Is your username formatted correctly?**
   - GitHub usernames can only contain alphanumeric characters and hyphens
   - They cannot start or end with a hyphen
   - Maximum 39 characters

3. **Wait a few minutes**
   - The GitHub Actions workflow takes 2-3 minutes to complete
   - Check the Actions tab to see if the workflow is still running

4. **Check the workflow logs**
   - Go to the repository's "Actions" tab
   - Click on the latest "Update Leaderboard" workflow
   - Check if there were any errors

### The workflow failed

If you see a failed workflow:

1. **Check the error message in Actions tab**
2. **Common issues:**
   - Permission errors: The workflow may need additional permissions
   - File not found: Make sure your files are in the correct directories
   - Invalid format: Check that your contributor tag follows the correct format

3. **Contact maintainers:**
   - Open an issue on the repository
   - Provide your PR number and username
   - A maintainer can manually trigger the workflow

---

## 📝 For Maintainers

### Manual Workflow Trigger

If the automatic update fails, you can manually trigger the workflow:

1. Go to the "Actions" tab
2. Click "Update Leaderboard" workflow
3. Click "Run workflow"
4. Select the branch and click "Run workflow"

### Workflow Permissions

The workflow requires these permissions:
- `contents: write` - To commit leaderboard updates
- `pull-requests: read` - To read PR information

These are configured in `.github/workflows/leaderboard.yml`.

---

## 🎯 Tips for Maximum Recognition

1. **Contribute to multiple domains** - Your contributions across different domains are all counted
2. **Quality over quantity** - Well-documented, functional projects are valued
3. **Help others** - Reviewing PRs and helping newcomers builds community reputation
4. **Be consistent** - Regular contributions throughout Hacktoberfest

---

## 📧 Need Help?

- 💬 [Open a Discussion](https://github.com/Tejas-Santosh-Nalawade/ProjectHive/discussions)
- 🐛 [Report an Issue](https://github.com/Tejas-Santosh-Nalawade/ProjectHive/issues)
- 📖 [Read CONTRIBUTING.md](CONTRIBUTING.md)

---

**Happy Contributing! 🚀**
