---
title: Fixing growth problems with MasterClass's former Head of Growth Engineering
date: 2023-10-17
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

Stuck metrics. Missed KPIs. Burnt out engineers. These are the telltale signs of a growth team in crisis. But how do you fix it?

If anyone knows, it's [Alexey Komissarouk](https://alexeymk.com/). He's worked in growth for eight years. First at Opendoor, followed by a three-year stint as Head of Growth Engineering at MasterClass, where he grew the growth engineering org to 25 people across 5 teams.

These are the most common growth problems he's encountered and how to fix them.

## Problem 1: Moving too slowly

Your PM complains that the team is moving too slowly. The engineering team says there is too much technical debt. Sound familiar?

Slow velocity is usually a result of over-engineering. "Growth engineering is counter-intuitive, and many engineers don't have the right mindset at first.", says Alexey, 

"They want to implement elegant solutions to complex problems. Growth engineering is the opposite of that. You need to move fast and iterate quickly."

### How to fix it

First, sit with the engineering team and [prioritize your technical debt](https://alexeymk.com/2021/04/01/a-toolset-for-tackling-technical-debt.html). Figure out what is *actually* slowing you down (or likely to) and by how much. Once you have a ranked list, empower your team to fix it and assign 10%-20% of engineering time to do so.

Second (and more importantly), urge your team to take shortcuts. The role of a growth engineer isn't necessarily to build features, but to validate whether a feature should exist or not. 

As a team, look at your last 20 experiments and identify which ones you could have validated faster. Thomas Owers, former growth lead at [Let's Do This](https://www.letsdothis.com/), has [good advice](/blog/how-to-start-a-growth-team#thomass-golden-rule-make-your-code-changes-as-small-as-possible) on this:

"Instead of asking 'How long will a project take?', ask 'What can you do in only 1 week? 3 days? Half a day?'. Often, you'll find that you can reduce the scope of the change while still being able to validate your hypothesis".

## Problem 2: Prioritization

You keep trying different experiments, but none have a meaningful impact and become a waste of time. It feels like you're always picking the wrong projects to work on.

Alexey says this comes from teams not spending enough time estimating the effort and impact of their projects. 

"Typically, teams prioritize their roadmaps by using frameworks such as [RICE](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/) and assigning t-shirt size estimates ("S", "M", "L"). This doesn't go deep enough." 

"Spending only five minutes estimating the impact from something your team will spend weeks on doesn't make sense."

### How to fix it 

Once you have shortlisted the ideas you want to work on, the next step is to **estimate the dollar impact of each one**.  

Then, use this dollar amount together with your effort estimates to calculate a prioritization score:

![How to calculate your prioritization score](../images/blog/fixing-growth-problems/how-to-calcluate-prioritization-score.png)

Because you'll have a clearer idea of what to expect from your experiments, you'll prioritize the ones more likely to win. The table below shows an example:

![Example of prioritized projects table](../images/blog/fixing-growth-problems/prioritization-table.png)

Alexey says that **one of their biggest wins came from following this approach**:

"At MasterClass, we had a single subscription type. We knew we would eventually need to add tiered pricing, but this would be a huge, months-long company effort. We had no idea how much this would impact our revenue, so we struggled to prioritize it."

"I knew we needed a dollar estimate, so we created a simple [fake door test](/tutorials/fake-door-test). Users could select their preferred tier – but at checkout, we let them know they were being upgraded to the best tier and at the cheapest price. In reality, this was the existing one-size-fits-all pricing, and we hadn't actually built any of the functionality to support these new tiers."

"This saved us months of engineering time and enabled us to understand how much we could gain if we built this. Once we knew how much money the company stood to make, we prioritized it immediately! And it was incredibly easy to ask the rest of the company to work on it for a few months."

## Problem 3: You're running out of experiment ideas

Your growth team has been around for a few quarters and you've picked all the low-hanging fruit. Your new experiments now require more effort AND have less impact. Your momentum is stalling and your team is beginning to feel demotivated.

### How to fix it

[John Egan](https://jwegan.com/growth-hacking/managing-growth-teams-portfolio-step-step-guide/), former head of growth engineering at Pinterest, recommends two levers you can pull:

#### 1. Make it everyone's job to come up with project ideas

The best way to increase the number of high-quality projects is to create a bottom-up culture where it's the job of **every single person** to come up with ideas. That means every engineer, designer, data scientist, sales rep, marketer, etc.

When it's everyone's job to do this, the number of ideas increases dramatically. Then, by applying the prioritization framework mentioned above, you can distill the list to only the best ideas.

#### 2. Make your engineers own their experiments

Every engineer must be responsible for making their experiments as impactful as possible – even if it wasn't originally their idea. 

Empowerment is the key here. When engineers take charge of their experiments, they become more invested in the outcome, leading to better results.

In practice, this means:

- Engineers work to improve the initial hypothesis.
- Engineers develop further iterations to test. 
- Removing processes that prevent engineers from making quick decisions on their own.
- Giving engineers space to fail without being harsh on them.

## Problem 4: Fear of making mistakes

If your team is not making mistakes, you're not moving fast enough. 

In fact, it's common for growth teams to cause a few incidents! And they won't succeed if they are focused on avoiding them.

"When airbags were [introduced](https://www.purdue.edu/uns/html4ever/2006/060927ManneringOffset.html) in cars, the average speed on the highway went up. This is essentially what you want to do for your growth team. Give them the freedom to make mistakes, but make sure they can resolve them quickly", says Alexey.

### How to fix it

Your aim should be to build a resilient system that can rapidly recover from mistakes or incidents.

In the context of growth teams, there are a few ways to do this:

- Monitor critical metrics and set up alerts. Ensure you can quickly roll back changes using [feature flags](/blog/feature-flags-vs-configuration).

- Set up [review apps](https://seanconnolly.dev/review-applications) so your team can easily test and dogfood your experiments.

- To test releases in production, set up [conditional overrides](/docs/experiments/testing-and-launching) so you can quickly test each experiment variant.

- Instead of crashing your app when rendering errors occur, display a fallback UI. In React, you can easily add these with [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary). Similar concepts also exist in other frameworks.

Notice that none of the solutions involve writing tests, which can be a **waste of time** for experiments that only last a week. Instead, consider what it would take to comfortably ship changes without tests.

## Problem 5: Fatigue

It's common for engineers to start feeling unsatisfied after a few quarters, and there's no shame in it. Growth engineering may not be as fulfilling for some people, especially if they yearn to build deep and complex systems. A symptom of this is diminishing returns from your team's work. 

### How to fix it

Rotate your engineers. Rekindle their enthusiasm and expose them to new challenges. Offer them opportunities to change teams or projects.

This has many benefits, like knowledge sharing across teams and diversifying skill sets. Most importantly, it significantly reduces the risk of losing a talented engineer.

## Further reading

- [Alexey's growth engineering newsletter](https://alexeymk.com/growth-eng/)
- [What is a growth engineer? (And why they're awesome)](/blog/what-is-a-growth-engineer)
- [How to start a growth team (as an engineer)](/blog/how-to-start-a-growth-team)