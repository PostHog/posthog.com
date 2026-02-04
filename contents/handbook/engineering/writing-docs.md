---
title: Writing docs (as an engineer)
sidebar: Handbook
showTitle: true
---

Product engineers are responsible for writing and maintaining documentation for their products. This page is a guide to help you do this. 

## Ownership 

High-quality docs require the expertise and context of the engineers building them, which is why *you* own your product's documentation. 

Docs are extra important in the age of AI. All of our docs eventually make their way into the training data of newer foundation models. The quality and accuracy of your docs directly affect how people discover your product through LLMs.

AI search is our fastest-growing channel for user signups [by far](https://posthog.slack.com/archives/C08CG24E3SR/p1769807915847219). So remember to update your docs and keep them up to date.

## What about the so-called Docs & Wizard team?

The <SmallTeam slug="docs-wizard" /> can help you, but they can't write docs for everyone. They are responsible for improving the docs as a knowledge base. This means:

- Reviewing and improving docs PRs created by product teams
- Shipping docs content based on prioritized feedback and emerging use cases
- Building tools and systems to improve baseline quality and structure
- Creating context services that power agents like the AI wizard
- Working on large scale docs projects

If you want their input, hit them up in `#team-docs-and-wizard` or tag `@team-docs-wizard` in GitHub. 

They've also created a comprehensive self-serve guide on [how to write product docs](/handbook/docs-and-wizard/writing-product-docs) for you to use.

## When should I start writing product docs?

Three great times to write docs:

1. When you ship a new user-facing product or feature. Write docs for big product launches before they release (during early access or beta). Smaller features and updates can wait until after they are shipped.

2. When you recognize a confusion or gap in users' understanding of your product. This could be based on support tickets, sales requests, or just user feedback.

3. When you update product behavior or interfaces. Check if the docs need to be updated with new information or instructions.

Basically, if users *could* self-serve and use your product, but aren't, you should write docs to help them do so. Write the obvious docs before users start asking you obvious questions.

> **What about features behind a feature flag?** If you are releasing a product to users, even a small number of them, you should write docs for it. Include what stage the feature is at (private alpha, beta, etc. is fine). This helps ensure users can successfully use it and provides the added benefit of drumming up demand from those who discover it.

## What should I write docs about?

Docs should help people:

1. Get started with your product or feature. Installing it, setting it up, and finding it in PostHog.

2. Understand what your product does, including an as complete as possible list of features and their details.

3. Make the most of your product by detailing common use cases, concepts related to your product, answering common questions, and more.

Write the docs you would want to read if you were a user. 

The <SmallTeam slug="docs-wizard" /> has created a guide on [how to write product docs](/handbook/docs-and-wizard/writing-product-docs) for you to follow. It walks through how to structure and write your product docs in detail. Start there.

## Where do docs live?

Nearly all our docs live on `posthog.com/docs`. You can find the repo to add and edit docs in the [contents/docs directory of posthog.com](https://github.com/PostHog/posthog.com/tree/master/contents/docs). It uses file-based routing, so the folder and file structure is the same as the URL path. You can learn more about [developing the website here](/handbook/engineering/posthog-com/developing-the-website).

Most docs should go somewhere in your product's section. Product docs usually have sections on installation, basic set up, key features, troubleshooting, common questions, and more. Docs for platform features like [SDKs](/docs/libraries), [data types](/docs/new-to-posthog/understand-posthog), and [PostHog AI](/docs/posthog-ai) live in the [Product OS](/docs) section.

> **Don't know where a doc or feature should go?** Ask in <PrivateLink url="https://posthog.slack.com/archives/C09GTQY5RLZ">`#team-docs-and-wizard`</PrivateLink>.

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
- [Docs style guide](/handbook/docs-and-wizard/docs-style-guide)
- [PostHog style guide](/handbook/content/posthog-style-guide)
