---
title: Working with product design
sidebar: Handbook
showTitle: true
---

If your team doesn't have a dedicated designer, create an [issue](https://github.com/PostHog/posthog/issues), add the label `design`, and add it to the relevant team's project board. There's no need for a separate issue for the design request - just assign the relevant board. (This gives us full context of the problem.)

In the issue should be details about what you need from a product designer:

1. Have you provided sufficient context for the problem you're trying to solve?
2. Are there any technical constraints to be aware of?
3. Is there any user feedback or other qualitative data that can inform the problem?
4. How soon do you need a solution? Be explicit if you are or will be blocked without the design.
5. Do you have success criteria documented?

If there isn’t a clear deadline for your design request, we’ll prioritize according to our availability.

## Designers always offer "free consultations"
- This is especially true for teams without a dedicated Product Designer
- Syncing before starting a project is always strongly recommended. It helps us stay on the same page and makes sure we only step on each others toes (and not entire feet).
- Don’t feel like you _have_ to craft a solution yourself. (What might feel complicated to you might be a breeze for us, so don’t feel like you need to try to solve it first. If we might be able to save you hours of agony, a quick Zoom might be well worth it.)

## Conversations happen wherever it’s relevant, but design assets should always live in our [Figma org](https://www.figma.com/files/project/17131046/App?fuid=987006441684352800)
- Depending on a project’s stage, conversations might naturally occur in various places (Google Docs, issues, Figma comments, or pull requests). Given the ratio of designers to engineers, we’ll stick with this method for the foreseeable future.
- Regardless of where conversations happen, design decisions should make their way into finalized Figma mockups to serve as the single source of truth to inform implementation.
- All Figma assets should be shared back to the project via the GitHub issue. It's also fine to socialize changes via other channels, but documenting in GitHubis critical.

## Figma mockups > GitHub comments and issues
- Completed Figma mockups hold (almost) as much weight as pull requests. Documented designs in Figma should be considered the source of truth for implmentation. Any feedback (including GitHub comments) should make its way into mockups to be considered final.
- If effort goes into making a mockup and gathering feedback, as much effort as possible should go into making the final product look like the mock.

### When to loop in design

Because we hire self-starters, there is no expectation that every project should start by running through design _first_. If you are contributing to design, be sure to consult the [contribution guidelines](/handbook/company/contributing-to-product-design)

Depending on your preferred workflow, there are different ways we can get involved.

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
