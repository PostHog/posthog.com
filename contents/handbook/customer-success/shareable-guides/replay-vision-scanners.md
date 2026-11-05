---
title: Setting up Replay Vision scanners
sidebar: Handbook
showTitle: true
---

A field guide for customer-facing roles who set up [Replay Vision](/docs/replay-vision/start-here) scanners with a customer. A scanner applies one prompt to one session recording at a time, and each result is an observation. The [docs](/docs/replay-vision/creating-scanners) explain every setting in the editor. This guide tells you which settings to choose for a customer's first scanners, and it lists the mistakes we made when we set them up.

## Build the first scanners with the customer

A credit grant and a docs link do not get scanners built. Customers who got credits often did not know where to start. The setups that worked happened live on a call: the customer showed the flow they cared about, and we wrote the scanners together on a shared screen.

When a call is not possible, build one proof-of-concept scanner on one flow. Then open your next message with its link, not with a pitch. A working scanner on the customer's own recordings makes the case better than a description of the feature.

> **Running example.** A customer runs a project management app. New users go through onboarding: they create a workspace, invite teammates, and reach a "You're all set" screen at `/onboarding/done`. The customer wants to know where new users get stuck. Each rule below uses this flow.

## Rule 1: Check what the customer records

A scanner can only watch sessions that the customer records. Check these items in the customer's project before you build:

1. Session replay is on for the flow that you want to scan.
2. The replay sampling rate. The scanner's own sampling applies on top of it. If the customer records 1% of sessions and the scanner samples 50%, the scanner sees 0.5% of all sessions.
3. [Network recording](/docs/session-replay/network-recording) is on. Without it, a scan cannot tell a failed request from a slow one.
4. [Canvas recording](/docs/session-replay/canvas-recording) or [iframe recording](/docs/session-replay/iframes) is on, if key screens use a canvas or an iframe.

If the customer records a small share of sessions, set the scanner's sampling rate to 100% and its session coverage to **All recordings**. Then read the estimate again (see Rule 7).

## Rule 2: Scope each scanner to one flow with a clear end

Pick one closed loop, such as signup, onboarding, or checkout. The flow must have a start and a visible end. A visible end gives the model an outcome that it can see. A scanner that watches every session has no outcome to judge, and it costs more.

Set the scope on the **Recordings** step of the editor:

- Filter on the `$current_url` event property. For the running example, use `$current_url` contains `/onboarding`.
- Turn on **Filter out internal and test users**. Teammates who test onboarding make sessions that look like real friction.
- Add a minimum duration only when short sessions cannot answer the question. Leave it off for a drop-off question, because a short session is often the drop-off.

Replay Vision skips some sessions before any filter applies: sessions shorter than 15 seconds, sessions with less than 10 seconds of activity, and sessions with more than 1 hour of activity. A user who leaves onboarding in the first few seconds does not get an observation.

## Rule 3: Start with three scanners on the same filter

Give each scanner one question. For one flow, three questions answer most of what a customer wants to know:

| Scanner                   | Type       | Question                                            |
| ------------------------- | ---------- | --------------------------------------------------- |
| Onboarding outcome        | Monitor    | Did the user reach the "You're all set" screen?     |
| Onboarding friction type  | Classifier | Which type of friction did the user hit?            |
| Onboarding friction score | Scorer     | How much friction did the user hit, from 0 to 10?   |

Give all three scanners the same filter and a sampling rate of 100%. The editor starts each new scanner at 20%, so change it. Each scanner samples on its own, so two scanners at 50% share only about a quarter of their sessions. At 100% on the same filter, each session gets all three observations, and you can join the results on `session_id` (see "After launch" below).

You cannot change a scanner's type after you create it, so choose the type first. Do not use a summarizer for this set. A summarizer returns text, so you cannot count, chart, or join its results. Use a summarizer when a person reads each observation.

## Rule 4: Put every instruction in the prompt

The model reads the prompt and the type settings, such as the categories or the scale. It does not read the **Description** field. The description is a note for the people who open the scanner. Write tag definitions, step names, and the end screen into the prompt.

Name each scanner for its flow and its question. A monitor with "classifier" in its name confuses the next person who reads its results.

## Rule 5: Make the categories match the prompt

A classifier can only assign tags from its **Categories** list. A category is a plain label with no definition of its own, so define each category in the prompt. If the prompt defines tags that are not in the list, those definitions have no effect. If the scanner can add categories outside the list, the model can add the prompt's tags as new ones, and nobody notices the drift.

Keep one list. After every edit, read the prompt and the categories together. Keep the list to 5 to 9 categories. For the running example: `validation-loop`, `invite-step-confusion`, `dead-click`, `error-message`, `stalled-step`, `backtracking`, `no-friction`, and `cant-tell`.

## Rule 6: Give the model a way to say no

The model must give an answer for each session. Without a safe answer, it finds a problem in sessions that have none. Each type has its own way out:

- **Monitor.** Turn on **Allow inconclusive verdicts** when some matched sessions never reach the step in question. It is off by default.
- **Classifier.** Add an escape category, such as `no-friction` or `cant-tell`. Tell the model in the prompt that an escape category never combines with another category.
- **Scorer.** Define both ends of the scale in words, so that a reader knows what a 2 or an 8 means. For example: "Score how much friction the user hit in onboarding. 0 means the user moved through every step with no visible problem. 10 means sustained friction: repeated failures, rage clicks, or the user left before the end screen. Use the full range."

## Rule 7: Size the scanner before the sweep runs

A new scanner is on when you create it, and its first sweep starts within minutes. It scans new recordings only. To scan older recordings, run a backfill. Before you save it:

1. Read the **Estimated cost** on the **Budget** step. Compare it with the organization's monthly budget. All projects in the organization share one budget, so a project with few scanners can still be close to the limit.
2. Turn on **Scanner limit** to cap what this scanner can spend in a billing period. When the scanner reaches the limit, it stops scanning until the next period, and it never scans the sessions that it skipped.
3. Turn on **Free credits only** if the customer wants no new charges.
4. Keep the default model. Move a scorer to the cheapest model when the distribution matters more than any one score. The [quota and limits](/docs/replay-vision/quota-and-limits) page lists the price of each model.

Each change to the filter, the sampling rate, the session coverage, or the model changes the estimate. Read it again after each change. In one setup, we moved a scanner from 50% to 100% sampling and to **All recordings**. Its estimate went from about 5,000 to about 13,000 credits a month.

## Rule 8: Test on recordings you know, then rate

1. Turn the scanner off in the **Scanners** list right after you create it. On-demand scans still work while it is off.
2. With the customer, pick 5 to 10 recordings of the flow that you already understand. Include sessions that reached the end and sessions that did not.
3. Scan them from the scanner's **Run** tab with **Batch scan recordings**. See [running scanners on demand](/docs/replay-vision/running-scanners#on-demand-on-recordings-you-pick).
4. Read each observation beside its recording. Fix the prompt where the model misread something obvious.
5. Ask the customer to rate the observations with a thumbs up or down and a short note.
6. Turn the scanner on.

Ratings change later scans automatically. PostHog turns them into rules that every later scan of that scanner follows, and nobody reviews those rules. A wrong rating teaches a wrong rule, so rate only when you are sure. See [improving scanners with ratings](/docs/replay-vision/calibration).

An edit to the prompt makes a new scanner version. Past observations keep the old prompt, so compare ratings within one version.

## After launch: turn observations into answers

Each successful observation writes a `$recording_observed` event into the customer's project. Its result properties start with `scanner_output_`. The [observations docs](/docs/replay-vision/observations#querying-observations-as-events) list every property and give a query for each scanner type.

The set from Rule 3 adds one query that the docs do not have: a join across scanners. This query counts the friction categories in sessions that did not reach the end screen:

```sql
WITH outcome AS (
    SELECT
        toString(properties.session_id) AS session_id,
        JSONExtractString(toString(properties), 'scanner_output_verdict') AS verdict
    FROM events
    WHERE event = '$recording_observed'
      AND properties.scanner_name = 'Onboarding outcome'
      AND timestamp > now() - INTERVAL 30 DAY
),
friction AS (
    SELECT
        toString(properties.session_id) AS session_id,
        arrayJoin(JSONExtract(properties.scanner_output_tags ?? '[]', 'Array(String)')) AS tag
    FROM events
    WHERE event = '$recording_observed'
      AND properties.scanner_name = 'Onboarding friction type'
      AND timestamp > now() - INTERVAL 30 DAY
)
SELECT friction.tag AS tag, count() AS sessions
FROM friction
INNER JOIN outcome ON friction.session_id = outcome.session_id
WHERE outcome.verdict = 'no'
GROUP BY tag
ORDER BY sessions DESC
```

Two notes on this query:

- Join on `session_id`. The event's own `distinct_id` is not the recorded person. To break results down by person, use the `recording_distinct_id` property.
- Read the verdict with `JSONExtractString`. Some projects give `scanner_output_verdict` a Boolean type, and then `properties.scanner_output_verdict` in a `SELECT` returns null.

Then let PostHog watch the results for the customer:

- Add a [scout](/docs/replay-vision/scouts) from the scanner's **Scouts** tab. A scanner judges one recording at a time. A scout compares observations over time and reports when a pattern changes.
- Add an [alert](/docs/replay-vision/alerts) on each match, or on a threshold such as a rise in sessions that did not reach the end.
- If the customer uses [self-driving](/docs/self-driving), turn on the scanner's **Self-driving** setting. Findings then go to the inbox. It is off by default.

For more on scanner design, read [a scanner that watches everything sees nothing](/blog/a-scanner-that-watches-everything-sees-nothing) and the [scanner prompts](/docs/replay-vision/scanner-prompts) library.

## Checklist

| Step       | Check                                                      |
| ---------- | ---------------------------------------------------------- |
| Recording  | Replay is on for the flow, and you know its sampling rate  |
| Scope      | One flow with a visible end, with test users filtered out  |
| Set        | Monitor, classifier, and scorer on one filter at 100%      |
| Prompt     | Every instruction is in the prompt, not the description    |
| Categories | The list matches the prompt and has an escape category     |
| Budget     | Estimate read, scanner limit on                            |
| Test       | 5 to 10 known recordings scanned on demand and rated       |
| Follow-up  | A scout or an alert reads the results                      |

## The one-line version

Pick one flow with a visible end, check what the customer records, and build three scanners on the same filter with the customer. Then test them on recordings that you know before the sweep runs.
