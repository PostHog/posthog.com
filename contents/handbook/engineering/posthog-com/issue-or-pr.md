---
title: Should I open an issue or a PR?
---

The website team is unusual in that ~60% of the PRs we merge are authored by people outside the team - and that's excluding Docs, Blog, and the Handbook. We try hard to balance shipping our own stuff with not blocking others who also rely on the website to do their job. We have set up some light guardrails because we tend to see AI-generated PRs that are either 'wrong' (not enough context to prompt correctly; LLMs just not great yet at the frontend design-y stuff), or fine but very low impact yet take time to review.

There are three ways to get a change into the website, depending on what you're changing.

- Adding or changing content? Default to PR
- Adding or changing something that's fairly isolated? Use your judgement
- Anything else, including bugs? Open an issue

Specific examples below. These are not exhaustive, so don't get hung up on exact wording - ask us if you're not sure!

## Content changes: open a PR

- Writing or editing a blog post, doc, handbook page, tutorial, customer story, or newsletter.
- Rewriting the copy on an existing page, including product and marketing pages.
- Page details like the title, tags, featured image, or SEO description.
- Adding the page you just wrote to the sidebar.
- Adding a redirect when you move a page you own.
- Adding a customer story, a customer quote, or a row to a comparison table.

See [Developing the website](/handbook/engineering/posthog-com/developing-the-website) for the mechanics and the [style guide](/handbook/content/posthog-style-guide) for how to write it.

## Fairly isolated changes: use your judgement

- A new page that is for a specific marketing campaign, i.e. doesn't live in the main nav anywhere.
- A new Product page where you are following the existing template.
- Small changes where you have properly reviewed the output, checked preview, and understand the change.

If you are on a team that regularly works on the website and understand the context of how it works (typically folks on marketing and growth teams), it's usually fine to start with a PR in these cases.

If you aren't and/or your PR is a noscope one line prompt from PostHog Slack without any followup, you're probably in issue territory!

## Everything else: open an issue

- Any size change that affects the Home or Pricing pages - these are our two most important pages by a long, long way and we very carefully watch metrics there.
- Creating or restructuring an existing page that is linked to from the main nav.
- Anything visual that affects multiple pages. Layout, spacing, sizes, colors, where things sit on the page.
- Anything about how the site behaves. Buttons, menus, dropdowns, windows, forms, search, navigation.
- Bugs. Tell us and then let us pick the fix, as it's often not the obvious one LLMs go for (and sometimes there isn't a problem to fix). 
- Removing or hiding a feature that's already live on the site.

Use the [bug report template](https://github.com/PostHog/posthog.com/issues/new?template=bug-report.md) for something broken and the [website request template](https://github.com/PostHog/posthog.com/issues/new?template=website-request.md) for everything else. Include the URL, a screenshot or recording, what you expected, and what happened instead. Issues get triaged onto the [website project board](https://github.com/orgs/PostHog/projects/131).

## If you open a PR we think is better as an issue

We'll close it and open an issue in its place so the idea doesn't get lost. That's not a comment on the work, nor a lack of gratitude for your effort! The volume of website PRs is well past what the team can provide feedback on, most of them are AI-generated, and when one gets merged that isn't quite right, it comes back to us later as something to fix.

If you think your change is an exception, ask in <PrivateLink url="https://posthog.slack.com/archives/C01V9AT7DK4">#team-website</PrivateLink> before you build it and we'll figure it out with you.

## If something's broken

Post in <PrivateLink url="https://posthog.slack.com/archives/C01V9AT7DK4">#team-website</PrivateLink>. A broken pricing page shouldn't wait for triage.

## Contributing from outside PostHog

Same split, and thanks for the help! Content PRs are welcome and we'll review them. For anything else, open an issue with the [bug report template](https://github.com/PostHog/posthog.com/issues/new?template=bug-report.md). We'd much rather talk it through with you than close work you've already done.
