---
title: What we learned from our first 300k Replay Vision scans
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

A month ago we launched [Replay Vision](/replay-vision), our AI layer over Session Replay. It watches session recordings and writes up what it finds, so nobody has to sit through them. We put it to work on PostHog right away, and in the last few weeks Replay Vision has watched 300k recordings for us. ([Nobody was going to watch](/blog/nobody-watches-session-replays) most of them anyway.)

The biggest thing we learned from all that watching? Replay Vision fixes the watching part, but not the *thinking* part. It sounds simple, but it's the most important thing to remember when building scanners. And yes, we learned this the annoying way: in our first few weeks, some scanners found real issues and opportunities, while others produced perfectly plausible session summaries that nobody wanted to read. The difference became clear pretty quickly. Every scanner that produced useful results shared three things:

- a clear, focused, observable question that could only be answered by watching the recording
- a clear slice of relevant recordings that could actually answer it
- permission to say "no" or "inconclusive"

## Remind me, what is Replay Vision, anyway?

A quick introduction for those who are new here. Replay Vision is built around scanners, and a scanner is a job you set up to watch recordings. Each scanner has a query that chooses which recordings to watch and a prompt that tells it how to judge each one. When a scanner watches a recording, it produces an observation.

Replay Vision has four scanner types, depending on the answer you want:

- A monitor answers a yes-or-no question and can return "inconclusive."
- A classifier applies a label.
- A scorer gives the recording a numerical score.
- A summarizer writes up what happened.

## 1. One question = one scanner

### Broad scanners produce more words, not better answers

When people build their first Replay Vision scanner, they tend to try the same thing: one scanner that "watches everything" and "catches everything interesting" (ask us how we know). It sounds reasonable, but it asks the model to decide both what happened and what matters to you and your product. It can do the first part just fine... but the second is still your job.

Here's a real example. We noticed people trying to investigate errors in Error Tracking, getting frustrated, and eventually going, "F*** it, I'll have PostHog AI try this instead." We set up a scanner to find those moments and show us where the product stopped helping.

The question was specific: what was the person trying to do before they "escaped" to AI, and what should we improve?

### What the query and prompt actually do

The scanner we built is a classifier called "[Error Tracking] Escape to AI assistant" and it works like this:

- Recording query: selects sessions that contain both an Error Tracking issue view and a PostHog AI conversation. Without that query, the scanner would waste most of its time watching routine investigations where nobody needed help.
- Prompt: asks what the person was trying to do, where the UI stopped helping, and what job they handed to PostHog AI.
- Labels: tag the recording using our preset list or a free-form label when the scanner finds something we hadn't predicted. Examples include explaining an error spike, separating third-party noise from failures worth fixing, or deciding what to fix next.
- Short explanation: tells us what the scanner saw and why it chose that label. For example, the person opened PostHog AI after the issue view gave them no obvious way to separate third-party noise from the spike they were investigating.

### Context makes the question more specific

A scanner works better when its prompt uses the product's real names, states, and workflows. [PostHog AI](/ai) can inspect the context already in PostHog and add it to the prompt, while a coding agent can use the [PostHog MCP server](/docs/replay-vision/mcp) to pull product and workflow context directly from the codebase.

### Observe before you digest

A scanner only sees one recording at a time, so it cannot compare that session with recordings it has never seen. A [Digest](/docs/replay-vision/actions) can summarize recent observations from one scanner. A [Scout](/blog/what-is-a-scout) is an agent that can compare those observations with the rest of your product data and report the patterns it finds.

## 2. Aim your scanner at the right recordings

The query is how you aim your scanner. If you get it wrong, the output will likely make you go "meh," right before you spend four hours watching recordings yourself. The best prompt in the world is mostly worthless if it sees the wrong recordings.

Another scanner we use watches people use Session Replay and looks for ways we could improve the product. Its query ignores brief visits, which waste credits and add clutter, and only selects sessions where someone had deep engagement with the product. In this case, we trigger a scan when someone filters the recording list, inspects events, saves a recording, or exports one.

The prompt asks one question: did this session reveal a concrete opportunity to make Session Replay more capable? A "yes" needs visible evidence, an unmet job or repeated workaround, and a small product change we could test. It also prompts the scanner to consider alternative explanations, since not every detour is a feature request in disguise.

### Use the rest of PostHog to aim the scanner

Most of this happens through the query. Use the event, URL, cohort, experiment exposure, survey response, or minimum duration that gives the session meaning. Some of our favorite remixes include:

- Experiments: a scanner classifies each post-exposure recording to help understand how behavior differs between arms
- Funnels: a scanner helps tease out what makes someone convert vs drop off
- Surveys: a scanner checks behavior right before a survey response is submitted

## 3. Demand visible proof

### Make the model prove the premise

We also have a ghost-bug scanner. It watches people use Replay Vision (yes, we very much love using Replay Vision to improve Replay Vision) and looks for areas where the product contradicts itself or traps someone in a task it invited them to start.

The scanner only says "yes" when the recording shows both halves of the contradiction. It has already caught real problems. In one recording, a user reached the scan conditions step while creating a scanner. Beside "Filter out internal and test users," the product showed a gear icon. The gear did exactly what it promised when clicked: it opened project settings.

It also pulled the user out of the scanner wizard.

A normal event stream could show a settings visit followed by an abandoned wizard, but no error fired because, technically, the product worked exactly as we built it. The recording showed the actual failure: the product told the user to click a control that removed them from the task it wanted them to finish.

Once we could see both halves, the fix was fairly obvious: keep the setting inside the wizard instead of sending the user away. PostHog AI later opened a PR with that fix.

### "Inconclusive" is a feature

If an ordinary error accurately explains what happened, the answer is "no." If the recording misses either half, the answer is "inconclusive." The recording has to prove the claim, not merely make it sound plausible.

This sounds conservative and *gasp* boring. Good. Most sessions should not become findings, and a scanner that is never allowed to be boring will eventually make things up.

"Inconclusive" is a feature. It keeps the "yes" pile small enough for a person to inspect, which matters because selectivity is not the same as accuracy. Every observation links back to its recording, so when the scanner cites a contradiction, we can jump to the cited moments and watch both halves.

A scanner saying "Idk" is way better than making something up.

## Other tips and tricks

Three other things we've learned along the way:

### Scanners can look for upside, too

Bug scanners are still the obvious first move, and we run plenty of them (dead clicks, broken renders, and setup loops are easier to catch when something watches the footage), but scanners can, and should, look for upside too. The Session Replay scanner above is one example.

We call them opportunity miners, and they show us the work people tried to do, where the product made it harder, and which ideas deserve a closer look. Product judgment remains a human problem, which is fortunate for those of us employed to provide it.

### Test the scanner right away

Create the scanner, then use the [bulk scan action](/docs/replay-vision/running-scanners#from-the-recordings-list) to run it against a small batch of recent recordings. Read the observations beside their source recordings and look for overclaims, missed proof, weak labels, or instructions that seemed obvious until the model interpreted them literally.

Use the Calibration tab as a review queue. Rate each result, and add a sentence when the scanner got the premise wrong. PostHog AI can recommend and test changes against that feedback, but it will not apply them until you choose.

Don't try to perfect the prompt before you run it. The first batch will tell you how the prompt actually performs.

### Pick the model based on the cost of a wrong answer

The model changes both quality and cost. Start with `Standard`, the default. If the observations are close but not quite right, tighten the prompt before you pay for `Pro`. A sharper instruction often fixes the problem.

Use `Lite` for high-volume jobs where you care about the distribution, not one observation. Our broken-render classifier tags recordings as `nothing_broken`, `media_failed`, `clipped_layout`, or `horizontal_overflow`. One wrong label nudges a trend instead of opening a ticket.

Use `Standard` when the job combines a fixed rubric with some judgment. An experiment classifier fits well here. It can label each post-exposure recording as `smooth`, `hesitation`, `confusion`, `error_or_dead_end`, or `inconclusive`, then a Scout or a different agent can compare the pattern across variants.

Use `Pro` when someone may act on one observation, because a plausible wrong answer wastes their time.

---

If you take one thing from this piece, remember: your job is to pick and refine the questions you want Replay Vision to answer. It will do the watching.

## Prompts for you to steal

These prompts are for PostHog AI or a coding agent connected to PostHog through the MCP server. The agent should inspect your project and create the scanner.

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

use the same model and prompt for every variant. use Standard for a clear fixed-tag rubric. use Pro only if the hypothesis requires nuanced judgment from each recording.

test the scanner against representative recordings from every variant. then add a daily Digest that synthesizes the observation patterns. keep all cross-observation and cross-variant comparison in the Digest, a Scout, or product analytics, never in the scanner prompt.

before enabling the scanner, estimate its monthly observation volume and credit use. check the remaining quota. if the estimate is material, create it paused and show me the estimate. otherwise create it and return the scanner and Digest links.
```

[Set up the experiment scanner in PostHog AI](https://app.posthog.com/#panel=max:set%20up%20Replay%20Vision%20for%20the%20experiment%20%5Bexperiment%20name%20or%20id%5D%20in%20this%20PostHog%20project.%0A%0Afirst%20resolve%20the%20exact%20experiment.%20read%20its%20hypothesis%2C%20feature%20flag%20key%2C%20variants%2C%20exposure%20event%2C%20and%20the%20product%20surface%20that%20changes.%20if%20the%20experiment%20is%20ambiguous%20or%20has%20no%20usable%20hypothesis%2C%20ask%20me%20instead%20of%20inferring%20one%20from%20the%20name.%0A%0Acreate%20one%20single-label%20classifier%20for%20all%20variants%20so%20every%20recording%20uses%20the%20same%20rubric.%20target%20recordings%20containing%20the%20%24experiment_exposure%20event%20for%20the%20experiment%27s%20exact%20feature%20flag%20key%20and%20active%20variant%20values.%20exclude%20test%20accounts.%20do%20not%20create%20separate%20scanner%20prompts%20for%20each%20variant.%0A%0Atailor%20the%20tags%20to%20the%20hypothesis.%20if%20the%20hypothesis%20does%20not%20imply%20a%20better%20rubric%2C%20start%20with%3A%20never_reached_changed_surface%2C%20completed_smoothly%2C%20completed_with_hesitation%2C%20confused_or_backtracked%2C%20error_or_dead_end%2C%20and%20inconclusive.%0A%0Awrite%20the%20scanner%20prompt%20for%20one%20recording.%20it%20must%20ignore%20behavior%20before%20exposure%2C%20decide%20whether%20the%20user%20reached%20the%20changed%20surface%2C%20choose%20one%20tag%20from%20visible%20post-exposure%20behavior%2C%20and%20cite%20the%20decisive%20moments.%20it%20must%20not%20guess%20the%20variant%2C%20compare%20variants%2C%20infer%20causality%2C%20or%20generalize%20from%20the%20recording.%0A%0Ause%20the%20same%20model%20and%20prompt%20for%20every%20variant.%20use%20Standard%20for%20a%20clear%20fixed-tag%20rubric.%20use%20Pro%20only%20if%20the%20hypothesis%20requires%20nuanced%20judgment%20from%20each%20recording.%0A%0Atest%20the%20scanner%20against%20representative%20recordings%20from%20every%20variant.%20then%20add%20a%20daily%20Digest%20that%20synthesizes%20the%20observation%20patterns.%20keep%20all%20cross-observation%20and%20cross-variant%20comparison%20in%20the%20Digest%2C%20a%20Scout%2C%20or%20product%20analytics%2C%20never%20in%20the%20scanner%20prompt.%0A%0Abefore%20enabling%20the%20scanner%2C%20estimate%20its%20monthly%20observation%20volume%20and%20credit%20use.%20check%20the%20remaining%20quota.%20if%20the%20estimate%20is%20material%2C%20create%20it%20paused%20and%20show%20me%20the%20estimate.%20otherwise%20create%20it%20and%20return%20the%20scanner%20and%20Digest%20links.)

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

> PostHog is the leading platform for building self-driving products. With a full suite of developer tools – [AI observability](/ai-observability), [product analytics](/product-analytics), [session replay](/session-replay), [feature flags](/feature-flags), [experiments](/experiments), [error tracking](/error-tracking), [logs](/logs), and more – PostHog captures all the context agents need to diagnose problems, uncover opportunities, and ship fixes. A [data warehouse](/context-warehouse) and [CDP](/cdp) tie it all together, unifying that context into one source agents can read across. You can steer it all from [Slack](/slack), [the web app](/ai), the desktop ([PostHog Desktop](/desktop)), or your own editor via the [MCP](/mcp).
