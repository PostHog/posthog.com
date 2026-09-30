---
title: How to write a data study
sidebar: Handbook
showTitle: true
---

A data study is a short, opinionated article built on our own first-party data. 

We've shipped two so far: [Nobody watches their session replays](/blog/nobody-watches-session-replays) and [How AI agents behave](/blog/how-ai-agents-behave). 

## Why bother

**LLMs reward original data.** Answer engines cite sources that have numbers nobody else has. A study with "we looked at 7.7 million replay views" in it gets quoted in ways a listicle never will. This is the single cheapest AEO lever we have, because the data already exists and nobody can copy it.

**It's shareable.** Every section of a good study is a standalone social post. Every chart is a standalone image. The headings write the video script. One study feeds a month of distribution.

**It finds product problems.** The agents study surfaced that one dashboard tool returns 144k tokens to move a tile, that surveys have no MCP creation path, and that our own scouts error half as often as everyone else on the same model. None of that was the point of the study. All of it went to the product teams.

**It used to be a quarter of work. It's now about a week.** The MCP, PostHog AI, and the Slack bot do the grunt work. That changed the math: a study is now a normal-sized content project, not a special one.

## What makes a good one

Run your idea through these before you pull anything:

- **Is it data we already collect?** No "we should start tracking X." If it needs new instrumentation, it's a product request, not a study.
- **Would a reader who doesn't use PostHog care?** "How people use session replay" is interesting to anyone who has one. "How people use our cohort builder" isn't.
- **Can the finding survive being one ratio?** "99.8% of recordings are never watched." "Agents create 2.5x more insights than humans." If it takes three caveats to be interesting, it isn't.
- **Does it produce graphs?** A study with one number is a tweet. Aim for five to eight charts.
- **Are we willing to publish it if it's unflattering?** "Nobody watches session replays" is a strange thing to publish when you sell session replay. It's also the reason anyone read it. The rule: we'll publish anything true as long as we have an answer to it.
- **No PII, no single customer identifiable.** Aggregates only. Outlier stats ("one person watched 24,649 replays") are fine if the person can't be found from them.

## The process

### 1. Pick the angle with the MCP

Don't guess what data exists. Point Claude (or PostHog AI) at the MCP and make it check event and property definitions before pitching anything.

Give it guardrails up front: no PII, must be data we collect, must be pullable in a few HogQL queries, must survive being one ratio. Tell it which products you know well so it biases toward things you can write about with authority. Then make it argue against your favourite. You'll be attached to something already; better to hear the case against it now than in review.

Ask for six angles, each with the headline claim, the query that proves it, why a non-PostHog reader cares, and how it could turn out boring.

### 2. Pull the data into a Notebook

Ask PostHog AI to create a Notebook and put every query in it with its HogQL. You will re-run these queries at least twice (once to fact-check, once because a month passed), so they need to be reproducible, not pasted into a doc.

The rules that matter:

**Denominators are the whole study.** The headline ratio in the replay study only worked because mobile recordings and zero-duration recordings were set aside so "captured" counted the same population as "opened." State the exact population under every number. "4%" means nothing until you know if it's 4% of 3 million or 4% of 40.

**Medians over means.** Means get dragged by players left open for hours, or one customer syncing cohorts by API. Report the median, show the distribution if the tail matters, and say when a mean is being pulled by outliers rather than quietly averaging them in.

**Set our own traffic aside, and say so.** PostHog Desktop, the CLI, the Slack app, and Signals scouts all hit the same MCP as customers. In the agents study, 84% of "Codex" traffic was our own scouts. The draft said "Codex is the dominant caller at 62%." It wasn't; Claude Code was, once we took ourselves out. Filter on `$mcp_consumer` (or the equivalent for your data) and put the first-party share in the footnote.

**Pick windows deliberately and write them down.** 90 days for headline volume, shorter for anything that needs recent instrumentation. Every window goes in the methodology footnote.

**Check the governed metric catalog first.** If there's an approved metric for the thing you're measuring, use it. If there isn't, say your number is a derivation.

### 3. Get product context from the Slack bot

You probably didn't build the product you're writing about. Ask the PostHog Slack bot for: what it actually does, what's GA vs beta vs flagged, when it shipped and whether rollout was gradual (this breaks before/after comparisons), the docs and PRs, and the honest limitations. Ask who should review the draft.

Ask for the rough edges explicitly. You'd rather write about them than get corrected in the comments.

### 4. Write it

Write it yourself. Use the AI for structure: ask it for three outlines with different through-lines, which finding carries each one, and which findings are filler to cut. Ask it to flag anywhere you're about to imply causation from correlation — that's the trap you'll walk into.

Then for each headline number, ask for two other units it could be stated in. "17 seconds" and "6% of the recording" are the same fact, and one of them is the story. "340 recordings" is nothing; "three and a half working days of footage" is the chart.

Editorial rules we've settled on:

- **Headings are claims, not questions.** "Codex makes the fewest mistakes," not "Which agent is most reliable?" People lean in. It also means the headings *are* the social posts and the video script.
- **Pick one number style and stick with it.** Percentages, not "one in fifteen." Switching between them makes the reader think, and the reader doesn't want to think.
- **Every chart is preceded by the sentence it proves.** The reader should know what they're about to see.
- **The methodology footnote is where the caveats go.** The body says the number; the footnote says exactly what it counted, what it excluded, and why. If a number needs a caveat in the body to be honest, either the caveat goes in the footnote or the number goes.
- **If we're in the data, own it early.** "First, a caveat: almost half of that traffic is us" in the first line of the section, not buried at the end.

### 5. Charts

Mock them first. Give Claude the notebook queries, have it re-run them through the MCP itself (not trust pasted numbers), and ask for three visualization options per finding. This doubles as a validation pass: a wrong number tends to look wrong the second it's plotted.

Then make them real. The brand tokens live in the `@posthog/brand` npm package: the colour palette as a plain object and RoundHog as woff2 files. Use them directly rather than eyeballing hex codes off the brand site. Colour follows the entity (Anthropic is always blue, OpenAI always tangerine), never the rank, so a reader can track one thing across every chart.

Every chart carries its `n` and its time window in the subtitle. Every chart has a title that states the finding, not the axis.

Hand Graphics the SVGs with live text, not PNGs, so they can restyle without redrawing.

Image naming: files upload to Cloudinary as `<name>_<hash>.<ext>`, and the hash is generated on upload, so you can't write the final URLs until the files are up. Name files `01_whos_calling.png` style, upload, then paste the URLs. Every re-upload gets a new hash.

### 6. Fact-check adversarially, then independently

Two passes, in this order.

First, give Claude the draft and the notebook and tell it to get the post killed in review. Every number in the prose checked against the query that produced it. Every ratio checked for numerator and denominator counting the same population. Causation dressed as correlation. Anything that could identify a customer. Anything a competitor could dunk on, and how they'd phrase it. Sorted by how embarrassing it is if it ships.

Second, get someone else to re-pull the headline numbers from scratch, without looking at your queries. In the agents study, three independent runs of the retry funnel all disagreed with the notebook in the same direction (39% retry, not 52%). The notebook had keyed on `$mcp_session_id`, which rotates on reconnect. Nobody would have caught that reading the SQL. Someone did catch it by re-deriving the number.

### 7. Review and ship

Open the PR on `posthog.com` and tag the product team whose data it is. Expect three kinds of comment:

- **"Should these be grouped?"** (e.g. all Claude surfaces together). Usually yes, and usually it makes the finding cleaner. Pull both cuts before review so you can answer with numbers.
- **"What does this category mean?"** If a chart label needs explaining, explain it in the paragraph before the chart, not in the reply.
- **"That wouldn't happen in one session."** Product people know the product better than you. Fix the copy; don't defend it.

Re-pull every number the day before publishing. A month passed between the agents study's first draft and its ship date, and the headline went from 30 million to 63 million.

### 8. Distribute

The headings are the thread. Each one is a post with its chart. The whole set of headings, read in order, is a 60-second video script. The LinkedIn post is the behind-the-scenes: how it was made, in your own voice, with a link to the study.

## Traps we've hit

Every one of these cost us at least a day. Read the list before you start, not after.

| Trap | What happened | The fix |
|---|---|---|
| **First-party traffic looked like a customer trend** | "Codex is 62% of all calls" was our own scouts | Filter on the consumer/source property; state the first-party share in the footnote |
| **Denominators didn't match** | "Opened" counted web only; "captured" counted web + mobile | Set populations explicitly; check every ratio's numerator and denominator count the same thing |
| **A protocol change looked like behaviour** | Median calls per session fell 5 → 1 the week the MCP stateless revision removed the handshake | Check for instrumentation and protocol changes in your window before publishing a trend |
| **Session IDs rotate** | `$mcp_session_id` changes on reconnect, splitting one conversation into many | Use the conversation-level ID; when there isn't one, say so |
| **The fact-check found what the SQL review didn't** | Retry rate was 52% in the notebook, 39% on three independent re-pulls | Have someone re-derive headline numbers without seeing your queries |
| **Numbers went stale** | 30M became 63M in the month between draft and publish | Re-pull everything the day before ship; put the pull date in the footnote |
| **The chart had old numbers baked in** | The iceberg illustration still said 28% after the text said 25% | Every illustration with a number in it is a chart and gets re-checked with the charts |
| **Selection effect read as a finding** | Sessions that read the schema had lower error rates — because long sessions read the schema | Ask "who ends up in each group?" before reporting a difference between groups |
| **A self-reported field looked like data** | `$mcp_llm_model` is whatever the agent says it is | Don't chart unverified fields; say why in the copy |

## Prompts

These are the ones that did the work. Copy them; edit the specifics.

**Angle**

```
Help me pick an angle for a data study on PostHog's own product data.
Ahrefs-style: one claim, a few charts, no fluff.

You have the PostHog MCP — check what we actually collect before
pitching. Rules: no PII, no single customer identifiable, nothing
that needs new tracking.

For each angle give me the headline, the query behind it, and the
number that would have to be true for it to work. I'll publish
something unflattering about a product we sell if it's true and we
have an answer to it. The finding has to survive being one ratio.

Give me six, rank them, then argue against my favourite.
```

**Data pull**

```
Notebook called "<study name>", every query with its HogQL so I can
re-run it. Cross-tenant, last 90 days, PostHog's own surfaces
excluded.

[numbered list of questions]

Denominators are the whole study, so be pedantic: state the exact
population under every number. Medians over means, and tell me when
a mean is being dragged by outliers. If a number can't be pulled
cleanly, say so — I'd rather cut a section than defend a figure I
can't reconstruct.
```

**Product context (Slack bot)**

```
@PostHog I'm writing a public data study about <product> and I
didn't build it. Get me up to speed: what it does and how it works,
what's GA vs beta vs flagged, when it shipped and whether rollout
was gradual, the docs and PRs, and the honest limitations. Who
should review my draft? If something's contested internally, say so.
```

**Structure**

```
Here are my findings. I'm writing this myself — don't draft it.

What's the single strongest claim? Give me your pick plus one
alternative. Then three outlines with different through-lines:
headings, which finding carries each, which are filler to cut.

For each headline number, give me two other units it could be
stated in.

Flag anywhere I'm about to imply causation from correlation.
```

**Charts**

```
Here are the SQL queries behind my study. Re-run each through the
PostHog MCP and check the numbers hold — tell me about anything
that doesn't match the draft.

Then for each query, three ways to visualize the result, different
chart types, one line on what each gets across. Rough is fine.
```

**Fact-check**

```
Here's the draft and the notebook behind it. Your job is to get this
post killed in review. Be hostile, not helpful.

Every number in the prose, checked against the query that produced
it. Every ratio: same population top and bottom? Correlation dressed
as causation. Claims about the product the docs don't support.
Anything identifying a customer. Anything a competitor could dunk
on, and how they'd phrase it.

Then write the methodology footnote: window, inclusions, exclusions,
every place I chose median over mean.

Sort by how embarrassing it is if it ships. Don't tell me it's good.
```

## Before you hit publish

- [ ] Every number re-pulled within 24 hours of publishing
- [ ] Every ratio's numerator and denominator count the same population
- [ ] First-party traffic excluded from customer-facing cuts, and its share stated in the footnote
- [ ] Headline numbers independently re-derived by someone who didn't see your queries
- [ ] Every chart states its `n` and window
- [ ] Every illustration with a number in it matches the text
- [ ] Headings are claims, not questions
- [ ] One number style throughout
- [ ] No PII, no single customer findable from any stat
- [ ] Methodology footnote covers windows, exclusions, and median-vs-mean choices
- [ ] Product team has reviewed the product claims
- [ ] Image URLs are the real Cloudinary URLs, not placeholders