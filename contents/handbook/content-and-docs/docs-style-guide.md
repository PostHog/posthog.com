---
title: Docs style guide
sidebar: Handbook
showTitle: true
---

First, you should start with two assumptions about our users:

1. They're busy and don't have time to read long docs.
2. They're not experts and don't know what we know.

This means our docs should be:

- As short and to the point as possible.
- Easy enough to understand so that a new user can read it and get what they need.

The below is a style guide for writing good docs based on the above assumptions. It's not exhaustive, but it's a good starting point.

## Wikipedia-style internal links

The first mention on a page of a PostHog term, feature, or SDK should link to its docs page.

> **Example:** "To create an [insight](/docs/product-analytics/insights), first [capture events](/docs/product-analytics/capture-events). Then, select the data you want to see and create an insight."

## Include examples for complex concepts

When explaining complex features or concepts, provide real-world use cases and examples. This makes it easier for our users to understand and apply the concept.

## Structure content for scannability

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