---
title: What product managers do at PostHog
sidebar: Handbook
showTitle: true
hideAnchor: true
---

> This page explains what product managers do at PostHog: How the role works, what PMs are responsible for, and how they collaborate with their teams.  
>  
> If you're looking for what we value in PMs and how we hire them, see [What we look for in product managers](/handbook/product/product-manager-hiring).

## The role at a glance

At PostHog, product managers (PMs) exist to bring clarity and context to their teams.  
They do not own roadmaps or dictate what to build next. Instead, they ensure the team deeply understands its users and its product’s performance, so that the right decisions happen naturally.

A PM **owns** the following three areas for their product and team:

### Systems for user discovery & product thinking
- Ensure a system is in place for the PM and engineers to hold discovery calls with users regularly.  
- Have a process for storing customer feedback so that it’s retrievable if we ever decide to use it (but not putting it “in the backlog.”)  
- [Organize interviews](/handbook/product/user-feedback), lead metrics reviews, or host Replay watch parties.

### Team metrics
- Always know how the product is performing, both in usage and revenue.  
- Be aware of key trends, areas of concern, and emerging opportunities.  
- When metrics move in the wrong direction, create a plan or hypothesis for where to dig deeper next.

> We are following a defined format for growth reviews to make sure it's easy to compare performance across products. See [Per-product growth reviews](/handbook/product/per-product-growth-reviews) for more information.

### Pricing
- Regularly review whether pricing aligns with the value users get from the product.  
- Identify when pricing or packaging creates friction for adoption, retention, or expansion.  
- If we decide to make a pricing change, work on a new pricing model taking into account our pricing principles, and involve the billing and marketing teams at the right time to get the changes live.  
- Track the impact of pricing changes on revenue, conversion, and churn to understand what worked and what didn’t.

---

A PM **shares ownership** of the following areas with their product team.  
This doesn’t mean it's a lesser priority for a PM to own projects here. It simply means product engineers are equally expected to contribute. 

### User understanding
- Understand who users are, what problems they face, and how they feel about the product. This context should be sourced through any relevant channel: user interviews, surveys, PostHog, support tickets, GitHub issues, BuildBetter recordings, or other data sources.  
- Refine the product’s target persona(s) as the product matures, including their needs / jobs to be done, and track this information on the team page.

### Monitoring of the competitive landscape & industry trends
- Research best-in-class competitors and identify the biggest gaps between our offering and theirs.  
- Facilitate input from Sales, Support, and users, who are often acutely aware of the features we’re missing — especially if they’re about to cause someone to churn.  
- Keep an eye on new product launches and industry shifts to ensure we’re not missing emerging opportunities — see *[The Innovator’s Dilemma](https://en.wikipedia.org/wiki/The_Innovator%27s_Dilemma)* for reference.

---

A PM **supports** the following areas for their product and team.  
In consultation with the team, they might own projects in these areas:

- Launching a new product in beta or in general availability  
- Deciding on what we should be building next  
- Providing feedback on UX for features  

Everything else in the PM role builds on these foundations.

---

## The product lifecycle and the PM's focus

The PM’s work evolves with the product.  
While the principles stay constant — context and clarity — the emphasis shifts by stage of the product.

> **Note on the table below:** Especially in the early stages (1 & 2), a team usually doesn’t have a PM yet — product engineers own all product decisions.  
> Review this table with the context from “The role at a glance” (own/share/support) and “Deciding when to add a product manager to a team.”

| **Stage** | **Goal** | **Key PM questions** | **Typical PM work** | **Example projects** |
|------------|-----------|----------------------|----------------------|----------------------|
| **1. Idea → Beta** | Get a first version of the product into users’ hands | - Who are we building for?<br/>- What is the 80/20 of features?<br/>- What needs to happen to get this into beta as quickly as possible? | - Lead or synthesize early user research<br/>- Define MVP scope and launch criteria<br/>- Shape initial positioning → who the product is for and why it matters<br/>- Coordinate beta launch activities and internal comms (beta program, website copy, docs) | — |
| **2. Beta → General Availability** | Launch a product that users want to pay for | - What’s missing in the product to start charging for it?<br/>- How do we charge for it? | - Lead or synthesize early user research<br/>- Decide pricing model<br/>- Coordinate launch activities and internal comms (beta program, website copy, docs) | PostHog AI pricing, renaming “Max AI” to “PostHog AI” for clearer positioning |
| **3. General Availability → Growth Stage** | Strengthen and expand adoption | - Are users truly getting value?<br/>- Where are they dropping off or getting stuck?<br/>- What drives retention and revenue growth? | - Regularly review usage data, churn patterns, and feedback loops<br/>- Run interviews and other user research to understand user sentiment and evolving needs<br/>- Research “best in class” competitors to highlight gaps<br/>- Identify the biggest opportunities for improvement or expansion<br/>- Frame problems clearly so the team can decide autonomously what to build next<br/>- Collaborate on pricing adjustments or repositioning as understanding deepens | User interviews on error tracking, Surveys pricing change, Research into needs of data engineers after re-positioning of Data Warehouse / Data Stack |
| **4. High Revenue / Mature Product** | Sustain growth and manage complexity | - What’s limiting growth now?<br/>- What new segments, features, or pricing models allow us to sustain a 9% MoM revenue growth rate? | - Track advanced revenue and usage metrics (activation, retention, revenue retention)<br/>- Share context and opportunities in identified problem areas with the team<br/>- Run “conviction sprints” to refresh understanding of ICP and persona(s) as they relate to the product<br/>- Ensure product strategy stays grounded in real user and business outcomes | — |

---

## Deciding when to add a product manager to a team

Because most engineers at PostHog have strong product skills, many early-stage products don’t need a PM right away (stages 1 & 2).

At this stage, it’s typically the team lead’s job to decide:
1. What to build  
2. When to release the first version  
3. How to charge for it  

...with feedback and guidance from the Blitzscale team.

There are a few exceptions:  
When a team is working on an infrastructure-heavy product, it’s more important that the team lead has strong engineering and infra skills than product skills.  
In that case, it can make sense to add a PM early who can focus on product direction, positioning, and user research while the lead focuses on technical execution.

In most cases, though, we add a PM **after a product has launched and started generating revenue (stage 3)**.  
Once a product is live, product opportunities multiply, and it becomes the PM’s job to surface what matters most, connect user feedback with metrics, and ensure the team’s effort goes where it has the biggest impact.

Ultimately, it’s up to the Blitzscale team to decide when adding a PM will help the team ship faster and focus more effectively. When that becomes true, it’s time to bring in a PM.

---

## Collaboration and decision-making with the team

PostHog is an **asynchronous and autonomous organization**.  
PMs do not “own” the roadmap or feature priorities. The closest thing we have to a “product owner” at PostHog is the team lead.

Instead:

- Engineers choose what to work on next based on shared context.  
- The PM’s job is to provide that context: articulate problems, surface data, and make trade-offs visible.  
- When major calls (like positioning, pricing, or launch scope) need to be made, the PM and team lead collaborate closely to select an informed captain: One person who makes the decisions and sees them through. The other can provide feedback when requested, but focuses elsewhere.  
- A PM typically chooses their own projects, but the team and team lead can “assign” them tasks when needed.
