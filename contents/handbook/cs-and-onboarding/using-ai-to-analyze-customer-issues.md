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

## Do and don't

- **Do** treat AI output as a hypothesis until you've checked it against the source data.
- **Do** label machine-generated content clearly in shared notes and tickets.
- **Do** send customers a concise summary of verified facts.
- **Don't** paste a confident AI summary into a ticket as if it were confirmed analysis.
- **Don't** forward raw AI analysis files to customers by default. Distill first.
- **Don't** put identifiable customer data into AI tools without applying our [data-sensitivity rules](/handbook/company/security#impersonating-users).
