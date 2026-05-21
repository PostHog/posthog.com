---
title: PLG lead qualification
sidebar: Handbook
showTitle: true
---

Most product-led leads land in your queue because they crossed an [automated threshold](/handbook/growth/sales/lead-scoring) (MRR, ICP score, employee count), a manual referral from Onboarding, Engineering, or elsewhere, or some other qualification. Once it lands in your lead task queue, your job is to decide whether this account meets the criteria for TAM ownership.

This covers the things TAMs look at to make an informed decision. Note: Disqualification can happen really quickly, but often it takes a bit more time to decide if it's qualified. Some accounts will have immediate opportunities and be ready to engage, and some may require more nurturing.

> **A note on existing resources:** Several handbook pages cover the diagnostic tools you'll use during qualification. The [Metabase account analysis playbook](/handbook/onboarding/metabase-account-analysis) walks through event composition, billing breakdowns, and project mapping. [Checking the health of a customer's deployment](/handbook/cs-and-onboarding/health-checks) covers $identify/$groupidentify patterns, autocapture noise, and implementation quality. Those pages answer "how healthy is this account's implementation?" This page answers a different question: "given what I see, should I invest my time here?"

## What you're actually deciding

TAMs have a [soft cap of 15 managed accounts](/handbook/growth/sales/account-allocation). Every lead you take on means less time for the rest of your book. You're asking one question: does this account have a realistic path to $20k+ ARR and meaningful expansion potential across multiple products?

If the answer is no, simply mark the task as "disqualified" with your reasoning. If the answer is "not yet," change status to "nurturing" and come back. If the answer is yes, change status to "in progress" and move fast.

## Step 1: Size the opportunity

Open the account in Vitally. You need three things:

**Current MRR and trajectory.** Check current MRR, forecasted MRR, and the delta between them. A $600 MRR account growing 30% month over month is more interesting than a flat $1,200 account. Look at the last 3 months of invoices, not just the current snapshot.

**Revenue composition.** Go to Metabase and look at the per-product spend breakdown (see the [Metabase playbook](/handbook/onboarding/metabase-account-analysis) for how to navigate this). You're looking at whether revenue is concentrated in one product (fragile) or spread across multiple (sticky), and whether the spend comes from intentional usage or a misconfiguration.

**Credit and contract status.** Are they on startup credits? How much remains and when do they expire? Monthly plan and growing? That's an annual conversion opportunity. See [startup plan roll off](/handbook/growth/sales/product-led-sales#startup-plan-roll-off) for how to handle those accounts specifically.

**Quick filters to deprioritize:**

- MRR under $500 with no growth trend
- All spend from a single product under $200
- Startup credits with 12+ months remaining and low burn
- Already has a TAM or active sales engagement in Vitally (always check before reaching out. If they have an Onboarding Specialist assigned, coordinate with them to ensure no double reach-out is happening)

## Step 2: Evaluate the company

**Engineer count and company size.** Check Harmonic/Clearbit data in Vitally (employee count, headcount growth). Companies with 50+ employees and a meaningful engineering org are more likely to expand. A 10-person startup spending $800/mo might get to $20k ARR eventually, but the timeline is long.

**Growth trajectory.** Recent funding (`harmonic_last_funding_date`), aggressive hiring (compare `harmonic_headcount` vs `harmonic_headcount_180d`), and early-stage companies with significant capital can qualify even if current spend is below threshold. The new business team learned this the hard way: their inbound lead skill was incorrectly disqualifying well-funded, engineer-heavy companies because it relied too heavily on stated MAU. They added a growth trajectory override for exactly this reason.

**Business type and use case fit.** The company type tells you which expansion path to lead with. The [cross-sell motions](/handbook/growth/sales/cross-sell-motions) page lists the profile of accounts where cross-sell works best: smaller/startup-size without existing tooling, engineer-heavy with direct technical contacts, heavily engaged users pushing the limits of PostHog. The [use-case selling guide](/handbook/growth/use-case-selling) helps you map teams/roles to the problems they are trying to solve with PostHog.

**ICP score.** Use it as one signal among many. ICP score is rigid and data completion is always an issue. A -5 ICP score on a well-funded, engineer-heavy company should not stop you.

## Step 3: Check the implementation

The [Metabase account analysis playbook](/handbook/onboarding/metabase-account-analysis) and [deployment health checks](/handbook/cs-and-onboarding/health-checks) cover the mechanics of each diagnostic in detail. Here, the question is different: you're reading these signals to decide whether to invest your time, not to diagnose a support issue. If the high spend is a result of a poor configuration with too much unnecessary volume, you're likely to invest time where there isn't future growth. Helping customers is never a bad thing, but it won't be a high ROI activity for you as a TAM. Though, there are potential opportunities to offer them FDE services (for a cost).

**Event composition.** High autocapture percentage with zero Actions means they haven't invested in instrumentation. That's both a risk (they might not be getting value) and an opportunity (optimization advice is the strongest opening message you can send). High custom event percentage often means they are more serious, and more importantly, have engineering resources available to invest into PostHog.

**Products activated vs. products paying.** Check `paidProducts` in Vitally. Single-product users with obvious cross-sell fit are prime targets. Also check if they've turned on products they're not yet paying for. Experimentation with products, even if in the free tier, shows intent.

**Billing limits and conservatism.** Fewer billing limits means less friction to growth. Limits set very close to current usage means they're cost-conscious, which gives the annual discount conversation a natural hook. It's also an opportunity to reach out to let them know they are close to possibly losing valuable data.

**Data destinations.** Data flowing out to a competitor (Amplitude, Mixpanel) is a risk signal. Data flowing to a warehouse (Snowflake, BigQuery) or an ad platform is a stickiness signal.

**Project count and workloads.** Multiple active projects mean multiple workloads, which means a bigger expansion surface area.

## Step 4: Check for existing engagement

Before you reach out, confirm nobody else is already working this account:

- **Vitally:** Check segments (TAM/CSM Candidate, Annual Plan, Active Trial), Key Roles, active conversations, and recent notes
- **Slack:** Look for a channel following the `#posthog-[company]` convention
- **Salesforce:** Check for an existing lead task or opportunity

Product-led leads can overlap with onboarding referrals, TAE pipeline, and CSM accounts. The [sales handover page](/handbook/onboarding/sales-handover) documents how the onboarding team evaluates these same accounts from their side. If someone is already engaged, coordinate before reaching out.

## Step 5: Is it qualified?

**Qualify and start working** when:

- Realistic path to $20k+ ARR based on current spend trajectory
- Multi-product expansion opportunity is clear (not speculative)
- Company profile suggests they can grow with PostHog (funding, headcount, business type)
- You have a plausible first message that leads with specific value

Qualifying a lead means you're investing time in it. It does not mean adding it to your managed book yet. Add yourself as the Account Executive in Vitally and use the "Leads" segment to track it separately. You have up to 3 months to figure out whether a new lead belongs in your book.

**Add to your managed book** when you have traction:

- You've established contact and have an active relationship
- There's a concrete plan for prepaid credit conversion or cross-product adoption
- Spend trajectory and engagement back up the expansion thesis you started with
- You're confident enough to put an account plan in front of your lead and Simon

The AM Managed segment is what triggers quota tracking. Adding an account too early, before you have real traction, locks you into carrying it against your 15-account cap without a clear path to quota credit. Simon reviews and approves AM Managed additions, so come with evidence, not just potential.

**Track as a "nurture" but don't add yet** when:

- Spend is growing but still under $1,000 MRR
- Implementation is too early (mostly autocapture, few custom events)
- Company has potential but no urgency signal
- Set a Vitally task to revisit in 30-60 days

**Pass or disqualify** when:

- Spend is flat or declining with no expansion lever
- Company is too small to realistically hit $20k ARR
- Usage looks like a misconfiguration, not intentional adoption
- Already being worked by someone else

For accounts you qualify, see [getting recognized on the deal](/handbook/growth/sales/product-led-sales#getting-recognized-on-the-deal) and [getting people to talk to you](/handbook/growth/sales/expansion-and-retention#1-get-people-to-talk-to-you) for next steps. You need to demonstrate concrete sales activity to get the account added to your book. Sending a couple of emails and one call is not enough.

## What makes a strong opening message

When you qualify a lead, the signals you found during qualification are your conversation starters:

- **Optimization opportunities:** High autocapture percentage, $identify over-calling, session replay without minimum duration. Leading with "I noticed something that could reduce your bill" builds trust fast.
- **Missing products that fit their use case:** B2B without Group Analytics, mobile app without Mobile Replay, AI product without LLM Analytics, engineering team with flags but no experiments.
- **Growth anomalies:** A product that just spiked in usage (new product activated, event volume doubling). Screenshot it and include it in your outreach.
- **Billing page visits:** In the org event stream, filter for `path name contains 'billing'`. Recent billing page views mean they're thinking about cost, which is a natural opening for an annual plan conversation.

See the [communication templates for feature adoption](/handbook/growth/sales/communications-templates-feature-adoption) for message structures that work.
