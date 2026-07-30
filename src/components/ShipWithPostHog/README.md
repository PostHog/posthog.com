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
| `EvidenceCard.tsx`    | One evidence finding: source and kind, title, a tinted status tag, what the signal observed, and the repo files the agent read to work it out. |
| `ReviewerList.tsx`    | Suggested reviewers and the "Add" menu. Matches names against the real team directory at build time (`allSqueakProfile`), so avatars and profile links are genuine; an unmatched name degrades to an initial monogram rather than disappearing. |
| `FilesChanged.tsx`    | The Files-changed tab: per-file stat line plus one excerpted hunk, with add/remove tinting. |
| `PriorityBadge.tsx`   | The tinted-square priority chip (P0–P4), colors mirroring the app's priority badges.            |
| `inboxData.tsx`       | The six items and their detail payloads, the detail-view types, per-source labels/icons/colors, and the `originMeta` / `findingsCount` / `diffStat` helpers. |
| `prose.tsx`           | The subdued inline-`Code` used in detail prose. Its own module so `inboxData.tsx` can import it without a cycle through the components. |

## The items are real

All five are real reports that produced **real merged pull requests** on `PostHog/posthog`. Nothing
is invented. Where each field comes from:

| Data | Source |
| ---- | ------ |
| PR number, title, URL, branch, diff totals, approvers | GitHub REST API (public, unauthenticated) |
| Priority, signal count, discovery channel, dates | The report in project 2 |
| Summary prose (Problem / Impact / Solution) | The report's own `summary`, tightened for length |
| Suggested reviewers, commit SHAs, rationale | The report's newest `suggested_reviewers` artefact |
| Evidence code paths | Each `signal_finding`'s `relevant_code_paths`, verbatim |
| Evidence bodies | **Re-worded** from `signal_finding` – see below |

They're grouped by **discovery channel** rather than by product, because that's what the reports
record. `source_products` says how PostHog found the problem (a support conversation, an exception, a
session recording), not which product the bug lived in — a cohorts bug was found by Replay Vision, an
integrations bug by a support conversation. The affected product only exists in the commit scope.

### Two deliberate departures, both for privacy

1. **Evidence bodies are re-worded.** The stored `signal_finding` prose is 400–800 words carrying
   customer session ids, `exported_asset_id`s, customer team numbers, and in one case an end user's
   first name. That can't be reliably scrubbed with a pattern, so each body is rewritten to preserve
   the finding while dropping every identifier. The code paths beside them are verbatim, because repo
   paths are public.
2. **Nothing carries internal estimates or identities.** Reports hold a `dollar_value` impact figure
   on `priority_judgment`, plus reviewer emails, user ids and uuids. None of it is published here.

Reviewers whose only stated reason is activity boilerplate ("recently active in `frontend/src`, N
commits in the last 90 days") are omitted rather than dressed up, which is why two of the five items
carry no reviewers. Where a suggested reviewer went on to actually approve the PR, the row says so —
that's checked against the GitHub reviews API.

### Refreshing or adding an item

The GitHub half is re-fetchable from the public API: `/repos/PostHog/posthog/pulls/{n}`,
`/pulls/{n}/reviews`, `/pulls/{n}/files`. Merged self-driving PRs are discoverable with the same
search `gatsby/sourceNodes.ts` uses — `repo:PostHog/posthog is:pr is:merged "from an inbox report"` —
and each body's footer carries its report id as `posthog-code://inbox/<uuid>`. The report half needs
project 2 access via `inbox-reports-retrieve` and `inbox-report-artefacts-list`. Re-read the privacy
notes above before publishing anything new.

## Notes

Chrome that looks interactive but isn't: the list's filter bar and scope picker, the Archive and
Refund buttons (both carry a tooltip explaining what they would do), and the Discuss and Add menus
(they open and list real options, but nothing is wired behind them). The Overview / Files changed
tabs and the collapsible panels are genuinely interactive, and the PR, commit, and reviewer-profile
links all go to real places.

Everything is responsive by container query, not viewport – the detail body goes two-column at `@3xl`,
and the right column is its own `@container` so the evidence footers can respond to their own width.
