# Future GitHub Configuration & Setup Checklist

> **IMPORTANT NOTICE:**  
> This is a **local preparation guide only**. The project is currently not connected to GitHub, and no remote Git operations have been executed.  
> When the project owner decides to upload the project to GitHub, follow this checklist step by step.

---

## 📑 Table of Contents

- [1. Repository Metadata & Information](#1-repository-metadata--information)
- [2. File-Based Configurations vs. Web UI Settings](#2-file-based-configurations-vs-web-ui-settings)
- [3. Collaborator Access & Permission Roles](#3-collaborator-access--permission-roles)
- [4. Recommended Branch Protection Rules](#4-recommended-branch-protection-rules)
- [5. Repository Security & Alert Configuration](#5-repository-security--alert-configuration)
- [6. Step-by-Step Initial Setup Runbook](#6-step-by-step-initial-setup-runbook)

---

## 1. Repository Metadata & Information

When creating or configuring the GitHub repository, set the following metadata:

| Setting | Recommended Value | Notes |
|---|---|---|
| **Repository Name** | `smart-event-platform` or `event-smart` | Consistent naming convention |
| **Description** | `AI-Powered Multi-Sided Event Management, Recommendation & Logistics Marketplace Platform` | Professional summary for visitors and evaluators |
| **Visibility** | **Private** (during active capstone development) or **Public** (upon supervisor approval/defense) | Protects academic novelty before defense |
| **Default Branch** | `main` | Production-ready stable branch; all PRs target `main` directly |
| **GitHub Topics / Tags** | `event-management`, `marketplace`, `fastapi`, `nodejs`, `express`, `react`, `typescript`, `tailwind`, `socket-io`, `prisma`, `ai-recommendation`, `b2b2c`, `graduation-project` | Enhances project discoverability |

---

## 2. File-Based Configurations vs. Web UI Settings

Understanding the distinction between what is already prepared in the local codebase versus what must be configured manually on GitHub:

### A. Already Prepared Locally (Automated upon First Push)
These files reside in the project and GitHub will recognize them automatically once pushed:
- [x] Master Project README: [`README.md`](file:///d:/programming/laragon/www/event-smart/README.md)
- [x] Multi-Stack Git Exclusion Rules: [`.gitignore`](file:///d:/programming/laragon/www/event-smart/.gitignore)
- [x] Team Contribution & Git Workflow Guide: [`CONTRIBUTING.md`](file:///d:/programming/laragon/www/event-smart/CONTRIBUTING.md)
- [x] Team Code of Conduct: [`CODE_OF_CONDUCT.md`](file:///d:/programming/laragon/www/event-smart/CODE_OF_CONDUCT.md)
- [x] Security Policy & Reporting Standards: [`SECURITY.md`](file:///d:/programming/laragon/www/event-smart/SECURITY.md)
- [x] Pull Request Template: [`.github/PULL_REQUEST_TEMPLATE.md`](file:///d:/programming/laragon/www/event-smart/.github/PULL_REQUEST_TEMPLATE.md)
- [x] Issue Template for Bugs: [`.github/ISSUE_TEMPLATE/bug_report.md`](file:///d:/programming/laragon/www/event-smart/.github/ISSUE_TEMPLATE/bug_report.md)
- [x] Issue Template for Features: [`.github/ISSUE_TEMPLATE/feature_request.md`](file:///d:/programming/laragon/www/event-smart/.github/ISSUE_TEMPLATE/feature_request.md)
- [x] Issue Template for Tasks: [`.github/ISSUE_TEMPLATE/task.md`](file:///d:/programming/laragon/www/event-smart/.github/ISSUE_TEMPLATE/task.md)

### B. Must Be Configured via GitHub Web UI (Manual Steps Later)
These settings require repository administrator access through GitHub's web interface:
- [ ] Collaborator invitations and team permission assignment.
- [ ] Branch protection rules for `main`.
- [ ] Automated security features (Secret Scanning, Push Protection, Dependabot).
- [ ] Repository description, website URL, and topic tags.

---

## 3. Collaborator Access & Permission Roles

To maintain integrity and apply the principle of least privilege, assign permissions based on responsibilities:

| User Role | Recommended GitHub Permission | Assigned Responsibilities |
|---|---|---|
| **Project Owner / Supervisor** | **Admin** | Full repository governance, settings management, branch protection configuration, and license approvals. |
| **Team Lead / Release Manager** | **Maintainer** / **Write** | Triage issues, merge approved pull requests into `main`, manage milestones and releases. |
| **Developers (Frontend, Backend, AI, UI/UX)** | **Write** | Create feature branches, open pull requests, submit code reviews, create and manage issues. |
| **External Evaluators / Reviewers** | **Read** (or **Triage**) | View codebase, inspect documentation, submit review feedback without code push privileges. |

---

## 4. Recommended Branch Protection Rules

Branch protection ensures code quality and prevents accidental history loss. Configure these rules under **Settings $\to$ Branches** once on GitHub.

### Rule Set 1: For `main` (Production Branch)
- **Branch name pattern:** `main`
- [x] **Require a pull request before merging:**
  - Require approvals: **At least 1 approval** from Project Lead or Supervisor.
  - Dismiss stale pull request approvals when new commits are pushed.
  - Require review from Code Owners (if `CODEOWNERS` is established).
- [x] **Require conversation resolution before merging:** Ensures all review comments are addressed.
- [x] **Require linear history:** Encourages clean, squash-and-merge or rebase workflows.
- [x] **Do not allow bypassing the above settings:** Applies to administrators as well.
- [x] **Block force pushes:** Strictly prevent `git push --force`.
- [x] **Prevent branch deletion:** Protect against accidental deletion.
- *Note:* Enable "Require status checks to pass" and add `CI Status` as a required check now that `.github/workflows/ci.yml` is configured.

---

## 5. Repository Security & Alert Configuration

Configure these features under **Settings $\to$ Code security and analysis**:

1. **Dependency Graph:** Enable to allow GitHub to identify project dependencies.
2. **Dependabot Alerts:** Enable to automatically receive notifications when vulnerable npm or pip dependencies are detected.
3. **Dependabot Security Updates:** (Optional) Automatically generate pull requests to upgrade vulnerable dependencies.
4. **Secret Scanning:**
   - Available on public repositories and GitHub Enterprise / Team private repositories.
   - Enable to detect accidentally pushed tokens or API keys.
5. **Push Protection:**
   - Enable where available to block git pushes containing detected secrets before they reach the remote repository.

---

## 6. Step-by-Step Initial Setup Runbook

When the Project Owner gives explicit approval to proceed with GitHub integration, execute the following steps:

```bash
# -------------------------------------------------------------
# STEP 1: Verify Local Clean State
# -------------------------------------------------------------
# Ensure all files are saved and no unintended temporary files exist.

# -------------------------------------------------------------
# STEP 2: Initialize Local Git Repository (Future Step)
# -------------------------------------------------------------
git init -b main

# -------------------------------------------------------------
# STEP 3: Stage Prepared Local Files
# -------------------------------------------------------------
# The prepared .gitignore will automatically safeguard the repository.
git add .
git status

# -------------------------------------------------------------
# STEP 4: Create Baseline Initial Commit
# -------------------------------------------------------------
git commit -m "chore: initial repository preparation and documentation baseline"

# -------------------------------------------------------------
# STEP 5: Push to Remote
# -------------------------------------------------------------
# git push -u origin main

# -------------------------------------------------------------
# STEP 6: Connect Remote Repository
# -------------------------------------------------------------
# Replace with the actual URL provided by the owner:
# git remote add origin https://github.com/<owner>/smart-event-platform.git

# -------------------------------------------------------------
# STEP 7: Push Initial Branches
# -------------------------------------------------------------
# git push -u origin main

# -------------------------------------------------------------
# STEP 8: Web UI Configuration
# -------------------------------------------------------------
# 1. Open GitHub repository settings in browser.
# 2. Add repository topics and description.
# 3. Invite team members with appropriate roles.
# 4. Activate branch protection rules for 'main'.
# 5. Enable Dependabot security alerts.
```

> **Reminder:** Do not run these steps now. Local preparation is complete. Await explicit Project Owner instruction before running any Git commands.

