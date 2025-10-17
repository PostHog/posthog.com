# Monorepo Docs PoC Setup Guide

> **Issue Reference:** PostHog/posthog#38584 - Create proof of concept for docs from `posthog` repo on `posthog.com` site

This branch contains the setup instructions and TODO checklist for integrating docs from the PostHog monorepo into posthog.com for the PoC (Proof of Concept).

## Overview

This PoC validates that:
1. Engineers can update docs alongside code in the posthog monorepo
2. A GitHub Action triggers a preview build when docs change
3. Vercel builds posthog.com with the monorepo docs included
4. Preview links are posted to PRs automatically

## PoC Architecture

The PoC serves monorepo docs at a separate path during validation:

```
/docs/                 ← Existing posthog.com docs (unchanged)
/docs-from-monorepo/   ← New monorepo docs (PoC path)
```

This allows side-by-side comparison without affecting production docs.

## Setup Checklist

### Phase 1: Vercel API Configuration (One-time, shared)

This setup allows the GitHub Action in posthog repo to trigger preview builds.

- [ ] **Generate Vercel Token**
  - Go to https://vercel.com/account/tokens
  - Create new token named "posthog-docs-preview"
  - Scope: Full access
  - Copy the token

- [ ] **Get posthog.com Project ID**
  - Go to https://vercel.com/posthog/posthog-com/settings/general
  - Find "Project ID" field
  - Copy the ID

- [ ] **Add Repository Secrets to PostHog/posthog**
  - Go to https://github.com/PostHog/posthog/settings/secrets/actions
  - Create new secret: `VERCEL_TOKEN` = (paste token from step 1)
  - Create new secret: `VERCEL_PROJECT_ID` = (paste project ID from step 2)
  - Optional: Create `VERCEL_TEAM_ID` if using team workspace

**Result:** GitHub Action can now call Vercel API to trigger deployments

### Phase 2: Gatsby Configuration (Frontend) - Safe, Zero-Breaking-Changes

- [ ] **Add Conditional Monorepo Docs Plugin**
  - Edit `posthog.com/gatsby-config.js`
  - Add this BEFORE the plugins array:
  ```javascript
  const fs = require('fs');
  const path = require('path');

  // Determine monorepo docs path
  const monorepoDocsPath = process.env.POSTHOG_REPO_PATH
    ? `${process.env.POSTHOG_REPO_PATH}/docs/published`
    : path.join(__dirname, '..', 'posthog', 'docs', 'published');

  // Only add plugin if path exists OR if env var is set (Vercel build)
  const monorepoDocsPlugin = fs.existsSync(monorepoDocsPath) || process.env.POSTHOG_DOCS_REF
    ? {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `monorepo-docs`,
          path: monorepoDocsPath,
          ignore: [`**/*.{png,jpg,jpeg,gif,svg,webp,mp4,avi,mov}`],
        },
      }
    : null;
  ```

  - Add to plugins array:
  ```javascript
  plugins: [
    // ... existing plugins
    monorepoDocsPlugin,
  ].filter(Boolean), // Remove null entries
  ```

  **Why this works:**
  - Local dev without monorepo: Plugin skipped, build succeeds ✅
  - Local dev with POSTHOG_REPO_PATH: Plugin activates ✅
  - Vercel with POSTHOG_DOCS_REF: Plugin activates ✅
  - No circular dependency! Can merge anytime!

- [ ] **Update gatsby-node.js for Path Routing**
  - In `createPages` function, add filter for monorepo docs:
  ```javascript
  // For monorepo docs, create pages at /docs-from-monorepo/ instead of /docs/
  const monorepoDocs = await graphql(`
    query {
      allMdx(filter: {
        fields: { sourceInstanceName: { eq: "monorepo-docs" } }
      }) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  // Create pages at /docs-from-monorepo/<slug>
  monorepoDocs.data?.allMdx?.edges?.forEach(({ node }) => {
    createPage({
      path: `/docs-from-monorepo${node.slug}`,
      component: docTemplate,
      context: {
        id: node.id,
      },
    })
  })
  ```

  **Adjust field names** to match your existing MDX query structure

### Phase 3: Prebuild Script Setup (Required for Vercel Preview)

- [ ] **Create Prebuild Script (Fault-Tolerant)**
  - Create `posthog.com/scripts/clone-monorepo-docs.js`
  - Safe: Won't break build if clone fails
  - Smart: Only runs if POSTHOG_DOCS_REF is set

  ```javascript
  const { execSync } = require('child_process');
  const path = require('path');
  const fs = require('fs');

  const docsRef = process.env.POSTHOG_DOCS_REF;

  // Skip if not set (normal production builds)
  if (!docsRef) {
    console.log('ℹ️ POSTHOG_DOCS_REF not set, skipping monorepo clone');
    process.exit(0); // Success - just skip
  }

  const monorepoDest = path.join(__dirname, '..', 'posthog');

  console.log(`📦 Cloning posthog at ${docsRef}...`);

  try {
    if (!fs.existsSync(monorepoDest)) {
      execSync(
        `git clone --depth 1 --single-branch --branch ${docsRef} https://github.com/PostHog/posthog.git ${monorepoDest}`,
        { stdio: 'inherit' }
      );
      console.log('✅ Monorepo docs ready');
    } else {
      console.log('ℹ️ Monorepo already cloned');
    }
  } catch (error) {
    // Don't fail - just log warning
    console.warn('⚠️ Failed to clone monorepo, continuing without it');
    console.warn(error.message);
    // Don't exit(1) - allow build to proceed
  }
  ```

  **Key safety features:**
  - Skips gracefully if POSTHOG_DOCS_REF not set ✅
  - Doesn't break build if clone fails ✅
  - Logs warnings for debugging ✅

- [ ] **Update package.json**
  - Add prebuild script:
  ```json
  {
    "scripts": {
      "prebuild": "node scripts/clone-monorepo-docs.js",
      "build": "npm run prebuild && gatsby build"
    }
  }
  ```

- [ ] **Update vercel.json**
  - Set custom build command and env:
  ```json
  {
    "buildCommand": "npm run build",
    "env": {
      "POSTHOG_DOCS_REF": "@PR_HEAD_REF"
    }
  }
  ```

  **How it works:**
  - `@PR_HEAD_REF` = Vercel automatically sets this to the PR branch
  - Prebuild script reads it and clones that branch
  - Conditional plugin activates (sees env var is set)
  - Gatsby loads docs from the cloned repo

### Phase 4: Testing & Validation

- [ ] **Local Testing**
  ```bash
  # Clone and setup both repos
  git clone https://github.com/PostHog/posthog.git ../posthog

  # Set env var
  export POSTHOG_REPO_PATH="../posthog"

  # Install and run
  pnpm install
  pnpm dev

  # Visit http://localhost:8000/docs-from-monorepo/test-preview
  ```

- [ ] **Verify Test Doc Renders**
  - Page should display at `/docs-from-monorepo/test-preview`
  - Check:
    - [ ] Page title displays: "Test Document - Docs Preview PoC"
    - [ ] Frontmatter parsed correctly
    - [ ] Markdown renders (bold, lists, code blocks)
    - [ ] Links to other docs work
    - [ ] Sidebar navigation appears

### Phase 5: PoC Validation with PR

- [ ] **Create Test PR in posthog**
  - In PostHog/posthog repo, create a PR with a doc change
  - GitHub Action should trigger automatically
  - Check PR for status comment

- [ ] **Verify GitHub Action**
  - Action should validate frontmatter ✅
  - Action should check for internal docs ✅
  - Action should attempt to trigger Vercel hook
  - Comment should appear on PR with status

- [ ] **Check Vercel Preview Build**
  - Look for Vercel deployment check in PR
  - Wait 1-2 minutes for build to complete
  - Click preview link to visit posthog.com preview

- [ ] **Test PoC Docs in Preview**
  - Navigate to `/docs-from-monorepo/test-preview`
  - Verify all content renders correctly
  - Test links to other migrated docs
  - Check sidebar navigation

### Phase 6: Production Integration (After PoC Validation)

- [ ] **Move Docs to Production Path**
  - Update gatsby-node.js to serve at `/docs/` instead of `/docs-from-monorepo/`
  - Coordinate with existing docs structure
  - Plan redirect strategy for users

- [ ] **Update Sidebar Configuration**
  - Add monorepo docs sections to main sidebar
  - Organize contributing, architecture, runbooks sections

- [ ] **Deploy to Production**
  - Merge changes to master
  - Monitor for any issues
  - Update documentation

## Important Notes

### Vercel Deploy Hook Behavior
- Deploy hook rebuilds current branch (usually `master`)
- Doesn't pass custom parameters directly
- Prebuild script + env var workaround clones specific branches
- For PoC, can manually trigger builds if needed

### Build Cache
- GitHub Action disables build cache with `?buildCache=false`
- Ensures fresh builds for testing
- Can be removed in production for faster builds

### Relative Paths
- posthog.com is at `../posthog.com`
- posthog monorepo is at `../posthog`
- Adjust paths if repos are in different locations

### Troubleshooting

**Docs not appearing:**
- Verify path in gatsby-config.js is correct
- Check frontmatter is valid YAML
- Ensure files are in `/docs/published/` directory
- Check sourceInstanceName filter in gatsby-node.js

**Build fails on Vercel:**
- Check Vercel logs for clone errors
- Verify git ref is valid
- Ensure prebuild script has proper error handling
- Check for missing npm dependencies

**Links broken:**
- Check relative link paths in markdown
- Verify files exist at expected paths
- Test with local build first

**Preview not triggering:**
- Verify `VERCEL_DOCS_PREVIEW_HOOK` secret is set
- Check GitHub Action logs for errors
- Ensure hook URL is correct and still valid
- Verify PR touches correct paths (`docs/published/**`)

## References

- **Main Issue:** PostHog/posthog#38584
- **Docs Structure:** `/docs/DOCS_MIGRATION_PLAN.md` in posthog monorepo
- **Build Guide:** `/docs/MONOREPO_DOCS_BUILD_GUIDE.md` in posthog monorepo
- **GitHub Action:** `.github/workflows/docs-preview-trigger.yml` in posthog monorepo
- **Test Doc:** `/docs/published/test-preview.md` in posthog monorepo

## Questions?

For questions about the PoC setup:
1. Check `/docs/MONOREPO_DOCS_BUILD_GUIDE.md` in posthog repo for detailed technical info
2. Review issue #38584 for context and discussions
3. See `/docs/published/README.md` for published docs guidelines

## Next Steps

1. **Vercel Hook Setup** (Infra) - 15 mins
2. **Gatsby Configuration** (Frontend) - 30 mins
3. **Prebuild Script** (Optional) - 20 mins
4. **Local Testing** (QA/Frontend) - 30 mins
5. **PoC Validation** (All) - 1 hour
6. **Production Integration** (Frontend) - 1-2 hours

**Estimated total time: 2-3 hours**

---

## Status Checklist

- [ ] All setup steps completed
- [ ] Local testing successful
- [ ] PoC validation passed
- [ ] Ready for production integration

Last updated: 2025-10-17
