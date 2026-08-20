---
title: Should I open an issue or a PR?
sidebar: Handbook
showTitle: true
---

There are two ways to get a change into the website, depending on what you're changing.

**If you're only changing content, open a pull request. If you're changing how the site looks, behaves, or is built, open an issue.**

## Content changes: open a PR

- Writing or editing a blog post, doc, handbook page, tutorial, customer story, or newsletter
- Rewriting the copy on an existing page, including product and marketing pages.
- Page details like the title, tags, featured image, or SEO description
- Adding the page you just wrote to the sidebar
- Adding a redirect when you move a page you own
- Adding a customer story, a customer quote, or a row to a comparison table

See [Developing the website](/handbook/engineering/posthog-com/developing-the-website) for the mechanics and the [style guide](/handbook/content/posthog-style-guide) for how to write it.

## Everything else: open an issue

- Anything visual. Layout, spacing, sizes, colors, where things sit on the page.
- Anything about how the site behaves. Buttons, menus, dropdowns, windows, forms, search, navigation.
- A brand new page that isn't a post or a doc, or restructuring a page that already exists
- Bugs. Tell us and we'll take it from there.
- Removing or hiding a feature that's already live on the site
- Anything you'd normally expect an engineer or a designer to review

Rough test: if you couldn't have made the change without an AI agent writing it for you, an issue is the better route.

Use the [bug report template](https://github.com/PostHog/posthog.com/issues/new?template=bug-report.md) for something broken and the [website request template](https://github.com/PostHog/posthog.com/issues/new?template=website-request.md) for everything else. Include the URL, a screenshot or recording, what you expected, and what happened instead. Issues get triaged onto the [website project board](https://github.com/orgs/PostHog/projects/131).

Then let the website team pick the fix. It's often not the obvious one, and sometimes there isn't a problem to fix.

## If you've already opened a code PR

We'll probably close it and open an issue in its place so the idea doesn't get lost. That's not a comment on the work. The volume of website PRs is well past what the team can review, most of them are AI-generated, and when one gets merged that isn't quite right, it comes back to us later as something to fix.

If you think your change is an exception, ask in <PrivateLink url="https://posthog.slack.com/archives/C01V9AT7DK4">#team-website</PrivateLink> before you build it and we'll figure it out with you.

## If something's broken

Post in <PrivateLink url="https://posthog.slack.com/archives/C01V9AT7DK4">#team-website</PrivateLink>. A broken pricing page shouldn't wait for for triage.

## Contributing from outside PostHog

Same split, and thanks for the help! Content PRs are welcome and we'll review them. For anything else, open an issue with the [bug report template](https://github.com/PostHog/posthog.com/issues/new?template=bug-report.md). We'd much rather talk it through with you than close work you've already done.
