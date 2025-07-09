---
title: Feature ownership
sidebar: Handbook
showTitle: true
---

Each feature at PostHog has an Engineering owner. This owner is responsible for maintaining the feature (keep the lights on), championing any efforts to improve it (e.g. by bringing up improvements in sprint planning), [planning launches](/handbook/words-and-pictures/product-announcements) for new parts of it, and making sure it is well documented.

When a bug or feature request comes in, we tag it with the relevant label (see labels below). The owner is responsible for then prioritizing any bug/request that comes in for each feature. This does not mean working on every bug/request, an owner can make the deliberate decision that working on something is not the best thing to work on, but every request should be looked at.


## Feature list

You can also view the list [directly in GitHub](https://github.com/PostHog/posthog/labels?q=feature%2F) and filter issues there.

| Feature |  Owner  |  Label  |
|---|---|---|
| Actions | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/actions</span> |
| Annotations | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/annotations</span> |
| API Structure | Shared responsibility. Features owned by the relevant Small Team. | <span class="lemon-tag gh-tag">feature/api-structure</span> |
| Async migrations | [Team CDP][Team CDP]  | <span class="lemon-tag gh-tag">feature/async-migrations</span> |
| Authentication | [Team Infrastructure][Team Infrastructure]  | <span class="lemon-tag gh-tag">feature/authentication</span> |
| Batch exports | Team Batch Exports | <span class="lemon-tag gh-tag">feature/batch-exports</span> |
| Billing | [Team Billing][Team Billing]  |  <span class="lemon-tag gh-tag">feature/billing</span> |
| Client libraries and SDKs | Shared responsibility with features owned by the relevant Small Team, or try #feature-client-libraries. There is an engineer assigned to SDK support on a rotating schedule. Check [the (private) pager duty schedule](https://posthog.pagerduty.com/schedules#P7B7NTR)  | <span class="lemon-tag gh-tag">feature/pipeline</span> |
| Cohorts | [Team Feature Flags][Team Feature Flags]  |  <span class="lemon-tag gh-tag">feature/cohorts</span>  |
| CRM | [Team CRM][Team CRM]  |  <span class="lemon-tag gh-tag">feature/crm</span>  |
| Dashboards | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/dashboards</span> |
| Data Management | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/data-management</span>  |
| Data Visualization | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/data-visualization</span>  |
| Data Pipelines | [Team CDP][Team CDP] | <span class="lemon-tag gh-tag">feature/pipeline</span> |
| Data Warehouse | [Team Data Warehouse][Team Data Warehouse]  | <span class="lemon-tag gh-tag">feature/data-warehouse</span> |
| Error tracking | [Team Error Tracking](/teams/error-tracking)  |  <span class="lemon-tag gh-tag">feature/error-tracking</span>  |
| Sentry integration | [Team Error Tracking](/teams/error-tracking)  |  <span class="lemon-tag gh-tag">feature/error-tracking</span>  |
| Activity view | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/events</span>  |
| Experimentation | [Team Experiments](/teams/experiments) |  <span class="lemon-tag gh-tag">feature/experimentation</span> |
| Early Access Features | [Team Feature Flags][Team Feature Flags] | <span class="lemon-tag gh-tag">feature/feature-flags</span> |
| Feature Flags | [Team Feature Flags][Team Feature Flags]  |  <span class="lemon-tag gh-tag">feature/feature-flags</span> |
| Group Analytics | [Team CRM][Team CRM]  |  <span class="lemon-tag gh-tag">feature/group-analytics</span> |
| HogQL | [Team Data Warehouse][Team Data Warehouse]  |  <span class="lemon-tag gh-tag">feature/dashboards</span> |
| Heatmaps | [Team Replay][Team Replay] | <span class="lemon-tag gh-tag">feature/heatmaps</span> |
| Ingestion | [Team Ingestion][Team Ingestion]  | <span class="lemon-tag gh-tag">feature/team-ingestion</span> |
| Insights | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/insights</span>  |
| SQL Insights | [Team Data Warehouse][Team Data Warehouse]  |  <span class="lemon-tag gh-tag">feature/sql-insights</span> |
| Internal Messaging (Email, Notifications) | [Team Platform Features][Team Platform Features]  | <span class="lemon-tag gh-tag">feature/notifications</span>  |
| Live Events | [Team ClickHouse][Team ClickHouse]  | <span class="lemon-tag gh-tag">feature/live-events</span>  |
| MCP Server | [Team Growth][Team Growth]  | <span class="lemon-tag gh-tag">feature/mcp</span>  |
| Messaging | [Team Messaging][Team Messaging]  | <span class="lemon-tag gh-tag">feature/messaging</span>  |
| Table exports | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/table-exports</span> |
| Notebooks | [@daibhin][@daibhin]  |  <span class="lemon-tag gh-tag">feature/notebooks</span> |
| Onboarding | [Team Growth][Team Growth]  | <span class="lemon-tag gh-tag">feature/onboarding</span>  |
| Permissions and access control | [Team Platform Features][Team Platform Features]  | <span class="lemon-tag gh-tag">feature/permissions</span>  |
| Persons | [Team Ingestion][Team Ingestion]  | <span class="lemon-tag gh-tag">feature/persons</span>  |
| Pipeline Transformations | [Team CDP][Team CDP] | <span class="lemon-tag gh-tag">feature/pipelines</span> |
| Pipeline Destinations | [Team CDP][Team CDP] | <span class="lemon-tag gh-tag">feature/cdp</span> |
| Pipeline Sources | [Team Data Warehouse][Team Data Warehouse] | <span class="lemon-tag gh-tag">feature/pipelines</span> |
| Platform (US + EU) | [Team Infrastructure][Team Infrastructure] | <span class="lemon-tag gh-tag">feature/platform</span>  |
| Project Home Page | [Team Growth][Team Growth]  | <span class="lemon-tag gh-tag">feature/home</span> |
| Property Filters | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/filters</span>  |
| Queries as a Service | [Team Data Warehouse][Team Data Warehouse]  | <span class="lemon-tag gh-tag">feature/qaas</span>  |
| Quota limiting | [Team Billing][Team Billing] / [Team Platform Features][Team Platform Features]  | <span class="lemon-tag gh-tag">feature/quota-limiting</span>  |
| Revenue Analytics | [Team Revenue Analytics][Team Revenue Analytics] | <span class="lemon-tag gh-tag">feature/revenue-analytics</span>  |
| Revenue Data Management | [Team Revenue Analytics][Team Revenue Analytics] | <span class="lemon-tag gh-tag">feature/revenue-data-management</span>  |
| Replay | [Team Replay][Team Replay]  |  <span class="lemon-tag gh-tag">feature/replay</span> |
| Security | [Team Infrastructure][Team Infrastructure] though it is every teams job to consider and react to security issues |  <span class="lemon-tag gh-tag">feature/security</span> |
| Self-hosting | [Team Infrastructure][Team Infrastructure]  |  <span class="lemon-tag gh-tag">feature/self-hosting</span> |
| Session Analytics | [Team Web Analytics][Team Web Analytics]  |  <span class="lemon-tag gh-tag">feature/sessions</span> |
| Settings (personal & project) | Shared responsibility |  <span class="lemon-tag gh-tag">feature/settings</span> |
| SQL Editor | [Team Data Warehouse][Team Data Warehouse]  | <span class="lemon-tag gh-tag">feature/sql-editor</span> |
| SSO | [Team Platform Features][Team Platform Features]  | <span class="lemon-tag gh-tag">feature/sso</span>  |
| Surveys | [Team Surveys][Team Surveys] | <span class="lemon-tag gh-tag">feature/surveys</span> |
| Toolbar | [Team Replay][Team Replay]  | <span class="lemon-tag gh-tag">feature/toolbar</span>  |
| Usage reports | [Team Billing][Team Billing] / [Team Platform Features][Team Platform Features] | <span class="lemon-tag gh-tag">feature/usage-reports</span>  |
| Web Analytics  | [Team Web Analytics][Team Web Analytics]  | <span class="lemon-tag gh-tag">feature/web-analytics</span>  |
| Webhook delivery service | [Team CDP][Team CDP] | <span class="lemon-tag gh-tag">feature/pipelines</span> |
| Activity log | [Team Platform Features][Team Platform Features] | <span class="lemon-tag gh-tag">feature/activity-log</span> |

## Don't just copy other products
Some of the features we are building may exist in other products already. It is fine for us to be inspired by them - there's no need to reinvent the wheel when there is already a standard way our users expect things to work. However, it is not ok for us to say 'let's copy how X does it', or to ship something with the exact same look and feel as another product. This is bad for two reasons:

- We're highly unlikely to overtake everyone else if we just build the open source version of everything that is already out there.
- We may expose ourselves to legal risk/challenges from those companies, especially if they can point to a public issue where we have said 'let's copy X'.

[@benjackwhite]: https://github.com/benjackwhite
[@EDsCODE]: https://github.com/EDsCODE
[@mariusandra]: https://github.com/mariusandra
[@neilkakkar]: https://github.com/neilkakkar
[@pauldambra]: https://github.com/pauldambra
[@Twixes]: https://github.com/Twixes
[@daibhin]: https://github.com/daibhin
[@timgl]: https://github.com/timgl
[Team CDP]: /teams/cdp
[Team ClickHouse]: /teams/clickhouse
[Team CRM]: /teams/crm
[Team Data Warehouse]: /teams/data-warehouse
[Team Billing]: /teams/billing
[Team Platform Features]: /teams/platform-features
[Team Feature Flags]: /teams/feature-flags
[Team Growth]: /teams/growth
[Team Infrastructure]: /teams/infrastructure
[Team Ingestion]: /teams/ingestion
[Team Product Analytics]: /teams/product-analytics
[Team Replay]: /teams/replay
[Team Revenue Analytics]: /teams/revenue-analytics
[Team Web Analytics]: /teams/web-analytics
[Team Surveys]: /teams/surveys
[Team Messaging]: /teams/messaging
