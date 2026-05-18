---
title: Playbook for growing accounts
sidebar: Handbook
showTitle: false
---
 
# Use-case expansion playbook
 
The best PostHog accounts don't look like one team using Product Analytics. They look like an entire engineering organization running releases through Feature Flags, a product team measuring impact with Experiments and Session Replay, a growth team optimizing funnels with Web Analytics and Surveys, an AI team monitoring model performance with LLM Observability, and a data team piping everything into their warehouse with CDP. Multiple teams, multiple products, multiple use cases, all on one platform.
 
In larger orgs there are more specialized roles and teams, and you may have multiple different teams with the same exact use cases, or more variety across the entire org. In smaller teams, you have hybrid roles and many-hat-wearers, so you'll see a single team or person with multiple use cases.
 
Either way, the goal is for PostHog to be the platform of choice for as many of those use cases as possible, with buy-in from founders, executives, and senior leadership.
 
That's the gold standard. In reality, it's not a single motion or playbook but rather a cycle that you repeat as needed until full saturation is achieved.
 
## Start with what brought them here
 
Every PostHog account starts because someone had a problem (or they love hedgehogs, or someone told them analytics were a must). Maybe a product engineer needed to understand why users dropped off after signup. Maybe an SRE needed error tracking that didn't cost six figures. Maybe a growth engineer wanted to run experiments without standing up a separate tool. Whatever it was, there's a use case that pulled them in. That's the Trojan Hedgehog.
 
Your first job is to figure out what that use case is. Not what products they're paying for (that's a billing question), but what problem they're trying to solve (that's a relationship question). Start by seeing who the users are by their role/title and then how they're specifically using PostHog. The fastest path is generally just talking to the customer directly.
 
The [use-case selling framework](/handbook/growth/use-case-selling) gives you the language for all of this. There are seven use cases documented:
 
- [Product Intelligence](/handbook/growth/use-case-selling/product-intelligence)
- [Release Engineering](/handbook/growth/use-case-selling/release-engineering)
- [Observability](/handbook/growth/use-case-selling/observability)
- [Growth and Marketing](/handbook/growth/use-case-selling/growth-and-marketing)
- [AI/LLM Observability](/handbook/growth/use-case-selling/ai-llm-observability)
- [Data Infrastructure](/handbook/growth/use-case-selling/data-infrastructure)
- [Customer Experience](/handbook/growth/use-case-selling/customer-experience)
Each maps to a core buyer persona and a set of PostHog products. Each has discovery questions, expansion paths, and competitive positioning.
 
Look at how they're actually using PostHog. A customer who only uses Product Analytics and Session Replay is living in the Product Intelligence use case. A customer who's heavy on Feature Flags and Error Tracking is living in Release Engineering. A customer sending all their data to Snowflake via Batch Exports is living in Data Infrastructure.
 
Once you know the use case, you know who the buyer probably is, what they care about, what their unmet needs look like, and where the expansion paths lead. You also know what *not* to pitch. Trying to sell LLM Observability to a product manager who came to PostHog for funnels is a waste of everyone's time. Showing that same PM how [Surveys](/docs/surveys) can answer the "why" behind their funnel drop-offs is solving their actual problem.
 
## Fix the foundation first
 
A lot of customers are using PostHog wrong. And that's not a them problem, generally speaking.
 
They self-served the implementation and then nobody reviewed it. They're calling `identify()` on every page load and inflating their event volume. They have autocapture turned on but haven't defined a single action, so they're paying for events they never look at. They enabled [Session Replay](/docs/session-replay) with default settings and are recording every bot visit and sub-second bounce. They're paying for [Group Analytics](/docs/product-analytics/group-analytics) but never implemented it. They have no reverse proxy, so ad blockers eat 15-30% of their data.
 
If you try to cross-sell a customer whose implementation is broken, two things happen. First, they don't trust their data, so they don't trust your recommendations. Second, their bill is higher than it should be, which makes every pricing conversation harder.
 
Fix the foundation first. Run an implementation health check. Look for the common problems: unnecessary event volume from misconfigured autocapture, inflated identify/group calls, replay capturing everything, missing reverse proxy, no feature flag fallbacks. Then help them fix it.
 
This feels counterintuitive. You're a TAM with a [growth quota](/handbook/growth/sales/how-we-work#how-commission-works---technical-account-managers), and your first move is to reduce the customer's bill. But this is the single most trust-building thing you can do. When you tell a customer "you're paying $800/month for events you don't need, here's how to fix that," they stop seeing you as a vendor trying to expand their contract and start seeing you as someone who's actually on their side.
 
We track these "anti-revenue" optimizations internally because we believe they lead to long-term expansion. A customer whose implementation is clean, whose data they trust, and whose bill matches their actual usage is a customer who will say yes when you suggest they try Experiments next quarter.
 
## Nail the first use case
 
Once the implementation is clean, go hard on their primary use case. That first use case, the problem they came to PostHog for originally, needs to be solidified before you eagerly push a new one. You can always cross-sell in parallel to other teams, but in most cases, it is a better investment to help them absolutely nail the first thing first.
 
If they came for Product Intelligence, don't immediately pitch Error Tracking. Instead, help them build the dashboards that answer their most important product questions. Help them set up their first [experiment](/docs/experiments). Show them how to filter Session Replay by funnel drop-off so they can see *why* users leave, not just *where*. Get their PMs self-serving with [PostHog AI](/docs/max-ai). Make PostHog the place where their product decisions get made, not just where data passes through.
 
If they came for Release Engineering, help them build a proper [feature flag](/docs/feature-flags) workflow. Help them implement gradual rollouts, percentage-based releases, and proper fallback code. Show them how Error Tracking connects to specific flag variants so they can catch regressions instantly. Make PostHog the tool their engineers reach for every time they ship.
 
The point is to make PostHog indispensable for the thing they already care about. A customer who uses PostHog for one use case casually is at-risk. A customer who can't ship a release without Feature Flags, can't make a product decision without their PostHog dashboards, and can't debug an issue without Session Replay is not going anywhere.
 
This takes time. It takes multiple conversations, check-ins, [training sessions](/handbook/growth/sales/customer-training), and sometimes getting on calls with their engineers to work through implementation details. It's not a one-and-done demo. It's a process of embedding PostHog into their workflows until it becomes infrastructure.
 
## Go deeper, then go broader
 
Once a customer is locked in on their primary use case, two expansion motions open up. These map directly to the [expansion strategies](/handbook/growth/sales/expansion-strategies): going deeper is Strategy 1 (go deeper on the existing team), and going broader is Strategy 3 (expand into new teams).
 
### Going deeper
 
Going deeper means continuing to expand within the same use case. It's bringing in more teams and users to adopt the same use case and layering in other products and features to supplement and enhance it.
 
The use-case playbooks each define a primary expansion path. For [Product Intelligence](/handbook/growth/use-case-selling/product-intelligence), it's Product Analytics → Session Replay → Surveys → Experiments → Revenue Analytics → Workflows. It's not always going to be in that order, but this is generally a trend that we see and makes sense intuitively. Each step solves a natural next problem: "I can see the drop-off" becomes "I can see why users drop off" becomes "I can ask them directly" becomes "I can test a fix" becomes "I can prove it moved revenue" becomes "I can automate the solution."
 
Going deeper adds products, but more importantly, each additional product within a use case makes the customer stickier. Replacing one analytics tool is easy. Replacing an analytics + replay + surveys + experiments + workflows stack that's all integrated is a migration nobody wants to do.
 
### Going broader
 
Going broader means expanding to a new use case with a different team. This is where the real organizational penetration happens. The use-case playbooks all have a cross-sell pathways section that shows how one use case naturally leads to another.
 
The most common patterns:
 
**Product Intelligence → Release Engineering.** The product team is deep in PostHog. Their engineers are already implementing Feature Flags for experiments. Show the engineering team that the same flag infrastructure can power their entire release process. This is a different buyer (engineering manager vs. product manager) with a different problem, but the platform is already there.
 
**Release Engineering → Observability.** Engineers are using Feature Flags and Error Tracking for releases. They start noticing that Error Tracking surfaces issues they'd normally find in their logging or APM tool. The pitch writes itself: "You're already catching errors here. Want to see the logs and traces too?"
 
**Product Intelligence → Growth and Marketing.** The product team is measuring user behavior. The growth team wants to measure acquisition funnels, run landing page experiments, and track marketing attribution. Same platform, different team.
 
**Any use case → Data Infrastructure.** Once multiple teams are in PostHog, someone wants all that data in their warehouse. [Data Pipelines](/docs/cdp) and [Data Warehouse](/docs/data-warehouse) become relevant not as standalone products but as the connective tissue that makes PostHog the source of truth for product data.
 
The key insight is that each expansion uses a different entry point with a different champion. The PM who loves Product Analytics is not the person who decides to adopt Feature Flags for the engineering team. You need a new champion for each use case. The existing champion can introduce you (see [getting people to talk to you](/handbook/growth/sales/getting-people-to-talk-to-you)), but the new buyer needs to hear the pitch in their language, tied to their problem.
 
## The expansion cycle
 
The cycle can be summarized as:
 
1. **Identify the use case** that brought them in (or the next one to pursue).
2. **Fix the implementation** for that use case. Clean up billing waste, correct tracking issues, establish data trust.
3. **Go deep** on that use case. Make PostHog indispensable for the problem they're solving. Add the natural expansion products.
4. **Find the bridge** to the next use case. Look for signals: an engineering team that's already using Feature Flags for experiments, a growth team that keeps asking for funnel data, a support team that watches Session Replays to debug customer issues.
5. **Repeat** with the new use case, starting from step 1.
Each cycle adds products, adds users, adds teams, and increases switching cost. The customer goes from "we use PostHog for analytics" to "we use PostHog for everything product and engineering related" one use case at a time.
 
Not every cycle works. Sometimes the bridge to the next use case doesn't exist yet. The engineering team might already have a deeply embedded feature flag provider and there's no forcing function to switch. That's fine. Work the use cases that have natural pull and don't force expansions that don't make sense for the customer. Forced cross-sells are how you lose trust.
 
## Discount contracts as an expansion tool
 
Annual prepaid credit agreements (what we call "discount contracts") are not just a billing mechanism. They're one of the most effective tools for accelerating this cycle. See [contract rules](/handbook/growth/sales/contract-rules) for discount structures and mechanics.
 
A customer considering a new PostHog product has two concerns. One, will this actually work for my use case? Two, what will it cost if we go all-in?
 
A discount contract addresses both. When a customer pre-purchases credits at a volume discount, the marginal cost of trying a new product drops to near zero. They've already committed the spend. Experimenting with LLM Observability or Surveys or Error Tracking doesn't feel like a new line item; it feels like getting more value out of something they've already paid for.
 
This changes the psychology of cross-selling. Without a discount contract, every new product pitch sounds like "spend more money." With one, it sounds like "use what you've already bought."
 
When a customer is on monthly billing and has expanded to 2-3 products, the annual contract conversation should lead with the use-case expansion angle, not the discount angle. "You're using Product Analytics and Session Replay today. With an annual commitment, you can experiment with Experiments, Surveys, and Error Tracking at no additional cost up to your credit limit. If those don't stick, you haven't paid extra. If they do, you've just consolidated three more vendors into PostHog."
 
For customers already on annual contracts who are approaching the credit boundary, the renewal conversation is a natural expansion moment. "You're going to exceed your current credits this quarter. Before we resize, let's look at whether there are new use cases we should plan for. If your engineering team is interested in Feature Flags for releases, we should factor that growth into the new commitment so you get the volume discount on the expanded usage."
 
This is where the use-case framework and the commercial motion connect. The use-case playbooks tell you what to pitch and when, while the discount contract gives the customer economic permission to try it.
 
> Even after an annual deal is signed, additional usage ARR beyond the annual run rate still [counts toward your quota](/handbook/growth/sales/how-we-work#how-commission-works---technical-account-managers).
 
## When to go for the organizational sell
 
There's a point in the cycle where the motion shifts from "expand one team at a time" to "make PostHog a platform decision." This maps to [Strategy 4: move upward through stakeholders](/handbook/growth/sales/expansion-strategies#strategy-4-move-upward-through-stakeholders) in the expansion strategies page.
 
TAMs find this step daunting, because it can feel like if it doesn't land, the conversation is over with leadership. This isn't true.
 
There isn't necessarily a right or wrong time to attempt this, but it should be something on your mind with any account. Here are some conditions you can rely on to strategically time your organizational sell:
 
**Multiple teams actively using PostHog** as part of their day-to-day workflow. At minimum, this probably means two distinct teams and two distinct PostHog products.
 
**Multiple products with meaningful spend.** The [quota multiplier](/handbook/growth/sales/how-we-work#how-commission-works---technical-account-managers) gives you a rough proxy: if a customer is at 1.1x or above (3+ paid products above $200/month), they have enough product breadth that platform consolidation starts to make sense.
 
**An internal advocate with a leadership title** who cares about the platform story. If you don't have this and currently only have a user-champion (growth person, PM, senior engineer, etc.), your task is to find the leader who can be the sponsor. This is generally a VP of Engineering, a Head of Product, or a CTO. Someone who sees the value of having one platform for product analytics, experimentation, error tracking, and session replay instead of paying for four separate vendors with four separate contracts, four separate data models, and four separate support channels.
 
**A commercial forcing function.** A contract renewal, a budget cycle, a vendor consolidation initiative, a procurement review. Organizational decisions don't happen in a vacuum. They usually need a moment where the decision maker has a reason to evaluate. It's your job to know enough about the customer to know when these things are happening internally.
 
If all of the above are present, the organizational sell is straightforward: "You already have three teams on PostHog across five products. Here's what it would look like to standardize, including the cost savings from vendor consolidation and the volume discount from a larger annual commitment."
 
If you're missing one or more, keep working the cycle. Add another team. Add another product. [Build another champion](/handbook/growth/sales/expansion-strategies#strategy-2-build-champions-from-the-bottom-up). The organizational sell usually happens pretty naturally when those things are aligned, but it is something that you have to actually go out and do.
 
## What this looks like in practice
 
An idealized trajectory (each account is different, but the shape is common):
 
### Trojan Hog phase
 
Identify the primary use case. Run an implementation health check. Fix billing waste and tracking issues. Build trust by saving them money and improving their data quality. Get the first use case working properly.
 
### Depth phase
 
Expand within the primary use case. Add 1-2 products along the natural expansion path defined in the relevant [use-case playbook](/handbook/growth/use-case-selling). Get 5+ active users in PostHog from the first team. Identify potential champions on adjacent teams.
 
### Breadth phase
 
Open a second use case with a different team. Repeat the implementation review for the new use case. The existing champion makes the introduction; you build the relationship with the new buyer. If the customer is on monthly billing, this is often where the annual contract conversation happens.
 
### Platform phase
 
With two or more teams active, start the organizational sell conversation. Connect the existing champions with the executive sponsor. Frame the annual contract renewal (or first annual commitment) around the expanded platform footprint.
 
### Shampoo phase
 
There's always another team, another use case, another expansion path. The cycle doesn't end. Even gold-standard accounts have adjacent teams who haven't adopted PostHog yet, new products they haven't tried, and new use cases emerging as PostHog ships new features. Rinse and repeat.
 
## Realistic expectations
 
Not every account will reach the gold standard. Some customers have one team, one use case, and no appetite for expansion. Some have organizational dynamics (strong platform team, preferred vendor agreements, decentralized buying) that make the organizational sell impractical. Some are just not big enough for multi-team, multi-use-case adoption to matter.
 
But your task is to gather enough information to be absolutely sure that this is the case. See the [account planning](/handbook/growth/sales/account-planning) framework for how to systematically think through these questions.
 
The framework still applies at whatever scale is appropriate. A customer with one team using Product Analytics + Session Replay + Surveys well is better than a customer with three teams using PostHog poorly. Depth before breadth. Quality of adoption before quantity.
 
The gold standard is the north star. Every step of the cycle, from fixing an implementation issue to adding a second product to opening a second team, creates value for the customer and growth for PostHog. The organizational sell is the ultimate outcome, but each intermediate step is still a big win.
