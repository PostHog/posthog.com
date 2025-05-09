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

We aim to have a named individual for most areas of the docs. If one doesn't exist, make [a PR to add one](https://github.com/PostHog/posthog.com/blob/master/contents/handbook/content-and-docs/docs.md).

#### Product OS

| &nbsp                                   | **Individual owner** |
|-----------------------------------------|----------------------|
| **Integration (SDKs, frameworks, API)** | Ian                  |
| **Winning with PostHog**                | Danilo               |
| **PostHog explained (data, tools)**     | Danilo               |
| **Resources (migrate, reverse proxy)**  | Ian                  |

#### Products

| &nbsp                           | **Individual owner** |
|---------------------------------|----------------------|
| **Product analytics**           | Ian                  |
| **Web analytics**               | Andy                 |
| **Session replay**              | Ian                  |
| **Feature flags**               | Ian                  |
| **Experiments**                 | Ian                  |
| **Error tracking**              | Ian                  |
| **Surveys**                     | Andy                 |
| **LLM observability**           | Ian                  |
| **Data pipelines**              | Danilo               |
| **Data warehouse**              | Danilo               |

New products should be given an owner when we are planning the product launch.

### What is the responsibility of the docs owner?

For their assigned areas, docs owners are responsible for:

1. Using and being an expert on the parts of the product they own.
2. Reviewing and polishing docs created by product teams (or other contributors)
3. Working on issues assigned to them by the [docs gardener](#docs-gardener)
4. Planning and executing large docs overhauls and updates
5. Reviewing and answering questions on their assigned docs pages

This doesn't preclude anyone from submitting new or improved docs for any product – remember: PRs > issues.

Also, because of how wide PostHog is, this can be an overwhelming amount of work. Here's some recommendations on how to prioritize:

1. Make time to use the product, scroll the product team Slack, and read the docs. Reconcile glaring differences between them.
2. Check the most popular *and* unhelpful docs pages you are responsible for. Prioritize these. 
3. We care more about making sure everything has some coverage than a subset of things are 100% correct.

## Docs gardener

The docs gardener is a critical role for ensuring our docs are up to date and useful. We assign someone from the Content & Docs team to do this each week. Their responsibility is to:

1. Review the feedback across the channels below.
2. Create issues for docs updates with the context on why it's important and the source of the feedback (unless it is a very simple fix).
3. Assign the issue to the [docs owner](#ownership-in-content--docs-team).

It is then up to the assignee to prioritize and complete these issues.

Docs gardening should occupy no more than 2-4 hours of effort each week.

### Feedback channels

- #docs-feedback
- #content-docs-ideas
- #ask-max for questions missing content
- <PrivateLink url="https://posthoghelp.zendesk.com/agent/filters/33465387985947">Zendesk tickets where **root cause** is documentation unclear</PrivateLink>
- <PrivateLink url="https://portal.inkeep.com/posthog/projects/clz7fyu8i001bomqpr7t8lds8/chat/chat-sessions?filters={%22isOnTopic%22:%22yes%22,%22isClear%22:%22yes%22,%22firstMessageTime%22:%2230d%22,%22isDocumented%22:%22no%22}">Inkeep chat sessions</PrivateLink> where there is a documentation gap
- <PrivateLink url="https://us.posthog.com/project/2/insights/jNpQrgjg">Most unhelpful docs</PrivateLink>
- <PrivateLink url="https://us.posthog.com/project/2/insights/nfKr7JOs">Most popular docs</PrivateLink>

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