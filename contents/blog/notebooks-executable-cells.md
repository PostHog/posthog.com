---
title: We rebuilt Notebooks around executable cells
date: 2026-11-02
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/what_s_new_in_notebooks_5a1d4bdcc6.png
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - sinan-kucukkoseler
category: Engineering
tags:
    - Product updates
    - Engineering
seo:
    metaTitle: How we rebuilt Notebooks around executable cells
    metaDescription: "PostHog Notebooks now run SQL, Python, and markdown cells that pass dataframes to each other. Go from a HogQL query to pandas to a chart without exporting a CSV."
---

Here's an afternoon I've had more times than I'd like. I write a HogQL query in PostHog and get a table back. Then I hit the edge of what SQL is good at. I want to fit a curve, reshape the data, or draw a chart PostHog doesn't have. So I export a CSV, open a notebook somewhere else, and paste it in. Now the query lives in one place and the analysis in another.

Our old Notebooks didn't excite me as a user. You could pull in saved insights and write text around them. Good for reporting, but you couldn't run anything.

So we rebuilt Notebooks around cells you can run. SQL, Python, and markdown cells run in place and pass data to each other. Go from a HogQL query to a pandas transform to a chart, then back to SQL, without leaving the page or exporting a CSV.

Notebooks are in beta now. [Open one in your project](https://app.posthog.com/notebooks).

![A SQL cell pulling errors per 10-minute bucket, followed by a Python cell charting them with matplotlib](https://res.cloudinary.com/dmukukwp6/image/upload/Notbooks_1_2f07cf42ea.png)

## What's in a Notebook now

There are three kinds of cell that run:

- **SQL cells** run HogQL against your events, persons, sessions, and any data warehouse table you've synced. Results come back as a table you can chart.
- **Python cells** run in a sandbox with pandas, numpy, scipy, scikit-learn, and matplotlib already installed.
- **Markdown cells** hold the commentary around your charts and graphs.

Cells share data, so they can work together to tell the story you want. Every cell outputs a named dataframe that any other cell can read. Python cells see it as a `pandas.DataFrame`. SQL cells see it as a table, queried by a DuckDB engine inside the notebook.

So if a Python cell reshapes data, the next SQL cell can query the result directly. PostHog spots the reference and runs that query locally instead of in the warehouse. You can bounce between SQL and Python as many times as the analysis needs.

![A SQL cell pulling execute-sql MCP calls, followed by a Python cell charting the daily error rate by error type](https://res.cloudinary.com/dmukukwp6/image/upload/notbooks_2_a373539c83.png)

Here I pulled errors for one MCP tool with SQL, broke them down in Python, and charted them with matplotlib.

PostHog also tracks which cells depend on which. Change an upstream cell and everything downstream is marked stale, so you know what to re-run.

![An upstream SQL cell warning that a downstream cell may be showing outdated data, and the downstream Python cell flagged as out of date](https://res.cloudinary.com/dmukukwp6/image/upload/notebooks_3_5e230758cf.png)

## The decisions behind it

### Why a persistent kernel instead of stateless cells?

We could have made every cell re-run clean each time. Instead, a persistent kernel stores the dataframes.

Thorough analysis often means diving deep into data. You fetch a dataset, then branch out to explore different slices or correlations within it. Without a persistent kernel, every new query or Python script that relies on a previous output would have to re-run the queries behind it. The risk is stale data, so a dependency graph flags downstream cells when something upstream changes.

### Why DuckDB as the local engine for querying dataframes?

It's one of the fastest single-node engines for columnar work. It also reads Arrow and remote Parquet well, which is what we needed. When data outgrows memory, it spills to disk. That's slower, but the query finishes instead of failing.

### Why configurable compute per notebook instead of one fixed size?

Different analyses need different amounts of memory or compute. We spin up a default node when you run your first Python cell. You can pick a bigger one when the job needs it.

## How the PostHog team uses Notebooks

We build for users, and for ourselves. Here are three notebooks the team made recently.

### Answer a question that uses product and external data

Does company size predict how much a customer spends with us? We joined our billing and usage data with headcount and funding synced from an enrichment tool. One SQL cell pulls both together, and the next tests which traits track revenue.

The answer: firmographics barely matter. All 68 company fields together explain far less of spending than four usage numbers do.

![A markdown cell summarizing which firmographic fields have signal for predicting spend, and which have none](https://res.cloudinary.com/dmukukwp6/image/upload/notebooks_4_9f48cbf9bf.png)

### Write up an incident so it stays accurate

After an outage, we want a record of what happened, when, and who it impacted. Each incident gets a notebook with a write-up, timeline, diagram, and a live query counting the errors. Because the query is live, if you reopen the notebook next week it shows the real numbers instead of a screenshot that's now out of date.

![An investigation notebook with a verdict, a live SQL cell charting CI failure rate, and hypotheses written in markdown](https://res.cloudinary.com/dmukukwp6/image/upload/notebooks_5_4b0a0d7562.png)

### Build a monthly growth report that updates itself

Every month we review how our data products are growing. That used to mean rebuilding a slide deck. Now it's a notebook with live charts. We add commentary each month, so data insights and our own take live side by side as the data changes.

![A monthly report notebook with commentary on a spike in endpoints created, above a live insight charting endpoints created per day](https://res.cloudinary.com/dmukukwp6/image/upload/notebooks_6_aeee57a07e.png)

## Where this is going

All of these features are in beta and free to use right now. Once they're generally available, notebook sandboxes will be billed based on the node specs you provision.

Next, we'll make the in-notebook AI agent more effective at using the context available to it. We're also improving the UX so Notebooks feel intuitive for both simple and complex data analysis.

Let us know what you'd like to see in PostHog Notebooks, and what would make your data analysis 10x easier. If you want to try it now, [open a notebook](https://app.posthog.com/notebooks).
