---
date: "2026-10-08"
title: "We pointed PostHog at our own CI (and made it better)"
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

At PostHog, self-driving agents don't just work on product features and bug fixes; they can also push changes to our continuous integration (CI) and automated testing pipelines. We've set this up so that data from GitHub and other sources feed into our [data warehouse](/docs/data-warehouse), and then built a product called "Engineering Analytics" on top of this layer. Both humans and their agents can use Engineering Analytics to find and analyze issues in CI workflows, such as higher p90 week-over-week over a particular test suite.

In this post, I want to motivate the importance of treating your CI data as a valuable part of your software development lifecycle, especially when using agentic coding practices. I'll also explain why we built Engineering Analytics as both a visual human-friendly layer as well as an MCP agent-forward cache layer on top of this data. At the end, I hope to leave you with some ideas as to how you can get started making self-driving fixes and CI data work for you today!


## Example pull requests (PRs) a self-driving agent started and then we merged in

Here is a sample of Developer Experience fixes that were spun up by our self-driving flows:

1. [Fixing a failing CI](https://github.com/PostHog/posthog/pull/95630) - a WebKit Storybook shard was failing on every push to our default branch
2. [Deflaking a Rust test job](https://github.com/PostHog/posthog/pull/75826) - the job failed and then passed on a rerun of the same commit twice in a week (two tests were racing over shared tracing state)
3. [Speeding up a check on every pull request](https://github.com/PostHog/posthog/pull/95082) - a job installed the whole workspace before a dry run that reads no dependencies. After the fix, the whole job takes 33 seconds (down from a median of 51s)

We've shipped more than a dozen related improvements since.

## How CI became a bottleneck

PostHog engineers ship a lot of product features and fixes at a rapid pace, and that pace has only accelerated in recent months due to LLM adoption. A portion of this acceleration can be attributed to ["self-driving"](/docs/self-driving) pull requests, which are opened autonomously by the PostHog app itself after its [scouts](/docs/self-driving/scouts) (basically configurable, scheduled agents that explore your product data) find something worth acting on and changing. These findings (along with their evidence) are called ["signals"](/docs/self-driving/signals). All this taken together means that AI-powered agents are continuously monitoring and pushing new pull requests into our codebase.

Those of us in the [Developer Experience team](/teams/developer-experience) have a goal to ensure that we can support 10,000 pull requests a month (!), and make that experience as comfortable as possible while balancing code quality and (hopefully!) without sacrificing CI stability.

> PS: For more on this goal, check out the [10,000 PRs a month is easy](/blog/10k-prs-a-month) blog post.

Naturally, we decided to fight fire with fire 🔥. Today, our CI workflows and other related surfaces (such as automated testing) also use self-driving improvement capabilities. Let's talk about how we managed to set this all up, starting with the most important part: the data!

## Step 1: get the data out of GitHub

At PostHog, we're proud to be open source and use [GitHub to host our monorepo](https://github.com/PostHog/posthog). This means most of our CI-related data lives on GitHub and is easily queryable from there. Of course, there are rate limits to consider and, in any case, it would be really wasteful to constantly query GitHub for unchanging data (think last week's merged PRs and completed workflow runs). But above all else, we're a data company! So we decided to get this data into our product and query it from there.

For this, we used our data warehouse [GitHub source](/docs/cdp/sources/github), which syncs repository data into our warehouse. Specifically, we are interested in pull request, workflow runs, and workflow jobs data.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/github_source_setup_light_799bd72915.png"
  alt="The form for linking GitHub as a data warehouse source in PostHog, with fields for authentication type, GitHub account, repositories, and table name prefix"
  classes="rounded"
/>

<Caption>Linking GitHub as a data warehouse source. Some account details are removed from this screenshot.</Caption>

## Step 2: add a queryable layer on the data (that agents can reach for)

Before we set out to build Engineering Analytics, we considered existing products that analyze CI data and help DevEx teams better understand developer behavior and pain points. But we found that most were built around the idea of measuring engineering team productivity, and that's not what we were most interested in. The core vision of our Engineering Analytics product can be found in the [source code's README.md](https://github.com/PostHog/posthog/blob/master/products/engineering_analytics/README.md#the-one-sentence-version):


> It's product analytics, but the "users" are pull requests and the "events" are what happens to them on the way to production.

So ultimately, we decided to try and build this out ourselves, especially since we could re-use a lot of the existing primitives and data best practices found across other PostHog products.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/ea_overview_light_5205e207b6.png"
  alt="The Engineering Analytics overview, showing CI pass rate, median time from push to all checks green, CI spend per merged PR, and CI duration per commit on master"
  classes="rounded"
/>

<Caption>Engineering Analytics overview for our monorepo. The numerical figures are made up for this post.</Caption>


Underneath the hood, the Engineering Analytics product is mainly a consolidated view into most of our DevEx surface: our CI system, the merge queue, and tests. But it also powers MCP and optimized queries to help us debug issues in CI and slow tests.

Besides being a useful place for humans (any interested PostHog engineer) to quickly get a general sense for CI health, we built Engineering Analytics to have MCP support from the start so that our agents could query for specific data when investigating CI troubles or looking for optimization opportunities. This way we don't have to rely on the GitHub API and can also better control the resulting experience. We use [skills](https://github.com/PostHog/posthog/tree/master/products/engineering_analytics/skills) for agentic steering here as well.

<!-- ### How we use Engineering Analytics at PostHog


```bash
hogli posthog:login     # sign in once, in your browser
hogli posthog:status    # which host, which scopes, how long the token has left
hogli posthog:logout    # revoke and forget the credential
```

```
$ hogli posthog:status
host           https://us.posthog.com
client         https://us.posthog.com/api/oauth/hogli/client-metadata
scopes         engineering_analytics:read
access token   expires in 18h, refreshable
```

```bash
hogli ci:insights
hogli ci:insights search "<error>"
hogli ci:insights view <ref> --logs
```
-->

## Step 3: make it self-driving

Engineering Analytics is also a source of signals. We decided to start with three deterministic detectors that run over the GitHub data (each one is a plain query with thresholds):

- **Flaky check**: a job that fails and then passes on a rerun of the same commit.

- **Broken default branch**: a workflow that keeps failing on our main branch.

- **Duration regression**: a workflow that got slower than it was in a previous window.

In fact, the three self-driving pull requests mentioned at the top of this blog post came from each of these detectors (one per detector)!

## What you can do today

We continue to shape Engineering Analytics internally for now, but most of the value around using your CI data and empowering your agents you can get today by using the PostHog data warehouse.

[TODO: i wanna write more here...]

Check out [the self-driving product post](/blog/self-driving-product) to learn more about how PostHog can help you ship autonomously.
