---
title: Writing docs (as an engineer)
sidebar: Handbook
showTitle: true
---

Product engineers are responsible for writing docs and making sure they are up to date. This page is a guide to help you do this. 

> **What about the so-called "content team"?** They are responsible for improving the docs. This means:
>
> - Reviewing and improving draft documentation created by product teams
> - Identifying and improving low-quality documentation
> - Shipping supplementary docs and tutorials based on feedback and emerging use cases
> - Working on large scale docs projects

## When should I write a doc?

Two great times to write docs:

1. When you ship a new user-facing product or feature. Write docs for big product launches before they release (during early access or beta). Smaller features and updates can wait until after they are shipped.

2. When you recognize a confusion or gap in users' understanding of your product. This could be based on support tickets, sales requests, or just user feedback.

Basically, if users *could* self-serve and use your product, but aren't, you should write docs to help them do so. Write the obvious docs before users start asking you obvious questions.

> **What about features behind a feature flag?** If you are releasing a product to users, even a small number of them, you should write docs for it. Include what stage the feature is at (private alpha, beta, etc. is fine). This helps ensure users can successfully use it and provides the added benefit of drumming up demand from those who discover it.

## What should I write docs about?

Docs should help people:

1. Get started with your product or feature. Installing it, setting it up, and finding it in PostHog.

2. Understand what your product does, including an as complete as possible list of features and their details.

3. Make the most of your product by detailing common use cases, concepts related to your product, answering common questions, and more.

Write the docs you would want to read if you were a user. 

## Where do docs live?

Nearly all our docs live on `posthog.com/docs`. You can find the repo to add and edit docs [here](https://github.com/PostHog/posthog.com/tree/master/contents/docs). It uses file-based routing, so the folder and file structure is the same as the URL path. You can learn more about [developing the website here](/handbook/engineering/posthog-com/developing-the-website).

Most docs should go somewhere in your product's section. Product docs usually have sections on installation, basic set up, key features, troubleshooting, common questions, and more. Docs for platform features like [SDKs](/docs/libraries), [data types](/docs/new-to-posthog/understand-posthog), and [Max AI](/docs/max-ai) live in the [Product OS](/docs) section.

> **Don't know where a doc or feature should go?** Ask in <PrivateLink url="https://app.slack.com/client/TSS5W8YQZ/C01FHN8DNN6">`#team-content`</PrivateLink>.

## What about internal docs?

If you can make something public, you should. Being open source is a core value of PostHog. We try to avoid "internal" docs as much as possible. 

If it deals with private information, like security, customer data, or competitor analysis, use one of our internal repos like <PrivateLink url="https://github.com/PostHog/product-internal">`product-internal`</PrivateLink>. 

You can learn more about this in the [communications handbook entry](/handbook/company/communication).

## How do I document code?

Code should be self-documenting. If it's complicated to figure out, you probably need to make it simpler. This is especially important for APIs and interfaces that other teams will interact with.

For cases where code isn't self-documenting or easy to understand, include a `README.md` file in the directory that is closest to the entry point of the code. 

This `README` should:
- Describe the general flow of interacting with the functions, but stop where the code starts to become self-documenting.
- Be short. If it's long, then your interfaces should be made simpler.

For an example, see the [PostHog AI `README`](https://github.com/PostHog/posthog/blob/master/ee/hogai/README.md).

## Further reading

- [What nobody tells developers about documentation](/newsletter/what-nobody-tells-devs-about-docs)
- [Docs style guide](/handbook/content-and-docs/docs-style-guide)
- [PostHog style guide](/handbook/content-and-docs/posthog-style-guide)