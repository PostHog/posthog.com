---
date: 2021-08-26
title: What's the Role of a Product Team at an Engineering-Led Organization?
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: paolodamico
featuredImage: ../images/blog/product-at-posthog.png
featuredImageType: full
---

We’ve talked before about [product-minded engineers](https://posthog.com/blog/turning-engineers-into-product-people) at PostHog. We don’t have PMs dictating a roadmap or solutions - it all comes from engineering. A PostHog engineer has complete autonomy to decide the what (prioritization) and the how (solution) of the features we build, so Product & Design play a role that’s a bit different to the typical tech startup. Let’s quickly look at the product development workflow at PostHog, the responsibilities of the Product Team, the benefits & results of this approach, the foundations required to build a team like this, and some pitfalls and learnings we’ve acquired along the way.

## Product development workflow

### Strategy 

The product process starts with the product strategy. Our product strategy directly derives from our company’s goals and informs the high-level approach to Product. It may be tempting to skip this step, but doing so will cause immediate problems in the execution (see pitfalls below).

For example, our current company goal is to achieve deep product-market fit by finding a handful of customers who absolutely love PostHog. With this in mind, we set out to create different product strategies that align towards this goal. An example of this was our [Nail Funnels](https://posthog.com/blog/new-vp-nailing-funnels) strategy, where we set out to enable our customers to dive deep into their metrics to understand conversion across different contexts.

Note that while these strategies come from Product, the process is highly collaborative. At PostHog, a strategy gets proposed with a strong rationale and details about the opportunity cost of doing it. Everyone at PostHog is encouraged to challenge and provide [feedback](https://posthog.com/handbook/people/feedback) on the proposal to improve it.

### Execution

The next step is to turn this high-level strategy into scoped and actionable focus points for each sprint cycle to coordinate all small teams.

For example, with our ‘Nailing Funnels’ strategy, one of the first points of focus was enabling users to build any type of conversion funnel for the different businesses and products we serve. Another subsequent focus was on enabling deep diving to understand conversions and drop-offs.

### Prioritization

With a clear scope of execution, each team can now plan their sprint and prioritize their tasks autonomously, with engineers prioritizing what they think is the most important tasks to work on.

### Design and build phase

Each feature that we build goes through a collaborative design process involving Engineering, Design and Product. Product provides context from user interviews, data analysis, usability tests, industry benchmarking, and other sources and gives feedback on proposed solutions. We pay particular attention to edge cases and overall user experience in order to reach the best outcome.

### Quality checks and shipping

During the development process, all team members are active in continuously reviewing the product and giving feedback. Early feedback is particularly useful to detect and fix any problems before they have a bigger impact down the line. Depending on the feature, we might also run a more structured quality test and report any bugs found, and run usability tests with potential product users to identify improvements (particularly around UX) that we might’ve missed in the design phase.

## Responsibilities of the Product Team

So if Engineering handles the roadmap and prioritization, and speccing out solutions is a collaborative effort, what’s the role of the Product Team at PostHog?

- Help **scope out problems and solutions**: A key aspect of building out a product is figuring out the right problem to fix. From a high-level product strategy, we need to scope down specific problem(s) to solve. It doesn’t matter how good you are at building if you’re building the wrong thing. Once engineers start working on solutions to the problems, Product also helps scope down solutions, always challenging whatever makes the most sense to achieve our goals and deliver the best user experience.
- **Gather and share context**: Every engineer is empowered to make decisions on their own, not just on where to put a button, but on the entire thing they work on. Having all the right context is key to making good decisions. 
- Maintain the **user’s point of view**: As we get into the weeds of building things, it’s easy to forget who we’re building this for. To make sure we deliver the best possible user experience, we continuously run usability tests, feedback calls, and even watch session recordings to see things from a user’s point of view and validate or invalidate our assumptions. I can’t tell you enough how useful and often overlooked running usability tests is (post on this coming later).
- **Provide feedback** & ensure product quality: We want to both build new product features and ensure we’re constantly raising the bar. We do this by doing continuous quality testing, dogfooding our own product, and challenging engineers to sand the rough edges even in the smallest ways. We’re also always on the lookout for remote edge cases that are easy to miss.
- Help **set up metrics and challenge continuous tracking**: Building things is rewarding in its own right, as you can very clearly see and judge your output. It’s tempting to ignore actual numbers informing you whether what you build is actually successful or not - but remember, it’s about outcome, not output. Even if you created the most amazing product with the smoothest experience, if no one’s using it or they’re using it incorrectly, it’s a failure (and a learning). As the Product Team, we’re constantly challenging ourselves and engineers to set up the right metrics that measure actual progress towards our goals. Doing this right also contributes more context for the next product iteration.

A note on removing blockers. It is typically the responsibility of a PM to remove blockers for the engineering team. As a dev, you come to your daily standup, mention that you’re blocked because stakeholder X has not sent you something you need, and the PM goes to raise hell all around to get you unblocked as quickly as possible. When you have a very strong and autonomous engineering team, this doesn’t need to happen at all. As an autonomous engineer I own my features, if I get blocked I’ll go do whatever I need to do to get myself unblocked. At best Product provides some context on who to talk to or suggestions on how to get unblocked.

## Benefits & Results

- Design and build the best possible solutions. As multiple studies show[1](https://dlibrary.stanford.edu/questions/who-produces-better-ideas-individuals-or-teams), creative solutions are generally better conceived as a multidisciplinary team effort. Having Engineering, Product, and Design involved ensures that everyone brings a different perspective to the table.
- Work on the most important things. Context and goals are shared, everyone is equally responsible for delivering on them. With this each team member can hold each other accountable that we’re working on the best possible things. Also, if you’re not an engineer and think something is important to build, you now need to convince an engineer why that’s the most important thing to work on (acting as a sort of check), and as an engineer when you decide to build something you’re committing yourself and your time, so you make sure you’re working on the right things.
- Higher standards. Probably one of the biggest successes that we’ve had with this approach is that every engineer is raising the bar in challenging not only the solutions we build, but the problems we work on. As an engineer you’re constantly thinking not only about the executional details of what you’re building, but the big picture of how this all ties together or whether it’s even worthwhile to begin with. This is almost impossible when Product prescribes the roadmap and its priorities.
- Faster turnaround, particularly spotting and solving problems. First of all you remove redundancies in the process, for instance, coming up with a solution and then needing to check with engineering if it’s feasible. Furthermore, as engineers are owners, they drive the project forward faster to completion.
- Better results (measurable). It’s not only about coming up with better solutions (i.e. output), but better results (outcome), because it’s as much the job of the engineer, if not even more, as it’s the Product Team that whatever we build delivers results and actually achieves the goal. If a feature is not actually achieving its goal, the engineer will be responsible and immediately work on addressing the issue, no need for triangulation.


## Prerequisites
Decentralized, product-minded engineering organizations are not easy to build and can be rare, even in startups. One of the biggest challenges is avoiding the common trap of PMs becoming dictators and engineers becoming code monkeys (check out our [original post](https://posthog.com/blog/turning-engineers-into-product-people)). We’ve found three essential elements your team needs to operate properly: 

1. *Product-minded engineers*: As an engineer, if you’re not constantly thinking about who you’re building this for, why you’re building this, and what are you trying to accomplish, you won’t be able to execute a product vision autonomously.
2. *Empowered and decentralized team members*: where a designer can spot a problem, same as an engineer; where everyone can give feedback on anything; and where anyone can challenge everyone else’s assumptions and solutions.
3. *Team members with solid judgement*: Because everyone is constantly making decisions (and quite impactful ones at that), you need people who have good judgement.

## Pitfalls

Finally, I’d like to share some mistakes we’ve made in our iterative journey to improve the Product team, and how to avoid them.
- *Prescribing solutions:* Discussions and proposals can be simpler when talking about specific solutions instead of higher level problems/hypotheticals. The problem is that coming up with solutions rather than problems removes ownership and restricts the scope of potential solutions.
- *Lack of strategic and tactical direction:* It’s tempting to skip having strategic direction or defining specific tasks under said strategy, but doing so will manifest in poor, unfocused decisions. 
- *Projects with little to no engineering involvement:* You get a spontaneous idea on how to improve the product, gather some context, explore it, and arrive at a fully spec’d out solution with nary an engineer in sight (usually by accident). Two big problems come from this: a) you don’t reach the best solution because you lack important context, and b) you now have a project ready to be implemented but no engineer to pick it up. When working on ideas, however crazy, always involve engineering from the start, and ideally have an engineer co-own the idea with you. 
- *Strongly linked dependencies:* This can happen when you have processes that rely on a bunch of different people (e.g. design having to review every view that goes into the app) or heavily defined scopes (e.g. if you’re a frontend engineer that can’t touch the backend). When this is present, it’s quite hard to be autonomous and effective because you constantly get blocked by other people. Blurring scopes and removing dependencies can make it easier and faster to ship things. Remember, you have a capable team with good judgement, so no need to encumber the creative process.

_Enjoyed this? Subscribe to our [newsletter](https://posthog.com/newsletter) for more posts on startups, product, growth, and analytics._

