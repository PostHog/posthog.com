---
date: 2023-01-16
title: "Array 1.43.0: HIGHLIGHTS"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ['Release notes', 'Product updates']
featuredImage: ../images/blog/posthog-array-blog.png
featuredImageType: full
---

Want to know more about what we're up to? Check out [our roadmap](/roadmap) to see what we're working on and what new beta features are available! You can also subscribe to [our Hogmail newsletter](/newsletter)!

## Update guide for self-hosted users

Any notes about async migrations, etc. go here.

## PostHog 1.43.0 release notes

**Release highlights:**

- [New: Item 1](#new-item-1)
- [New: Item 2](#new-item-2)
- [New: Item 3](#new-item-3)
- [Improved: Item 4](#improved-item-4)
- [Apps: Item 3](#apps-item-5)

### New: Item 1

@Karl to add a sentence or two here. 

### New: Item 2

@Karl to add a sentence or two here. 

### New: Feature flag variant overrides
Ever created a multivariate feature flag, and wanted to show the control variant to specific users? Or, maybe you found a new cohort you'd like to add to the test variant? Now you can!

1.43.0 adds the ability to  manually override variants via the flag edit screen. It's great for ensuring users get the experience you want, but is also useful for testing as it enables you to deterministically choose a variant, and test across client-side and server-side feature flags.

### Improved: More experiment variants and improved flow
A regular complaint used to be that, if you made a mistake while making an experiment, you couldn't go back to fix. Well, we fixed that so you can now:

1. Restart a running experiment while keeping everything the same and using the same feature flag key.
2. Change the main metric on a running experiment.
3. Change the secondary metrics on a running experiment.

Finally, as a bonus, you can now have up to nine variants in an experiment, instead of the usual three!

### Apps: Item 5

Joe to add stuff here. 

### Other improvements & fixes

You think that's it? Not by a long shot! Version 1.43 also adds hundreds of other improvements and fixes, including...

- **Improvement:** 
- **Improvement:** 
- **Fix:** Webhooks for actions with null checks weren't firing correctly. [This is now fixed.](https://github.com/PostHog/posthog/issues/12893)
- **Fix:** 

View the commit log in GitHub for a full history of changes: [`release-1.42.4...release-1.43.0`](https://github.com/PostHog/posthog/compare/release-1.41.4...release-1.42.0).

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

 Want to get involved? [Schedule a 30 minute call](https://calendly.com/posthog-feedback) with one of our teams to help us make PostHog even better!

## Contributions from the community
We always welcome contributions from our community and this time we want to thank the following people this month...

- @Ismaaa for [correcting some mistakes in our onboarding documentation](https://github.com/PostHog/posthog.com/pull/1840)
- @Johanholmerin for [fixing an issue when copying non-extensible objects](https://github.com/PostHog/posthog-js/pull/478)

Want to build with us? Check out our [contributing resources](/docs/contribute) to get started. We have a [list of Good First Issues](https://github.com/PostHog/posthog/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) for ideas on where you can contribute!

## Open roles at PostHog
We're currently hiring for remote candidates in the following role:

- [Full Stack Engineer - Experimentation Team](/careers/full-stack-engineer-experimentation)

Check out our [careers page](https://posthog.com/careers) for more info about our all-remote team and transparent culture. [You can also send a speculative application!](mailto:careers@posthog.com)

_Follow us on [Twitter](https://twitter.com/PostHog) or [LinkedIn](https://linkedin.com/company/posthog) for more PostHog goodness!_

<ArrayCTA />
