---
title: Replay Vision experiment scanner cross-sell
sidebar: Handbook
showTitle: true
---

Experiment results tell you which variant won. An [experiment scanner](/docs/replay-vision/scanner-types#experiment) tells you why.

It is a [Replay Vision](/docs/replay-vision) scanner that watches the sessions of people in one [experiment](/docs/experiments) and writes a short summary of each session. The summaries are grouped by variant. Use it to cross-sell Replay Vision to accounts that already run a lot of experiments.

Experiment scanners are in beta. Say so when you pitch them.

## Why it beats the other scanner types

You can point a monitor, classifier, scorer, or summarizer at an experiment's users with recording filters. None of them knows which variant a session belongs to. These are the wins to show:

| What the customer gets | Why other scanner types fall short |
| --- | --- |
| **The why behind the numbers.** Experiment metrics are quantitative. The scanner adds a qualitative read of what people did in each variant. | Other types are not built to compare variants. |
| **Even sampling.** Each variant is sampled at its own rate, so a 90/10 rollout still gives the small variant enough sessions to read. | Other types sample the whole population at one rate. The small variant gets few sessions. |
| **A readout per variant.** The Variants tab shows observations, people, sampling rate, and median session length for each variant. | Other types give one list. You split it yourself. |
| **A variant label you can trust.** PostHog adds the variant from exposure data. The model never sees it, so it describes only what the recording shows. | Other types have no variant field. |
| **No setup work.** PostHog finds the exposed people for you, the same ones as the experiment's Recordings tab. The scanner stops when the experiment ends, so spend has an end. | You build and maintain the filters yourself. |
| **A daily comparison.** The Variant analysis scout counts the behaviors that repeat in each variant and marks each difference as a trend or as significant. | Other types need a person to compare summaries. |
| **A broken flag check.** If control sessions show the new design, the flag check in the code is wrong and the experiment is really an A/A test. | Other types do not tell you which variant a session is in, so they cannot show this. |
| **Variant breakdowns in SQL.** Each `$recording_observed` event has `experiment_variant`. | Other types need a join to exposure data. |

It is also easy to turn on. The new experiment form has a **Compare what users do in each variant** toggle.

## Find the accounts

Good accounts run many experiments, have identified users, and already record sessions. Run this query in the PostHog App + Website project. Replace `Your Name` with your name as it shows in the organization's **Owner** property.

```sql
SELECT
    g.properties.name AS account,
    g.properties.mrr AS mrr,
    exp.experiments_launched AS experiments_launched_90d,
    toDate(exp.last_launch) AS last_launch,
    coalesce(rv.scans_30d, 0) AS replay_vision_scans_30d,
    coalesce(rv.experiment_scans_30d, 0) AS experiment_scanner_scans_30d
FROM groups AS g
INNER JOIN (
    SELECT
        properties.$group_0 AS org_id,
        uniq(properties.experiment_id) AS experiments_launched,
        max(timestamp) AS last_launch
    FROM events
    WHERE event = 'experiment launched'
      AND timestamp >= now() - INTERVAL 90 DAY
    GROUP BY org_id
) AS exp ON g.key = exp.org_id
LEFT JOIN (
    SELECT
        properties.organization_id AS org_id,
        count() AS scans_30d,
        countIf(properties.scanner_type = 'experiment') AS experiment_scans_30d
    FROM events
    WHERE event = 'replay_vision_scan_completed'
      AND timestamp >= now() - INTERVAL 30 DAY
    GROUP BY org_id
) AS rv ON g.key = rv.org_id
WHERE g.index = 0
  AND g.properties.owner_name = 'Your Name'
  AND exp.experiments_launched >= 2
ORDER BY experiments_launched_90d DESC
LIMIT 50
```

The query lists your accounts that launched at least two experiments in the last 90 days. Change `>= 2` to widen or narrow the list. The `experiment` scanner type is new, so `experiment_scanner_scans_30d` is 0 until teams start to use it.

Read the last two columns like this:

| Replay Vision scans | Experiment scanner scans | Next step |
| --- | --- | --- |
| 0 | 0 | They do not use Replay Vision. Lead with the "why" pitch and offer a trial on one running experiment. |
| More than 0 | 0 | They already use Replay Vision. Show them the experiment type. This is the easiest conversation. |
| More than 0 | More than 0 | They already use it. Ask what they found, then help them add the Variant analysis scout. |

Before you pitch, confirm three things. The experiments aggregate by person, not by group. Users are identified, because anonymous sessions are not scanned. Session Replay is on and records the pages the experiment changes.

## Run the motion

1. **Pick a running experiment.** A new scanner only watches sessions from the moment you create it. Pick an experiment that is live now, or one that is about to launch.
2. **Name the variants by what users see.** For example, "Single-page checkout" and "Three-step checkout". The model uses the names to tell the variants apart. If two variants look alike, say what is different on screen in **What to focus on**.
3. **Offer a capped trial.** Set up the scanner with low sampling and a [credit limit](/docs/replay-vision/quota-and-limits#per-scanner-limits). Each observation costs 2, 5, or 15 credits, depending on the model. One credit is $0.01. On a busy experiment, 0.5% to 2% sampling gives enough sessions.
4. **Share one finding.** After a few days, open the Variants tab. Pick one clear difference and send the recordings behind it. Present it as evidence, not as a result.
5. **Expand.** Add the Variant analysis scout (it uses credits, so ask first). Then turn the scanner on for the next experiment.

## Discovery questions

- How do you find out why a variant won or lost, beyond the metric?
- Did an experiment ever surprise you, and could you explain it?
- Who watches recordings of your experiments today?
- How many experiments do you run each quarter? How many get a close look?

## Say these limits out loud

- A scanner reads a sample of sessions. It cannot confirm a small change in a metric. Use the experiment's [results](/docs/experiments/analyzing-results) for that.
- It does not scan group-aggregated experiments or anonymous users.
- It skips sessions shorter than 15 seconds. If one variant changes bounce rates, the variants are clipped by different amounts.
- It watches the whole recording, not only the part after exposure.
- Summaries are a model's reading of a recording. Check the recording before you act on a summary.
- Do not edit the scanner mid-experiment. An edit makes the earlier and later summaries not comparable.
