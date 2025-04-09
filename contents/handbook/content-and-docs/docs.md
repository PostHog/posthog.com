---
title: Docs ownership
sidebar: Handbook
showTitle: true
---

**Product teams** are responsible for ensuring their docs are up-to-date. This means:
  - Documenting new features when they're launched
  - Correcting mistakes reported by users
  - Clarifying documentation where needed based on support tickets
  - Ensuring public betas have documentation which is linked to from feature preview menu

**Content & Docs** is responsible for improving the docs. This means:
  - Reviewing and improving draft documentation created by product teams
  - Identifying and improving low quality documentation
  - Ensuring screenshots and other visual elements are up-to-date
  - Shipping supplementary docs and tutorials based on feedback and emerging use cases

**Website & Vibes** is responsible for design, organization, and discovery. This means:
  - The design and content of index pages
  - The overall layout of docs and how they're organized
  - In-page elements and components – e.g. light and dark mode screenshots
  - Website search and other elements that help users find the answers they need

## Ownership in Content & Docs team

We aim to have a named individual for most areas of the docs. Docs owners are responsible for:

- Reviewing and polishing docs created by product teams 
- Ongoing maintenance of those docs
- Improving docs based on user feedback / suggestions from the support team
- Fixing 404s and reviewing to community docs PRs
- Managing questions on docs pages (e.g. archiving stale questions, ensuring relevant ones are answered, marking comments as solutions)

This doesn't preclude anyone from submitting new or improved docs for any product – remember: PRs > issues

### Product OS

| &nbsp                           | **Individual owner** |
|---------------------------------|----------------------|
| **SDKs and frameworks**         | Ian                  |
| **Reverse proxy**               | Ian                  |
| **Migrate**                     | Ian                  |
| **Data**                        | Danilo               |
| **SQL**                         | Ian                  |
| **API**                         | Ian                  |

### Products

| &nbsp                           | **Individual owner** |
|---------------------------------|----------------------|
| **Product analytics**           | Ian                  |
| **Web analytics**               | Andy                 |
| **Session replay**              | Ian                  |
| **Feature flags**               | Ian                  |
| **Experiments**                 | Ian                  |
| **Surveys**                     | Andy                 |
| **Data pipelines**              | Danilo               |
| **Data warehouse**              | Danilo               |

### Docs gardener

Each week the Content & Docs crew picks someone to review the state of feedback across these channels:

- #docs-feedback
- #content-docs-ideas
- #ask-max for questions missing content
- Zendesk tickets [where **root cause** is `documentation unclear`](https://posthoghelp.zendesk.com/agent/filters/33465387985947)
- [Inkeep chat sessions](https://portal.inkeep.com/posthog/projects/clz7fyu8i001bomqpr7t8lds8/chat/chat-sessions?filters={%22isOnTopic%22:%22yes%22,%22isClear%22:%22yes%22,%22firstMessageTime%22:%2230d%22,%22isDocumented%22:%22no%22}) where there is a documentation gap

Where appropriate and actionable, the gardener should either:

1. Submit a new PR to solve easy to fix problems.
2. Create new issues to capture feedback that needs actioning.

We'll triage any new issues during our weekly sprint meeting. This should occupy no more than 2-4 hours of effort each week.

## FAQ

### I'm really busy, can the content team write docs for me?

We can help, but we can't do it all for you. We lack the context necessary to document new features. First drafts of documentation must always come from the relevant product team.

If you need help updating documentation:

- Write a draft that covers the basics, which the content team can then help review and polish.
- If multiple docs pages need updating, create an example of changes needed and then request help to complete the rest.

**Bottom line:** It's much easier for the content team to improve a draft than write completely new documentation, especially when documenting new features. Pull requests > Issues.

### Who should review docs updates?

Tag the individual owner from the Contents & Docs team – see [Ownership in Contents & Docs](#ownership-in-content--docs-team) below.

### How do I add images to my docs?

If you need to add images to your docs, please [upload them to Cloudinary first](/handbook/engineering/posthog-com/assets) and then embed them into the document. 

You can embed light mode and dark mode versions of the image using this code snippet:

```jsx
<ProductScreenshot
  imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/add_holdout_light_ce0827be42.png"
  imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/add_holdout_dark_cc687f7688.png"
  classes="rounded"
  alt="Screenshot of the form to create a new holdout"
/>
```