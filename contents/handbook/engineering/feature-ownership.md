---
title: Feature ownership
sidebar: Handbook
showTitle: true
---

Each feature at PostHog has an Engineering owner. This owner is responsible for maintaining the feature (keep the lights on), championing any efforts to improve it (e.g. by bringing up improvements in sprint planning), [planning launches](/handbook/words-and-pictures/product-announcements) for new parts of it, and making sure it is well documented.

When a bug or feature request comes in, we tag it with the relevant label (see labels below). The owner is responsible for then prioritizing any bug/request that comes in for each feature. This does not mean working on every bug/request, an owner can make the deliberate decision that working on something is not the best thing to work on, but every request should be looked at.

## Who can contribute to owned features?

Feature ownership does **not** mean that the owner is the **only** person/team who can contribute to the feature. If another team requires something from an existing feature that isn't supported, that non-owning team should build it. The owner team is responsible for reviewing PRs to make sure the code patterns and UX makes sense for the feature overall. After the change is merged, the owner team then owns it (assuming no major bugs from the initial implementation).

For example, web analytics wanted a heatmap insight type to see what times of day people were active. <TeamMember name="Javier Bahamondes" photo /> from web analytics opened up the necessary PRs to build this feature. It was reviewed by the product analytics team, owner of all insight types, who then took responsibility for it after it was merged.

This process does four things:

- It prevents people feeling like they need to wait on another team to build out necessary functionality for them
- It ensures that features built by another team get proper review, because reviewers know they will have to own it eventually.
- It makes sure no feature is left "orphaned" with no real owner.
- It embraces our value of [Why not now?](https://posthog.com/handbook/values#why-not-now).


## Feature list

You can also view the list [directly in GitHub](https://github.com/PostHog/posthog/labels?q=feature%2F) and filter issues there.

| Feature |  Owner  |  Label  |
|---|---|---|
| Actions | [Team Platform Analytics][Team Platform Analytics]  | <span class="lemon-tag gh-tag">feature/actions</span> |
| Activity log | [Team Platform Features][Team Platform Features] | <span class="lemon-tag gh-tag">feature/activity-log</span> |
| Activity view | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/events</span>  |
| Alerts | [Team Platform Analytics][Team Platform Analytics]  | <span class="lemon-tag gh-tag">feature/alerts</span> |
| Annotations | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/annotations</span> |
| API Structure | Shared responsibility. Features owned by the relevant Small Team. | <span class="lemon-tag gh-tag">feature/api-structure</span> |
| Async migrations | [Team CDP][Team CDP]  | <span class="lemon-tag gh-tag">feature/async-migrations</span> |
| Authentication | [Team Platform Features][Team Platform Features]  | <span class="lemon-tag gh-tag">feature/authentication</span> |
| Autocapture | Shared responsibility with features owned by the relevant Small Team ([Team Platform Analytics][Team Platform Analytics] & [Team Web Analytics][Team Web Analytics]) | <span class="lemon-tag gh-tag">feature/autocapture</span> |
| Batch exports | Team Batch Exports | <span class="lemon-tag gh-tag">feature/batch-exports</span> |
| Billing | [Team Billing][Team Billing]  |  <span class="lemon-tag gh-tag">feature/billing</span> |
| Cache warming | [Team Platform Analytics][Team Platform Analytics]  | <span class="lemon-tag gh-tag">feature/cache-warming</span> |
| Client libraries and SDKs | Shared responsibility with features owned by the relevant Small Team, or try #support-client-libraries. There is an engineer assigned to SDK support on a rotating schedule. Check [the (private) pager duty schedule](https://posthog.pagerduty.com/schedules#P7B7NTR). **For Mobile SDK issues, defer to the Mobile group first** | <span class="lemon-tag gh-tag">feature/libraries</span> |
| Mobile SDKs | **Primary: Mobile group**. Shared responsibility with the relevant Small Team for feature-owned areas. Start with the [Mobile group](https://github.com/orgs/PostHog/teams/team-mobile) for triage, loop in #support-client-libraries as needed. | <span class="lemon-tag gh-tag">feature/mobile</span> |
| Cohorts | [Team Feature Flags][Team Feature Flags]  |  <span class="lemon-tag gh-tag">feature/cohorts</span>  |
| Comments/Discussions | [Team Platform Features][Team Platform Features] | <span class="lemon-tag gh-tag">feature/comments</span> |
| Customer Analytics | [Team Customer Analytics][Team Customer Analytics]  |  <span class="lemon-tag gh-tag">feature/customer-analytics</span>  |
| Dashboards | Shared responsibility with [Team Product Analytics][Team Product Analytics] & [Team Platform Analytics][Team Platform Analytics] |  <span class="lemon-tag gh-tag">feature/dashboards</span> |
| Data colors & themes | [Team Platform Analytics][Team Platform Analytics]  | <span class="lemon-tag gh-tag">feature/colors-and-themes</span> |
| Data management | [Team Platform Analytics][Team Platform Analytics]  | <span class="lemon-tag gh-tag">feature/data-management</span>  |
| Data table | [Team Product Analytics][Team Product Analytics] | <span class="lemon-tag gh-tag">feature/data-table</span> |
| Data visualization | [Team Data Warehouse][Team Data Warehouse] | <span class="lemon-tag gh-tag">feature/data-visualization</span>  |
| Data pipelines | [Team CDP][Team CDP] | <span class="lemon-tag gh-tag">feature/pipeline</span> |
| Data warehouse | [Team Data Warehouse][Team Data Warehouse]  | <span class="lemon-tag gh-tag">feature/data-warehouse</span> |
| Early access features | [Team Feature Flags][Team Feature Flags] | <span class="lemon-tag gh-tag">feature/feature-flags</span> |
| Error tracking | [Team Error Tracking](/teams/error-tracking)  |  <span class="lemon-tag gh-tag">feature/error-tracking</span>  |
| Experimentation | [Team Experiments](/teams/experiments) |  <span class="lemon-tag gh-tag">feature/experimentation</span> |
| Feature flags | [Team Feature Flags][Team Feature Flags]  |  <span class="lemon-tag gh-tag">feature/feature-flags</span> |
| Group analytics | [Team CRM][Team CRM]  |  <span class="lemon-tag gh-tag">feature/group-analytics</span> |
| Heatmaps | [Team Replay][Team Replay] | <span class="lemon-tag gh-tag">feature/heatmaps</span> |
| HogQL | [Team Data Warehouse][Team Data Warehouse]  |  <span class="lemon-tag gh-tag">feature/dashboards</span> |
| Ingestion | [Team Ingestion][Team Ingestion]  | <span class="lemon-tag gh-tag">feature/team-ingestion</span> |
| Insights | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/insights</span>  |
| Internal messaging (email, notifications) | [Team Platform Features][Team Platform Features]  | <span class="lemon-tag gh-tag">feature/notifications</span>  |
| Live events | [Team ClickHouse][Team ClickHouse]  | <span class="lemon-tag gh-tag">feature/live-events</span>  |
| Marketing analytics | [Team Web Analytics][Team Web Analytics]  |  <span class="lemon-tag gh-tag">feature/marketing-analytics</span> |
| Max AI platform | [Team Max AI][Team Max AI]  | <span class="lemon-tag gh-tag">feature/max-ai</span>  |
| MCP server | [Team Growth][Team Growth]  | <span class="lemon-tag gh-tag">feature/mcp</span>  |
| Messaging | [Team Messaging][Team Messaging]  | <span class="lemon-tag gh-tag">feature/messaging</span>  |
| Notebooks | [@daibhin][@daibhin]  |  <span class="lemon-tag gh-tag">feature/notebooks</span> |
| Onboarding | [Team Content][Team Content]  | <span class="lemon-tag gh-tag">feature/onboarding</span>  |
| Path cleaning | [Team Web Analytics][Team Web Analytics]  |  <span class="lemon-tag gh-tag">feature/path-cleaning</span> |
| Permissions and access control | [Team Platform Features][Team Platform Features]  | <span class="lemon-tag gh-tag">feature/permissions</span>  |
| Persons | [Team Ingestion][Team Ingestion]  | <span class="lemon-tag gh-tag">feature/persons</span>  |
| Persons view | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/persons</span>  |
| Pipeline transformations | [Team CDP][Team CDP] | <span class="lemon-tag gh-tag">feature/pipelines</span> |
| Pipeline destinations | [Team CDP][Team CDP] | <span class="lemon-tag gh-tag">feature/cdp</span> |
| Pipeline sources | [Team Data Warehouse][Team Data Warehouse] | <span class="lemon-tag gh-tag">feature/pipelines</span> |
| Platform (US + EU) | [Team Infrastructure][Team Infrastructure] | <span class="lemon-tag gh-tag">feature/platform</span>  |
| Project home page | [Team Platform UX][Team Platform UX]  | <span class="lemon-tag gh-tag">feature/home</span> |
| Property filters | [Team Platform UX][Team Platform UX]  | <span class="lemon-tag gh-tag">feature/filters</span>  |
| Queries as a Service | [Team Data Warehouse][Team Data Warehouse]  | <span class="lemon-tag gh-tag">feature/qaas</span>  |
| Query performance | [Team Platform Analytics][Team Platform Analytics]  |  <span class="lemon-tag gh-tag">feature/insights</span>  |
| Quota limiting | [Team Billing][Team Billing] / [Team Platform Features][Team Platform Features]  | <span class="lemon-tag gh-tag">feature/quota-limiting</span>  |
| Replay | [Team Replay][Team Replay]  |  <span class="lemon-tag gh-tag">feature/replay</span> |
| Revenue analytics | [Team Revenue Analytics][Team Revenue Analytics] | <span class="lemon-tag gh-tag">feature/revenue-analytics</span>  |
| Revenue data management | [Team Revenue Analytics][Team Revenue Analytics] | <span class="lemon-tag gh-tag">feature/revenue-data-management</span>  |
| Base currency | [Team Revenue Analytics][Team Revenue Analytics] | <span class="lemon-tag gh-tag">feature/currency</span>  |
| Currency rate dataset | [Team Revenue Analytics][Team Revenue Analytics] | <span class="lemon-tag gh-tag">feature/currency-rate</span>  |
| Security | [Team Infrastructure][Team Infrastructure] though it is every teams job to consider and react to security issues |  <span class="lemon-tag gh-tag">feature/security</span> |
| Self-hosting | [Team Infrastructure][Team Infrastructure]  |  <span class="lemon-tag gh-tag">feature/self-hosting</span> |
| Sentry integration | [Team Error Tracking](/teams/error-tracking)  |  <span class="lemon-tag gh-tag">feature/error-tracking</span>  |
| Session analytics | [Team Web Analytics][Team Web Analytics]  |  <span class="lemon-tag gh-tag">feature/sessions</span> |
| Settings (personal & project) | [Team Platform UX][Team Platform UX] for the structure, all teams manage their own settings |  <span class="lemon-tag gh-tag">feature/settings</span> |
| SQL editor | [Team Data Warehouse][Team Data Warehouse]  | <span class="lemon-tag gh-tag">feature/sql-editor</span> |
| SQL insights | [Team Data Warehouse][Team Data Warehouse]  |  <span class="lemon-tag gh-tag">feature/sql-insights</span> |
| SSO | [Team Platform Features][Team Platform Features]  | <span class="lemon-tag gh-tag">feature/sso</span>  |
| Statistical analysis | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/statistical-analysis</span>  |
| Subscriptions | [Team Platform Analytics][Team Platform Analytics]  | <span class="lemon-tag gh-tag">feature/subscriptions</span> |
| Surveys | [Team Surveys][Team Surveys] | <span class="lemon-tag gh-tag">feature/surveys</span> |
| Table exports | [Team Platform Analytics][Team Platform Analytics]  |  <span class="lemon-tag gh-tag">feature/table-exports</span> |
| Taxonomic filters | [Team Platform UX][Team Platform UX] | <span class="lemon-tag gh-tag">feature/taxonomic-filters</span> |
| Toolbar | [Team Replay][Team Replay]  | <span class="lemon-tag gh-tag">feature/toolbar</span>  |
| Usage reports | [Team Billing][Team Billing] / [Team Platform Features][Team Platform Features] | <span class="lemon-tag gh-tag">feature/usage-reports</span>  |
| Variables | [Team Product Analytics][Team Product Analytics] | <span class="lemon-tag gh-tag">feature/variables</span>  |
| Web analytics  | [Team Web Analytics][Team Web Analytics]  | <span class="lemon-tag gh-tag">feature/web-analytics</span>  |
| Webhook delivery service | [Team CDP][Team CDP] | <span class="lemon-tag gh-tag">feature/pipelines</span> |

## Don't just copy other products
Some of the features we are building may exist in other products already. It is fine for us to be inspired by them - there's no need to reinvent the wheel when there is already a standard way our users expect things to work. However, it is not ok for us to say 'let's copy how X does it', or to ship something with the exact same look and feel as another product. This is bad for two reasons:

- We're highly unlikely to overtake everyone else if we just build the open source version of everything that is already out there.
- We may expose ourselves to legal risk/challenges from those companies, especially if they can point to a public issue where we have said 'let's copy X'.

[@daibhin]: https://github.com/daibhin
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
[Team Platform UX]: /teams/platform-ux
[Team Platform Analytics]: /teams/platform-analytics
[Team Product Analytics]: /teams/product-analytics
[Team Replay]: /teams/replay
[Team Revenue Analytics]: /teams/revenue-analytics
[Team Web Analytics]: /teams/web-analytics
[Team Surveys]: /teams/surveys
[Team Messaging]: /teams/messaging
[Team Max AI]: /teams/max-ai
[Team Content]: /teams/content
