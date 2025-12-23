date: 2026-01-01
title: What to do when product velocity breaks the speed of adoption
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
  metaDescription: 'When your team ships faster than users can adopt new features, you face a unique challenge. Here's how to balance product velocity with user adoption.'

Is it possible to ship too much – or too fast?

Yes. Probably. Unfortunately.

What used to take a full product org can now be done by a handful of people with good judgment and a lot of tokens. As a result, software powered by LLMs is [cheaper to build](https://martinalderson.com/posts/has-the-cost-of-software-just-dropped-90-percent/) and [scaling faster](https://smartdev.com/ship-product-faster-with-ai-real-data/) than at any point in history.

Take our team at PostHog. With dozens of engineering teams shipping independently, product velocity is extremely high. Once you cross a certain threshold however, that velocity stops compounding and starts competing with itself.

![product marketing at PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/the_office_meme_a199c5af0a.png)

## When you ship fast enough, user attention becomes the bottleneck

Since PostHog is a work tool – not a [lifestyle brand](/merch) – even our most enthusiastic users won’t adopt an infinite number of new things per week. 

In practice, B2B SaaS users tend to adopt:
- one big new thing every few months
- a couple of medium improvements
- a handful of small quality-of-life upgrades

Everything else gets ignored until someone explains why it matters. 

Luckily, someone has already figured out how to optimize for this problem in manufacturing and we can apply the same ideas to your startup.

This simple principle comes from the **Theory of Constraints** (TOC):

> When upstream output increases without increasing downstream capacity, the system destabilizes.

In our case:
**Upstream**, we have:
- 39 small teams [working asynchronously](/newsletter/how-we-work-async)
- very high shipping velocity
- AI accelerating individual productivity

**Downstream**, we have:
- user attention (do they notice?)
- user comprehension (do they understand?)
- user engagement (do they care?)

When input exceeds the capacity of the bottleneck, a few predictable things happen:

### 1. Queue buildup
In manufacturing, this looks like excess inventory. In software, this creates a kind of invisible backlog – work that’s finished on your side, but unfinished in terms of user value. 

The result is diffuse impact: lots of progress shipped, but less progress felt.

### 2. Time-to-value increases
As that backlog grows, lead times stretch – not in engineering, but in adoption. Your team keeps shipping, but each new capability takes longer to move from available to useful.

Users struggle to keep up with what’s changed. Support and sales spend more time explaining context. Marketing lags releases instead of amplifying them.

### 3. Quality degradation
When a bottleneck is overloaded, quality degrades through forced tradeoffs. 

In software, that shows up as:
- partial adoption instead of full behavior change
- misunderstood capabilities
- features used narrowly when they were designed to be foundational

Your product keeps getting bigger and better, but not proportionally clearer.

## Does that mean you should slow down?
No. Maybe? Definitely not.

Slowing down is what companies do when they run out of ideas (and clearly that's not the problem). Fortunately, the Theory of Constraints is quite explicit about what _not_ to do here:

> Improving non-bottlenecks is a waste of resources. You improve the system by elevating the bottleneck.

You could market harder. Push more announcements. Buy more attention. Top-of-funnel always looks good on a dashboard. But adoption still happens one human at a time, and each individual user has a finite amount of mental bandwidth.

So the real question isn't whether to slow down. It's this:
How do you elevate adoption without killing velocity? (and without [losing your edge](/newsletter/how-startups-lose-their-edge)).


## How to address the real bottleneck of user attention
If you’re building anything serious (and using AI to increase throughput), you’ll hit this wall eventually.  

We’re still figuring out what to do about it at PostHog, but directionally this is where the work needs to shift:

## 1. Treat attention like a scarce resource (because it is)
Small teams will naturally optimize for their own product space, but suboptimally for users’ overall cognitive bandwidth. Marketing everything as soon as it’s shipped turns internal velocity into competition for the same slice of user attention (and everyone loses).

### What failure looks like
- Creating elaborate campaigns for every new feature
- Not having a [launch tier framework](https://aakashgupta.medium.com/the-launch-tier-system-that-transforms-product-teams-fddbb55a785c)
- Email blasting users without [segmentation](https://www.reforge.com/blog/what-is-user-segmentation) 
- Producing lengthy demo videos that are sincere-but-forgettable
- Marketing on the same exhausted channels as everyone else ([every marketing channel sucks right](https://andrewchen.substack.com/p/every-marketing-channel-sucks-right))

### Instead
- Make [human-centric](https://www.youtube.com/watch?v=QeU5MmpqBg0&list=PLnOY1RYHjDfw2joBxUPADaadeX5IradbH&index=2), [absurd](https://www.youtube.com/watch?v=EXisgy6eWJ0&list=PLnOY1RYHjDfw2joBxUPADaadeX5IradbH&index=4), entertainment-first content
- [Partner with people](https://www.linkedin.com/feed/update/urn:li:activity:7401713037386379265) and brands who have mindshare and trust with your ICP
- Build [cool things](/deskhog) that delight your target audience without selling your product
- Turn internal jokes into [public canon](https://www.youtube.com/watch?v=_eLZqBVkxCc&list=PLnOY1RYHjDfw2joBxUPADaadeX5IradbH&index=3)
- If you’re doing founder-led marketing, [commit to the bit](https://www.linkedin.com/in/j-hawkins/)
- [Design a world](https://www.linkedin.com/posts/lottiecoxon_i-was-unsure-how-to-promote-that-we-are-now-activity-7368966636244049920-S3mU?utm_source=share&utm_medium=member_desktop&rcm=ACoAACADwYwBS3M192eUP4W-otEA2PKzmVWImH0) (not a funnel) that people want to live in, and let them [explore it](https://x.com/MichaelAshmead/status/1966136656265687134) when they have the context to care

## 2. Sequence launches based on user capacity, not team readiness
Marketing everything as soon as it’s shipped turns internal velocity into competition for the same slice of user attention (everyone loses). 

### What failure looks like
- Treating launches as [outputs instead of outcomes](https://productschool.com/blog/analytics/output-vs-outcome)
- Existing users experiencing [feature fatigue](https://www.linkedin.com/pulse/feature-fatigue-love-focus-derek-francis-mezxc/), and new users with release whiplash 
- Expecting documentation to do the heavy lifting of product education
- Highlighting the what more than the why (*marketing [features > benefits](https://posthog.com/newsletter/marketing-for-devs) is typically a good move if you’re marketing to developers, but overindexing on ‘what’ makes adoption someone else’s problem)

### Instead
- Classify launches as _events_ or _infrastructure_: If it’s an event, treat it like the [biggest event of the year](https://www.linkedin.com/feed/update/urn:li:activity:7398759974686076928) 
- Instead of one-off updates, invest in producing a [narrative series](https://www.youtube.com/playlist?list=PLnOY1RYHjDfxcuWI_L1xwuhoXAsxR59VL) that users can follow
- Encourage engineers to [do support](/newsletter/engineers-do-support) and see first-hand where users get stuck

## 3. Build discovery into the product 
If realizing value requires explanation outside the product, you haven't removed the adoption bottleneck – you've just moved it downstream to marketing, sales, or support.

### What failure looks like
- Treating external platforms as your main discovery engine (performative presence on Product Hunt, G2, Hacker News may not be [worth it](https://news.ycombinator.com/item?id=29864157)) 
- Relying on social media and emails broadcasts to communicate everything you shipped this week
- Disrupting the in-app experience with too many tooltips, banners, modals and popups
- Adding so much to the UI that it subtracts from [user experience](/blog/redesigned-nav-menu)

### Instead
- Define [activation criteria](/product-engineers/activation-metrics) for new products, and track user behavior over time
- Leverage AI to surface features when a user is already doing the related job
- Embed docs within your product to keep users in flow (linking to an external help center is a form of context switching)
- Leverage habit loops (trigger → action → reward → reinforcement) and other [PLG](https://productled.com/blog/product-led-growth-framework-for-saas-companies) tactics to keep users engaged
- Commit to [continuous discovery](https://www.youtube.com/watch?v=9RFaz9ZBXpk). Let user feedback and behavior influence what gets amplified next


## 4. Measure learning, not just usage
Adoption doesn’t really start with features. It starts with people getting better at their jobs. That’s why a lot of our marketing content isn’t really about PostHog at all – it’s about [how to be a better product engineer](https://newsletter.posthog.com/). 

### What failure looks like
- Overemphasizing vanity metrics like clicks, impressions and daily active users (DAU)
- Incentivizing your product team to be a [feature factory](https://xenoss.io/blog/product-velocity-trap-solutions) instead of taste makers
- Publishing content that only talks about your product – instead of the market, community, and problems your users actually think about
- Believing other people care about your product as much as you do (they don’t)

### Instead
- Publish [learnings](/blog/8-learnings-from-1-year-of-agents-posthog-ai), [works-in-progress](/blog/multi-modal-llm-user-behavior-analysis), and durable mental models that are useful with, or without your product 
- Teach others about your domain (Hubpsot teaches you how to be a [better marketer](https://blog.hubspot.com/), Figma teaches you how to be a [better designer](https://www.figma.com/blog/insights/))
- Share uncomfortable things like [postmortems](/blog/nov-24-shai-hulud-attack-post-mortem) for incidents 
- Be a good citizen, [create space](/handbook/people/hogpatch) for others to thrive, help developers (or whichever community you market to) without asking for anything in return
- Turn internal knowledge into [public artifacts](/handbook) and give space for every role to author content that matters to them

## Fast, not frantic
It's tempting to treat “shipping too fast” as a humblebrag, but that’s lazy thinking. If users can’t adopt what we ship, it’s not velocity – it’s waste.

Practically, that means we need to be explicit about what matters, get better at sequencing the big launches, make a select number of things very loud, and let everything else be quietly excellent. 

And of course, do more things that would make a normal SaaS company nervous. Not everyone will like it, and that’s what makes velocity convert to value.

<NewsletterForm />

