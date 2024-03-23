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
| Apps | [Team Pipeline][Team Pipeline] | <span class="lemon-tag gh-tag">feature/pipelines</span> |
| Actions | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/actions</span> |
| Actors Modal | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/actors-modal</span>  |
| Annotations | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/annotations</span> |
| API Structure | Security + core updates owned by [Team Pipeline][Team Pipeline]. Features owned by the relevant small team | <span class="lemon-tag gh-tag">feature/api-structure</span> |
| Async migrations | [Team Pipeline][Team Pipeline]  | <span class="lemon-tag gh-tag">feature/async-migrations</span> |
| BI | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/dashboards</span> |
| Billing | [Team Growth][Team Growth]  |  <span class="lemon-tag gh-tag">feature/billing</span> |
| Client libraries | Security + core updates owned by [Team Pipeline][Team Pipeline]. Features owned by the relevant small team  | <span class="lemon-tag gh-tag">feature/pipeline</span> |
| Cohorts | [Team Feature Success][Team Feature Success]  |  <span class="lemon-tag gh-tag">feature/cohorts</span>  |
| Correlation Analysis | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/correlation-analysis</span> |
| Dashboards | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/dashboards</span> |
| Data Management | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/data-management</span>  |
| Events | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/events</span>  |
| Experimentation | [Team Feature Success][Team Feature Success] |  <span class="lemon-tag gh-tag">feature/experimentation</span> |
| Feature Flags | [Team Feature Success][Team Feature Success]  |  <span class="lemon-tag gh-tag">feature/feature-flags</span> |
| Funnels | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/funnels</span>  |
| Group Analytics | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/group-analytics</span> |
| HogQL | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/dashboards</span> |
| Ingestion | [Team Pipeline][Team Pipeline]  | <span class="lemon-tag gh-tag">feature/pipeline</span> |
| Lifecycle | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/lifecycle</span>  |
| Messaging (Email, Notifications) | [Team Growth][Team Growth]  | <span class="lemon-tag gh-tag">feature/messaging</span>  |
| Notebooks | [Team Replay][Team Replay]  |  <span class="lemon-tag gh-tag">feature/recordings</span> |
| Onboarding | [Team Growth][Team Growth]  | <span class="lemon-tag gh-tag">feature/onboarding</span>  |
| Paths | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/paths</span> |
| Permissions | [@Twixes][@Twixes]  | <span class="lemon-tag gh-tag">feature/permissions</span>  |
| Persons | [Team Pipeline][Team Pipeline]  | <span class="lemon-tag gh-tag">feature/persons</span>  |
| Platform (US + EU) | [Team Infrastructure][Team Infrastructure] | <span class="lemon-tag gh-tag">feature/platform</span>  |
| Project Home Page | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/home</span> |
| Property Filters | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/filters</span>  |
| Replay | [Team Replay][Team Replay]  |  <span class="lemon-tag gh-tag">feature/recordings</span> |
| Retention | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/retention</span> |
| Saved Insights | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/saved-insights</span> |
| Self-hosting | [Team Infrastructure][Team Infrastructure]  |  <span class="lemon-tag gh-tag">feature/self-hosting</span> |
| Session Analytics | [Team Product Analytics][Team Product Analytics]  |  <span class="lemon-tag gh-tag">feature/sessions</span> |
| Settings (personal & project) | [@liyiy][@liyiy]  |  <span class="lemon-tag gh-tag">feature/settings</span> |
| SSO | [@mariusandra][@mariusandra]  | <span class="lemon-tag gh-tag">feature/sso</span>  |
| Stickiness | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/stickiness</span>  |
| Toolbar | [Team Replay][Team Replay]  | <span class="lemon-tag gh-tag">feature/toolbar</span>  |
| Trends | [Team Product Analytics][Team Product Analytics]  | <span class="lemon-tag gh-tag">feature/trends</span>  |
| Web Analytics                            | [Team Web Analytics][Team Web Analytics]                                                                   | <span class="lemon-tag gh-tag">feature/web-analytics</span>        |


## Why did we establish feature owners?
At our Engineering Offsite in February 2022 we realized the issue that some bugs and maintenance tasks may have been falling through the cracks because there were no clear owners.

## Don't just copy other products
Some of the features we are building may exist in other products already. It is fine for us to be inspired by them - there's no need to reinvent the wheel when there is already a standard way our users expect things to work. However, it is not ok for us to say 'let's copy how X does it', or to ship something with the exact same look and feel as another product. This is bad for two reasons:

- We're highly unlikely to overtake everyone else if we just build the open source version of everything that is already out there.
- We may expose ourselves to legal risk/challenges from those companies, especially if they can point to a public issue where we have said 'let's copy X'.

[@EDsCODE]: https://github.com/EDsCODE
[@liyiy]: https://github.com/liyiy
[@macobo]: https://github.com/macobo
[@mariusandra]: https://github.com/mariusandra
[@neilkakkar]: https://github.com/neilkakkar
[@pauldambra]: https://github.com/pauldambra
[@rcmarron]: https://github.com/rcmarron
[@Twixes]: https://github.com/Twixes
[@yakkomajuri]: https://github.com/yakkomajuri
[@timgl]: https://github.com/timgl
[Team Product Analytics]: /teams/product-analytics
[Team Web Analytics]: /teams/web-analytics
[Team Replay]: /teams/replay
[Team Pipeline]: /teams/pipeline
[Team Infrastructure]: /teams/infrastructure
[Team Feature Success]: /teams/feature-success
[Team Infrastructure]: /teams/infrastructure
[Team Growth]: /teams/growth
