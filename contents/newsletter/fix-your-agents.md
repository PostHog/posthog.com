---
title: Read this before deleting your AGENTS.md
date: 2026-08-31
author:
  - jina-yoon
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/fix_your_agents_hero_920cdd1f9a.png
featuredImageType: full
tags:
  - Product engineers
  - Engineering
crosspost:
  - Blog
seo:
  metaTitle: Read this before deleting your AGENTS.md
  metaDescription: >-
    The three best ways to keep your AI agent's context healthy as models get
    better: run /doctor, test your context like code, and ask agents for feedback.
---

[Context engineering](/newsletter/context-engineering) used to focus on adding information that base models lacked:

![Venn diagram: "Context you provided" as a large circle fully containing a smaller "What the model knows" region](https://res.cloudinary.com/dmukukwp6/image/upload/fix_your_agents_context_provided_venn_134ec5bc06.png)

But then the models kept getting better. Now, the same context your agents couldn't function without [can make them perform worse](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.6#favor-leaner-prompts).

Our AI onboarding wizard, for example, often landed on the wrong project in monorepos because our scripts pointed to root by default. Now that models are good at inferring repo structure, [we updated it](https://github.com/PostHog/wizard/pull/884) so headless runs take advantage of model recommendations.

This is the same reason why Anthropic [removed 80% of Claude Code's system prompt](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models). Labs are going back on previous advice about rules and repetition; judgment, interfaces, and progressive disclosure are the new best practices instead.

The goal of context engineering has since shifted toward *subtracting* as much information as you can to get out of the models' way:

![Venn diagram: "Context you provided" overlapping "What the model knows now", with the still-useful overlap marked "Keep this" and the outdated part marked "Delete this"](https://res.cloudinary.com/dmukukwp6/image/upload/fix_your_agents_keep_delete_venn_7b18d18842.png)

But figuring out exactly what to subtract isn't easy when dealing with unpredictable behavior.

When asked about his approach, Boris Cherny, the creator of Claude Code, [recommended deleting your CLAUDE.md](https://www.youtube.com/watch?v=qyPCVqFUyDo) every six months to stay on the bleeding edge. [Theo](https://x.com/theo/status/2082009220631953782) recently reported it was worth rewriting his `AGENTS.md` by hand:

![Tweet from Theo: he spent multiple hours hand writing better CLAUDE.md/AGENTS.md and half a dozen skills, and it was 100% worth it](https://res.cloudinary.com/dmukukwp6/image/upload/fix_your_agents_theo_tweet_d054f9b62f.png)

If you'd rather not start from scratch every time, here are three practical ways to maintain your context while ["unhobbling" AI](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models), from most hands-on to most [autonomous](/newsletter/agent-autonomy).

## 1. Run `/doctor`, but follow up with real eyes

The simplest way to keep your context healthy is to read and edit it yourself.

Most coding agents have a built-in `/doctor` command to help with this. [Anthropic's version of it](https://code.claude.com/docs/en/commands#:~:text=v2.1.198%20or%20later-,/doctor,-Skill.%20Run) runs basic health checks, deletes redundant prompts, catches broken settings, finds unused plugins, and optimizes for lazy loading.

The report also prints a summary of how often you've used each file, and how much it can trim. Here's what that looks like for our website's main `AGENTS.md`:

```
 Component: posthog.com/AGENTS.md (= CLAUDE.md symlink)
  Type: memory file
  Scope: project (checked in)
  Uses (total since install): always loaded
  Used in window?: yes
  Est. resident tokens: ~1,780
  Verdict: trim ~350
```

Across the `posthog.com` repo, it suggested turning off 3 unused plugins and 3 skills across our website repo and estimated saving an average of 6K tokens per session.

This is decent, but you can't rely on it to catch everything because it doesn't check for correctness; it acts only based on what it can derive from your code.

For example, last month, we started using merge queues and added this line to our `AGENTS.md`:

"All merges into `master` go through the Trunk merge queue. Never run `gh pr merge`."

A couple days later, we paused the queue to fix some failing tests and forgot to update that line. Our agents therefore had wrong instructions for 21 hours. During that time, one engineer's PR got stuck for 10 hours; another lost 45 minutes investigating the cause before [updating the instructions](https://github.com/PostHog/posthog/pull/75873).

We didn't use `claude doctor` in the `posthog` monorepo to fix this, but it couldn't have caught it anyway since merge queue state lives in a GitHub setting rather than in code. Agents don't know what they don't know.

> **Try this:** Run `claude doctor` after each upgrade and follow up with a manual pass on your `AGENTS.md`. For each line, if you can't name the failure it prevents, delete it.

<NewsletterForm />

## 2. Test your context like it's code

Another tool for maintaining and unhobbling your context is evals.

It's just like adding regression tests whenever you fix a bug in code. Every time you update your context to address an agent's mistake, capture what caused it in the first place as an eval.

For example, we record technical "gotchas" we see from real PostHog Wizard runs as framework-specific [commandments](https://github.com/PostHog/context-mill/blob/main/context/commandments.yaml) such as:

- For versions 15.3+, initialize PostHog in `instrumentation-client.ts` for the simplest setup.
- For Phoenix or Plug apps, add `PostHog.Integrations.Plug` before the router so request context is attached to captured events and errors
- `posthog-rs` is the Rust SDK crate; add it with `cargo add posthog-rs` and construct the client with `posthog_rs::client(options).await`.

These get combined with instructions from the `context-mill` (e.g., "reuse event names the project already uses") and a set of ~40 clean sample apps to create the evals we use in the [wizard-ci](https://github.com/PostHog/wizard-workbench/tree/main/services/wizard-ci). Here's how it works:

1. `wizard-ci` runs the PostHog Wizard on all ~40 sample apps and creates one PR for each.
2. Those PRs don't get merged. Instead, a second agent called the [pr-evaluator](https://github.com/PostHog/wizard-workbench/tree/main/services/pr-evaluator) grades each of them based on the diffs and session logs.
3. The `pr-evaluator` leaves metrics and reports on the trigger PR and the `wizard-ci PR`.

![Diagram of the wizard-ci pipeline: context-mill, wizard, and posthog feed into wizard-ci, which runs test apps that the pr-evaluator grades, feeding back into context and harness](https://res.cloudinary.com/dmukukwp6/image/upload/fix_your_agents_wizard_ci_pipeline_1e0b407366.png)

[These reports](https://github.com/PostHog/wizard-workbench/pulls?q=is%3Apr+is%3Aclosed+label%3ACI%2FCD) help us catch issues like the wizard skipping installing PostHog entirely because the model determined it was already complete:

![Slack thread reporting a wizard run that spun up a background agent, failed pnpm install without catching it, and scored 1/5](https://res.cloudinary.com/dmukukwp6/image/upload/fix_your_agents_slack_wizard_ci_4ad75faffa.png)

`wizard-ci` is just one of many context-as-code tools we've built in our [wizard-workbench](https://github.com/PostHog/wizard-workbench). The setup is complex since it maintains [our biggest conversion path](/newsletter/context-engineering#lesson-6-investing-in-context-pays-off), but the core concept is easy to apply: test your context by saving prompts that check if your agents are doing what you want them to do.

> **Try this:** The next time your agent makes a mistake, paste the prompt that caused it into a `failures.md`. Re-run those prompts the next time you edit or delete parts of your `AGENTS.md` as a quick test suite for your highest-cost piece of context.

## 3. Ask agents for feedback directly

Another option for fixing your context is to just ask. Agents are good at providing feedback about how they would improve your context while they're using it.

Many developers already do this to update their skills, but you can take it further by putting it in your prompts by default.

For example, the final instruction for the PostHog Wizard says to [send back a quick remark](https://github.com/PostHog/wizard/blob/ba91f26c418f332f1ede8b6e80fd9fa14bbb22e8/src/lib/agent/runner/sequence/orchestrator/queue-tools.ts#L23) about any errors they encountered in production:

"What information or guidance would have been useful to have in the integration prompt or documentation for this task? Specifically anything that would have prevented tool failures, erroneous edits, or other wasted turns."

This gives us a rich feed of live bug reports for cheap – a basic form of [AI observability](/ai-observability):

![Table of remark strings showing examples of agent-provided feedback from wizard runs](https://res.cloudinary.com/dmukukwp6/image/upload/fix_your_agents_remark_feedback_a45e521ed3.png)

<Caption>Examples of agent-provided feedback from real PostHog Wizard runs in prod.</Caption>

We took this *even further* by feeding them back into our `context-mill` with a [loop](/newsletter/loops), making it [self-driving](/self-driving). But since we can't trust agents at face value, we cluster and verify the underlying issues first. Here's what the feedback clusters looked like for the last month:

![Bar chart of agent-provided feedback from PostHog Wizard production runs clustered by issue, with "other" and "clean run" as the largest buckets](https://res.cloudinary.com/dmukukwp6/image/upload/fix_your_agents_feedback_clusters_3dd092319b.png)

Half of the `other` category is just confirmation messages like "succeeded on the first attempt," or "`posthog-js` already installed". The other half is a long tail of issues that weren't common enough to cluster.

Once the loop identifies a meaningful cluster, it deploys subagents to verify the issue before attempting a fix. For example, to check the `notebook create schema/tool` issue, a subagent followed the legacy instructions to reproduce the hand-splicing text failure that was addressed in [this PR](https://github.com/PostHog/context-mill/pull/272).

This approach works best at scale to cluster remarks, but you can still apply the concept to your workflows by simply asking agents to log what context files they used.

We do this in our `posthog` monorepo [PR template](https://github.com/PostHog/posthog/blob/27c2aeee512923e4c9b29045d84a7ec932312ebf/.github/pull_request_template.md?plain=1#L53), which prompts agents to name any skills invoked. We've seen other agents use this information to catch and fix skill inconsistencies, like in [this PR](https://github.com/PostHog/posthog/pull/81018) where Claude found an issue while unblocking stalled ClickHouse cleanup PRs.

> **Try this:** Agents face issues all the time. Ask them to provide feedback about your context with a structured prompt about any errors, inconsistencies, or failures they ran into. Over time, you can turn verified reports into a [self-driving](/self-driving) context system.

<NewsletterForm />
