---
title: The hidden danger of shipping fast
date: 2026-02-09
author:
  - cleo-lant
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/fast_n_furious_1e12b31ac4.png
featuredImageType: full
tags:
  - Product
  - Marketing
crosspost:
  - Product engineers
  - Blog
---

Is it possible to ship too much – or too fast?

Yes. Probably. Unfortunately.

A handful of people with good judgment and a lot of tokens can now do what used to take a full product org. As a result, software powered by LLMs is [cheaper to build](https://martinalderson.com/posts/has-the-cost-of-software-just-dropped-90-percent/) and [scaling faster](https://www.linkedin.com/posts/tracecohen_the-fastest-startups-to-100m-arr-the-verdict-activity-7376056270933626880-wQ6g/) than at any point in history.

Once you cross a certain threshold, however, product velocity stops compounding and starts competing with itself. You're no longer constrained by your capacity to ship new things, but by your users' capacity to adopt them.

As a company that's obsessed with [shipping fast](/newsletter/small-teams), we're acutely familiar with this problem, so I'm sharing how we're solving it, so you can too.

<div className="flex justify-center">
<ProductScreenshot 
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/the_office_meme_a199c5af0a.png" 
  alt="product marketing at PostHog"
  classes="rounded"
/>
</div>

## The Theory of Constraints

Since PostHog is a work tool – not a [lifestyle brand](/merch)– even our most enthusiastic users won't adopt an infinite number of new things per week.

In practice, B2B SaaS users tend to adopt:

* One big new thing every few months
* A couple of medium improvements
* A handful of small quality-of-life upgrades

Everything else gets ignored until someone explains why it matters. This is a classic bottleneck.

Luckily, bottlenecks have solutions. Manufacturers discovered this and crystallized it in a concept called **Theory of Constraints** (TOC). There's one principle of TOC that is particularly relevant here:

> When upstream output increases without increasing downstream capacity, the system destabilizes.

In our case:

* **Upstream** we have 40+ small teams [working asynchronously](/newsletter/how-we-work-async), shipping at a high velocity, and [AI accelerating productivity](/newsletter/ai-coding-mistakes).
* **Downstream** we have limited user attention, comprehension, and engagement capacity.

Recognizing this, TOC can again help us understand the consequences of this mismatched capacity:

### 1. Queue buildup

In manufacturing, this looks like excess inventory. In software, this creates an invisible backlog – work that's finished on your side, but unfinished in terms of user awareness and understanding.

The result is diffuse impact: lots of progress shipped, but less progress felt.

### 2. Time-to-value increases

As that backlog grows, the gap between production and adoption stretches. Your team keeps shipping code, but each new capability takes longer to move from "available" to "useful."

Users struggle to keep up with what's changed. Support and sales spend more time explaining context. Marketing lags releases instead of amplifying them.

### 3. Quality degradation

When a bottleneck is overloaded, quality degrades through forced tradeoffs.

In software, that shows up as:

* Partial adoption instead of full behavior change
* Misunderstood capabilities
* Features used narrowly when they were designed to be foundational

Your product keeps getting bigger and better, but not proportionally clearer.

## Does that mean you should slow down?

Definitely not.

Slowing down is what companies do when they run out of ideas (and clearly that's not the problem). Fortunately, Theory of Constraints is quite explicit about what _not_ to do here:

> Improving non-bottlenecks is a waste of resources. You improve the system by elevating the bottleneck.

Product adoption happens one human at a time, and each individual user has a finite amount of mental bandwidth. So the real question isn't whether to slow down, it's this:

**How do you elevate adoption without killing velocity?**

![no hedgehogs were harmed in the making of this image](https://res.cloudinary.com/dmukukwp6/image/upload/Theory_of_constraints_alt_2_7509e8743f.png)

<NewsletterForm />

## How to address the real bottleneck of user attention

If you're building anything serious (and using AI to increase throughput), you'll hit this wall eventually.

At PostHog, we're still figuring out the best way around it, but a few points are now painfully obvious.

### 1. Treat attention like a scarce resource (because it is)

[Small autonomous teams](/blog/why-small-teams-crush-tiger-teams) naturally optimize for their slice of the product. They own a feature and make it better.

Users don't experience a product that way. They're hit with _every product change_ through a finite amount of attention they're willing to spend.

That mismatch is where things start to break.

**What failure looks like:**

You treat launches as [outputs instead of outcomes](https://productschool.com/blog/analytics/output-vs-outcome).

You see this when companies (especially startups) excitedly announce every new feature, and when changelogs or emails become the main way users are expected to keep up.

There's only a limited amount of attention these methods capture. Ship fast enough and even engaged users will start showing [feature fatigue](https://www.linkedin.com/pulse/feature-fatigue-love-focus-derek-francis-mezxc/).

If you've ever heard "I didn't know you could do that" from a long-time customer – congratulations, you've shipped past the speed of adoption.

**Do this instead:**

Keep shipping, but be aggressively opinionated about what matters _right now_.

Not everything needs a launch, a blog post, or to be explained immediately.

Define a [launch tier framework](https://aakashgupta.medium.com/the-launch-tier-system-that-transforms-product-teams-fddbb55a785c) such as:

1. **Category definers:** New product rollouts or major designs that change how customers think about your category. Require full company alignment. For example, [PostHog AI](/ai).
2. **Strategic upgrades:** Meaningful product improvements (not redefinitions) that don't require the full machinery of a major campaign. For example, [PostHog Logs launch](/blog/logs-ga).
3. **Steady improvements:** Standard product development that doesn't require coordination beyond the product team. For example, LLM Analytics adding [time to first token](/changelog?id=2558).

This is where brand helps. Things like [humor](https://www.youtube.com/playlist?list=PLnOY1RYHjDfxcuWI_L1xwuhoXAsxR59VL), narrative, and deliberate [absurdity](https://www.youtube.com/watch?v=EXisgy6eWJ0) work because they lower the cost of paying attention. [Partnering with influencers](https://www.linkedin.com/feed/update/urn:li:activity:7401713037386379265) that own trust with your ICP is another way to extend mindshare beyond your brand channels.

> **What this looks like:** Notion ships constantly, but markets selectively. Many features land with almost no fanfare, while a small number (AI, databases, templates) get sustained narrative investment over months.

### 2. Build discovery into the product

If realizing value requires explanation _outside_ of the product, you haven't removed the adoption bottleneck – you've just moved it downstream to marketing, sales, or support.

Users don't wake up wanting product updates. They're trying to get something done and move on with their life.

That's why feature discovery strategically tied to intent works better than announcements that land out of context.

**What failure looks like:**

Relying on external channels for discovery is brittle. As Andrew Chen argues in [Every marketing channel sucks right now](https://andrewchen.substack.com/p/every-marketing-channel-sucks-right), most channels are noisy and saturated. And despite the internet clout you may think it awards, focusing your efforts on Product Hunt, G2, or Hacker News probably isn't [worth the investment](https://news.ycombinator.com/item?id=29864157).

Your owned channels can easily make things worse. You've no doubt been a victim of generic product emails without meaningful [segmentation](https://www.reforge.com/blog/what-is-user-segmentation) ("why did I receive this?") or a disruptive in-app experience full of tooltips, banners and popups.

Worst of all are launch videos or press releases that promise "revolutionary" outcomes but don't clearly explain what changed in the product. [Marketing features over benefits](/newsletter/marketing-for-devs) is a good pattern breaker, but be warned: too much focus on "what" rather than "now what" makes product adoption someone else's problem.

<div className="flex justify-center">
<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/community_product_meme_328cb8a9f4.jpg" 
  alt="never log off"
  classes="rounded"
/>
</div>

**Do this instead:**

Surface features when they're relevant to what the user is already doing.

Start by defining clear [activation criteria](/product-engineers/activation-metrics) – the signals that indicate a user is engaged with certain parts of your product. Once you discover these signals, you can anchor new features to tasks users already care about.

For example:

* When a HubSpot user captures 10+ leads, lead scoring tools gets surfaced
* When an Asana user creates a second project, the team invitation flow triggers
* When a Zapier user has run multiple successful automations, multi-step templates are emphasized

Another name for this is [continuous discovery](https://www.youtube.com/watch?v=9RFaz9ZBXpk): letting user behavior and feedback influence what gets amplified next.

[Emails](/workflows) and [tooltips](/docs/product-tours/start-here) can help here, but only when they're contextual: "you're using X, so Y might be useful." Better is adding features to existing habit loops, encouraging users to build new habit loops with the features, or making the features sharable.

> **What this looks like:** Atlassian famously struggled with feature sprawl across Jira, Confluence, and their other products. Users couldn't keep up with so much surface area. The solution wasn't more marketing, it was investing heavily in in-product discovery, clearer use-case documentation, and opinionated defaults to guide users to success.

### 3. Measure learning, not just usage

Product adoption isn't only about feature usage, it's about helping users get better at their jobs because those features exist. That's why a lot of our content marketing isn't really about PostHog at all – it's about [how to become a product engineer](/blog/what-is-a-product-engineer).

Sharing knowledge and being helpful builds trust and brand recognition in a way feature announcements never will.

**What failure looks like:**

When teams get this wrong, they focus on vanity metrics, push product teams toward being a [feature factory](https://xenoss.io/blog/product-velocity-trap-solutions), and publish content that only makes sense if someone already cares about the product.

One of the biggest mistakes you can make is believing other people care about the product as much as you do.

They don't.

**Do this instead:**

What works better is publishing things that are useful even without your product:

* Real learnings, like [how we built our AI setup wizard](/blog/correct-llm-code-generation)
* Internal knowledge turned into [public artifacts](/handbook)
* Honest writeups like [postmortems](/blog/nov-24-shai-hulud-attack-post-mortem) for incidents

Even better, teach the domain you operate in – not just how your product works. Figma, for example, teaches people how to be [better designers](https://www.figma.com/blog/insights/), not just how to use Figma.

Events are another great tactic to build a community adjacent to your product. For example, Lovable's [SheBuilds](https://shebuilds.lovable.app/) hackathon encourages more women to try vibe coding.

> **What this looks like:** HubSpot pioneered inbound marketing by teaching people how to be better marketers before selling them software. For many young professionals, that learning happened years before any purchasing decision – and by then, brand equity was already baked in.

## Fast, not frantic

It's tempting to treat "shipping too fast" as a humblebrag, but that's lazy thinking. If users can't adopt what you ship, it's not velocity, it's waste.

Practically, that means being explicit about what actually deserves attention – and just as explicit about what doesn't.

**So when _should_ you market a specific feature?**

* It changes a core workflow, not just adds another option
* It compounds with an existing behavior (and you can surface it in-context)
* It has a clear "aha" moment you can design for
* You're able to support it with docs, onboarding, and follow-up content (not just a blog post)

Everything else should move through the system quietly, without competing for attention it doesn't need.

Product velocity only compounds when adoption keeps up. If user attention is the bottleneck, your job isn't to slow down – it's to be selective. Make a few things loud on purpose, and let the rest be quietly excellent.

<NewsletterForm />
