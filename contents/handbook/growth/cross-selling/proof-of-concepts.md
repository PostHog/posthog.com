---
title: Proof of concepts for cross-selling
sidebar: Handbook
showTitle: true
---

A proof of concept (POC) is a structured, ideally time-boxed evaluation where an existing customer validates a new PostHog product against their real-world use case. Unlike a [trial](/handbook/growth/sales/trials) – which is typically used in new sales – a POC is designed for cross-selling additional products to customers you already have a relationship with.

## Why POCs beat free credits

Offering free credits to encourage product adoption is easy, but it's also vague and erodes the value of your products. Customers often pocket the credits, poke around without direction, and rarely don't reach the point where the product delivers real value. A structured POC is different because it:

- **Ties directly to business outcomes** – Customers care about solving problems, not saving a few thousand in PostHog credits. A POC frames adoption around outcomes they actually care about.
- **Creates accountability on both sides** – You commit to supporting them through it, and they commit to giving it a real evaluation with real people. Two way buy-in is the only way to get real engagement.
- **Generates a clear yes/no signal** – At the end, you both know whether the product works for them. No ambiguity, no "we'll get to it eventually."
- **Builds champions** – The people involved in a successful POC become internal advocates for the product.

## When to run a POC

Run a POC when:

- You have an active relationship with the customer and have already completed the [cross-sell pre-requisites](/handbook/growth/cross-selling/how-we-upsell-and-cross-sell#wait-what-should-the-relationship-look-like-before-you-attempt-cross-sell)
- The customer has expressed interest in a product but hasn't adopted it on their own
- You've identified a clear use case through [discovery](/handbook/growth/cross-selling/cross-sell-motions#discovery-through-conversation)
- The product requires some implementation effort or behavioral change from the customer's team

Skip the POC when:

- The product is low-friction and self-serve enough that the customer can adopt it without guidance (e.g. enabling Session Replay with a toggle)
- There's no clear use case yet – do discovery first
- The customer is in an active support crisis or has unresolved issues with their current setup

## How to structure a POC

### 1. Define success criteria together

Before anything starts, align with the customer on what "success" looks like. Be specific.

- **Bad**: "Try out Error Tracking and see if you like it"
- **Good**: "Capture and triage errors across your three highest-traffic services. Identify at least one error impacting user experience that you weren't previously aware of."

Write the success criteria down and share them. A Slack canvas in a shared channel works well.

### 2. Scope the participants

A POC doesn't need the whole engineering team. Identify two to five people who will actively use the product during the evaluation. Fewer people with genuine engagement beats a large group with no accountability.

Make sure you have:

- At least one person with the authority to make an adoption decision
- At least one person who will do the hands-on implementation
- Someone who experiences the pain the product solves day-to-day

### 3. Set a timeline

POCs should be short – two weeks ideally. Extend to three or four weeks only if the product requires significant implementation effort.

| Week | Focus |
|------|-------|
| Week 1 | Implementation, initial configuration, first data flowing |
| Week 2 | Active use against success criteria, gather feedback |
| Week 3-4 (if needed) | Extended evaluation for complex setups |

### 4. Kick off properly

Run a 30-minute kickoff with the POC participants to:

- Confirm success criteria and timeline
- Walk through initial setup steps
- Answer technical questions
- Set expectations for how you'll support them (Slack, check-ins, async)

### 5. Stay engaged during the POC

Check in proactively – don't wait for them to come to you.

- Monitor their usage in PostHog (you can use Session Replay to see how they're interacting with the product)
- Share relevant tips, examples, or Loom walkthroughs
- Flag if engagement drops early – ask directly whether timing is still right

### 6. Close it out

At the end of the POC, run a feedback session:

- Review each success criterion – did they hit it?
- Capture what worked and what didn't
- If successful, discuss next steps for broader rollout and any commercial implications
- If unsuccessful, understand why and document it – this is valuable context for future conversations

## Tracking POCs

Open a cross-sell opportunity in Salesforce when you kick off a POC. This helps with accurate revenue recognition and gives visibility into the pipeline of cross-sell activity.

Track the POC outcome (won/lost/deferred) and document what you learn – this builds institutional knowledge about which products land well in which contexts.

## Example: Error Tracking POC

Here's what a structured Error Tracking POC might look like:

**Success criteria:**
- Capture errors across two or more production services
- Identify at least one previously unknown error affecting users
- Triage and assign errors using the PostHog interface
- Compare experience to existing error monitoring (if applicable)

**Participants:** Three to five engineers from the team that owns the relevant services

**Timeline:** Two weeks

**Kickoff agenda:**
1. Walk through Error Tracking setup and SDK configuration
2. Agree on which services to instrument first
3. Set up alerts and assignment workflows
4. Schedule a mid-point check-in and final review

## Tips

- Frame the POC as a collaboration, not a sales pitch. You're helping them evaluate whether the product solves a real problem.
- Don't offer credits as the primary incentive. The value proposition should be the business outcome, not free usage. Credits can supplement, but they shouldn't be the reason the customer engages.
- If a customer says "we'll get around to trying it" – that's your cue to suggest a structured POC instead. People prioritize things with deadlines and commitments.
- Document your POCs. What you learn from running them makes future POCs better for everyone.
