---
title: What to do when product velocity breaks the speed of adoption
date: 2025-12-23
author:
  - cleo-lant
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/why_we_killed_our_ai_assistant_9e9565192e.png
featuredImageType: full
tags:
  - Product
  - Growth
crosspost:
  - Blog
  - Founders
seo:
  metaTitle: 'What to do when product velocity breaks the speed of adoption'
  metaDescription: "When your team ships faster than users can adopt new features, you face a unique challenge. Here's how to balance product velocity with user adoption."
---

Is it possible to ship too much – or too fast?

Yes. Probably. Unfortunately.

What used to take a full product org can now be done by a handful of people with good judgment and a lot of tokens. As a result, software powered by LLMs is [cheaper to build](https://martinalderson.com/posts/has-the-cost-of-software-just-dropped-90-percent/) and [scaling faster](https://smartdev.com/ship-product-faster-with-ai-real-data/) than at any point in history.

Take our team at PostHog. With dozens of engineering teams shipping independently, product velocity is extremely high. Once you cross a certain threshold however, that velocity stops compounding and starts competing with itself.

![product marketing at PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/the_office_meme_a199c5af0a.png)

## When you ship fast enough, user attention becomes the bottleneck

Since PostHog is a work tool – not a [lifestyle brand](/merch) – even our most enthusiastic users won’t adopt an infinite number of new things per week. 

In practice, B2B SaaS users tend to adopt:

- One big new thing every few months
- A couple of medium improvements
- A handful of small quality-of-life upgrades

Everything else gets ignored until someone explains why it matters. This is a classic bottleneck.

Luckily, bottlenecks have solutions. Manufacturers discovered this and crystallized it in a concept called **Theory of Constraints** (TOC). There's one principle of TOC that is particularly relevant here:

> When upstream output increases without increasing downstream capacity, the system destabilizes.

In our case:

- **Upstream** we have 39 small teams [working asynchronously](/newsletter/how-we-work-async), shipping at a high velocity, and AI accelerating individual productivity.
- **Downstream** we have limited user attention, comprehension, and engagement capacity.

TOC can again help us understand the consequences of this mismatched capacity:

### 1. Queue buildup

In manufacturing, this looks like excess inventory. In software, this creates a kind of invisible backlog – work that’s finished on your side, but unfinished in terms of user value. 

The result is diffuse impact: lots of progress shipped, but less progress felt.

### 2. Time-to-value increases

As that backlog grows, the gap between production and adoption stretches. Your team keeps shipping code, but each new capability takes longer to move from available to useful.

Users struggle to keep up with what’s changed. Support and sales spend more time explaining context. Marketing lags releases instead of amplifying them.

### 3. Quality degradation

When a bottleneck is overloaded, quality degrades through forced tradeoffs. 

In software, that shows up as:

- Partial adoption instead of full behavior change
- Misunderstood capabilities
- Features used narrowly when they were designed to be foundational

Your product keeps getting bigger and better, but not proportionally clearer.

## Does that mean you should slow down?

No. Maybe? Definitely not.

Slowing down is what companies do when they run out of ideas (and clearly that's not the problem). Fortunately, the Theory of Constraints is quite explicit about what _not_ to do here:

> Improving non-bottlenecks is a waste of resources. You improve the system by elevating the bottleneck.

You could market harder. Push more announcements. Buy more attention. Top-of-funnel always looks good on a dashboard. But adoption still happens one human at a time, and each individual user has a finite amount of mental bandwidth.

So the real question isn't whether to slow down. It's this:

**How do you elevate adoption without killing velocity?**

## How to address the real bottleneck of user attention

If you’re building anything serious (and using AI to increase throughput), you’ll hit this wall eventually.  

We’re still figuring out the best approach at PostHog, but directionally here's what we've observed as needing to happen:

### 1. Treat attention like a scarce resource (because it is)

[Small teams](/blog/why-small-teams-crush-tiger-teams) will naturally optimize for their own product space, but suboptimally for users’ overall cognitive bandwidth. Treating every cool thing you ship as equally deserving of attention guarantees shallow adoption. 

**What failure looks like:**
- Treating launches as [outputs instead of outcomes](https://productschool.com/blog/analytics/output-vs-outcome)

- Creating elaborate campaigns for every single new feature (asking users to care about everything ensures they care deeply about nothing)

- Existing users experiencing [feature fatigue](https://www.linkedin.com/pulse/feature-fatigue-love-focus-derek-francis-mezxc/), and new users with release whiplash 

- Producing lengthy demo videos that explain everything and persuade no one

- Marketing on the same exhausted channels as everyone else ([every marketing channel sucks right](https://andrewchen.substack.com/p/every-marketing-channel-sucks-right))

- Not sharing common goals across internal teams (we need to all paddle in the same direction)

**Do this instead:**
- Having a [launch tier framework](https://aakashgupta.medium.com/the-launch-tier-system-that-transforms-product-teams-fddbb55a785c) to classify releases as _events_ or _infrastructure_: If it’s an event, treat it like the [biggest event of the year](https://www.linkedin.com/feed/update/urn:li:activity:7398759974686076928) 

- Using entertainment and brand as force multipliers. [Hunmor](https://www.youtube.com/playlist?list=PLnOY1RYHjDfxcuWI_L1xwuhoXAsxR59VL), [absurdity](https://www.youtube.com/watch?v=EXisgy6eWJ0&list=PLnOY1RYHjDfw2joBxUPADaadeX5IradbH&index=4), and narrative work because they lower the cost of paying attention

- Inviting people to try things before they’re “ready to market,” so early adopters create context and pull others in organically

-[Partnering with influencers](https://www.linkedin.com/feed/update/urn:li:activity:7401713037386379265) and brands who have mindshare and trust with your ICP

- [Designing a world](https://www.linkedin.com/posts/lottiecoxon_i-was-unsure-how-to-promote-that-we-are-now-activity-7368966636244049920-S3mU) (not a marketing funnel) that people want to live in, and let them [explore it](https://x.com/MichaelAshmead/status/1966136656265687134) when they have the context to care

- If you’re doing founder-led marketing, being consistent and ruthlessly [committing to the bit](https://www.linkedin.com/in/j-hawkins/)

>Notion ships constantly, but markets selectively. Many features land with almost no fanfare, while a small number (AI, databases, templates) get sustained narrative investment over months.


### 2. Build discovery into the product 

If realizing value requires explanation outside the product, you haven't removed the adoption bottleneck – you've just moved it downstream to marketing, sales, or support. Discovery that’s timed to intent beats marketing that’s loud but premature.

**What failure looks like:**

- Treating external platforms as your main discovery engine (performative presence on Product Hunt, G2, Hacker News probably isn't [worth the investment](https://news.ycombinator.com/item?id=29864157)) 

- Relying on social media and emails broadcasts to communicate everything you shipped this week

- Email blasting users a generic monthly product update without meaningful [segmentation](https://www.reforge.com/blog/what-is-user-segmentation) 

- Disrupting the in-app experience with too many tooltips, banners, modals and popups

- Adding so much to the UI that it subtracts from the UX ([user experience](/blog/redesigned-nav-menu))

- Highlighting the what more than the why (*marketing [features > benefits](https://posthog.com/newsletter/marketing-for-devs) is typically a good move if you’re marketing to developers, but overindexing on ‘what’ makes adoption someone else’s problem)

>Atlassian famously struggled with feature sprawl across Jira, Confluence (and much more). Users just couldn't keep up with so much surface area. The solution wasn't  _more_ marketing, it was investing heavily in in-product discovery, clearer use-case documentation, and opinionated defaults to guide users to success.

**Do this instead:**

- Defining [activation criteria](/product-engineers/activation-metrics) for new products, and track user behavior over time

- Anchoring new features to a task or process users already care about (“you’re using X, so we think you might be interested in Y”)

- Encouraging engineers to [do support](/newsletter/engineers-do-support) and see first-hand where users get stuck

- Embedding docs within your product to keep users in flow (linking to an external help center is a form of context switching)

- Leveraging habit loops (trigger → action → reward → reinforcement) and other [PLG](https://productled.com/blog/product-led-growth-framework-for-saas-companies) tactics to keep users engaged

- Committing to [continuous discovery](https://www.youtube.com/watch?v=9RFaz9ZBXpk). Let user feedback and behavior influence what gets amplified next

### 3. Measure learning, not just usage

Adoption isn’t about people using features, it’s about them getting better at their jobs because those features exist. That’s why a lot of our marketing content isn’t really about PostHog at all – it’s about [how to be a better product engineer](https://newsletter.posthog.com/). 

**What failure looks like:**

- Overemphasizing vanity metrics like clicks, impressions, and daily active users (DAU)

- Incentivizing your product team to be a [feature factory](https://xenoss.io/blog/product-velocity-trap-solutions) instead of taste makers

- Publishing content that only talks about your product – instead of the market, community, and problems your users actually think about

- Believing other people care about your product as much as you do (they don’t)

**Do this instead:**

- Publishing [learnings](/blog/correct-llm-code-generation), and durable mental models that are useful with or without your product 

- Being open source if you can and building a community around it

- Teaching the domain you operate in — not just how your product works (e.g. Figma teaches people how to be [better designers](https://www.figma.com/blog/insights/))

- Sharing uncomfortable things like [postmortems](/blog/nov-24-shai-hulud-attack-post-mortem) for incidents 

- Turning internal knowledge into [public artifacts](/handbook) and give space for every role to author content that matters to them

- Not being too serious (e.g. Turning internal jokes into [public canon](https://www.youtube.com/watch?v=_eLZqBVkxCc&list=PLnOY1RYHjDfw2joBxUPADaadeX5IradbH&index=3))

- Being a good citizen, [creating spaces](/handbook/people/hogpatch) for others to thrive, helping your community without asking for anything in return, building a reputation of trust and a transparency 

>HubSpot pioneered inbound marketing by teaching people how to be better marketers before selling them software. For many young professionals, that learning happened years before any purchasing decision — and by then, brand equity was already baked in.

## Fast, not frantic

It's tempting to treat “shipping too fast” as a humblebrag, but that’s lazy thinking. If users can’t adopt what you ship, it’s not velocity – it’s waste.

Practically, this means being explicit about what matters, and just as importantly, when and how you ask users to care.

**So when _should_ you market a specific feature?**
- It changes a core workflow, not just adds an another option
- It compounds with existing behavior
- It has a clear “aha” moment you can design for
- You're able to support it with docs, onboarding, and follow-up content (not just a blog post)

Velocity only compounds when adoption keeps up. If attention is the bottleneck, your job isn’t to slow down — it’s to be selective. Make a few things loud on purpose, and let the rest be quietly excellent.

<NewsletterForm />
