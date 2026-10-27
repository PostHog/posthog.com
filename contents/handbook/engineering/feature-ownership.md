---
title: Feature ownership
sidebar: Handbook
showTitle: true
---

Each feature at PostHog has an Engineering owner. This owner is responsible for maintaining the feature (keep the lights on), championing any efforts to improve it (e.g. by bringing up improvements in sprint planning), [planning launches](/handbook/marketing/product-announcements) for new parts of it, and making sure it is well documented.

For shared developer tooling and infrastructure that cuts across product teams (CI, local dev, builds, migrations, etc.), see the [Developer Experience](/handbook/engineering/developer-experience) page.

When a bug or feature request comes in, we tag it with the relevant label (see labels below). The owner is responsible for then prioritizing any bug/request that comes in for each feature. This does not mean working on every bug/request, an owner can make the deliberate decision that working on something is not the best thing to work on, but every request should be looked at.

## Who can contribute to owned features?

Feature ownership does **not** mean that the owner is the **only** person/team who can contribute to the feature. If another team requires something from an existing feature that isn't supported, that non-owning team can build it. How you start depends on the size of the change (see [PR or context?](#pr-or-context)). The owner team is responsible for reviewing PRs to make sure the code patterns and UX makes sense for the feature overall. After the change is merged, the owner team then owns it (assuming no major bugs from the initial implementation).

For example, web analytics wanted a heatmap insight type to see what times of day people were active. <TeamMember name="Javier Bahamondes" photo /> from web analytics opened up the necessary PRs to build this feature. It was reviewed by the <SmallTeam slug="product-analytics" />, owner of all insight types, who then took responsibility for it after it was merged.

This process does four things:

-   It prevents people feeling like they need to wait on another team to build out necessary functionality for them
-   It ensures that features built by another team get proper review, because reviewers know they will have to own it eventually.
-   It makes sure no feature is left "orphaned" with no real owner.
-   It embraces our value of [Why not now?](https://posthog.com/handbook/values#why-not-now).

### PR or context?

"Context" means a Slack message or issue to the owning team that explains the problem and why it matters, without code.

| Change                                          | Suggested path                                                                                                                                          |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Typo or small bug                               | Open a PR, then tell the owning team.                                                                                                                   |
| Small improvement (one screen, no new behavior) | Open a PR, then tell the owning team. If you don't know that code well, check with them first.                                                          |
| New feature, or a change in how something works | Give the owning team context first. They decide whether you build it or they do. A draft PR can come with the context, and they are free to close it.   |

The bigger the change, the more it shapes the owning team's direction, and they maintain it after it merges, so they get a say before the code exists.

Not sure which row fits your change? If all else fails, ask the owning team.

### If you open the PR, you own it

Generating a PR takes minutes, so the PR itself isn't the work. Before you ask the owning team for a review:

-   Understand the change well enough to explain it and its tradeoffs without the diff open.
-   Test it, by hand where the tests don't cover it.
-   Write a description that says what changed and why. "I pointed an agent at this" is not a description.

The rest of the author checklist is in [Before requesting a review](/handbook/engineering/how-we-review#before-requesting-a-review).

### What the owning team does

-   Respond within one working day, per our [turnaround](/handbook/engineering/how-we-review#turnaround) norm.
-   Say what you prefer. If a PR doesn't meet your bar, or you'd rather get an issue than a PR, tell the author.
-   Close an outside PR that conflicts with your team's direction, and say why. The author then gives you context instead.
-   Own the change once it merges.

If the owning team closes your PR and builds the change their own way, don't take it personally. You gave them the context they needed.

### If you don't usually write code

The same tiers and the same ownership bar apply to you. If you aren't sure how the code you're changing works, ask the owning team before you open the PR, not after.

## Feature list

You can also view the list [directly in GitHub](https://github.com/PostHog/posthog/labels?q=feature%2F) and filter issues there.

<FeatureOwnershipTable />

## Don't just copy other products

Some of the features we are building may exist in other products already. It is fine for us to be inspired by them - there's no need to reinvent the wheel when there is already a standard way our users expect things to work. However, it is not ok for us to say 'let's copy how X does it', or to ship something with the exact same look and feel as another product. This is bad for two reasons:

-   We're highly unlikely to overtake everyone else if we just build the open source version of everything that is already out there.
-   We may expose ourselves to legal risk/challenges from those companies, especially if they can point to a public issue where we have said 'let's copy X'.
