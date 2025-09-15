---
title: What nobody tells developers about documentation
date: 2025-04-17
author:
    - ian-vanagas
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/image_2_4ece7bbd84.png
featuredImageType: full
tags:
    - Engineering
crosspost:
    - Product engineers
    - Founders
    - Blog
---

Developers have a lot of misconceptions about docs:

1. Good software doesn’t need docs (it documents itself).

2. Docs aren’t my responsibility (it’s for the marketing or docs team).

3. It’s not as important as writing code (therefore I should never do it).

I’m here to give you a reality check. “Build it and they will come” is a lie.

Users don’t know what your product does, how to use it, or why they would use it. You need docs to explain this.

These misconceptions aren't your fault, though. The big reason they exist: most guides to writing docs suck. They are too conceptual, high-level, and aren’t written for busy engineers or founders. We’re changing that here.

## 1. It’s ok to start from the start

Nothing matters if users can’t use your product.

When users start with your product, you want them to go from “nothing” to “something” as quickly as possible. Don't worry about having perfect docs coverage.

Start by writing the most basic, obvious doc to help someone use your product. What would you send to a friend to help them get started with this feature?

If this means helping them [install and set up](/docs/getting-started/install) your product, do it. If this means teaching them the concepts [necessary to succeed](/docs/new-to-posthog/getting-hogpilled), do it. Either way, having a beginner’s mindset to your own product reveals the most important docs you need to write.

For example, our new [error tracking docs](/docs/error-tracking) have less content than our other products, but it does include the core of installation, monitoring errors, and viewing stack traces. This gives users enough to get started and we can build on it from there.

![Error tracking docs](https://res.cloudinary.com/dmukukwp6/image/upload/et_06fcae1c9c.png)

## 2. Good docs are not written in one day

Like a lot of writing, you expect your first draft to be a polished doc and become discouraged when that isn’t the case. You shouldn’t be. Polished docs aren’t the product of a single stroke of genius, but a result of iterative improvement.

Our Next.js doc [started](https://github.com/PostHog/posthog.com/pull/1842) as a simple page with one snippet for installing and another for capturing a custom event. Since then, it changed 49+ times to [the current version](/docs/libraries/next-js) with multiple install methods, details on app and pages routers, frequently asked questions, and more.

![Next.js docs](https://res.cloudinary.com/dmukukwp6/image/upload/next_a7b7c4bcce.png)

This iteration is guided by feedback. For us, this means reviewing:

1. Most popular docs to make sure they are up-to-date.

2. Replays of docs sessions to see user journeys and pain points.

3. Comments and questions on the docs page.

4. Issues raised by support or on GitHub.

5. Votes on whether docs pages were useful or not.

![Docs feedback](https://res.cloudinary.com/dmukukwp6/image/upload/unhelpful_fa64cf0139.png)

<Caption>Our most unhelpful docs 🙈</Caption>

We take time every week to review these and make improvements to docs. We also benefit from a huge amount of small fixes from [our community](/blog/github-cms).

It is the repeated little improvements that creates a coveted polished docs experience.

## 3. Your readers are in a rush

![Average book fan vs average docs enjoyer](https://res.cloudinary.com/dmukukwp6/image/upload/image_2_4ece7bbd84.png)

Reading a book is a leisurely activity. Reading docs is the opposite.

Docs readers are trying to get what they need and get back to work. Their goal could be figuring out if your product is a good fit, installing it for the first time, debugging an issue they’re having – anything, really.

You want to help them do this as fast as possible. Here’s what we’ve found most important for accomplishing this:

-   **Put the most important information first.** Get to the point. No overly long intros.

-   **Break up long sections** with subheadings for better scanability (like we do in this newsletter).

-   **Use short paragraphs** (3-4 lines maximum). Break up hard to read or overly long sentences. Avoid walls of text.

-   **Use bullet points and numbered lists** as these help readers know where they are and create a sense of progress.

-   **Hide less important information** behind `<details>` tags and let readers expand it if they want. Our metrics show these create higher engagement, especially for optional points that we tag as “recommended”.

-   **Add functional code samples**, annotated screenshots, graphics, and even memes. Visuals help keep readers’ attention and provide an alternative way to explain a concept.

When done well, docs don't look or read like a book. They have the variation and skimmability that helps readers find what they need fast.

![Bad vs rad docs](https://res.cloudinary.com/dmukukwp6/image/upload/badrad2_a41f1d04f9.png)

## 4. Focus on examples over abstractions

Developers live in a world of abstractions.

On a daily basis, we use ideas like synchronicity, security, immutability, reactivity, and frameworks to make these concepts comprehensible and practical.

A PostHog example of an abstraction is [user identification](/docs/product-analytics/identify). Basically, PostHog's way of associating events with a user.

A common mistake for documenting an abstraction like this is dumping everything in our head onto the page: explaining how identification works, how we process identified events, and why it's important.

The problem with this is that:

1. Abstractions are hard to transmit. Readers don’t have the context we do, and they don’t have the time or energy to create that context.

2. Users don't care so much about how we solve their problem, only that we actually solve it. We think about how problems are solved 1,000x more than they do.

Focusing too much on documenting concepts and abstractions can lead to docs that bore or confuse users instead of helping them. Docs should be a complement to a product's abstractions, not a replacement.

You can avoid this mistake by being as practical as possible. For us, this means focusing on implementation of user identification using `posthog.identify()` and providing code snippets you can use.

You don't even need to scroll to find the first one.

![User identification docs](https://res.cloudinary.com/dmukukwp6/image/upload/identify_6f203ab2e3.png)

Examples are a great way to make sure your docs are practical. Always try to show rather than tell. For example:

-   Show a JSON structure of a data type rather than giving a summary of it.

-   Show a screenshot or video of your UI rather than explaining its sections and buttons.

-   Show a diagram of a workflow rather than walking through its steps.

### When is the right time to explain abstractions?

It won't be obvious, but there will be signs:

1. [Technical decision-makers](/newsletter/choosing-technologies) asking for the “why” behind how things work.

2. Repeatedly explaining abstractions internally to new team members.

3. When sales or support is getting tired of explaining abstractions to customers.

## 5. Docs are a product too

This means ideas that apply to building a great product also apply to writing great docs.

1. **Focus on your users.** This means talking to them and asking what they want. It also means having empathy for their needs. An [ICP](/newsletter/ideal-customer-profile-framework) is useful for products, but it’s just as useful for writing docs.

2. **Prioritize what really matters.** Use [analytics](/web-analytics) to see what users are actually reading. Use [session replays](/session-replay) to see where they are getting stuck. Constantly evaluate what docs are most important to work on, so you maximize your impact.

3. **Invest in design and development.** The structure and navigability of your docs helps people find what they need. We're lucky to have a [Brand & Vibes](/teams/brand) to help us with this. They make the pages and components within those pages look good and work towards our goal.

4. **They require ownership.** You can’t expect something to improve if it’s no one’s responsibility to improve it. Product teams are required to contribute, but we also [keep a list](/handbook/content/docs) of the docs team members are responsible for.

5. **Culture makes a big difference.** Your product is a product of your culture and so is your docs. [Our values](/handbook/values) of being open source, everybody codes, trust and feedback over process, and biasing for action play a big role in how we write docs.

Just like any product, how people feel when reading your docs is an output of how well you’ve understood their needs. You have to treat documentation with the same care and rigor as everything else you ship.

This can seem like a chore, but remember: docs are where many customers fall in love with everything you’re shipping. Treating them with any less care is a disservice to what you’ve built.

## Great docs to take inspiration from

-   [Stripe](https://docs.stripe.com/?utm_source=posthog-newsletter) for its interactive elements, focus on examples, and connection between docs and product.

-   [Tailwind](https://tailwindcss.com/docs/?utm_source=posthog-newsletter) for its ability to layer progressively complex concepts and its huge number of examples for every class.

-   [Astro](https://docs.astro.build/en/getting-started/?utm_source=posthog-newsletter) for its step-by-step installation docs and getting started guide.

-   [HTMX](https://htmx.org/docs/?utm_source=posthog-newsletter) for its single page skim- and searchability

-   [ClickHouse](https://clickhouse.com/docs/?utm_source=posthog-newsletter) for its comprehensive reference docs and function explanations.

<NewsletterForm />
