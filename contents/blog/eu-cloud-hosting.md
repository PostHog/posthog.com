---
date: 2022-10-17
title: How we built EU Cloud hosting, from idea to launch
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["Inside PostHog", "Startups"]
author: ["ian-vanagas"]
featuredImage: ../images/blog/posthog-eu-blog.png
featuredImageType: full
---

We recently launched PostHog Cloud EU, which provides all the benefits of a cloud-hosted PostHog, but keeps data in the EU. We thought it would be interesting to go over why and how we built PostHog Cloud EU, from idea to launch.

## Why EU Cloud hosting?

PostHog provides self-hosting options. Anyone can use PostHog and manage the infrastructure entirely how they want. This enables them to be more compliant with relevant laws in their industry or region. One of the big laws which teams across Europe need to comply with is [GDPR](/docs/integrate/gdpr) (General Data Protection Regulations). Any time you see one of those annoying cookie banners, you’re seeing the results of GDPR. 

GDPR requires that data for users in the EU must be stored in the EU. Because most products online have users in the EU, this requires them to do so. Not doing so could risk legal action (if this concerns you, talk to a lawyer; we are not lawyers and this is not legal advice). 

Basically, we wanted to provide the benefits of cloud management with the compliance of EU data hosting. We had many PostHog users asking for it too. This is where EU Cloud was born.

## Making it happen

Our team did a lot of work on the infrastructure side to make our EU Cloud viable before considering building it as a feature, specifically [Team Infrastructure](/handbook/small-teams/infrastructure). 

They continually improved the infrastructure to make deploying, scaling, and managing PostHog easy, fast, and reliable. These improvements lead to the work on EU Cloud, and what you’ll read below benefitted a lot from it.

## Picking a region and domain

Once we made the decision to build EU Cloud, our team looked at the infrastructure needed and started making key decisions. An early and important one was picking a region of AWS. They recommended and choose `eu-central-1` because:

- it is the best region performance-wise (max 30ms roundtrip for anyone in Europe)
- it is one of the best regions from an AWS service-offering perspective
- it is one of the cheapest AWS regions in the area
- German customers are often most demanding from a privacy/compliance perspective; hosting in Germany helps

Next was choosing a domain. Our team initially thought to use `posthog.eu` but that raised concerns about cross-domain tracking and SEO. It also potentially limited future expansion. Another proposal was to use a longer domain like `app.eu-central-1.posthog.com`but this was too long. Just keeping `app.posthog.com` and redirecting traffic was also an option, but there was complexity around accounts in multiple organizations and sign in.

Eventually, we settled on `eu.posthog.com`. It is short, memorable, and allows for other regions to follow in the future.

> Have opinions on where we should host in the future? We’d love to hear them. Let us know in our [Community Slack](/slack).

## Setting up key infrastructure

As mentioned before, because the Infrastructure Team had done a lot of work at improving the deployment, scaling, and managing of infrastructure recently, the process of setting up key infrastructure was easier. Structuring PostHog to be easy to deploy and scale is important because, PostHog is designed to allow for self-hosting.

As work was starting, Guido from our team said: 

> "Spinning up PostHog Cloud EU feels (at least to me) a bit like playing with Lego. It’s incredibly satisfying to see the effort we put in over the last months designing and building those pieces is finally paying off."

One of the first steps was splitting the production integration and deployment pipeline from US Cloud. Next was setting up and configuring the key infrastructure for PostHog such as ClickHouse, Kafka (with AWS MSK), Redis, ZooKeeper, Kubernetes (AWS EKS), and more. See our docs on [how PostHog works](/docs/how-posthog-works) for more details.

They made some slight changes, moving the database from Heroku to AWS RDS (Relational Database). This is better future-proofing, as Heroku has scaling limits and is difficult to migrate from. Other changes led to upgrades, like more shards in our ClickHouse cluster, allowing for easier scaling in the future.

## Dealing with infrastructure challenges

The first key challenge was separating correctly from US Cloud to ensure changes wouldn’t break both. EU Cloud needed a recreated CI/CD pipeline separate from the US Cloud one. For example, moving from Heroku to AWS RDS required changes to the deployment pipeline.

A stranger challenge was getting SSL certificates. CloudFront only supports certificates from `us-east-1` as the control plane is regional despite being a global service ([more details](https://aws.amazon.com/premiumsupport/knowledge-center/migrate-ssl-cert-us-east/)). This required some reconfiguring, but once we realized it, it was a quick change.

Billing required a significant amount of work to get working on EU Cloud because it needed different configurations for EU vs US. The test, production, EU, and US instances needed extra environment variables to configure and we tweaked settings multiple times before it worked. 

Other sticking points included getting AWS SES (Simple Email Service) approval, ensuring correct ClickHouse configuration, automating deployments, and more. 

## Getting signups

The driving force behind EU Cloud is customer demand. Before starting work, we already had companies interested. As it progressed, those companies made firmer commitments, mainly, being a part of the beta. In our [Customer Success](/handbook/small-teams/customer-success) team’s conversations, they continued to generate demand for an EU Cloud.

This led to us creating a waitlist which users could sign up to via a custom landing page. Whenever we mentioned an EU Cloud option or GDPR requirements, we pointed users to this landing page.

One important area of conversation was the scale of events EU Cloud could handle. The Customer Success and Infrastructure teams were in close communication to make sure the right expectations were set. Some PostHog users were expected to send a large number of events immediately after launch. Ensuring the infrastructure could handle it was critical. 

## Final tests

EU Cloud leverages the same tests NA Cloud does. As changes came into the core app, the team monitored that they worked well. For example, Team Infrastructure worked with Team Pipeline to ensure key migrations completed properly on EU Cloud. More work went into ensuring deployments were increasingly automated.

We ran speed tests and and found our EU Cloud was significantly faster (up to 70%) for EU customers than our NA Cloud.

Finally, before rolling out fully, the team tested with actual users over a few weeks before launch. They started with the smallest customer on the list and worked their way up to larger ones. When these users had no issues, the team knew they were good for launch.

## Launch

There was some final work from our website and docs team to create banners, the [landing page](/eu), and all the beautiful EU hedgehog art. Our Marketing team worked on [blogs](/blog/posthog-cloud-eu), [tutorials](/tutorials/migrate-eu-cloud), emails, and more content for launch. We also made changes to the signup process, allowing users to pick their region during the signup process.

Once ready, the team merged PRs, activated feature flags, sent emails, and monitored activity. You can see the [result here](/eu) or [signup for EU Cloud](/signup) right now. We have (and will) continue to make improvements. If you have feedback or recommendations, let us know in our [Community Slack](/slack) or open an issue in [GitHub](https://github.com/PostHog/posthog).

<GDPRForm />
