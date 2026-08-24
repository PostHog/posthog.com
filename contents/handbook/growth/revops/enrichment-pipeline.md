---
title: Signup enrichment pipeline
sidebar: Handbook
showTitle: true
---

When someone signs up to PostHog with a work email, we enrich them in-house: a Temporal workflow looks the company up on [Harmonic](https://harmonic.ai), writes what it finds onto the PostHog organization and person, and scores it against [our ICP](/handbook/growth/revops/icp-fit-score). The same data flows on into Salesforce and Vitally. This page explains how the pipeline works and, more importantly, what to do when it stops.

Until July 2026 enrichment ran through [Clay](https://www.clay.com). Clay stopped writing on July 22, 2026, and the in-house pipeline described here is now the only path — if you remember the old version of this page, the alert survived but every Clay step on it is gone.

## How it works

1. **Dispatch, on the signup request.** The signup API fire-and-forgets one `signup-enrichment` Temporal workflow per organization. It never blocks or fails a signup: dispatch is gated by a kill switch (`GROWTH_SIGNUP_ENRICHMENT_ENABLED`) and by Cloud region (US today; self-hosted never dispatches), and a slow or unreachable Temporal just means enrichment doesn't run. Personal-domain signups are recorded as `work_email=false` but never sent to the provider. The signup's `role_at_organization` is persisted so the student disqualifier stays replayable.
2. **First attempt, seconds later.** The workflow looks the domain up on Harmonic (bare and `www.` variations; a clean "company not found" is an authoritative answer, operational errors retry). Matched fields (company type, headcount, industry, …) are written to the organization, and the profile is scored — the [ICP fit score](/handbook/growth/revops/icp-fit-score) plus, during the migration, the legacy `icp_score`. A frozen `*_at_signup` copy of the fields is also captured, so later re-enrichment never rewrites what we knew at signup.
3. **Recheck, four hours later.** Every workflow sleeps and looks once more, matched or not — Harmonic seeds enrichment for companies it doesn't know asynchronously, so a first-pass miss often matches on the recheck. Upgrades emit their own event; the completion signal fires only once.
4. **Daily sweep.** A scheduled workflow re-enriches organizations whose last evaluation ended score-less (`icp_fit_status` of `insufficient_data` or `not_found`), once their newest fetch is at least 30 days old and their first fetch is at most 90 days old, capped at `GROWTH_ICP_REENRICH_DAILY_CAP` (500) per day. Brand-new companies accrete enrichment data over time; the sweep is how we pick it up.

The invariant that makes the rest of this page work: **every terminal outcome — match or miss — leaves an archived copy of what Harmonic returned.** The recheck, the sweep, and every backfill act on that archive, so an outage window is always replayable, never a permanent hole.

### Events, for debugging

| Event | Fired |
|---|---|
| `signup_enrichment_completed` | Exactly once per org, on the first attempt. `success=false` only after all retries exhaust, so every false is a real failed enrichment. |
| `signup_enrichment_recheck` | On the +4h recheck; `upgraded=true` when it filled anything new. |
| `icp_reenrichment_completed` | Per organization the daily sweep re-enriches. |
| `enrichment_snapshot_at_signup` | The frozen at-signup property copy. |

All of them carry `icp_fit_status`, so a shift in the scored / insufficient_data / not_found mix is visible per stage.

## Monitoring

Two alerts, both checked daily, both owned by Growth (they page #alerts-growth):

- **Stall:** <PrivateLink url="https://us.posthog.com/project/2/insights/GTCPV5hq">Org enrichment write rate</PrivateLink> — the daily count of versioned enrichment writes landing on organizations. Healthy is roughly 180–460 per day with weekend dips toward the bottom of that range; the alert **fires below 150/day**, which means the Temporal worker fleet or Harmonic is down. (It counts `icp_score_version` writes today; repoint it to `icp_fit_version` when the legacy score retires.)
- **Failures:** <PrivateLink url="https://us.posthog.com/project/2/insights/iaFqzDrS">Signup enrichment failures</PrivateLink> — `signup_enrichment_completed` with `success=false`. Ideally near zero; the alert **fires above 5/day**.

## What to do when the stall alert fires

1. **Confirm it's real.** Is the most recent complete day near zero while signups are still flowing normally? If signups dropped too, it's a traffic problem, not an enrichment one.
2. **Check whether it was turned off on purpose.** `GROWTH_SIGNUP_ENRICHMENT_ENABLED` is the kill switch. If it's off deliberately, snooze the alert and move on.
3. **Find the cause.** In rough order of likelihood:
   - The Temporal worker fleet is down or its queue is backed up — dispatches drop (logged on the web pods) or workflows sit unstarted.
   - Harmonic is down or the API key is broken — the failures insight spikes and the exhausted lookups land in error tracking.
   - Database errors inside the enrichment activity — this is what silently stranded 349 organizations over three days in July 2026.
   - No active curated scoring lists (possible after an environment rebuild): organizations get fields but no fit status. Re-seed with `sync_icp_scoring_lists`.
4. **Fix it, then backfill the gap.** From a US worker: `python manage.py backfill_signup_enrichment --after <first bad time> --before <first good time>` re-dispatches every work-email organization from the window that has no archived fetch. Run `--dry-run` first to see the count. Eligibility is "no archive row", so re-running is safe and organizations the pipeline did reach are skipped. The write rate climbs back the same day and the alert resolves on its own.

## Ops commands

All of these run on a US prod worker — the provider key lives on workers only.

| Command | What it does |
|---|---|
| `backfill_signup_enrichment --after … --before …` | Re-dispatch enrichment for work-email orgs in the window that have no archived fetch. The gap-filler. |
| `backfill_icp_fit_scores [--stats]` | Recompute ICP fit scores from each org's latest archived fetch and write the score keys only. |
| `sync_icp_scoring_lists --tags-csv … --investors-csv … --list-version … --activate` | Load a new versioned curated-lists row from the RevOps sheet exports. `--activate` flips atomically; existing rows are never edited. |
| `init_icp_reenrichment_schedule` | Create or update the daily sweep schedule. Idempotent. |
| `icp_match_probe` | Read-only Harmonic identifier diagnostics, for when the match rate looks off. |

## Downstream

Unchanged by any of the above: each signup still creates a contact and account in Salesforce, a weekend job re-enriches Salesforce accounts, and everything syncs into Vitally, where playbooks turn it into sales tasks.

## Ownership

The Growth team owns the pipeline code, the workers, and both alerts. RevOps owns the ICP definition and the curated scoring lists (reviewed quarterly). Pipeline questions go to Growth; scoring-definition questions go to RevOps.
