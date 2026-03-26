---
title: 'Growth & Marketing'
showTitle: true
hideAnchor: false
---

## What is the job to be done?

"Help me understand what drives acquisition, conversion, and revenue, and automate actions based on user behavior."

- Know which channels and campaigns actually drive signups and revenue, not just clicks
- Build and optimize conversion funnels from first touch through activation and monetization
- Attribute revenue back to marketing spend and understand true ROAS
- Automate engagement based on user behavior: onboarding nudges, re-engagement, lifecycle campaigns
- Get conversion and behavior data into ad platforms, CRMs, and marketing tools without building custom pipelines
- Run experiments on landing pages, pricing, onboarding flows, and activation sequences
- Collect on-site feedback (exit intent, NPS, CSAT) and tie it directly to user behavior
- Let non-technical marketing users ask questions about their data without waiting for an analyst

> **Guidance:** This is probably the most underserved use case in our current motion. We have the products — [Web Analytics](/docs/web-analytics/getting-started), [Marketing Analytics](/docs/web-analytics/marketing-analytics), [Workflows](/docs/workflows/start-here), [Product Tours](/docs/product-tours/start-here), [Pipelines](/docs/cdp), [Revenue Analytics](/docs/revenue-analytics/start-here), [Surveys](/docs/surveys/creating-surveys) — but we rarely lead with this story. Marketing teams are spending $10k+/month on Segment, Mixpanel, GA4, and various CDPs to do what PostHog can do in one place. Don't sell individual products here. Sell the consolidation of their marketing data stack.

## What PostHog products are relevant?

- **[Web Analytics](/docs/web-analytics/getting-started) (core)** — Traffic, referrers, [UTM tracking](/docs/data/utm-segmentation), page performance, bounce rates. The replacement for GA4 that doesn't require a PhD to configure. First-party data collection that actually works with ad blockers. ([Dashboard overview](/docs/web-analytics/dashboard))
- **[Marketing Analytics](/docs/web-analytics/marketing-analytics)** *beta* — Ad campaign attribution, channel performance, ROAS tracking. Connect ad spend to actual product signups and revenue events. Multi-touch attribution across channels.
- **[Product Analytics](/docs/product-analytics/funnels)** — Conversion [funnels](/docs/product-analytics/funnels), [retention](/docs/product-analytics/retention) curves, [cohort](/docs/data/cohorts) analysis, activation metrics. The layer that connects "they visited the site" to "they became a paying customer." [Lifecycle](/docs/product-analytics/lifecycle) analysis to understand where users are in the journey.
- **[Workflows](/docs/workflows/start-here)** — Automated engagement sequences triggered by user behavior. Lifecycle emails, re-engagement campaigns, onboarding drips, churn prevention. Act on what analytics reveals instead of just reporting on it. ([Email drip campaign guide](/docs/workflows/email-drip-campaign) · [Configure channels](/docs/workflows/configure-channels))
- **[Product Tours](/docs/product-tours/start-here)** *alpha* — In-app guided onboarding, activation nudges, feature adoption prompts, conversion nudges. The in-product complement to Workflows' out-of-product engagement. ([Creating tours](/docs/product-tours/creating-product-tours))
- **[Data Pipelines](/docs/cdp)** — Push conversion events and user data to ad platforms (Google, Meta, LinkedIn), CRMs (HubSpot, Salesforce), and data warehouses. Close the loop on campaign optimization by feeding real conversion data back to where it's used. ([Realtime destinations](/docs/cdp/destinations) · [Batch exports](/docs/cdp/batch-exports))
- **[Revenue Analytics](/docs/revenue-analytics/start-here)** — Track revenue by cohort, plan, feature, and channel. Understand LTV, [MRR](/docs/revenue-analytics/dashboard#mrr-and-arr), expansion revenue, and churn at a user and account level. ([Dashboard](/docs/revenue-analytics/dashboard))
- **[Surveys](/docs/surveys/creating-surveys)** — On-site feedback, exit-intent surveys, NPS, CSAT, post-purchase surveys. Capture qualitative signal at key moments in the funnel and tie responses to user behavior data.
- **[Experiments](/docs/experiments)** — A/B test landing pages, pricing pages, onboarding flows, checkout experiences, and activation sequences against real conversion and revenue metrics. This is a key stickiness driver: once a growth team is running experiments, they need engineering to implement the variants, which pulls engineering into PostHog and creates a cross-team dependency.
- **[Feature Flags](/docs/feature-flags/start-here)** — The implementation layer for experiments. Growth/CRO defines the test; engineering implements it via feature flags. Also used for targeted rollouts to specific user segments, geo-targeting, and progressive delivery of growth initiatives. Feature Flags are the bridge product that connects the growth team's use case to the engineering team's workflow, and opens the door to the [Release Engineering](/handbook/growth/use-case-selling/release-engineering) use case.
- **[PostHog AI](/docs/posthog-ai/allow-access)** — Natural language querying for non-technical marketing users. "Which campaign drove the most signups last month?" without needing HogQL or analyst support. ([Example prompts](/docs/posthog-ai/example-prompts))

## Adoption path and expansion path

### Entry point

Usually **Web Analytics**, **Product Analytics**, or **Experiments**. Three common patterns:

1. **Marketing-first:** Marketing team wants to replace GA4 or understand channel attribution. They start with Web Analytics for traffic and referrer data, then quickly want to connect that to downstream conversion events (Product Analytics) and campaign spend (Marketing Analytics).
2. **Growth-first:** A growth engineer or product-led growth team is already using PostHog for product analytics — building funnels, tracking activation, measuring retention. They want to connect the top of funnel (how users found us) to the bottom (did they convert and retain). Web Analytics and Marketing Analytics extend their existing setup upstream.
3. **CRO / Experimentation-first:** A Growth PM or CRO specialist wants to run A/B tests on signup flows, pricing pages, or onboarding sequences. They come in through Experiments, which requires Feature Flags, and Feature Flags require engineering to implement. This is a natural multithreading play: the growth team defines the experiment, engineering implements the flag, and now both teams are in PostHog.

### Primary expansion path

**Web Analytics → Marketing Analytics → Product Analytics (funnels/retention) → Experiments + Feature Flags → Data Pipelines (to CRM/ad platforms) → Workflows / Product Tours → Revenue Analytics → Surveys**

**The logic of each step:**

- Web Analytics → Marketing Analytics: They can see traffic and referrers but want to connect that to actual ad spend and ROAS.
- Marketing Analytics → Product Analytics: They know which channels bring users, now they need to know which channels bring users *who convert and retain*.
- Product Analytics → Experiments + Feature Flags: They've identified drop-off points and want to test fixes. Experiments require Feature Flags, which require engineering to implement. **This is the key multithreading moment:** the growth team defines the hypothesis, engineering implements the flag, and both are now active in PostHog.
- Experiments → Data Pipelines: They've validated what works, now they need to feed real conversion events back to ad platforms and push user data to their CRM.
- Pipelines → Workflows / Product Tours: They've been reporting on drop-offs and now want to actually *do something* about them. Automated re-engagement when a user goes cold. In-app nudges to complete onboarding.
- Workflows → Revenue Analytics: Engagement is automated, now they want to measure the revenue impact. LTV by channel, revenue attribution to specific campaigns and workflows.
- Revenue Analytics → Surveys: They're measuring revenue impact and want to add a qualitative layer. "Why did you cancel?" exit surveys. Post-purchase NPS.

### Alternate expansion paths

**Starting from Product Analytics (growth engineering):** A growth team already deep in PostHog funnels and experiments. They expand upstream into Web Analytics and Marketing Analytics for channel attribution, and downstream into Workflows and Product Tours for activation automation.

**Starting from Surveys:** A product or CX team is running NPS or CSAT surveys. They want to connect low scores to actual behavior (what happened right before someone gave a 3/10?), which pulls in Product Analytics and Session Replay. The growth team then sees the survey infrastructure and wants to use it for exit-intent and post-signup feedback.

**Starting from Experiments (CRO / Growth PM entry — the engineering bridge):** A CRO specialist or Growth PM wants to A/B test their signup flow. They come in through Experiments, which creates a Feature Flag under the hood. The flag needs to be implemented in code, so engineering gets pulled into PostHog. This is high-value for three reasons: (1) **it makes the account sticky** — once feature flags are in the codebase, they're not easy to rip out; (2) **it creates a multithreading opportunity** — you now have both the growth team and engineering as active users; and (3) **it's a bridge to Release Engineering** — once engineering is using flags for experiments, they often realize they can use the same infrastructure for progressive rollouts and kill switches.

## Business impact of solving the problem

**The buyer is different from other use cases.** Growth and Marketing targets growth engineers, marketing leads, demand gen managers, CRO specialists, and GTM engineers. In most organizations, these are separate from the product analytics buyer (PM) and the engineering buyer (EM/platform). They often have their own budget and their own stack. Winning this buyer opens a parallel revenue stream within the same account.

**Marketing stack consolidation is a real, quantifiable cost savings.** Companies routinely spend $10k+/month across GA4, Segment, Mixpanel, Amplitude, CDPs, and various point solutions. The consolidation argument is concrete: fewer vendor contracts, fewer integrations to maintain, one source of truth for conversion data.

**This use case gives newer products a reason to exist.** Workflows, Product Tours, Marketing Analytics, and Revenue Analytics are all relatively new PostHog products with lower attach rates. Without a use case frame, they're standalone features looking for a buyer. Within Growth and Marketing, each one has a clear role and a natural "next step" in the conversation.

**Growth and Marketing creates demand for other use cases.** Once a marketing team is in PostHog and sees the depth of product analytics, they pull in the product team (Product Intelligence). Once the growth team is running experiments, engineering gets involved (Release Engineering). This use case is a wedge into broader platform adoption.

**Experiments and Feature Flags are the stickiness and multithreading lever.** When a CRO or Growth PM starts running A/B tests, feature flags get embedded in the codebase. That's a fundamentally different level of integration than a marketing team viewing dashboards. Flags are in production code, maintained by engineers, and not easy to remove. More importantly, it gives TAMs a natural path to multithread: you now have a growth/marketing champion *and* an engineering champion using the same platform.

## Personas to target

| Persona | Role Examples | What They Care About | How They Evaluate |
|---|---|---|---|
| Growth Engineer | Growth Eng, PLG Engineer, GTM Engineer | Conversion funnels, activation metrics, experiment velocity, pipeline reliability | "Can I build a full-funnel view from ad click to paid conversion in one tool?" |
| Marketing Lead | Head of Marketing, VP Demand Gen, Marketing Ops | Channel attribution, ROAS, campaign performance, cost per acquisition | "Can I see which campaigns actually drive revenue, not just clicks?" |
| CRO / Growth PM | Growth PM, CRO Specialist, Head of Growth | Conversion rate optimization, experiment velocity, activation rates. Needs engineering to implement experiments, making this persona the key multithreading catalyst. | "Can I run experiments on our signup flow and measure revenue impact? How fast can engineering implement a test?" |
| Founding Growth | Founder, first growth hire at early-stage startup | All of the above. Wearing all hats. Speed, simplicity, not paying for 5 tools | "How fast can I set this up and how many tools does it replace?" |
| Marketing Analyst | Marketing Analyst, Data Analyst (Marketing) | Data accuracy, attribution modeling, cohort analysis, reporting | "Can I trust this data? Can I build reports without engineering help?" |

## Signals in Vitally & PostHog

### Vitally indicators this use case is relevant

| Signal | Where to Find It | What It Means |
|---|---|---|
| Web Analytics is active but no other products adopted | Product usage data | They came in through the marketing door — there's a full expansion path waiting |
| Customer mentions GA4, Segment, or CDP in notes | Vitally notes / conversations | They have marketing stack pain and may be open to consolidation |
| Multiple marketing/growth team members invited | User list in Vitally | The growth team is in PostHog, not just engineering — this use case is live |
| Low Pipelines / Workflows usage despite high analytics usage | Product spend breakdown | They're analyzing but not acting — Workflows and Pipelines are natural next steps |
| Experiments or Feature Flags usage initiated by growth/marketing team (not engineering) | Product usage data + user roles | The CRO/Growth PM persona is active — this is the engineering bridge moment |

### PostHog usage signals

| Signal | How to Check | What It Means |
|---|---|---|
| UTM parameters appearing in event properties | Event property explorer | They're tracking acquisition sources — Marketing Analytics is a natural add |
| Funnels built around signup/checkout/activation | Saved insights | Growth team is active and measuring conversion — ripe for Experiments and Workflows |
| Experiments created but low flag evaluation volume | Experiments list + flag usage | Growth team is trying to experiment but engineering hasn't implemented the flags yet — TAM opportunity to facilitate the handoff |
| Feature flags being used primarily for experiments (not releases) | Flag list + experiment linkage | Growth-driven flag usage — explore whether they'd also use flags for progressive rollouts (Release Engineering cross-sell) |
| Web Analytics pageview volume growing | Product usage metrics | Marketing is driving more traffic — they'll want attribution and ROAS soon |
| Batch exports configured to ad platforms or CRM | Pipeline configuration | They're already trying to close the data loop — deeper Pipelines usage is the play |

### Health score implications

- **Event volume:** Growing web analytics and pageview volume means marketing is scaling. Flat or declining volume may mean they've stalled or are sending traffic data elsewhere.
- **User engagement:** Watch for non-engineering users actively building dashboards and insights. If only engineers use PostHog, the marketing team hasn't been onboarded — that's both a risk and an opportunity.
- **Product count:** Growth and Marketing touches the most products of any use case. Low product count with this persona is a sign there's major expansion headroom. If they're using analytics but not Experiments + Feature Flags, that's the next natural move.

## Command of the Message

### Discovery questions (current state)

- How do you track which channels and campaigns drive signups today? Can you tie that all the way through to revenue?
- What does your current marketing/growth tool stack look like? (GA4? Segment? CDP? How many vendors?)
- When you run a paid campaign, how do you measure whether it actually worked? How long does it take to get that answer?
- Do you send conversion events back to your ad platforms? How is that pipeline built and maintained?
- How do you currently onboard new users? Is it automated or manual? What triggers the onboarding flow?
- When someone drops off your signup or checkout funnel, can you see why? Do you have any automated re-engagement?
- How does your growth team decide what to experiment on? How do you measure experiment results?
- Are you running A/B tests on your signup flow, pricing page, or onboarding today? What tool are you using? Who implements the variants, the growth team or engineering?
- When an experiment wins, how do you roll it out to 100% of users? Is that process smooth or does it require a separate deploy?
- Can your marketing team answer their own questions about performance, or do they depend on engineering/data for every query?
- How do you attribute revenue to specific campaigns, channels, or touchpoints?
- What's your biggest frustration with your current analytics or attribution setup?

### Negative consequences (of not solving this)

- Marketing spend is optimized against proxy metrics (clicks, impressions) instead of actual conversions and revenue
- Attribution is broken or incomplete — nobody trusts the numbers, so decisions are gut-driven
- Conversion data doesn't flow back to ad platforms, so campaign optimization is flying blind
- Growth team builds custom ETL pipelines to move data between tools — fragile, expensive to maintain
- Onboarding and re-engagement are manual or time-based instead of behavior-driven
- Marketing and product teams use different tools with different numbers, leading to misalignment
- Growth team can't run experiments because they depend on engineering for every test, or they use a separate tool that isn't connected to their analytics
- New users drop off and nobody acts on it because there's no automation layer

### Desired state

- One platform that tracks the full journey from ad click to paid conversion to revenue
- Marketing team can self-serve answers about channel performance, ROAS, and conversion without waiting for analysts
- Conversion events automatically flow to ad platforms and CRMs — no custom pipelines to maintain
- Onboarding, re-engagement, and lifecycle campaigns fire automatically based on real user behavior
- In-app nudges guide users through activation at exactly the right moment
- Every experiment is measured against real business metrics, and the same feature flags used for experiments can be reused for progressive rollouts
- Growth and engineering collaborate through a shared platform: growth defines the hypothesis, engineering implements the flag, both see the results
- Revenue is attributable to specific channels, campaigns, and user cohorts

### Positive outcomes

- 20-40% reduction in marketing tool spend through consolidation (GA4 + Segment + CDP + point solutions → PostHog)
- Higher ROAS from feeding real conversion data back to ad platforms
- Faster experiment velocity — growth team runs more tests because the tooling is integrated
- Experiments + Feature Flags create a shared workflow between growth and engineering, reducing silos and making the account harder to churn
- Increased activation and retention from behavior-driven onboarding (Workflows + Product Tours)
- Marketing and product aligned on the same data, same source of truth
- Non-technical marketing users can query data in natural language via PostHog AI

### Success metrics

**Customer-facing:**

- Conversion rate from visitor → signup → activation → paid improves measurably
- ROAS on paid channels increases after feeding real conversion events back to ad platforms
- Time-to-first-value for new users decreases (measured via activation funnel)
- Marketing stack vendor count decreases (consolidation)
- Growth team experiment velocity increases (more experiments shipped per quarter)

**TAM-facing:**

- Customer expands from Web Analytics-only (or Product Analytics-only) to multi-product
- Non-engineering users (marketing, growth) are active in PostHog
- Engineering users are active alongside growth users (multithreaded account)
- Feature Flags are embedded in the codebase (stickiness indicator)
- Experiments velocity increases (more experiments created per quarter)
- Pipeline volume grows (more data flowing out to ad platforms and CRMs)
- Workflow and Product Tour usage grows (automation is active, not just analytics)

## Competitive positioning

### Our positioning

- **Full-funnel in one platform.** No other tool connects [web traffic](/docs/web-analytics/getting-started) → [channel attribution](/docs/web-analytics/marketing-analytics) → [conversion funnels](/docs/product-analytics/funnels) → user behavior → [revenue](/docs/revenue-analytics/start-here) → [automated engagement](/docs/workflows/start-here) in a single product. GA4 stops at the website. Segment stops at the pipe. Amplitude stops at the dashboard. PostHog goes from first click to lifetime revenue *and* lets you act on it.
- **First-party data collection that works.** PostHog's first-party tracking isn't blocked by ad blockers the way GA4 and third-party pixels are. More accurate data, better attribution, higher match rates when syncing conversions to ad platforms.
- **Analytics + automation in the same tool.** Most analytics platforms show you the drop-off. PostHog lets you fix it with [Workflows](/docs/workflows/start-here) (re-engage users) and [Product Tours](/docs/product-tours/start-here) (guide users in-app). The insight-to-action loop is closed.
- **Marketing stack consolidation = real cost savings.** Replace GA4 + Segment + CDP + survey tool + experimentation tool with one platform.
- **[PostHog AI](/docs/posthog-ai/allow-access) lowers the adoption bar for non-technical users.** Marketing users who will never learn SQL or HogQL can ask questions in natural language.

### Competitor quick reference

| Competitor | What They Do | Our Advantage | Their Advantage |
|---|---|---|---|
| GA4 | Web analytics, basic attribution, Google Ads integration | Full-funnel beyond the website; first-party data; product analytics depth | Deepest Google Ads integration; free tier is very generous; universal adoption |
| Segment | CDP — collects events and routes them to destinations | We're the analytics platform *and* the pipe; no need for a separate CDP layer | More destination integrations; more mature data governance |
| Amplitude | Product analytics with some marketing analytics features | Broader product coverage (flags, replay, surveys, workflows); better pricing | More mature marketing-specific features (audiences, campaign impact) |
| Mixpanel | Product analytics focused on funnels and retention | Broader platform (web analytics, flags, replay, workflows); no sampling | Deeper mobile analytics; some marketing teams prefer the UX |
| HubSpot Marketing Hub | Marketing automation, email, CRM, basic analytics | Engineering-grade analytics; deeper funnel analysis; experiments | Native CRM integration; better email deliverability; non-technical UX |
| Heap | Auto-capture product analytics | We also auto-capture, plus flags, experiments, replay, surveys, workflows | Retroactive analytics (virtual events) is a strong pitch for non-technical teams |

**Honest assessment:** Our strongest position is against teams using 3+ tools to do what PostHog does in one. The consolidation pitch is genuine. We're weaker against teams deeply embedded in the Google ecosystem (GA4 + Google Ads + Looker) where switching cost is high. We're also weaker against HubSpot where marketing automation is the primary need. Our sweet spot is technical growth teams and PLG companies where the growth engineer is the buyer.

## Pain points & known limitations

| Pain Point | Impact | Workaround / Solution |
|---|---|---|
| Marketing Analytics is beta — feature set is still maturing | Some customers may expect parity with GA4 or dedicated attribution tools | Set expectations during onboarding. Position as "growing fast" and highlight the advantage of attribution data living alongside product analytics. |
| Workflows is new — not as feature-rich as mature marketing automation | Teams expecting advanced email sequencing, lead scoring, or complex branching may find gaps | Position as behavior-driven automation, not a full HubSpot replacement. For heavy email automation, PostHog complements an existing tool via [Data Pipelines](/docs/cdp/destinations). |
| Product Tours is alpha — limited customization | Teams with complex onboarding needs may hit walls | Position as the integrated option. For advanced tooltip/modal UX, keep a dedicated tool and use PostHog for analytics + experimentation. |
| Pipeline destination coverage may not match Segment's breadth | Some niche destinations may not be supported | Check [available destinations](/docs/cdp/destinations) before promising. Data Warehouse + [Batch Exports](/docs/cdp/batch-exports) covers the most common needs. [Webhook destination](/docs/cdp/destinations/webhook) can bridge gaps. |
| Non-technical marketing users may find the UI intimidating | Adoption risk: marketing team tries PostHog, finds it too "engineering-y," and reverts to GA4 | Lead with [PostHog AI](/docs/posthog-ai/allow-access) for querying. Build pre-configured dashboards during onboarding. [Web Analytics](/docs/web-analytics/dashboard) UI is intentionally simpler — start them there. |

**Exceptions / edge cases:**

- **Enterprise demand gen teams with complex lead scoring and email nurture:** If the primary need is marketing automation, PostHog is not the right primary tool. Recommend keeping HubSpot/Marketo and using PostHog for analytics, attribution, and experimentation. [Data Pipelines](/docs/cdp/destinations) bridges the two.
- **Teams deeply embedded in the Google ecosystem:** If they run Google Ads, use GA4, and report in Looker, switching cost is very high. Position PostHog as a complement for [product analytics](/docs/product-analytics/funnels) and conversion funnel depth, not a full GA4 replacement. Over time, as Marketing Analytics matures, the replacement conversation becomes easier.

## Getting a customer started

### What does an evaluation look like?

- **Scope:** Instrument their primary acquisition funnel: landing page → signup → activation event → first conversion/payment. Add [UTM tracking](/docs/data/utm-segmentation) and connect [web analytics](/docs/web-analytics/getting-started). If they have paid campaigns, set up [Marketing Analytics](/docs/web-analytics/marketing-analytics).
- **Timeline:** 2 to 4 weeks to see meaningful data. Channel attribution and funnel insights start showing value within the first week if traffic is decent. [Experiments](/docs/experiments) need enough traffic for statistical significance, so timeline varies.
- **Success criteria:** Can you answer: "Which channel drives the most *activated* users (not just signups)?" Can you see the full [funnel](/docs/product-analytics/funnels) from first visit to conversion? Can you tell which campaigns are worth the spend?
- **PostHog investment:** Web Analytics and Product Analytics free tiers cover a substantial evaluation. Marketing Analytics (beta) is included. Surveys and Experiments have generous free tiers.
- **Key requirement:** They need to instrument key conversion events (signup, activation, purchase/upgrade) with proper [UTM parameters](/docs/data/utm-segmentation). If they want Pipelines, they need API credentials for their ad platforms or CRM. See the [performance marketing tutorial](/tutorials/performance-marketing) for a step-by-step walkthrough.

### Onboarding checklist

- [ ] Install PostHog snippet on marketing site and product ([web analytics installation](/docs/web-analytics/getting-started) + autocapture)
- [ ] Verify [UTM parameters](/docs/data/utm-segmentation) are being captured on key landing pages
- [ ] Define and instrument core conversion events: signup, activation, first purchase/upgrade
- [ ] Build the primary [conversion funnel](/docs/product-analytics/funnels) in Product Analytics
- [ ] Set up [Web Analytics dashboard](/docs/web-analytics/dashboard) with traffic, referrers, and top pages
- [ ] Connect [Marketing Analytics](/docs/web-analytics/marketing-analytics) to ad platforms (if running paid campaigns)
- [ ] Configure at least one [Data Pipeline destination](/docs/cdp/destinations) (CRM or ad platform conversion sync)
- [ ] Build a pre-configured "Growth Dashboard" for the marketing team
- [ ] Introduce [PostHog AI](/docs/posthog-ai/allow-access) to non-technical marketing users ([example prompts](/docs/posthog-ai/example-prompts))
- [ ] Set up one [Workflow](/docs/workflows/start-here) or [Product Tour](/docs/product-tours/start-here) for a key drop-off point

## Objection handling

| Objection | Response |
|---|---|
| "We already use GA4 and it's free." | GA4 is great for basic web traffic. But can it show you which channels drive users who *activate and pay*, not just visit? Can it send real conversion events back to your ad platforms? PostHog starts free too, and it goes all the way to revenue. ([Web Analytics](/docs/web-analytics/getting-started) · [Funnels](/docs/product-analytics/funnels)) |
| "We need Segment for our data pipelines." | What destinations are you sending to? PostHog has built-in [Data Pipelines](/docs/cdp) for the most common ones. You may not need a separate CDP layer if PostHog is already collecting the events. Let's look at your current [destinations](/docs/cdp/destinations) and see what's covered. |
| "Our marketing team isn't technical enough for PostHog." | That's exactly why we built [PostHog AI](/docs/posthog-ai/allow-access) — your marketing team can ask questions in plain English. [Web Analytics](/docs/web-analytics/dashboard) is also designed to be simple and familiar. We'll set up dashboards during onboarding so they have value from day one. |
| "Marketing Analytics is beta — can we trust it?" | Fair concern. The core data infrastructure is built on the same battle-tested PostHog platform that handles billions of events. The beta label means we're still adding features, not that the data is unreliable. And your feedback directly shapes the roadmap. |
| "We'd need to rip out our whole marketing stack to use PostHog." | You don't have to rip out anything on day one. Start by adding PostHog alongside your existing tools. Once you see the value of having attribution, funnels, and automation in one place, the consolidation happens naturally. [Data Pipelines](/docs/cdp/destinations) keeps your existing tools fed. |
| "Workflows seems basic compared to HubSpot/Braze." | It is newer. The trade-off is that PostHog [Workflows](/docs/workflows/start-here) is triggered by real product behavior data, not just email opens and form fills. If you need complex email nurture sequences, keep your email tool and use PostHog for behavior-driven automation. They complement each other via [Data Pipelines](/docs/cdp/destinations). |
| "Our growth team wants to experiment but engineering is too busy to implement flags." | That's actually a common starting point. The first experiment is the hardest because engineering needs to set up the [Feature Flag SDK](/docs/feature-flags/start-here). But once the SDK is in place, subsequent experiments are much faster. Most teams find that after the first 2 to 3 experiments, the loop is smooth. And engineering now has flag infrastructure they can use for their own releases too. |

## Cross-sell pathways from this use case

| If Using... | They Might Need... | Why | Conversation Starter |
|---|---|---|---|
| Web Analytics + Marketing Analytics | Product Analytics (funnels, retention) | They can see traffic and channels but need to connect it to actual user behavior and conversion | "You know which channels bring traffic — but do you know which channels bring users who *retain*?" |
| Product Analytics (funnels) | Experiments + Feature Flags | They've identified drop-off points and want to test fixes | "You've found the drop-off. Want to test whether a new flow actually improves conversion?" |
| Product Analytics + Experiments | Workflows + Product Tours | They know what works from experiments and want to operationalize it | "You proved the new onboarding works in an experiment. Now let's roll it out as a Product Tour for everyone." |
| Experiments + Feature Flags (growth-driven) | Release Engineering (for the eng team) | Engineering is already implementing flags for experiments — they can use those same flags for progressive rollouts | "Your engineering team is already using feature flags for growth experiments. Have they considered using the same infrastructure for all their releases?" |
| Web Analytics + Product Analytics | Data Pipelines | They're analyzing conversion but not feeding it back to ad platforms or CRM | "You're measuring real conversions — are you sending those back to Meta and Google so their algorithms can optimize?" |
| Funnels + Workflows | Revenue Analytics | They're driving and automating conversion but need to measure the revenue impact | "You've automated re-engagement. Now let's see which cohorts and channels drive the most LTV." |
| Any Growth & Marketing products | Session Replay | They see a funnel drop-off but don't know *why* | "Your checkout funnel drops 40% at step 3. Want to watch what users are actually doing at that step?" |
| Growth & Marketing stack established | Product Intelligence (for the product team) | Marketing/growth is in PostHog — the product team should be too | "Your growth team already uses PostHog for funnels and experiments. Has the product team seen what they can do with cohorts and retention analysis?" |

## Internal resources

- **Web Analytics docs:** [Getting started](/docs/web-analytics/getting-started) · [Dashboard](/docs/web-analytics/dashboard)
- **Marketing Analytics docs:** [Marketing Analytics](/docs/web-analytics/marketing-analytics)
- **Product Analytics docs:** [Funnels](/docs/product-analytics/funnels) · [Retention](/docs/product-analytics/retention) · [Lifecycle](/docs/product-analytics/lifecycle) · [Cohorts](/docs/data/cohorts)
- **Workflows docs:** [Getting started](/docs/workflows/start-here) · [Email drip campaigns](/docs/workflows/email-drip-campaign) · [Configure channels](/docs/workflows/configure-channels)
- **Product Tours docs:** [Getting started](/docs/product-tours/start-here) · [Creating tours](/docs/product-tours/creating-product-tours)
- **Data Pipelines docs:** [CDP overview](/docs/cdp) · [Realtime destinations](/docs/cdp/destinations) · [Batch exports](/docs/cdp/batch-exports) · [HubSpot destination](/docs/cdp/destinations/hubspot)
- **Revenue Analytics docs:** [Getting started](/docs/revenue-analytics/start-here) · [Dashboard (MRR/ARR)](/docs/revenue-analytics/dashboard#mrr-and-arr)
- **Surveys docs:** [Creating surveys](/docs/surveys/creating-surveys)
- **Experiments docs:** [Experiments](/docs/experiments) · [Exposures](/docs/experiments/exposures)
- **Feature Flags docs:** [Getting started](/docs/feature-flags/start-here)
- **PostHog AI docs:** [Enable PostHog AI](/docs/posthog-ai/allow-access) · [Example prompts](/docs/posthog-ai/example-prompts)
- **UTM tracking:** [UTM segmentation](/docs/data/utm-segmentation)
- **Tutorial:** [How to track performance marketing](/tutorials/performance-marketing)
- **Competitive battlecard:** *To be added: GA4 / Segment / CDP competitive positioning*
- **Product team:** *To be added: Slack channels for Web Analytics, Marketing Analytics, Workflows, Product Tours, Pipelines, Revenue Analytics teams*

## Appendix: Company archetype considerations

| Archetype + Stage | Framing | Key Products | Buyer |
|---|---|---|---|
| AI Native — Early | "You need to get users to your AI product, get them activated, and understand what channels work, all without hiring a data team." Speed matters. Experiments are high-value early. | Web Analytics, Product Analytics (funnels), Experiments, Feature Flags, PostHog AI | Founder, first growth hire, GTM engineer |
| AI Native — Scaled | "You're scaling acquisition and need to optimize spend, automate onboarding, and connect marketing data to product engagement." | Web Analytics, Marketing Analytics, Product Analytics, Experiments, Feature Flags, Pipelines, Workflows, Revenue Analytics | Head of Growth, Growth Engineering Lead |
| Cloud Native — Early | "You're investing in growth for the first time and want to build it right. One tool for attribution, funnels, experiments, and engagement." | Web Analytics, Product Analytics, Experiments, Feature Flags, Surveys | Founder, first PM, growth engineer |
| Cloud Native — Scaled | "Your marketing stack is fragmented and expensive. Consolidate attribution, conversion analytics, engagement automation, and experimentation into one platform." Experiments + Feature Flags are the multithreading lever. | Web Analytics, Marketing Analytics, Product Analytics, Experiments, Feature Flags, Pipelines, Workflows, Product Tours, Revenue Analytics | VP Growth, Head of Growth, CRO, Marketing Ops |
| Cloud Native — Enterprise | "Multiple teams, multiple products, multiple markets, and none of them agree on the numbers. PostHog gives you a single source of truth for acquisition, conversion, and revenue across all properties." | Full stack. Pipelines and Revenue Analytics are especially important. | VP Marketing, CMO, Head of Growth, Marketing Ops |
