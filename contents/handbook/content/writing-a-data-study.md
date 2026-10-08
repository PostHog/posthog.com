---
title: How to write a data study
sidebar: Handbook
showTitle: true
---

A data study is a short, opinionated article built on our own first-party data. 

We've shipped two so far: [Nobody watches their session replays](/blog/nobody-watches-session-replays) and [How AI agents behave](/blog/how-ai-agents-behave). 

This page covers why they're worth doing and how to make one.

## Why bother

**LLMs reward original data.** They cite sources that have numbers nobody else has. The data already exists, nobody can copy it, and we're well positioned to be the authoritative source on how people use developer tools.

**It's repurposable.** Each section stands on its own as a social post with its chart. Our data study threads have performed well on X, and there's room in the future for video, shorts, and newsletter issues from the same material. #distribution

**It's a natural way to talk about our products without being salesy.** A data study leads with something interesting, and the product follows from it: how we use our own tools internally, or how a tool solves the pain point the data just surfaced. It feels a lot less forced than a purely transactional piece of content with a pitch.

**We have the tools to make the data part simpler.** One of the hardest part of writing a data study used to be the pulling and the analysis, but that's mostly solved now: the MCP pulls the data, PostHog AI can help with the analysis and keep every query in a notebook so it can be re-run, the Slack bot can fill in the missing product context (if any)... the hard part now is figuring out what how to tell the story, which also happens to be the fun part anyway.

## Picking a topic

Run your idea through these before you pull anything:

- **Is it data we already collect?** If it needs new instrumentation, skip it for now. This should be data we already have in place, ideally lots of it. A finding built on millions of events is more interesting than one built on hundreds, and it's harder to argue with.
- **No PII, no single customer identifiable.** Aggregates only. Outlier stats are fine if the person can't be found from them. We report what we see on our side, never what's inside a customer's own project.
- **Is it relevant to the business?** The topic should connect to a product we sell, a problem we solve, or how we work. Ideally it's aligned with whatever we're focusing on this quarter as a marketing org.
- **Is there a product tie-in that isn't forced?** A study that naturally ends on a product we sell or a tool we use is easier to justify than one that doesn't. If you have to bolt the product on at the end, the topic can probably be reworked.

## The process

### 1. Find the angle

Don't guess what data exists. Point Claude (or whatever you use) at the PostHog MCP, or use PostHog AI, and make it check what we actually collect before it pitches anything. Seed it with products you want to write about, and make it argue different options before you commit.

Example prompt:

```
Help me pick an angle for a data study built on PostHog's own first-party product data.
 
You have the PostHog MCP. Check what events and properties we actually collect before pitching anything – don't assume.
 
Rules:
- No PII, no single customer identifiable. Aggregates only.
- Data we already collect. Nothing that needs new tracking.
 
Bias toward [products]. This quarter we're
focused on [marketing focus], so angles that land there are
worth more.
 
Give me six angles. For each one:
1. The headline, written as if it were the blog title
2. The query that would prove it
3. The number that would have to be true for it to work
4. How it could turn out boring or ambiguous
5. Which product it naturally lands on, if any
 
Rank them by how interesting they'd be to a developer who
doesn't use PostHog.
```

### 2. Pull the data

Ask PostHog AI to pull everything into a notebook, with the SQL next to every result.

```
I'm writing a data study about [topic]. The working headline is "[headline]". Create a notebook called "[study name]" and put every query in it with its SQL visible, so I can re-run and tweak them.

Scope for every query:
- [timeframe]
- Exclude PostHog's own traffic (internal projects, our own agents)
- Cross-tenant, aggregates only, nothing identifying a customer

Pull these, in order:
1. [question – e.g. of recordings created, what share are ever watched?]
2. [question – e.g. median watch time, and the distribution]
3. [question]
...

For every number: state the exact population it's a share of. Use
medians over means, and tell me when a mean is being dragged by
outliers. If a cut has a small sample, say so instead of charting it.
If a question can't be answered cleanly with the data we have, tell
me rather than approximating.

When you're done, double-check the headline: re-derive it a second
way and tell me if the two numbers disagree.
```

### 3. Get product context

You probably didn't build the product you're writing about. You can ask the PostHog Slack bot things like: what it actually does, what's GA vs beta vs flagged, when it shipped and whether rollout was gradual (this breaks before/after comparisons), the docs and PRs, the limitations...



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