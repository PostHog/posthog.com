---
title: How to write docs so good developers will cry
date: 2025-02-04
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

Two things are true about documentation:

1. It is a critical piece of a successful product. 
2. Existing guides focus too much on rules and concepts that don't matter.

Most guides suck. They aren't for busy engineers or founders, so we're changing that here.

We're sharing what we're learned from writing 500+ docs pages that have been viewed 3M+ times in the last year alone.

## Why is documentation important?

1. Documentation keeps on answering your users' questions, even when you aren't there to answer them. It enables people to self-serve. No need for sales calls or support tickets. 

2. "Build it and they will come" is a lie. You also need to tell people about it. Documentation is a core part of doing this. Think of users as a blank slate. They don't know what your product does, how to use it, or why they would use it. Documentation helps them fill in this slate.

![Didn't write docs](https://res.cloudinary.com/dmukukwp6/image/upload/didntwritedocs_2ce7a47cde.png)

3. Have you ever heard of the "Feynman technique"? It is the process of learning through explaining a concept, seeing where you have knowledge gaps, and working to fill in those gaps. Writing documentation is sort of like this. It is a great way to understand your product and how users will actually use it. 

## What to write about

The process of diving into writing documentation can be intimidating. There is seemingly so much you can write about, as shown by other docs you've read and their thousands of pages. 

When starting, rather than worrying about getting everything correct right away, focus on these three points:

### 1. Start from the start

Nothing matters if users can't use your product. When they start reading your docs, you want to get them from "nothing" to "something" as quickly as possible, and the best way to do this is learning by doing. 

If this means helping them install and set up your product, do it. If this means teaching them the concepts necessary to succeed, do it. Either way, having a beginner's mindset to your own product will reveal many of the docs you need to write. 

![Getting started](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_04_at_08_45_00_9fb032a15d.png)

This is not only true of your product as a whole, but individual features. When you add a new feature, think about how someone will get started with it. If it requires a prerequisite, make sure it comes after that.

Starting from the start also means not assuming your users know too much. Starting with your most complicated use case is probably a bad idea. You need to build up knowledge to get to there. Assume readers don't know a lot, not because they are lazy, but because they are busy, and your product is just one of many tools they need to remember how to use.

### 2. Become your user (better yet, talk to them)

Every guide on writing documentation says knowing your "target audience" is critical, but what does that actually mean? 

First, if you don't know who your audience is, you should read [our guide on defining your ICP](https://newsletter.posthog.com/p/defining-our-icp-is-the-most-important). TL;DR: Start with your best guess, ask questions about users on signup, identify your power users, discern real enthusiasm, and look for patterns. 

Second, you should talk to users (we have [another guide on that](https://newsletter.posthog.com/p/talk-to-users)). Talk to them about your solution, take notes on what you are telling them, and pay attention to what confuses them. Both of these are excellent potential doc subjects

Third, you should develop a mental model of your users and think about what documentation they would like. For example, we focus a lot on SDKs, APIs, code snippets in our docs because we know our audience is developers. We might care a lot more about pictures and graphics if we were dealing with marketers or white papers if we were dealing with sales people (only half-joking). 

![Your users on your shoulder](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_31_at_08_43_082x_8c489dbd4f.png)

### 3. Focus on structure (later)

Stressing out about where documentation goes or what "[types](https://docs.divio.com/documentation-system/)" of documentation to cover isn't worth it early. Just create a bunch of pages and worry about organizing them later. Stub out pages just to get words down if you need to. 

For example, our new [error tracking docs](/docs/error-tracking) have much less content than any of our other products and the structure of the content likely isn't right either. What it does give us is something to build on.

![Error tracking docs](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_04_at_09_04_15_688389c7e3.png)

When you have a bunch of pages that relate to one another, you can create a landing page or section for them. You can reorganize them into categories once there is enough there. Popular categories include getting started, core concepts, and SDK/API references. 

> **Tip:** Search and/or AI chat can make up for a lack of structure. See our post on [the custom AI tool we built to answer community questions using Inkeep](/blog/ai-community-answers).

## How to write it

Now that you have something to write about, it is time to buckle down and write it. The problem is that the blank page is intimidating and you likely have a ton of mental baggage about what writing is supposed to look like. 

The solution is again to start simply and the next three points can help you do that:

### 1. Don't worry too much about "the rules"

We're not in school anymore. Nearly all the rules you learned there about how to write don't apply here. No need to follow five paragraph structure, the MLA style guide, or even "proper" grammar.

![School sux](https://res.cloudinary.com/dmukukwp6/image/upload/image_a50cf738ee.png)
<Caption>
What "writing like you were taught in school" makes you look like
</Caption>

He doesn't write docs, but the person who has the worst spelling and grammar at PostHog is CEO James Hawkins. Yet he is also the person who writes the most viral posts. As a marketer, I would rather he spend his time writing more posts than getting better at grammar.

Just worry about getting the words out of your head onto the page. Write like you talk, make liberal use of the notes you took while talking to users earlier. 

Oh, and don't worry too much about grammar and spelling at the start. Running your work through ChatGPT and a spell checker will fix issues when you're ready to publish.

### 2. Write for the internet

So what should you do instead? Make your writing readable for the medium it's in: the internet. This means your readers:

1. Are busy and don't have time to read long docs.
2. Are not experts and don't know what we know.

This means:

- Put the most important information first. Get to the point. No overly long intros.
- Break up long sections with subheadings for better scanability (like we do in this newsletter).
- Use short paragraphs (3-4 lines maximum). Break up hard to read or overly long sentences. Avoid walls of text.
- Use bullet points and numbered lists as these help readers know where they are and create a sense of progress.
- Add functioning code samples, annotated screenshots, graphics, and even memes. Visuals help keep readers' attention and provide an alternative way to explain a concept.

Ideally, internet writing should have a texture and flow that encourages readers to continue reading. 

### 3. Examples are your (best) friend

One of the most important things to include in your documentation is examples. Examples tie the features and concepts you are writing about to the real world. It's easy to say things, examples prove it, and they enable your reader to anchor onto something. 

For example, when explaining [anonymous vs identified events](/docs/product-analytics/capture-events#advanced-anonymous-vs-identified-events), we provide example scenarios where you would use both. This helps users understand what they are and how they can use them before we even explain how to set them up.

![Anonymous vs identified events](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_31_at_09_25_05_bbf5fe568f.png)

The best source for these examples is your own experiences or the experiences of your users (part of the reason [why dogfooding is so important](https://newsletter.posthog.com/p/using-your-own-product-is-a-superpower)). Readers can smell a fake example, and at best, it won't be helpful. At worst, it will ruin the credibility and authority of your docs.

## How to measure success

Once you've written and published a few docs, how to know if you did a good job? These are the things we look at at PostHog:

1. **Traffic.** At the most basic level, you want to see that people are actually reading your docs. PostHog's [web analytics dashboard](/docs/web-analytics) is great for this. Seeing which docs are popular helps you understand what areas of your product are popular and what areas to invest more time in documenting.

2. **Customer-facing shares.** You want to know if your docs are actually helpful. This can be done by seeing which docs actually get shared by you or your customer-facing team. Ideally, docs should make the jobs of your sales and support teams easier. 

3. **Feedback.** We have multiple ways users give us feedback on our documentation including comments, "was this page useful?" buttons, and mentions on social media. [Surveys](/docs/surveys) are another option we use, especially for earlier-stage products. 

Measuring success helps us figure out what to work on next. For example, if we see a use case or library is popular, we'll invest more time in expanding the docs related to it. 

## Other things we've learned about writing great docs

- **Make it easy for people to contribute.** Our website is [open source](https://github.com/PostHog/posthog.com). There is an "edit this page" button at the top of each page. Our users end up contributing a bunch of fixes and even entire docs pages. ~10% of pull requests to our website come from the community.

- **Iterate.** Once you have docs, keep track of which are popular and make sure those are up to date. Good writing is rewriting. Our [Next.js docs](/docs/libraries/next-js) have changed 10+ times (partially because Next.js is a PITA).

- **Don't worry too much about docs going out of date.** If you try to write docs that never go out of date, you'll be stuck in maintenance mode forever. Docs going out of date is natural. Links break, APIs change, UIs get redesigned.
    
![Docs go out of date](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_31_at_09_47_442x_972abf5013.png)
    
- **Get an editor.** Just like you review pull requests, you should review new docs. Ask them to tell you what is confusing, where they get bored, and what's awkward. A simple read-through can dramatically improve a doc.

- **Don't reinvent the wheel.** When it comes to docs, your goal should be comprehensibility. Save your showing off in your blog posts. Don't come up with wild names people don't understand, just use Keywords Everywhere and use the ones they expect. You're not Twitter, you can just call it a "post", not a "tweet."

<NewsletterForm />