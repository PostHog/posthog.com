---
title: How to write a data study
sidebar: Handbook
showTitle: true
---

A data study is a short, opinionated article built on our own first-party data. 

We've shipped two so far: [Nobody watches their session replays](/blog/nobody-watches-session-replays) and [How AI agents behave](/blog/how-ai-agents-behave), as well as [a blog post recounting the experience](/blog/turning-data-into-content). 

This page covers why they're worth doing and how to make one.

## Why do this

**LLMs reward original data.** They cite sources that have numbers nobody else has. The data already exists, nobody can copy it, and we're well positioned to be the authoritative source on how people use developer tools.

**It's repurposable.** Our data study threads have performed well on X, and there's room in the future for video, shorts, and newsletter issues from the same material. #synergy

**It's a natural way to talk about our products without being salesy.** A data study leads with something interesting, and the product follows from it: how we use our own tools internally, or how a tool solves the pain point the data just surfaced. It feels a lot less forced than a purely transactional piece of content with a pitch.

**We have the tools to make the data part simpler.** One of the hardest part of writing a data study used to be the pulling and the analysis, but that's mostly solved now: the MCP pulls the data, PostHog AI can help with the analysis and keep every query in a notebook so it can be re-run, the Slack bot can fill in the missing product context (if any)... the hard part now is figuring out what how to tell the story, which also happens to be the fun part anyway.

## Picking a topic

Run your idea through these before you pull anything:

- **Is it data we already collect?** If it needs new instrumentation, skip it for now. This should be data we already have in place, ideally lots of it. A finding built on millions of events is more interesting than one built on hundreds, and it's harder to argue with.
- **No PII, no single customer identifiable.** Aggregates only. Outlier stats are fine if the person can't be found from them. We report what we see on our side, never what's inside a customer's own project.
- **Is it relevant to the business?** The topic should connect to a product we sell, a problem we solve, or how we work. Ideally it's aligned with whatever we're focusing on this quarter as a marketing org.
- **Is there a product tie-in that isn't forced?** A study that naturally ends on a product we sell or a tool we use is easier to justify than one that doesn't. If you have to bolt the product on at the end, the topic can probably be reworked.

## The process

### 1. Find the angle

Don't guess what data exists. Point Claude (or whatever you use) at the PostHog MCP, or use PostHog AI, and make it check what we actually collect before it pitches anything. Seed it with products you want to write about, and make it argue different options before you commit.

Example prompt:

```
Help me pick an angle for a data study built on PostHog's own first-party product data.
 
You have the PostHog MCP. Check what events and properties we actually collect before pitching anything – don't assume.
 
Rules:
- No PII, no single customer identifiable. Aggregates only.
- Data we already collect. Nothing that needs new tracking.

This quarter we're focused on [marketing focus], so angles that land there are
worth more.
 
Give me six angles. For each one:
1. The headline, written as if it were the blog title
2. The query that would prove it
3. The number that would have to be true for it to work
4. How it could turn out boring or ambiguous
5. Which product it naturally lands on, if any
 
Rank them by how interesting they'd be to a developer.
```

### 2. Pull the data

Ask PostHog AI to pull everything into a notebook, with the SQL next to every result.

```
I'm writing a data study about [topic]. The working headline is "[headline]". Create a notebook called "[study name]" and put every query in it with its SQL visible, so I can re-run and tweak them.

Scope for every query:
- [timeframe]
- Exclude PostHog's own traffic (internal projects, our own agents)
- Cross-tenant, aggregates only, nothing identifying a customer

Pull these, in order:
1. [question – e.g. of recordings created, what share are ever watched?]
2. [question – e.g. median watch time, and the distribution]
3. [question]
...

For every number: state the exact population it's a share of. Use
medians over means, and tell me when a mean is being dragged by
outliers. If a cut has a small sample, say so instead of charting it.
If a question can't be answered cleanly with the data we have, tell
me rather than approximating.
```

### 3. Get product context

For additional context, lean on the PostHog Slack bot. It can search Slack, GitHub, and the docs, so it’s the quickest way to get up to speed on a product and on whatever the team is currently discussing about it.

```
@PostHog I'm writing a public data study about <product>. Search Slack, GitHub, and the docs and give me:
- What it does and how it works, in plain terms
- What's GA vs beta vs behind a flag
- Relevant RFCs or issues
- The limitations and known rough edges
- Any recent threads where the team discussed its usage or any problems

```

### 4. Write it

A few editorial rules we've settled on:

- **Headings are claims, not questions.** "Codex makes the fewest mistakes" tells the reader what they're about to learn; "Which agent is most reliable?" makes them read the section to find out. Claims pull people through the piece, and they double as easy social hooks.
- **Pick one number style and stick with it.** Percentages, fractions, or "one in fifteen" – any of them works, but switching between them forces the reader to convert in their head every time. Pick one at the start and apply it everywhere.
- **The methodology footnote is where the caveats go.** The body states the number; the footnote states what it counted, what it excluded, and why. If a number can't be stated in the body without a caveat next to it, either the caveat moves to the footnote or the number isn't strong enough to use.

That said, these aren't a template. We've done two of these and the rules above are what worked so far. 

If you have an idea that makes the next one better – a different structure, an interactive chart, a format we haven't tried – go for it, and update this page when it works.

### 5. Build the charts

Mock them first, then make them real.

For the mockups, give Claude the notebook and have it re-run the queries itself through the MCP rather than trusting pasted numbers. Ask for three visualization options per finding. 

```
Here are the SQL queries behind my study. Re-run each one through the PostHog MCP and check the numbers still hold, flag anything that doesn't match the draft.
 
Then, for each query, three ways to visualize it. Different chart types, one line on what each gets across. Rough is fine.
```

Once you're happy with the options, file an Art Request with the Graphics team to polish them. Attach the PNGs, the data behind each one, and a line on what the study is about and what each chart is meant to show.

### 6. Review and ship

Before review, give Claude the draft and the notebook and have it try to get the post killed:
 
```
Here's the drafted article and the notebook behind it. Your job is to get this
post killed in review. Be ruthless.
 
- Every number checked against the query that produced it.
- Every ratio: do the numerator and denominator count the same population?
- Flag any correlation dressed up as causation.
- Claims about how the product works that the docs don't support.
- Anything that could identify a customer, even indirectly.
- Anything a competitor could reasonably dunk on, and how they'd phrase it.
 
Sort by how embarrassing it is if it ships. Don't tell me it's good.
```

Once you're happy, open the PR on `posthog.com` and tag the Editorial team for review, along with whichever product team owns the data.

### 7. Distribute

Flag to the Editorial team for social distribution (make their life easier by linking the Art Request and giving any necessary context).