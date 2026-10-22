---
date: "2026-10-23"
title: "Our CI became a bottleneck. We used PostHog to help fix it"
author:
  - raul-negron-otero
rootPage: /blog
sidebar: Blog
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
showTitle: true
hideAnchor: true
category: Engineering
tags:
  - AI
  - Engineering
  - Developer experience
---

PostHog engineers ship a lot of features and fixes rapidly. That pace has only accelerated in recent months due to LLM adoption, specifically, our troop of AI agent [Scouts](/docs/self-driving/scouts) who are continuously monitoring our data and codebase for potential improvements and then pushing up new pull requests. This quickly created a bottleneck in our CI, which was originally set up for much less scale.

We care about this in the [Developer Experience team](/teams/developer-experience) because we have a goal to support a lot more shipping, [10,000 pull requests a month](/blog/10k-prs-a-month) to be exact. That experience needs to be comfortable as possible while balancing code quality and without sacrificing CI stability.

Naturally, we decided to fight fire with fire 🔥. Today, our CI workflows and other related surfaces (such as automated testing) also use self-driving agents to help us keep up with incoming fixes and improvements. Here's how we set it up.

## Step 1: Get CI/CD data out of GitHub

At PostHog, we're proud to be open source and use [GitHub to host our monorepo](https://github.com/PostHog/posthog). This means most of our CI-related data lives on GitHub and is queryable from there. But querying this data frequently means we hit rate limits and, in any case, it would be really wasteful to constantly ask GitHub for mostly unchanging data (think last week's merged PRs and completed workflow runs). Above all, PostHog is a data company! So we decided to get CI/CD data into our own product and see what features and ideas we could unlock from there.

For this, we used our data warehouse [GitHub source](/docs/cdp/sources/github), which continuously syncs repository data. Specifically, we were interested in pull request, workflow runs, and workflow jobs data.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_10_22_at_16_39_44_2x_fca9283bfb.png"
  alt="The form for linking GitHub as a data warehouse source in PostHog, with fields for authentication type, GitHub account, repositories, and table name prefix"
  classes="rounded"
/>

## Step 2: Add a queryable layer on the data (that agents can reach for)

We originally considered existing services to analyze CI data and help DevEx teams better understand developer behavior and pain points, but we found that most were built around measuring engineering team productivity. That's not what we were really interested in.

So we decided to build our own internal engineering analytics product. Its [core vision](https://github.com/PostHog/posthog/blob/master/products/engineering_analytics/README.md#the-one-sentence-version) is:

> It's product analytics, but the "users" are pull requests and the "events" are what happens to them on the way to production.

A great part about building it is that we re-use a lot of the existing primitives and data best practices found across other PostHog products. For example, we already had a lot of the query and visualization logic built, we just needed to add our GitHub data to it.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/ea_overview_light_5205e207b6.png"
  alt="The Engineering Analytics overview, showing CI pass rate, median time from push to all checks green, CI spend per merged PR, and CI duration per commit on master"
  classes="rounded"
/>

Under the hood, the Engineering Analytics product is basically a curated view into a lot of surfaces the DevEx team cares about: our CI system, the merge queue, and tests.

Besides being a useful place for humans (i.e. any interested PostHog engineer) to quickly get a general sense for CI health, we built Engineering Analytics to have MCP support from the start so that our agents could query for specific data when investigating CI troubles or looking for optimization opportunities. This way, agents don't need to rely on the GitHub API and we can better control the data and agentic flows here. We also leverage specific [skills](https://github.com/PostHog/posthog/tree/master/products/engineering_analytics/skills) for agentic steering. For example, the [investigating-ci-failures](https://github.com/PostHog/posthog/tree/master/products/engineering_analytics/skills/investigating-ci-failures) skill helps an agent find the commit that broke a CI job and check whether a later commit fixed it.

## Step 3: Make it self-driving

Engineering Analytics is also capable of plugging into PostHog's [self-driving](/docs/self-driving) capabilities and generating its own signals, which agents further investigate and potentially remediate via opening PRs. Basically, our CI can constantly improve itself.

To help this happen, we decided to start with three deterministic detectors that run over the ingested GitHub data (each one is a pre-baked query):

- **Flaky check**: a job that fails and then passes on a rerun of the same commit.

- **Broken default branch**: a workflow that keeps failing on our main branch.

- **Duration regression**: a workflow that got slower than it was in a previous window.

These detectors led to real fixes like:

1. [Fixing a failing CI](https://github.com/PostHog/posthog/pull/95630) - a WebKit Storybook shard was failing on every push to our default branch.
2. [Deflaking a Rust test job](https://github.com/PostHog/posthog/pull/75826) - a particular job failed and then passed on a rerun of the same commit twice in a week (two tests were racing over shared tracing state).
3. [Speeding up a check on every pull request](https://github.com/PostHog/posthog/pull/95082) - a workflow job installed the whole workspace before a dry run that didn't really need any dependencies. After the fix, the whole job takes 33 seconds (down from 51 seconds).

We've shipped more than a dozen related improvements since.

## What we learned from building all this out

You can imagine that finding the right signal-to-noise ratio requires some experimentation, and a bit of prompt massaging. For us, having deterministic detectors has helped keep the signal-powered agents grounded on data we know we care about and expect to be continuously triaged.

Besides the utility of the MCP-first approach, Engineering Analytics's frontend UI has gained traction inside the DevEx team, primarily as a "one-stop shop" where we can get a useful, at a glance look across our ownership surfaces. Because of this, we are working on optimizing product performance by moving from ad-hoc queries into pre-computed tables and otherwise optimizing our queries whenever possible. As an added bonus from both UI and MCP sharing the query layer, optimizations here also benefit the performance of agents reaching for these tools.

Finally, once we had GitHub and related CI data ingested, the team has come up with other ways to build useful features around the data. As an example, we recently shipped a ["CI Explorer" feature](https://github.com/PostHog/posthog/pull/111949) that graphs out our CI workflows. It's a lot more intuitive (not to mention faster) than clicking around the static GitHub UI.

![CI Explorer navigating an open PR](https://res.cloudinary.com/dmukukwp6/video/upload/ci_explorer_demo_v3_ec20982dbc.mp4)

## How you can set up a self-improving CI yourself

We continue to shape Engineering Analytics as an internal beta product for now, but you can still get a lot of value out of your CI data today by using the PostHog data warehouse as an ingestion source and combining it with MCP and signals + scouts.

1. **Get your CI data into the warehouse.** Link the [GitHub source](/docs/cdp/sources/github) and sync the pull request, workflow run, and workflow job [tables](/docs/cdp/sources/github#supported-tables). Add [webhooks](/docs/cdp/sources/github#webhooks) to keep runs and jobs up to date in real time.

2. **Let your agent query it.** Connect your agent(s) to the [PostHog MCP](/docs/model-context-protocol#get-started-in-30-seconds) and try asking it something specific, like which CI workflow got slower this week.

3. **Make it self-driving.** [Set up self-driving](/docs/self-driving/setup) and [connect the GitHub app](/docs/libraries/github) so agents can open pull requests on your behalf. Then, try writing a [Scout](/docs/self-driving/scouts#built-in-and-custom-scouts) that watches your newly synced tables. Consider something like our deterministic detectors as a starting point, but there are more [ideas for custom scouts](/docs/self-driving/scout-examples#ideas-for-custom-scouts) in the docs.
