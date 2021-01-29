---
title: Deployment Strategy
sidebar: Handbook
showTitle: true
---

The way we deploy is a key _product_ decision.

* 'Cloud' = PostHog Cloud, we host it for you in *PostHog's* AWS
* 'Private Cloud' = You host it, we manage it in your AWS / GCP without needing access to your data
* 'On Premise' = You host it on your own physical servers / somewhere that PostHog can't maintain it for you remotely

We prioritize like this, where 1 = top priority.

<span class="table-borders">

| | Individuals (Free) | Team (small _or_ big company) | Enterprise (department-wide) |
|---|---|---|---|
|Cloud|1|5|6|
|Private Cloud||2|3|
|On Premise|4|||

</span>

## Why prioritize this stuff at all?

* Ruling some things out will reduce headaches with deployment.
* Prioritizing helps us know how to recommend customers get started. A couple of examples:
  * Sales: this shows we shouldn't try to land an entire enterprise first, we should encourage some product usage first at a team or even individual level. This will mean we can close small deals quickly, build momentum and over deliver. This is what we consider best practise.
  * UX: how we guide users in our marketing campaigns, on our website, and in our product itself.

## Why not just focus on the on premise offering?

It is *tempting* to focus on individual users and enterprises both on premises since that's where we are the most different to anything else out there and where the most demand currently comes from. There are examples of companies that have been successful doing this.

The problem we see with this approach is that it limits us based on the technology of our customer with the worst stack. In practise, even though it seems simpler, it would lead to a significant amount of services work trying to implement and maintain everything.

If we can great at converting individuals using PostHog into a small paying team, then to conquer an enterprise, we will end up with a better long term business, and a much nicer place to work. 

## How can you compete against the other analytics providers in cloud?

We have a *platform*, not a product. That means we do more stuff in one place - PostHog provides product analytics, feature flags, session recording, heatmaps, and plugins.

Our target users do not have deep needs, they have simple, broad requirements to understand and act on user behavior to increase the chance of their product's success.

## Why prioritize individual Cloud usage?

Everything starts with the first user. We want customers saying they've already tried it and love the product but they need more powerful functionality.

These users fall into two categories:

* Enthusiasts = people who are *happy* to have some pain in deployment, as they love open source, trying out new products, and contributing. These people are likely to be pursuing a hobby or sideproject, or do not have significant external pressure to get analytics in place.
* Visionaries = people who *don't like* the hassle of deploying and running PostHog, but love the direction of the company, want the ability to customize a little if needed (ie through plugins). These people are likely to work in companies and have a job to get done with a time limit.

So, which deployment method to prioritize?

If we picked private cloud, it's unrealistic that an individual user will want to pay for the cost of running ClickHouse. THat leaves cloud and on premise.

The reason for putting Cloud top is that the migration path from there to Team (either of which are ClickHouse offerings) is simpler - with no need to migrate data from Postgres. This will suit visionaries who love how as they get more serious they *could* move to a Private Cloud (privacy friendly) deployment, and which would scale to huge volumes in future easily.

On premise is next as we've seen this suits enthusiasts the most - people who want to tinker and deploy in unusual ways on lower volume applications. If someone is pragmatic enough to want us to maintain their deployment for them in their private cloud, they'd probably just go with PostHog Cloud. The other use for on premise is often an individual developer in an enterprise who wants to try something out locally first.

## Why even offer Cloud for Team and Enterprise?

This allows us to dogfood our private cloud deployments, and improves overall product quality.

There are also likely to be some users who will turn out not to want the slight extra complexity of a private cloud deployment.

## Why don't you offer on premise to teams or enterprises?

This will mean we can go at the pace of our customer with the worst stack, and will cause long term issues managing lots of deployments without access, and will force us to invest in services rather than software.