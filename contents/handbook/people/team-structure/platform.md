---
title: Team Platform
sidebar: Handbook
showTitle: true
hideAnchor: true
---

![Image of Cloud Infrastructure](https://github.com/PostHog/posthog-cloud/blob/master/docs/images/infra.png?raw=true)

## People

[See team structure page](/handbook/people/team-structure/team-structure)

## Mission

Make deploying, scaling and managing PostHog easy

## Goals & Key Results

* PostHog is the easiest self-hosted product to deploy and scale in the world
    * Result: Volume of clients requring help @marcushyett-ph
    * Result: % of successful installs / upgrades @guidoiaquinti
    * Result: Max size of operating instances @fuziontech
    * Montior: % of users on latest version of PostHog @tiina303
    * Result: We don't lose customers because we can't scale enough (shared with Core Analytics) @marcushyett-ph
* Move all posthog-supported instances to self-hosted
    * Result: No alerts come to us from customer-instances
* All valid events are ingested correctly
    * Result: Time ingestion is down on cloud (from alert) @fuziontech
    * Result: Lost events between ingress and clickhouse @fuziontech
* Data is as up to date as possible
    * Result: Latency between ingress and clickhouse @fuziontech
* A good experience for plugin developers
    * Result: Good docs, alerting, debugging and testing @yakkomajuri

## Scope
In Scope
  * Deploying and managing Posthog (Cloud + Self-hosted)
  * Scaling posthog (Cloud + Self-hosted)
  * Infrstructure for migrations on Clickhouse
  * Ingestion, libraries and plugins (contentious)

Out of Scope
  * Developer Experience
  * Expanding the plugins library
  * Writing analytics queries for performance and table schemas

## How we work?
* Pairing at least two people on one goal/project - not having a single person alone working on a goal
* The board should be our source of truth
* We document what we do to share context internally
* We finish what we start, or we don't start it at all
* We continually prioritize
* We prioritize ublocking others
* We have an agenda and follow up on actions from our meetings
* Be frugal

## Slack channel

[#team-platform](https://posthog.slack.com/messages/team-platform)
