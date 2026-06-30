---
title: Engaging unengaged customers
sidebar: Handbook
showTitle: true
---

> This is a living document — we'll keep adding tactics as we learn what works. If you've found something effective, add it here!

## Why this matters

Unengaged customers churn. But "just checking in" rarely works. The tactics below give you concrete, helpful reasons to reach out — so your outreach feels like a favor, not a follow-up.

The common thread: **do your homework first, then lead with something specific and valuable.**

## Pre-outreach research

Before reaching out, spend 10 minutes understanding where the customer is at. This makes all the difference between a generic check-in and a genuinely helpful conversation.

### Review their engagement metrics

Use the customer's PostHog usage data to understand what they're actually doing before you reach out. Look at:

- **What features they're using** — insights, dashboards, recordings, etc.
- **Insight titles they've created** — these reveal what business questions they care about
- **Recent activity** — are they creating new things or just passively viewing?

For example, if a customer is creating and viewing insights with titles around "funnel conversions," they almost certainly care about improving funnel conversion rates. Lead with that.

**Where to look:** Customer engagement dashboard in PostHog — filter by the customer's org/team and check insight creation and viewing activity. Use PostHog AI or the PostHog MCP ([with CS Skills like User Deep Dive](https://github.com/PostHog/skills/tree/main/skills/team/customer-success)) to pull additional details and summaries.

### Walk through their site with debug mode

Visit the customer's website and inspect their PostHog implementation firsthand:

1. Open the browser console and run `posthog.debug()` to enable debug mode
2. Check the config to see how PostHog is configured
3. Walk through key flows (login, onboarding, core product actions)
4. Watch what events fire — are they capturing meaningful actions?
5. Look for issues: missing events, misconfigured properties, no identify calls, etc.

This gives you a firsthand view of what the customer is (or isn't) capturing. You can come to the conversation with specific, concrete observations — "I noticed you're not capturing any events after sign-up" — rather than asking them to self-report.

**Framing matters:** Position it as a proactive health check, not a criticism. Something like: "I took a look at your implementation and spotted a couple of things that might be worth addressing..."

## Outreach tactics

Ordered roughly by how often the trigger comes up — the first few you can do for almost any account, the last few only when external events line up. Apply the [meta-tactics](#meta-tactics) below to whichever you pick.

### SDK health — flag outdated SDKs

Use the SDK health check to see if the customer is running outdated SDKs. This is one of the easiest, most concrete reasons to reach out. We recommend customers update monthly so they don't miss bug fixes and improvements.

**Suggested cadence:** Run the SDK health check on each of your accounts quarterly, or whenever a customer is ramping up usage of a specific SDK.

**Suggested wording:**

> BTW our SDK health check is warning that you are using a three year old version of our Python SDK — I promise we've improved it since then! Also your iOS and Android SDKs are really out of date. Any chance of updating these?

**Why it works:** Specific, helpful, and low-effort for both sides. The tone is light and friendly, not alarming.

### Spot new product interest and reach out proactively

Watch customer activity for signs they're exploring a product they haven't adopted — docs page views, product-page activity, exploratory events. Use that as a natural conversation starter (credit to Tyler).

**Suggested cadence:** Weekly scan of doc-page views and product-page activity for your accounts.

**Suggested wording:**

> Hey @[contact], saw you checking out AI observability and wanted to share a few things. It occurred to me that our LLM observability suite might be really helpful for your team.
>
> Not only do you get evals/traces/generations to track model performance, token usage, etc, you can then also connect those things back to PostHog session/user data. Which means you can actually easily run A/B and multivariate tests on things like prompts, models, and so on, while ALSO seeing how the LLM performance/quality have an impact on conversion and funnel.
>
> You may already have something like that in place but thought it was worth mentioning!

### Steady drumbeat of usage-specific tips

For customers who rarely reply, keep sending value anyway. Session replays will tell you whether your advice is landing — quiet customers often act on tips without ever responding (credit to Anna-Marie, who used this pattern on a customer that hadn't replied in months; replays showed they were quietly acting on every tip and eventually adopted multiple new features).

**Suggested cadence:** Every 1-2 weeks. Rotate value types so it doesn't feel like a stream of asks.

**Value types to rotate through:**

- Cost optimization — e.g. *"you have a couple of flags tied to completed experiments still enabled"*
- Alerts or monitoring opportunities you spot in their data
- Data quality observations — e.g. *"your group analytics has many groups being created with a UUID as the group key"*
- Workflow templates based on insights or dashboards they've drafted but not saved
- Heads-ups on upcoming products in their space — especially competitive ones — so they don't get blindsided
- New beta features that tie back to what they're already doing
- OOO heads-ups with a fallback contact

**Suggested wording (transparency about a competing product launch):**

> Hey @[contact], :wave: just wanted to give you a heads-up and be super transparent: as you might already know our engineers have been working on [new product]. I've just heard that the ballpark timeline is ~end of [month] for going into beta. I know this might be a sore point given your space, and didn't want you to feel blindsided.
>
> I'd love to address any questions or concerns you may have, and as always — make sure that you continue getting value from our product analytics, feature flags and experiments you've been running.
>
> Wanted to be upfront here! :pray:

**Source:** [Slack discussion](https://posthog.slack.com/archives/C093XHYMGBE/p1777971362108529?thread_ts=1777971362.108529&cid=C093XHYMGBE)

### 1:1 individualized outreach to revive a dead channel

When a customer channel goes completely silent, don't mass-ping — it gets ignored. Instead, DM team members individually over a couple of weeks until you've rebuilt the channel one person at a time, then get them on a call together. Seb used this on a dead channel and eventually got the whole team back on a call.

**Suggested cadence:** Spread individual DMs over 2-3 weeks. Convene the group on a call once you have a critical mass.

**Bonus — same-day call follow-up with a custom touch:** A custom-branded merch discount code (set up in the Shopify admin — see the [merch store handbook page](/handbook/company/merch-store)) is a small detail with outsized goodwill impact. Sending it same-day rides the momentum, well before the "proper follow-up."

**Suggested wording (same-day follow-up):**

> hey team! thanks for the productive chat earlier today.
>
> i owe you a proper follow up on everything we discussed, but couldn't wait to share this discount code ([CUSTOM-CODE]) with ya'll so you can get your save posthog t shirt on the (hog)house :hog-party-wave:
>
> lovely meeting you all - excited to keep working together :hog-offers-heart:
> cc @[people who showed interest on the call] - tagging you since you were esp excited about the merch :slightly_smiling_face:

**Source:** [Slack discussion](https://posthog.slack.com/archives/C08M011SBCM/p1779489719678409?thread_ts=1779489719.678409&cid=C08M011SBCM)

### Post-event outbound to long-silent customers

After events (Stripe Sessions, conferences, meetups), sweep through post-event outbound — including customers who already have a CSM/TAM relationship that's gone cold (credit to Lorena). Event context resets the conversation: it's not "checking in," it's "I just saw you at X." A different sender or different framing can revive a stalled thread that relationship-based follow-ups couldn't.

**Suggested cadence:** After every event your customers attended, do a post-event outbound sweep — don't filter out accounts with existing relationships.

**Why it works:** Event-tied context lowers the social bar to engage. The customer doesn't have to explain the silence — they just have to reply to "great to see you at X."

**Source:** [Slack discussion](https://posthog.slack.com/archives/C090RCG671C/p1778497201155889?thread_ts=1778497201.155889&cid=C090RCG671C)

### Use a competitor pricing change (or market news) as a value-based reason

When something happens in the wider market that could cost the customer money — e.g. a competitor's pricing change — that's a real reason to reach out. Will used this when LaunchDarkly's pricing changes started getting bad press: tagged specific engineers and offered to do the heavy lifting on a PostHog vs LD comparison.

**Suggested cadence:** Opportunistic — keep an eye on competitor news so you're not the last to know.

**Suggested wording:**

> Hey @engineer1 and @engineer2,
> i know you're using [competitor] for feature flags — we heard at [event] that the [pricing changes]([link]) are causing bill shocks, so if you're doing any sort of internal review, lemme know and i'll do the heavy lifting of the comparison from our side.
> p.s. please lemme know if i should tag anyone specific

**Follow-up pattern that worked:**

- If they engage, drop a deep, honest technical breakdown. Don't oversell — call out gaps in our product where they exist.
- If they push back on a gap, close the loop publicly: *"Let's put a pin in it for now. I'll keep an eye on this from our side, and if we can support [X] cleanly sooner, I'll come back with something then!"*
- Loop in engineering in the customer channel when relevant — turns the conversation into a product input loop and shows the feedback is being taken seriously.

**Source:** [Slack discussion](https://posthog.slack.com/archives/C093XHYMGBE/p1777914846235949?thread_ts=1777914846.235949&cid=C093XHYMGBE)

## Meta-tactics

Cross-cutting patterns that apply to any outreach above, regardless of which trigger you use.

### Lead with their data, not a generic ask

Every message should open with a specific observation pulled from their actual PostHog usage. Pair it with a direct link to the relevant view in their project (e.g. `eu.posthog.com/project/.../...`) so they can act in one click.

### Tag specific people, not channels

Name individuals in your message ("Hey @[contact], saw that..."). Channel-only pings get ignored; named tags lower the social cost of replying. Invite a redirect when you're not sure who's right: *"lemme know if i should tag anyone specific."*

### Mix value types, not all asks

Rotate through tips, cost optimization, transparency about upcoming products, OOO heads-ups, beta invites. If every message is an ask, you train them to ignore you. Build trust before the ask.

### Low-pressure framing

Phrases that consistently work:

- *"thought it was worth mentioning"*
- *"lmk if interesting"*
- *"if it's a bad fit, I'll say that and leave it there"*
- *"you may already have something like that in place"*

Don't push when they push back. Close the loop publicly with a clean "let's put a pin in this" so the door stays open for next time.

### Strike while energy is high

Same-day follow-ups after calls beat polished follow-ups sent a week later. Small unexpected perks (custom merch codes, personalized touches) sent in the momentum window punch above their weight.

## Investigating further with MCP

### Use MCP to find frustration signals for specific outreach

Our MCP can be a great tool for understanding silent user frustation. Below are some signals to look out for and find specific individuals worth reaching out to.

**Lost insights:**: You can ask our MCP how many insights were started versus how many were saved and by who. This can signal users may be having difficulty trying to create the right insights. For example, a customer may have started 130 insights in the past week but only saved 6.

**Rage clicks:** This can be great to understand if there are specific pages or insights the user is showing higher than usual frustration. Understanding what the page or insight is about, and coupling this with session replay can give you an idea as to what the user was trying to accomplish as a way to be helpful.

**Product engagement:** By default, AI will sometimes assume certain users are not engaged because it's measuring PostHog UI engagement. To get around this, ask about MCP engagement as well to better understand how active users are engaging with PostHog. Additionally, Vitally may sometimes report low dashboard activities or product usage but this can be a false positive as its measuring dashboard views and not specific insights. Checking actual user engagement will get you a more accurate view of who is active and who isn't, and specifically what products they're engaging in to reach out with specific questions or help.

**Query failures:** Vitally can help surface query failtures but MCP can get more specific on the failures customers are encountering so this could be an opportunity to reach out with a specific message to see if the customer may want assistance with getting a specific query working. Sometimes the MCP will highlight the specific query that is failing giving you something to directly investigate and fix before reaching out.

**Client request failures:** This is separate from query failures and can mean customers are having issues loading specific data and could be a great opportunity to resolve the issue for them or reach out to confirm and file a bug fix on their behalf.

**Priority summary:** After requesting AI to look at all the potential frustration signals, you can request a prioritization summary for users you should reach out to with specific summaries of issues that particular user is dealing with and a sample crafted outreach message. The MCP will then priortize these and give suggestions that you can tweak making it easier to reach out to users that you typically may not speak with.

### Use MCP to understand events changes for outreach

**Event changes:** MCP is great at is surfacing event changes on a daily, weekly, or monthly basis, and any potential implementation changes or product drops that can be easily missed. Ask the MCP to do an analysis at the organization level (important as sometimes the MCP can default to user engagement rather than product events), and if there are changes in event volume, request who was actively using these products prior to the change before reaching out to learn about the changes. For example, AIO volume suddenly changed 7 days ago, ask if this could have been related to implementation changes.

**Product adoption:** A quick way to see product adoption changes is to ask MCP for this info. Rather than only look at event volume increasing or decreasing, MCP has been able to surface when customers were testing a new product, sample events, reduce product usage, etc. These are all perfect opportunities for reaching out to specific users who are working on these with specifics such as "I see you recently are tested our data warehouse briefly but have discontinued sending data. Was there anything specific you were looking to do with data warehouse that I could help with or answer questions around. Curious on how your team is thinking about using data warehouse and what goals you have in adopting PostHog's data warehouse as a solution."

_Note:_ It can be helpful to request MCP ignore weekend events when doing these analysis as weekend events often dips and can create false positive signals in your analysis.