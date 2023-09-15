---
title: Why your growth team isn't winning (and how to fix it)
date: 2023-09-14
author: ["lior-neu-ner"]
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: ../images/blog/athlete-hog.jpeg
featuredImageType: full
category: Product growth
tags: 
  - Guides
  - Product metrics
  - Product engineers
---

There are telltale signs when a growth team isn't succeeding: Stuck metrics, missed KPIs, and burnt-out engineers. Everyone is frustrated, but how do you fix it?

[Alexey Komissarouk](https://alexeymk.com/), former head of growth engineering at [MasterClass](https://www.masterclass.com/), has seen it all. He grew Masterclass xyz... 

Alexey shared his advice with us on how to get your growth team winning again. Here are the key takeaways:

## Problem 1: Your team is moving too slowly

Your PM complains that the team is moving too slowly. The engineering team says there is too much technical debt. Sound familiar? This is caused by engineers having the wrong mindset.

Slow velocity is usually a result of [over-engineering](https://www.joelonsoftware.com/2001/04/21/dont-let-architecture-astronauts-scare-you/). "Engineers hate doing growth. They want to implement elegant solutions to complex problems. Growth engineering is the opposite of that", says Alexey.

### How to fix it

First, sit with the engineering team and [prioritize your technical debt](https://alexeymk.com/2021/04/01/a-toolset-for-tackling-technical-debt.html). Figure out what is *actually* slowing you down (or likely to) and by how much. Once you have a ranked list, empower your team to fix it and assign 10%-20% of engineering time to do so.

Second (and more importantly), urge your team to take shortcuts. The role of a growth engineer is not necessarily to build features, but rather to validate whether a feature should exist. 

With this in mind, a good team exercise is to look at your last 20 experiments and identify which ones you could have validated faster. Thomas Owers, former growth lead at [Let's Do This](https://www.letsdothis.com/), has [good advice](/blog/how-to-start-a-growth-team#thomass-golden-rule-make-your-code-changes-as-small-as-possible) on this:

"Instead of asking 'How long will a project take?', ask 'What can you do in only 1 week? 3 days? Half a day?'. Often, you'll find that you can reduce the scope of the change while still being able to validate your hypothesis".

## Problem 2: Your experiment win rate is low

You keep trying new ideas, but none of them are succeeding. 

"You need better ideas," says Alexey, "and, counter-intuitively, the way to do this is to spend more time adding clear estimates to your current ideas."

Typically, teams prioritize their roadmaps by using frameworks such as [RICE](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/) and assigning t-shirt size estimates ("S", "M", "L"). This doesn't go deep enough and leads to teams wasting time by building pointless things. 

Spending only five minutes estimating the impact from something your team will spend weeks on doesn't make sense.

### How to fix it 

Once you have shortlisted the ideas you want to work on, the next step is to **estimate the dollar impact of each one**.  

Then, use this dollar amount together with your effort estimates to calculate a prioritization score:

![How to calculate your EVELYN score](../images/blog/how-to-fix-your-growth-team/evelyn-score.png)

Because you'll have a clearer idea of what to expect from your experiments, the result is a higher win rate.

This approach was made famous by Facebook Messenger's VP of growth Darius Contractor and his [EVELYN framework](https://www.drift.com/blog/secret-to-faster-growth/) (He even shares a [handy sheet with real examples you can copy](https://airtable.com/appzs6HT2ggrJt9pN/shrInOxl0SL1Xmauk/tblTQFEMcXAaEgSpM/viwZessbXpiA8q2jd?blocks=bipMQFWTjqu0HI3wv)).

Alexey says that **one of their biggest wins came from following this approach**:

"At MasterClass, we had one-size-fits-all pricing. We knew we would eventually need to add tiered pricing, but this would be a huge, months-long company effort. We struggled to prioritize it."

Enter EVELYN. Alexey knew they needed a dollar estimate of the impact.

"Instead of building the entire backend, we created a simple [fake door test](/tutorials/fake-door-test) on the frontend. Users could select their preferred tier – but at checkout, we let them know they were being upgraded to the best tier and at the cheapest price. In reality, this was actually the existing one-size-fits-all pricing.

Now we knew how much money the company stood to make! We prioritized it immediately, and it was incredibly easy to ask the rest of the company to work on it for a few months."

## Problem 3: Your experiment win size is low

Your growth team has been around for a few quarters and you've picked all the low-hanging fruit. Your new experiments require more effort AND have less impact. Now what?

[John Egan](https://jwegan.com/growth-hacking/managing-growth-teams-portfolio-step-step-guide/), former head of growth engineering at Pinterest, recommends two levers you can pull:

1. Increase the number of high-quality project ideas.
2. Make your engineers own their experiments.

### Increase the number of high-quality project ideas

The best way to do this is to create a bottom-up culture where it's the job of **every single person** to come up with ideas. That means every engineer, designer, data scientist, sales rep, marketer, etc.

When it's everyone's job to do this, the number of ideas increases dramatically. Then, by applying the EVENLYN framework mentioned above, you can distill the list to only the best ideas.

> **💡 Tip:** To create an inclusive ideas culture, make your [brainstorms asynchronous](https://source.opennews.org/articles/redesigning-brainstorming-asynchronous/).

### Make your engineers own their experiments

Every engineer must be responsible for making their experiments as impactful as possible – even if it wasn't originally their idea. 

Empowerment is the key here. When engineers take charge of their experiments, they become more invested in the outcome, leading to better results.

In practice, this means:

- Engineers work to improve the initial hypothesis.
- Engineers develop further iterations to test. 
- Removing processes that prevent engineers from making quick decisions on their own.
- Allowing engineers space to fail without being harsh on them.

## Problem 4: Your team is afraid of making mistakes

If your team is not making mistakes, you're not moving fast enough. 

In fact, it's not uncommon for growth teams to cause a few incidents! And their goal must not be to avoid them.

"When airbags were [introduced](https://www.purdue.edu/uns/html4ever/2006/060927ManneringOffset.html) in cars, the average speed on the highway went up. This is essentially what you want to do for your growth team. Give them the freedom to make mistakes, but make sure they resolve them quickly."

### How to fix it

Your aim should be to build a resilient system that can rapidly recover from mistakes or incidents.

In the context of growth teams, there are a few ways to do this:

- Monitor critical metrics and set up alerts. Ensure you can quickly roll back changes using [configurators or feature flags](https://posthog.com/blog/feature-flags-vs-configuration).
- Set up [review apps](https://seanconnolly.dev/review-applications) so your team can easily test and dogfood your experiments.
- To test releases in production, set up [conditional overrides](/docs/experiments/testing-and-launching) so you can quickly test each experiment variant.
- Instead of crashing your app when rendering errors occur, display a fallback UI. In React, you can easily add these with [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) (and similar concepts existing in other frameworks).

Notice that none of the solutions involve writing tests, which can be a **waste of time** for experiments that only last a week. Instead, consider what it would take to comfortably ship changes without tests.

## Final tip: Your team may be tired

It's okay if your engineers are tired. Growth engineering may not be as fulfilling for some people, especially if they yearn to build deep and complex systems.

It's common for engineers to start feeling unsatisfied after a few quarters, and there's no shame in it. A symptom of this is diminishing returns from the team's work. 

There's an easy fix for it, though:

### How to fix it

Rotate your engineers. Rekindle their enthusiasm and expose them to new challenges. Offer them opportunities to change teams or projects.

This has many benefits, like knowledge sharing across teams and diversifying skill sets. Most importantly, it significantly reduces the risk of losing a talented engineer.

## Further reading

- [Alexey's growth engineering newsletter](https://alexeymk.com/growth-eng/)
- [What is a growth engineer? (And why they're awesome)](/blog/what-is-a-growth-engineer)
- [How to start a growth team (as an engineer)](/blog/how-to-start-a-growth-team)