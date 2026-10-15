---
title: Replay Vision experiment scanner cross-sell
sidebar: Handbook
showTitle: true
---

Teams that run a lot of [experiments](/docs/experiments) care about one thing: making data-backed decisions about which variant works better. They do not want to ship on a hunch.

Experiments give them quantitative data – conversion, revenue, and retention for each variant. That tells them _which_ variant won. It does not tell them _why_, so the next decision is still a guess: what to keep, what to fix, and what to test next.

An [experiment scanner](/docs/replay-vision/scanner-types#experiment) adds the qualitative side. It is a [Replay Vision](/docs/replay-vision) scanner that watches the recorded sessions of people in one experiment, writes a short summary of each session, and labels each summary with its variant. The customer gets the numbers and the behavior behind them in the same place.

The pitch, in one line:

> Your experiment tells you that B won by 4%. The experiment scanner shows you what people in B did differently, so you know what to build on.

Experiment scanners are in beta. Say so when you pitch them.

## Step 1: Find accounts that run experiments

Start with your own book. Run this query in the PostHog App + Website project, and replace `Your Name` with your name as it shows in the organization's **Owner** property.

```sql
SELECT
    g.key AS org_id,
    g.properties.name AS account,
    exp.experiments_launched AS experiments_launched_90d,
    exp.launchers AS people_launching,
    toDate(exp.last_launch) AS last_launch,
    coalesce(rp.projects_recording, 0) AS projects_recording,
    rp.max_sample_rate AS max_sample_rate,
    coalesce(rv.scans_30d, 0) AS replay_vision_scans_30d
FROM groups AS g
INNER JOIN (
    SELECT
        properties.$group_0 AS org_id,
        uniq(properties.experiment_id) AS experiments_launched,
        uniq(person_id) AS launchers,
        max(timestamp) AS last_launch
    FROM events
    WHERE event = 'experiment launched'
      AND timestamp >= now() - INTERVAL 90 DAY
    GROUP BY org_id
) AS exp ON g.key = exp.org_id
LEFT JOIN (
    SELECT
        toString(organization_id) AS org_id,
        countIf(session_recording_opt_in) AS projects_recording,
        maxIf(session_recording_sample_rate, session_recording_opt_in) AS max_sample_rate
    FROM all_posthog_team
    GROUP BY org_id
) AS rp ON g.key = rp.org_id
LEFT JOIN (
    SELECT
        properties.organization_id AS org_id,
        count() AS scans_30d
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

This lists your accounts that launched at least two experiments in the last 90 days. Change `>= 2` to widen or narrow the list. The best candidates launch often (`experiments_launched_90d`), launched recently (`last_launch`), and have more than one person launching (`people_launching`) – experimentation is a team habit there, not one person's side project.

`replay_vision_scans_30d` tells you where to start the conversation. At 0, they have not tried Replay Vision, so lead with the "why" pitch. Above 0, they already use it, so show them the experiment type – this is the easiest conversation.

## Step 2: Check that they record the right sessions

A scanner can only watch sessions that exist. Use the same query results:

- **`projects_recording` is 0.** Session Replay is off. Start with a [Session Replay](/docs/session-replay) conversation. The experiment scanner is the second step.
- **`max_sample_rate` is low (for example, 0.1).** Most experiment sessions are not recorded, so the small variant gets very few. Plan a trigger group for the trial (see [step 4](#step-4-run-a-trial)).
- **`max_sample_rate` is empty.** The project has no legacy sample rate. It records every session or uses trigger groups. Check the project's [replay ingestion settings](https://app.posthog.com/replay/settings#selectedSetting=replay-triggers) to see which.

Then confirm three things about the experiments themselves:

- They aggregate by person, not by [group](/docs/product-analytics/group-analytics). The scanner cannot match group exposures to recordings.
- Their users are identified. The scanner skips sessions of anonymous users.
- At least one experiment is running or about to launch. A new scanner only watches sessions from the moment it is turned on.

## Step 3: Find the heavy experiment results viewers

The best champion is the person who already checks experiment results most. They feel the "why did this win?" gap every week. Take the `org_id` from step 1 and run this:

```sql
SELECT
    person.properties.email AS email,
    countIf(event = 'experiment viewed') AS experiment_views,
    countIf(event = 'experiment metrics refreshed') AS manual_refreshes,
    uniqIf(properties.experiment_id, event = 'experiment viewed') AS experiments_viewed,
    countIf(event IN ('experiment created', 'experiment launched')) AS created_or_launched,
    countIf(event IN ('recording viewed', 'recording analyzed')) AS recordings_watched,
    toDate(max(timestamp)) AS last_seen
FROM events
WHERE timestamp >= now() - INTERVAL 30 DAY
  AND properties.$group_0 = '<org_id>'
  AND event IN (
      'experiment viewed',
      'experiment metrics refreshed',
      'experiment created',
      'experiment launched',
      'recording viewed',
      'recording analyzed'
  )
  AND person.properties.email NOT ILIKE '%@posthog.com'
GROUP BY email
ORDER BY experiment_views + manual_refreshes DESC
LIMIT 20
```

How to read it:

- **High `experiment_views` and `manual_refreshes`** – this person watches results closely. They are your champion.
- **High views and high `recordings_watched`** – they already watch recordings to explain results, by hand. A scanner does that job for them. This is the strongest signal on the list.
- **High `created_or_launched`, low views** – this person runs the experiments but someone else reads them. Talk to both. The launcher sets up the scanner, and the viewer uses what it finds.

## Step 4: Run a trial

Keep the trial to one experiment and two to three weeks. Agree on success criteria before you start, for example: "We can explain the result of experiment X with behavior we saw in the recordings."

1. **Pick the experiment with your champion.** Choose one that is running or about to launch, gets enough traffic, and changes something visible on screen.

2. **Make sure the variant sessions get recorded.** In the project's [replay ingestion settings](https://app.posthog.com/replay/settings#selectedSetting=replay-triggers), add a [trigger group](/docs/session-replay/how-to-control-which-sessions-you-record) with a [feature flag condition](/docs/session-replay/how-to-control-which-sessions-you-record#feature-flag-triggers) set to the experiment's flag, and give it a high sample rate. Do not limit the condition to one variant – the scanner needs control sessions too. Groups combine with ANY, so this records the experiment's users without changing how the rest of the project records. It adds replay volume, so include that in the trial budget, and remove the group when the experiment ends.

3. **Add free credits.** Estimate the spend: recorded experiment sessions per day × days left in the experiment × scanner sampling rate × credits per observation. For example, 2,000 sessions a day × 14 days × 5% sampling × 5 credits is 7,000 credits ($70). Add credits to the account to cover it, and write down the amount and the end date (see the [trial guidelines](/handbook/growth/cross-selling/tracking-cross-sells#trial-guidelines)). If the organization is on a sales-led trial, add it to the [`billing-trial-expanded-free-allocation`](/handbook/growth/sales/running-trials#ai-products-in-a-trial) flag instead. Also set a [credit limit](/docs/replay-vision/quota-and-limits#per-scanner-limits) on the scanner, so the trial cannot overspend.

4. **Set up the scanner.** On the experiment's **Recordings** tab, select **Set up experiment scanner**. For a new experiment, turn on **Compare what users do in each variant** in the experiment form. Then:

   - Name the variants by what users see, for example "Single-page checkout" and "Three-step checkout". The model uses the names to tell the variants apart.
   - In **What to focus on**, name the changed screen and ask about behavior after it appears – where people hesitate, retry, or leave.
   - Leave **Sample variants evenly** on, so a 90/10 split still gives the small variant enough sessions.
   - Start with the default model (5 credits per observation). Gemini 3.5 Flash Lite (2 credits) is enough when the change is a layout or flow change and the model does not need to read text.

5. **Test before it goes live.** Scan two or three sessions from each variant on demand and read the summaries with your champion. Fix the focus text now – an edit after the scanner starts splits the comparison into before and after. Then let the customer turn the scanner on. Turning it on starts the spend, so it is their click.

6. **Book the readout** for one week after launch, before the trial starts.

## Step 5: Gather the results across variants and over time

Use these to build the readout:

- **The Variants tab.** For each variant, it shows the observations, the people, the sampling rate, the median session length, and the latest summaries. Read observation counts against the sampling rates – with even sampling, the small variant is sampled at a higher rate, so equal counts do not mean equal traffic.
- **The Variant analysis scout.** Add it from the Variants tab. Each day, it reads the new summaries, counts the behaviors that repeat in each variant, and marks each difference as a trend or as statistically significant. Its reports land in the customer's [inbox](/docs/self-driving/inbox).
- **The Daily digest scout.** Add it from the scanner's [Scouts tab](/docs/replay-vision/scouts). It sends a daily summary of what the scanner found and the sessions worth watching. Use it to keep the champion engaged between check-ins.
- **Trends over time.** Every observation creates a `$recording_observed` event with an `experiment_variant` property. A trend broken down by `experiment_variant` shows how the findings change as the experiment runs.

For the readout, put the experiment result next to two or three behaviors that repeat in each variant, with links to the recordings behind each one. Keep it short – a Loom or a one-page doc. Then expand: turn the scanner on for the next experiment, and move the trial to a paid billing limit.

## Discovery questions

Ask these to find the "why" gap. Each one has what to listen for.

- **"Walk me through the last experiment you shipped. How did you decide which variant to roll out, and who signed off?"** Listen for decisions made on one metric, with no follow-up on what drove it.
- **"When a variant wins, how do you work out which part of the change made it win?"** Listen for "we don't" or "we guess". Teams that cannot answer this often build on the wrong part of a winning change.
- **"Tell me about an experiment that lost or came back flat. What did you do next?"** Listen for reruns, abandoned ideas, or long debates. A flat result with no explanation is wasted traffic.
- **"When a result surprises you, how long does it take to find out why, and who does that work?"** Listen for a person who watches recordings by hand. That person is your champion, and the scanner is their time back.
- **"How many experiments do you run a quarter, and how many get someone to watch the sessions?"** The gap between the two numbers is the size of the opportunity.
- **"Did you ever ship a winner and later find a bug or a confusing step in it?"** Listen for cost – support tickets, a rollback, a lost quarter. That is the business case.
- **"Did a result ever look wrong to you? How did you check it?"** Listen for distrust in the data. If summaries of control sessions show the new design, the flag check in the code is broken and the experiment is really an A/A test. The scanner catches this.
- **"When you share results with leadership or design, what questions come back that the numbers don't answer?"** Listen for "why", "for which users", and "what did it look like". Those are the scanner's answers.
- **"Where do your next experiment ideas come from?"** Listen for gut feel or a backlog. Scanner summaries are a steady source of evidence-backed hypotheses.
- **"If you could watch every session in both variants of your current experiment, what would you look for first?"** Their answer becomes the scanner's **What to focus on** text.
