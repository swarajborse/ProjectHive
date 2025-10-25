# Auto-Retry Failed Workflows Documentation

## Overview

This repository now has **automatic retry functionality** for failed GitHub Actions workflows. No more manual re-runs needed!

## 📁 Workflow Files

### 1️⃣ `retry-failed-workflows.yml` (Simple Version)
**Location:** `.github/workflows/retry-failed-workflows.yml`

**Trigger:** Automatically runs when "Update Leaderboard" workflow fails

**What it does:**
- Waits 10 seconds (to avoid immediate re-run issues)
- Retries only the failed jobs in the workflow
- Provides status notifications

**Use Case:** Simple, immediate retry when a workflow fails

---

### 2️⃣ `auto-retry-failed.yml` (Advanced Version)
**Location:** `.github/workflows/auto-retry-failed.yml`

**Triggers:**
1. **Automatic:** When "Update Leaderboard" workflow fails
2. **Scheduled:** Every 6 hours to catch any missed failures
3. **Manual:** Can be triggered manually from GitHub Actions UI

**Features:**
- ✅ **Smart Retry Logic** - Won't retry more than 3 times
- ✅ **Batch Processing** - Can retry multiple failed workflows at once
- ✅ **Rate Limiting Protection** - Adds delays between retries
- ✅ **Detailed Logging** - Shows which workflows are being retried
- ✅ **Summary Reports** - Provides summary of retry actions

**Configuration:**
- **Max Retries:** 3 attempts (configurable via manual trigger)
- **Retry Window:** Last 24 hours (for scheduled runs)
- **Delay Between Retries:** 5-15 seconds

---

## 🚀 How It Works

### Automatic Retry Flow

```
PR Merged → Leaderboard Workflow Runs → Fails ❌
                                          ↓
                            Auto-Retry Workflow Triggered
                                          ↓
                               Waits 10-15 seconds
                                          ↓
                         Checks attempt number (< 3?)
                                          ↓
                               Retries failed jobs
                                          ↓
                            Success ✅ or Fail ❌
```

### Scheduled Retry Flow

```
Every 6 hours → Find all failed "Update Leaderboard" runs
                         ↓
              Filter: Only attempts < 3
                         ↓
           Retry each failed workflow
                         ↓
              Generate summary report
```

---

## 📊 Permissions Required

Both workflows need these permissions (already configured):

```yaml
permissions:
  actions: write      # To trigger workflow re-runs
  contents: read      # To access repository data
```

---

## 🎯 What Gets Retried

### Included Workflows:
- ✅ "Update Leaderboard" workflow
- ✅ Any workflow you add to the list in `auto-retry-failed.yml`

### Retry Limits:
- Maximum **3 attempts** per workflow run
- After 3 failures, manual intervention required

---

## 🔧 Manual Retry

You can also manually trigger retries:

1. Go to **Actions** tab in GitHub
2. Select "**Auto Retry All Failed Workflows**"
3. Click "**Run workflow**"
4. (Optional) Set custom max retries
5. Click "**Run workflow**" button

This will:
- Find all failed "Update Leaderboard" runs in last 24 hours
- Retry them automatically
- Provide a summary

---

## 📝 Configuration

### To add more workflows to auto-retry:

Edit `.github/workflows/auto-retry-failed.yml`:

```yaml
on:
  workflow_run:
    workflows: 
      - "Update Leaderboard"
      - "Your Other Workflow Name"  # Add here
      - "Another Workflow"           # Add here
    types:
      - completed
```

### To change retry limits:

Edit the `MAX_RETRIES` check in the script section:

```bash
if [ "$attempt_number" -ge 3 ]; then  # Change 3 to your desired limit
```

### To change scheduled frequency:

Edit the cron schedule:

```yaml
schedule:
  - cron: '0 */6 * * *'  # Every 6 hours
  # Examples:
  # '0 */2 * * *'  = Every 2 hours
  # '0 0 * * *'    = Daily at midnight
  # '0 */12 * * *' = Every 12 hours
```

---

## 🐛 Troubleshooting

### Why didn't my workflow retry?

**Possible reasons:**
1. Already attempted 3+ times → Check attempt count in workflow logs
2. Rate limiting → Wait a few minutes and retry manually
3. Workflow is still running → Can't retry running workflows
4. Workflow was deleted → Can't retry deleted runs

### How to check attempt count?

```bash
gh run view <RUN_ID> --json attempt
```

### Manual retry command:

```bash
gh run rerun <RUN_ID> --failed
```

---

## 📈 Monitoring

### View retry history:
1. Go to **Actions** tab
2. Select "**Auto Retry All Failed Workflows**" or "**Retry Failed Workflows**"
3. Check recent runs to see what was retried

### Check logs:
- Each retry shows detailed logs
- Look for:
  - `🔄 Auto-retry triggered`
  - `✅ Successfully triggered retry`
  - `⚠️ Maximum retry attempts reached`

---

## ⚙️ Advanced Usage

### Retry specific workflow manually:

```bash
# Get recent failed runs
gh run list --status failure --limit 10

# Retry specific run
gh run rerun <RUN_ID> --failed
```

### Disable auto-retry temporarily:

Comment out or remove the workflow file:
```bash
mv .github/workflows/auto-retry-failed.yml .github/workflows/auto-retry-failed.yml.disabled
```

### Re-enable:
```bash
mv .github/workflows/auto-retry-failed.yml.disabled .github/workflows/auto-retry-failed.yml
```

---

## 🎉 Benefits

✅ **No Manual Work** - Workflows retry automatically  
✅ **Handles Transient Failures** - Network issues, rate limits, etc.  
✅ **Smart Limits** - Won't retry forever (max 3 attempts)  
✅ **Scheduled Cleanup** - Catches any missed failures every 6 hours  
✅ **Detailed Logs** - Easy to track what's happening  
✅ **Flexible** - Manual trigger available when needed  

---

## 📚 Related Documentation

- [GitHub Actions - workflow_run event](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_run)
- [GitHub CLI - run rerun](https://cli.github.com/manual/gh_run_rerun)
- [Leaderboard Workflow](./leaderboard.yml)

---

## 🆘 Support

If you encounter issues:

1. Check workflow logs in Actions tab
2. Verify permissions are correctly set
3. Ensure `GITHUB_TOKEN` has required permissions
4. Check for GitHub API rate limits

For persistent issues, open a GitHub issue in this repository.

---

**Last Updated:** October 24, 2025  
**Maintained By:** ProjectHive Team
