---
date: "2026-07-10"
title: "Our session replays are opening their own pull requests"
featuredImage: https://res.cloudinary.com/dmukukwp6/image/upload/Frame_144166_ae3d5191ba.png
author:
  - sara-miteva
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: Engineering
tags:
  - AI
  - Session replay
  - Engineering
---

A few weeks ago, we wrote about the [product improvement pipeline](/blog/agents-closed-4063-errors): signals come in, get grouped into problems, an agent researches each one, and if it's actionable, it opens a PR. Most of the examples were errors because errors are the easy case. They arrive with a stack trace that says exactly what broke and where.

This is about a trickier source: [session replays](/session-replay). Someone clicks a button that doesn't respond, clicks it three more times, and leaves. Typically, nothing lands in your logs for this type of error. The only evidence is a recording sitting in a pile nobody has time to watch. That's the most common kind of bug, and it's almost invisible to everything except a human watching the replay.

So we pointed a scanner at the replays. In the last week, PostHog turned three of them into pull requests, and all we (humans) had to do was merge.

## The scanner

In [Replay Vision](/docs/replay-vision), you configure scanners (named AI probes that describe what to look for), and PostHog applies them to your recordings, producing observations you can query, chart, and alert on.

The signal source for this particular issue is a success/struggle classifier (btw, there are [four scanner types](/docs/replay-vision/scanner-types) in total). It reads real user sessions across projects, works out whether the person actually did the thing they came to do, and tags each session `success` or `struggled`. When it tags a struggle, it drops a signal into the same pipeline our errors flow through.

This isn't a quiet scanner. It's read ~3,400 sessions and emitted ~1,850 signals in the first two weeks. Whether half is the right number is an open question, and we'll come back to it.

Once a signal is in, it stops being a session replay problem and becomes a normal pipeline problem: cluster the related signals into a report, promote the report once it's heavy enough, hand it to a research agent, decide if it's actionable, and if so, write the fix.

## Following one struggle to a PR

On July 1, at 11:30 and 11:47 UTC, two people on two different EU projects rageclicked the "Add filter" popover while trying to set up a feature flag. One of them gave up on configuring the flag entirely.

The classifier tagged both sessions `struggled` and emitted two signals. The pipeline clustered them into a single report and, a little after noon, handed it to a research agent. Between 12:39 and 12:45 the agent found the actual defect: a controlled `LemonDropdown` in `TaxonomicPropertyFilter.tsx` whose `onClickOutside={closeDropdown}` handler was racing a stale-closure toggle on the button. The open click was immediately being read as a click-outside, so the popover closed the instant it opened. Dead clicks, then rage, then abandonment.

It scored the problem `immediately_actionable`, P2, and at 12:46 kicked off an implementation task. At 12:53 there was a commit on `posthog-code/fix-add-filter-popover-race`, and a draft PR: [#67394](https://github.com/PostHog/posthog/pull/67394). About an hour and twenty minutes from the first rageclick to a PR with a diagnosis attached.

## Two more, same corner of the app

Both of the other PRs landed on the same surface – the taxonomic filter and property picker – which tells you something on its own about how fiddly that little popover is.

[#67486](https://github.com/PostHog/posthog/pull/67486) – the operator dropdown ignored your first click. The "= equals" selector wouldn't respond until the second or third click, because the nested `OperatorSelect` (`OperatorValueSelect.tsx`) swallowed the first pointer event on render. This one had been quietly recurring since June 23. The interesting bit: the same struggle showed up in both the flag editor and the insights editor, so the agent scoped the fix to the shared component instead of patching one screen and leaving the other broken. About 30 minutes from research to draft PR.

[#66686](https://github.com/PostHog/posthog/pull/66686) – "No results" when the result was one tab over. Someone building a cohort searched for a person property while the picker was sitting on the Event-properties tab, got "No results," and gave up – even though the match was right there under Person properties. The escape hatch that surfaces cross-tab matches was gated behind `SuggestedFilters`, which cohort creation never injects. What makes this one worth reading: the agent didn't take the single recording at face value. It went and queried our own `taxonomic filter empty result` event and found thousands of the same dead-ends (673 people searching "email" on the Event tab while the match lived under Person). That evidence bumped it to P2, and it was caught at 11:39 and merged the same afternoon – under three hours, start to finish.

## What we learned

1. **The bugs are not always caught as errors.** Every one of these was a dead click, a rageclick, or an empty state. Not a single one fired an exception or showed up in error tracking. The only way to catch them is to read the sessions, and the only way to read enough sessions is not to use a human.
2. **Clustering is what makes a replay trustworthy.** You can't ship a fix off one annoyed person. The value shows up when the same struggle recurs – across projects (the popover), across two editors (the operator dropdown), or against our own product data (the cross-tab empty state). That's also what lets the agent scope a fix correctly instead of over-fitting to a single recording.
3. **The classifier's precision is still an open question.** It fires in about half the sessions it reads. Either half our sessions really do contain a struggle worth acting on, or the bar is too low and we're generating noise the rest of the pipeline has to filter. Before we widen this past the filter picker, we want to read a sample of its struggled calls and count how many a human actually agrees with. Signals emitted is a vanity number; the one we care about is how many of these PRs merge. We need more usage to pinpoint this data.

## You still decide what ships

To be clear about what "on its own" means: the pipeline opens drafts, not merges. A human reviews before anything ships – one of these three has, the other two are waiting. But everything up to that point – noticing the struggle, grouping it across sessions, finding the exact line of code, writing the fix – happened without anyone asking.

That's the part worth sitting with. Session replays are the hardest signal we have. They don't throw errors, they don't page anyone, and they stack up faster than any team could ever watch them. It's the last source you'd expect to fix itself. And it's the one now opening PRs.

The replays are already recording. This just reads them – and does something about what it finds.

Replay Vision is currently in closed beta. Point a scanner at a flow you care about, and let it read the sessions you'd never have time to watch. Join the Replay Vision waitlist and be among the first to know when it's out.
