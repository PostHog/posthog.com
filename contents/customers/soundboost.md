---
title: How SoundBoost built a self-driving AI product for 225,000 musicians
customer: SoundBoost
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/array/default.png
date: 2026-10-20
seo:
  metaTitle: How SoundBoost runs AI mastering for 225,000 users on autopilot
  metaDescription: SoundBoost masters music for 225,000 users with a team of four. PostHog reports catch the regressions and open the PRs.
---

[SoundBoost](https://soundboost.ai) is a hub of AI tools for musicians, with mastering, a stem splitter, and a music video generator. Its main focus is AI mastering, which replaces hours of tweaking knobs in a DAW (Digital Audio Workbench) with a prompt. Producers can upload their tracks, describe what they want, and get a fully mastered output.

Despite running with a team of just four, SoundBoost is already used by over 225,000 artists, ranging from household names to bedroom indies polishing their first song.

"I've been founding companies for over 15 years and have always been a do-it-yourself guy for everything, including writing my own SQL to analyze data," says SoundBoost's founder, Berkan Cesur. "Then a friend at Automattic, Batuhan Icoz, suggested PostHog and for the first time I had a tool that anticipates what I want to do and takes me from analysis to an actual PR."

"We're a small team, so every conversion matters to us. If we fix 10% here, 5% there? Those gains add up – and PostHog compiles that into a menu for me: fix these first, fix those later."

SoundBoost uses [Session Replay](/session-replay), [Feature Flags](/feature-flags), [Error Tracking](/error-tracking), and [Surveys](/surveys) – but it's the self-driving Inbox that turns their data into a ranked to-do list.

## Using PostHog reports to maintain a healthy funnel

With such a small team to find and ship improvements, Berkan starts every morning logging in to PostHog to check the self-driving Inbox. Here, PostHog's [reports](/docs/self-driving/reports) rank the priorities for the team.

Sometimes that means shipping small bug fixes or performance improvements. Other times it means spotting existential threats before the team would otherwise think to look. In one such case, PostHog's [scouts](/docs/self-driving/scouts) spotted that daily clicks from Google had fallen to zero. This was shortly after SoundBoost migrated from an .ai to a .com domain, so the team assumed this was normal lag while Google picked up the new domain – but the agent disagreed.

"PostHog's reports told us this was a bigger problem. It told us that conversions stopped, traffic was low, and we were losing our best funnel," Berkan recalls. "That was essential information for us and we immediately rolled back to the .ai domain, regaining all our traction from Google."

The diagnosis was quick because the data was already there: Berkan tracks every button and feature with [actions](/docs/data/actions), so "how did conversions change after I shipped this?" is a question PostHog can answer directly and automatically.

<OSQuote customer="soundboost" author="berkan_cesur" quote={0} />

## From manual tracking to merged PRs

Berkan set up all this tracking by hand at first, but now the [PostHog MCP](/mcp), running inside Cursor and Windsurf, is the main way he instruments events and queries the data.

"It's really easy to miss an action, or track it wrong, when you do it manually with code," he says. "After I discovered the MCP, I can even fix what's wrong in PostHog from my editor. It's the only way I develop new features with PostHog now."

Not every report is actionable, but when one is, PostHog can open [the pull request](/docs/self-driving/anatomy-of-a-pr) to make the fix a one-click thing. Like most users, Berkan was skeptical of this at first and chose to check every line of every self-driving PR personally. Now he trusts PostHog enough that a code review workflow usually covers it.

"At first I was scared, so I reviewed all the pull requests PostHog sent," he says. "But over time I learned to trust the data and Claude always told me it was a good PR that doesn't need any additions, so now I just merge them."

As a serial entrepreneur and developer, Berkan sees self-driving going further than his own team.

"At SoundBoost we see a future where agents can work with you on your songs in real time," says Berkan. "PostHog is doing the same but for software development and, now that I know how this works, I'd definitely build it myself if PostHog didn't already exist."
