---
title: Team Platform
sidebar: Handbook
showTitle: true
hideAnchor: true
---

## People

[See team structure page](/handbook/people/team-structure/team-structure)

## Mission

Make using and developing for PostHog as reliable as running water. Wherever you want it.

## Goals 

- We don't lose events
- Data is as up to date as possible
- Engineers always are able to ship and build
- Fail fast. Fix faster.
- Ship anywhere
- Infrastructure scales with demand
- Enable developers to extend PostHog as a Platform
- Support Small Teams (and contributors) in building and debugging PostHog
- Be frugal.

## Responsibilities
Concrete things we take responsibility over:

- [app.posthog.com](https://app.posthog.com) and its infrastructure
- On Prem & Single Tenant deployments
- CI/CD - How we deploy
- Data infrastructure (ClickHouse, Kafka)
- Monitoring and Alerting stack
- Event ingestion
- Extensibility: Plugin server, plugins, and libraries

## Customer

- Other Small Teams in making sure they have the tools (databases, queues, etc) and the ability to deploy effortlessly that they need to build
- Self deployed teams
- app.posthog.com users

## Metrics

### Self Deploy 
###### Retention 
- Metric: Retention
- Objective: Better than cloud
###### Ease of deploy 
- Metric: NPS on survey of how install experience was
- Objective: NPS of > 8
### Cloud
###### Data Loss
- Metric: % of events dropped 
- Objective: < 0.01%
###### Uptime SLO 
- Metric: Uptime
- Objective: > 99.99%
##### Cost 
- Metric: Infra Costs 
- Objective: Our costs should grow at a rate that is sublinear relative to scale

## Slack channel

[#team-deployments-and-infrastructure](https://posthog.slack.com/messages/team-deployments-and-infrastructure)
