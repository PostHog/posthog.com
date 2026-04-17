# Vale

[Vale](https://vale.sh/) is a prose linter that enforces PostHog's writing style across the website: docs, blog posts, newsletters, and more. 

It catches spelling mistakes and style inconsistencies, like the unforgivable use of em dashes, based on rules we define.

It's managed by the Docs & Wizard team. See the [handbook](https://posthog.com/handbook/docs-and-wizard/vale) on how to update.

## Getting started

### Install Vale

```bash
brew install vale
```

### Run linting

```bash
pnpm vale:staged     # Lint md/.mdx files you have staged in git

pnpm vale contents/blogs/           # Lint a specific directory
pnpm vale contents/blog/my-post.md  # Lint a specific file
pnpm vale .                         # Lint current directory

pnpm vale:test       # Lint the .vale/test/ directory
```

For real-time linting in your code editor, install the [Vale VS Code extension](https://marketplace.visualstudio.com/items?itemName=chrischinchilla.vale-vscode).