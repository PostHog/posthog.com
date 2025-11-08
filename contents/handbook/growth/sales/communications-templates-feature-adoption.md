---
title: Communication templates for new feature adoption (TAMs)
sidebar: Handbook
showTitle: true
---

## Purpose

Marketing drives awareness at scale. TAMs help customers get value in their own projects. 
This page gives a simple plan to turn new launches into real outcomes for specific customers.

See also: [How we work](https://posthog.com/handbook/growth/sales/how-we-work).

## How this differs from marketing comms

- **Audience:** Named accounts and real people, not a marketing list
- **Goal:** First use of new feature and proof of value, not clicks or reach
- **Tone:** Consultative, specific to their setup
- **Channel:** Slack if shared

## Cadence

**Before new feature launch: internal heads-up**  
TAMs get notified early about a launch. Understand why it matters, what it does, and who benefits. Write a few short notes for target accounts.

**Launch day**  
Marketing sends the announcement.

**After the marketing launch: personal nudge**  
Send a short note right after the marketing announcement to build on the awareness. The TAM message should tie the feature to the customer’s stated goal and give one clear action they can do now in their own PostHog project.

> Example  
> “Last quarter you set a goal to reduce activation drop-off. We just shipped **[new feature]**. You can turn it on in your project and try it on your onboarding flow. I recorded a 30-second Loom in a demo project: {loom_link}. If helpful, here is the direct link: {project_link}.”

**A week or two after launch: data-triggered follow-up**  
Look at usage in their project. Follow up based on what happened.

- **Adoption detected**  
  “Looks like **[new feature]** is on in your project. Is it moving {goal metric}? If you have notes, I will pass them to the product team.”
- **No adoption**  
  “Was thinking about your goal to achieve **[goal metric]** and how **[new feature]** might help with that. So I wanted to send a nudge in case it fell off the list. You can switch it on here: {project_link}.”

**Next QBR after launch**  
Bring the feature as a solution to the overall strategy, not a simple list of new features to go through.  
“Given your target to improve {goal}, we can be more relevant with these improvements: **[selected new items]**.”

## Realistic examples

**Experiments → no-code experiments**  
“You said you want to lift **{goal}**. No-code experiments lets PMs ship A/B tests without engineering. Turn it on here: {project_link}. Start with **{page_or_flow}** where we saw friction. Check **{metric}** in this view: {report_link}. Short Loom with the steps: {loom_link}.”  
See: [no-code web experiments](https://posthog.com/docs/experiments/no-code-web-experiments) and [getting started with experiments](https://posthog.com/docs/experiments/start-here).

**Feature flags → quick holdout**  
“You’re planning to roll out **{feature_or_copy_change}** to improve **{goal}**. Keep a **{holdout_percent}%** holdout on the flag so you can see real lift before full rollout. Flag settings: {project_link}. First results show here: {report_link}.”  
See: [feature flags](https://posthog.com/docs/feature-flags) and [holdout testing tutorial](https://posthog.com/tutorials/holdout-testing).

**Session replay paired with an insight**  
“We saw a drop-off at **{step_or_page}**, which blocks **{goal}**. Create this funnel **{event_sequence}** and open replays linked to step **{step_number}**. Start here: {report_link}. This pairs the number with the clips so you can see why.”  
See: [session replay](https://posthog.com/docs/session-replay).

**Workflows**  
“Follow-ups after **{event}** are manual today, so **{goal}** slips. Turn on a workflow that triggers on **{event_or_property}** and sends **{message_or_action}**. Enable here: {project_link}. First run appears here: {report_link}. Adjust, then expand.”  
See: [workflows – start here](https://posthog.com/docs/workflows/start-here).

**LLM analytics**  
“You’re aiming to increase **{success_rate_metric}** for **{ai_feature}** and keep **{cost_metric}** in check. Turn on LLM analytics: {project_link}. Watch prompts, responses, success rate, and cost per **{n}** prompts. First view to check: {report_link}.”  
See: [LLM analytics – start here](https://posthog.com/docs/llm-analytics/start-here).

**Heatmaps**  
“People hesitate on **{page}**, which hurts **{goal}**. Open heatmaps: {project_link}. Compare **{version_or_date_range}** to see what changed. First view: {report_link}. Use this to pick the next tweak.”  
See: [heatmaps](https://posthog.com/docs/toolbar/heatmaps).

## Potential measurement

- **Feature adoption rate** in the targeted accounts
- **Time to first use** from the launch-day note
- **Built-in product surveys**  
  Some areas collect feedback in product. Watch for those notifications from your accounts. 

## Potential user segmentation for message adjustment in the future

**Power users and beta candidates**  
“You are a heavy user of {area}. **[New thing]** is ready. You can turn it on here: {project_link}. If you want a head start, I can share a tiny checklist.”

**Flag users without experiments**  
“You already ship behind flags. Add a small holdout on the next release so you can prove lift before rollout. Here is the page in your project: {project_link}.”

**Single-product users with nearby needs**  
“You use {current module} to hit {goal}. {Adjacent module} helps with the next step. Short Loom with setup: {loom_link}. Direct link in your project: {project_link}.”

**Adoption laggards on the core path**  
“Checking in on **[new feature]**. You can enable it here: {project_link}. If it is not a focus right now, all good.”

**High-traffic, low-conversion areas**  
“{page or step} has volume and a drop-off. Try **[new feature]** here first. I can share a minimal setup so you see a signal this week.”

## Automation ideas

- We should use Vitally and data from their PostHog instance to get automated account recommendations for which accounts would benefit from which new features the most.
