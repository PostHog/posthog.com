---
title: Session replay
sidebar: Handbook
showTitle: true
---

*For the canonical frame everyone at PostHog uses – the self-driving story and standard description – see [Brand foundations](/handbook/brand/foundations#how-we-describe-posthog).*

## Elevator pitch

PostHog Session Replay records every user session across web and mobile. From any analytics insight, jump to the sessions behind it. From any error in Error Tracking, watch exactly what the user was doing when it happened. From any rage click pattern, let PostHog Code Inbox research and open a fix PR.

Want to watch sessions manually but overwhelmed by the amount of data? PostHog AI can group and summarize sessions for you, separating signal from noise in an efficient way. 

FullStory and Hotjar record sessions. PostHog records sessions *and* connects them to everything else — your metrics, your errors, your flags, and your agents.

## The unique belief (in terms of session replay)

Session replay used to be reactive — you watched what went wrong *after* a user complained. In the [product autonomy loop](/blog/self-driving-product), replay is a proactive signal source. PostHog Code's Inbox reads replay patterns — rage clicks, dead ends, unexpected exits — and converts them into researched, prioritized fix PRs before users ever file a ticket.

The shift is fundamental: replay isn't just evidence of a problem. It's the trigger that starts automated remediation. Watching sessions is what humans do. Generating signals from sessions is what self-driving product development does.

## Who this is for

- **Engineers debugging why users are dropping off** — they need to see the session, not just the funnel.
- **Product teams correlating qualitative behavior with quantitative metrics** — jump from a funnel drop to the sessions behind it in one click.
- **Teams replacing FullStory or Hotjar** and consolidating to a platform that also covers analytics, flags, and experiments.
- **Mobile teams** who need iOS, Android, React Native, and Flutter replay with the same analytics integration as web.
- **Anyone using PostHog** who wants to close the gap between "what happened" and "why."

### Who this isn't for

- Enterprises needing advanced session reconstruction for legal, compliance, or accessibility audits — FullStory's enterprise features are more mature here.
- High-volume consumer apps that need aggressive client-side sampling and complex retention policies — larger enterprise plans are required.
- Marketing teams who primarily need heatmaps as the UX research tool — Hotjar is simpler for that specific use case.

## Messaging

### Message 1: From graph to session in one click

**Problem:** A funnel drop tells you users are leaving. It doesn't tell you why. The gap between quantitative data and qualitative context is usually filled by guesswork, surveys, or expensive user research sessions.

**Solution:** Every PostHog insight links directly to the session recordings of the users behind it. See a drop on step 3 of onboarding? Filter to those sessions. Watch what five users did. Fix it in an afternoon.

**Supporting features:**
- One-click jump from any funnel, trend, or retention chart to related sessions
- Session filtering by user properties, feature flags, events, or cohorts
- Console logs and network requests captured alongside the recording
- DOM snapshot for precise element inspection

### Message 2: Replay as a signal source, not just a recording

**Problem:** Most teams watch session replays when something goes wrong. The signal is already cold — the user has churned or complained. Proactive replay analysis requires someone to watch hundreds of recordings, which doesn't scale.

**Solution:** PostHog Code's Inbox connects to Session Replay as a signal source. Replay patterns — rage clicks, repeated form abandonment, dead-click clusters — are automatically surfaced, researched, and converted into prioritized fix PRs. Sessions feed directly into PR, while AI summarization enables manual review to scale as PostHog AI can group and summarize sessions for you.

**Supporting features:**
- PostHog Code Inbox integration with Session Replay as a signal source
- Session replay summarization and automatic playlist generation
- Rage click and dead click detection
- Session collections for grouping related recordings
- Automatic severity scoring by user impact

### Message 3: Mobile replay with the same analytics integration

**Problem:** Mobile session replay tools are either expensive standalone products or limited SDK add-ons that don't connect to your analytics. Teams end up with separate replay data for web and mobile with no unified view.

**Solution:** PostHog's mobile replay covers iOS, Android, React Native, and Flutter with the same one-click path from analytics to session. Mobile events, mobile flags, and mobile replays all live in the same platform.

**Supporting features:**
- Native SDK support for iOS, Android, React Native, Flutter
- Same filtering and analytics integration as web replay
- Privacy controls consistent across platforms (element masking, network filtering)
- Mobile replay add-on for extended retention

## Battle cards

### vs FullStory

**Their approach:** Enterprise session replay with advanced DX data, session reconstruction, and compliance features. Expensive. No native analytics, no feature flags, no agent integration.

**Where PostHog wins:**
- Native connection to analytics, feature flags, experiments, and error tracking
- PostHog Code agent integration — replays become inputs to automated fix PRs
- Significantly lower cost at equivalent session volume
- More generous free tier (5,000 sessions/month forever vs FullStory's trial limits)
- AI summarization and automatic playlist generation

### vs Hotjar

**Their approach:** Simple heatmaps, scroll maps, and basic session replay. Popular with non-technical teams. No analytics depth, limited mobile support, no feature flags.

**Where PostHog wins:**
- Full analytics integration — jump from Hotjar's heatmaps to PostHog's funnel and back is not possible; PostHog provides both
- Feature flag correlation — filter sessions by which flag variant the user saw
- Agent integration for automated investigation
- AI summarization and automatic playlist generation

### vs LogRocket

**Their approach:** Developer-focused session replay with strong frontend performance monitoring. No product analytics or feature flags. Good DevTools integration.

**Where PostHog wins:**
- Broader platform — analytics, flags, experiments, warehouse, and error tracking included
- PostHog Code Inbox integration — LogRocket has no equivalent agent loop
- Usage-based pricing without seat limits

## Objections

### "FullStory has better enterprise features"

**Follow-up:** Which specific features does your security or legal team need?

**Answer:** FullStory's enterprise session reconstruction and compliance features are genuinely more mature for legal and accessibility use cases. For product engineering teams, PostHog has everything needed at a fraction of the cost. If the requirement is driven by a compliance checklist rather than active use, it's worth stress-testing whether FullStory's premium features are actually being used.

### "We're worried about user privacy"

**Answer:** PostHog has CSS masking (any element, including dynamic content), network request filtering (block sensitive endpoints), and input field masking by default on sensitive types. Privacy controls are explicit and auditable. You define exactly what gets recorded.

### "5,000 free sessions isn't enough"

**Answer:** 5,000 is the forever-free tier, not a trial. Paid tiers are usage-priced with no seat limits. Compare to Hotjar's 35 daily sessions on the free plan and $100+/month for meaningful volume. PostHog's paid replay is typically 3-5x cheaper than FullStory or Hotjar at equivalent usage.

## Selling to enterprise

Enterprise session replay customers get volume discounts, extended mobile replay retention, advanced access controls, SOC 2, and EU data residency. The consolidation pitch is particularly strong here: FullStory and Hotjar contracts are often standalone line items that can be eliminated when replay is included in a PostHog annual deal.

The forward-looking pitch: replay as a signal source for PostHog Code Inbox is a capability no other vendor offers. Teams that instrument replay properly now will have a fully automated UX investigation loop as the agent features mature.
