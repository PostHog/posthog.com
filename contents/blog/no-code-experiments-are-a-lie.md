---
title: "AI is killing no-code experiments"
date: 2026-03-03
author: ["leonhard-prinz"]
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/robocop_8939115965.png
tags:
  - Experiments
  - Growth engineering
---

Every no-code A/B testing tool makes the same pitch: run experiments without relying on engineers.

But you're not actually removing dev work, you're deferring it. No-code tools inject visual changes on top of the rendered page. When an experiment wins, someone still has to rebuild the winning variant in real code. So the total dev effort is the same or more. It just happens after the experiment instead of before it.

And the injected approach hurts the experiment itself. On client-rendered pages and single-page applications (React, Vue, Angular), the tool swaps in the variant _after_ the page renders. Users see the original content flash before the change kicks in. That's flicker. On SPAs it's even worse: the framework can re-render and revert your changes entirely. Some of this can be mitigated and no-code experiments [can work well on server-rendered apps](/docs/experiments/no-code-web-experiments#limitations-and-use-cases), but the more complex your variant, the more likely it breaks.

## What if AI just wrote the code?

> 📷 **IMAGE TODO:** Max illustration on A/B testing with AI

AI code generation made experiment coding fast and cheap. Writing the code stopped being the bottleneck. Now the hard part is where it should have been all along: figuring out what experiments to run.

In a way, teams are still "building experiments," just not implementing them by writing code themselves. Growth describes an experiment in normal language, gets consultation on how to experiment right, and then gets _real code_ (not injected DOM hacks) that engineers just review and merge.

This is what the [PostHog MCP](/docs/model-context-protocol) does. It connects PostHog to your development environment through Claude, Cursor, or any editor that supports the [Model Context Protocol](https://modelcontextprotocol.io/introduction). You describe what you want to test, and it generates:

- The actual code change implementing your variant
- An [experiment](/docs/experiments) in PostHog with your success metric
- All the wiring to connect the two

The result is a real PR with real code. It works like any other code change because it _is_ a code change. And because the variant is baked into the code rather than injected after render, you avoid the DOM manipulation issues that plague no-code tools on SPAs. The key difference: the work is done upfront, not deferred. When the experiment wins, you're already shipping production code. There's no rebuilding step.

> **Note:** If you're evaluating flags on the client side (the default), experiments on your landing page can still show a brief flash. For zero-flicker experiments, [evaluate flags server-side and bootstrap them](/docs/feature-flags/bootstrapping). It's a one-time setup, not a per-experiment effort.

## How the workflow changes

So what does this mean for day-to-day? With no-code tools, growth designs the experiment visually, runs it, finds a winner, and then creates a ticket for engineering to rebuild it in real code. With AI code generation, growth writes an experiment brief, AI generates a PR, engineering reviews it, and the winner ships instantly. The work happens upfront instead of after the experiment. And it leads to an overall faster, more iterative process:

| | Traditional no-code | AI code generation |
|---|---|---|
| 1️⃣ Growth creates experiment | Visual editor | AI prompt |
| 2️⃣ Dev builds experiment | Not needed (upfront) | Not needed (AI generates) |
| 3️⃣ Dev reviews | Not needed (upfront) | Reviews a PR. Minutes for simple changes |
| 4️⃣ Experiment runs | With flicker risk on SPAs | No injection issues. No flicker with server-side flag eval |
| 5️⃣ Winner found | Need to rebuild in real code | Flip feature flag to 100%. Done |
| 6️⃣ Cleanup | Rebuild winning variant + remove test from tools | Remove flag wrapper + dead variant code (soon automated) |



## The experiment brief is everything

Coming up with good ideas should be the bottleneck, not implementing them. With AI handling the code, the experiment brief becomes the most important artifact in the whole process. It _is_ the design spec. The more specific you are, the better the output.

You don't have to write it alone. PostHog AI can help, either [in your tenant](/docs/ai) or in your codebase via the [MCP](/docs/model-context-protocol). It knows your code, it knows how experiments work in PostHog, and it can ask the right questions to guide you toward the right experiment setup. But generally, these are the things to keep in mind:

Write down four things:

- **What:** "Test urgency-driven CTA on the signup page"
- **Why:** "Current CTA ('Get started') is generic. Hypothesis: a time-limited free trial message increases signup conversion."
- **Metric:** "Signup button click-through rate"
- **Design detail:** "Replace the main CTA button text from 'Get started' to 'Start your free 14-day trial'. Add a subtitle line below the button: 'No credit card required'. Keep button size, color, and position identical."

Content and copy changes are the fastest wins, but because this is real code (not just HTML and CSS overlays), you can go beyond surface-level experiments. Layouts, multi-step forms, conditional UI based on user segments. Anything you can describe, AI can generate. For more complex changes, be even more specific about spacing, element order, and responsive behavior.

This brief translates directly into a prompt. Open your editor with the [PostHog MCP server](/docs/model-context-protocol) connected and start the conversation:

> "Create an A/B test on the signup page. The control keeps the current 'Get started' CTA. The variant should change it to 'Start your free 14-day trial' and add 'No credit card required' below the button. Split traffic 50/50. Track signup button click-through rate as the primary metric."

You don't need to get everything right in one message. PostHog AI will look at your code, ask about edge cases, and suggest things you might have missed. After a few back-and-forth messages, it generates the code change, the experiment in PostHog, and all the configuration. Review what it produced, then open the PR.

## Previewing before you launch

The experiment deploys behind a feature flag at 0% rollout. No users see it. From there, three ways to preview:

1. **Run locally.** Pull the branch, run your dev server, and toggle the flag in your local environment. You see the variant with real styling and real components.

2. **PostHog toolbar.** Open your production site, launch the [toolbar](/docs/toolbar), and force-toggle the experiment flag to the test variant. You see it live with real data, only in your browser. Nobody else is affected.

3. **Flag override by email.** Add a [release condition](/docs/feature-flags/creating-feature-flags#release-conditions) on the flag (e.g., email = yours → test variant at 100%). You see the experiment everywhere, including on mobile. No toolbar needed.

## So is no-code dead?

No. No-code visual editors (PostHog toolbar, VWO, etc.) still work for quick, disposable tests where you don't care about flickering and don't plan to ship the result long-term. But I wouldn't make no-code the primary experimentation strategy. Not when AI code generation lets you run proper, production-quality experiments with the same or less total effort.

The future is experiments that produce _actual code_, written by AI and reviewed by humans. No DOM injection, no re-render issues, no gap between "the test won" and "we shipped it."

## Further reading

- [How to set up experiments in PostHog](/docs/experiments/creating-an-experiment)
- [Validating what you ship: Did anyone use it? Did it work?](/blog/validate-what-you-ship)
- [Feature flags best practices](/docs/feature-flags/best-practices)
- [How to do A/B testing with PostHog](/docs/experiments)
- [PostHog MCP server](https://github.com/PostHog/mcp-server)
- [No-code web experiments: limitations and use cases](/docs/experiments/no-code-web-experiments#limitations-and-use-cases)
