# Internal link checks

`pnpm check-links-post-build` reads the built sitemap and HTML in `public/`. Run `pnpm build` first. The check parses Markdown and HTML links in `contents/`, including reference links, absolute PostHog URLs, and same-page anchors. It ignores frontmatter, code examples, comments, third-party domains, and authenticated PostHog app domains.

Redirects and rewrites use Vercel route patterns. The check follows internal targets and checks the final page and fragment. It reports redirect loops. Links that redirect to external sites are excluded. Sections served dynamically under community, teams, and careers retain their existing exclusions.

Anchors must exist in the built HTML. The check does not invent IDs from heading text. Links in shared snippets use the pages that import those snippets. Client-only sections can still require manual verification.

`pnpm check-src-links` applies the same URL and redirect rules to literal link properties, including JSX expressions and multiline values in `src/`. It checks page targets; it does not infer which page owns an anchor in a shared React component.

## Reports and exit codes

Pass an output directory to save `link-check.json` or `src-link-check.json`. Both commands exit with status 1 when they find broken links. The content check also fails for broken anchors. An execution error exits with status 2.

The workflow keeps full logs in files. It reads counts from the JSON reports for the job summary and the existing Slack payload. Missing or invalid reports produce an incomplete result, with unknown counts. Slack HTTP failures fail the notification step. Full scan output is never copied into the process environment.

Weekly and manual runs check all content and source files. PR runs check added or modified content and source files against the built site. This prevents unrelated old findings from blocking each edit. Page removals, renames, and redirect changes trigger a full scan. The scheduled full scan remains necessary to find incoming links to a heading changed elsewhere. PR runs do not send Slack notifications.

The manual `save_results` input controls artifact upload. Reports are still written locally because the summary needs them. The `send_slack_notification` input controls manual Slack notifications.

## Local checks

```sh
pnpm test:links
pnpm build
pnpm check-links-post-build link-check-results
pnpm check-src-links link-check-results
node scripts/link-check-report.js link-check-results
```

To check only changed files, append `--changed-from=<full-base-commit-SHA>` to either checker. The base commit must be available locally.
