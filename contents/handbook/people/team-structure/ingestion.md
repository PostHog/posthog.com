---
title: Team Ingestion
sidebar: Handbook
showTitle: true
hideAnchor: true
---

Team ingestion is part of the [Platform team](/handbook/people/team-structure/platform) at PostHog.

## People

- Tiina Turban (Full Stack Engineer)
- Yakko Majuri (Full Stack Engineer)

## Mission statement

Provide the best events pipeline in the world.

## Responsibilities

Team Ingestion owns our ingestion pipeline end-to-end. That means we own the Django server ingestion API, the ingestion (plugin) server, as well as our client libraries, Kafka and ClickHouse setup, where it pertains to event ingestion.

Our work generally falls into one of three categories:

### Scaffolding to support core PostHog features

In order to achieve company goals or introduce new features (often owned by other teams), changes to our ingestion pipeline may be required.

An example of this is the work to remodel our events to store person and group data, which is essential to ensuring we can provide fast querying for users.

While querying data is not owned by this team, the change to enable faster queries inevitably requires a large restructuring of our events pipeline, and thus we are owners of that component of the project.

In short, a core responsibility of our team is to enable other teams to be successful.

### Ingestion robustness

On the road to providing the best events pipeline in the world, we need to build a system that is robust. 

To do so, we must ensure:

- **Reliability:** We should not lose events and events ingested should be correct
- **Scalability:** We should be able to scale to massive event volumes
- **Maintainability:** It should be easy to debug and contribute to our ingestion pipeline

Thus, it is our responsibility to consistently revise our past decisions and improve processes where we see fit, from client library behaviors to ClickHouse schemas.

### Extensibility

Our ingestion pipeline is powerful because it allows for plugins to be built on top of it, to do things like transform and export events, and well as import data from third parties.

It is our responsibility to ensure that the extensibility of the pipeline does not interfere with ingestion robustness, as well as:

- Build new features to support plugin developers in building more powerful tools
- Ensure a delightful experience for plugin developers

## Roadmap

### 3-year

#### Scaffolding to support core PostHog features

- Events are ingested and visible in app within 5 seconds p99

#### Ingestion robustness

- Ingest events out of order
- No events left behind (99.99%)
- All events are correct (99.99%)
- The pipeline scales perfectly linearly and intercept is low (smallest instance runs on $5 node)

#### Extensibility

- Integrated delightful plugin developer experience (inside PostHog)
    - CI/CD
    - Testing
    - Synthetic data testing
- Majority of users are using PostHog for their ETL / reverse-ETL workloads 

### 6 months

#### Scaffolding to support core PostHog features

- Scalable to 1Bn Persons 🎉
- Events are ingested and visible in app within 30 seconds p99

#### Ingestion robustness

- Ingestion monitoring and management
    - Runbooks, dashboards, and alerts in Grafana on cloud and on self hosted


#### Extensibility

- Easy to build a well tested plugin (DevEx)
    - Documentation
    - GitHub Template
        - Unit tests
        - Style


## How do we work?

We run a quick 15min standup on Monday, Wednesdays, and Fridays, and extend the slot if we feel the need to have a longer synchronous discussion about a specific topic. We document every standup on [this doc](https://docs.google.com/document/d/1iHeef4lWQ4rSBXmaM6A9_GHmARXax7If4B0duo8gFSE/edit?usp=sharing).

We are happy to sync anytime if we feel it is important to do so. This is generally coordinated on Slack where someone will spontaneously drop a Zoom link. Some of the reasons we sync include: debugging outages, sharing context (including shadowing), making decisions when there's been a deadlock, and pairing sessions.

We work as a team. Our priorities are owned by the team, and we work together towards the same overall goal every sprint. It is inevitable that sometimes tasks will fall on one person or another, but we try hard to share context and collaborate as much as possible. 


## Slack channel

[#team-ingestion](https://posthog.slack.com/messages/team-ingestion)
