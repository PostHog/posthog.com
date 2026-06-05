title: How Qubs flipped the digital menu market with PostHog Endpoints
customer: Qubs
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/QUBS_8c25737523.png
date: 2026-03-10
---

Most digital menu companies charge restaurants for using their software. [Qubs](https://info.qubs.app) does the opposite: it gives restaurants a polished menu for free, and pays them a share of ad revenue on top. 

The economics work because Qubs runs its own advertising network. Restaurant owners get a free product and an additional revenue stream. Advertisers get eyeballs at fair prices through Qubs's real-time bidding system. Qubs takes a margin in the middle.

Their main challenge was building the kind of ad infrastructure that you usually only find on platforms like Google and Meta, from scratch.

Qubs, a self-funded startup based in Romania, with a 1.5-person engineering team and no outside investors did it with [PostHog Endpoints](/endpoints).

<OSQuote
  customer="qubs"
  author="gheorghe_avram"
  quote={2}
/>

From beta to production
-----------------------

Qubs started out using PostHog for storing their event data. Ad impressions and clicks are ingested as events from both the frontend (menus) and the backend (ad platform), with PostHog Transformations used to verify backend-emitted events before they hit the database. An important piece of the puzzle when those events directly drive how much advertisers get charged.

"The ad views and the prices that are shown matters because we're handling money," explains Gheorghe. "Through Transformations, we can verify view events and trust the data we get."

When Endpoints landed in beta, it solved the problem. Qubs has been using it in production ever since, writing the SQL behind the endpoint and feeding back bug reports along the way. Issues got resolved fast even in beta, and that responsiveness made the team comfortable shipping a real revenue-generating product on top of it. Gheorge says, "It allowed us to very easily query the data and sync it regularly, so we can reasonably charge our advertisers based on what and how their ads performed."

16 Endpoints, terabytes of data
-------------------------------

Today, Qubs runs roughly 16 SQL endpoints, and they sit at the heart of everything that involves money or performance metrics:
* The advertiser dashboard, where customers see impressions, clicks, spend, and campaign performance
* The real-time bidding loop, which refreshes campaign state and keeps daily budgets accurate as ads serve
* Revenue-share calculations that pay restaurant locations based on actual ad performance
* A transparency view that lets advertisers see which restaurant menus their ads appear on and how they look

Whenever an ad is served, an impression event flows into PostHog. Endpoints query that event stream on a regular cadence, and the result drives the budget meter ticking down on the advertiser's screen. The experience is intentionally familiar to anyone who's used Google or Meta ads — set a daily budget, watch it spend, see the performance — but on Qubs's own infrastructure.

![Qubs ad platform 1](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2026_05_22_at_02_13_16_2x_4afb756338.png)

The reason this works is that Endpoints don't lock Qubs into a constrained query language. SQL endpoints expose ClickHouse functions directly, which gives Gheorghe room to optimize for specific workloads. That matters most for the campaign performance endpoint, which scans terabytes of data per query. PostHog's AI helped him bootstrap simpler queries, but for such a high volume query, Gheorghe iterated 26 times by hand to hit the throughput he needed.

![Qubs ad platform 2](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2026_05_22_at_02_13_03_2x_65887e618f.png)

"I'm a really technical person, and having the power to take my endpoint query, put it in the debug interface, and analyze how things work really helps me do my job even better," Gheorghe says.

Using the source code
---------------------

When Qubs adopted Endpoints in beta, parts of it weren't fully documented — the engineers were still shipping features fast in response to user feedback, and docs were one step behind the engineers.

Gheorghe ran into a question he couldn't answer from the docs, he opened up PostHog's source code on GitHub, traced through the relevant module himself, figured out the answer, and then went back and shared his findings publicly on the community forum. The next person to hit the same edge case finds the answer waiting for them.

This kind of [open-source transparency](https://posthog.com/questions/concurrency-limit-for-endpoints) is really important to Gheorghe because it lets him unblock himself from technical challenges, as well as contribute to the community. 


A self-funded competitive edge
------------------------------

Qubs is fully self-funded, so they couldn't justify hiring a data engineer or running a separate analytics stack alongside the product. That math determined the whole architecture.

Building all of this from scratch: ingestion, processing, filtering, dashboards, would have taken Gheorghe and one part-time collaborator more than six months by his estimate. With PostHog it shipped in a month, while also giving Gheorghe the ability to integrate the UI into the product. 

"Because I built my own advertising network, the ads look like part of my menus," says Gheorghe. "They're so natively and beautifully integrated that they don't offend the customers or the restaurant owners. If we used Google ads, I couldn't do this, and I couldn't offer the same amount of money I'm offering to restaurants right now, because Google would have to take a cut of the revenue."

![Qubs ad example](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/qubs_menu_example_5b980ec943.png)

Using the infrastructure they’ve developed, Qubs plans to expand beyond Romania and into other service-industry products. And, because of some of the heavier real-time bidding workloads, the team is evaluating PostHog's [Managed Warehouse](/data-stack/managed-warehouse) to help them scale up.

For Gheorghe, flexibility is the point of using PostHog. PostHog handles the events layer, feature flags, and error tracking, and whenever Qubs wants, they can pull data out and run it themselves without re-platforming everything.