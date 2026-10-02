---
title: What we learned from our first 400k Replay Vision scans
date: 2026-09-22
author:
  - cory-slater
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/Frame_144170_14616c41e1.png
featuredImageType: full
tags:
  - Using PostHog
  - User research
  - Replay Vision
  - Session replay
---

In August we launched [Replay Vision](/replay-vision), our AI layer over Session Replay. It watches session recordings and writes up what it finds, so nobody has to sit through them. We put it to work on PostHog right away. Since then, Replay Vision has watched 400k recordings for us. [Nobody was going to watch](/blog/nobody-watches-session-replays) most of them anyway.

The biggest thing we learned? Replay Vision fixes the watching part, but not the *thinking* part.

We learned this the annoying way: in our first few weeks, some scanners found real issues and opportunities, while others produced perfectly plausible session summaries that nobody wanted to read. Every scanner that produced useful results shared three things:

1. A focused, observable question that could only be answered by watching the recording
2. A clear slice of relevant recordings that could actually answer it
3. Permission to say "no" or "inconclusive"

## How Replay Vision works

A quick introduction for those who are new here. Replay Vision is built around scanners. A scanner is a job you set up to watch recordings. 

Each scanner has a **query** that chooses which recordings to watch, and a **prompt** that tells it how to judge each one. When a scanner watches a recording, it produces an **observation**.

Replay Vision has four scanner types, depending on the answer you want:

- A **monitor** answers a yes-or-no question and can return "inconclusive."
- A **classifier** applies a label.
- A **scorer** gives the recording a numerical score.
- A **summarizer** writes up what happened.

Alongside the answer, an observation carries a **short explanation** that cites the moments in the recording that support it. (A summarizer folds this into the summary itself.) The explanation is how you check the scanner's work.

A scanner only sees one recording at a time, so it cannot compare a session with recordings it has never seen. That job belongs to a [Digest](/docs/replay-vision/actions), which summarizes recent observations from one scanner, or a [Scout](/blog/what-is-a-scout), an agent that compares observations with the rest of your product data and reports the patterns it finds.

## Replay Vision best practices

If you remember nothing else, remember this: your job is to pick and refine the questions you want Replay Vision to answer. It will do the watching. Product judgment remains a human problem, which is fortunate for those of us employed to provide it. Here's how to do that.

### 1. Each scanner should answer one specific question

When people build their first Replay Vision scanner, they tend to try the same thing: one scanner that "watches everything" and "catches everything interesting" (ask us how we know). It sounds reasonable, but it asks the model to decide both what happened and what matters to you and your product. It can do the first part just fine, but the second is still your job.

Here's a real example. We noticed people trying to investigate errors in Error Tracking, getting frustrated, and eventually going, "F*** it, I'll have PostHog AI try this instead." We set up a scanner to find those moments and show us where the product stopped helping.

The question was specific: what was the person trying to do before they "escaped" to AI, and what should we improve?

The scanner we built is a classifier called "[Error Tracking] Escape to AI assistant" and it works like this:

**Component** | **What it does**
-- | --
**Recording query** | Selects sessions that contain both an Error Tracking issue view and a PostHog AI conversation. Without that query, the scanner would waste most of its time watching routine investigations where nobody needed help.
**Prompt** | Asks what the person was trying to do, where the UI stopped helping, and what job they handed to PostHog AI.
**Labels** | Tag the recording using the preset list or a free-form label when the scanner finds something unpredicted. Examples: explaining an error spike, separating third-party noise from failures worth fixing, or deciding what to fix next.
**Short explanation** | Tells you what the scanner saw and why it chose that label. For example, the person opened PostHog AI after the issue view gave them no obvious way to separate third-party noise from the spike they were investigating.

A scanner works better when its prompt uses the product's real names, states, and workflows. [PostHog AI](/ai) can inspect the context already in PostHog and add it to the prompt, while a coding agent can use the [PostHog MCP server](/docs/replay-vision/mcp) to pull product and workflow context directly from the codebase.

### 2. Aim your scanner at the right recordings

The query is how you aim your scanner. If you get it wrong, the output will likely make you go "meh," right before you spend four hours watching recordings yourself. The best prompt in the world is mostly worthless if it sees the wrong recordings.

Another scanner we use watches people use Session Replay and looks for ways we could improve the product. We call these opportunity miners. Bug scanners are the obvious first move, and we run plenty of them, but the same setup works for upside. This one's query ignores brief visits, which waste credits and add clutter, and only selects sessions where someone had deep engagement with the product. In this case, we trigger a scan when someone filters the recording list, inspects events, saves a recording, or exports one.

The prompt asks one question: did this session reveal a concrete opportunity to make Session Replay more capable? A "yes" needs visible evidence, an unmet job or repeated workaround, and a small product change we could test. It also prompts the scanner to consider alternative explanations, since not every detour is a feature request in disguise.

The rest of PostHog can aim the scanner, too. Use the event, URL, cohort, experiment exposure, survey response, or minimum duration that gives the session meaning. Some of our favorite remixes include:

- Experiments: a scanner classifies each post-exposure recording to help understand how behavior differs between arms
- Funnels: a scanner helps tease out what makes someone convert vs drop off
- Surveys: a scanner checks behavior right before a survey response is submitted

### 3. Make the scanner prove every "yes"

We also have a ghost-bug scanner. It watches people use Replay Vision (yes, we love using Replay Vision to improve Replay Vision). It's a monitor, so it asks one yes-or-no question of each recording: did the product contradict itself, or trap someone in a task it invited them to start?

The scanner only says "yes" when the recording shows both halves of the contradiction. Scanners that judge this strictly catch real problems. In one recording, a user reached the scan conditions step while creating a scanner. Beside "Filter out internal and test users," the product showed a gear icon. The gear did exactly what it promised when clicked: it opened project settings.

It also pulled the user out of the scanner wizard.

A normal event stream could show a settings visit followed by an abandoned wizard, but no error fired because, technically, the product worked exactly as we built it. The recording showed the actual failure: the product told the user to click a control that removed them from the task it wanted them to finish.

![A Replay Vision observation citing the moments a user left the scanner wizard for project settings](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/gear2_735ba13688.png)

Once we could see both halves, the fix was fairly obvious: keep the setting inside the wizard instead of sending the user away. PostHog AI later opened a PR with that fix.

If an ordinary error accurately explains what happened, the answer is "no." If the recording misses either half, the answer is "inconclusive." The recording has to prove the claim, not merely make it sound plausible.

This sounds conservative and *gasp* boring. Good. Most sessions should not become findings, and a scanner that is never allowed to be boring will eventually make things up.

"Inconclusive" is a feature. It keeps the "yes" pile small enough for a person to inspect, which matters because selectivity is not the same as accuracy. Every observation links back to its recording, so when the scanner cites a contradiction, we can jump to the cited moments and watch both halves.

![Verdict mix for our ghost-bug scanner: 1 percent yes, 57 percent no, 42 percent inconclusive](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/ghost_bugs_5ca8748eb1.png)

A scanner saying "Idk" is way better than making something up.

### 4. Run it on a small batch before you trust it

Create the scanner, then use the [bulk scan action](/docs/replay-vision/running-scanners#from-the-recordings-list) to run it against a small batch of recent recordings. Read the observations beside their source recordings and look for overclaims, missed proof, weak labels, or instructions that seemed obvious until the model interpreted them literally.

Here's one from the scanners we run on posthog.com. We built a summarizer to catch visitors who gave up on the site and reached for search, the AI chat, or the "talk to a human" form. Before enabling it, we ran it on a batch of recent sessions and read every observation. 9 of the first 15 had escaped to the human form, according to the model. 

In the recordings, 9 people opened the form, typed nothing, and closed it. The model had invented their question from the pages around it, because the prompt asked what the visitor was looking for. One added rule fixed it: a form opened and closed with nothing typed is not an escape, and the scanner says so. 

The same pass taught us to watch the clips, not just read the text. A text-only review of our dead-end monitor called its "can't close this modal" findings solid. Watching the recordings said otherwise, so that scanner went back to calibration.

Use the Calibration tab as a review queue. Rate each result, and add a sentence when the scanner got the premise wrong. PostHog AI can recommend and test changes against that feedback, but it will not apply them until you choose.

Don't try to perfect the prompt before you run it. The first batch will tell you how the scanner actually performs.

### 5. Pick the model by the cost of a wrong answer

The model changes both quality and cost. Replay Vision prices each model in credits per observation, and one credit is $0.01. Pick the model by asking what a wrong answer would cost you.

![The Replay Vision model picker, with each model priced in credits per observation](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/model_picker_cdec55b81d.png)

Use the cheapest model for high-volume jobs where you care about the distribution, not any single observation. Our broken-render classifier tags recordings as `nothing_broken`, `media_failed`, `clipped_layout`, or `horizontal_overflow`. One wrong label nudges a trend instead of opening a ticket.

Step up a tier when the job combines a fixed rubric with some judgment. An experiment classifier fits well here. It can label each post-exposure recording as `smooth`, `hesitation`, `confusion`, `error_or_dead_end`, or `inconclusive`, then a Scout or a different agent can compare the pattern across variants.

Save the priciest model for jobs where someone may act on a single observation, because a plausible wrong answer wastes their time. If the observations are close but not quite right, tighten the prompt before you move up. A sharper instruction is often cheaper than a bigger model.

## Prompts for you to steal

Use these prompts to create Replay Vision scanners with a coding agent connected to the PostHog MCP. The agent should inspect your project and create the scanner.

### Map the use cases people bring to a product

```text
set up a Replay Vision scanner that maps the use cases people bring to [product or feature] in this PostHog project.

first inspect the project's real events, urls, cohorts, and existing scanners. find the strongest high-intent event or page that proves someone used this product surface. do not invent an event name. exclude PostHog employees and test accounts where the project data supports that filter.

create a single-label classifier. each observation must classify one recording by the primary job visible in that session. draft 5 to 8 initial use-case tags from the product's real workflows. include exploring_only and inconclusive. allow one free-form tag only when the recording clearly shows a use case outside the initial taxonomy.

write the scanner prompt so it uses concrete evidence: the objects the user created, settings they changed, queries they wrote, filters they applied, and workflows they returned to. navigation alone does not prove intent. if the session contains several jobs, choose the dominant one. if the evidence is weak, choose inconclusive. require a short explanation with citations.

add a daily Digest that summarizes the use-case mix, recurring evidence, and genuinely new free-form tags across observations. the scanner must not compare sessions itself.

before enabling the scanner, estimate its monthly observation volume and credit use. check the remaining quota. if the estimate is material, create it paused and show me the estimate. otherwise create it, return its link, and tell me which first observations I should calibrate.
```

### Compare behavior across experiment variants

```text
set up Replay Vision for the experiment [experiment name or id] in this PostHog project.

first resolve the exact experiment. read its hypothesis, feature flag key, variants, exposure event, and the product surface that changes. if the experiment is ambiguous or has no usable hypothesis, ask me instead of inferring one from the name.

create one single-label classifier for all variants so every recording uses the same rubric. target recordings containing the $experiment_exposure event for the experiment's exact feature flag key and active variant values. exclude test accounts. do not create separate scanner prompts for each variant.

tailor the tags to the hypothesis. if the hypothesis does not imply a better rubric, start with: never_reached_changed_surface, completed_smoothly, completed_with_hesitation, confused_or_backtracked, error_or_dead_end, and inconclusive.

write the scanner prompt for one recording. it must ignore behavior before exposure, decide whether the user reached the changed surface, choose one tag from visible post-exposure behavior, and cite the decisive moments. it must not guess the variant, compare variants, infer causality, or generalize from the recording.

use the same model and prompt for every variant. use a mid-priced model for a clear fixed-tag rubric. move up a tier only if the hypothesis requires nuanced judgment from each recording.

test the scanner against representative recordings from every variant. then add a daily Digest that synthesizes the observation patterns. keep all cross-observation and cross-variant comparison in the Digest, a Scout, or product analytics, never in the scanner prompt.

before enabling the scanner, estimate its monthly observation volume and credit use. check the remaining quota. if the estimate is material, create it paused and show me the estimate. otherwise create it and return the scanner and Digest links.
```

### Find product improvement ideas

```text
set up a Replay Vision scanner that finds concrete product opportunities in [product or workflow] in this PostHog project.

inspect the real events, urls, cohorts, and existing scanners for this product. choose a recording query that requires substantive work, not a page visit alone. prefer one high-intent event plus the relevant product url and a minimum active duration. exclude employees and test accounts.

create a monitor that judges one recording at a time. allow inconclusive. return yes only when all three conditions are visible:
1. the user did substantive work in the target product.
2. their action sequence revealed an unmet higher-level job, repeated manual workaround, or missing decision loop.
3. one small product test follows directly from that evidence and could help similar users.

for a yes result, require four labeled parts: Evidence with timestamps, Unmet job, Smallest test, and Alternative explanation. ordinary friction, brief browsing, and generic "add AI" ideas are no. hidden or ambiguous decisive actions are inconclusive. do not include names, emails, ids, or verbatim sensitive content.

use a high-quality model because a person may act on one yes result. add a daily Digest that groups repeated unmet jobs and smallest tests across observations with links to the source recordings.

before enabling the scanner, estimate its monthly observation volume and credit use. check the remaining quota. if the estimate is material, create it paused and show me the estimate. otherwise create it, return its link, and identify the observations I should calibrate first.
```

### Find self-contradictions and dead ends

```text
set up a Replay Vision monitor for self-contradictions and dead ends in [product surface] in this PostHog project.

inspect the real product urls and high-intent events. target recordings that used this surface and contain enough active time to show both halves of a problem. exclude employees and test accounts where appropriate.

the scanner watches one recording. allow inconclusive. return yes only when the recording visibly shows both halves of one contradiction or dead end. examples include:
- a control claims to enable something, but a later screen says it is disabled.
- the product advances as if an action succeeded, but a later step shows nothing was saved.
- the final submit reveals a blocking requirement that the preceding flow never mentioned.
- an error points to a fix or setting that does not exist where the product sends the user.
- a control sends the user away from the flow it asked them to finish.

for a yes result, require the user's task, the first visible claim or label, the contradicting behavior, citations to both moments, and whether the user recovered, retried, hunted through settings, or abandoned.

ordinary validation errors, user mistakes they immediately correct, slowness, styling problems, missing features, and browsing are no. if either half is hidden, return inconclusive.

use a high-quality model. a small yes pile is better than broad coverage. add a daily Digest or alert for yes observations.

before enabling the scanner, estimate its monthly observation volume and credit use. check the remaining quota. if the estimate is material, create it paused and show me the estimate. otherwise create it and return its link.
```

### Review sessions before low-NPS responses

```text
set up a retrospective Replay Vision workflow for low-NPS responses to [survey name or id] in this PostHog project.

first resolve the exact survey and its NPS question. find responses in [score range] during [date range], including each response timestamp and person. for each respondent, select up to [n] eligible session recordings that ended before the response. do not substitute sessions after the response.

create a paused summarizer scanner. run it separately against each selected recording so every observation describes one session. the per-recording prompt should return these labeled lines:
- Journey: the main workflow visible in this recording.
- Friction: the strongest visible slowdown, error, dead end, or repeated hunting.
- Outcome: what the user completed, abandoned, or left unresolved.
- Evidence: citations to the decisive moments.

the scanner must not infer sentiment from the NPS score, explain why the person chose it, compare sessions, or claim that visible friction caused the response. if a recording is too short or inactive, say inconclusive.

after the observations finish, use a Digest or Scout to synthesize repeated workflows and friction across the pre-response recordings. preserve links to the source observations. keep the individual score, response, and cross-session comparison outside the scanner prompt.

before running scans, estimate the credit use for the selected sessions and check the remaining quota. return the scanner link, the number of selected recordings, and any respondents with no eligible pre-response recording.
```

### Watch the first sessions from high-ICP signups

```text
set up a Replay Vision scanner for the first sessions of high-ICP signups in this PostHog project.

inspect the project's canonical signup event and the real cohort or group property that defines high ICP. do not assume the event or property name. target the recording containing signup for people in that cohort. exclude employees and test accounts.

create a summarizer because each observation should reconstruct one first-session journey. require these labeled lines:
- Journey: the path from signup through product selection and setup.
- Product evaluated: the product or workflow supported by visible evidence.
- Friction: the single strongest blocker or slowdown, naming the exact screen, control, field, docs page, or error.
- Outcome: the last meaningful state reached, including whether data arrived or a real workflow completed.
- Evidence: citations to the decisive moments.

the scanner must use visible evidence and say inconclusive when the session is too short or inactive. it must not compare people, infer account value from behavior, or treat every departure as failure.

add a daily Digest that summarizes repeated entry paths, evaluated products, blockers, and outcomes across observations.

before enabling the scanner, estimate its monthly observation volume and credit use. check the remaining quota. if the estimate is material, create it paused and show me the estimate. otherwise create it and return its link.
```

### Ask a coding agent to design scanners

```text
read this blog post: https://posthog.com/blog/a-scanner-that-watches-everything-sees-nothing. then inspect our product code, PostHog event schema, cohorts, recordings, and existing Replay Vision scanners.

propose five scanners grounded in what this product actually does. each proposal must include:
- one visible question applied to one recording.
- the scanner type and why it matches the output.
- a narrow recording query using real events, urls, cohorts, and duration filters.
- the exact per-recording output shape, including no or inconclusive behavior.
- the model, sampling mode, and estimated monthly observations and credits.
- the cross-observation question for its Digest or Scout.
- the first observations a human should calibrate.

reject ideas that require one scanner observation to compare sessions, infer hidden intent, or discover what matters without a product question. do not invent event names.

rank the five ideas by expected product value and evidence quality. recommend one. do not create anything until I choose.

after I choose, estimate the scanner against the remaining quota, create it safely, test it against representative recordings, add an appropriate Digest or alert, and return the links.
```
