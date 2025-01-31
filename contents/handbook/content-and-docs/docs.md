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
| **Overview**                    | Website & Vibes      |
| **Start here**                  | Lior                 |
| **SDKs and frameworks**         | Ian                  |
| **Reverse proxy**               | Ian                  |
| **Migrate**                     | Ian                  |
| **Data**                        | Danilo               |
| **HogQL**                       | Ian                  |
| **API**                         | Ian                  |
| **Alerts**                      | Bijan                |

### Products

| &nbsp                           | **Individual owner** |
|---------------------------------|----------------------|
| **Product analytics**           | Lior                 |
| **Web analytics**               | Bijan                |
| **Session replay**              | Bijan                |
| **Feature flags**               | Ian                  |
| **Experiments**                 | Lior                 |
| **Surveys**                     | Bijan                |
| **Data pipelines**              | Danilo               |
| **Data warehouse**              | Danilo                  |

## Docs style guide

First, you should start with two assumptions about our users:

1. They're busy and don't have time to read long docs.
2. They're not experts and don't know what we know.

This means our docs should be:

- As short and to the point as possible.
- Easy enough to understand so that a new user can read it and get what they need.

The below is a style guide for writing good docs based on the above assumptions. It's not exhaustive, but it's a good starting point.

### Wikipedia-style internal links

The first mention on a page of a PostHog term, feature, or SDK should link to its docs page.

> **Example:** "To create an [insight](/docs/product-analytics/insights), first [capture events](/docs/product-analytics/capture-events). Then, select the data you want to see and create an insight."

### Include examples for complex concepts

When explaining complex features or concepts, provide real-world use cases and examples. This makes it easier for our users to understand and apply the concept.

### Structure content for scannability

- Use short paragraphs (3-4 lines maximum)
- Use bullet points and numbered lists
- Break up long sections with subheadings
- Put the most important information first

### Link to PostHog app

You can also link to the PostHog app directly by using `https://us.posthog.com/${path}`. This saves time for our users and makes it easier for them to find what they need. Make sure to remove `project/2/` from the URL so it redirects them to their project. EU Cloud users are redirected automatically.

> **Example:** "To create an insight, first [capture events](/docs/product-analytics/capture-events). Then, go to the [insights tab](https://us.posthog.com/insights) and click **+ New insight**."

### Bold button and tab names

Put button, tab, and other navigation names in bold. This makes it easier for our users to skim through the docs, and it's cleaner than using quotes all the time.

> **Example:** "Go to the [insights tab](https://us.posthog.com/insights) and click **+ New insight**."

### The backtick is your friend

Remember to use backticks around inline code snippets, and triple backticks around multiline code samples.

### Follow the style standards of each programming language

In code samples, use the conventions of the language the code is written in.

For example, JavaScript uses `PascalCase` for class/constructor names, and `camelCase` for most other names. Python uses `PascalCase` for classes, and `snake_case` for most other names. And so on.

### Use snake case for PostHog events and properties.

Use `snake_case`, not `camelCase` or `PascalCase` for PostHog event and property names. For example:

```js
posthog.capture('user_signed_up', {
  user_id: '123',
  username: 'Jane Doe',
})
```

### Record videos

For flows with many steps, it's often more helpful to include a video instead of a screenshot. We use [Screen Studio](https://screen.studio/) to record videos. Feel free to buy yourself a license.

Use the following settings:
- [Preset](https://posthog.slack.com/archives/C01FHN8DNN6/p1729759474007969)
- Remove any zooming-in for clicks, as this can sometimes make videos hard to follow.
- For exporting: use MP4, 720, 60 fps, and "web" quality

## Docs gardener

Each week the content & docs crew picks someone to review the state of feedback across these channels:

- #docs-feedback
- #content-docs-ideas
- #ask-max for questions missing content
- Zendesk tickets [where **root cause** is `documentation unclear`](https://posthoghelp.zendesk.com/agent/filters/33465387985947)

Where appropriate and actionable, the gardener should create new issues to capture what surfaces from such feedback. This should occupy no more than 2-4 hours of effort each week.

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

