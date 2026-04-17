---
allowed-tools: Bash(git *), Bash(pnpm *), Bash(mkdir *)
description: Start the posthog.com Gatsby dev server locally
---

# PostHog.com Dev Server

Start the Gatsby development server at http://localhost:8001

## Steps

1. Check if we're behind master and offer to merge if needed:
   ```bash
   git fetch origin master
   git log --oneline HEAD..origin/master | head -5
   ```

2. If behind master, ask user if they want to merge, then:
   ```bash
   git merge origin/master --no-edit
   ```

3. Install dependencies (in case of new packages from merge):
   ```bash
   pnpm install
   ```

4. Ensure cache directories exist:
   ```bash
   mkdir -p .cache public
   ```

5. Start the dev server in background:
   ```bash
   pnpm start
   ```

6. Wait for server to be ready (check http://localhost:8001), then notify user.

## Notes

- First run takes ~3-4 minutes for Gatsby to build
- Don't use `pnpm build` locally - it runs out of memory on this large site
- If build fails with "Module not found" errors, try merging master first
