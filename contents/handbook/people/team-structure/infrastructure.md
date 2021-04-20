---
title: Team Infrastructure & Deployments
sidebar: Handbook
showTitle: true
hideAnchor: true
---

![Image of Cloud Infrastructure](https://github.com/PostHog/posthog-cloud/blob/master/docs/images/infra.png?raw=true)

## People

- [James Greenhill](/handbook/company/team/#james-greenhill-software-engineer) (Team lead, Data/Infra Engineer)
- [Karl-Aksel Puulmann](/handbook/company/team/#karl-aksel-puulmann-software-engineer) (Full Stack Engineer)

## Mission

Make using and developing for PostHog as reliable as running water. Wherever you want it.

## Responsibilities

- We don't lose events
- Data is as up to date as possible
- Engineers always be able to ship and build
- Fail fast. Fix faster.
- Ship anywhere
- Stack performs at speed of click
- Support Small Teams (and contributors) in building and debugging Posthog

## Customer

- Other Small Teams in making sure they have the tools they need to build
- End users (Teams building products and using Posthog for Product Analytics)
- Single tenant customers such as VPC deployment users

## Output metrics

- VPC
  - Metric: Retention
  - Objective: Better than cloud
- Cloud
  - Metric: Data loss %
  - Objective: < 0.1%
  - Metric: Uptime
  - Objective: > 99.99%
  - Metric: Speed
  - Objectives
    - Event ingestion: TBD
    - Query response: TBD
    - Overall: Events should be ingested as we scale and infra should facilitate analytics at speed of click
  - Metric: Infra Costs 
  - Objective: Our costs should grow at a rate that is sublinear relative to scale
- Dev Experience
  - Metric: Developer experience (relating to infra) (maybe NPS?)
  - Objective: TBD (maybe NPS?)

## Slack channel

[#team-deployments-and-infrastructure](https://posthog.slack.com/messages/team-deployments-and-infrastructure)
