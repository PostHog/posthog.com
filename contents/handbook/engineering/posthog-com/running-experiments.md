---
title: Running experiments on posthog.com
---

These are the defaults for any A/B test on the website. Most of an experiment's validity lives in the PR, not in the PostHog UI, so get the code right first.

If you use an agent, point it at the <PrivateLink url="https://us.posthog.com/project/2/llm-analytics/skills/website-experiments">website-experiments skill</PrivateLink> in the PostHog skills store. It has the same rules, a code template, and the exact metric definitions.

## Planning

Settle these before any code ships.

1. **Hypothesis in the description:** the change, why it should work, the primary metric, and the PR link.
2. **Audience:** posthog.com shares project 2 and the person record with the app, so exclude existing app users in code.
3. **Exposure point:** if the change is below the fold, expose on scroll, not page load.

## Implementing the flag

1. **Ship dark, with control as the default.** Merge the variant behind the flag at 0% and keep the current page as the fallback. Launching the experiment is then a config change, not a deploy.
2. **Don't read the flag for people who are out of scope.** Check the `ph_current_instance` cookie first (`getPostHogInstanceCookie` in `src/hooks/usePostHogInstance.ts`). If it is set, render control and never call `getFeatureFlag`. No flag call means no exposure. Filters on `$is_identified` can't do this job: existing users on a logged-out browser look anonymous when they are exposed.
3. **Fire a custom exposure event where the change becomes visible.** Send it once per page view when the top of the experiment slot scrolls into view, with `$feature/<flag-key>` on the event. Then set it as the experiment's exposure event.
4. **Make the exposure condition identical in both arms.** Wrap control and test in the same slot component with the same marker. If only the test arm tracks visibility, the arms are no longer comparable.
5. **Count assignment, not successful rendering.** Keep a test visitor in test even if the variant fails to load, and put an error boundary around a lazy-loaded variant.
6. **Watch the variant's cost.** Check the bundle report on the PR. Lazy-load heavy variants so page speed doesn't become a hidden second treatment.
7. **Remove preview scaffolding before merge.** Layout switchers and debug toggles used to compare designs on the deploy preview don't belong in production.

[PR #21732](https://github.com/PostHog/posthog.com/pull/21732) is a good reference implementation of rules 2 to 5.

## Metrics and analysis

1. **Make the primary metric a real outcome.** `user signed up` with `is_organization_first_user = true` counts new orgs, not invited teammates.
2. **Add the four signup-quality metrics as secondaries.** They show whether extra signups are worth having. All are funnels that start at a new-org signup:
    - **First event ingested:** <PrivateLink url="https://us.posthog.com/project/2/data-management/events/01790132-e887-0000-ce39-e2b1340a62c4">user signed up</PrivateLink> (`is_organization_first_user = true`) → <PrivateLink url="https://us.posthog.com/project/2/data-management/events/01790132-e91a-0000-319d-2058de37f5d7">first team event ingested</PrivateLink>.
    - **Work-email org signups (7 days):** user signed up (`is_organization_first_user = true`), with `email` not matching personal domains such as Gmail, Outlook, Yahoo, iCloud, and Proton.
    - **Work-email org signups that ingest data (7 days):** the work-email signup above → first team event ingested.
    - **Card added after org signup (7 days):** user signed up (`is_organization_first_user = true`) → <PrivateLink url="https://us.posthog.com/project/2/data-management/events/01790132-ebca-0000-04aa-d48e284088b8">billing subscription activated</PrivateLink>.
3. **Use Bayesian stats with a 90% credible interval by default.** Use 95% for high-impact pages, such as the pricing page or anything above the fold on the homepage.

## Running and cleaning up

1. **Check the first day's exposures, persons, and recordings.** Problems like existing users leaking into the test show up within a day.
2. **Fix exposure in code, then reset.** Editing exposure criteria on a running experiment can't remove people already enrolled, so a reset is cheaper than a contaminated result.
3. **Clean up within a sprint.** Once concluded, remove the losing branch and the flag check, delete the exposure event code, and archive the flag. A flag left at 100% with dead code behind it is flag debt.

## Pre-launch checklist

Copy this into the PR description of every website experiment.

- [ ] Hypothesis, linked PR, and end date are in the experiment description
- [ ] Variant ships behind the flag at 0%, with control as the fallback
- [ ] Browsers with `ph_current_instance` render control and never read the flag
- [ ] Custom exposure event fires when the changed area scrolls into view, from the same wrapper in both arms
- [ ] Experiment uses that event as its exposure, with `$host`, `$pathname`, not-identified, and test-account filters
- [ ] Primary metric is new-org signups; secondaries are first event ingested, work-email org signups, work-email org signups that ingest data, and card added (7-day windows)
- [ ] Both arms checked on the deploy preview; preview-only scaffolding removed
- [ ] Day-one check of exposures and persons booked; reset if exposure was wrong
- [ ] Experiment stopped with a written conclusion before the flag goes to 100%
- [ ] Cleanup PR and flag archive scheduled after the conclusion
