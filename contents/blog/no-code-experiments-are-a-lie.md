---
title: "AI is killing no-code experiments"
date: 2026-03-03
author: ["leonhard-prinz"]
tags:
  - Experiments
  - Growth engineering
---

Every no-code A/B testing tool makes the same pitch: run experiments without relying on engineers.

The problem is that most of these tools work by injecting changes _after_ the page renders. On client-rendered pages and single-page applications (React, Vue, Angular), your browser loads the original page, then the tool swaps in the variant. Users see the original content flash before the change kicks in. That's flicker. On SPAs it's even worse: the framework can re-render and revert your changes entirely. Some of this can be mitigated and no-code experiments [can work well on server-rendered apps](/docs/experiments/no-code-web-experiments#limitations-and-use-cases) where the page doesn't re-render on the client. 

But there's a deeper issue: you're not actually removing dev work, you're deferring it. No-code tools inject visual changes on top of the rendered page. When an experiment wins, someone still has to rebuild the winning variant in real code. So the total dev effort is the same or more. It just happens after the experiment instead of before it.

> 📷 **IMAGE TODO:** Side-by-side flow diagram
>
> **No-code tool:** Separate no-code tool → Design changes visually → Run experiment → Flicker risk on SPAs / limited to simple changes → Find winner → Create ticket for dev to build → Build → Ship
>
> **PostHog AI:** Describe changes & get consulting from PostHog AI → Creates a PR → Review → Code + experiment set up in one go → Find winner → Ship directly

## What if AI just wrote the code?

With AI code generation, experiment coding is now fast and cheap. The bottleneck isn't writing code anymore, it's reviewing it. That means we can shift the dev team's role from "build experiments" to "review experiments."

Growth describes an experiment in normal language, gets consultation on how to experiment right, and then gets _real code_ (not injected DOM hacks) that engineers just review and merge.

This is what [PostHog MCP](https://github.com/PostHog/mcp-server) does. It connects PostHog to your development environment through [Claude](https://www.anthropic.com/claude), [Cursor](https://cursor.com/), or any editor that supports the [Model Context Protocol](https://modelcontextprotocol.io/introduction). You describe what you want to test, and it generates:

- The actual code change implementing your variant
- An [experiment](/docs/experiments) in PostHog with your success metric
- All the wiring to connect the two

The result is a real PR with real code. It works like any other code change because it _is_ a code change. And because the variant is baked into the code rather than injected after render, you avoid the DOM manipulation issues that plague no-code tools on SPAs. The key difference: the work is done upfront, not deferred. When the experiment wins, you're already shipping production code. There's no rebuilding step.

> **Note:** If you're evaluating flags on the client side (the default), experiments on your landing page can still show a brief flash. For zero-flicker experiments, [evaluate flags server-side and bootstrap them](/docs/feature-flags/bootstrapping). It's a one-time setup, not a per-experiment cost.

I recently helped a growth team set this up. Their engineers were skeptical ("won't this flood us with bad PRs?"), their growth team was skeptical ("isn't this just asking us to code?"), and their CTO wanted to understand the workflow before committing. So how does the workflow change?

## Who does what (and who stops worrying)

This doesn't eliminate the engineering/growth boundary. It moves it. Growth goes from "write a ticket and wait" to "open a PR and get a review." Engineering goes from "build the experiment" to "review the experiment." Everyone's doing less busywork.

**Growth team:**

1. Writes the experiment brief (what to test, why, success metric, design detail)
2. Feeds it to AI, either through [PostHog AI](link) in-app (alpha, requires GitHub connection) or locally in your IDE via the [MCP connector](link) (available now)
3. Reviews the generated code + experiment config
4. Opens the PR
5. Monitors results in PostHog
6. Decides: roll out the winner, iterate, or kill it

**Engineering team:**

1. Reviews PRs for code quality and unintended side effects
2. Merges approved PRs
3. Handles cleanup when experiments conclude

Growth moves at their own pace instead of camping in the engineering backlog. Engineering maintains code quality without being the bottleneck. It removes a lot of the moving parts and dependencies and swaps it for speed and ownership.

| | Traditional no-code | AI code generation |
|---|---|---|
| Growth creates experiment | Visual editor | AI prompt |
| Dev builds experiment | Not needed (upfront) | Not needed (AI generates) |
| Dev reviews | Not needed (upfront) | Reviews a PR. Minutes for simple changes |
| Experiment runs | With flicker risk on SPAs | No injection issues. No flicker with server-side flag eval |
| Winner found | Need to rebuild in real code | Flip feature flag to 100%. Done |
| Cleanup | Rebuild winning variant + remove test from tools | Remove flag wrapper + dead variant code (soon automated) |

## Running your first AI experiment

### 1. Write the experiment brief

This is where the approach differs from visual editors. You're not dragging elements around a canvas. The AI generates real code from your description. That means your brief _is_ the design spec. The more specific you are, the better the output.

Write down four things:

- **What:** "Test new headline copy on pricing page"
- **Why:** "Current headline doesn't communicate the free tier. New copy should increase plan selection."
- **Metric:** "Plan selection click-through rate"
- **Design detail:** "Replace 'Choose your plan' with 'Start free, upgrade when you're ready'. Same font size, same color, same position."

Content and copy changes are the fastest wins. For more complex changes like layout experiments, be even more specific about spacing, element order, and responsive behavior. Those experiments tend to need more back and forth with engineering during review.

That last one matters most. Because (right now) you can't preview the variant before the code is written, so be explicit about spacing, colors, element order, anything you'd consider visually. Think of it less as a hypothesis doc and more as a creative brief for a developer you've never met.

Post this in a shared Slack channel or doc. This gives engineering a heads up and sets the baseline for your [experiment hypothesis](/docs/experiments/creating-an-experiment).

Your brief can be detailed, especially the design section. What you want to avoid is testing multiple hypotheses at once. One hypothesis, one variant, one primary metric. You can (and should) track secondary metrics too, but pick one that determines success or failure. If you're describing two different changes, split them into two experiments.

### 2. Run MCP and open the PR

Open your code editor of choice with the [PostHog MCP server](https://github.com/PostHog/mcp-server) connected. Describe the experiment in plain language and ask PostHog AI for guidance:

> "Create an A/B test on the pricing page. The control keeps the current headline. The variant should change it to 'Start free, upgrade when you're ready'. Split traffic 50/50. Track plan selection click-through rate as the primary metric. Given our code and your knowledge of PostHog, what other things should I consider in this experiment set-up?"

MCP generates the code change, the experiment in PostHog, and all the configuration to connect them. Review what it produced, then open the PR.

Your PR description should include a link to the experiment brief, a link to the [experiment in PostHog](/docs/experiments), what pages or components are affected, and expected traffic split.

> **Alpha: PostHog AI Tasks.** If you've connected your GitHub repo to PostHog, you can skip the IDE entirely. Describe your experiment directly in PostHog and AI Tasks will generate the code, set up the experiment, and open the PR for you. All from the browser. It's still early access, so expect rough edges, but it means growth can go from brief to PR without ever opening an editor.

### 3. Engineering reviews

The review is shorter than a typical feature PR because the scope is intentionally narrow:

**Check:**
- Does the code only touch what it should? No unintended side effects.
- Is the experiment wired up correctly?
- Any performance concerns, especially on mobile?
- Is the variant code isolated enough to remove cleanly later?

**Don't bother with:**
- Pixel-perfect styling (that's growth's call)
- Whether the hypothesis is good (also growth's call)
- Rewriting the AI-generated code to match style preferences (if it works and is clean, ship it)

Target: same-day review for simple changes (copy, layout), 1-2 days for anything touching shared components.

### 4. Monitor it

Growth monitors results in PostHog. Engineering doesn't need to be involved unless something breaks.

Build a dashboard _before_ launch with your primary metric broken down by variant, a [funnel](/docs/product-analytics/funnels) covering the user journey through the changed flow, and [guardrail metrics](/docs/experiments/creating-an-experiment#secondary-metrics) like error rates and page load times to catch regressions.

Use [session replay](/docs/session-replay) filtered by your experiment's feature flag to watch how users interact with each variant. Numbers tell you _what_ happened. Replays tell you _why_.

### 5. Make the call

PostHog calculates how long your experiment needs to run based on your traffic and the minimum detectable effect you've set. Don't end it early. Wait until PostHog tells you there's a significant result. Then:

| Result | Action |
|---|---|
| Winner found | Roll out to 100% via the feature flag. Schedule variant code cleanup for a future sprint. |
| No winner | Kill it. Engineering removes the flag and variant code in cleanup. |
| Guardrail breached | Roll back immediately. Figure out what went wrong. |

This is the part that made the CTO excited: rolling out the winning version to 100% is instant via the feature flag. No deploy needed. The "cleanup" (removing the flag wrapper and dead variant code) is a low-priority chore that can happen whenever. This will soon be automated via MCP as well. It doesn't block the business from capturing value right away.

## Making this not fall apart after week one

Running one experiment this way is easy. Running a continuous program needs some structure. Not a lot, just enough to prevent chaos.

**Start small.** First experiment should be a simple copy change on a non-critical page. This builds confidence on both sides before you touch shared components or core flows.

**Batch PR reviews.** If growth is running multiple experiments, engineering can batch-review them at a set time (Tuesday and Thursday mornings, say) rather than context-switching every time a new one lands.

**Use a naming convention.** Prefix experiment branches with `exp/` (e.g., `exp/pricing-headline-test`). Makes it trivial to distinguish experiment PRs from feature work.

**Set a cleanup cadence.** Once a month, engineering does an experiment cleanup sprint: removes concluded experiments and dead variant code. This prevents tech debt from piling up. PostHog makes this easy because you can see which experiments are active and which have concluded.

**Use PostHog as your experiment log.** The [experiments tab](/docs/experiments) already tracks what's running, what's concluded, and what won. No need to maintain a separate spreadsheet. It's all in one place, linked to the actual data.

## "But what about..."

**"What if the AI generates bad code?"**

It will, sometimes. That's literally what the review step is for. In practice, simple copy and layout changes are very reliable. Complex logic changes need more scrutiny, same as any junior dev's PR. The difference: MCP generates experiments in minutes, not days. Even if 20% of PRs need rework, you're still moving way faster.

**"Don't I lose the visual preview?"**

Yes. With no-code you see an approximation immediately in the editor. With AI code generation, you see the result after the code runs locally or in a preview deploy. You might need a round of "not quite what I meant" before it's right. But what you end up with is production code, not an overlay that needs rebuilding. You can also use the PostHog toolbar to preview experiment variants on your live site without affecting any users.

**"Won't this flood us with PRs?"**

Not unless your growth team has lost their minds. Most teams run 2-4 experiments concurrently, not 20. If you're suddenly drowning in 15 experiment PRs a week, that's a prioritization problem, not a tooling problem.

**"Our growth team doesn't know how to open PRs."**

With the MCP route, they'd need to learn, but it's simpler than it sounds. With PostHog AI Tasks (alpha), they don't need to touch Git at all. Growth describes the experiment in PostHog, chats back and forth with AI to refine it, and PostHog handles the rest: generates the code, opens the PR, and drops the results right into it. Engineering just reviews and merges.

**"What about no-code tools then?"**

No-code visual editors (PostHog toolbar, VWO, etc.) still work for quick, disposable tests where you don't care about flickering and don't plan to ship the result long-term. But I wouldn't make no-code the primary experimentation strategy. Not when AI code generation lets you run proper, production-quality experiments with the same or less total effort.

## So why bother?

Because growth teams that experiment more, learn more. And this approach lets you run significantly more experiments per quarter without needing more engineers.

The future is experiments that produce _actual code_, written by AI and reviewed by humans. No DOM injection, no re-render issues, no gap between "the test won" and "we shipped it."

## Further reading

- [How to set up experiments in PostHog](/docs/experiments/creating-an-experiment)
- [Validating what you ship: Did anyone use it? Did it work?](/blog/validate-what-you-ship)
- [Feature flags best practices](/docs/feature-flags/best-practices)
- [How to do A/B testing with PostHog](/docs/experiments)
- [PostHog MCP server](https://github.com/PostHog/mcp-server)
- [No-code web experiments: limitations and use cases](/docs/experiments/no-code-web-experiments#limitations-and-use-cases)
