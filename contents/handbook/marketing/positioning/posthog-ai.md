---
title: PostHog AI
sidebar: Handbook
showTitle: true
---

*For the canonical frame everyone at PostHog uses – the self-driving story and standard description – see [Brand foundations](/handbook/brand/foundations#how-we-describe-posthog).*

## Elevator pitch

PostHog AI understands your full data model — event taxonomy, user properties, cohorts, flags, experiments, warehouse sources. Ask it a question in plain English. It writes the query, runs it, and explains the result. No prompt engineering. No schema briefing. No waiting for a data team ticket to be picked up. It will also speak like a pirate to you on International Speak Like A Pirate Day. 

PostHog AI is wired into PostHog Code via MCP, so it's not just a query interface for humans — it's the intelligence layer that agents use to understand product impact, measure experiment results, and evaluate whether their changes worked. A key part of the product autonomy loop.

## The unique belief (in terms of PostHog AI)

General-purpose AI is impressive but context-blind. When you ask ChatGPT "why did signups drop last Tuesday?", it doesn't know your event taxonomy, your funnel structure, your user cohorts, or what shipped last Monday. Without an MCP (which PostHog also has) you spend more time explaining the context than getting the answer.

PostHog AI is different because it already has the context. It knows your event names, your properties, your SQL schema, and your product's entire behavioral history. It doesn't need to be briefed. It's the query interface for humans and agents alike — and in the [product autonomy loop](/blog/self-driving-product), it's the layer that connects PostHog Code to every insight, dashboard, and metric in the platform.

**PostHog AI isn't AI added onto analytics. It's the interface through which a self-driving product understands itself.**

## Who this is for

- **Product managers and non-technical stakeholders** who need product insights without writing SQL or waiting on a data engineer.
- **Engineers who want to move faster** — PostHog AI writes the query so they can iterate on the result.
- **Teams without a dedicated analyst** where self-serve analytics is the only option that scales.
- **AI-native product teams** who want to expose their product data to agents and other LLM runtimes via MCP.
- **PostHog Code users** — PostHog AI is the query engine that powers agent access to product data.

### Who this isn't for

- Teams who prefer writing SQL directly and always want to do things the hard way. You _can_ do that in PostHog, but then why use PostHog AI?
- Organizations that need formal AI output auditing before any query runs in a production data environment.
- Teams looking for a general-purpose AI assistant for tasks outside PostHog — PostHog AI is intentionally scoped to product data.

## Messaging

### Message 1: The query layer for humans and agents alike

**Problem:** Product data is valuable but inaccessible to most of the people who need it. Non-technical stakeholders can't write SQL. Engineers don't want to context-switch to write a dashboard for a one-off question. Agents need to query metrics programmatically without human intervention.

**Solution:** PostHog AI serves all three audiences from the same interface. A PM asks "what do power users do in their first session?" PostHog AI writes the query and shows the answer. PostHog Code asks "did this deploy regress conversion?" and gets a structured result it can use in the evaluation step of the autonomy loop.

**Supporting features:**
- Natural language to HogQL query generation
- Supports events, persons, cohorts, funnels, retention, trends, and warehouse data
- MCP integration: PostHog Code and any MCP-compatible agent runtime can query via the same interface
- Explains query logic so you can verify or modify before running

### Message 2: The democratization of your data

**Problem:** Self-serve analytics doesn't mean much if "self-serve" requires SQL fluency. Most product teams are bottlenecked on the analyst who can translate business questions into queries — and that analyst is always busy.

**Solution:** PostHog AI democratizes query access across the entire product team. A customer success manager can ask "how often do enterprise customers use this feature?" A designer can ask "where do users get stuck in the onboarding flow?" An engineer can ask "which error type has the most user impact?" All without SQL, all without a ticket.

**Supporting features:**
- Generates complex queries — joins, window functions, cohort comparisons
- Pre-built awareness of PostHog's product functions (flags, experiments, cohorts)
- Integrates with warehouse sources (Stripe, HubSpot, Salesforce data queryable in natural language)
- Dashboard generation from natural language

### Message 3: Context-aware from day one

**Problem:** General AI tools require extensive prompt engineering to be useful for product analytics. You have to explain your schema, your naming conventions, your business logic, and your question — every time.

**Solution:** PostHog AI has full access to your event taxonomy, your user property schema, and your existing dashboards. It autocompletes event names correctly. It knows which properties are populated. It understands which cohorts exist. The first time you ask a question, it already knows how to answer it.

**Supporting features:**
- Automatic awareness of installed PostHog products and their data
- Knows your team's event naming conventions and existing dashboards
- Ingests schema context from connected warehouse sources
- No prompt engineering required for standard product analytics questions

## Battle cards

### vs Amplitude AI

**Their approach:** Amplitude's AI features work within Amplitude's product analytics context. Good for querying Amplitude data. No feature flag, session replay, warehouse, or agent integration.

**Where PostHog wins:**
- PostHog AI has access to the full PostHog platform — analytics, flags, experiments, replay, and warehouse in one context
- MCP integration for agent access — Amplitude has no equivalent
- PostHog Code integration: PostHog AI powers the evaluation step of the product autonomy loop

### vs ChatGPT / Claude (direct)

**Their approach:** Powerful general-purpose LLMs. Excellent for many tasks. Completely context-blind about your specific data model, event taxonomy, and product structure unless you add our MCP.

**Where PostHog wins:**
- No schema briefing required — PostHog AI already knows your data
- Executes queries directly — general LLMs produce SQL you then have to run elsewhere
- Integrated into the platform where you already work
- MCP bridge for teams who want to use Claude Code or other agents with PostHog data

## Objections

### "AI-generated SQL isn't reliable enough for production decisions"

**Answer:** PostHog AI shows you the query it generated before running it. You verify, modify, or reject. It's a query accelerator and first-draft generator — not an autonomous decision-maker. You still make the call; PostHog AI removes the SQL translation step.

### "We have data analysts who write SQL"

**Answer:** PostHog AI frees analysts from repetitive "how many users did X?" questions and gives everyone else self-service access to answers. Analysts can focus on the work that requires real judgment — designing experiments, interpreting ambiguous results, finding non-obvious patterns. PostHog AI handles the questions that shouldn't take analyst time.

### "We're worried about AI hallucinating column names or event names"

**Answer:** PostHog AI autocompletes from your actual event taxonomy and property schema — it doesn't invent column names. It can misinterpret business logic in complex queries, which is why we show you the SQL before running. Simple to medium complexity queries are reliable. Very complex multi-step analyses should be verified.

## Selling to enterprise

PostHog AI is included in the platform — there's no separate AI product to price. The enterprise conversation is usually about **data governance** (can AI generate queries on sensitive user data?) and **access controls** (can we restrict which users can use PostHog AI?).

The forward-looking pitch: teams that have PostHog AI set up properly today are the teams that will have the most capable PostHog Code autonomous loop tomorrow. The MCP integration between PostHog AI and coding agents is the technical foundation for self-driving product development — and it starts with getting the query layer instrumented and accessible. Enterprises which don't adopt it are falling behind faster every day.
