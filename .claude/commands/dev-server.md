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

6. Watch the server output, not the port. The server is ready when the output shows `You can now view`. If the process exits first, read the `ERROR #` block in its output and tell the user. A plain `ERROR` line without a number is only a warning.

7. If the server crashes or stops responding later, stop it and run `pnpm start` again. Use `pnpm clean` only if a restart does not fix it, because a clean start takes several minutes longer.

## Notes

- First run takes about 5 minutes for Gatsby to build. A restart takes 1-2 minutes
- If `pnpm start` says something is already running on the port, do not start a second server. Use the one that runs, or ask the user to stop it
- Don't use `pnpm build` locally - it runs out of memory on this large site
- If build fails with "Module not found" errors, try merging master first
