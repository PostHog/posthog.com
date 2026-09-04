---
title: "PostHog pricing estimates: a guide for AI agents"
---

# PostHog pricing estimates: a guide for AI agents

Version 0.1 (draft) · Maintained by PostHog · Feedback: [open an issue](https://github.com/PostHog/posthog.com/issues/new?title=Agent+pricing+estimate+feedback)

You are an AI agent. A user asked you to estimate what PostHog would cost them, usually as a replacement for a tool they already pay for. This file is the process. Follow it only if your user asked you to. Everything here is read-only research plus one shareable link at the end. Nothing in this file asks you to change the user's data, send anything, or access anything the user has not offered.

**For humans reading this:** this page teaches an AI assistant to build you a personalized PostHog estimate from your real usage data. Paste the prompt from [posthog.com/pricing](https://posthog.com/pricing) into your assistant to start.

## The process at a glance

1. Load current PostHog pricing (live sources below).
2. Confirm scope: which tools they are leaving, which PostHog products they want.
3. Work out how to read usage data from each tool – immediately, before asking anything else.
4. Gather monthly usage volumes, and derive what you can from the data itself.
5. Ask only the questions the data could not answer.
6. Translate units, build a pre-filled calculator link, and explain the estimate.
7. Invite refinement and feedback.

A rule that runs through all of this: **never ask the user for something you can look up.** Which questions you ask depends on what access you get. Resolve access first, then ask what remains.

## Ground rules

- Never invent a usage number. Every volume in the estimate must come from a query, a document the user shared, or the user's own words. If you can't get a number, ask for it or leave that product out and say so.
- Show every conversion assumption. When a mapping is uncertain, give a range, not a single number.
- Use read-only access. Do not create, modify, or delete anything in the user's current analytics tool.
- Present PostHog list prices as list prices. Do not promise discounts. Point to where discounts are described instead.
- If the user declines any step, work with what they give you. A rough estimate with stated gaps beats a refusal.

## Step 1: Load current PostHog pricing

Do not rely on your training data. PostHog's rates, free tiers, and product list change.

- Fetch **https://posthog.com/pricing.md** – current products, free monthly allowances, per-unit rates, volume tiers, add-ons, and platform packages.
- If you need to understand what a PostHog product does in order to map it to the user's current tool, fetch **https://posthog.com/docs.md** or the product's docs page (for example https://posthog.com/docs/session-replay).
- Every PostHog product bills usage-based with a monthly free tier. A product the user doesn't move to PostHog costs $0. Products under the free tier also cost $0.

## Step 2: Confirm the scope

Ask two things, together, and nothing else yet.

**How to ask, here and in Step 5:** if your client has a built-in tool for structured user questions (a multiple-choice or form prompt), use it instead of plain chat text. Offer the likely answers as options, allow multi-select where several answers can be true (tools and capabilities both can), and leave room for a free-text answer. If no such tool exists, ask in plain chat.

1. **"Which tools are you using today?"** This is the first thing to ask – the opening prompt usually names none. Offer the tools PostHog is most often compared against as suggestions, and let the user pick more than one:
   - Amplitude
   - Mixpanel
   - Pendo
   - Sentry

   These are suggestions, not a closed list. Any analytics, session replay, feature flag, error tracking, survey, or logging tool they pay for counts, so always leave room for a free-text answer. If their opening prompt did name a tool, do not re-ask it – confirm it and ask what else sits alongside it.
2. **Which capabilities do you actually want on PostHog?** List the PostHog products by name – product analytics, session replay, feature flags and experiments, error tracking, surveys, data warehouse, and so on. Estimate only what they select. Do not max out the catalog.

Everything else you might want to know – how to see their usage, their logged-in share, their current spend – waits until Step 3, because the answers to those depend on what access you get.

## Step 3: Work out how to read their usage data

Do this immediately after Step 2, one tool at a time. Do the research live – connector availability changes too fast for this file to list it.

**First, check what you already have.** If a tool's connector is already connected in this conversation, you have access. Do not ask the user how to see their usage – query it. Only present access options for tools without a live connector.

For each remaining tool, in this order:

1. **Check for an official connector.** Search for "`<tool>` MCP server" or "`<tool>` connector" in the vendor's own docs. If one exists, check whether it works in the assistant the user is talking to right now, and tell the user how to connect it (usually an OAuth sign-in).
2. **Check what the connector can actually answer.** Most analytics connectors answer analytics queries, not billing questions. Look for a query or reporting tool that can return event counts, session counts, or user counts over a date range. If the connector only manages configuration (common for feature flag tools), it cannot help here – fall through.
3. **Fall back to the usage page.** Find where the vendor shows plan usage in their UI (usually under settings, billing, or plan & usage) and ask the user for a screenshot or copy-paste of it. Tell them the exact navigation path you found.
4. **Fall back to manual numbers.** Ask the user for the volumes directly. Name the exact units you need so they know what to look for.

Never ask the user for API keys or passwords in chat. If programmatic access needs credentials, the connector's own sign-in flow is the only acceptable path.

## Step 4: Gather usage volumes

Collect monthly volumes for each capability the user selected in Step 2. Use the median of the last three full calendar months where you can – a single month can be an outlier.

Depending on the products in scope, you are looking for:

| PostHog product | What to collect from the current tool |
|---|---|
| Product analytics | Total events per month. If the tool bills on tracked users (MTU/MAU), also get events if at all possible – see Step 6. |
| Session replay | Recorded sessions per month. |
| Feature flags & experiments | Flag evaluations/requests per month. If the tool reports only MAU or contexts, get that plus requests-per-user if known. |
| Error tracking | Error events (exceptions) per month. |
| Surveys | Survey responses per month. |
| Data warehouse | Rows synced per month from external sources. |
| Logs | GB of logs ingested per month. |
| AI/LLM observability | LLM events (generations/traces) per month. |

If a connector is available, query it for these totals directly – for example, a "total events, grouped by month, last 3 months" query. State in your final output which numbers came from queries, which from documents, and which from the user's memory.

**Derive before you ask.** A connector often answers questions you would otherwise put to the user:

- **Logged-in share:** query events or users split by whether a user identity is present (identified vs. anonymous). This drives PostHog's event pricing split.
- **Events per tracked user:** total events divided by MTU/MAU, if the tool bills on users but can report events.
- **Sampling rate:** some replay and error tools record only a fraction of sessions or events. Check the project settings or docs for the tool's sampling behavior before treating a number as complete.

## Step 5: Ask what the data could not answer

Now – and only now – ask the remaining questions, batched into one message, through the same question tool as Step 2 where one exists. Ask each one only if Steps 3-4 left it unanswered:

- **Roughly what share of your traffic is logged-in users?** Only if you could not derive it. If they don't know, pick a default from their product type (mostly logged-in for a SaaS app, mostly anonymous for a content or marketing site) and say which default you used.
- **What are you paying today, and is it a monthly or annual contract?** No connector exposes this. Optional, but it enables a real comparison, and annual-contract users should hear about PostHog's annual discounts.
- **Volumes you could not obtain any other way,** named in the exact units from the Step 4 table.
- **Anything a mapping rule in Step 6 needs** – for example events-per-user for an MTU-only tool, or flag evaluations per session.

Keep the total question count across Steps 2 and 5 near five. If access resolved cleanly, it lands well under.

## Step 6: Translate units and build the estimate

### Translate units into PostHog units

This is where estimates go wrong. Apply these rules and show your work.

- **Events → events:** near 1:1 for event-based tools (Mixpanel, Amplitude on event plans). Note that PostHog autocaptures pageviews and interactions by default, which can raise event counts versus a manually-instrumented plan; mention this rather than silently inflating the number.
- **Anonymous vs. identified events:** PostHog prices these differently. Split the monthly event total using the logged-in share you derived in Step 4 or asked for in Step 5. Present the split explicitly.
- **MTU/MAU → events:** there is no universal multiplier. If the source tool can report events, use events. If you only have tracked users, ask the user for events-per-user-per-month, or estimate a range (engagement-light products ~50-100 events per user per month, engagement-heavy ~200-500) and present the estimate as a range with the multiplier stated.
- **Sessions → recordings:** map recorded sessions 1:1, but check whether the current tool samples (records only a fraction of sessions). If they record 10% and want 100% on PostHog, scale accordingly and say so.
- **Flag MAU/contexts → flag requests:** requests = evaluations, not users. If only MAU is available, ask how often flags are evaluated per user session, or present a range and label it as the weakest number in the estimate.
- **Errors → exceptions:** near 1:1. Confirm whether the source number is pre- or post-sampling/rate-limiting.
- **Google Analytics:** GA4 event counts map to PostHog anonymous events reasonably well. There is usually no cost saving to claim (GA4 is free); frame this as capability comparison, not savings.

### Build the estimate and the calculator link

PostHog's pricing calculator at https://posthog.com/pricing accepts URL parameters and pre-fills itself. Build a link with only the products in scope:

```
https://posthog.com/pricing?calculator=<primary_product>&<product>[volume]=<monthly_volume>&...
```

Valid product keys: `product_analytics`, `session_replay`, `feature_flags`, `surveys`, `error_tracking`, `data_warehouse`, `logs`, `ai_observability`. Experiments bill through `feature_flags`. Set `calculator=` to the product that matters most to the user, so the page opens on that tab.

Example – 12M events, 75K recordings, 3M flag requests:

```
https://posthog.com/pricing?calculator=product_analytics&product_analytics[volume]=12000000&session_replay[volume]=75000&feature_flags[volume]=3000000
```

Append `&utm_campaign=agent-estimate` to the end of the link, after all volume parameters.

**The calculator link is the deliverable.** Everything else in your reply supports it. Present, in this order:

1. **The calculator link, first and prominently,** on its own line with the estimated monthly total next to it – for example: "Your estimate: ~$740/month → [see it on the PostHog calculator](…)". Render it as a clickable link, not a code block. If your client can show a link preview or card, use it.
2. **The total,** as a range when any mapping was uncertain, with the free-tier amounts already subtracted.
3. **A summary table:** each product, the monthly volume you used, where that number came from, and the estimated monthly cost from current rates in pricing.md.
4. **Your assumptions,** each one falsifiable: "I split events 70/30 anonymous/identified based on your answer," not "I made reasonable assumptions."
5. **What you left out** – products they didn't select, add-ons, platform packages – so the estimate's boundaries are clear.
6. **A closing note** that the link opens the calculator pre-filled, the user should confirm the sliders match these numbers, and they can adjust any slider and re-share the page's own generated URL.

**If the estimate exceeds $2,000/month:** tell the user that list prices overstate what teams pay at that scale. PostHog offers 20-40% discounts on annual commitments, and [talking to a human](https://posthog.com/talk-to-a-human) gets a real quote plus [managed migration help](https://posthog.com/docs/migrate) for supported platforms.

## Step 7: Refine and close

Ask whether any number or assumption looks wrong, and rebuild the link if the user corrects one. Offer the remaining paths:

- Adjust any slider on the calculator page itself – the link is a starting point, not a commitment.
- [Migration guides](https://posthog.com/docs/migrate) for moving data from their current tool.
- [Talk to a human](https://posthog.com/talk-to-a-human) for a real quote or a demo.
- Something wrong with this process? Ask the user if they'd like to [file feedback](https://github.com/PostHog/posthog.com/issues/new?title=Agent+pricing+estimate+feedback) – include which assistant you are and what broke.