---
title: "Watching PostHog watch itself: A scanner that watches everything sees nothing"
date: 2026-08-27
author:
  - cory-slater
# featuredImage: TODO
# featuredImageType: full
tags:
  - Using PostHog
  - User research
  - Replay Vision
  - session replay
---

What we learned from 251,351 succeeded observations: useful scanners start with one visible question and permission to say "I don't know."

<!-- data current through 2026-08-25 10:29 PT. re-pull before publishing. -->

A month ago we launched [Replay Vision](https://github.com/replay-vision), our AI layer over Session Replay. It watches session recordings in batches and writes up what it found, so nobody has to sit through them. You give it work by setting up a scanner: a recording query that picks which sessions to watch, and a prompt that says what to look for.

In the last few weeks, our own [scanners](/docs/replay-vision/scanner-types) have produced 251,351 successful observations across the millions of sessions we have of people using PostHog.

That number may be a little absurd, but it is not the interesting part. The count does not represent 251,351 unique recordings, and it is nowhere close to all those sessions. Each observation is one scanner applied to one recording. It is a thin slice selected because it matched a question we asked.

[Nobody was going to watch](/blog/nobody-watches-session-replays) the vast majority of those millions of recordings anyway. Session replay contains useful evidence. Then the evidence sits in a giant list while everyone goes back to their dashboards.

Replay Vision fixes the watching part but not the thinking part. We learned this the annoying (but expected) way. Some scanners pointed us to bugs we could then verify in the linked recordings, while others showed us exactly where a flow became confusing. Some even produced plausible session descriptions that nobody wanted to read. 

In fact, the model wasn't the main difference. The scanner either had a real job or it did not.

Useful scanners have three things: a visible question, a narrow recording set, and permission to answer "no" or "inconclusive." You still have to bring the judgment.

<!-- screenshot placeholder: replay vision overview
show: the scanner list and recent observation counts, using only PostHog dogfood data
crop: wide enough to establish scanners, observations, and Digests without showing navigation clutter
privacy: hide names, emails, project IDs, and any customer-derived prompt text
alt: "Replay Vision scanners and their recent observations in PostHog"
-->

## 1. Bring one question

The first scanner everyone wants to build, us included, watches everything and asks for "anything interesting."

It sounds sensible but then returns with a pile of observations like these: the user browsed, the user may have hesitated, the user seemed interested, the user left. These are not necessarily wrong. But they also do not answer a question anyone actually had.

Our first broad scanners produced plausible mush because we had quietly asked the model to decide what mattered for us. It cannot (yet). That is still our job.

The scanners we use now are narrower. One watches sessions with rage clicks and asks whether the clicked control actually failed. One watches first sessions from high-fit signups and reconstructs the setup journey. Another watches Error Tracking investigations and records the path through stack traces, occurrences, recordings, logs, and actions.

Same shape on every surface: a filtered set of recordings, one visible question, and a defined answer. The recording query and the prompt do different work:

- The query decides which sessions deserve inspection.
- The prompt decides what judgment to make inside each one.

A high-intent event, relevant URL, useful cohort, or minimum duration usually improves quality more than another paragraph of instructions.

<!-- screenshot placeholder: narrow scanner configuration
show: one scanner with its recording filters, scanner type, prompt, model, and sampling controls
crop: include the event or URL filter beside the first lines of the prompt
annotation: label the query "which recordings?" and the prompt "which judgment?"
privacy: use a PostHog-owned scanner and remove IDs or user details
alt: "a Replay Vision scanner with a narrow recording query and one question"
-->

There is another boundary that matters, too. One observation is one scanner applied to one recording. That observation cannot compare itself with sessions it hasn't seen.

For an experiment, the scanner can classify what happened to one participant after exposure. Use the same rubric for every variant. A [Digest](/docs/replay-vision/actions), Scout, or another agent can compare patterns across the resulting observations. Asking the per-recording scanner to compare variants only invites it to invent the missing half.

The same rule applies elsewhere. A scanner can describe one recording before a low-NPS response. A Scout can look for repeated friction across several sessions from one respondent, or across many low-NPS respondents. A scanner can classify one conversion session. Product Analytics can compare the classifier results for converters and drop-offs.

### Scanners can look for upside too

Bug scanners are the obvious first move. They are also the lowest bar.

We still run them because they work. Dead clicks, broken renders, and setup loops are easier to catch when something watches the footage. But some of our most valuable scanners look for product opportunities instead.

One watches the first sessions from high-fit signups and writes the trip report we would never produce consistently by hand:

- What did the person evaluate? 
- How far did they get? 
- What slowed them down? 

Another reconstructs how people investigate Error Tracking issues. It records the entry point, data consulted, impact assessment, queries, actions, and outcome.

These scanners do not magically tell us what to build. When we aim them well, they produce feature ideas worth testing. They show the workflows people attempted, the manual work they repeated, and the product questions worth investigating. Treat each finding as a hypothesis. Product judgment remains a human problem, which is fortunate for those of us employed to provide it.

We call these opportunity miners. Bug scanners raise the floor. Opportunity miners raise the roof.

<!-- screenshot placeholder: opportunity scanner and digest
show: a single product-opportunity observation beside its daily digest
crop: preserve the observation's evidence, unmet job, smallest test, and alternative explanation
privacy: use PostHog dogfood data; redact all person and organization details
alt: "a Replay Vision opportunity observation and a Digest of recurring patterns"
-->

## 2. Demand visible proof

Our rage-click scanner started from a tempting lie: a rage click means something broke.

Sometimes it does. Sometimes the page is slow and an impatient visitor clicks again before it loads. Sometimes a menu opened correctly, but the person double-clicked anyway. Sometimes they clicked an already selected tab that had nothing left to do.

The rage click is a clue. The recording must prove the failure.

So the scanner first finds the repeated clicks and checks what happened next. Did the page navigate? Did a menu open? Did content expand? Did a value change? If the product responded, the answer is no. If the recording does not show the click and its result clearly, the answer is inconclusive.

The same proof standard works for harder questions. A self-contradiction scanner should report a finding only when it sees both halves of the contradiction: the product says something is enabled, then later says it is not. An onboarding scanner should report a stall only when it can name the exact step and visible blocker. A user leaving is not necessarily proof of confusion. A failed workflow is not automatically the product's fault.

This sounds conservative and *gasp* boring. Good. A scanner that is never allowed to be boring is at risk of making things up.

### "Inconclusive" is a feature

Our ghost-bug scanner is deliberately harsh. It watches people using Replay Vision and looks for one class of problem: the product contradicting itself or sending someone into a dead end our product created.

In the first three weeks since launch, it produced 3,032 observations. Only 29 returned "yes." The rest returned "no" or "inconclusive."

That does not prove the scanner was accurate 29 times. An inconclusive result can also mean the recording query reached beyond the prompt's evaluable surface. The result still tells us something useful: the scanner refused to turn most ordinary sessions into findings. The yes pile stayed small enough for a person to inspect.

"Idk" beats confabulation.

Every observation links back to its recording. When a scanner cites a contradiction, open the recording, jump to the cited moments, and watch both halves.

<!-- screenshot placeholder: ghost-bug observation distribution
show: the scanner's yes, no, and inconclusive results with one high-confidence yes observation
crop: include the linked timestamps and enough reasoning to show both halves of the contradiction
privacy: remove session IDs, person details, and any customer content
alt: "a ghost-bug scanner observation with linked evidence in the recording"
-->

### The gear-icon trapdoor

One ghost-bug observation caught a real trapdoor inside Replay Vision itself (yes, we love pointing Replay Vision at Replay Vision).

A user reached the scan conditions step while creating a scanner. Beside "Filter out internal and test users," the product showed a gear icon. The user clicked it. The gear did exactly what the link said it would do: it opened project settings.

It also pulled the user out of the scanner wizard.

One person returned and started the scanner flow again. Another left without creating one. A normal event stream could show a settings visit followed by an abandoned wizard. The recording showed the actual failure: the product told the user to click a control that removed them from the task it wanted them to finish.

Two recordings were enough to show that the trapdoor existed, and the observation made the fix fairly obvious: keep the setting inside the wizard instead of sending the user away. A later PR fixed it.

<!-- publish-day todo: link the merged PR that shipped the fix. do not cite the earlier unmerged PR as the shipped change. -->

<!-- screenshot placeholder: gear-icon trapdoor, two-up sequence
left frame: the scan conditions step with "Filter out internal and test users" and its gear icon
right frame: project settings after the click, with the scanner wizard gone
optional third frame: the fixed in-wizard dialog from the merged PR
annotation: mark the click and the navigation boundary, not the person
privacy: use PostHog dogfood footage and crop all account or project details
alt: "the Replay Vision scanner wizard sending a user into project settings"
-->

### Observations are a new event shape

Events tell us what fired. Replay Vision shows what the person experienced around the event. This judgment becomes data too.

Each succeeded observation is emitted as a queryable `$recording_observed` event. A monitor contributes a verdict. A classifier contributes a tag. Scorers and summarizers contribute their own structured outputs. The event also carries confidence and citations back to the recording.

It is still a model's judgment, not ground truth, so the confidence and recording citations still matter.

That creates a new behavioral event shape: an evidence-backed judgment about what happened inside one recording. Define the judgment once, then apply it to every matching recording. You can query it, chart it, break it down, or alert on it alongside the rest of your product data.

- An event can say someone abandoned signup. An observation can show the contradictory copy they read before leaving. 
- An event can say someone clicked **summarize.** An observation can show a populated trace that the product incorrectly summarized as empty. 
- An event can say setup completed. An observation can show that the person got there only after painfully hunting, scrolling, and backtracking.

Observations do not replace events. They add a queryable judgment about what happened before, between, and after them.

<!-- screenshot placeholder: observation as a queryable event
show: a `$recording_observed` event in Product Analytics, broken down by a scanner verdict or classifier tag
crop: include the scanner output property, confidence, and recording citation without exposing identifiers
annotation: label the ordinary product event and the observation event as two different shapes of evidence
privacy: use PostHog dogfood data and remove person, organization, session, and project IDs
alt: "Replay Vision observations queried as behavioral events in PostHog"
-->

## 3. Calibrate human judgment

A scanner does not automatically earn trust when you save it. It earns trust when you check its first observations against their recordings and improve the configuration.

Create the scanner, then run it against a small batch of recent recordings. The [bulk scan action](/docs/replay-vision/running-scanners#from-the-recordings-list) makes this easy. Open the observations beside their source recordings. Look for overclaims, missed proof, weak tags, and instructions that looked clear until the model interpreted them literally.

Use the Calibration tab as a review queue. Rate each result, and add a sentence when it got the premise wrong. PostHog AI can use that feedback to iterate on the prompt.

<!-- screenshot placeholder: calibration loop
show: several rated observations, one written correction, and a PostHog AI configuration recommendation
crop: include the source-recording link and the before or after prompt change
privacy: use PostHog-owned sessions and redact identifiers
alt: "calibrating a Replay Vision scanner with observation ratings and written feedback"
-->

The goal is a short first feedback loop, not a perfect prompt.

The model changes the quality and cost of each observation, so calibrate it too. Start with `Standard`, the default (currently Gemini 3 Flash). If the observations are close but not quite right, tighten the prompt before reaching for `Pro`, the premium (currently Gemini 3.7 Flash). A sharper instruction often fixes the problem.

These examples are our starting points. Calibration gets final say.

Use `Lite` for high-volume jobs where you care about the distribution, not one observation. Our broken-render classifier is the obvious example. It tags recordings as `nothing_broken`, `media_failed`, `clipped_layout`, or `horizontal_overflow`. One wrong tag nudges a trend instead of opening a ticket.

Use `Standard` when the job combines a fixed rubric with some judgment. An experiment classifier typically fits well here. It can tag each post-exposure recording as `smooth`, `hesitation`, `confusion`, `error_or_dead_end`, or `inconclusive`. The scanner judges one recording, and the Digest or Scout compares the pattern across variants.

Use `Pro` when a person may act on a single observation. Our ghost-bug scanner must verify both halves of a contradiction before it says yes. A high-ICP onboarding scanner reconstructs one signup journey that a product team may inspect immediately. In both cases, a plausible wrong answer wastes someone's time. Calibration will tell you whether the more expensive model earns its keep.

Choose the model based on the cost of a wrong answer, not the fanciness of the prompt. You can change the model later. The scanner type is the decision that gets locked when you create it.

<!-- screenshot placeholder: model choice with examples
show: the Lite, Standard, and Pro options in the scanner editor
annotation: pair Lite with broken-render tagging, Standard with experiment classification, and Pro with contradiction or high-ICP investigation
privacy: no recording or customer data should appear
alt: "Model choices for Replay Vision scanners"
-->

Context changes the answer too. A scanner produces more specific judgments when it knows the real product surface and relevant cohort. It also needs the selection event and the decision behind the question. Use the actual labels and states from your product in the scanner's prompt. Point the scanner at the experiment, survey response, funnel step, feature flag, or whatever else it is that gives the recording meaning.

[PostHog AI](/ai) can inspect the context already in PostHog. A coding agent such as Claude Code or Codex can add codebase context through the [PostHog MCP server](/docs/replay-vision/mcp). That is useful when the code helps the agent choose real events, URLs, labels, and workflows. More context for its own sake is just a longer route to plausible mush.

If you [connect GitHub](/docs/libraries/github) and turn on [self-driving](/docs/self-driving), PostHog's agents can also inspect your codebase after a scanner finding becomes a signal. They can investigate it, write the change, and open a pull request for you to review.

PostHog already keeps recordings right beside events, cohorts, experiments, surveys, feature flags, and Product Analytics. The agent can use that context to aim the scanner without building another integration first.

If you want code-grounded defaults, run [`npx @posthog/wizard replay-vision`](/docs/replay-vision/start-here#ai-wizard) in the project directory. The wizard reads the codebase and creates three scanners around the product's real flows. They are ordinary scanners, so you can change their prompts, filters, models, and sampling afterwards.

Keep the cross-recording question outside the scanner. A scanner creates one observation per recording. A Digest can summarize up to 100 observations from a period. Scouts and Product Analytics can compare patterns over time, between cohorts, or across experiment variants.

<!-- screenshot placeholder: experiment scanner and daily digest
show: the experiment exposure filter and one variant-neutral classifier rubric beside the resulting daily digest
annotation: "one rubric per recording" on the scanner and "comparison across observations" on the digest
privacy: use an internal experiment with no customer content and remove IDs
alt: "an experiment scanner classifying one recording and a Digest summarizing many observations"
-->

If you take one thing from this, remember: Replay Vision can watch the sessions, but you still have to bring the question.

## Prompts for you to steal

These prompts are for PostHog AI or a coding agent connected to PostHog through the MCP server. The agent should inspect your project and create the scanner.

<!-- screenshot placeholder: PostHog AI creating a scanner
show: one short user request followed by the agent resolving real events, estimating monthly credits, and presenting the created scanner link
crop: keep the request, proposed configuration, estimate, and link visible
privacy: use a PostHog-owned example and remove tokens, IDs, or customer data
alt: "PostHog AI creating and sizing a Replay Vision scanner from a natural-language request"
-->

### Map the use cases people bring to a product

```text
set up a Replay Vision scanner that maps the use cases people bring to [product or feature] in this PostHog project.

first inspect the project's real events, urls, cohorts, and existing scanners. find the strongest high-intent event or page that proves someone used this product surface. do not invent an event name. exclude PostHog employees and test accounts where the project data supports that filter.

create a single-label classifier. each observation must classify one recording by the primary job visible in that session. draft 5 to 8 initial use-case tags from the product's real workflows. include exploring_only and inconclusive. allow one free-form tag only when the recording clearly shows a use case outside the initial taxonomy.

write the scanner prompt so it uses concrete evidence: the objects the user created, settings they changed, queries they wrote, filters they applied, and workflows they returned to. navigation alone does not prove intent. if the session contains several jobs, choose the dominant one. if the evidence is weak, choose inconclusive. require a short explanation with citations.

add a daily Digest that summarizes the use-case mix, recurring evidence, and genuinely new free-form tags across observations. the scanner must not compare sessions itself.

before enabling the scanner, estimate its monthly observation volume and credit use. check the remaining quota. if the estimate is material, create it paused and show me the estimate. otherwise create it, return its link, and tell me which first observations I should calibrate.
```

[Set up the use-case scanner in PostHog AI](https://app.posthog.com/#panel=max:set%20up%20a%20Replay%20Vision%20scanner%20that%20maps%20the%20use%20cases%20people%20bring%20to%20%5Bproduct%20or%20feature%5D%20in%20this%20PostHog%20project.%0A%0Afirst%20inspect%20the%20project%27s%20real%20events%2C%20urls%2C%20cohorts%2C%20and%20existing%20scanners.%20find%20the%20strongest%20high-intent%20event%20or%20page%20that%20proves%20someone%20used%20this%20product%20surface.%20do%20not%20invent%20an%20event%20name.%20exclude%20PostHog%20employees%20and%20test%20accounts%20where%20the%20project%20data%20supports%20that%20filter.%0A%0Acreate%20a%20single-label%20classifier.%20each%20observation%20must%20classify%20one%20recording%20by%20the%20primary%20job%20visible%20in%20that%20session.%20draft%205%20to%208%20initial%20use-case%20tags%20from%20the%20product%27s%20real%20workflows.%20include%20exploring_only%20and%20inconclusive.%20allow%20one%20free-form%20tag%20only%20when%20the%20recording%20clearly%20shows%20a%20use%20case%20outside%20the%20initial%20taxonomy.%0A%0Awrite%20the%20scanner%20prompt%20so%20it%20uses%20concrete%20evidence%3A%20the%20objects%20the%20user%20created%2C%20settings%20they%20changed%2C%20queries%20they%20wrote%2C%20filters%20they%20applied%2C%20and%20workflows%20they%20returned%20to.%20navigation%20alone%20does%20not%20prove%20intent.%20if%20the%20session%20contains%20several%20jobs%2C%20choose%20the%20dominant%20one.%20if%20the%20evidence%20is%20weak%2C%20choose%20inconclusive.%20require%20a%20short%20explanation%20with%20citations.%0A%0Aadd%20a%20daily%20Digest%20that%20summarizes%20the%20use-case%20mix%2C%20recurring%20evidence%2C%20and%20genuinely%20new%20free-form%20tags%20across%20observations.%20the%20scanner%20must%20not%20compare%20sessions%20itself.%0A%0Abefore%20enabling%20the%20scanner%2C%20estimate%20its%20monthly%20observation%20volume%20and%20credit%20use.%20check%20the%20remaining%20quota.%20if%20the%20estimate%20is%20material%2C%20create%20it%20paused%20and%20show%20me%20the%20estimate.%20otherwise%20create%20it%2C%20return%20its%20link%2C%20and%20tell%20me%20which%20first%20observations%20I%20should%20calibrate.)

### Compare behavior across experiment variants

```text
set up Replay Vision for the experiment [experiment name or id] in this PostHog project.

first resolve the exact experiment. read its hypothesis, feature flag key, variants, exposure event, and the product surface that changes. if the experiment is ambiguous or has no usable hypothesis, ask me instead of inferring one from the name.

create one single-label classifier for all variants so every recording uses the same rubric. target recordings containing the $experiment_exposure event for the experiment's exact feature flag key and active variant values. exclude test accounts. do not create separate scanner prompts for each variant.

tailor the tags to the hypothesis. if the hypothesis does not imply a better rubric, start with: never_reached_changed_surface, completed_smoothly, completed_with_hesitation, confused_or_backtracked, error_or_dead_end, and inconclusive.

write the scanner prompt for one recording. it must ignore behavior before exposure, decide whether the user reached the changed surface, choose one tag from visible post-exposure behavior, and cite the decisive moments. it must not guess the variant, compare variants, infer causality, or generalize from the recording.

use the same model and prompt for every variant. use Standard for a clear fixed-tag rubric. use Premium only if the hypothesis requires nuanced judgment from each recording.

test the scanner against representative recordings from every variant. then add a daily Digest that synthesizes the observation patterns. keep all cross-observation and cross-variant comparison in the Digest, a Scout, or product analytics, never in the scanner prompt.

before enabling the scanner, estimate its monthly observation volume and credit use. check the remaining quota. if the estimate is material, create it paused and show me the estimate. otherwise create it and return the scanner and Digest links.
```

[Set up the experiment scanner in PostHog AI](https://app.posthog.com/#panel=max:set%20up%20Replay%20Vision%20for%20the%20experiment%20%5Bexperiment%20name%20or%20id%5D%20in%20this%20PostHog%20project.%0A%0Afirst%20resolve%20the%20exact%20experiment.%20read%20its%20hypothesis%2C%20feature%20flag%20key%2C%20variants%2C%20exposure%20event%2C%20and%20the%20product%20surface%20that%20changes.%20if%20the%20experiment%20is%20ambiguous%20or%20has%20no%20usable%20hypothesis%2C%20ask%20me%20instead%20of%20inferring%20one%20from%20the%20name.%0A%0Acreate%20one%20single-label%20classifier%20for%20all%20variants%20so%20every%20recording%20uses%20the%20same%20rubric.%20target%20recordings%20containing%20the%20%24experiment_exposure%20event%20for%20the%20experiment%27s%20exact%20feature%20flag%20key%20and%20active%20variant%20values.%20exclude%20test%20accounts.%20do%20not%20create%20separate%20scanner%20prompts%20for%20each%20variant.%0A%0Atailor%20the%20tags%20to%20the%20hypothesis.%20if%20the%20hypothesis%20does%20not%20imply%20a%20better%20rubric%2C%20start%20with%3A%20never_reached_changed_surface%2C%20completed_smoothly%2C%20completed_with_hesitation%2C%20confused_or_backtracked%2C%20error_or_dead_end%2C%20and%20inconclusive.%0A%0Awrite%20the%20scanner%20prompt%20for%20one%20recording.%20it%20must%20ignore%20behavior%20before%20exposure%2C%20decide%20whether%20the%20user%20reached%20the%20changed%20surface%2C%20choose%20one%20tag%20from%20visible%20post-exposure%20behavior%2C%20and%20cite%20the%20decisive%20moments.%20it%20must%20not%20guess%20the%20variant%2C%20compare%20variants%2C%20infer%20causality%2C%20or%20generalize%20from%20the%20recording.%0A%0Ause%20the%20same%20model%20and%20prompt%20for%20every%20variant.%20use%20Standard%20for%20a%20clear%20fixed-tag%20rubric.%20use%20Premium%20only%20if%20the%20hypothesis%20requires%20nuanced%20judgment%20from%20each%20recording.%0A%0Atest%20the%20scanner%20against%20representative%20recordings%20from%20every%20variant.%20then%20add%20a%20daily%20Digest%20that%20synthesizes%20the%20observation%20patterns.%20keep%20all%20cross-observation%20and%20cross-variant%20comparison%20in%20the%20Digest%2C%20a%20Scout%2C%20or%20product%20analytics%2C%20never%20in%20the%20scanner%20prompt.%0A%0Abefore%20enabling%20the%20scanner%2C%20estimate%20its%20monthly%20observation%20volume%20and%20credit%20use.%20check%20the%20remaining%20quota.%20if%20the%20estimate%20is%20material%2C%20create%20it%20paused%20and%20show%20me%20the%20estimate.%20otherwise%20create%20it%20and%20return%20the%20scanner%20and%20Digest%20links.)

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

[Set up the product-opportunity scanner in PostHog AI](https://app.posthog.com/#panel=max:set%20up%20a%20Replay%20Vision%20scanner%20that%20finds%20concrete%20product%20opportunities%20in%20%5Bproduct%20or%20workflow%5D%20in%20this%20PostHog%20project.%0A%0Ainspect%20the%20real%20events%2C%20urls%2C%20cohorts%2C%20and%20existing%20scanners%20for%20this%20product.%20choose%20a%20recording%20query%20that%20requires%20substantive%20work%2C%20not%20a%20page%20visit%20alone.%20prefer%20one%20high-intent%20event%20plus%20the%20relevant%20product%20url%20and%20a%20minimum%20active%20duration.%20exclude%20employees%20and%20test%20accounts.%0A%0Acreate%20a%20monitor%20that%20judges%20one%20recording%20at%20a%20time.%20allow%20inconclusive.%20return%20yes%20only%20when%20all%20three%20conditions%20are%20visible%3A%0A1.%20the%20user%20did%20substantive%20work%20in%20the%20target%20product.%0A2.%20their%20action%20sequence%20revealed%20an%20unmet%20higher-level%20job%2C%20repeated%20manual%20workaround%2C%20or%20missing%20decision%20loop.%0A3.%20one%20small%20product%20test%20follows%20directly%20from%20that%20evidence%20and%20could%20help%20similar%20users.%0A%0Afor%20a%20yes%20result%2C%20require%20four%20labeled%20parts%3A%20Evidence%20with%20timestamps%2C%20Unmet%20job%2C%20Smallest%20test%2C%20and%20Alternative%20explanation.%20ordinary%20friction%2C%20brief%20browsing%2C%20and%20generic%20%22add%20AI%22%20ideas%20are%20no.%20hidden%20or%20ambiguous%20decisive%20actions%20are%20inconclusive.%20do%20not%20include%20names%2C%20emails%2C%20ids%2C%20or%20verbatim%20sensitive%20content.%0A%0Ause%20a%20high-quality%20model%20because%20a%20person%20may%20act%20on%20one%20yes%20result.%20add%20a%20daily%20Digest%20that%20groups%20repeated%20unmet%20jobs%20and%20smallest%20tests%20across%20observations%20with%20links%20to%20the%20source%20recordings.%0A%0Abefore%20enabling%20the%20scanner%2C%20estimate%20its%20monthly%20observation%20volume%20and%20credit%20use.%20check%20the%20remaining%20quota.%20if%20the%20estimate%20is%20material%2C%20create%20it%20paused%20and%20show%20me%20the%20estimate.%20otherwise%20create%20it%2C%20return%20its%20link%2C%20and%20identify%20the%20observations%20I%20should%20calibrate%20first.)

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

[Set up the contradiction scanner in PostHog AI](https://app.posthog.com/#panel=max:set%20up%20a%20Replay%20Vision%20monitor%20for%20self-contradictions%20and%20dead%20ends%20in%20%5Bproduct%20surface%5D%20in%20this%20PostHog%20project.%0A%0Ainspect%20the%20real%20product%20urls%20and%20high-intent%20events.%20target%20recordings%20that%20used%20this%20surface%20and%20contain%20enough%20active%20time%20to%20show%20both%20halves%20of%20a%20problem.%20exclude%20employees%20and%20test%20accounts%20where%20appropriate.%0A%0Athe%20scanner%20watches%20one%20recording.%20allow%20inconclusive.%20return%20yes%20only%20when%20the%20recording%20visibly%20shows%20both%20halves%20of%20one%20contradiction%20or%20dead%20end.%20examples%20include%3A%0A-%20a%20control%20claims%20to%20enable%20something%2C%20but%20a%20later%20screen%20says%20it%20is%20disabled.%0A-%20the%20product%20advances%20as%20if%20an%20action%20succeeded%2C%20but%20a%20later%20step%20shows%20nothing%20was%20saved.%0A-%20the%20final%20submit%20reveals%20a%20blocking%20requirement%20that%20the%20preceding%20flow%20never%20mentioned.%0A-%20an%20error%20points%20to%20a%20fix%20or%20setting%20that%20does%20not%20exist%20where%20the%20product%20sends%20the%20user.%0A-%20a%20control%20sends%20the%20user%20away%20from%20the%20flow%20it%20asked%20them%20to%20finish.%0A%0Afor%20a%20yes%20result%2C%20require%20the%20user%27s%20task%2C%20the%20first%20visible%20claim%20or%20label%2C%20the%20contradicting%20behavior%2C%20citations%20to%20both%20moments%2C%20and%20whether%20the%20user%20recovered%2C%20retried%2C%20hunted%20through%20settings%2C%20or%20abandoned.%0A%0Aordinary%20validation%20errors%2C%20user%20mistakes%20they%20immediately%20correct%2C%20slowness%2C%20styling%20problems%2C%20missing%20features%2C%20and%20browsing%20are%20no.%20if%20either%20half%20is%20hidden%2C%20return%20inconclusive.%0A%0Ause%20a%20high-quality%20model.%20a%20small%20yes%20pile%20is%20better%20than%20broad%20coverage.%20add%20a%20daily%20Digest%20or%20alert%20for%20yes%20observations.%0A%0Abefore%20enabling%20the%20scanner%2C%20estimate%20its%20monthly%20observation%20volume%20and%20credit%20use.%20check%20the%20remaining%20quota.%20if%20the%20estimate%20is%20material%2C%20create%20it%20paused%20and%20show%20me%20the%20estimate.%20otherwise%20create%20it%20and%20return%20its%20link.)

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

[Set up the low-NPS review in PostHog AI](https://app.posthog.com/#panel=max:set%20up%20a%20retrospective%20Replay%20Vision%20workflow%20for%20low-NPS%20responses%20to%20%5Bsurvey%20name%20or%20id%5D%20in%20this%20PostHog%20project.%0A%0Afirst%20resolve%20the%20exact%20survey%20and%20its%20NPS%20question.%20find%20responses%20in%20%5Bscore%20range%5D%20during%20%5Bdate%20range%5D%2C%20including%20each%20response%20timestamp%20and%20person.%20for%20each%20respondent%2C%20select%20up%20to%20%5Bn%5D%20eligible%20session%20recordings%20that%20ended%20before%20the%20response.%20do%20not%20substitute%20sessions%20after%20the%20response.%0A%0Acreate%20a%20paused%20summarizer%20scanner.%20run%20it%20separately%20against%20each%20selected%20recording%20so%20every%20observation%20describes%20one%20session.%20the%20per-recording%20prompt%20should%20return%20these%20labeled%20lines%3A%0A-%20Journey%3A%20the%20main%20workflow%20visible%20in%20this%20recording.%0A-%20Friction%3A%20the%20strongest%20visible%20slowdown%2C%20error%2C%20dead%20end%2C%20or%20repeated%20hunting.%0A-%20Outcome%3A%20what%20the%20user%20completed%2C%20abandoned%2C%20or%20left%20unresolved.%0A-%20Evidence%3A%20citations%20to%20the%20decisive%20moments.%0A%0Athe%20scanner%20must%20not%20infer%20sentiment%20from%20the%20NPS%20score%2C%20explain%20why%20the%20person%20chose%20it%2C%20compare%20sessions%2C%20or%20claim%20that%20visible%20friction%20caused%20the%20response.%20if%20a%20recording%20is%20too%20short%20or%20inactive%2C%20say%20inconclusive.%0A%0Aafter%20the%20observations%20finish%2C%20use%20a%20Digest%20or%20Scout%20to%20synthesize%20repeated%20workflows%20and%20friction%20across%20the%20pre-response%20recordings.%20preserve%20links%20to%20the%20source%20observations.%20keep%20the%20individual%20score%2C%20response%2C%20and%20cross-session%20comparison%20outside%20the%20scanner%20prompt.%0A%0Abefore%20running%20scans%2C%20estimate%20the%20credit%20use%20for%20the%20selected%20sessions%20and%20check%20the%20remaining%20quota.%20return%20the%20scanner%20link%2C%20the%20number%20of%20selected%20recordings%2C%20and%20any%20respondents%20with%20no%20eligible%20pre-response%20recording.)

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

[Set up the high-ICP scanner in PostHog AI](https://app.posthog.com/#panel=max:set%20up%20a%20Replay%20Vision%20scanner%20for%20the%20first%20sessions%20of%20high-ICP%20signups%20in%20this%20PostHog%20project.%0A%0Ainspect%20the%20project%27s%20canonical%20signup%20event%20and%20the%20real%20cohort%20or%20group%20property%20that%20defines%20high%20ICP.%20do%20not%20assume%20the%20event%20or%20property%20name.%20target%20the%20recording%20containing%20signup%20for%20people%20in%20that%20cohort.%20exclude%20employees%20and%20test%20accounts.%0A%0Acreate%20a%20summarizer%20because%20each%20observation%20should%20reconstruct%20one%20first-session%20journey.%20require%20these%20labeled%20lines%3A%0A-%20Journey%3A%20the%20path%20from%20signup%20through%20product%20selection%20and%20setup.%0A-%20Product%20evaluated%3A%20the%20product%20or%20workflow%20supported%20by%20visible%20evidence.%0A-%20Friction%3A%20the%20single%20strongest%20blocker%20or%20slowdown%2C%20naming%20the%20exact%20screen%2C%20control%2C%20field%2C%20docs%20page%2C%20or%20error.%0A-%20Outcome%3A%20the%20last%20meaningful%20state%20reached%2C%20including%20whether%20data%20arrived%20or%20a%20real%20workflow%20completed.%0A-%20Evidence%3A%20citations%20to%20the%20decisive%20moments.%0A%0Athe%20scanner%20must%20use%20visible%20evidence%20and%20say%20inconclusive%20when%20the%20session%20is%20too%20short%20or%20inactive.%20it%20must%20not%20compare%20people%2C%20infer%20account%20value%20from%20behavior%2C%20or%20treat%20every%20departure%20as%20failure.%0A%0Aadd%20a%20daily%20Digest%20that%20summarizes%20repeated%20entry%20paths%2C%20evaluated%20products%2C%20blockers%2C%20and%20outcomes%20across%20observations.%0A%0Abefore%20enabling%20the%20scanner%2C%20estimate%20its%20monthly%20observation%20volume%20and%20credit%20use.%20check%20the%20remaining%20quota.%20if%20the%20estimate%20is%20material%2C%20create%20it%20paused%20and%20show%20me%20the%20estimate.%20otherwise%20create%20it%20and%20return%20its%20link.)

### Ask a coding agent to design scanners

```text
read this blog post: [url]. then inspect our product code, PostHog event schema, cohorts, recordings, and existing Replay Vision scanners.

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

[Design scanners with PostHog AI](https://app.posthog.com/#panel=max:read%20this%20blog%20post%3A%20%5Burl%5D.%20then%20inspect%20our%20product%20code%2C%20PostHog%20event%20schema%2C%20cohorts%2C%20recordings%2C%20and%20existing%20Replay%20Vision%20scanners.%0A%0Apropose%20five%20scanners%20grounded%20in%20what%20this%20product%20actually%20does.%20each%20proposal%20must%20include%3A%0A-%20one%20visible%20question%20applied%20to%20one%20recording.%0A-%20the%20scanner%20type%20and%20why%20it%20matches%20the%20output.%0A-%20a%20narrow%20recording%20query%20using%20real%20events%2C%20urls%2C%20cohorts%2C%20and%20duration%20filters.%0A-%20the%20exact%20per-recording%20output%20shape%2C%20including%20no%20or%20inconclusive%20behavior.%0A-%20the%20model%2C%20sampling%20mode%2C%20and%20estimated%20monthly%20observations%20and%20credits.%0A-%20the%20cross-observation%20question%20for%20its%20Digest%20or%20Scout.%0A-%20the%20first%20observations%20a%20human%20should%20calibrate.%0A%0Areject%20ideas%20that%20require%20one%20scanner%20observation%20to%20compare%20sessions%2C%20infer%20hidden%20intent%2C%20or%20discover%20what%20matters%20without%20a%20product%20question.%20do%20not%20invent%20event%20names.%0A%0Arank%20the%20five%20ideas%20by%20expected%20product%20value%20and%20evidence%20quality.%20recommend%20one.%20do%20not%20create%20anything%20until%20I%20choose.%0A%0Aafter%20I%20choose%2C%20estimate%20the%20scanner%20against%20the%20remaining%20quota%2C%20create%20it%20safely%2C%20test%20it%20against%20representative%20recordings%2C%20add%20an%20appropriate%20Digest%20or%20alert%2C%20and%20return%20the%20links.)

<!-- presentation note: give each prompt a copy button. the PostHog AI links below open the panel with the full setup prompt prefilled. -->

> PostHog is the leading platform for building self-driving products. With a full suite of developer tools – [AI observability](/ai-observability), [product analytics](/product-analytics), [session replay](/session-replay), [feature flags](/feature-flags), [experiments](/experiments), [error tracking](/error-tracking), [logs](/logs), and more – PostHog captures all the context agents need to diagnose problems, uncover opportunities, and ship fixes. A [data warehouse](/context-warehouse) and [CDP](/cdp) tie it all together, unifying that context into one source agents can read across. You can steer it all from [Slack](/slack), [the web app](/ai), the desktop ([PostHog Desktop](/desktop)), or your own editor via the [MCP](/mcp).
