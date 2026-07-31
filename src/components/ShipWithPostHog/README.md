# ShipWithPostHog

Components for the `/ship-with-posthog` page – a recreation of the PostHog Inbox scene, pre-loaded
with five merged pull requests and four open reports. The inbox is the page's hero. Visitors open an
item and get a replica of the app's report detail view: the agent's write-up on the left, and its
working on the right – CI checks, the reviewers it suggests, and the evidence it reasoned from.

The two tabs are the two halves of the real Inbox, and the same report at two stages of its life:

- **Pull requests** – reports an agent already took all the way to a merged PR. Badged with `#<number>`,
  and their detail view has diff stats, a Files-changed tab, and an "Open in GitHub" action.
- **Reports** – researched and written up, but no pull request yet. Badged with the judgment that
  decides what happens next (green **Actionable**, orange **Needs input**), and their detail view swaps
  "Open in GitHub" for **Create PR**. They carry no `stats` and no `files`, because there's no diff yet.

The page lives at `src/pages/ship-with-posthog/index.tsx`; its slug is exported as `SLUG`
there so renaming is a folder move plus a `vercel.json` redirect.

## Files

| File                  | What it is                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| `InboxReplica.tsx`    | The main event: the Inbox scene – header + subtitle, the tab bar (Pull requests / Reports) with the For-you/Entire-project scope picker, the filter bar, the centered list with its empty state, and a full-width detail takeover for the open item. Owns the filter state, which item is open, which have been read, and the `#<id>` deep link. All state is in React memory – no localStorage. |
| `ReportRow.tsx`       | One report/PR card. Priority chip, mono commit-scope tag, two-line summary, an origin line (source-product name for signal sources, "Scout · <category>" for scouts), and a right rail with the badge (PR number, or the Actionable/Needs-input status for an item with no PR), Archive/Review actions, and a timestamp. |
| `ReportDetail.tsx`    | The detail view: back link, header (priority, `type(scope)`, title, and the Open in GitHub -or- Create PR / Discuss / Archive / Refund actions, all sharing one pill style), the meta row, the Overview / Files changed tab strip, and the two-column body. Panels render only when the item has data for them. |
| `CollapsibleCard.tsx` | The bordered chevron-collapsible panel the detail view is built from, with an optional right-aligned slot in the header for counts and controls. |
| `EvidenceCard.tsx`    | One evidence finding: the source and a tinted status tag on one line, then the title, what the signal observed, and the repo files the agent read to work it out. |
| `ReviewerList.tsx`    | Suggested reviewers and the "Add" menu. Matches names against the real team directory at build time (`allSqueakProfile`), so avatars and profile links are genuine; an unmatched name degrades to an initial monogram rather than disappearing. |
| `FilesChanged.tsx`    | The Files-changed tab: per-file stat line plus one excerpted hunk, with add/remove tinting. |
| `InboxFilters.tsx`    | The Sort / Source / Priority filter bar and the sort + filter logic (`applyFilters`). All three menus really filter the list. Sort is single-select; Source and Priority are multi-select and stay open while you pick. |
| `SignalsToInbox.tsx`  | The "How signals get to your Inbox" section below the inbox: a selector across the merged PRs, each showing its Scout → Signal → Investigate → PR → Merge walkthrough via `SelfDrivingStory`. Read-only – reviewing happens up in the inbox. |
| `PriorityBadge.tsx`   | The tinted-square priority chip (P0–P4), plus `PRIORITY_META` – the hue and name per level, shared with the priority filter menu so the two can't drift. |
| `inboxData.tsx`       | `INBOX_ITEMS` (the five merged PRs) and `REPORT_ITEMS` (the four open reports) with their detail payloads and walkthrough steps, the detail-view types, per-source labels/icons/colors, and the `originMeta` / `findingsCount` / `diffStat` helpers. |
| `prose.tsx`           | The subdued inline-`Code` used in detail prose, and `Hint` – the width-capped tooltip the hover annotations use. Its own module so `inboxData.tsx` can import it without a cycle through the components. |

## The items are real

All nine are real reports in project 2. The five on the Pull requests tab produced **real merged pull
requests** on `PostHog/posthog`; the four on the Reports tab are real reports that haven't been turned
into a PR. Nothing is invented. Where each field comes from:

| Data | Source |
| ---- | ------ |
| PR number, title, URL, branch, diff totals, approvers | GitHub REST API (public, unauthenticated) |
| Priority, signal count, discovery channel, dates, status | The report in project 2 |
| Summary prose (Problem / Impact / Solution) | The report's own `summary`, tightened for length |
| Suggested reviewers, commit SHAs, rationale | The report's newest `suggested_reviewers` artefact |
| Evidence code paths | Each `signal_finding`'s `relevant_code_paths`, verbatim |
| Evidence bodies | **Re-worded** from `signal_finding` – see below |
| Walkthrough steps (`intro`, `steps`) | Written from that item's own report and PR – the counts, latencies, branch names, and reviewer rationale are the real ones. The screenshots on the session-replay walkthrough are the exception: design mocks, see Notes |

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

Genuinely interactive: the Sort / Source / Priority filter bar, the Overview / Files changed tabs,
the collapsible panels, and the signal selector in `SignalsToInbox`. The PR, commit, and
reviewer-profile links all go to real places.

The Source menu has a nested **Scout** group, rendered only when the active tab actually holds
scout-authored items (`scoutsInUse`) — so it shows on Reports and stays hidden on Pull requests.
Sources and scouts are two halves of one facet, so they union rather than intersect: picking a source
and a scout shows both. `sourcesInUse` deliberately drops `signals_scout` from the flat list, because
the group below already covers it by name and the menu otherwise rendered "Scout" twice.

### Scouts are a source product, not a modifier

In the API a scout-authored report comes back as `source_products: ['signals_scout']` — the scout is
its own discovery channel, not a scout attached to some other product. The scout's domain lives on its
skill name instead (`signals-scout-instrumentation-gaps` reads as "Instrumentation gaps"). `Origin`'s
scout variant therefore carries no second product, and `sourceKeyOf()` maps any scout item to
`signals_scout` so filtering and the Source menu can't disagree with the row's own origin line.

Only one item here is scout-authored, and that's a sampling artifact rather than a statement about
scouts: the merged five were found by searching GitHub for merged self-driving PRs, and scout output
skews toward docs and small classification fixes that often land on `posthog.com` or `PostHog/code`
instead. Project 2 has 28 scout reports with a pull request if more are wanted.

Walkthrough steps are optional on `InboxItem`, and `SignalsToInbox` renders only items that have
them. Adding a report to the inbox therefore can't leave a selector button that opens nothing. Every
walkthrough runs four beats — Signal → Investigate → PR → Merge — by naming its own `stage` and
skipping Scout, since all of these were found by a signal source rather than a scout.

`Replay Vision · settings` is the built-out one: four real screenshots on Cloudinary. The rest still
render `imagePlaceholder` dashed boxes, and `image` takes precedence once real captures land.

**The walkthrough screenshots are design mocks, not captures of these reports.** The four Cloudinary
assets depict an invented example bug ("Lift the consent overlay off the buy button") with invented
counts, and their filenames say `Mock`. That's the one place on the page where something shown isn't
real, and it's deliberate: the copy beside them describes how any replay-sourced report moves through
the loop, not this specific 404, which is why the same captures suit whichever item they sit under.
Worth knowing before anyone cites them as evidence of a real PR, and worth replacing with genuine
captures of PR #67019 if the "nothing is invented" promise should hold across the whole page.

Chrome that looks interactive but isn't: the search box, and the Discuss / Archive / Refund / Create-PR
buttons. Each of those carries a `Hint` tooltip explaining what it would do, as do the two tabs and the
For-you/Entire-project scope picker. The reviewer "Add" menu opens and lists real options, but nothing
is wired behind it.

Picking a selected option again clears it, switching tabs resets all three menus (the two tabs have
different sources), and the reset button beside the bar clears everything at once. Source lists only
the sources present in the active tab's data, so no option there dead-ends; priority lists all of
P0–P4 because that scale is part of the product, which means several levels match nothing. That plus
any source/priority combination is what the list's empty state is for.

Everything is responsive by container query, not viewport – the detail body goes two-column at `@3xl`,
and the right column is its own `@container` so the evidence footers can respond to their own width.
