---
title: Team Platform
sidebar: Handbook
showTitle: true
hideAnchor: true
---

## People

[See team structure page](/handbook/people/team-structure/team-structure)

# Platform Sub-Team Mission Statements

## Ingestion

**Provide the best events pipeline in the world.**

## Infrastructure

**Make deploying, scaling, and managing PostHog easy, fast, and reliable.**

# Roadmap

## Ingestion

### 3 year

- Ingest events out of order
- No events left behind (99.99%)
- All events are correct (99.99%)
- The pipeline scales perfectly linearly and intercept is low (smallest instance runs on $5 node)
- Events are ingested and visible in app within 5 seconds p99
- Integrated delightful plugin developer experience (inside PostHog)
    - CI/CD
    - Testing
    - Synthetic data testing
- Majority of users are using PostHog for their ETL / reverse-ETL workloads 

### 6 months

- Scalable to 1Bn Persons 🎉
- Ingestion monitoring and management
    - Runbooks, dashboards, and alerts in Grafana on cloud and on self hosted
- Events are ingested and visible in app within 30 seconds p99
- Easy to build a well tested plugin (DevEx)
    - Documentation
    - GitHub Template
        - Unit tests
        - Style

## Infrastructure

### 3 year

- All infrastructure is managed as code
- Cloud is global
- Best in class security and privacy compliance
- Scale beyond 1 Trillion events / month
- Support Non-Cube Deploys 🤖

### 6 month

- ClickHouse Upgraded
- Good logging and monitoring
- 5 Billion / month events
- SOC 2 Ready
- All infra is managed as code on prod / staging + EU 🎈

## Scope
In Scope
  * Deploying and managing Posthog (Cloud + Self-hosted)
  * Scaling posthog (Cloud + Self-hosted)
  * Infrastructure for data migrations (for ClickHouse, PostgreSQL, Kafka,...)
  * Ingestion, libraries and plugins (contentious)

Out of Scope
  * Developer Experience
  * Expanding the plugins library
  * Writing analytics queries for performance and table schemas

# How we work?
* Pairing at least two people on one goal/project - not having a single person alone working on a goal
* The board should be our source of truth
* We document what we do to share context internally
* We finish what we start, or we don't start it at all
* We continually prioritize
* We prioritize ublocking others
* We have an agenda and follow up on actions from our meetings
* Be frugal

# Slack channel

[#team-platform](https://posthog.slack.com/messages/team-platform)
