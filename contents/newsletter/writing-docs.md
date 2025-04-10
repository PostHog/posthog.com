---
title: What nobody tells developers about documentation
date: 2025-04-03
author:
 - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/cry_1f2c8fb885.png
featuredImageType: full
tags:
  - Engineering
crosspost:
  - Product engineers
  - Founders
  - Blog
---

There’s a lot of misconceptions about docs:

1. Good software doesn’t need docs (it documents itself).
2. Docs aren’t my responsibility (it’s for the marketing or docs team).
3. It’s not as important as writing code (therefore I should never do it).

I’m here to give you a reality check. “Build it and they will come” is a lie. Users don’t know what your product does, how to use it, or why they would use it. You need docs to explain this.

The big reason these misconceptions exist: most guides to writing docs suck. They are too conceptual, high-level, and aren’t written for busy engineers or founders. We’re changing that here by giving you a practical guide to documentation. 

## 1. It’s ok to start from the start

Nothing matters if users can’t use your product. 

When users start with your product, you want them to go from “nothing” to “something” as quickly as possible. The best way to do this is learning by doing. Docs provide the structure to do this.

Start by writing the most basic, obvious doc to help someone use your product. What would you send to a friend to help them get started with this feature?

If this means helping them install and set up your product, do it. If this means teaching them the concepts necessary to succeed, do it. Either way, having a beginner’s mindset to your own product reveals the most important docs you need to write. 

For example, our new [error tracking docs](https://posthog.com/docs/error-tracking) have less content than our other products and the structure isn’t perfect either. This is fine with us because we have the details on installation and the features error tracking users are looking for. Users have enough to use error tracking and we have something to build on.

![Error tracking docs](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_04_at_09_04_15_7a29ece39c.png)

## 2. Good docs are not written in one day

Like a lot of writing, people see the finished post and expect their first copy to be exactly like that. They are discouraged when that isn’t the case, but shouldn’t be. Polished docs aren’t the product of a single stroke of genius, but a result of iterative improvement.

For example, our Next.js doc [started](https://github.com/PostHog/posthog.com/pull/1842) as a simple page with one snippet for installing and another for capturing a custom event. Since then, they changed 49 times to the current version with multiple install methods, details on app and pages routers, frequently asked questions, and more.

![Next.js docs](https://res.cloudinary.com/dmukukwp6/image/upload/nextdocs_e6906037dc.png)

This iteration is guided by the feedback we receive. This means reviewing:

1. Most popular docs to make sure they are up-to-date.
2. Comments and questions on the docs page. 
3. Issues raised by support or on GitHub.
4. Votes on whether docs pages were useful or not.

![Our most unhelpful docs](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_04_02_at_16_05_44_4f40c12dc8.png)

<Caption>Our most unhelpful docs</Caption>

We take time every week to review these and make improvements to docs. We also benefit from a huge amount of small fixes from our community. 

It is the repeated little improvements that creates coveted polished docs experience.

## 3. Your readers are in a rush

![Docs enjoyer](https://res.cloudinary.com/dmukukwp6/image/upload/image_2_3639171928.png)

Reading a book is commonly thought of as a leisurely activity. Docs is sort of the opposite of this.

Docs readers are trying to get what they need as fast as possible and get back to work. Their goal can be anything from figuring out if your product is a good fit to installing your product to debugging an issue they’re having. You want to help them do this as fast as possible.

Here’s what we’ve found most important for accomplishing this:

- Put the most important information first. Get to the point. No overly long intros.
- Break up long sections with subheadings for better scanability (like we do in this newsletter).
- Use short paragraphs (3-4 lines maximum). Break up hard to read or overly long sentences. Avoid walls of text.
- Use bullet points and numbered lists as these help readers know where they are and create a sense of progress.
- Add functioning code samples, annotated screenshots, graphics, and even memes. Visuals help keep readers’ attention and provide an alternative way to explain a concept.

When done well, docs don't look or read like a book. They have the variation and skimmability that helps readers know where they are and find what they need.

![Texture](https://res.cloudinary.com/dmukukwp6/image/upload/badrad_14f62de3dc.png)

## 4. Focus on examples over abstractions

Developers live in a world of abstractions. On a daily basis, they use ideas like synchronicity, security, immutability, reactivity, and frameworks make these concepts comprehensible and practical.

A PostHog example of an abstraction is user identification. Basically, PostHog's way of associating events with a user.

A common mistake for documenting an abstraction like this is dumping what's in our head onto the page. Explaining how identification works, how we process identified events, and why it's important.

The problem with this is that:

1. Abstractions are hard to transmit. Readers don’t have the context we do, and they don’t have the time or energy to create that context.
2. Users don’t care so much about how we solved their problem, only that we actually solved it. We think about how problems are solved 1000x more than they do. 

Focusing too much on documenting concepts and abstractions can lead to docs that bore or confuse users instead of helping them.

Instead, we mostly focus on implementation, using `posthog.identify()`, and providing code snippets you can use. In our user identification doc, you don’t even need to scroll to find the first code snippet.

![Identify](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_04_03_at_12_01_092x_01127d03fc.png)

Docs should be seen as a complement to a product's abstractions. You develop useful abstractions in your product, and show users how to use them in your docs.

To do this, focus more on examples, think about “showing” rather than “telling.”

- Showing an example JSON structure of a data type rather than giving a summary of it.
- Showing a screenshot or video of your UI rather than explaining its sections and buttons.
- Showing a diagram of a workflow rather than walking you through its steps.

Explaining your abstractions should be a task well into the future. Some signs it might be the right time to document abstractions:

1. When you get big enough that you need to start explaining the “why” behind how things work.
2. You need to explain abstractions internally to new team members.
3. You spend a significant amount of time on customer calls explaining abstractions. 

## 5. Writing great docs is like building a great product

1. **You need to focus on your users.** This means talking to them and asking what they want. It also means having empathy for their needs. An ICP is useful for products, but it’s just as useful for writing docs. 

2. **Ship quickly and iterate.** The first versions of our docs are often barebones, we don’t expect to have it all figured out in the first version. We also don’t require multiple approvals from stakeholders. We ship something, get feedback, and do it again.

3. **They require design and development investment.** Our docs benefit a lot from all of the work on our website and vibes team. They make the pages and components within those pages look good and work towards our goal. They also help us structure the site to help people find what they need.

4. **They require ownership.** If no one owns a product, it won’t get worked on. The same is true with docs. You can’t expect something to improve if it’s no one’s responsibility to improve it. Product teams are required to contribute but we also [keep a list](https://posthog.com/handbook/content-and-docs/docs) of the docs team members responsible. 

5. **Culture makes a big difference.** Your product is a product of your culture and so is your docs. For example, our values of being open source, everybody codes, trust and feedback over process, and biasing action fully apply to docs as well and ends up shaping how they are worked on.

In a way, docs are your product. The quality and user experience of your docs is a significant part of your overall product experience. Treating docs as any less important than your product means that you’re missing out on huge potential gains.

<NewsletterForm />