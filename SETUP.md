# ARCBank — Project Setup Guide

This document records the full step-by-step setup process for the ARCBank project, from installing tools to pushing the first commit to GitHub. Useful as a reference for setting up on a new machine, or for anyone else trying to run this project.

---

## 1. Prerequisites Installed

| Tool | Version | Purpose |
|---|---|---|
| Java (JDK) | 21 LTS (Eclipse Temurin) | Backend — Spring Boot |
| Node.js | v24.21.0 (LTS) | Frontend — required for Angular CLI/npm |
| npm | 11.19.0 | Package manager (comes with Node.js) |
| Angular CLI | 22.1.8 | Scaffolding and running the Angular frontend |
| Git | (via IntelliJ / Windows) | Version control |
| IntelliJ IDEA | Community Edition | Code editor / IDE |

---

## 2. Install Java (JDK 21)

1. Downloaded and installed **JDK 21 LTS** (Eclipse Temurin build).
2. Verified installation:
   ```
   java -version
   ```
   Output confirmed: `java version "21.0.12" 2026-07-21 LTS`

---

## 3. Install Node.js

1. Went to [nodejs.org](https://nodejs.org).
2. Downloaded the **LTS version** (v24.21.0) — not "Latest Release" — for stability.
3. Ran the `.msi` installer with default settings.
4. Left **"Tools for Native Modules"** checkbox **unchecked** (not needed for this project).
5. Closed and reopened Command Prompt/PowerShell (required for PATH to refresh).
6. Verified installation:
   ```
   node -v
   npm -v
   ```
   Output: `v24.21.0` and `11.19.0`

---

## 4. Install Angular CLI

1. Ran:
   ```
   npm install -g @angular/cli
   ```
2. Verified installation:
   ```
   ng version
   ```
   Output confirmed Angular CLI 22.1.8, Node 24.21.0, npm 11.19.0.

---

## 5. Create the Project Folder Structure

Best practice: keep code projects in a dedicated folder outside Desktop/Downloads/OneDrive-synced folders (to avoid sync conflicts and path issues).

```
cd C:\Users\salve
mkdir Project
cd Project
mkdir ARCBank
cd ARCBank
```

This created:
```
C:\Users\salve\Project\ARCBank\
```

This is the **monorepo root** — will eventually contain both `ARCBank-frontend` (Angular) and a `backend` folder (Spring Boot microservices).

---

## 6. Generate the Angular Project

Ran:
```
ng new ARCBank-frontend
```

Prompts answered:
- **Share pseudonymous usage data with Angular Team?** → Yes
- **Stylesheet format?** → Sass (SCSS)
- **Enable Server-Side Rendering (SSR) and Static Site Generation (SSG)?** → No
  - *Reason: ARCBank is a logged-in banking dashboard, not public/SEO-facing content. SSR would add unnecessary complexity and even introduces known security risks (cached credentialed data) that aren't worth it for an authenticated app.*
- **Which AI tools should Angular integrate with?** → None

This created:
```
C:\Users\salve\Project\ARCBank\ARCBank-frontend\
```

### Fixing a Git identity error during setup
Angular CLI tried to auto-initialize Git and make a first commit, but failed with:
```
fatal: unable to auto-detect email address
```
This didn't stop the project from being created — it only skipped Git's automatic first commit. (This also silently created a **nested `.git` folder** inside `ARCBank-frontend`, which caused problems later — see Section 9.)

---

## 7. Generate Initial Components

From inside `ARCBank-frontend`, generated placeholder components matching the planned folder structure:

```
ng generate component features/auth/login
ng generate component features/auth/register
ng generate component features/dashboard
ng generate component features/accounts
ng generate component features/transactions
ng generate component features/admin
```

Each command created 4 files per component (`.ts`, `.html`, `.scss`, `.spec.ts`) inside `src/app/features/...`.

---

## 8. Set Up Routing

Edited `src/app/app.routes.ts`:

```typescript
import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Dashboard } from "./features/dashboard/dashboard";
import { Accounts } from "./features/accounts/accounts";
import { Transactions } from "./features/transactions/transactions";
import { Admin } from "./features/admin/admin";

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard },
    { path: 'accounts', component: Accounts },
    { path: 'transactions', component: Transactions },
    { path: 'admin', component: Admin }
];
```

Tested by running:
```
ng serve
```
Confirmed all routes worked: `/login`, `/dashboard`, `/accounts`, `/transactions`, `/admin`.

**Note:** must run `ng serve` from inside `ARCBank-frontend` (where `angular.json` lives), not from the `ARCBank` root.

---

## 9. Set Up Git and Push to GitHub

### Initialize Git at the project root (not inside ARCBank-frontend)
```
cd C:\Users\salve\Project\ARCBank
git init
```

### Fixing the nested repo issue
Since `ng new` had silently created a `.git` folder inside `ARCBank-frontend`, `git add .` from the root failed with:
```
error: 'ARCBank-frontend/' does not have a commit checked out
```
Fixed by removing the nested repo:
```
cd ARCBank-frontend
Remove-Item -Recurse -Force .git
cd ..
```

### Add a .gitignore (created at the ARCBank root)
```
# IDE
.idea/
.vscode/

# Node / Angular
node_modules/
dist/
.angular/

# OS files
.DS_Store
Thumbs.db

# Environment files
.env
```

### Stage and commit
```
git add .
git commit -m "Initial commit: Angular frontend setup with routing"
```

### Create the GitHub repository
- Created on GitHub.com under account **Arcadio-rojo**, named **ARCBank**
- Left **README, .gitignore, and license all unchecked/off** during creation
  - *Reason: GitHub would otherwise create its own initial commit, causing a conflict with the local commit history already created — leading to a failed or messy push.*

### Connect and push
```
git remote set-url origin https://github.com/Arcadio-rojo/ARCBank.git
git branch -M main
git push -u origin main
```

---

## 10. Planned Next Steps

- Build shared layout (navbar + sidebar) wrapping all pages
- Build out each page's actual UI using mock/hardcoded data
- Set up backend: `auth-service`, `api-gateway`, `account-service`, `transaction-service`, `notification-service` (Spring Boot)
- Connect each backend service to its own PostgreSQL database
- Replace frontend mock data with real API calls
- Track all tasks via GitHub Issues + Project board, organized by weekly Milestones

---

## Lessons Learned / Troubleshooting Notes

| Issue | Cause | Fix |
|---|---|---|
| `git add .` fails with "does not have a commit checked out" | Nested `.git` folder inside a subfolder (auto-created by `ng new`) | Delete the nested `.git` folder, keep only one at the project root |
| `git push` fails with "Repository not found" | Tried pushing before creating the repo on GitHub.com | Create the repo on GitHub first, then push |
| Git asks to set identity | Global Git email/name never configured on this machine | `git config --global user.email "..."` and `git config --global user.name "..."` |
| `dir /a` fails in PowerShell | That flag is Command Prompt syntax, not PowerShell | Use `dir -Force` in PowerShell instead |
