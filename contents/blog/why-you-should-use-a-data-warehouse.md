---
date: 2025-01-26
title: 'Why you should use a data warehouse'
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Session_Summaries_escher_draft_ff034af63d.png
author:
    - joe-martin
featuredImageType: full
category: PostHog news
---

You’ve learned the difference between data lakes and data warehouses. You can drop acronyms like ETL and OLAP into conversation without flinching. But you’re still stuck on the annoying question underneath all of it.

Why should you use a data warehouse in the first place?

~Well, to prop up the economy and make sure big data remains a thriving business.~

Just kidding.

The real answer is: it depends. Even our own data stack teams (who are, to be fair, pretty enthusiastic about data warehouses) will tell you there are good reasons to steer clear of them. And those caveats are worth understanding before you consider the flip side of why you _should_ use a data warehouse. 

So, let’s start there. 

## Why you shouldn’t use a data warehouse, according to our own data engineers

> **tl;dr:** A data warehouse is overkill if your data volume is tiny (millions of rows or less) and you don’t have budget to burn or rapid growth.

### 1. “Your data volume is tiny”

If you don’t have much data then you probably don’t need a data warehouse, says [Estefania](/community/profiles/39615) from [our Data Stack team](/teams/data-stack). Makes sense, but how much volume is enough to warrant a data warehouse exactly?

It’s a rough guideline, but if you’re not either in the mid-millions of rows or anticipating being there soon then moving to a data warehouse is premature. Data warehouses are costly and only really pay off at scale anyway.

Granted, if you’re anticipating explosive growth in the future then it could be worth looking at simple options (PostHog has generous free allowances, for example), but implementing anything as complex as Snowflake would likely be overkill. 

### 2. “You need transactional workloads”

Plus, says Estefania, you need to know what data warehouses are best suited for. 

As a rule, most warehouses are OLAP databases. Those are great for big queries that involve aggregating data and joining different sources. 

They’re less good for real-time, transactional workloads that require high concurrency. While a warehouse can read millions of rows fast, it’ll choke if you relied on it for profile settings and 10,000 users try to update them simultaneously. Those high-frequency, small-scale "write" operations are the bread and butter of OLTP databases, like [Postgres](/blog/clickhouse-vs-postgres).

### 3. “All your needs are already met” / “Money”

PostHog Product Engineer [Bill](/community/profiles/39000) has a ‘if it ain’t broke, don’t fix it’ philosophy. If all your data needs are already met and you’re able to run all the analysis you anticipate needing, don’t rush to the hassle of creating new schemas and integrations for a data engineer to unpick later. Just stick with what you’ve got. 

[Andrew ‘Captain Obvious’ McGehee](/community/profiles/36723) follows a similarly pragmatic line of thinking, but this time with a bottom-line in mind. If you don’t need it, why would you _pay_ for it? Especially when you have to factor in the cost of not just the warehouse itself, but also the time spent maintaining it and the tooling to use it. 

Costs will balloon, says Andrew, because warehouses make it easy to store data indefinitely and run expensive queries accidentally. So, if you do go ahead, consider [setting billing limits](/docs/billing/limits-alerts).

> **Don’t forget the "Freshness" tax.** Moving data into a warehouse usually involves an ETL/ELT lag. Unless you’re building a complex (and expensive) streaming pipeline, your warehouse data is often 15 minutes to 24 hours behind your production DB. If your team needs up-to-the-second data to make operational decisions, a warehouse might actually be a regression.

### 4. “Someone else thinks it’s a good idea”

[Marius](/community/profiles/30202) may have been [PostHog’s first employee](/founders/posthog-first-five), but he’s no rule-follower and advises against warehouses for warehouses sake. His view: don't let a "mature company" checklist dictate your stack.

Maybe your CTO thinks you need a warehouse because you just hit a certain headcount. Maybe your principal engineer is looking greedily at the latest funding round and wants to play with a new toy. Maybe someone just thinks it’s "fashionable."

Whatever the case, if the push is coming from a desire to look professional rather than a desire to solve an actual problem, see it as a red flag. Wait until there’s a genuine use-case that actually hurts, as otherwise you'll end up paying for it later. 

- Maybe your CTO thinks you need a warehouse because you’re a mature company now. 
- Maybe your principal engineer is looking greedily at the latest funding round. 
- Maybe someone just thinks it’s so fashionable right now. 

Whatever the case, if there’s someone who really wants to do it despite everyone else’s better judgement, you should see it as a red flag. Implementing and maintaining a data warehouse is a big task that requires everyone to be brought-in to a shared vision at both the high level ("Why are we spending so much on this?") and in the details ("What should our naming convention be?"). Without at least _some_ consensus, the project will get off to a very shaky start. 

## Why you should use a data warehouse

> **tl;dr:** Once you have two or three actual, genuine use-cases you can no longer solve with the operational database – or if you anticipate such rapid growth that you need to prepare for that – _then_ it’s a good idea to consider a data warehouse.

### 1. You want to stop fighting your team and your data

Product events, billing info, CRM data, marketing stats... a data warehouse gives you somewhere to store and model it all, without having to manually piece each bit together. 

If you’re trying to figure out your MRR and you’re tired of having to reconcile disagreements between Salesforce and Stripe, then that’s an _excellent_ reason to use a warehouse. You can just plug it all in and model it centrally, without juggling a dozen spreadsheets called `Monthly_Revenue_Final_FINAL_use_this_(1)(1).csv`.

### 2. You need to stop punishing your operational database

Don’t be mean to Postgres. It can do a lot of things well, but heavy, concurrent reporting queries with complex joins? Not so much. You’ll end up slowing down your product, timing out your queries, and upsetting your product managers.

Once app performance starts to suffer and your queries start to be measured in pages, it’s time to consider offloading that work. You can start small with tools like DuckDB for fast, local analytical processing on your own machine, or graduate to a [managed warehouse](/data-stack/managed-warehouse) for team-wide access. 

### 3. Something something single source of truth

“Single source of truth” is a tired cliché, but the underlying problem is real: without a shared layer, everyone ends up building their own version of the truth. A warehouse, on the other hand, gives you a place to define things factually and without subjective bias.

That can include not just what data should be referenced, but also metric definitions, canonical tables or models, query versions, and more. Most importantly it also gives you a paper trail: when the CEO asks where a number came from then you have a comprehensible source to reference. 

### 4. Governance, unfortunately

Nobody gets excited about governance (except for [Tom](/community/profiles/34651)), but it is important. If you’ve got a dozen hands all over your data then things are inevitably going to go wrong — and you need a way to find out who to blame and how to fix it.

For example, if someone changes a column name in your production database without telling anyone, the downstream pipeline will fall apart and you’ll have to look at your logs. A mature warehouse, however, will prevent the problem with schema controls, access limits to keep out nosey interns, and cost controls to stop marketing from accidentally causing a financial crisis. Again. 
