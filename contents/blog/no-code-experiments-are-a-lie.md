---
title: "No-code experiments are a lie"
date: 2026-03-03
author: ["leonhard-prinz"]
tags:
  - Experiments
  - Growth engineering
---

Every no-code A/B testing tool makes the same pitch: growth runs experiments, engineers ship product, nobody waits on anybody.

The key problem with this approach though is that these tools inject changes _after_ the page renders. Your browser loads the original page, then the tool frantically swaps in the variant. Users see a flash of the original content before the change kicks in. That's flicker, and it is just not a good experience.

Some tools handle this better than others, but the root cause is the same: injecting changes post-render is inherently unreliable. The more complex your variant, the worse it gets. Especially on mobile where every millisecond counts.

It's ok for high level tests and experiments, but even then - once a test has won, it actually needs to be implemented - so growth teams write tickets and need to wait on engineering to implement the winning result exactly as imagined. The speed gained is lost again.

> 📷 **IMAGE TODO:** Side-by-side flow diagram
>
> **No-code tool:** Separate no-code tool → Design changes visually → Run experiment → Flickering / small tests only / sub-optimal experience → Find winner → Create ticket for dev to build → Build → Ship
>
> **PostHog AI:** Describe changes & get consulting from PostHog AI → Creates a PR → Review → Code + feature flag + experiment set up in one go → Find winner → Ship directly (flip the flag)

## What if we cut through the bolt-on process altogether?

Here's the idea: growth describes an experiment in normal language in an exchange with PostHog AI, gets consultation on how to experiment right, and then gets _real code_ (not injected DOM hacks) that engineers just review and merge. Like a pull request from a very fast junior developer who never sleeps and doesn't have opinions about tabs vs. spaces.

This is what [PostHog MCP](https://github.com/PostHog/mcp-server) does. It connects PostHog to your development environment through [Claude](https://www.anthropic.com/claude), [Cursor](https://cursor.com/), or any editor that supports the [Model Context Protocol](https://modelcontextprotocol.io/introduction). You describe what you want to test, and it generates:

- A [feature flag](/docs/feature-flags) in PostHog with control and test variants
- The actual code change implementing your variant
- An [experiment](/docs/experiments) config with your success metric

The result is a real PR with real code. No flicker, no post-render injection, no performance penalty. It works like any other code change because it _is_ a code change.

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

## Running your first AI experiment

### 1. Write the experiment brief

This is where the approach differs from visual editors. You're not dragging elements around a canvas. The AI generates real code from your description. That means your brief _is_ the design spec. The more specific you are, the better the output.

Write down four things:

- **What:** "Test horizontal pricing layout vs. current vertical layout"
- **Why:** "Horizontal layout reduces scroll depth and increases plan selection rate"
- **Metric:** "Plan selection click-through rate"
- **Design detail:** "Three cards side by side in a single row, equal width, current styling and colors preserved. CTA buttons stay at the bottom of each card. On mobile, stack vertically."

That last one matters most. Because (right now) you can't preview the variant before the code is written, so be explicit about spacing, colors, element order, anything you'd consider visually. Think of it less as a hypothesis doc and more as a creative brief for a developer you've never met.

Post this in a shared Slack channel or doc. This gives engineering a heads up and sets the baseline for your [experiment hypothesis](/docs/experiments/creating-an-experiment).

Your brief can be detailed, especially the design section. What you want to avoid is testing multiple hypotheses at once. One hypothesis, one variant, one primary metric. You can (and should) track secondary metrics too, but pick one that determines success or failure. If you're describing two different changes, split them into two experiments.

### 2. Run MCP and open the PR

Open your code editor of choice with the [PostHog MCP server](https://github.com/PostHog/mcp-server) connected. Describe the experiment in plain language and ask PostHog AI for guidance:

> "Create an A/B test on the pricing page. The control is the current vertical pricing card layout. The variant should display the same three plans in a horizontal row. Split traffic 50/50. Track plan selection click-through rate as the primary metric. Given our code and your knowledge of PostHog, what other things should I consider in this experiment set-up?"

MCP generates the feature flag, the code change, and the experiment configuration. Review what it produced, then open the PR.

Your PR description should include a link to the experiment brief, a link to the [experiment in PostHog](/docs/experiments), what pages or components are affected, and expected traffic split.

> **Alpha: PostHog AI Tasks.** If you've connected your GitHub repo to PostHog, you can skip the IDE entirely. Describe your experiment directly in PostHog and AI Tasks will generate the code, create the feature flag, and open the PR for you. All from the browser. It's still early access, so expect rough edges, but it means growth can go from brief to PR without ever opening an editor.

### 3. Engineering reviews

The review is shorter than a typical feature PR because the scope is intentionally narrow:

**Check:**
- Does the code only touch what it should? No unintended side effects.
- Is the feature flag wrapping the change correctly?
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

This is the part that made the CTO excited: rolling out the winning version to 100% is instant via the feature flag. No deploy needed. The "cleanup" (removing the flag wrapper and dead variant code) is a low-priority chore that can happen whenever. It doesn't block the business from capturing value right away.

## Making this not fall apart after week one

Running one experiment this way is easy. Running a continuous program needs some structure. Not a lot, just enough to prevent chaos.

**Start small.** First experiment should be a simple copy or layout change on a non-critical page. This builds confidence on both sides before you touch shared components or core flows.

**Batch PR reviews.** If growth is running multiple experiments, engineering can batch-review them at a set time (Tuesday and Thursday mornings, say) rather than context-switching every time a new one lands.

**Use a naming convention.** Prefix experiment branches with `exp/` (e.g., `exp/horizontal-pricing-layout`). Makes it trivial to distinguish experiment PRs from feature work.

**Set a cleanup cadence.** Once a month, engineering does an experiment cleanup sprint: removes concluded flags and dead variant code. This prevents tech debt from piling up. PostHog makes this easy because you can see which [feature flags](/docs/feature-flags) are active and which experiments have concluded.

**Use PostHog as your experiment log.** The [experiments tab](/docs/experiments) already tracks what's running, what's concluded, and what won. No need to maintain a separate spreadsheet. It's all in one place, linked to the actual data.

## "But what about..."

**"What if the AI generates bad code?"**

It will, sometimes. That's literally what the review step is for. In practice, simple layout and copy changes are very reliable. Complex logic changes need more scrutiny, same as any junior dev's PR. The difference: MCP generates experiments in minutes, not days. Even if 20% of PRs need rework, you're still moving way faster.

**"Won't this flood us with PRs?"**

Not unless your growth team has lost their minds. Most teams run 2-4 experiments concurrently, not 20. If you're suddenly drowning in 15 experiment PRs a week, that's a prioritization problem, not a tooling problem.

**"Our growth team doesn't know how to open PRs."**

With the MCP route, they'd need to learn, but it's simpler than it sounds. With PostHog AI Tasks (alpha), they don't need to touch Git at all. Growth describes the experiment in PostHog, chats back and forth with AI to refine it, and PostHog handles the rest: generates the code, opens the PR, and drops the results right into it. Engineering just reviews and merges.

## What actually changes

The real win isn't just speed, it's volume. Growth teams can run significantly more experiments per quarter without needing more engineers. More experiments means more learning. More learning means better products.

The future is no-code experiments that produce _actual code_. No flicker, no performance hits, no reliability issues. Just real code changes that happen to be written by AI instead of by hand.

## Further reading

- [How to set up experiments in PostHog](/docs/experiments/creating-an-experiment)
- [Validating what you ship: Did anyone use it? Did it work?](/blog/validate-what-you-ship)
- [Feature flags best practices](/docs/feature-flags/best-practices)
- [How to do A/B testing with PostHog](/docs/experiments)
- [PostHog MCP server](https://github.com/PostHog/mcp-server)
