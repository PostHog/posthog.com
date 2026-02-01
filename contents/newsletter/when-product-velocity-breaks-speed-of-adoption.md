---
title: What to do when product velocity breaks the speed of adoption
date: 2026-01-31
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
  metaDescription: "When your team ships features faster than users can adopt them, you face a unique challenge: progress that stops compounding and starts competing with itself for attention."
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

- **Upstream** we have 40+ small teams [working asynchronously](/newsletter/how-we-work-async), shipping at a high velocity, and AI accelerating individual productivity.
- **Downstream** we have limited user attention, comprehension, and engagement capacity.

TOC can again help us understand the consequences of this mismatched capacity:

### 1. Queue buildup

In manufacturing, this looks like excess inventory. In software, this creates a kind of invisible backlog – work that’s finished on your side, but unfinished in terms of user awareness and understanding. 

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

Product adoption happens one human at a time, and each individual user has a finite amount of mental bandwidth.
So the real question isn't whether to slow down. It's this:

**How do you elevate adoption without killing velocity?**

![no hedgehogs were harmed in the making of this image](https://res.cloudinary.com/dmukukwp6/image/upload/Theory_of_constraints_alt_2_7509e8743f.png)

## How to address the real bottleneck of user attention

If you’re building anything serious (and using AI to increase throughput), you’ll hit this wall eventually.

At PostHog, we’re still figuring out the best way around it, but a few points are now painfully obvious.

### 1. Treat attention like a scarce resource (because it is)

[Small autonomous teams](/blog/why-small-teams-crush-tiger-teams) naturally optimize for their slice of the product. You own a feature or surface, you make it better. 

That’s a sensible way to work, but users don’t experience your product that way. They're hit with _everything_ that's new and different in the product, through a finite amount of brainpower they’d probably prefer to spend on a B2B SaaS tool.

That mismatch is where things start to break.

**What failure looks like:**

You see it when companies (especially startups) excitedly announce every new feature, and when changelogs or emails become the main way users are expected to keep up. 

When you treat launches as [outputs instead of outcomes](https://productschool.com/blog/analytics/output-vs-outcome), even engaged users will start showing [feature fatigue](https://www.linkedin.com/pulse/feature-fatigue-love-focus-derek-francis-mezxc/).

If you’ve ever heard “I didn’t know you could do that” from a long-time customer — congratulations, you’ve shipped past the speed of adoption.

**Do this instead:**

Keep shipping, but be aggressively opinionated about what matters _right now_.

Not everything needs a launch. Not everything needs a blog post. Not everything needs to be explained immediately.

A practical way to enforce this is a [launch tier framework](https://aakashgupta.medium.com/the-launch-tier-system-that-transforms-product-teams-fddbb55a785c). How you score things as tier 1 vs tier 2 matters less than the question it forces you to consider: is this new thing _really important_ to the user?

You can make it even simpler by classifying releases as _events_ or _infrastructure_. If it’s an event, treat it like the [biggest event of the year](https://www.linkedin.com/feed/update/urn:li:activity:7398759974686076928). Repeat the message. Show it in-product. Write about it more than once. Let it run for weeks, not days.

This is also where brand helps. Things like [humor](https://www.youtube.com/playlist?list=PLnOY1RYHjDfxcuWI_L1xwuhoXAsxR59VL), narrative, and deliberate [absurdity](https://www.youtube.com/watch?v=EXisgy6eWJ0&list=PLnOY1RYHjDfw2joBxUPADaadeX5IradbH&index=4) work because they lower the cost of paying attention. 

[Partnering with influencers](https://www.linkedin.com/feed/update/urn:li:activity:7401713037386379265) that own trust with your ICP is another way to extend mindshare beyond your brand channels. Founder-led marketing has similar benefits, but if you do this be consistent and ruthlessly [commit to the bit](https://www.linkedin.com/in/j-hawkins/).

> **What this looks like:** Notion ships constantly, but markets selectively. Many features land with almost no fanfare, while a small number (AI, databases, templates) get sustained narrative investment over months.

### 2. Build discovery into the product 

If realizing value requires explanation _outside_ of the product, you haven't removed the adoption bottleneck – you've just moved it downstream to marketing, sales, or support. 

Users don’t wake up wanting product updates. They’re trying to get something done and move on with their life.

That’s why feature discovery strategically tied to intent works better than announcements that land out of context.

**What failure looks like:**

Relying on external channels for discovery is brittle. As Andrew Chen argues in [every marketing channel sucks right now](https://andrewchen.substack.com/p/every-marketing-channel-sucks-right) most channels are noisy and saturated. And despite the internet clout you may think it awards, focusing your efforts on Product Hunt, G2, or Hacker News probably isn't [worth the investment](https://news.ycombinator.com/item?id=29864157). 

Inside your owned channels it’s easy to make things worse. You've no doubt been a victim of these generic product emails without meaningful [segmentation](https://www.reforge.com/blog/what-is-user-segmentation) ("why did I receive this?"), or a disruptive in-app ([user experience](/blog/redesigned-nav-menu)) full of tooltips, banners and popups.

Worst of all are demo videos or press releases that promise “revolutionary” outcomes but don't clearly explain what changed in the product. [Marketing features over benefits](https://posthog.com/newsletter/marketing-for-devs) is a good anti-pattern, but be warned: too much focus on “what” > "now what" makes product adoption someone else’s problem.

![never log off](https://res.cloudinary.com/dmukukwp6/image/upload/community_product_meme_328cb8a9f4.jpg)

> **What this looks like:** Atlassian famously struggled with feature sprawl across Jira, Confluence and their other products. Users couldn't keep up with so much surface area. The solution wasn't _more_ marketing, it was investing heavily in in-product discovery, clearer use-case documentation, and opinionated defaults to guide users to success.

**Do this instead:**

What works better is surfacing features when they’re relevant to what the user is already doing. 

This starts with defining clear [activation criteria](/product-engineers/activation-metrics) - the signals that indicate a user is engaged with certain parts of your product.
Once you understand those behaviors, you’re in a much better position to anchor new features to tasks users already care about.

Another name for this is [continuous discovery](https://www.youtube.com/watch?v=9RFaz9ZBXpk): letting user feedback and behavior influence what gets amplified next.

Emails and tooltips can help here, but only when they’re contextual: “you’re using X, so Y might be useful.” Lightweight habit loops and other [PLG](https://productled.com/blog/product-led-growth-framework-for-saas-companies) tactics can reinforce this over time.

At PostHog, we encourage engineers to [do support](/newsletter/engineers-do-support) and see first-hand where users get stuck. Getting marketing closer to real users — via interviews or support — facilitates a similar positive outcome.

### 3. Measure learning, not just usage

Product adoption isn’t about people using features, it’s about them getting better at their jobs because those features exist. That’s why a lot of PostHog's content marketing isn’t really about PostHog at all – it’s about [how to become a product engineer](https://newsletter.posthog.com/). Knowledge sharing builds trust and brand recognition in a way feature announcements never will.

**What failure looks like:**

When teams get this wrong, they focus on vanity metrics, push product teams toward being a [feature factory](https://xenoss.io/blog/product-velocity-trap-solutions), and publish content that only makes sense if someone already cares about the product.

One of the biggest mistakes you can make is believing other people care about the product as much as you do. 

They don’t.

**Do this instead:**

What works better is publishing things that are useful even without your product: 

- Real learnings, like [how we built our AI setup wizard](/blog/correct-llm-code-generation)
- Internal knowledge turned into [public artifacts](/handbook) 
- Honest writeups like [postmortems](/blog/nov-24-shai-hulud-attack-post-mortem) for incidents 

Even better, teach the domain you operate in — not just how your product works. Figma, for example, teaches people how to be [better designers](https://www.figma.com/blog/insights/), not just how to use Figma.

Events are another great tactic to build a community adjacent to your product. For example, Lovable’s [SheBuilds](https://shebuilds.lovable.app/) hackathon encourages more women to try vibe coding.

Yes, you're building a product, but you can also be a good citizen, [create spaces](/handbook/people/hogpatch) for others to thrive, help your community without expecting anything back. Do this with good will, and the trust you gain will yield larger dividends than any marketing campaign. 

>**What this looks like:** HubSpot pioneered inbound marketing by teaching people how to be better marketers before selling them software. For many young professionals, that learning happened years before any purchasing decision — and by then, brand equity was already baked in.

## Fast, not frantic

It's tempting to treat “shipping too fast” as a humblebrag, but that’s lazy thinking. If users can’t adopt what you ship, it’s not velocity, it’s waste.

Once you see it that way, the answer is obvious: you don’t slow down shipping. You stop overwhelming the bottleneck.

Practically, that means being explicit about what actually deserves attention — and just as explicit about what doesn’t.

**So when _should_ you market a specific feature?**
- It changes a core workflow, not just adds another option
- It compounds with an existing behavior (and you can surface it in-context)
- It has a clear “aha” moment you can design for
- You're able to support it with docs, onboarding, and follow-up content (not just a blog post)

Everything else should move through the system quietly, without competing for attention it doesn’t need.

Product velocity only compounds when adoption keeps up. If user attention is the bottleneck, your job isn’t to slow down — it’s to be selective. Make a few things loud on purpose, and let the rest be quietly excellent.

<NewsletterForm />
