---
title: Working with Design
sidebar: Handbook
showTitle: true
---

Design is currently a shared resource at PostHog. This explains what we do, our design process, and how we can assist across the PostHog team.

## Design's Role at PostHog

1. Support Small Teams (and contributors) in building better versions of PostHog
1. Enable customers to build better products (using PostHog)
1. Communicate to prospective customers the value we provide

### Tangibly, we:

1. Initiate new projects to support the roles listed above
1. Support Small Teams in completing their sprint tasks
1. Iterate based on feedback from customers

## Our Process

Design tasks are managed with our [GitHub Org project](https://github.com/orgs/PostHog/projects/3), otherwise known as our Design Board. This aggregates design-related tasks from the main three repositories for the company:

1. [PostHog app](https://github.com/PostHog/posthog) - open source repo
1. [posthog.com](https://github.com/PostHog/posthog.com) - website + docs
1. Internal - higher-level company strategy

### How Our Design Board Works

Cards generally move from left to right.

1. **Backlog** - Things on our radar, and where triaged requests will land unless they're urgent enough to pick up immediately
1. **This week** - Equivalent of our sprint
1. **In progress** - Tasks we've started but haven't completed
1. **Awaiting implementation** - In development or in review
1. **Done** - Shipped! 🚀

## Design Request Process

Since design is currently a shared resource, the best way design requests can be handled is by creating an issue in the relevant repository, then adding to the _Design_ project.

![image](https://user-images.githubusercontent.com/154479/114764251-b759b500-9d31-11eb-9767-c9fd9aad25b2.png)

After triaging, the Issue will appear in our [GitHub Org project](https://github.com/orgs/PostHog/projects/3) where we manage our current design projects.

The following details will help us triage incoming requests:

1. What do you need designed and why?
1. What is the deadline?

**Note:** We may defer some design requests if we're planning a larger overhaul in the near term. For example, if a request is to create an icon, we may suggest an alternate solution (like pulling an icon from The Noun Project) if we have a larger plan for revamping all icons in a section in the near future.

### When to Loop in Design

Because we hire self-starters, there is no expectation that every project should start by running through design _first_.

Depending on your preferred workflow, there are different ways we can get involved.

When looping in design, be sure to reference a GitHub issue so we have full context of the problem. Threads should primarily be kept on GitHub. (If an Issue is time-sensitive, mention the Issue on Slack in `#design-feedback`.)

_The scenarios below largely pertain to work on the main PostHog app._

**If you built something and just need some polish...**

Feel free to share a link (or screenshot) of what you've built. We can provide UX or design feedback for your consideration.

**If you built something and realize it needs some UX love...**

Share a link (or screenshot) of what you've built. Depending on the state of the project, we can either go back to the wireframe stage to rethink some things, or figure out a phased approach to incremental improvement.

**If you designed your own wireframes or mocks...**

Sometimes if you have domain knowledge or have been thinking about a project for a while, it might make more sense for you to start the design process. Feel free to share with us for a second opinion, or if you think certain UIs or flows are suboptimal.

**If you'd like some design help before you break ground...**

More like a typical product development process, please share the high level goals or spec, or any other documentation you have about a feature or enhancement. Be sure to specify the line between MVP and nice-to-haves.

**Need help brainstorming a flow?**

Provide as much documentation about the goals of the project. Depending on the project, we may be able to sketch out some ideas and share in the GitHub issue.

In some cases, it may make sense to jump on a Zoom to sketch out some ideas together.

## Sharing work in progress

We often share designs in early, unfinished phases. Since our audience is developer-friendly, we have a built-in audience to gut check our designs and solicit feedback.

When providing feedback, it's worth keeping in mind the level of fidelity of the mockup we're sharing for feedback.

### Wireframes

If an early draft is being shared, we'll build a wireframe in Balsamiq. At this stage, we're mostly focused on laying out content, crafting messaging, and loosely tying in a visual hierarchy and layout. (Don't look too closely at fonts, specific colors, or visualizations - those come later.)

_Note: Balsamiq uses its own Comic Sans-style font. Don't get hung up on this!_

![image](https://user-images.githubusercontent.com/154479/114972248-2b887b80-9e4c-11eb-92fe-bce7bf14c808.png)

### Mockups

Once a design is laid out, we'll move into hi-fidelity mockups built in Figma. This process usually takes a few rounds to perfect, and we often iterate up until the moment the design is passed off for development.

### Providing feedback

We typically share links to mockups in the relevant GitHub Issue.

When we share a design, we do our best to explain the type of feedback we're looking for. (Ex: Overall visual aesthetic, flow, if a design communicates to our developer-focused audience, etc.)

Our main design tools, Balsamiq and Figma, both have built-in commenting. If your feedback is specific to an element on the page, please leave a comment inside the app's comment system. This helps us review and take action on comments later.

If your feedback is higher level, summarize your feedback in the GitHub Issue itself for a higher-level discussion.

## Slack

We often use the `#design-feedback` Slack channel to share updates when we're particularly interested in feedback. We'll always link to the relevant place for discussion. (It's best to keep direct feedback off of Slack.)

This Slack channel isn't limited to the design team. If you're looking for a second opinion on the UX of something you're building, we encourage anyone to share screenshots and a link to Figma or wherever the mockup was produced so we can provide useful feedback or assist in iterating on a design.

If the design requires further collaboration, create an Issue.
