---
title: Feature ownership
sidebar: Handbook
showTitle: true
---

Each feature at PostHog has an Engineering owner. This owner is responsible for maintaining the feature (keep the lights on) and championing any efforts to improve it (e.g. by bringing up improvements in sprint planning).

When a bug or feature request comes in, we tag it with the relevant label (see labels below). The owner is responsible for then prioritizing any bug/request that comes in for each feature. This does not mean working on every bug/request, an owner can make the deliberate decision that working on something is not the best thing to work on, but every request should be looked at.


> 💡 The Team Platform works a bit differently. Each subteam owns certain parts of PostHog. Among other things, this helps reduce any lead time when critical fixes are needed. Please review the [Team Platform](/teams/infrastructure) page for further details.


## Feature list

You can also view the list [directly in GitHub](https://github.com/PostHog/posthog/labels?q=feature%2F) and filter issues there.

| Feature |  Owner  |  Label  |
|---|---|---|
| Actions | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/actions</span> |
| Annotations | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/annotations</span> |
| API Structure | Shared responsibility. Features owned by the relevant Small Team. | <span class="lemon-tag gh-tag">feature/api-structure</span> |
| Async migrations | [Team CDP][Team CDP]  | <span class="lemon-tag gh-tag">feature/async-migrations</span> |
| Batch exports | [Team Batch Exports](/teams/batch-exports)  | <span class="lemon-tag gh-tag">feature/batch-exports</span> |
| BI | [Team Data Warehouse](/teams/data-warehouse)  |  <span class="lemon-tag gh-tag">feature/dashboards</span> |
| Billing | [Team Growth][Team Growth]  |  <span class="lemon-tag gh-tag">feature/billing</span> |
| Client libraries and SDKs | Shared responsibility with features owned by the relevant Small Team, or try #feature-client-libraries. There is an engineer assigned to SDK support on a rotating schedule. Check [the (private) pager duty schedule](https://posthog.pagerduty.com/schedules#P7B7NTR)  | <span class="lemon-tag gh-tag">feature/pipeline</span> |
| Cohorts | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/cohorts</span>  |
| Dashboards | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/dashboards</span> |
| Data Management | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/data-management</span>  |
| Data Warehouse | [Team Data Warehouse](/teams/data-warehouse)  | <span class="lemon-tag gh-tag">feature/data-warehouse</span> |
| Error tracking | [Team Error Tracking](/teams/error-tracking)  |  <span class="lemon-tag gh-tag">feature/error-tracking</span>  |
| Sentry integration | [Team Error Tracking](/teams/error-tracking)  |  <span class="lemon-tag gh-tag">feature/error-tracking</span>  |
| Events | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/events</span>  |
| Experimentation | [Team Experiments](/teams/experiments) |  <span class="lemon-tag gh-tag">feature/experimentation</span> |
| Feature Flags | [Team Feature Flags][Team Feature Flags]  |  <span class="lemon-tag gh-tag">feature/feature-flags</span> |
| Group Analytics | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/group-analytics</span> |
| HogQL | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/dashboards</span> |
| Heatmaps | [Team Replay][Team Replay] | <span class="lemon-tag gh-tag">feature/heatmaps</span> |
| Ingestion | [Team CDP][Team CDP]  | <span class="lemon-tag gh-tag">feature/pipeline</span> |
| Insights | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/insights</span>  |
| Live Events | [Team ClickHouse][Team ClickHouse]  | <span class="lemon-tag gh-tag">feature/live-events</span>  |
| Messaging (Email, Notifications) | [Team Growth][Team Growth]  | <span class="lemon-tag gh-tag">feature/messaging</span>  |
| Notebooks | [@daibhin][@daibhin]  |  <span class="lemon-tag gh-tag">feature/notebooks</span> |
| Onboarding | [Team Growth][Team Growth]  | <span class="lemon-tag gh-tag">feature/onboarding</span>  |
| Permissions | [Team Growth][Team Growth]  | <span class="lemon-tag gh-tag">feature/permissions</span>  |
| Persons | [Team CDP][Team CDP]  | <span class="lemon-tag gh-tag">feature/persons</span>  |
| Pipeline Transformations | [Team CDP][Team CDP] | <span class="lemon-tag gh-tag">feature/pipelines</span> |
| Pipeline Destinations | [Team CDP][Team CDP] | <span class="lemon-tag gh-tag">feature/cdp</span> |
| Platform (US + EU) | [Team Infrastructure][Team Infrastructure] | <span class="lemon-tag gh-tag">feature/platform</span>  |
| Project Home Page | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/home</span> |
| Property Filters | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/filters</span>  |
| Queries as a Service | [Team Clickhouse][Team Clickhouse]  | <span class="lemon-tag gh-tag">feature/qaas</span>  |
| Replay | [Team Replay][Team Replay]  |  <span class="lemon-tag gh-tag">feature/replay</span> |
| Security | [Team Infrastructure][Team Infrastructure] though it is every teams job to consider and react to security issues |  <span class="lemon-tag gh-tag">feature/security</span> |
| Self-hosting | [Team Infrastructure][Team Infrastructure]  |  <span class="lemon-tag gh-tag">feature/self-hosting</span> |
| Session Analytics | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/sessions</span> |
| Settings (personal & project) | [@benjackwhite][@benjackwhite]   |  <span class="lemon-tag gh-tag">feature/settings</span> |
| SSO | [Team Growth][Team Growth]  | <span class="lemon-tag gh-tag">feature/sso</span>  |
| Surveys | [Team Surveys][Team Surveys] | <span class="lemon-tag gh-tag">feature/surveys</span> |
| Toolbar | [Team Replay][Team Replay]  | <span class="lemon-tag gh-tag">feature/toolbar</span>  |
| Web Analytics                            | [Team Web Analytics][Team Web Analytics]                                                                   | <span class="lemon-tag gh-tag">feature/web-analytics</span>        |
| Webhook delivery service | [Team CDP][Team CDP] | <span class="lemon-tag gh-tag">feature/pipelines</span> |

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
[Team Product Analytics]: /teams/product-analytics
[Team Web Analytics]: /teams/web-analytics
[Team Replay]: /teams/replay
[Team CDP]: /teams/cdp
[Team Infrastructure]: /teams/infrastructure
[Team Feature Flags]: /teams/feature-flags
[Team Growth]: /teams/growth
[Team ClickHouse]: /teams/clickhouse
[Team Surveys]: /teams/surveys
