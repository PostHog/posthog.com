---
title: Plans and features
sidebar: Handbook
showTitle: true
---

The feature sets available in a PostHog instance depend on two factors: deployment type and plan.


### Cloud plans

There are two plans for cloud. Organizations without a credit card are defaulted onto the Free plan and limited to 10,000 monthly events. 

Organizations that add a credit card are moved to the Standard plan. This plan includes access to all Scale features and 1,000,000 free monthly events.


|                                             | Free  | Standard |
| :-----------------------------------------------------: | :----------: | :-----------: | 
|         Monthly free events           |  10,000 |       1,000,000      |          ✅          |      ✅       |
|         Core insights           |  ✅ |       ✅      |          ✅          |      ✅       |
|         Session recordings          |  ✅ |       ✅      |          ✅          |      ✅       |
|         Feature flags         |  ✅ |       ✅      |          ✅          |      ✅       |
|         Unlimited teammates           |  ✅ |       ✅      |          ✅          |      ✅       |
|         Multiple projects           | ❌ |       ✅      |          ✅          |      ❌       |
| Supports > 1M+ monthly tracked users        |  ✅   |       ✅      |          ✅          |      ❌       |
| ClickHouse based queries and funnel trends        |  ✅   |       ✅      |          ✅          |      ❌       |
| Advanced insights (paths, causal analytics)        |  ❌   |       ✅      |          ✅          |      ❌       |
|        Project-based permissions        | ❌ |       ✅      |          ✅          |      ❌       |
|           Google login              | ❌ |       ✅      |          ✅          |      ❌       |
|          Zapier and Slack integration            | ❌ |       ✅      |          ✅          |      ❌       |
|          Dashboards and collaboration             | ❌ |       ✅      |          ✅          |      ❌       |
|        Taxonomy           |  ❌   |       ✅      |          ✅          |      ❌       |
| Advanced paths functionality        |  ❌   |       ✅      |          ✅          |      ❌       |
| SAML        |  ❌   |       ❌      |          ✅          |      ❌       |



### Self-hosted plans

Open source, Scale, and Enterprise instances all deploy the same software with a different license key.

Self-hosted Postgres was deprecated in Spring 2021 and the software is incompatible with the 3 versions of ClickHouse-based self-hosted PostHog.

|                                             | Open source  | Scale | Enterprise | Postgres (deprecated) |
| :-----------------------------------------------------: | :----------: | :-----------: | :-----------------: |:------------: |
|         Core insights           |  ✅ |       ✅      |          ✅          |      ✅       |
|         Session recordings          |  ✅ |       ✅      |          ✅          |      ✅       |
|         Feature flags         |  ✅ |       ✅      |          ✅          |      ✅       |
|         Unlimited teammates           |  ✅ |       ✅      |          ✅          |      ✅       |
|         Multiple projects           | ❌ |       ✅      |          ✅          |      ❌       |
| Supports > 1M+ monthly tracked users        |  ✅   |       ✅      |          ✅          |      ❌       |
| ClickHouse based queries and funnel trends        |  ✅   |       ✅      |          ✅          |      ❌       |
| Advanced insights (paths, causal analytics)        |  ❌   |       ✅      |          ✅          |      ❌       |
|        Project-based permissions        | ❌ |       ✅      |          ✅          |      ❌       |
|           Google login              | ❌ |       ✅      |          ✅          |      ❌       |
|          Zapier and Slack integration            | ❌ |       ✅      |          ✅          |      ❌       |
|          Dashboards and collaboration             | ❌ |       ✅      |          ✅          |      ❌       |
|        Taxonomy           |  ❌   |       ✅      |          ✅          |      ❌       |
| Advanced paths functionality        |  ❌   |       ✅      |          ✅          |      ❌       |
| SAML        |  ❌   |       ❌      |          ✅          |      ❌       |
