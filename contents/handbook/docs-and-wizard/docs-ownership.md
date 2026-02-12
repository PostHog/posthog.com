---
title: Docs ownership
sidebar: Handbook
showTitle: true
---

**Product engineering teams** are responsible for [writing docs](/handbook/engineering/writing-docs) and ensuring they are up-to-date. This means:

- Documenting new features when they're launched
- Add doc comments to SDKs to make them easier to understand
- Clarifying documentation where needed based on support tickets
- Ensuring public betas have docs that are linked to from the feature preview menu

Read [writing docs as an engineer](/handbook/engineering/writing-docs) – it's really important! 

The <SmallTeam slug="docs-wizard" /> is responsible for improving the docs. This means:

- Reviewing and improving draft documentation created by product teams
- Improving the subjective docs experience (navigation, discovery, interactivity, etc.)
- Identifying and improving low quality documentation and making it better
- Ensuring screenshots and other visual elements are up-to-date
- Shipping supplementary docs and tutorials based on feedback and emerging use cases

## Ownership within the Docs & Wizard team

We've previously assigned ownership to areas of the PostHog platform and product docs to individuals, but we're presently more project orientated.

You can view what we're working on right now by:

1. Reading our goals on the <SmallTeam slug="docs-wizard" /> page
2. Dropping in on our `#team-docs-and-wizard` Slack channel

You can share ideas / requests for new docs in the `#team-docs-and-wizard` Slack channel, or by creating an issue on the posthog.com repo.

As ever, though, PRs > issues. ;) 

### Sources for inspiration

There are lots of places you can go to find inspiration for what to work on during your stint, such as:

- community questions
- open issues on our project board
- feedback in #brand-mentions
- #docs-feedback
- #content-docs-ideas
- #ask-max for questions missing content
- <PrivateLink url="https://posthoghelp.zendesk.com/agent/filters/33465387985947">Zendesk tickets where root cause is documentation unclear</PrivateLink>
- <PrivateLink url="https://portal.inkeep.com/posthog/projects/clz7fyu8i001bomqpr7t8lds8/chat/chat-sessions?filters={%22isOnTopic%22:%22yes%22,%22isClear%22:%22yes%22,%22firstMessageTime%22:%2230d%22,%22isDocumented%22:%22no%22}">Inkeep chat sessions</PrivateLink> where there is a documentation gap
- <PrivateLink url="https://us.posthog.com/project/2/insights/jNpQrgjg">Most unhelpful docs</PrivateLink>
- <PrivateLink url="https://us.posthog.com/project/2/insights/nfKr7JOs">Most popular docs</PrivateLink>
- that annoying thing you saw that you keep meaning to go fix

## FAQ

### I'm really busy, can the <SmallTeam slug="docs-wizard" /> team write docs for me?

We can help, but we can't do it all for you. We lack the context necessary to document new features. First drafts of documentation must always come from the relevant product team.

If you need help updating documentation:

- Write a draft that covers the basics, which the content team can then help review and polish.
- If multiple docs pages need updating, create an example of changes needed and then request help to complete the rest.

**Bottom line:** It's much easier for the content team to improve a draft than write completely new documentation, especially when documenting new features. Pull requests > Issues.

### Who should review docs updates?

Tag the `docs reviewers` team on GitHub and someone will come running.

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