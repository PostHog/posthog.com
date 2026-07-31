# ShipWithPostHog

Components for the `/ship-with-posthog` page – an interactive recreation of the PostHog Inbox
scene, pre-loaded with six pull requests (one per tool). The inbox is the page's hero. Visitors
open each item, read how that PR came to exist via the shared
[`SelfDrivingStory`](../SelfDrivingStory) walkthrough (a full-width detail takeover, like the
real app), and hit merge. Clearing all six lands on an Inbox Zero state with the setup CTA.

The page lives at `src/pages/ship-with-posthog/index.tsx`; its slug is exported as `SLUG`
there so renaming is a folder move plus a `vercel.json` redirect.

## Files

| File                 | What it is                                                                                     |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| `InboxReplica.tsx`   | The main event: the Inbox scene – header + subtitle, the real tab bar (Pull requests / Reports / Not actionable / Runs / Archive) with the For-you/Entire-project scope picker, the Sort/Source/Priority filter bar, the centered list, a full-width detail takeover for the open item (currently an empty placeholder + Merge button – detailed PR content comes later), and the Inbox Zero state. The "Pull requests" tab count is the live countdown. All state is in React memory – no localStorage. |
| `InboxFilterBar.tsx` | The working filter bar: Sort (single-select), Source (multi-select, with a nested Scout sub-filter), and Priority (multi-select P0–P4), built on `RadixUI/Popover`. Options mirror the real Inbox's `filterOptions`. |
| `SignalsToInbox.tsx` | The "How different signals get to your Inbox" section below the inbox: a selector across the six signals, each showing its Scout → Signal → Investigate → PR → Merge walkthrough via `SelfDrivingStory` (read-only – merging happens in the inbox). |
| `ReportRow.tsx`      | One report/PR card. Priority chip, mono commit-scope tag, two-line summary, an origin line (source-product name for signal sources, "Scout · <category>" for scouts), and a right rail with the PR badge, Archive/Review actions, and a timestamp. |
| `PriorityBadge.tsx`  | The tinted-square priority chip (P0–P4), colors mirroring the app's priority badges.            |
| `inboxData.tsx`      | The six items and their five-step stories, per-source labels/icons/colors, and the `originMeta` helper. |

## The six items

One per tool. Items 1–3 are real reports that produced real PRs on the public repo (the PR
link is genuine). Items 4–6 are illustrative – Logs, Traces, and AI observability are too new
to have shipped their own self-driving PRs, so they carry no PR link and their step copy is
placeholder, marked `TODO(use-cases)` for the content pass. The Traces item reuses the exact
N+1 checkout copy from `/traces`.

Origin is visible on each row exactly as the real Inbox does it: signal-source reports show
the source product's icon; scout-authored reports show the scout's name.
