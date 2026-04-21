---
title: Preparing for the technical screen
sidebar: Handbook
showTitle: true
hideAnchor: true
---

If you've been invited to a technical screen at PostHog, here's what to expect and how to show up prepared.

## What the technical screen looks like

The technical screen is a 60 minute architecture and design discussion with one of our engineers. You'll work through an open-ended problem together, and there are many reasonable approaches. We're primarily interested in *how* you think.

## What we're evaluating

The session is intended to discover where your knowledge is wide and where your knowledge is deep. The best candidates tell us when they're communicating their direct experience, when they're talking about work they were close to but not part of, and when they've not done something but know that's how to solve that type of problem.

### System design instincts

We want to see well-developed intuition for how systems work in practice – choosing the right tool for the job, understanding where complexity is warranted, and reasoning about what happens as requirements change. This is about technical depth and breadth, not just scale.

For example (not from what we'll discuss): how would you design a notification system that needs to reach millions of users without overwhelming downstream services? If you're building a deployment pipeline, where do you put the guardrails so a bad deploy doesn't take down production?

Strong candidates reach for these concepts naturally as part of their design.

### The "why" behind your decisions

We want to hear *why* you'd choose a given technology. Saying "I'd use Postgres" is fine. Saying "I'd use Postgres here because the access patterns are relational and consistency matters more than write throughput for this part of the system" is much better.

Every design decision involves tradeoffs. We want to hear you articulate them – even when there isn't a clear winner. Knowing when *not* to use a technology is just as valuable as knowing when to reach for it. Showing that you understand the costs of your choices matters a lot.

### Problem-solving approach

The strongest candidates slow down before they speed up. They ask clarifying questions. They scope the problem. They decompose it into pieces they can reason about individually.

We're looking at your process: do you clarify requirements before committing to an approach? Can you break a big problem into smaller ones? When you hit a fork in the road, how do you decide which way to go?

If you find yourself wanting to immediately start listing technologies, pause. Take a breath. Ask a question instead.

### Product sense

PostHog engineers ship product, work directly with customers, make product decisions, and own outcomes end to end. In the technical screen, this shows up as thinking about the *user* of whatever you're designing.

Who is using this? What do they actually need? If you're designing an alerting system, do you think about what happens when someone gets paged at 3am for a non-critical issue? If a design decision trades off developer convenience for a better user experience, which do you lean toward and why?

You should be someone who thinks about your users, not just your systems.

### Autonomy and independent thinking

PostHog is a company of small teams with high autonomy. We need people who can identify problems, figure out solutions, and drive them forward on their own.

In the interview, this shows up as taking ownership of the problem. Drive the conversation. Propose ideas. Change direction when something doesn't work. Treat the interviewer as a collaborator.

## How to prepare

The best preparation is reflection. More concretely, here's what we recommend:

- **Think about systems you've built or worked on.** What went well? What would you change? What broke, and why? The ability to reflect honestly on past work is one of the strongest signals we see.
- **Practice thinking out loud.** Walk through your thought process, even when you're uncertain – especially when you're uncertain. The interviewer can only evaluate reasoning they can hear.
- **Get comfortable with ambiguity.** The problem will be open-ended on purpose. There is no single correct answer. We want to see how you navigate uncertainty.
- **Brush up on fundamentals, not trivia.** You should understand how the building blocks of modern systems work and when to reach for them. You don't need to know the exact configuration flags for any particular technology.

## What not to worry about

- **Specific language or framework expertise.** We care about your ability to reason about systems, regardless of which stack you've used.
- **Getting the "right" answer.** There isn't one. A thoughtful wrong turn that you recover from tells us a lot.
- **Sounding polished.** Genuine thinking beats a practiced presentation. It's okay to say "I'm not sure, but here's how I'd figure it out."

## A note on the format

We want this to feel like a working session. The interviewer is there to collaborate with you, ask follow-up questions, and sometimes push back on your ideas. If something isn't clear, ask. If you want to change direction, say so. The best interviews feel like a conversation between two engineers solving a problem together.

If you pass the technical screen, you'll meet one of our co-founders or execs for a short culture and motivation chat, followed by a [PostHog SuperDay](/handbook/people/hiring-process/engineering-superday). You can read more about the [full interview process](/handbook/people/hiring-process).

Good luck – we're rooting for you.
