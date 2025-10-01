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

-   It prevents people feeling like they need to wait on another team to build out necessary functionality for them
-   It ensures that features built by another team get proper review, because reviewers know they will have to own it eventually.
-   It makes sure no feature is left "orphaned" with no real owner.
-   It embraces our value of [Why not now?](https://posthog.com/handbook/values#why-not-now).

## Feature list

You can also view the list [directly in GitHub](https://github.com/PostHog/posthog/labels?q=feature%2F) and filter issues there.

<FeatureOwnershipTable />

## Don't just copy other products

Some of the features we are building may exist in other products already. It is fine for us to be inspired by them - there's no need to reinvent the wheel when there is already a standard way our users expect things to work. However, it is not ok for us to say 'let's copy how X does it', or to ship something with the exact same look and feel as another product. This is bad for two reasons:

-   We're highly unlikely to overtake everyone else if we just build the open source version of everything that is already out there.
-   We may expose ourselves to legal risk/challenges from those companies, especially if they can point to a public issue where we have said 'let's copy X'.
