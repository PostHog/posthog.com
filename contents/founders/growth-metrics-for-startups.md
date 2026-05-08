---
date: 2026-05-08
title: "A guide to growth metrics for startups that can't sit still"
author:
    - mine-kansu
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/how_to_with_no_experience_3d0f159f50.jpg
featuredImageType: full
tags:
    - Founders
    - Growth
    - Ops & finance
crosspost:
    - Blog
---

Most advice about growth metrics and revenue ops is for businesses that follow classic B2B SaaS – predictable contracts, a single product, and clean MRR lines.

PostHog, on the other hand, is pretty weird. 90% of our users are indie developers who stay on the free tier for life. We do [usage-based pricing](/founders/pricing-lessons) and literally tell people to pay us less. We also serve free hot dogs at developer conferences.

We've more than 6x'ed our ARR over the two years since I joined. That number in and of itself says a lot, but I also want to talk about the work that went into figuring that number out.

Here's all the advice and lessons learned about growth metrics that I'd give to founders at other companies that don't follow the standard playbook.

---

## 1. Defining your ICP is not optional

If you pull PostHog's usage data without any filters, you'll see a huge dip every June. Investors often express concern about this at first since, for most companies, that's a red flag.

But for us, it's fine. Because when you filter for our actual ICP – technical people at mid-market companies – you see a clean growth trend instead. Turns out it's just all the hobbyists taking a break for the summer:

![ICP retention](https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2026_05_08_at_2_53_24_PM_025be5c8e4.png)

That's the power of a strong ICP definition. A lot of founders think of ICP as this fuzzy sales and marketing framework, but it's the foundation of your entire business. It ties your product to the market and cascades to every function. You can't skip it.

If you don't define your ICP, you'll suffer. A lot. And I get why people struggle with it – it requires making a bet on who you're _not_ building for, which feels scary when you're hungry for revenue and worried about ruling anyone out. It's also tempting to keep your ICP broad so you have wiggle room, but a vague ICP is just no ICP. You need to get specific enough that it feels a little uncomfortable.

Defining our ICP is the most important thing we've ever done. The rest of this article is pointless if you don't start with this.

James and others have already written a lot about how to do this, so I'll link them here instead of repeating them:

- [How we found our Ideal Customer Profile](/founders/creating-ideal-customer-profile) – James Hawkins on the exact process we ran, including tracking customers who _didn't_ buy
- [Defining our ICP is the most important thing we ever did](/newsletter/ideal-customer-profile-framework) – a more structured framework with the specific attributes to define and how to test them
- [The Product-Market Fit Game](/founders/product-market-fit-game) – how ICP and PMF are intertwined, and why you can't find one without the other
- [How to measure product-market fit](/founders/measure-product-market-fit) – once you have an ICP, how to tell if you actually have fit within it

---

## 2. Make customer traits queryable across all functions

Too many founders just define their ICP and then stop. This is a mistake.

Saying "these are the customers we want" is the easy part. Making sure your whole team can actually go after them is the work. A product manager looking at feature adoption rates needs to be able to filter product telemetry by ICP and non-ICP customers, or else they'll continue to be misled by noisy data. All functions – product, sales, engineering, marketing, everyone – need to be able to query by the same customer traits across all data. That's how you make sure everyone's actually working toward the same goal.

Operationalizing this is where I spent most of my first year at PostHog.

I started by building a Clay automation that checks multiple data sources for every new signup – company size, industry, funding stage, tech stack – and pushes that data back to PostHog as user properties. It runs automatically, so anyone on the team can slice any insight by ICP match in seconds without having to re-derive who counts.

One challenge I faced was that most enrichment vendors are built around large enterprise customers. If your ICP is startups or early-stage companies, you'll find a lot of gaps. Clearbit is great for big company data, but it wasn't working for the kinds of companies we care about. We eventually found [Harmonic](https://harmonic.ai/), which indexes startup data for VCs, and it had much better coverage for our segment.

We've since extended the same enrichment data to combine with usage signals that sales looks at (e.g., activation events, invite volume, feature breadth) to score accounts for expansion potential. Strong matches get tagged in Salesforce for outreach, which is how we're expanding our [PLG](/founders/product-led-growth) to PLS motion today.

---

## 3. Focus on consistency over accuracy

Once we had systems to query for ICP data, my next step was to actually start measuring our growth in this segment.

Many founders get caught up trying to come up with the most accurate metric possible. What I've learned is that consistency is way more important at this stage. An 85%-accurate metric measured the same way every week is worth more than a 95%-accurate one recalculated differently each time. We're trying to figure out growth and deltas, not a magical formula that captures any arbitrary point in time.

In practice, that looked like me reporting a number every month, someone asking why it moved, me explaining the gap, identifying the pattern, modeling a cleaner version, sharing it with PMs and execs, and repeating.

This part can feel frustrating because I'd always have to add caveats along the lines of "here's the number, but here's how it would change if we reported differently" while we were figuring it out. Some examples:

1. When ElevenLabs had a major product launch, their PostHog usage tripled. Under our old reporting method – booking prepaid contracts as fixed monthly revenue regardless of actual usage – that surge was invisible, so revenue looked flat even though we were delivering more value than ever.
2. If a customer implemented PostHog incorrectly, they'd sometimes generate a spike in billed events and then churn. That would show up as a great revenue month followed by unexpected loss, making it look like a business problem when it was really an onboarding one.
3. February has three fewer days than March. For usage-based billing, that creates a consistent month-over-month dip that has nothing to do with the health of the business.

These were incredibly misleading without context because we were operating with traditional SaaS metric calculations, but each cycle helped us get closer. Eventually, enough of those cycles stacked up and patterns became clear.

For example, we fixed the prepaid contract problem by switching to actual [usage-based revenue recognition](/revenue-analytics): the revenue line now reflects what customers use, not a fixed amortization of what they paid upfront. My life genuinely got easier after that. ElevenLabs' launch now shows up as a strong month; implementation spikes are visible as spikes.

Once we could smooth out seasonal variation and one-off spikes, we got a much more stable view of trends over time.

There are still explicit corrections in the retention calculation for events like DDoS attacks, implementation mistakes, and customers who never really activated. We document all of these so anyone can dig in. But they're systematic and pre-explained instead of ad-hoc footnotes I'm writing fresh every month.

---

## 4. Be opinionated but defensible with your numbers

For our core growth metric, we now use average quarterly MRR, annualized:

```
((MRR_month1 + MRR_month2 + MRR_month3) / 3) × 12
```

Taking the average of three months before annualizing directly addresses the February problem – a short month no longer creates a mechanical dip in our reported ARR. It also smooths out one-off spikes from a single big launch or an unusual billing cycle, so the number moves with the actual trend of the business rather than with noise.

That's now the single number that captures how the business is actually doing, and what we track against "the hundy" (what we call our $100M ARR goal for 2026 internally).

We can report it with confidence now. It's filtered for the customers we actually care about, with a metric calibrated to how our business works, refined through two years of iteration with investors and the team.

What you measure depends a lot on your stage too. If you're pre-revenue, anchor on whatever value you're actually delivering and find the metric closest to it. If you're Duolingo, it's people coming back and learning something every day. If you're a classic SaaS, it's usage frequency per person. For an AI company, frequency might not be the right frame at all – it's more about how you define value for those customers.

Once you have revenue, pair it with [retention](/retention). That combination forces the right question: are the users I'm retaining actually generating revenue? If your growth is 12% but retention is 75%, you're not really compounding. You're just refilling a leaky bucket.

The specific formula matters less than the principle: be opinionated about what accurately represents your business, be ready to explain it, and stick with it. The goal is a number that tells the story with as few footnotes attached as possible.

The biggest pitfall I see from founders is complicating things too early to a point where they can't concretely answer why they chose to measure something the way they did. To counter that, I always suggest starting simple and layering on more only once you have the previous layers in a good state:

![Layers of metrics](https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2026_05_08_at_2_53_44_PM_0909e372d5.png)

---

## 5. Don't overthink measuring growth for agents

The biggest open question I'm sitting with right now is: what does this all look like when AI agents are doing the work?

When the "user" isn't human, retention and activation mean something different. The industry hasn't settled on a framework yet, and I notice a lot of people defaulting to standard metrics because they're familiar and investors know what they are – even when they don't really fit.

My take is that the definitions of retention, activation, and revenue retention don't change. What's changing is how we measure them. Retention tied to "did the user come back this week" doesn't make sense if your users are agents, so the better question to guide your selection is whether the agent continued to get called, succeeded, and produced outputs someone else (human or agent) actually acted on?

This is a shift toward measuring things like agent success rates, code merge rates, and whether an output was used in the next downstream step, and not just whether the model generated a valid response. [Evals](/docs/llm-analytics/evaluations) can become one of the most useful early signals. If you define what a valuable output looks like and track that over time, evals can help you measure product quality, spot retention trends, and even identify which user segments are closest to your ICP.

Some potential metrics I'm thinking on are therefore task success rate, workflow completion rate, output-acted-upon rate.

We don't have a clean answer yet, but the framework I'm leaning on is the same one that got us here: find where value is actually being experienced, build your measurement around that, and iterate. 
