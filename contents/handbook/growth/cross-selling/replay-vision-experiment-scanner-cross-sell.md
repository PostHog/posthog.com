---
title: Replay Vision experiment scanner cross-sell
sidebar: Handbook
showTitle: true
---

Teams that run a lot of [experiments](/docs/experiments) want to ship the variant the data supports, and they put real effort into measuring it. Experiment results are quantitative. They show which variant won on conversion, revenue, or retention, and by how much. They don't show what people did in each variant, so the team still has to guess what made the winner win, or why a test came back flat.

An [experiment scanner](/docs/replay-vision/scanner-types#experiment) adds the qualitative side. It's a [Replay Vision](/docs/replay-vision) scanner that watches the recorded sessions of people in one experiment, writes a short summary of each session, and labels each summary with its variant. The customer gets the result and the behavior behind it in the same place.

Experiment scanners are in beta, so say so when you pitch them.

## Find accounts that are a good fit

Start with accounts that already run experiments, then check whether they record sessions. The query below does both for your book of business.

<details>
<summary>SQL: experiment-heavy accounts in your book</summary>

Run this in the PostHog App + Website project (project 2), either in the SQL editor or through the PostHog MCP `execute-sql` tool. Replace `Your Name` with your name as it appears in the organization's `owner_name` property. The query returns your accounts that launched at least two experiments in the last 90 days.

```sql
SELECT
    g.key AS org_id,
    g.properties.name AS account,
    exp.experiments_launched AS experiments_launched_90d,
    exp.launchers AS people_launching,
    toDate(exp.last_launch) AS last_launch,
    coalesce(toInt(g.properties.recording_count_in_period), 0)
        + coalesce(toInt(g.properties.mobile_recording_count_in_period), 0) AS recordings_this_period,
    coalesce(toInt(g.properties.exceptions_captured_in_period), 0) AS exceptions_this_period,
    toString(g.properties.usage_products_30d) AS products_used_30d,
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

| Column | What it tells you |
| --- | --- |
| `org_id` | The organization ID. You need it for the query in [find who to talk to](#find-who-to-talk-to). |
| `experiments_launched_90d` | How many different experiments the organization launched in the last 90 days. |
| `people_launching` | How many people launched them. |
| `last_launch` | The date of the most recent launch. |
| `recordings_this_period` | Web and mobile session recordings so far in the current billing period. |
| `exceptions_this_period` | Exceptions captured so far in the current billing period. Above 0 means they use Error Tracking. |
| `products_used_30d` | The products the organization used in the last 30 days. |
| `replay_vision_scans_30d` | Replay Vision scans in the last 30 days. |

</details>

### Do they use experiments?

Look for accounts that launch often and launched recently. A `people_launching` count above 1 means experimentation is a team habit that doesn't depend on one person. An account that launched two experiments last quarter and none since is a weaker fit than one that launched last week. Change `>= 2` in the query to widen or narrow the list.

### Do they have Session Replay?

A scanner can only watch sessions that were recorded. If `recordings_this_period` is 0 and `recordings` is missing from `products_used_30d`, the account doesn't use [Session Replay](/docs/session-replay). The recording count covers the current billing period only, so it reads low in the first few days of a period.

`replay_vision_scans_30d` shows how warm they are. An account that already uses Replay Vision only needs to hear about the experiment type, which makes for a short conversation. An account at 0 needs the full pitch.

#### If they don't record sessions yet

An account with experiments and no Session Replay is a two-product conversation, and replay comes first. [Trigger groups](/docs/session-replay/how-to-control-which-sessions-you-record) make it easier to say yes, because they record only the sessions the customer cares about.

If `exceptions_this_period` is above 0 or `error_tracking` is in `products_used_30d`, they use [Error Tracking](/docs/error-tracking). Start there. A trigger group with an [event trigger](/docs/session-replay/how-to-control-which-sessions-you-record#event-triggers) on `$exception` records the sessions where an error fired, and each exception then [links to its recording](/docs/error-tracking/managing-issues#watch-session-replays), so the team can see what the user did before it. Most engineering teams want that on its own.

Then add a second trigger group with a [feature flag trigger](/docs/session-replay/how-to-control-which-sessions-you-record#feature-flag-triggers) set to the experiment's flag, so sessions in every variant get recorded. That's the group the experiment scanner needs later. A session is recorded when it matches either group, so the two run side by side. Set a billing limit on Session Replay for the trial so the cost stays predictable.

## Find who to talk to

Start with the person who checks experiment results most often. They're the one who keeps asking why a variant won, and they're often someone other than the main contact in the account plan. Use the data to find them.

<details>
<summary>SQL: who views experiment results at an account</summary>

Run this in project 2. Replace `<org_id>` with an `org_id` from the first query. The query ranks the account's users by how often they viewed and refreshed experiment results in the last 30 days.

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

| Column | What it tells you |
| --- | --- |
| `experiment_views` | How often the person opened an experiment. |
| `manual_refreshes` | How often they refreshed an experiment's results by hand. |
| `experiments_viewed` | How many different experiments they opened. |
| `created_or_launched` | How many experiments they created or launched. |
| `recordings_watched` | How many session recordings they opened or ran AI analysis on. |
| `last_seen` | The date of their most recent event in this list. |

</details>

How to read the results:

- A person near the top for views and manual refreshes reads results closely. They're your champion.
- A person with high views and high `recordings_watched` already opens recordings to explain results by hand. A scanner does that work for them, so start with them if you find one.
- A person with high `created_or_launched` and few views sets experiments up while someone else reads them. Talk to both. The person who launches can set up the scanner, and the person who reads results uses what it finds.

## Prepare for the trial

Go into the first call with a specific experiment in mind and a rough idea of what a scanner should look for in it. To get there, you need to know what the account tests.

The fastest way is to look at their project while impersonating a user. Ask the customer first, and follow the [impersonation rules](/handbook/company/security#impersonating-users). Stay in read-only mode and don't change anything without their explicit consent. If you work with an agent, connect the PostHog MCP server while impersonating, using [these steps](/handbook/cs-and-onboarding/handling-customer-issues#using-the-mcp-server-while-impersonating).

What to look at:

1. Running and planned experiments. Read each hypothesis and check what changes on screen. Experiments that change a flow or a layout make the best candidates, because the difference shows up in the recording. A change to something like a ranking algorithm is harder to see.
2. Exposures and the split. Each variant needs enough exposed users to give the scanner sessions to read. Check that the experiment aggregates by person, because the scanner can't match [group](/docs/product-analytics/group-analytics) exposures to recordings. Check that most users are identified, because the scanner skips anonymous sessions.
3. The experiment's **Recordings** tab. Few or no sessions there means replay doesn't record the changed pages. Look at the sample rate and trigger groups in the [replay ingestion settings](https://app.posthog.com/replay/settings#selectedSetting=replay-triggers).
4. Existing Replay Vision scanners. Scanners that filter on an experiment's flag predate the experiment type and don't label sessions by variant. Offer to replace one with an experiment scanner.
5. What the team already saves. Replay collections, saved filters, and notebooks about an experiment show you what they care about.

Pick one or two experiments and draft the scanner's focus text for each, based on the hypothesis. For a new checkout flow, ask where people hesitate, retry, or leave after the payment step appears. For an onboarding change, ask where people stall or skip ahead. For a pricing page test, ask what people compare before they pick a plan. Bring the drafts to the call so the customer has something concrete to react to.

<details>
<summary>Prompt: read-only prep with an agent</summary>

Use this with an agent that's connected to the customer's project through the PostHog MCP server while you impersonate a user.

```
You are connected to a customer's PostHog project in read-only mode. Do not create,
edit, or delete anything, and do not run Replay Vision scans.

1. List experiments that are running, or in draft and due to launch. For each one, give
   the name, hypothesis, feature flag key, variants, start date, aggregation type
   (person or group), and exposures per variant.
2. For each running experiment, check whether session recordings exist for exposed
   users in each variant over the last 7 days.
3. Read the project's session replay settings: whether recording is on, the sample
   rate, and any trigger groups, including feature flag triggers.
4. List existing Replay Vision scanners. Flag any that target an experiment or filter
   on an experiment's feature flag.
5. Recommend up to two experiments for an experiment scanner, with one sentence each
   on why. Prefer experiments that change something visible on screen, aggregate by
   person, and have recordings in every variant.
6. For each recommendation, draft one or two sentences of "What to focus on" text,
   based on the hypothesis. Describe the changed screen without saying which variant
   shows what.
```

</details>

## Run the trial

1. Agree on the experiment and the success criteria with your champion. Two to three weeks on one experiment is enough. A success criterion can be as simple as "we can explain the result of experiment X with behavior we saw in the recordings." Book the readout for one week after launch before the trial starts.

2. Make sure the variant sessions get recorded. In the project's [replay ingestion settings](https://app.posthog.com/replay/settings#selectedSetting=replay-triggers), add a trigger group with a [feature flag condition](/docs/session-replay/how-to-control-which-sessions-you-record#feature-flag-triggers) set to the experiment's flag, and give it a high sample rate. Leave the condition open to every variant, because the scanner needs control sessions too. Groups combine with ANY, so this records the experiment's users without changing how the rest of the project records. It adds replay volume, so include that in the trial budget, and remove the group when the experiment ends.

3. Add free credits. Estimate the spend as recorded experiment sessions per day × days left in the experiment × scanner sampling rate × credits per observation. For example, 2,000 sessions a day × 14 days × 5% sampling × 5 credits is 7,000 credits ($70). Add credits to the account to cover it, and write down the amount and the end date, as the [trial guidelines](/handbook/growth/cross-selling/tracking-cross-sells#trial-guidelines) describe. If the organization is on a sales-led trial, add it to the [`billing-trial-expanded-free-allocation`](/handbook/growth/sales/running-trials#ai-products-in-a-trial) flag instead. Also set a [credit limit](/docs/replay-vision/quota-and-limits#per-scanner-limits) on the scanner so the trial can't overspend.

4. Set up the scanner. On the experiment's **Recordings** tab, select **Set up experiment scanner**. For a new experiment, turn on **Compare what users do in each variant** in the experiment form instead. Then:

   - Name the variants by what users see, for example "Single-page checkout" and "Three-step checkout". The model uses the names to tell the variants apart.
   - Paste the focus text you drafted into **What to focus on**. It should name the changed screen and ask about behavior after it appears.
   - Leave **Sample variants evenly** on, so a 90/10 split still gives the small variant enough sessions.
   - Start with the default model at 5 credits per observation. Gemini 3.5 Flash Lite costs 2 credits and is enough for a layout or flow change where the model doesn't need to read text on screen.

5. Test before it goes live. Scan two or three sessions from each variant on demand and read the summaries with your champion. Fix the focus text now, because an edit after the scanner starts splits the comparison into a before and an after. Then let the customer turn the scanner on. That starts the spend, so it's their click.

### Read the results

The scanner's **Variants** tab shows the observations, people, sampling rate, median session length, and latest summaries for each variant. With even sampling, a small variant is sampled at a higher rate, so read the observation counts against the sampling rates. Equal counts don't mean equal traffic.

To compare the variants over time, add the **Variant analysis** scout from the Variants tab. Each day it reads the new summaries, counts the behaviors that repeat in each variant, and marks each difference as a trend or as statistically significant. Its reports land in the customer's [inbox](/docs/self-driving/inbox).

The **Daily digest** scout, on the scanner's [Scouts tab](/docs/replay-vision/scouts), sends a daily summary of what the scanner found and the sessions worth watching. It keeps your champion looking between check-ins.

Every observation also creates a `$recording_observed` event with an `experiment_variant` property. A trend broken down by `experiment_variant` shows how the findings change as the experiment runs.

For the readout, put the experiment result next to two or three behaviors that repeat in each variant, with links to the recordings behind each one. A Loom or a one-page doc is enough. If it lands, turn the scanner on for their next experiment and move the trial onto a paid billing limit.

## Discovery questions

Use these to open the conversation. Ask one or two, let the customer talk, and get a feel for how much they care about the gap between their numbers and what their users did.

- What's an experiment result from the last few months that surprised you?
- When a variant wins, how do you decide which part of the change to build on?
- What usually happens after a test comes back flat?
- How often does someone on the team open recordings to make sense of a result?
- If you could watch a few hundred sessions from each variant of the test you're running now, what would you look for first?
- When you share results with design or leadership, what do they ask that the numbers can't answer?
- Have you ever shipped a winner and found out later that part of it confused people?
- Which upcoming experiment are you least sure about?
- Where do ideas for your next tests come from today?

Signs that they have an appetite for this:

- They name a specific experiment or result straight away.
- Someone already watches recordings to explain results, or says they wish they had time to.
- Another team asks them "why" after every readout.
- They have a test launching soon and aren't sure what to expect.
