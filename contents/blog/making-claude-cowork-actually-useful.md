---
date: "2026-04-24"
title: Making Claude Cowork actually useful
author:
  - charles-cook
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/robocop_8939115965.png
featuredImageType: full
category: Blog
tags:
- General
- Startups
- People
---


Every article I read about "AI agents for work" tells me the same things. Clean up my inbox. Summarize my meetings. Draft my emails. Turn rough notes into polished decks. Keep my calendar tidy.

These are all lovely ideas. They are also, almost entirely, a list of low-leverage work that I already don't need help with or don’t want to do better. 

I've been using Claude Cowork for a while now. Here's what I've actually found useful, what I haven't, and the single most useful thing it did: telling me what to use it for (wait that bit was supposed to go at the end, oh well.)

### TL;DR

1. Generic "top AI use cases" listicles are written for someone whose job is not your job. Don't copy them.  
2. The highest-leverage thing you can do is ask the agent to come up with use cases for *your* work.  
3. You need to give Cowork a set of "what the agent needs to know about me, my team, my company" files (which it keeps fresh on a schedule), otherwise everything else won’t work.  
4. I find the scheduled background tasks a lot more valuable than the on-demand chat.  
5. Cowork is still bad at some obvious things (most writing, navigating browsers, Google Drive).  
6. I'm a rational optimist about this, and you should be too.

I’ve also shared some of my scheduled tasks, in full, at the end of this post - copy and adapt them!

## Most AI agent advice is written for someone else's job

When I started with Cowork, I did the dutiful thing and read the "top use cases" posts. The advice was always a variation on the same list: inbox triage, meeting notes, polished drafts, calendar wrangling, create a PRD, etc.

The problem: I am already a fast reader and typer. I’ve been inbox zero since 2013. I’m now able to dictate with Wispr Flow at roughly the speed of thought (which is wrecking my WPM). The ambient chore of just reading stuff is kinda where I figure out what I think about things. Hand-typing or dictating is *still* faster and better for me than handing a draft off to an agent and shepherding the output back into something I'd put my name to.

So "help me reply to emails" turns out to be the equivalent of asking Cowork to help me pour coffee. Possible! But not *obviously* the highest-leverage deployment of a reasoning engine in the universe.

This is probably why I have historically sucked at the productivity-hack genre and have used Asana like a noob for 12 years. 

## Ask the robot what to use it for

The single most useful hour I spent with Cowork was asking it to help me figure out what to use Cowork for.

I started by complaining about the things I don’t want to use it for. I then gave it a bunch of context about me (more later) and what I’m *already* doing in a typical week, rather than what aspirationally I think I should be doing. The suggestions were much better than anything I'd have come up with on my own. 

Two of my favorite scheduled tasks came directly out of that conversation.

### 1. Coherence check

Every Monday at 08:08 London time, Cowork pulls the quarterly objectives for every [small team](/newsletter/small-teams) (about fifty of them) from the website repo on GitHub. Then it reads them all in one pass, looking for the stuff you only spot when you actually have every plan in your head at the same time: two teams using the word "activation" to mean different things, Team A's plan assuming Team B will ship something that Team B has not committed to, two teams pulling in opposite directions on the same metric, objectives still labeled Q1 in late April. 

It posts a list to a private Slack channel, grouped by the person who owns each team. If nothing's worth flagging, it doesn't post at all. This work is the kind of cross-org program management that you basically pay executives fabulous amounts of money to do.

### 2. "Push harder" Monday ritual

Also Monday, before I open my laptop, Cowork pulls current PostHog metrics via [our own MCP](/docs/model-context-protocol), reads the growth review sheets from the sales and marketing teams, and scans the last 7 days of the main GTM channels in Slack. Then it generates 3–5 aggressive growth bets that I might not have considered. 

Each bet has to name the “sacred cow” being sacrificed (CAC payback, margin, attribution clarity, brand consistency- pick one), rough size, a concrete first move with the person who'd own it, how we'd know to kill it, and a one-line rebuttal to the predictable frugal objection. The prompt literally says *"hype man, not McKinsey"* and *"most spicy first."* 

I don't take all of the bets seriously. I take about one in five, which is roughly the hit rate I want, adapting as needed. I then copy and paste my favorite to the relevant team and pretend I came up with it myself. 

I also periodically ask Cowork to check its own setup! “Where are you getting that from?” or “What context do you have on blah?”. This works surprisingly well - often Cowork will tell me about things like duplicate or stale files, and then suggest a solution. 

## Give it context it can't guess

The thing that actually makes all these suggestions *work* is the context the agent has to reason about your work. Ok this is boring and obvious, so I’m going to be extremely specific about what you actually do. 

Out of the box, an agent knows nothing about you. It doesn't know Joe runs the Marketing small team (or even what a small team is), or that "activation" means something specific in our billing flow, or that this quarter the CSM north star is 120% NRR. Before you schedule anything, you have to hand over the context *and* have a way to keep that context fresh.

My setup lives under `~/Documents/Claude/Memory/`:

* `CLAUDE.md` is the index. Who I am, my direct reports (with GitHub handles and Slack IDs), current focus areas, standing preferences ("Meeting Free Tuesday — protect for deep work"), and a map pointing to everything else.  
* `glossary.md` explains stuff to Cowork. Every PostHog-specific acronym (NRR, TAM, MCP), every Slack channel that matters. When someone pings me "TAM coverage proposal status?", the agent knows TAM = Technical Account Manager at PostHog, not total addressable market. It also knows that when I refer to James, I’m probably talking about James Hawkins not James Greenhill (sorry Jams).   
* `people/[name].md` – one file per person I work closely with. What they own, how they want to be managed, what I've learned about working with them. This is the bit that helps Cowork help me prep for things like 1-1s.   
* `context/company.md`, `context/handbook/`, `context/exec-responsibilities.md` – how the org actually works. Which exec owns which small teams. The current quarterly goals. How the handbook's structured and where to find what. (Side note – having a [public handbook](/handbook) that consists entirely of `.md` files is awesome for this!)

To keep the context fresh, I have a bunch of scheduled tasks running, which all started with a prompt like ‘ok so how are you keeping this up to date’:

* **Daily memory sync.** Reconciles the working memory with whatever's changed in the underlying files.  
* **Weekly company-details sync.** Pulls the latest legal/finance/entity data from a Google Sheet into the memory file, so when I ask about the German entity I get current numbers, not something from February.  
* **Weekly handbook sync.** Grabs fresh versions of the handbook's root pages from the website repo.  
* **Weekly Blitzscale ownership refresh.** Re-reads [the handbook](/handbook/exec/responsibilities) to work out which exec is currently responsible for which teams. This is what powers the "group by owner" bit of the coherence check - this matters because we change stuff around a bunch at PostHog.   
* **Monthly memory refresh**. Every month I write a GitHub issue called "Things Charles cares about" that lists my current priorities. On the 8th, a task reads that issue and updates `CLAUDE.md`. The issue is the only place I write my monthly priorities down for the whole company to see.

The effect is that when I open Cowork on a random Tuesday morning and ask "who's the TAM for blah?", the agent already knows that it's a customer lookup, that Vitally is the source of truth, what our data model looks like etc. Without the context layer, it has to ask me clarifying questions every single time, or make random wrong assumptions. 

## Schedule the work

The bulk of the value I get is from tasks that happen to me on a clock, not tasks I remember to ask for. My Monday morning stack runs itself before I've opened my laptop:

* **08:01 - 1:1 prep.** Looks at my current "Things I care about" priorities issue, pulls the last seven days of GitHub activity for each of my direct reports across the RFC repos, finds anything they've tagged me on that I haven't replied to, and write 2-3 specific discussion topics per report into the Asana task I use to run 1:1s. Only about ⅓ of the output is actually useful, but there’s always *something* in there I would have missed.   
* **08:04 - push-harder (above).**  
* **08:05 - internal digest.** Scans PostHog's `company-internal` repo for new threads I might've missed, pulls RFCs my direct reports have authored in the last week, and flags any open issue or PR where I've been tagged but haven't responded.  
* **08:08 - coherence check (above).**

About 90 minutes of context-loading that now just shows up as a set of posts in a private Slack channel. I have still not figured out how to get Slack to send me an actual notification, so like a caveman I have a daily task in Asana to ‘check private Slack channel’. 

Later in the week:

* **Wednesday 08:00 - promise tracker.** Aka micromanagement on crack. It scans the past 7 days of my inbound Slack DMs, @-mentions, and replies, my Gmail, the transcripts of every Granola-recorded meeting I attended, and GitHub threads where I've asked a question. It looks for commitment language from other people ("I'll send you that by Friday," "leave it with me," "let me come back on this") and then cross-checks whether they delivered. I will probably have to delete it when the team tells me I’m being annoying.   
* **Friday 16:33 - weekly achievements report.** Pulls my calendar, my Granola transcripts, my sent Slack and Gmail, and my Asana tasks from Monday to Friday, and writes me a "your week in review" post: what I actually got done, where my time went, what I was talking about, and what's still in flight. Posted to Slack with a DM ping. This is mostly a morale thing, à la [Oliver Burkeman](https://www.oliverburkeman.com/donelist) (who would otherwise hate everything about this post, probably). 

## Where it still falls over

Lots of things! But I’m 80% sure the models will just keep getting better.

* **Writing.** For anything where voice *really* matters - brand-type blog posts, giving feedback, real emails/DMs - it's still faster and better for me to brain-type or dictate. I had Cowork help on a draft of this piece and the overall structure, and then spent a bunch of time rewriting 80% of it. I have a writing style skill that I’m working on here.   
  * I also believe that the implied social contract of ‘it should take the writer much more time to create something than the reader to read it’ will continue to hold.   
* **Browser actions.** If a task requires clicking around in a website, it's much slower and much more fragile than me doing it.  
* **Google Drive and Docs.** This is the one that actually frustrates me. Working with anything in Google Docs or Drive is a complete mess - the integrations are shallow and then you hit random edge cases like "the Google Drive integration can't actually move files between folders".   
* **Random integration gaps.** Related - you routinely run into something that *looks* like it should work ("just move this file", "just rename this doc") and then turns out to not be supported, with no obvious way to know that in advance.

I’m sure all of this stuff will get better. I’ve gone from ‘what’s an MCP’ to ‘wtf why does your MCP suck’ in the space of 6 months, so I imagine that companies just need to catch up. There are a couple of SaaS tools we use that don’t have good/any MCP support yet that I would love to plug into Cowork, but we’re not there yet. 

## Things can only get betterrr

I'm excited about where this goes. The whole ‘ask the robot how to use it’ and then scheduling tasks taken together has taken me from messing about and [creating slop](/blog/stop-ai-slop) to genuinely deriving value from AI tools. As PostHog grows, I’m already finding Cowork helps me keep on top of what’s going on without feeling like we need to impose more structure or project management to get things done. 

I also think a lot of the early disappointment people have [with agents](/newsletter/building-ai-agents) is the "help me with my inbox" type stuff, where you’re getting the agent to do some low leverage task that is also hard to get right because the bar is "exactly how I would have done it, but faster." The bar is much easier to clear when the task is "do something I wasn't doing at all."

My advice, if you're trying Cowork:

1. Don't copy someone else's use cases. Your work is not their work.  
2. Ask the agent to propose tasks tailored to your week.  
3. Give it the context it can't guess and schedule the maintenance jobs that keep that context fresh.  
4. Put your favorite tasks on a schedule too. Don't rely on remembering to open chat.  
5. Accept that it’s not perfect by a loooong shot but it’s still a heck of a lot better at a bunch of stuff than you are. 

---

## Reference: tasks you can steal

Below are simplified versions of three of the scheduled tasks I mentioned above. The originals have a lot of PostHog-specific detail in them (team names, Slack channel IDs, direct report GitHub handles, our growth sheets); these versions have been trimmed to the pattern so you can adapt them to your own setup.

Drop each one into Cowork, and point the `[bracketed]` bits at your own stuff.

### 1. Coherence check — weekly

**Frequency:** Monday morning. **Gets you:** a terse list of places where team plans contradict each other or have gone stale.

```
You are running a weekly coherence check across every team's quarterly plans.

## Step 1 — Fetch plans
Use the GitHub MCP to fetch the objectives.mdx file for every team from
[owner]/[repo]. Team list: [paste your team list here, or point to a directory].
Fetch in parallel. If a file 404s, note "no plan found" — don't crash.

## Step 2 — Analyse for coherence issues
With all plans in context, check for:
1. Stale plans — still labelled as a previous quarter.
2. Missing plans — teams with no objectives file.
3. Undefined shared concepts — same term used by multiple teams with different
   or absent definitions (e.g. "activation", "qualified lead").
4. Dependency gaps — Team A's plan assumes Team B will deliver X, but Team B
   doesn't commit to X.
5. Unowned top-level goals — exec-level objectives with no clear home in any team.
6. Conflicting optimization — two teams pulling opposite directions on the same metric.
7. Vagueness flags — goals without a measurable outcome, owner, or time-bound criterion.

Be specific and actionable. Name the teams. Quote the conflicting text.
Re-flag persistent issues if they still matter — novelty isn't the bar.
Don't bother with "strong alignment" callouts.

## Step 3 — Post to Slack
Post to [channel ID]. One line per finding, use bullets, no emojis,
no --- dividers, keep under ~2000 chars. Lead with the 1–3 items to act on first.
If there is nothing material to flag, do NOT post. Silence is correct.
```

### 2. "Push harder" Monday ritual — weekly

**Frequency:** Monday morning. **Gets you:** 3–5 aggressive growth bets designed to push against your own defaults.

```
You are running the weekly Push-Harder Ritual. Your job is to be a hype man,
not a consultant. [Company] defaults to [frugal / cautious / risk-averse — whatever
your default flavour is]; this ritual is the counterweight. Give me 3–5 bets that
make the cautious side of my brain go "ugh, really?" and the growth side go
"…actually though."

## Step 1 — Pull inputs
1. Metrics via [your analytics MCP]: pipeline, activation, growth by segment,
   conversion. Care about what's moving and what's not.
2. Growth review docs from [link or file IDs].
3. Slack context from the last 7 days of [sales/marketing/growth channels] —
   what's the team wrestling with?

## Step 2 — Generate 3–5 bets
No template. Each bet should read like a paragraph or two of someone who actually
gives a shit, not a project plan. Weave these in — don't make me tick boxes:

- What sacred cow we're sacrificing (CAC payback, margin, founder time,
  attribution clarity, brand consistency — name it)
- Roughly how big the cheque is (envelope, not a budget line)
- Something concrete to do this week, with the name of the person who'd own it
- How we'd know to kill it (signal, rough window)
- A sharp rebuttal to the predictable cautious objection

## Step 3 — Tone
- Hype man, not McKinsey. Dry humour is fine. Corporate fluff is banned.
- Most spicy first. If every bet feels safe, go back.
- Name real people who'd actually run it. Abstract bets die.
- "Hire more people" is never the answer.
- Confidence calibration is fine — if you're 60% on a bet, say so.

## Step 4 — Save and share
Save to [path]/push-harder-<YYYY-MM-DD>.md and send me a link.
```

### 3. Promise tracker — weekly

**Frequency:** Midweek, once things have had a few days to either get delivered or slip. **Gets you:** every unfulfilled promise other people have made to you in the last 7 days.

```
You are running the weekly Promise Tracker. Scan the past 7 days of my INBOUND
communication across Slack, email, meeting transcripts, and GitHub. Extract
commitments other people made directly TO ME ("I'll send you X", "leave that
with me", "we'll have it by Friday"). Cross-check for evidence the committer
delivered. Post the open items to [channel].

Directionality is the core filter. This tracks what other people owe me — not
what I owe. A promise only counts if it's directed at me specifically, not
broadcast to a room I happened to be in.

## Step 1 — Pull source material (parallel)
- Slack: 1:1 DMs with me, threads I started or replied in, direct @-mentions of me.
  NOT random channel chatter I was present for.
- Gmail: inbound threads where I'm addressed (to:me). Skip marketing.
- Meeting transcripts [Granola / Fireflies / whatever you use]: scan speaking turns
  by people OTHER than me for commitment language addressed to me.
- GitHub: PRs where I requested review, issues I opened, threads where I asked
  a question — look for commitments in responders' comments.

## Step 2 — Extract candidates
Cast wide on language, tight on directionality. Keep soft commitments in —
"let me think about it", "leave that with me", "I'll have a look".

For each candidate capture:
- Promise text (quoted, ~15 words)
- Committer (name + role)
- Source link
- When made
- Stated deadline if any (resolve "by Friday" to a date)

## Step 3 — Check for delivery
Look for: subsequent follow-up with the deliverable attached, a new artefact
by the committer, my own acknowledgement ("thanks, got it"), or explicit
retraction.

Drop same-day items (no time to deliver) and future deadlines not yet passed.
When in doubt, leave it in.

## Step 4 — Group, dedupe, post
- Dedupe across sources (often the same promise appears in a meeting and a
  follow-up DM).
- Group by committer. Sort oldest-first within each group.
- Priority to the top: execs, external parties, anything aged >5 days.

Post to [channel]. Bullets, short date stamps ("made Mon", "5d old", "due Fri —
overdue 2d"). No emojis. If nothing material, do NOT post.
```
## Bonus: the MCPs I actually use

If the scheduled tasks are the output layer and the memory files are the context layer, the MCPs are the plumbing underneath that connects the agent to the rest of my stack. A few I'd actually recommend, in rough order of how often Cowork reaches for them on my behalf. Cowork calls these ‘Connectors’ to stop non-technical people like me from being scared. 

### PostHog MCP

The one that changes what's possible. When I ask "how's ARR looking this week?" Cowork runs actual SQL against [our data warehouse](/data-stack), pulls live numbers, and hands them back.

I also use it for customer lookups. I route "who's the TAM for [customer]?" through the PostHog MCP because we keep [Vitally synced into our warehouse](/docs/cdp/sources/vitally). Every customer question Cowork answers starts with an `execute-sql` call against that data.

### GitHub MCP

Every scheduled task that does real work touches this one. The coherence check fetches ~50 teams' `objectives.mdx` files in parallel. The 1:1 prep searches each direct report's RFC activity for the week. The internal digest surfaces threads I've been tagged in but haven't replied to. The monthly memory refresh reads my "Things Charles cares about" issue and updates CLAUDE.md from it.

If your company runs any real work on GitHub (a handbook repo, an RFC tracker, internal issues), this is the highest-leverage connector to install. Especially the `search_issues` and `get_file_contents` endpoints — most of the interesting automations are built on those two.

### Slack MCP

*Not* for sending things on my behalf - I don't want Cowork posting to public channels pretending to be me.

For reading stuff it's great: scanning the last 7 days of a sales or marketing channel, finding threads I'm mentioned in, reading out a DM conversation I need to pick back up, feeding the promise tracker.

Cowork posts its own scheduled-task output into a private Slack channel that only I can see. The private-channel pattern is nice - my Slack is already the place I check first thing in the morning, so putting Cowork's output there means I don't have to open a separate app to see what my agent's been up to overnight. I’m still not in the habit of regularly checking Cowork itself for the output. 

### Granola MCP

If I had more meetings this would probably be a lot more useful. Works really nicely when I need it though!

### Asana MCP

For a task management tool I mostly use this in one narrow way: the Monday 1:1 prep task writes discussion topics directly into subtasks under a recurring "1:1 prep" task, one subtask per direct report. I suspect the Linear and Notion MCPs are equally capable. 

### Google Calendar MCP

Not bad at reading my calendar, occasionally used by scheduling-related tasks. I still do all my own calendar management by hand though. 

### Google Drive

Included for completeness. Reading files is *fine* - the push-harder ritual reads the sales and marketing growth review sheets every Monday. Anything involving Docs formatting or Drive organization is currently a mess. I tried getting Docs to actually update my 1-1 docs and it was comically inept.
