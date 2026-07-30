---
title: Our context warehouse knows your data, the semantic layer tells it what to trust
date: 2026-07-30
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - thiago-rocha-salvatore
    - lizzie-epton
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/semantic_layer_blog_header_a19ba93b69.png
featuredImageType: full
category: General
tags:
    - Context Warehouse
    - Data Modeling
seo:
    metaTitle: Our context warehouse knows your data, the semantic layer tells it what to trust
    metaDescription: A semantic layer is a governed catalog of definitions that sits on top of your existing data and tells agents and people what to trust. Here's how we built one into PostHog's context warehouse.
---

Ask Claude, Cursor, and PostHog's own AI the same question: "what was our MRR last month?", and you'll get three different queries and three different numbers.

I did exactly this, half-expecting the tools to agree. They didn't; one summed a Stripe table, one found a slightly different Stripe table, and one tried to reconstruct recurring revenue from raw events and got the proration wrong. Every method and number was plausible, and there was no way to tell which was right.

The problem is that "MRR", what it means at PostHog, which table holds it, and how it's calculated, all lives in people's heads. So every agent session reinvents the definition from scratch, slightly differently.

Humans have this problem too. Every new analyst re-learns which revenue table is the real one and how Stripe is connected each time they join a new company. Agents just amplify the issue by answering confidently and hallucinating to fill the gaps in their knowledge, and nobody thinks to double check it.

You can't fix it with a smarter model. You need to give every agent a single place to read the definition from, so "MRR" means the same thing on every call. That place is the semantic layer, and this is the story of building it into PostHog's context warehouse.

<!-- SCREENSHOT: the same "what was our MRR last month?" question producing different SQL / different answers across two agents --> ![What was our MRR last month](XX)


## What is a semantic layer?

A semantic layer is a dictionary of definitions that everyone (agent and human) reads from. You define MRR once, approve it once, and every query you run from then on returns the same number.

The most important thing to understand about it is what it doesn't do. It doesn't copy your data, replace your warehouse, or move a single row of data. It sits on top of the data you already have and describes it, "this is what MRR means, this is the table to trust, this is how these two sources connect." It's a map, not a second copy of the territory. That's why it's called a layer.

What it's really fixing is three kinds of knowledge that only exists as tribal memory:

* **What our metrics are:** MRR isn't just "revenue", it's a specific calculation over a specific source.
* **Which tables to trust (and which tables to avoid):** A mature project imports dozens of sources and builds hundreds of data models. Plenty of them could answer "revenue." Only one is current and blessed as accurate by the finance team. Others can be useful too, but there might be tables that we should avoid as much as possible.
* **How the data joins together:** The Stripe customer ID maps to an organization property, but only after a format cast, and nothing tells you that except the analyst who figured it out last time.

If you're a small company with a handful of tables, you probably know where everything is. But, as you grow you add more data sources and more models, that number you used to understand stops being obvious to anyone, least of all to an AI agent seeing your schema for the first time.

> **Semantic layer** /sɪˈmæntɪk ˈleɪə/ – *noun*. A governed catalog of definitions that sits on top of your existing data and tells people and machines what it means: what each metric is, which tables to trust, and how sources connect. It describes the data; it doesn't copy or move it.
>
> **Glossary**
> * **Catalog:** the structured, queryable inventory the semantic layer maintains.
> * **Metric:** a named, governed definition of a business measure, like MRR.
> * **Governed:** nothing becomes official until a human approves it.

## Where this lives: the context warehouse

The [context warehouse](/blog/what-is-a-context-warehouse) is where PostHog pulls together everything an agent needs to answer questions. That includes product events, imported sources like your Stripe data, and data models, into one place, optimized for agents to use. The semantic layer is a key part of that stack making sure agents have the context of what your data means to be able to interpret it correctly.

The design decision that integrates the semantic layer so fully is that **the catalog is just SQL**. Everything the layer knows shows up as ordinary tables. Metrics are a table. There's no bespoke "catalog API" for an agent to learn; if it can run `execute-sql`, it already knows how to read the entire semantic layer. Discovery is a query, not an integration.

The reason three tools gave three MRR numbers is that each had to invent an answer. Now the first thing any agent does is check the catalog: is there an approved metric? If so, it runs the governed definition instead of writing its own SQL. Same question, same number, every time.

<!-- SCREENSHOT: the typed-confirm approval flow in an MCP client — agent proposes, human types "confirm" -->![What was our MRR last month](XX)

## AI generates, a human owns

Agents are genuinely good at proposing improvements to your data governance. Point one at your schema and it'll happily draft metric definitions, suggest which tables look canonical, and spot likely joins from column names and sample data. Doing the tedious first pass is useful, but giving an agent edit access to your data widens the gap between trusting your data and not being sure.

So everything an agent creates lands as `proposed`. Nothing an agent touches is ever canonical on its own. A human promotes it, approving a metric, certifying a table, accepting a join. We added two guardrails to verify any definition changes even after approval:

* Edit an approved metric's definition and it drops straight back to `proposed`. Changing what a number means re-opens the question of whether it's right.
* If a metric was built from an existing insight and someone later edits that insight, the metric gets flagged as **drifted**. It's a signal that the definition it was born from has moved and a human should re-review.

Which gives agents one simple rule to live by: a result is canonical only when `status = 'approved'` and `is_drifted = false`. Everything else including proposed, drifted, and archived, gets labeled non-canonical, and a well-trained agent will tell you so rather than passing it off as gospel.

## The design decisions we made (and the ones we didn't)

The interesting part of building this was the tempting-looking arch choices we walked away from. Almost every simplification you reach for first turns out to break in a way that shows up later as a wrong number. Here are a few of the choices we didn't make:

### "Why not just make every metric a SQL query?"

This is the first thing everyone suggests: funnels and trends all compile down to SQL eventually, so why not require every metric to be SQL and be done with it? Because the same metric written by hand as SQL gives a different number than the insight it came from.

Take activation, which at PostHog is a funnel. To make it SQL-only, someone has to rewrite that funnel by hand. PostHog's funnel engine does a lot under the hood: steps have to happen in order, per person, inside a conversion window, with exclusions and deduplication applied. A hand-written SQL version gets some of that wrong.

Storing the metric as the same funnel definition the insight uses, and running it through the same engine, makes that mismatch impossible. The metric and the dashboard execute identical queries. That guarantee is why we support insight-shaped metrics, not just SQL.

### "Why not write definitions in plain English?"

We took the good part of it, a metric can be defined using a Markdown structure, where the user defines, step by step, how the agent should calculate the given metric. However, it has limitations compared to other types of metrics as it is less deterministic compared to insight-backed and SQL-backed metrics.

### "Why not just point a metric at an existing insight?"

Insights already blend SQL, funnels, and trends, and pointing at one would keep the metric and the dashboard in lockstep. The problem is that insights are shared objects that people edit all day, and "editing the definition resets approval" is impossible to enforce on something everyone's mutating. So instead of pointing at the insight, `metric-create` takes the insight, snapshots its query, and remembers where it came from. You get lockstep awareness with the drift flag, without handing governance to an object anyone can change on a whim.

### "Why not build a semantic query language, like dbt?"

That's the "right" long-term answer for composing non-SQL metrics into arbitrary queries, and it's exactly what we chose not to build in v1. It's a whole new language for both humans and agents to learn, plus a compiler to maintain forever, even dbt won't let you plain-`SELECT` a metric in a random editor; you go through their compiling API. Our `metric-run` endpoint is the same architecture minus the language. If usage data later shows people really need in-editor composition, there's a path we can take to get there. Until then, it's complexity we haven't earned.

SQL metrics are defined over a saved view. Create the view first, point the metric at it, and the metric stays composable with plain SQL. Views are already PostHog's "queryable named SQL" primitive, so we reused them instead of inventing a parallel one.

## Where it's going

The PostHog semantic layer is in beta right now, you can work with it through MCP tools, PostHog's UI and SQL.

We're measuring success around this bet:

* Do agents get questions right? The bar we set is ≥80% on a fixed set of golden questions, clearly above a baseline with no catalog.
* When an approved metric exists, do agents actually use it instead of deriving their own number?
* Does the catalog keep growing through everyday use, or does it spike during setup and then go silent?

As more of what we build becomes agent-driven, reliable data is the difference between an AI you can trust and one you can't.

The semantic layer is in beta. Want access, or hit a bug? Let me know!
