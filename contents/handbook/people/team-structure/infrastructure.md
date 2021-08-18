---
title: Team Infrastructure & Deployments
sidebar: Handbook
showTitle: true
hideAnchor: true
---

![Image of Cloud Infrastructure](https://github.com/PostHog/posthog-cloud/blob/master/docs/images/infra.png?raw=true)

## People

- [James Greenhill](/handbook/company/team#james-greenhill-software-engineer) (Team lead, Data/Infra Engineer)
- [Karl-Aksel Puulmann](/handbook/company/team#karlaksel-puulmann-software-engineer) (Full Stack Engineer)
- [Tiina Turban](/handbook/company/team#tiina-turban-software-engineer) (Full Stack Engineer)

## Mission

Make using and developing for PostHog as reliable as running water. Wherever you want it.

## Goals 

- We don't lose events
- Data is as up to date as possible
- Engineers always be able to ship and build
- Fail fast. Fix faster.
- Ship anywhere
- Stack scales with demand
- Support Small Teams (and contributors) in building and debugging Posthog
- Be frugal.

## Responsibilities
Concrete things we take responsibility over:

- [app.posthog.com](https://app.posthog.com) and its infrastructure
- On Prem & Single Tenant deployments
- CI/CD - How we deploy
- Data infrastructure (ClickHouse, Kafka)
- Monitoring and Alerting stack

## Customer

- Other Small Teams in making sure they have the tools (databases, queues, etc) and the ability to deploy effortlessly that they need to build
- End users (Both cloud and on-prem teams)

## Output metrics

### VPC
###### Retention 
- Metric: Retention
- Objective: Better than cloud
### Cloud
###### Data Loss
- Metric: Data loss %
- Objective: < 0.1%
###### Uptime 
- Metric: Uptime
- Objective: > 99.99%
###### Speed 
- Metric: Speed
- Objectives
  - Event ingestion: TBD
  - Query response: TBD
- Overall: We should anticipate increasing demand (either manually or automatically)
##### Cost 
- Metric: Infra Costs 
- Objective: Our costs should grow at a rate that is sublinear relative to scale
### Dev experience
##### Dev experience NPS (Infra)
- Metric: Developer experience (relating to infra) (maybe NPS?)
- Objective: TBD (maybe NPS?)

## Slack channel

[#team-deployments-and-infrastructure](https://posthog.slack.com/messages/team-deployments-and-infrastructure)
