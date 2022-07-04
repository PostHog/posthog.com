---
title: Team Infrsstructure
sidebar: Handbook
showTitle: true
hideAnchor: true
---

## People

- James Greenhill (Team lead, Data/Infra Engineer)
- Guido Iaquinti (Site Reliability Engineer)
- Harry Waye (Full Stack Engineer)

## Mission Statement
Make deploying, scaling, and managing PostHog easy, fast, and reliable.

## Q3 2022 Goals
* **Proposed Objective**:
    * Lots of customers are self-serving PostHog Cloud in the EU
* **Proposed Key Results**:
    * >100 organizations using EU hosted PostHog Cloud
    * All deployment methods are support the latest stable versions of dependencies (so we can leverage the benefits of later versions)
    * Meet SOC 2 compliance requirements for all cloud infrastructure
* **Rationale**:
    * To nail self-serve we need to make it as easy as possible for customers to sign up and get started
    * For businesses in the EU today, the main barrier is needing to self host to keep data in the EU, this limits trust in our brand and the potential adoption we can drive
    * Shipping a secure cloud in the EU will also encourage many businesses to get started with PostHog Cloud, even if they ultimately intend to self-host
  
### Roadmap

#### 3-year

- All infrastructure is managed as code
- Cloud is global
- Best in class security and privacy compliance
- Scale beyond 1 Trillion events / month
- Support Non-Cube Deploys 🤖

#### 6 month

- No Heroku
- ClickHouse Upgraded
- Good logging and monitoring
- 5 Billion / month events
- SOC 2 Ready
- All infra is managed as code on prod / staging + EU Ready 🎈

## Slack channel

[#team-platform](https://posthog.slack.com/messages/feat-helm-and-tooling)
diff --git a/src/sidebars/sidebars.json b/src/sidebars/sidebars.json
