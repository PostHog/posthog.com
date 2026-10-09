---
title: Using AI to analyze customer issues
sidebar: Handbook
showTitle: true
---

A field guide for customer-facing roles using AI to investigate and explain customer issues, without letting machine-generated output stand in for verified facts.

## Why this matters now

L1 support might as well be dead. Have you really lived if you've never copy and pasted a customer's question into Claude Code and just typed "debug"? Don't get me wrong, AI is the fastest way to get an understanding of a customer issue. The speed is the point and the trap. We (you, me, us) exist as the human-in-the-loop, where the skill we are exercising is judgment.

Whether we realize it or not, a confident and well-formatted `.md` file from Claude is treated like ground truth when it's attached to a ticket or a Slack thread. The risk isn't that AI is wrong sometimes; it's that wrong output is indistinguishable from right output until someone verifies it.

The discipline that keeps this safe is one rule, applied to two audiences.

## The two-output rule

Keep two things separate, always: the **AI output** (a hypothesis a model generated, which can be overly verbose and hard to follow) and **your analysis** (what you've confirmed yourself against the data). They are not the same artifact, and collapsing them is how speculation gets laundered into truth. AI theorizes, we validate and iterate.

This holds for both audiences below. Internally, we should do our best to explicitly separate the two to avoid confusion. The external version is about distilling down to only what survived verification before anything reaches a customer.

## Internal: separate the analysis from the output

When investigating a customer issue, treat AI output as directional guidance. It is still your responsibility to shoulder the critical thinking around the product with your [investigation workflow](/handbook/cs-and-onboarding/handling-customer-issues#investigating-issues). The model will tell you *where* to look, but your understanding of the trace, the replay, the dashboard, and the query result. This is the analysis.

Label anything that is machine-generated, especially in shared notes and tickets. We're all developing a good eye for it, but mark AI output as AI output: a heading, a quote block, a "(AI draft, unverified)" tag. The goal is that a teammate skimming your investigation can instantly tell which lines are confirmed and which are a model's guess.

**Watch:** plausibility is not verification. AI is most dangerous when it's fluent and specific about something it can't actually know: a root cause, a customer's intent, an exact number. Torture your keyboard asking for verification steps. Phone a friend if you must.

## External: distill before you share

What goes to a customer should be a short, human-reviewed summary of **verified facts**. Distillation is the value add: you've separated signal from speculation so the customer doesn't have to.

**Share large AI analysis files sparingly, if at all.** A long, marked-down AI analysis is an internal working artifact, not a customer deliverable. Sending the raw file is tempting. It can feel like something the customer might want to see ("I bet they'd love to see this!"). Customer relationships _will_ erode if we are shipping unverified claims, internal reasoning, or speculation from the model that is actually a hallucination.

Default to a concise summary; share the full file only when the customer specifically needs the detail and you've reviewed every line in it first. When an issue is resolved, send the customer the confirmed cause and fix in a few sentences. Keep the long AI investigation in the internal ticket, linked for teammates, not pasted into the reply.

## Keep your setup current with each new model

Model behavior shifts with every release. Prompts, skills, hooks, and `CLAUDE.md` or `AGENTS.md` files written for the last model can quietly work against the next one.

### Why it matters for customer work

If you don't update your skills, hooks, and prompts, and your own sense of how the current models work best, you can reduce the model's performance.

For example, earlier models needed strict instructions, because they tended to overstep. With the current generation, you want to give the model room to use its judgment, and it generally won't overstep (though not always). You only know this if you keep up with each model's strengths and weaknesses, and with what the providers are improving.

Old instructions can also slow your skills down. [Getting the most out of Opus 5.5](https://claude.dev/blog/getting-the-most-out-of-opus-5-5/) says that a "think carefully" line only makes replies start later. The model decides how much to think. If you want it to think harder, use a higher [effort level](#match-the-effort-to-the-task).

Give the model a clear goal, a definition of "done", and rules for when to stop or ask. Models get more training to be agentic with each release, so without these rules they tend to keep going past what you need, or stop to report before they're done.

A current setup lets you use the model at its full strength. Together with the rest of this page, it helps keep your investigations factual.

### Where to find model updates

Anthropic and OpenAI publish a prompting guide with each new model, for example the Opus 5.5 guide above and [Rethinking skills and prompts for GPT-6 Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra). Subscribe to these feeds so that you see them when they ship:

| Source | What it covers | Feed |
| --- | --- | --- |
| [claude.dev Blog](https://claude.dev/blog/) | Claude prompting guides and Claude Code usage | `https://claude.dev/rss.xml` |
| [OpenAI Developers Blog](https://developers.openai.com/blog) | OpenAI prompting guides and Codex usage | `https://developers.openai.com/rss.xml` |
| [OpenAI News](https://openai.com/news/) | OpenAI model launches | `https://openai.com/news/rss.xml` |
| [Claude Code releases](https://github.com/anthropics/claude-code/releases) | Claude Code changes | `https://github.com/anthropics/claude-code/releases.atom` |
| [Codex releases](https://github.com/openai/codex/releases) | Codex changes | `https://github.com/openai/codex/releases.atom` |

Also check [Anthropic News](https://www.anthropic.com/news) and the [Claude release notes](https://platform.claude.com/docs/en/release-notes/overview) when a new Claude model ships.

To get the feeds in Slack, add the [RSS app](https://slack.com/help/articles/218688467-Add-RSS-feeds-to-Slack) to a channel that you read every day, such as your own channel, then add each feed URL. To see what other people at PostHog find with a new model, read #dev-ai.

### Update your setup

You don't need to do the audit by hand. Give the model the guide's link and ask it to audit your prompts, skills, and hooks against it. It can make most of the updates itself, or come back with a list of findings for you to review first. Either way, the audit is AI output: read the diff or the findings before you keep them.

## Match the effort to the task

Effort sets how much work the model does on a task: how much it thinks, how far it goes on its own judgment, and how much it verifies and tests edge cases. Higher effort takes longer and uses more tokens. Set it with `/effort` in Claude Code, in the [model picker](/docs/posthog-desktop/use-any-model-and-harness#set-reasoning-effort) in PostHog Desktop, or in your message to the [PostHog Slack app](/docs/slack) ("do this with high effort").

[Spending your effort](https://claude.dev/blog/spending-your-effort/) tests each level. For customer work:

- **Low:** fast work where you stay in the loop. Draft a reply, brainstorm, or get a first read of a ticket.
- **Medium:** most everyday tasks.
- **High:** investigate a customer issue. At high effort, the model is more likely to reproduce the problem, cross-check results, and test edge cases before it answers.
- **Max:** long, hard work that runs on its own. On a small task, max can spend a long time exploring for little gain.

Higher effort does not make the output verified. It helps the model find edge cases it would otherwise miss, but it does not correct a wrong approach. In Anthropic's tests, more tasks passed at higher effort, but "picked the wrong reading" failures also went up. At higher effort, the model also makes more decisions for you instead of asking. High-effort output is a better hypothesis, not a confirmed one.

## Do and don't

- **Do** treat AI output as a hypothesis until you've checked it against the source data.
- **Do** check product claims against the current docs yourself. A docs search through an MCP tool can return an outdated page, and one bad input can skew the whole analysis.
- **Do** ask the model for an adversarial review of its own answer before you rely on it.
- **Do** label machine-generated content clearly in shared notes and tickets.
- **Do** send customers a concise summary of verified facts.
- **Do** give the model the provider's prompting guide when a new model ships, and have it audit your prompts, skills, and hooks against it. Let it make the updates, or ask for a list of findings to review first.
- **Do** use high effort to investigate a customer issue, and low effort for drafts. Verify the output the same way at every level.
- **Don't** paste a confident AI summary into a ticket as if it were confirmed analysis.
- **Don't** forward raw AI analysis files to customers by default. Distill first.
- **Don't** put identifiable customer data into AI tools without applying our [data-sensitivity rules](/handbook/company/security#impersonating-users).
