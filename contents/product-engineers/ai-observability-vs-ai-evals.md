---
title: Stop trusting your AI dashboards
date: 2026-11-25
author:
  - sara-verdi
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/stop_trusting_your_ai_dashboards_d0257a21c9.png
featuredImageType: full
ogImage: generated
tags:
  - Product engineers
  - AI observability
  - AI evals
seo:
    metaTitle: AI evals vs. observability; what's the difference?
    metaDescription: "AI observability shows what your AI did. Evals show whether it did it well. Here's how to use both, with real examples from PostHog's own AI agents."
crosspost:
  - Blog
---

Your AI support chatbot has great uptime, fast responses, and zero errors. It also just told someone their package is in Ohio when the package is on their doorstep. Yikes.

That's the awkward thing about AI features. Simply knowing your AI-powered feature or agent is working doesn't tell you that it’s working well. Your dashboards can look perfectly healthy while the model confidently gets things wrong. And you won't find out until a user does.

This happens to us, too. [Vincent Ge has the receipts](/blog/optimizing-agent-cost), but on one particularly memorable (and expensive) run, the PostHog [Wizard](/docs/ai-engineering/ai-wizard), our AI agent that sets up PostHog in your codebase, called in five helper agents and lost touch with two of them. It spent about 15 minutes waiting on them, then did the actual work itself in three minutes. If your only check was "did the code get updated?", you'd have given that run a pass.

That's why you need both AI observability and evals. They often look at the same data, but they answer very different questions. In this post, we'll cover what each one tells you, and how to use them together in PostHog.

## What does observability actually tell you?

AI observability shows you what your AI feature did on each request, like which model it called, which tools it used, what went in and out, and how long and how much each step cost. It's super useful for when you know something's wrong but you don't know where.

![Observability loop](https://res.cloudinary.com/dmukukwp6/image/upload/AI_observability_loop_1x_232b5acf02.png)

Say someone asks your support chatbot "Where's my order?" and waits ten seconds for it to respond: "It shipped yesterday." On your dashboard, that's a slow answer to a very easy question.

But if you open the trace for that request in PostHog’s [AI Observability](/docs/ai-observability), you’ll get something more specific. The order lookup took nine seconds, and the model spent the remaining second writing the reply. Even a model that answered instantly would leave your customer staring at a typing indicator for nine seconds.

[A trace](/docs/ai-observability/traces) is the record of everything you've instrumented for one request. To get that view in PostHog, record the model call as a **generation** and the order lookup as a [**span**](/docs/ai-observability/spans) (a timed operation), and give them the same trace ID. If you use one of PostHog's SDKs, generations are captured for you. The order lookup is your own code, so you record that span yourself with `captureAi()`:

```javascript
const start = Date.now()
let status = 'error'

try {
  const order = await getOrderStatus(orderId)
  status = order.status
} finally {
  // captureAi() sends AI events to PostHog's AI endpoint (posthog-node 6.x)
  posthog.captureAi({
    distinctId: userId,
    event: '$ai_span',
    properties: {
      $ai_trace_id: traceId, // same ID you pass to the model call
      $ai_span_name: 'order_lookup',
      $ai_latency: (Date.now() - start) / 1000, // seconds
      $ai_input_state: { orderId },
      $ai_output_state: { status },
    },
  })
}
```

The waterfall shows where the time went, and opening the generation shows what the model received and what it told the customer. Now, you have somewhere specific to start digging. Did the orders API take nine seconds to respond, or did your code call it three times?

The Wizard investigation went the same way, except it started with the bill. AI Observability showed we were spending an average of $6.67 on inference for every Wizard user. The traces pointed us to where that money and time went.

A faster model wouldn't have done much for an agent whose main job that afternoon was waiting for helpers that were never coming back. We also learned something about spans: if you only record one when a helper returns, you'll never record the helper that didn't. It’s really worth putting a timeout on the wait.

Traces don't always tell you everything, though. For a long time, we didn't collect full Wizard traces at all, for privacy reasons. That's pretty common. Plenty of teams turn on [privacy mode](/docs/ai-observability/privacy-mode) or strip inputs and outputs before they ever reach an observability tool. You might know a run was slow and expensive without being able to read what the model actually said. 

That's one more reason you need [evals](/docs/ai-evals): they let you recreate the problem on inputs you control.

## Okay, but did your fix actually work?

That's a question for evals. Evals are repeatable tests that check whether your AI’s answers are actually right. An eval runs your AI agent or feature against a set of example inputs and scores each response against what you expected it to say.

![Evaluation loop](https://res.cloudinary.com/dmukukwp6/image/upload/AI_evaluation_loop_1x_53c476e869.png)

Let’s say you speed up the chatbot by caching order lookups. Replies now take a second… which is great news right up until the bot tells someone their package is in Ohio when it’s literally in their hands.

Here’s a sample eval:

1. Give the assistant a test order whose status recently changed from "in transit" to "delivered."
2. Ask where it is.
3. Check the reply against the latest order record.
4. Score correctness and response time separately.

That's a turn-by-turn check, which suits a chatbot. For an agent like the Wizard, one right answer isn't enough. Its eval has to look at the whole run: did it finish the job, how many steps and tool calls did it take, and what did it cost? Run it several times, too. Why? Because an agent that takes a different path every time can still pass once by luck.

You can do this with [offline evals](/docs/ai-evals/offline-evals). In PostHog, you can run the same cases against the old and new versions in CI, then compare the two runs in [Experiments](docs/ai-evals/offline-evals#review-and-compare-experiments). If you want a reusable set of cases, just save them in a dataset. And what counts as a pass depends on what you've promised the user.

## Why you need both observability and evals 🤝

It's tempting to treat these as two stages: evals before launch, observability after. In practice, they work as a concurrent loop. Here's how they split the work on our own AI products at PostHog:

| What you're checking | Observability shows you... | Evals let you... |
| --- | --- | --- |
| Cost | What runs actually cost, and how widely that varies | Control the variables to find exactly where a fix should go |
| Success rate | How often real runs succeed or fail | Reproduce a failure and iterate on it until it's fixed |
| Tool calls | How many tool calls agents make in production | Refine whether they're calling the right tools, correctly |
| Coverage | The edge cases your tests never thought of | Make sure the basics still work after every change |

> “You need evals for sanity and traces to find the edge cases your evals miss. Humans in production are unpredictable, and agents are only slightly better." – Vincent Ge, Wizard & Docs team

So in practice, the loop looks like this:

1. A trace shows you a failure you didn't expect, like a chatbot incorrectly reporting a stale order status.
2. You turn that failure into an offline eval case, so the next version has to prove it can handle it.
3. You add an online evaluation that watches for the same failure in production.
4. You keep reading traces, including the passing ones, to find the failure that belongs in the next eval.

Step four is the one people often skip, so our PostHog AI team straight up puts it on the calendar. In a regular [Traces Hour](/blog/8-learnings-from-1-year-of-agents-posthog-ai), engineers analyze LLM traces from production together.

## What counts as a win?

Observability tells you what your AI feature or agent did. Evals tell you whether it should have done it. Traces find the weird stuff, evals make sure the weird stuff doesn't come back, and product data tells you whether anyone noticed you fixed it. 

The win here isn't a higher correctness score. A win looks like fewer customers filing a support ticket to figure out where their package actually is (hopefully not Ohio).