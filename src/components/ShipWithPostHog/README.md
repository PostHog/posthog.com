# ShipWithPostHog

Components for the `/ship-with-posthog` page – a recreation of the PostHog Inbox scene, pre-loaded
with six pull requests (one per tool). The inbox is the page's hero. Visitors open an item and get a
replica of the app's report → pull request detail view: the agent's write-up on the left, and its
working on the right – CI checks, the reviewers it suggests, and the evidence it reasoned from.

The page lives at `src/pages/ship-with-posthog/index.tsx`; its slug is exported as `SLUG`
there so renaming is a folder move plus a `vercel.json` redirect.

## Files

| File                  | What it is                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| `InboxReplica.tsx`    | The main event: the Inbox scene – header + subtitle, the real tab bar (Pull requests / Reports / Not actionable / Runs / Archive) with the For-you/Entire-project scope picker, the Sort/Scout/Priority filter bar, the centered list, and a full-width detail takeover for the open item. Owns which item is open, which have been read, and the `#<id>` deep link. All state is in React memory – no localStorage. |
| `ReportRow.tsx`       | One report/PR card. Priority chip, mono commit-scope tag, two-line summary, an origin line (source-product name for signal sources, "Scout · <category>" for scouts), and a right rail with the PR badge, Archive/Review actions, and a timestamp. |
| `ReportDetail.tsx`    | The detail view: back link, header (priority, `type(scope)`, title, and the Open in GitHub / Discuss / Archive / Refund actions), the meta row, the Overview / Files changed tab strip, and the two-column body. Panels render only when the item has data for them. |
| `CollapsibleCard.tsx` | The bordered chevron-collapsible panel the detail view is built from, with an optional right-aligned slot in the header for counts and controls. |
| `EvidenceCard.tsx`    | One evidence finding: source and kind, title, a tinted status tag, the body, an optional "View replay" button, and a footer with the session id and timings. |
| `ReviewerList.tsx`    | Suggested reviewers and the "Add" menu. Matches names against the real team directory at build time (`allSqueakProfile`), so avatars and profile links are genuine; an unmatched name degrades to an initial monogram rather than disappearing. |
| `FilesChanged.tsx`    | The Files-changed tab: per-file stat line plus one excerpted hunk, with add/remove tinting. |
| `PriorityBadge.tsx`   | The tinted-square priority chip (P0–P4), colors mirroring the app's priority badges.            |
| `inboxData.tsx`       | The six items and their detail payloads, the detail-view types, per-source labels/icons/colors, and the `originMeta` / `findingsCount` / `diffStat` helpers. |
| `prose.tsx`           | The subdued inline-`Code` used in detail prose. Its own module so `inboxData.tsx` can import it without a cycle through the components. |

## The six items

One per tool. **Item 1 is the fully authored one** – it carries the whole detail payload (prose
summary, CI checks, suggested reviewers, six evidence findings, and a diff) and is the reference for
what a finished item looks like. Items 2–6 carry a short summary only; every panel below `summary` is
optional, so they render header plus summary and skip the rest. They're marked `TODO(use-cases)` for
the content pass.

Items 2 and 3 link real PRs on the public repo. **Every other PR number, commit SHA, and reviewer
rationale on this page is illustrative** – written to show the shape of the thing, not derived from
anyone's real commits. The `Reviewer` type in `inboxData.tsx` carries a note to the same effect; keep
it accurate if you add more.

Origin is visible on each row exactly as the real Inbox does it: signal-source reports show
the source product's icon; scout-authored reports show the scout's name.

## Notes

Chrome that looks interactive but isn't: the list's filter bar and scope picker, the Archive and
Refund buttons (both carry a tooltip explaining what they would do), the Discuss and Add menus (they
open and list real options, but nothing is wired behind them), and "View replay" on evidence cards.
The Overview / Files changed tabs and the collapsible panels are genuinely interactive.

Everything is responsive by container query, not viewport – the detail body goes two-column at `@3xl`,
and the right column is its own `@container` so the evidence footers can respond to their own width.
