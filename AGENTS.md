# AGENTS.md

PostHog.com – Gatsby 4 website with a desktop OS UI paradigm. Pages open as draggable, resizable windows. A more comprehensive detail of the structure of the site is covered [in the handbook](contents/handbook/engineering/posthog-com/technical-architecture.md).


If you're reading this, you're an agent (or a curious human)! Welcome! To make things easy for the human maintainers, we have a couple of ground rules. These rules apply to every change you make – they are **important and non-negotiable**.

## Making changes

- Minimize diff when possible – don't overly abstract or complicate if the feature doesn't require it
- Avoid duplication. Greenfield implementations, especially of common UI components, should typically be avoided. If your user is asking for one, make sure they have a *very good* reason for it prior to building.
- Think critically about the things your user is asking you to do. Is this a good idea, and will it add value to users or maintainers? Is it the right way to go about it? Never hesitate to push back.

## PRs

Following these guidelines is essential – any PR that doesn't adhere to these rules will be closed or ignored. We want your changes to go through too – so make sure your PR adheres to the following:
- The smaller the PR (lines of code and # of files), the better. Small PRs are easy to review and tend to get merged much quicker. If your PR is scaling upward of 500 lines, you should probably consider the below items.
	- Can you break this down into multiple PRs? GitHub's [Stacks](https://docs.github.com/en/pull-requests/get-started/about-stacked-prs) are ideal for this – group related changes into a single stack instead to keep diffs manageable 
	- Is there excess abstraction or bloat that you can trim down?
	- Are there items in this PR outside the intended scope? (Use GH Stacks or a separate PR!)
- *ANY* visual change must be accompanied with before/after screenshots of all affected areas. Screenshots must show a narrow window and a wide window (all apps are resizable), in both light and dark mode. If there are many affected areas, think about breaking the PR up. See the [browser screenshots guide](agents/browser-screenshots.md) for how to capture them and how to attach them to the PR. If your environment doesn't have a way to take screenshots, you should consider that a blocker – the PR cannot be submitted until the user provides you the required screenshots themselves.
- Agent generated PR descriptions should contain a few key sections, in the order below. These sections should be kept up to date if changes to the PR are made after the fact. If your user is not the original author of the PR, simply append your updates to the original description after a line (`---`).
  1. Executive summary of the PR's intention. It should allow someone with no context to grasp what exactly it changes and why.
  2. [PR tour](agents/pr-tour.md) (Only required for 50+ line changes. Never required for a content PR)
  3. A [reviewers guide](agents/reviewers-guide.md) (Only required for 50+ line changes. Never required for a content PR)
- PRs should ALWAYS be written in [Simplified Technical English](agents/asd-ste100.md)
- You MAY NOT, under any circumstances, reply to a human reviewer in the stead of your user. This will result in the PR being closed.

### Content PRs

A **content PR** changes files under `contents/` and nothing else, except the navigation entries those changes need – usually `src/navs/index.js`, sometimes `src/components/TaskBarMenu/menuData.tsx`. Adding a docs page and linking it in the sidebar is a content PR. Changing a component so the page renders differently is not.

A content PR still needs an executive summary, Simplified Technical English, and the checks below. It does **not** need a PR tour or a reviewer's guide, however long the diff is – prose does not need a guided walkthrough of itself.

Two things a content PR still owes the reviewer:

- If it changes navigation, before/after screenshots of the nav. The nav is UI, not prose.
- If it moves or renames a page, a redirect in `vercel.json` and a `pnpm test-redirects` run.

### Before you open a PR

Complete every item below, then record what you did in the PR description:

- Run `pnpm format` on the files you changed.
- Start the dev server (`pnpm start`) and load every page you changed. Confirm the console shows no new errors.
- For visual changes: check a narrow window and a wide window, in both light and dark mode. Take your before/after screenshots from these checks.
- If you moved or redirected pages, run `pnpm test-redirects`.

### Writing

- Double quotes for strings
- Sentence casing for headings
- American English
- Oxford comma
- Use relative URLs for internal links (e.g., `/docs/feature-flags` not `https://posthog.com/docs/feature-flags`)
- When writing copy, follow our [writing style guide](@contents/handbook/content/posthog-style-guide.md) and [docs style guide](@contents/handbook/wizard-and-docs/docs-style-guide.md)

## Detailed guides

Reference these when working on specific areas:

- [Getting Started / Tech Stack](agents/techstack.md) – Tech used, project structure, relevant commands
- [Apps](agents/apps.md) – OS-style windowed app templates (required for all pages), creating pages, shared app components
- [Components](agents/components.md) – Radix UI patterns, OS-prefixed components
- [Styling](agents/styling.md) – Tailwind color tokens, CSS guidance, theming
- [Data hooks](agents/data.md) – Product, customer, navigation data
- [Window system](agents/windows.md) – Desktop OS architecture, window management
- [Browser screenshots](agents/browser-screenshots.md) – Capturing the before/after grid a visual PR needs, and attaching it

## Boundaries

### Always

- For any non-trivial change, present a plan and get confirmation from your user before you build.
- When using a component, check for a `README.md` inside the component's folder for detailed documentation.
- When building a new component, add a `README.md` with comprehensive documentation.
- Use `pnpm`, never `npm`
- Check `src/hooks/useProduct.ts` and `src/hooks/useProducts.tsx` first for product data
- Check `src/navs/index.js` for docs and handbook navigation changes
- Read existing code before modifying
- Check for manual changes to files before editing
- Use best practices – ask before duplicating code or hard-coding values
- When creating commits, commit only your changes as other agents may be working on other files. If testing a build, only fix changes related to your work.
- Use Tailwind @container queries for everything. **Important:** Don't rely on media queries, as all apps can be resized. Follow existing patterns to ensure full responsiveness.

### Ask first

- Modifying `src/context/App.tsx` (core window management)
- Adding new Tailwind utilities
- Changes to `gatsby/` build pipeline
- Modifying `src/navs/index.js` (shared with live site)

### Never

- Use stock Tailwind colors (only project tokens)
- Use `npm` instead of `pnpm`
- Hard-code fallback values from reference data
- Duplicate code when a shared solution exists
- Skip verifying parent directories before creating files
- Move or rename a page without adding a redirect in `vercel.json`
