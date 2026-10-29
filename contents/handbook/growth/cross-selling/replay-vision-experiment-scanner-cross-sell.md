---
title: Replay Vision experiment scanner cross-sell
sidebar: Handbook
showTitle: true
---

[Experiment scanners](/docs/replay-vision/scanner-types#experiment) in Replay Vision summarize sessions across different variants to paint a picture on how users behave differently between variants. For existing users of experiments, the metrics-based results quantitatively tell them which variant won and by how much. The scanner adds what people did in each variant, adding a behavioral/qualitative lens.

This cross-sell playbook outlines which customers in your book are the best candidates for finding experiment scanners valuable, how to ask the right questions and how to run a successful trial with the aim of long-term adoption.

| Step | What you'll achieve |
| --- | --- |
| [1. Prioritize accounts that fit](#prioritize-accounts-that-fit) | A ranked list of accounts in your book, each with a next move |
| [2. Find who to talk to](#find-who-to-talk-to) | A champion and a second contact at each account + a first message |
| [3. Discovery questions](#discovery-questions) | A sense of how much the customer wants this |
| [4. Prepare for the trial](#prepare-for-the-trial) | One or two experiments to scan |
| [5. Run the trial](#run-the-trial) | Scanner results that the customer can compare by variant |


Steps 1, 2 & 4 each have an agent prompt in a collapsed section. Point your agent at this page with the [PostHog MCP server](/docs/model-context-protocol) connected, or copy the prompt and fill in the value in angle brackets, and run it.

## Prioritize accounts that fit

Given that Experiment scanners require customers to already use both, Experiments & Session Replay, a key piece to prioritizing accounts for outreach is to understand how deeply they use both at the moment. Experiments come first because the scanner needs one to compare, and replay is something you can help them turn on.

### Experiments use

Start with understanding how strong their existing usage is for experiments:

| Fit | Experiments launched in 90 days | Also needs |
| --- | --- | --- |
| Strong | 6 or more | Two or more people launch them, and the latest launch is in the last 30 days |
| Possible | 2 to 5 | The latest launch is in the last 30 days |
| Long-shot | Fewer than 2 | The latest launch is in the last 90 days |
| Not yet | None | Leave these out and check again later |

### Session Replay and Replay Vision use

Once you have a sense of their Experiments usage, the next step is to understand their Session Replay usage (or even better, their existing Replay Vision usage if they have any). Based on that, consider bucketing accounts as shown in the table below. They're listed in priority order, so work down from the top - the higher the bucket, the less there is to set up before a trial & the more likely this cross-sell will be a good fit for them:

| Bucket | What you see | Next move |
| --- | --- | --- |
| Uses Replay Vision on experiments but no Experiment scanner type | Scans in the last 7 days, none from an experiment scanner | Short pitch - they know scanners already, so just show them the experiment type. |
| Uses Replay Vision, not on experiments | Scans in the last 7 days, not targeting feature flags | Short pitch as well - they know scanners targeting other triggers, so show them the value of qualitatively capturing user behavior across variants |
| Records sessions, uses Experiments, no Replay Vision | Recordings this billing period, no scans | Full pitch and a trial. |
| No Session Replay, but uses Experiments | No recordings this billing period | Start with Session Replay. See [the next section](#if-they-do-not-record-sessions-yet). |

Quick note: some accounts have older scanners that filter on an experiment's feature flag. Those don't label sessions by variant, so if you see one, offer to swap each one with an experiment scanner.

#### If they do not record sessions yet

Since recordings are required for the scanner to work, try a combined Session Replay + Replay Vision pitch [Session Replay](/docs/session-replay) first, and keep the scope small with [trigger groups](/docs/session-replay/how-to-control-which-sessions-you-record).

1. Cross-sell through Error Tracking:
   - If the account uses [Error Tracking](/docs/error-tracking), start there:
   - Add a trigger group with an [event trigger](/docs/session-replay/how-to-control-which-sessions-you-record#event-triggers) on `$exception`.
   - Each exception then [links to its recording](/docs/error-tracking/managing-issues#watch-session-replays), so the team sees what the user did before the error.
   - This lands really well, as there's existing friction.
2. Cross-sell through Feature Flags/Experiments:
   - Add a second trigger group with a [feature flag trigger](/docs/session-replay/how-to-control-which-sessions-you-record#feature-flag-triggers) on the experiment's flag.
   - The experiment scanner needs these recordings. PostHog records a session when it matches either group.

<details>
<summary>Agent prompt: list the accounts in your book that fit</summary>

```text
Use the PostHog MCP server in project 2 (PostHog App + Website). Read only. Do not create or change anything.

Goal: list the organizations that I own that fit the Replay Vision experiment scanner cross-sell.

1. Find my organizations. They are groups of type "organization" (group index 0) where the group property owner_email is <your email>.

2. For each organization, read the event "experiment launched" from the last 90 days. Match the organization with the event property $group_0. Get:
   - experiments_launched: distinct values of the event property experiment_id
   - people_launching: distinct people who sent the event
   - last_launch: the date of the latest event

3. Give each organization an experiment fit:
   - Strong: experiments_launched is 8 or more, people_launching is 2 or more, and last_launch is in the last 30 days.
   - Possible: experiments_launched is 3 to 7, and last_launch is in the last 30 days.
   - Long-shot: all other organizations with 1 or more experiments launched in the last 90 days.
   - Not yet: no experiments launched in the last 90 days. Leave these organizations out.

4. For each Strong, Possible, or Long-shot organization, get:
   - recordings: the group property recording_count_in_period plus mobile_recording_count_in_period (treat null as 0)
   - exceptions: the group property exceptions_captured_in_period (treat null as 0)
   - From the event "replay_vision_scan_completed", matched on the event property organization_id:
     scans_30d (last 30 days), scans_7d (last 7 days), and experiment_scans_30d (last 30 days, where the event property scanner_type is "experiment")
   - older_experiment_scanner: yes if the organization has a "replay_vision_scanner_created" event where has_experiment_targeting is true and scanner_type is not "experiment"

5. If experiment_scans_30d > 0, the organization already uses the experiment scanner. Leave it out.

6. Give each other organization the first bucket that matches, with its next move:
   - "Uses Replay Vision on experiments without new scanner type" if scans_7d > 0 and older_experiment_scanner is yes. Next move: short pitch. They know scanners, so show them the experiment type.
   - "Uses Replay Vision, not on experiments" if scans_7d > 0. Next move: short pitch. Show them the value of qualitatively capturing user behavior across variants.
   - "Stopped using Replay Vision" if scans_30d > 0 and scans_7d = 0. Next move: ask what stopped them, then show the experiment scanner on an experiment they run now.
   - "Records sessions, uses Experiments, no Replay Vision" if recordings > 0. Next move: full pitch and a trial.
   - "No Session Replay, but uses Experiments" for all others. Next move: pitch Session Replay first with trigger groups. If exceptions > 0, start with an $exception trigger group for Error Tracking.

7. Sort by bucket in the order of the list in step 6. Inside each bucket, sort by fit (Strong, Possible, Long-shot), then by experiments_launched, highest first.

8. Return one table with these columns: account name, organization ID, fit, experiments_launched, people_launching, last_launch, bucket, recordings, uses Error Tracking (exceptions > 0), older_experiment_scanner, next move.

9. Under the table, add one line: the recording and exception counts cover the current billing period only, so they are low in the first days of a period.
```

</details>

## Find who to talk to

Your champion is whoever reads experiment results most often. If they also open recordings from their experiments, they already do by hand what the scanner does, so start with them first.

| Person | How to find them | Why they matter |
| --- | --- | --- |
| Experiment results reader who also watches recordings | Top 3 for experiment views and refreshes, and opens recordings from experiments | Your best champion, since the scanner saves them the most time for something they're already doing |
| Experiment results reader | Top 3 for experiment views and refreshes | Your champion, if there's no experiment results reader who watches recordings. They're the ones asking why a variant won. |
| Experiment creator | Creates and launches experiments, views fewer results | Your second contact, since they set up the scanner and at least tangentially care about the results. |
| Replay Vision user | Views Replay Vision observations | A second contact who already knows the energy drain in watching sessions manually |

### How to contact them

Tag both of them in one message, while:
- Naming an experiment that they run,
- Mentioning what the scanner adds, and
- Asking one question.

Something like this:

> Hey Ana and Bob! Replay Vision now has an Experiment scanner. You link it to an experiment and it groups session summaries by variant, so you can see how users behave differently in each one without watching sessions yourself.
>
> Plus, a daily scout can also summarize what differs between the variants. Want to try it on the checkout test? I can set it up with you and cover the cost of the trial.

<details>
<summary>Agent prompt: find who to talk to at one account</summary>

```text
Use the PostHog MCP server in project 2 (PostHog App + Website). Read only. Do not create or change anything.

Goal: find the people to contact at one organization about the Replay Vision experiment scanner.

Organization ID: <organization ID from step 1>

1. Read events from the last 30 days where the event property $group_0 is the organization ID. Leave out people whose person property email ends in @posthog.com.

2. For each person (person property email), count:
   - experiment_views: "experiment viewed" events
   - experiments_viewed: distinct experiment_id values in "experiment viewed" events
   - refreshes: "experiment metrics refreshed" events
   - created_or_launched: "experiment created" and "experiment launched" events
   - experiment_recordings: "experiment recording opened" and "experiment recordings tab viewed" events
   - recordings_viewed: "recording viewed" events
   - observations_viewed: "replay_vision_observation_viewed" events
   - last_seen: the date of their latest event in this list

3. Rank the people whose experiment_views is 1 or more by experiment_views plus refreshes. Only people in this ranking can get a reader role.
   Give each person the first role that matches:
   - "Experiment results reader who also watches recordings": in the top 3 of the ranking, and experiment_recordings is 1 or more.
   - "Experiment results reader": in the top 3 of the ranking.
   - "Experiment creator": created_or_launched is 2 or more.
   - "Replay Vision user": observations_viewed is 1 or more.
   - Leave all other people out.

4. Pick the champion: the first "Experiment results reader who also watches recordings". If there is none, the first "Experiment results reader".
   Pick the second contact: the first "Experiment creator". If there is none, the first "Replay Vision user".
   If there is no reader, write "No champion: nobody viewed experiment results in the last 30 days." Then do step 5 and skip steps 6 and 7.

5. Return a table with: email, role, experiment_views, experiments_viewed, refreshes, created_or_launched, experiment_recordings, recordings_viewed, observations_viewed, last_seen. Mark the champion and the second contact.

6. Find the experiment that the champion viewed most. Use the event property name on their "experiment viewed" events.

7. Write a first message to the champion and the second contact, in four sentences or fewer. Name that experiment. Say that an experiment scanner groups session summaries from the experiment by variant, and that a daily scout can summarize what differs between the variants. Ask if they want to try it on that experiment.
```

</details>

## Discovery questions

After a successful first pitch, use these as inspiration for how to start a conversation and dive deeper:

| Question | What to listen for |
| --- | --- |
| Tell me about the last experiment you shipped. How did the team decide the winner was safe to roll out? | How much they trust the numbers on their own. If they mention extra checks or if there's any doubt, there's room for them to understand the "why" through scanners. |
| When a result comes back flat or surprising, what does someone do next? | If someone watches recordings manually, this automatically saves them the most time. If they rerun the test or just guess, then they have no idea on the "why" yet. |
| Does anyone pull recordings or session summaries into their own tools, like a notebook or an agent, to explain a result? | That's effectively a "Mom: We have a scanner at home" flow. Show them that the **Variant analysis** scout (mentioned below) does this inside PostHog, where the whole team can see it. |
| Which of your experiment metrics come from backend events? | If they care about backend metrics, an important check is ensuring that those events carry `$session_id`, so each backend event links to a recording. |
| If you could put one more number on each variant, next to the main metric, what would it be? | The behavior they care about, like frustration or confusion. Use it in the focus text for setting up the scanner! |
| After an experiment is concluded, who asks why a variant won, and how are those metrics/changed communicated? | A wider audience that might care, such as design, leadership, or support. Scout reports can go to a Slack channel for them. |
| Did you ever ship a winner that later confused people or caused support tickets? | This helps drill why they need a scanner like this, as this is the cost of not knowing the "why". Maybe ask for the experiment name and use it in the pitch? |
| Which experiment that runs now are you least sure about? | This would be the perfect trial experiment to run the scanner on. |

Watch out for these signs that'll make it clear they want/need this:

- They name a specific experiment or result right away.
- Someone already watches recordings or summarizes sessions to explain results.
- Another team asks "why" after every readout.
- They've got a test launching soon, and aren't sure what to expect.

## Prepare for the trial

Go into the first call with one or two experiments in mind and a draft of what the scanner should look for in each.

The fastest way is to look around the customer's project while you [impersonate a user](/handbook/company/security#impersonating-users) (ask for their permission first).

Here's what to check:

1. Running and planned experiments:
   - Read each hypothesis and find what changes on screen.
   - UI changes to a flow/layout make for excellent candidates, because the difference shows in the recording. A change to a ranking algorithm is harder to see.
2. Exposures and the split between variants:
   - Each variant needs enough exposed users to give the scanner sessions to work with.
   - The experiment has to aggregate by person, since the scanner can't match [group](/docs/product-analytics/group-analytics) exposures to recordings. The scanner also skips anonymous sessions.
3. The experiment's Recordings tab:
   - If it shows few or no sessions, replay does not record the changed pages.
   - Check the sample rate and trigger groups in the [replay ingestion settings](https://app.posthog.com/replay/settings#selectedSetting=replay-triggers).
4. Backend metrics:
   - The scanner selects recordings by the exposed person, so backend metrics still count.
   - To open the recording for a backend event, that event needs `$session_id`.
   - [Tracing headers](/docs/libraries/js/config#tracing-headers) send the browser session ID to the backend.
5. Existing Replay Vision scanners:
   - This is the golden scenario: Start with an experiment that an existing scanner already watches. The customer can then compare the two outputs.

Then, draft the scanner's focus text for each experiment from its hypothesis. For example:
- For a new checkout flow, ask where people hesitate, retry, or leave after the payment step appears.
- For an onboarding change, ask where people stall or skip ahead.
Bring the drafts to any meetings you've booked or create a prototype scanner with their permission so the customer has something to react to.

Quick note: an experiment scanner returns a summary for each session. It does not return a score, classification or boolean monitor response like the other scanner types at the moment.

<details>
<summary>Agent prompt: read-only prep in the customer's project</summary>

```text
You are connected to a customer's PostHog project through the PostHog MCP server, in read-only mode.
Do not create, edit, or delete anything. Do not run Replay Vision scans.

1. List experiments that are running, or in draft and due to launch. For each one, give the name, hypothesis,
   feature flag key, variants, start date, aggregation type (person or group), and exposures per variant.

2. For each running experiment, check if session recordings exist for exposed users in each variant
   over the last 7 days.

3. Read the project's session replay settings: if recording is on, the sample rate, and the trigger groups,
   including feature flag triggers.

4. For each running experiment, list the metrics and say which ones use events from a backend SDK.
   For each backend event, check what share of the last 7 days of events carry the property $session_id.

5. List the existing Replay Vision scanners. Mark each scanner that targets an experiment
   or filters on an experiment's feature flag.

6. Recommend up to two experiments for an experiment scanner, with one sentence each about why.
   Prefer experiments that change something visible on screen, aggregate by person,
   have recordings in every variant, and already have a scanner on them.

7. For each recommendation, draft one or two sentences of "What to focus on" text from the hypothesis.
   Describe the changed screen. Do not say which variant shows what.
```

</details>

## Run the trial

1. Determining success criteria:
   - Agree on the experiment and what success looks like with your champion.
   - 1-2 weeks on one experiment is enough, and the goal can be something simple like: "we can explain the result of experiment X with behavior from the recordings." 

2. Make sure that replay records the variant sessions:
   - In the project's [replay ingestion settings](https://app.posthog.com/replay/settings#selectedSetting=replay-triggers), add a trigger group with a [feature flag condition](/docs/session-replay/how-to-control-which-sessions-you-record#feature-flag-triggers) on the experiment's flag.
   - Give it a high sample rate, and leave it open to every variant, because the scanner needs control sessions too.
      - Groups combine with ANY, so the rest of the project keeps recording as before.
      - The extra group adds replay volume, so include it in the trial budget.

3. Add free credits using an estimated spend from what the scanner tells you + the expected rise in session replays (based on our [trial guidelines](/handbook/growth/cross-selling/tracking-cross-sells#trial-guidelines)).
   
4. Set up the scanner:
   - On the experiment's **Recordings** tab, select **Set up experiment scanner**. For a new experiment, turn on **Compare what users do in each variant** in the experiment form. Then:
      - Name each variant after what users see, like "Single-page checkout" and "Three-step checkout". The model uses those names to tell the variants apart.
      - Paste your focus text into **What to focus on**. It should name the changed screen and asks about behavior after it appears.
      - Keep **Sample variants evenly** on, so even a 90/10 split then still gives the small variant enough sessions.
      - Start with the default model at 5 credits per observation, it should be enough for a layout or flow change.
   - A new scanner turns on when you save it, and its [first sweep starts within minutes](/docs/replay-vision/creating-scanners#enabling-and-disabling).
      - From the experiment form, it turns on when the experiment launches. Turn the scanner off in the **Scanners** list right after it turns on. It then spends no credits before you test the focus text.

5. Test before the scanner goes live:
   - Scan 2-3 sessions from each variant on demand, and read the summaries with your champion to make sure it all looks good. Then let the customer turn the scanner on.

### Read the results

The scanner's **Variants** tab shows the observations, people, sampling rate, median session length, and latest summaries for each variant.

To compare the variants over time, add the **Variant analysis** scout from the same **Variants** tab. Every day, it reads the new summaries, counts the behaviors that show up in each variant and flags each difference as a trend or statistically significant. It sends its reports to the customer's [inbox](/docs/self-driving/inbox).

The **Daily digest** scout on the scanner's [**Scouts** tab](/docs/replay-vision/scouts) sends a daily summary of what the scanner found and which sessions are worth watching. It keeps your champion looking between check-ins.

Each observation also creates a `$recording_observed` event with an `experiment_variant` property, so a trend broken down by `experiment_variant` shows how the findings shift while the experiment runs.

For the readout, put the experiment result next to two or three behaviors that repeat in each variant, and link the recordings behind each behavior. Bonus points if you record a Loom video walking through this!

If it lands, turn the scanner on for their next experiment and move the trial to a paid billing limit.
