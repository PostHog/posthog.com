---
title: Replay Vision experiment scanner cross-sell
sidebar: Handbook
showTitle: true
---

Experiment results show which variant won and by how much. They do not show what people did in each variant. The team has to guess why a variant won, or why a test came back flat.

An [experiment scanner](/docs/replay-vision/scanner-types#experiment) gives them that answer. It is a [Replay Vision](/docs/replay-vision) scanner that summarizes the recorded sessions of people in one experiment and labels each summary with its variant. Experiment scanners are in beta, so tell the customer this when you pitch.

| Step | What you have at the end |
| --- | --- |
| [1. Find accounts that fit](#find-accounts-that-fit) | A ranked list of accounts in your book, each with a next move |
| [2. Find who to talk to](#find-who-to-talk-to) | A champion and a second contact at each account, and a first message |
| [3. Prepare for the trial](#prepare-for-the-trial) | One or two experiments to scan, with draft focus text |
| [4. Run the trial](#run-the-trial) | Scanner results that the customer compares by variant |
| [5. Discovery questions](#discovery-questions) | A sense of how much the customer wants this |

Steps 1 to 3 each have an agent prompt in a collapsed section. Copy the prompt into an agent that has the [PostHog MCP server](/docs/model-context-protocol) connected, fill in the value in angle brackets, and run it.

## Find accounts that fit

An account fits when it launches experiments often and records sessions, or can start to record them. Check both for each account in your book.

### Experiment use

Count the experiments that the organization launched in the last 90 days.

| Fit | Experiments launched in 90 days | Also needs |
| --- | --- | --- |
| Strong | 10 or more | Two or more people launch them, and the latest launch is in the last 30 days |
| Possible | 3 to 9 | The latest launch is in the last 30 days |
| Not yet | Fewer than 3 | Leave these out and check again next quarter |

### Replay and Replay Vision use

Each account gets one status. Contact them in the order of this table, from the top.

| Status | What you see | Next move |
| --- | --- | --- |
| Stopped using Replay Vision | Scans in the last 30 days, none in the last 7 | Contact them this week. Ask what stopped them, then show the experiment scanner on an experiment they run now. |
| Uses Replay Vision, not on experiments | Scans in the last 7 days, none from an experiment scanner | Short pitch. They know scanners, so show them the experiment type. |
| Records sessions, no Replay Vision | Recordings this billing period, no scans | Full pitch and a trial. |
| No Session Replay | No recordings this billing period | Start with Session Replay. See [the next section](#if-they-do-not-record-sessions-yet). |
| Scans experiments now | Scans from an experiment scanner in the last 30 days | Expansion. Add their other experiments and the **Variant analysis** scout. |

Some accounts have older scanners that filter on an experiment's feature flag. These scanners do not label sessions by variant. Offer to replace each one with an experiment scanner.

#### If they do not record sessions yet

Pitch [Session Replay](/docs/session-replay) first, and keep the scope small with [trigger groups](/docs/session-replay/how-to-control-which-sessions-you-record).

1. If the account uses [Error Tracking](/docs/error-tracking), start there. Add a trigger group with an [event trigger](/docs/session-replay/how-to-control-which-sessions-you-record#event-triggers) on `$exception`. Each exception then [links to its recording](/docs/error-tracking/managing-issues#watch-session-replays), so the team sees what the user did before the error.
2. Add a second trigger group with a [feature flag trigger](/docs/session-replay/how-to-control-which-sessions-you-record#feature-flag-triggers) on the experiment's flag. The experiment scanner needs these recordings. PostHog records a session when it matches either group.
3. Set a billing limit on Session Replay for the trial.

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
   - Strong: experiments_launched is 10 or more, people_launching is 2 or more, and last_launch is in the last 30 days.
   - Possible: experiments_launched is 3 to 9, and last_launch is in the last 30 days.
   - Not yet: all others. Leave these organizations out.

4. For each Strong or Possible organization, get:
   - recordings: the group property recording_count_in_period plus mobile_recording_count_in_period (treat null as 0)
   - exceptions: the group property exceptions_captured_in_period (treat null as 0)
   - From the event "replay_vision_scan_completed", matched on the event property organization_id:
     scans_30d (last 30 days), scans_7d (last 7 days), and experiment_scans_30d (last 30 days, where the event property scanner_type is "experiment")
   - older_experiment_scanner: yes if the organization has a "replay_vision_scanner_created" event where has_experiment_targeting is true and scanner_type is not "experiment"

5. Give each organization the first status that matches, with its next move:
   - "Scans experiments now" if experiment_scans_30d > 0. Next move: add their other experiments and the Variant analysis scout.
   - "Stopped using Replay Vision" if scans_30d > 0 and scans_7d = 0. Next move: contact them this week, ask what stopped them, and show the experiment scanner.
   - "Uses Replay Vision, not on experiments" if scans_7d > 0. Next move: short pitch for the experiment scanner type.
   - "Records sessions, no Replay Vision" if recordings > 0. Next move: full pitch and a trial.
   - "No Session Replay" for all others. Next move: pitch Session Replay first with trigger groups. If exceptions > 0, start with an $exception trigger group for Error Tracking.

6. Sort by status in this order: Stopped using Replay Vision, Uses Replay Vision not on experiments, Records sessions no Replay Vision, No Session Replay, Scans experiments now. Inside each status, sort by experiments_launched, highest first.

7. Return one table with these columns: account name, organization ID, fit, experiments_launched, people_launching, last_launch, status, recordings, uses Error Tracking (exceptions > 0), older_experiment_scanner, next move.

8. Under the table, add one line: the recording and exception counts cover the current billing period only, so they are low in the first days of a period.
```

</details>

## Find who to talk to

Your champion is the person who reads experiment results most often. If that person also opens recordings from an experiment, they already do by hand what the scanner does. Contact them first.

| Person | How to find them | Why they matter |
| --- | --- | --- |
| Reader who watches recordings | Top 3 for experiment views and refreshes, and opens recordings from experiments | Your best champion. The scanner saves them the most time. |
| Results reader | Top 3 for experiment views and refreshes | Your champion if there is no reader who watches recordings. They ask why a variant won. |
| Launcher | Creates and launches experiments, views fewer results | Your second contact. They set up the scanner. |
| Replay Vision user | Views Replay Vision observations | A second contact who already knows scanners. |

### How to contact them

Use the account's shared Slack channel if it has one. Tag the champion and the second contact in one message. Name an experiment that they run now, say what the scanner adds, and ask one question. For example:

> Hi Ana and Ben. Replay Vision now has an experiment scanner. You link it to an experiment, and it groups session summaries by variant. A daily scout can also summarize what differs between the variants. Your experiment results show what changed, and the scanner shows why. Do you want to try it on the checkout test? I can set it up with you and cover the cost of the trial.

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

3. Rank people by experiment_views plus refreshes. Give each person the first role that matches:
   - "Reader who watches recordings": in the top 3, and experiment_recordings is 1 or more.
   - "Results reader": in the top 3.
   - "Launcher": created_or_launched is 2 or more.
   - "Replay Vision user": observations_viewed is 1 or more.
   - Leave all other people out.

4. Pick the champion: the first "Reader who watches recordings". If there is none, the first "Results reader".
   Pick the second contact: the first "Launcher". If there is none, the first "Replay Vision user".

5. Return a table with: email, role, experiment_views, experiments_viewed, refreshes, created_or_launched, experiment_recordings, recordings_viewed, observations_viewed, last_seen. Mark the champion and the second contact.

6. Find the experiment that the champion viewed most. Use the event property name on their "experiment viewed" events.

7. Write a first message to the champion and the second contact, in four sentences or fewer. Name that experiment. Say that an experiment scanner groups session summaries from the experiment by variant, and that a daily scout can summarize what differs between the variants. Ask if they want to try it on that experiment.
```

</details>

## Prepare for the trial

Go into the first call with one or two experiments in mind and a draft of what the scanner looks for in each.

The fastest way is to look at the customer's project while you impersonate a user. Ask the customer first, and follow the [impersonation rules](/handbook/company/security#impersonating-users). Stay in read-only mode. Do not change anything without their explicit consent. To use an agent while you impersonate, connect the PostHog MCP server with [these steps](/handbook/cs-and-onboarding/handling-customer-issues#using-the-mcp-server-while-impersonating).

Look at these things:

1. Running and planned experiments. Read each hypothesis and find what changes on screen. A change to a flow or a layout makes a good candidate, because the difference shows in the recording. A change to a ranking algorithm is harder to see.
2. Exposures and the split. Each variant needs enough exposed users to give the scanner sessions. The experiment must aggregate by person, because the scanner cannot match [group](/docs/product-analytics/group-analytics) exposures to recordings. The scanner also skips anonymous sessions.
3. The experiment's **Recordings** tab. If it shows few or no sessions, replay does not record the changed pages. Check the sample rate and trigger groups in the [replay ingestion settings](https://app.posthog.com/replay/settings#selectedSetting=replay-triggers).
4. Backend metrics. The scanner selects recordings by the exposed person, so backend metrics still count. To open the recording for a backend event, that event needs `$session_id`. [Tracing headers](/docs/libraries/js/config#tracing-headers) send the browser session ID to the backend.
5. Existing Replay Vision scanners. Start with an experiment that an existing scanner already watches. The customer can then compare the two outputs.
6. What the team already saves. Replay collections, saved filters, and notebooks about an experiment show what they care about.

Draft the scanner's focus text for each experiment from its hypothesis. For a new checkout flow, ask where people hesitate, retry, or leave after the payment step appears. For an onboarding change, ask where people stall or skip ahead. Bring the drafts to the call so the customer has something to react to.

An experiment scanner returns a summary for each session. It does not return a score. If the customer wants a number per variant, such as a frustration score, tell them before the trial starts.

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

1. Agree on the experiment and the success criteria with your champion. Two to three weeks on one experiment is enough. A success criterion can be simple, for example: "we can explain the result of experiment X with behavior from the recordings." Book the readout for one week after launch, before the trial starts.

2. Make sure that replay records the variant sessions. In the project's [replay ingestion settings](https://app.posthog.com/replay/settings#selectedSetting=replay-triggers), add a trigger group with a [feature flag condition](/docs/session-replay/how-to-control-which-sessions-you-record#feature-flag-triggers) on the experiment's flag. Give it a high sample rate, and leave it open to every variant, because the scanner needs control sessions too. Groups combine with ANY, so the rest of the project records as before. The group adds replay volume, so include it in the trial budget. Remove the group when the experiment ends.

3. Add free credits. Estimate the spend: recorded experiment sessions per day × days left in the experiment × scanner sampling rate × credits per observation. For example, 2,000 sessions a day × 14 days × 5% sampling × 5 credits is 7,000 credits ($70). Add credits to cover it, and write down the amount and the end date, as the [trial guidelines](/handbook/growth/cross-selling/tracking-cross-sells#trial-guidelines) describe. If the organization has a sales-led trial, add it to the [`billing-trial-expanded-free-allocation`](/handbook/growth/sales/running-trials#ai-products-in-a-trial) flag instead. Set a [credit limit](/docs/replay-vision/quota-and-limits#per-scanner-limits) on the scanner so the trial cannot overspend.

4. Set up the scanner. On the experiment's **Recordings** tab, select **Set up experiment scanner**. For a new experiment, turn on **Compare what users do in each variant** in the experiment form. Then:

   - Name each variant by what users see, for example "Single-page checkout" and "Three-step checkout". The model uses the names to tell the variants apart.
   - Paste your focus text into **What to focus on**. It names the changed screen and asks about behavior after it appears.
   - Keep **Sample variants evenly** on. A 90/10 split then still gives the small variant enough sessions.
   - Start with the default model at 5 credits per observation. Gemini 3.5 Flash Lite costs 2 credits. It is enough for a layout or flow change where the model does not need to read text on screen.

5. Test before the scanner goes live. Scan two or three sessions from each variant on demand, and read the summaries with your champion. Fix the focus text now. An edit after the scanner starts splits the comparison into a before and an after. Then let the customer turn the scanner on. That click starts the spend, so it is theirs to make.

### Read the results

The scanner's **Variants** tab shows the observations, people, sampling rate, median session length, and latest summaries for each variant. Even sampling scans a larger share of a small variant. Read the observation counts against the sampling rates, because equal counts do not mean equal traffic.

To compare the variants over time, add the **Variant analysis** scout from the **Variants** tab. Each day it reads the new summaries and counts the behaviors that repeat in each variant. It marks each difference as a trend or as statistically significant, and sends its reports to the customer's [inbox](/docs/self-driving/inbox).

The **Daily digest** scout on the scanner's [**Scouts** tab](/docs/replay-vision/scouts) sends a daily summary of what the scanner found and the sessions to watch. It keeps your champion looking between check-ins.

Each observation also creates a `$recording_observed` event with an `experiment_variant` property. A trend broken down by `experiment_variant` shows how the findings change while the experiment runs.

If the control summaries describe the new design, the customer's code reads the feature flag incorrectly. Tell them at once, because it affects the experiment result too.

For the readout, put the experiment result next to two or three behaviors that repeat in each variant. Link the recordings behind each behavior. A Loom or a one-page doc is enough. If it lands, turn the scanner on for their next experiment and move the trial to a paid billing limit.

## Discovery questions

Use these to start the conversation. Ask one or two, then let the customer talk. The answers show if they want to know why a variant won.

| Question | What to listen for |
| --- | --- |
| Tell me about the last experiment you shipped. How did the team decide the winner was safe to roll out? | How far they trust the number alone. Extra checks or doubt mean there is room for the "why". |
| When a result comes back flat or surprising, what does someone do next? | Someone who watches recordings by hand saves the most time with a scanner. A rerun or a guess means they have no "why" today. |
| Does anyone pull recordings or session summaries into their own tools, like a notebook or an agent, to explain a result? | A homemade scanner. Show them that the **Variant analysis** scout does this inside PostHog, where the whole team sees it. |
| Which of your experiment metrics come from backend events? | Backend metrics. Check that those events carry `$session_id`, so each event links to a recording. |
| If you could put one more number on each variant, next to the main metric, what would it be? | The behavior they care about, such as frustration or confusion. Use it in the focus text. |
| After a readout, who asks why a variant won, and where does that answer live today? | A wider audience, such as design, leadership, or support. Scout reports can go to a Slack channel for them. |
| Did you ever ship a winner that later confused people or caused support tickets? | A cost of not knowing why. Ask for the experiment name and use it in the pitch. |
| Which experiment that runs now are you least sure about? | Your trial experiment. |

Signs that they want this:

- They name a specific experiment or result at once.
- Someone already watches recordings or summarizes sessions to explain results.
- Another team asks "why" after every readout.
- They have a test that launches soon, and they are not sure what to expect.
