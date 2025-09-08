---
title: Docs ownership
sidebar: Handbook
showTitle: true
---

**Product teams** are responsible for [writing docs](/handbook/engineering/writing-docs) and ensuring they are up-to-date. This means:

- Documenting new features when they're launched
- Add doc comments to SDKs to make them easier to understand
- Clarifying documentation where needed based on support tickets
- Ensuring public betas have docs that are linked to from the feature preview menu

Read [writing docs as an engineer](/handbook/engineering/writing-docs) – it's really important! 

**The content team** is responsible for improving the docs. This means:

- Reviewing and improving draft documentation created by product teams
- Improving the subjective docs experience (navigation, discovery, interactivity, etc.)
- Identifying and improving low quality documentation and making it better
- Ensuring screenshots and other visual elements are up-to-date
- Shipping supplementary docs and tutorials based on feedback and emerging use cases

## Ownership in the content team

We've previously assigned ownership to areas of the product and docs to individuals, but we're presently more project orientated.

You can view what we're working on right now by:

1. Reading our goals on the [content team page](/teams/content)
2. Reading issues on our [team GitHub project board](https://github.com/orgs/PostHog/projects/107/views/1)

You can share ideas / requests for new docs in the #content-docs-ideas Slack channel, or by creating an issue on the posthog.com repo.

As ever, though, PRs > issues. ;) 

## Docs hero

Each week, the assigned docs hero will set aside two days to ship fixes and improvements to the docs anywhere they can find them. The rotation schedule can be found <PrivateLink url="https://docs.google.com/spreadsheets/d/1XPhjb5lPPisiiSrhA5qW-DqgIN7DvvWtj1czkUqOwZw/edit?gid=0#gid=0">here</PrivateLink>.

The docs hero role exists to ensure we continue to ship ongoing improvements to the docs outside of specific projects we're working on.

Some notes and tips: 

- Four people (<TeamMember name="Edwin Lim" photo={true} />, <TeamMember name="Ian Vanagas" photo={true} />, <TeamMember name="Lior Neu-ner" photo={true} />, and <TeamMember name="Vincent Ge" photo={true} />) are currently in the rotation. This means two days in every 20 working days will be dedicated to the docs hero role – 10% of your time. This will reduce as we add more people to the team.

- It's up to individuals to decide how to spend their two days. You can spend it shipping one or two things, or shipping a dozen small improvements. The only requirement is you should work on things you can ship in those two days. Work should not carry over into other days, or future docs hero stints.

- Feel free to create issues about problems you find that are too big to deal with in a couple of days, but **most of your time should be spent on shipping** updates, not triaging requests.

- Tutorials count as well.

- Talk to your teammates and update the <PrivateLink url="https://docs.google.com/spreadsheets/d/1XPhjb5lPPisiiSrhA5qW-DqgIN7DvvWtj1czkUqOwZw/edit?gid=0#gid=0">rotation schedule</PrivateLink> if you need to swap weeks.

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

### I'm really busy, can the content team write docs for me?

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