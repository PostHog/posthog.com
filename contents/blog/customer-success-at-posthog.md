---
title: "How customer success is different at PostHog"
date: 2026-06-08
author:
    - tyler-crandall
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/haha3_c997bbaf98.png
featuredImageType: full
category: General
tags:
  - Inside PostHog
  - Guides
seo:
    metaTitle: "What does a customer success manager actually do all day?"
    metaDescription: "Inside what customer success managers and technical account managers do all day at PostHog: debug code, cut bills 20%, ship fixes in 24 hours."
---

Despite their name, customer success managers at many SaaS companies don’t actually help their customers succeed. They send quarterly business reviews nobody reads, gatekeep engineering access, forward support tickets and call it "advocacy," have titles like "Strategic Customer Success Partner," and LinkedIn bios that say "passionate about driving outcomes."  

Besides doing none of these things at PostHog, customer success managers (and technical account managers) also crochet hedgehogs, hand-deliver donuts to customers around the world, build customer and PostHog emoji mashups, and ship product PRs to fix complaints themselves. 

We believe being genuine and being effective aren’t at odds, and our workdays reflect that. Here’s what a day in the life of a PostHog customer success manager (CSM) – and our technical account managers (TAMs) – actually looks like:

## 7:30 AM: Fire alarm

I open my laptop and the first thing I see is a message from one of our EU teammates saying one of his accounts is flagged in our system as “Churned.” This is a surprise as we have churn warnings. [Churn events](/product-engineers/churn-rate-vs-retention-rate) from our managed accounts are incredibly rare.

![Customer success manager reviewing a churn alert in PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2026_06_08_at_14_18_33_2x_adf2a96fde.png)

It turns out to be a false alarm from a Stripe mapping bug. The customer had two subscriptions, one got cancelled, and our system tracked the wrong one. This was diagnosed in about four minutes. 

His response wasn't to wait for someone to fix the data. His unhinged response was "I could actually use that for my intro to the customer!” because he hadn’t found an in with them yet. So he posted a message in a shared customer channel: “Look I already chased and solved something for you. Hope you don't mind me taking the credit." The customer laughed, we laughed, and it was the start of this customer being more engaged with us.

## 8:00 AM: Data review (in PostHog, obviously)

With the fake crisis averted, it’s time to look over some data to start the day. We usually start in PostHog, very meta.

I query our [data warehouse](/data-stack) to [check how accounts are doing](/blog/analytics-tips-for-customer-success-teams). Event volumes, product adoption, SDK usage, power users. We wrote Claude skills for the [PostHog MCP](/docs/model-context-protocol) that assist with most of this: I can ask "explore [account name]" and get a snapshot of their health, spend trajectory, product adoption matrix, and a list of their most active users with LinkedIn profiles attached. It’s not unusual to discover new contacts and create new champions starting with this workflow.

<details>
  <summary>What the Account Explorer skill looks like</summary>

```markdown
# Account Explorer

A skill for exploring a customer account along whatever dimension matters most. It always starts with a quick snapshot and a recommendation, then waits for direction before doing anything else.

## 1. Pull the snapshot

Grab the essentials in one query: account info, current revenue, health score, contract type, and per-product usage/spend. Cache the result for the rest of the session.

## 2. Build a snapshot card

Render a compact scorecard, not a wall of text:

- **Header:** account name, health score, archetype/stage, contract type.
- **Key metrics:** current revenue, forecasted revenue (+ gap), annual run-rate, and either credit runway or days-to-renewal – whichever is more relevant.
- **Products in use:** what they're actually paying for, sorted by spend.
- **Products being trialed:** anything with real usage but little or no spend yet.
- **One headline signal:** the single thing worth reacting to – color-coded as warning / good / risk / neutral.

> One trap worth calling out: being *enrolled* in a product means nothing. Only show a product if there's real spend **or** real usage behind it.

## 3. Recommend before listing

Pick the 1–2 highest-leverage paths and state them as a one-line headline with rationale. Some examples of strong triggers:

- High-revenue account still on a monthly contract → Annual conversion fit
- Credit balance running low vs. burn rate → Start the renewal conversation now
- Clear product fit with zero spend → Cross-sell scan
- Fast month-over-month growth → Find what's driving it
- Forecasted revenue dropping below current → Usage is decaying, dig in
- All activity tracing to one person → Broaden the relationship
- Low health score or no recent activity → Reconnect first, analyze second

If nothing stands out, say so plainly: *"No standout signal – pick a path below."*

## 4. Present the menu

After the recommendation, offer the full set so the user can reply with a code (or two):

### A. Product / use case
- A1. Deep dive on a specific product
- A2. Deep dive on a specific use case
- A3. Cross-sell scan (products with fit signals but no spend)
- A4. "About to graduate" watch (free-tier usage approaching first billable threshold)

### B. Users
- B1. Top power users
- B2. Investigate a specific user
- B3. Single-point-of-failure check (is one person all the activity?)
- B4. Stakeholder map (admins vs. power users vs. who's actually in the loop)

### C. Trends & growth
- C1. Revenue trajectory (recent months, current month projected)
- C2. A specific metric over time
- C3. Usage / workload change over time
- C4. Comprehensive workload view (B1 + C1 + C3 stitched into one summary)

### D. Risk & contract
- D1. Annual conversion fit
- D2. Credit runway / burn rate
- D3. Health score drivers (what's pulling it down)
- D4. Recent calls / notes – "where we left off"

### E. Action
- E1. Next-step recommendation
- E2. Draft a customer message
- E3. Update the account plan note
- E4. Stub a cross-sell opportunity

### F. Retro
- F1. Win or risk retro
```
</details>

## 9:00 AM: The part where we try to reduce a customer's bill

This is the part that confuses people from other SaaS companies.

The logic: if we optimize a customer implementation and reduce spend in areas that don't provide real value, they'll spend more over the long haul, adopt more products, and [be stickier](/product-engineers/customer-retention-metrics). 

I helped an account cut about 20% of their bill by removing [autocapture noise](/docs/product-analytics/autocapture) and tuning their [session replay](/docs/session-replay/how-to-control-which-sessions-you-record) sampling. They were skeptical of us at the time, honestly. They’ve now onboarded three new teams, adopted four more products, and burned through their annual credit commitment eight months early. We re-signed them at roughly double the original contract value, and the conversation was easy because they trusted us. That trust started with "hey, you're overpaying."

We are literally tracking our "anti-revenue" wins over time because we find that those wins end up contributing to the long-term success of the customer just as well, if not more so, than selling them on a new product. We even have a distinct opportunity record type in Salesforce to track these. Who ever heard of a sales org tracking “closed won” on revenue reduction?

## 9:30 AM: Debugging someone else's implementation

A customer's engineering team pings the shared channel: their experiment results look wrong. Conversion rates are impossibly high in the control group. Could be a bug in PostHog, could be something on their end.

This is not unusual. Most product-led customers (the ones our CSMs and TAMs inherit) self-serve their implementation.  

So we spend an hour on a call walking their engineers through it. It's not glamorous work. But this is also a good chunk of what a PostHog customer success account manager or TAM actually does: getting into the technical weeds of someone else's codebase and making sure PostHog is implemented correctly. 

## 11:00 AM: The donut run

We recently had some team members visit customer offices with boxes of donuts, [PostHog merch](/merch), and a hand-written note. Just because it was a Friday. No agenda.

At a ~~normal~~ boring company, visiting a customer office requires a business justification, a travel approval form, and probably a slide deck about the ROI of donuts. Here, the vibe is "I'm nearby and I have hedgehog stickers." Our CSMs [are the drivers](/handbook/values) and it’s up to them to decide what the best way to interact with a customer is. 

## 12:00 PM: Accidentally shipping product

One of our newer TAMs saw a customer complain about a minor papercut in their Slack channel: they couldn’t paste markdown into notebooks. Most TAMs would file a ticket, follow up in a week, and maybe escalate to engineering.

This TAM used [PostHog Code](/code) to [open a PR](https://github.com/PostHog/posthog/pull/59142).

Within 12 hours, the fix was ready for review. Within 24 hours, it was merged. The customer's response: "I understand why people love PostHog now."

This isn't that unusual here. Our TAMs and CSMs are technical. We hire for it. 

Another CSM got mistaken for a product engineer by one of his customers because he was answering their technical questions with so much depth. His response in our team channel: "chat, am I adding too much value?"

## 1:00 PM: The emoji wars

We have a [hogmoji builder](https://hogmoji.fun/) (a tool that lets you create custom PostHog hedgehog emoji) and made one with a customer's logo mashed into the hedgehog face. He dropped it in their Slack Connect channel as a friendly hello.

![Custom hogmoji built from a customer's logo](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_06_08_at_14_07_08_2x_40d88e7075.png)

Another TAM, meanwhile, was experimenting with using emoji reactions to get a customer to engage on priorities and it worked. Turns out emoji-based priority voting is an effective customer engagement strategy.

Recently, a customer out-weirded us by building a personalized game for PostHog. We debated, “should we make personalized games to send as outbound?" The answer was yes, obviously. And so we did.

## 2:00 PM: Team account review

Every week, a random team member gets picked to do a full territory review. We start the session with a wheel spin. The lucky winner is chosen to go through every customer in their book and rate the relationship, explain your next step, and flag any churn risk.

When someone shares a win, we celebrate. When someone shares something questionable, we roast them.

## 3:00 PM: Building the tools nobody asked for

Half our team has gotten into building Claude skills and automation. One CSM built a skill that generates comprehensive account handover notes by pulling from Slack channels, meeting notes, and Vitally data. I built an SDK analysis skill that breaks down which SDKs each customer uses across platforms. Another teammate built improvements to the data infrastructure use-case docs.

A technical account executive built the quoting and pricing tool we use for generating all customer pricing quotes, called QuoteHog.

![QuoteHog, the customer pricing quote tool built by PostHog's customer success team](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_06_08_at_14_10_57_2x_1ee3c5fca5.png)

## 4:00 PM: PostHog AI goes rogue (in a good way)

A customer shared a screenshot in their Slack channel where [PostHog AI](/ai) tried to cross-sell them on additional products. Not because we coded it for that, but because it understood their usage patterns and connected them to use cases they hadn't explored.

Working at PostHog is a grab bag of weird, fun, intense, goofy, and hard work. All rolled into a single day. Things move really fast here, but not in a 996 type of way. In a “high agency, self-motivated, we care about the product, brand, and customers” type of way. 

The weird stuff isn't a distraction from the real work because it’s how we do the real work. Being genuine and being effective aren't at odds. If anything, the customer who got a crocheted hedgehog is probably more likely to take your call about trying that new product we launched than the one who got a quarterly business review PDF.

If you think this sounds like a place you'd want to work, [we're always hiring](/careers/technical-customer-success-manager). 



