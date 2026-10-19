---
title: How SoundBoost runs AI mastering for 200,000 users on autopilot
customer: SoundBoost
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/array/default.png
date: 2026-10-20
seo:
  metaTitle: How SoundBoost runs AI mastering for 200,000 users on autopilot
  metaDescription: SoundBoost masters music for 200,000 users with a team of four. PostHog signals find the bugs, catch the regressions, and open the PRs.
---

[SoundBoost](https://soundboost.ai) is an AI mastering tool for music producers. Mastering is the final polish on a finished track, and it usually means long sessions tweaking knobs in a DAW. On SoundBoost you upload the track and type what you want instead: "I want to sound like Billie Eilish," or "good stereo on headphones, but analog warmth on the bass." As far as Berkan Cesur, its founder, knows, it's the first prompt-based mastering workflow anywhere. 200,000 people use it – around 10% famous artists, a quarter bedroom producers and indies, and the rest amateurs polishing their first song.

All of that runs on a team of four, two of them developers. Berkan has been starting companies for 20 years, including a gaming venture that made millions before going bankrupt. SoundBoost is the company where he finally did music, and the one where he stopped doing analytics by hand.

"I'm a do-it-yourself guy for everything. I was always using Metabase and writing SQL to analyze my statistics, until a friend at Automattic suggested PostHog," Berkan says. "For the first time, a tool thinks what I want to think later, and just implements it."

"We're a small team and every conversion matters to us. You fix 10% here, 10% there. PostHog compiles that into a menu for me: fix these first, fix those later."

He now uses [session replay](/session-replay), [feature flags](/feature-flags), [error tracking](/error-tracking), and [surveys](/surveys). He also paid full price for two years before spotting PostHog's [startup program](/startups), so learn from his mistake and check if you qualify before your first invoice.

## The bugs a four-person team can't find

Berkan starts every morning in PostHog's inbox, working through the priority signals from [self-driving](/self-driving). It's the layer that watches the things his team is too small to watch.

SoundBoost deploys its front end to Cloudflare Pages, which means there are no server logs when something breaks in a user's browser.

"There are no good logs to see what's going on when a user interacts with something and it breaks on the JavaScript side," he says. "Sometimes it's related to their Chrome plugins. Many different cases."

Then the signals started pointing at his iOS users. Around 300 of them, half paying customers, were hitting audio problems in Safari. Berkan shipped a fix, and he credits roughly 10 similar catches to PostHog since.

<OSQuote customer="soundboost" author="berkan_cesur" quote={0} />

Not every signal earns a fix, and triage doesn't repeat itself. When Berkan marks a signal as won't-fix with a reason, PostHog remembers, and the same issue doesn't resurface the next time it happens.

## The domain migration that zeroed their Google traffic

A few weeks before we spoke, SoundBoost migrated from its .ai domain to a .com. Daily clicks from Google fell from between 10,000 and 15,000 to zero. Berkan assumed that was normal lag while Google picked up the new domain. PostHog disagreed.

"PostHog told us everything was going badly. Conversions are wrong, traffic is low, you're losing your best funnel channels, it said," Berkan recalls. "That triggered something for me. I rolled back to the .ai domain, and we got all our traction from Google back."

The diagnosis was quick because the data was already there: Berkan tracks every button and feature with [actions](/docs/data/actions), so "how did conversions change after I shipped this?" is a question PostHog can answer directly.

## From manual tracking to merged PRs

Berkan set up PostHog by hand at first. Now the [PostHog MCP](/docs/model-context-protocol), running inside Cursor and Windsurf, is the only way he adds tracking.

"It's really easy to miss an action, or track it wrong, when you do it manually with code," he says. "After I discovered the MCP, I can even fix what's wrong in PostHog from my editor. It's the only way I develop new features with PostHog now."

When a signal is actionable, PostHog opens [the pull request](/docs/self-driving/anatomy-of-a-pr) itself. At first Berkan read every line. These days a review from Fable, the coding model he runs in his editor, is usually the only check before merge.

"At first I was scared, so I reviewed all the pull requests PostHog sent," he says. "But over time Fable always told me it's a good one that doesn't need any additions, so now I just merge them."

He didn't have anything like this loop before, and he's clear about what he'd do without it: "There was no auto-PR thing. Nothing. If PostHog didn't exist, now that I know how this works, I would try to build the same thing myself."

<OSQuote customer="soundboost" author="berkan_cesur" quote={1} />

## A DAW you can talk to

Prompt-based mastering was SoundBoost's first act. The next one is real time: mastering that responds while you work, in something closer to a DAW you prompt instead of program.

"You'll just tell it what's on your mind, and it will do it to your song in real time," Berkan says. "This is our next chapter."
