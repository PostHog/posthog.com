---
title: "The do's and don'ts of minimum viable product marketing"
date: 2026-05-10
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - joe-martin
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-blog-image.png
featuredImageType: full
category: Inside PostHog
tags:
    - Marketing
    - Guides
---

PostHog is a much bigger company than it was when I joined in 2022 as the first product marketer – but while we've more than 10xed in company size since 2022, the product marketing team has only quadrupled. That's deliberate, and it's possible because we've built a marketing culture that reflects our engineering culture: we put emphasis on shipping, [not collaboration](https://newsletter.posthog.com/p/collaboration-sucks).

Most product marketing advice tells you the opposite. Plan your messaging pillars in advance. Centralize the team around one approach. Block out a launch week. Build the full deck before anyone touches the post. I've worked in teams like this and it's eventually what gives PMMs their bad reputation: elaborate Powerpoints that get lobbed over the fence to other teams as high-level requests for them to do the actual work.

We don't work that way at PostHog, and [we ship more launches per marketer per month](https://newsletter.posthog.com/p/the-hidden-danger-of-shipping-fast) than most companies do in a year. I call what we do minimum viable product marketing, which is kind of a joke and also kind of not.

Here's how minimum viable product marketing shapes how we plan all of those product launches, structured not as yet-another-marketing-framework, but as functional advice for people who'd rather spend most of their time building. 

## What we focus on

There's no central framework that defines how we think about products before we launch them. The starting point is tactical: what are we actually going to do?

At PostHog, that means a launch checklist. We have a public template for it – a recent example of it in action lives in the [requests-for-comments-public RFC](https://github.com/PostHog/requests-for-comments-public/issues/513). The template is a guideline, not a rule — [they get tweaked every time](https://github.com/PostHog/requests-for-comments-public/issues/313). There are items we feel strongly about, but we treat every launch differently because every launch is different. The checklist is a starting point, not a destination.

Here are the things I feel most strongly about every team doing.

**Write the announcement.** Your announcement may hit multiple channels, like [blogposts](/blog/session-replay-pricing) or [social posts](https://x.com/posthog/status/2051701057667871112), but personally I always start with the email. It's likely the most intrusive comm you'll write, so it should be the shortest – and that constraint forces you to decide what the story you're actually telling is. If the email is interesting, the blog post will be. If it isn't, neither will be.

This is the hard bit, so I've written more about how I personally approach this below. Spoiler: It's basically creative writing. 

**Focus on conflict.** Conflict takes many forms, but it's ultimately at the root of every story worth telling. Maybe the conflict is in the problem your product solves, or the competitors you're standing against. Maybe you're standing on principle or disrupting an industry. When we cut session replay pricing by more than 50%, we titled the post '[We've decided to make less money.](/blog/session-replay-pricing)' That's the conflict (us vs. shareholders) and the change (we're cutting prices) in eight words.

**Write the title first.** If you can't write the title, you don't know what you're announcing. The title is the only part of the post most readers will see, so it needs to be right. I find it helps not to spend time perfecting it though: just get a vomit draft out quickly and without pomp. Writing is rewriting, after all. 

**Think through the release experience.** Are you going from beta to GA, or cold-launching? Is there a group of early users? Do they need to be thanked or rewarded? Is there an existing customer who'll be unhappy when this lands and should hear from us first? These questions are not flourishes. They're the difference between the experience that leads to a renewal contract and one which leads to quiet churn.

**Meet users where they are.** Part of thinking through the release experience is deciding where to meet and speak with users. We've tried a number of different channels and hypotheses over the years. What works for us: Hacker News, newsletters, small events, and social posts from real people. What doesn't: Product Hunt, podcasts, conferences, and partners RTing from company accounts. Which channels work best depends on whether you're more product-led versus sales-led.

**Tell the company.** Internal announcements are not a formality. The people who'll be asked (like support, sales, and customer success) need to know what's shipping. For smaller teams, this can be a message in a dedicated Slack channel. At PostHog's stage, this is starting to mean additional steps like sharing social posts and internal education for specific teams, too. 

**Wire it into onboarding.** We've built [our email onboarding flow](/blog/how-we-built-email-onboarding) with focused storytelling and great copy, and it never goes above a 0.6% unsubscription rate. It's the only sustainable marketing channel for a developer tool, and it needs to be kept up to date and highly personalized. New products get wired in ahead of launch and a workflow with 46 separate delays and 50 decision events determines who gets what, when. 

**Write case studies after the launch, not before.** This is one most teams get backwards. Testimonials and case studies before launch are like a carp — they smell fishy and they date quickly. The best case studies show up three weeks after launch, when a real customer has had a genuinely interesting experience and the product itself has settled a bit. We make time to chase these stories when they're worthwhile and then treat them as mini-launches themselves.

## What we don't focus on

**No battlecards.** Sales enablement is usually about marketing trying to control the messages that sales use. [We do sales so differently](/founders/startup-sales-strategy) to most organizations that our teams haven't typically felt they need laminated comparison sheets.

**Shipping matters more than storytelling.** That means no delaying launches so that we can create the perfect marketing collateral. A launch that goes out two weeks late so the video can be color-graded loses more momentum than the video buys; the video can ship after while the product improves in the meantime.

**Marketing-as-theatre.** Countdown clocks and pre-orders work for videogames, but they don't work for B2B software. It is often absolutely worth being weird and trying strange ideas, but not if it's performative and harms the user experience. 

**No press releases.** I used to be a tech journalist and I can assure you that no worthwhile story ever started with a press release. We don't do any sort of PR at PostHog, but if a journalist matters for your launch: email them directly. Make the pitch no more than six sentences long and attach a short Loom. Chase them once only. 

**Setting context.** "We added X" beats "In today's increasingly competitive analytics landscape." If your first paragraph could be deleted and the post would still make sense, delete it. You should, in fact, [delete most of what you've written](https://www.investmentwriting.com/omit-needless-words-excerpt-from-strunks-the-elements-of-style/). Good writing is specific and original. Do not ever ask readers to "strap in" because you are "excited to announce" a "market-leading service". 

**Creating consensus.** Barring some [notable exceptions](/community/profiles/30208), businesspeople are not experienced editors or marketers and do not need to be treated as such. Feedback should be listened to, but not every suggestion should be taken — [especially if it suggests a solution](https://www.goodreads.com/quotes/477087-remember-when-people-tell-you-something-s-wrong-or-doesn-t-work).  

## So, minimum viable product marketing is just another framework?

No. It's a suggestion, based on what works for us at PostHog. 

Product marketing is full of people who want to inflate their importance by making their work more complicated and mysterious than it needs to be, and I'm not trying to contribute to that.

At its core, product marketing is basically just storytelling. You don't need messaging matrices, you just need to follow basic storytelling advice. And so, that's exactly why these are suggestions rather than rules — because [Orwell's sixth rule](https://sites.duke.edu/scientificwriting/orwells-6-rules/) of creative writing still applies. 
