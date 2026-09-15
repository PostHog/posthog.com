# ShipWithPostHog

Components for the `/ship-with-posthog` page – a recreation of the PostHog Self-driving inbox scene,
pre-loaded with real reports from project 2. The inbox is the page's hero. Visitors open an item and
get a replica of the app's report detail view: the machine's working on the left – the evidence it
reasoned from, its CI run, and the reviewers it suggests – with the write-up itself given the wide
column on the right.

All three of the app's tabs are real here. **Reports** is the page's hero; **Scouts** shows four of
the scheduled agents that file into it; **Settings** shows the project's own configuration.

The Reports tab is **one list**, matching the redesigned app. A pull request is a property of an item,
not a category of its own:

- An item that produced one is badged `#<number>`, names the repo it lives in, and its detail view has
  diff stats, a Files-changed tab, and an "Open in GitHub" action.
- An item that hasn't is badged with nothing and names no repo. It carries no `stats` and no `files`,
  because there's no diff yet.

The split is a filter rather than a tab: `statusOf()` reads a pull request as **Review and merge** and
its absence as **Needs decision**, which are the app's two open statuses and the two the status menu
pre-selects. The old green **Actionable** / orange **Needs input** row badge is gone – the redesign has
no such badge, and both of those judgments describe a report with no pull request. The report's own
judgment is still on `detail.status` for the detail view.

The page lives at `src/pages/ship-with-posthog/index.tsx`; its slug is exported as `SLUG`
there so renaming is a folder move plus a `vercel.json` redirect.

## Files

| File                  | What it is                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| `InboxReplica.tsx`    | The main event: the Self-driving inbox scene – header + subtitle, the Reports / Scouts / Settings tab bar, the filter bar with the Triage-mode and scope affordances, the search box, the centered list with its empty state, and a full-width detail takeover for the open item. Owns the filter state, which item is open, which have been read, and the `#<id>` deep link. All state is in React memory – no localStorage. |
| `ReportRow.tsx`       | One row. Priority chip, then the mono commit-scope tag and title on one line, a one-line summary, and a meta line: the repo the pull request lives in (omitted when there isn't one), then the origin (source-product name for signal sources, "Scout · <category>" for scouts). The right rail holds the PR badge above and the timestamp below. No Archive/Review buttons – the redesign dropped both. |
| `ReportDetail.tsx`    | The detail view, in the redesign's **inverted** layout: a header of back link plus actions (Open in GitHub / Ask AI / Resolve / Dismiss / Refund, all sharing one pill style), then the evidence rail on the left and the write-up given the wide column on the right. The write-up column holds the Summary / Files-changed tab strip with the diff stat inside its label, the title, the meta row, the prose, the pull-request callout, and the feedback row. Panels render only when the item has data for them. |
| `CollapsibleCard.tsx` | The bordered chevron-collapsible panel the detail view is built from, with an optional right-aligned slot in the header for counts and controls. |
| `EvidenceRail.tsx`    | The left rail's evidence panel, headed by a search box. The search is real: it matches each finding's title, source label, and code paths. `body` is excluded because it's a `ReactNode`, and there's no reliable way to read text back out of one. |
| `EvidenceCard.tsx`    | One evidence finding: the source and a tinted status tag on one line, then the title, what the signal observed, and the repo files the agent read to work it out. |
| `ReviewerList.tsx`    | Suggested reviewers and the "Add" menu. Matches names against the real team directory at build time (`allSqueakProfile`), so avatars and profile links are genuine; an unmatched name degrades to an initial monogram rather than disappearing. |
| `FilesChanged.tsx`    | The Files-changed tab: a filterable file tree on the left, and the diff on the right with a Unified / Split toggle. Gutter line numbers are computed from each hunk's real `@@` header, and runs of four or more unchanged lines fold into an expandable band. Clicking a file in the tree scrolls its diff into view. |
| `InboxFilters.tsx`    | The Priority / Status / Sort filter bar and the sort + filter logic (`applyFilters`). All three menus really filter the list. Priority and Sort are single-select and close on pick; Status is multi-select checkboxes and stays open. |
| `scoutData.tsx`       | The four scouts on the Scouts tab, taken from project 2 and **scrubbed** – see "Three deliberate departures" below. Their names, owners, cadences, run counts, totals, and per-run outcomes and durations are genuine; what they found is rewritten. |
| `ScoutList.tsx`       | The Scouts tab's list: the search box (real – it matches name, owner, and description), the four chrome dropdowns, the project totals strip, and one card per scout with its status dot, last-run line, run strip, and on/off switch. |
| `ScoutDetail.tsx`     | A scout's own page: title with Canonical/Custom and On-patrol badges plus its owner, the Run now / Settings / View skill actions, the seven-cell stat strip, the reports it filed or added to, the runs list with its real All / Emitted / Quiet / Failed filter, and the memory rail – what you've told it, and what it has learned. |
| `InboxSettings.tsx`   | The Settings tab: signal sources (PostHog data and external), the Autonomy card with its PR-generation switch and the two threshold pickers, Code access, Notifications, and the billing-period usage bar. Every switch and both threshold pickers are real local state; Connect / Disconnect / Manage on GitHub, the per-source chevrons, and the two collapsible autonomy rows are `Hint`-annotated chrome. |
| `SignalsToInbox.tsx`  | The "How signals get to your Inbox" section below the inbox: a selector across the merged PRs, each showing its Signal → Report → PR walkthrough via `SelfDrivingStory`. Read-only – reviewing happens up in the inbox. |
| `PriorityBadge.tsx`   | The tinted-square priority chip (P0–P4), plus `PRIORITY_META` – the hue and name per level, shared with the priority filter menu so the two can't drift. |
| `inboxData.tsx`       | `INBOX_ITEMS` (the ones with merged PRs) and `REPORT_ITEMS` (the ones without) with their detail payloads and walkthrough steps, plus `ALL_ITEMS` – the single list everything downstream reads. Also the detail-view types, per-source labels/icons/colors, the status vocabulary (`STATUSES` / `statusOf`), and the `originMeta` / `repoOf` / `findingsCount` / `diffStat` helpers. The two arrays stay separate only because they're sourced and privacy-reviewed differently; nothing renders from one rather than the other. |
| `prose.tsx`           | The subdued inline-`Code` used in detail prose, and `Hint` – the width-capped tooltip the hover annotations use. Its own module so `inboxData.tsx` can import it without a cycle through the components. |

## The items are real

All of them are real reports in project 2. Five produced **real merged pull requests** on
`PostHog/posthog`; the rest haven't been turned into a PR. Nothing is invented, with the two
exceptions below and the `product-analytics` placeholder noted at the foot of this file. Where each
field comes from:

| Data | Source |
| ---- | ------ |
| PR number, title, URL, branch, diff totals, approvers | GitHub REST API (public, unauthenticated) |
| Priority, signal count, discovery channel, dates, status | The report in project 2 |
| Summary prose (Problem / Impact / Solution) | The report's own `summary`, tightened for length |
| Suggested reviewers, commit SHAs, rationale | The report's newest `suggested_reviewers` artefact |
| Evidence code paths | Each `signal_finding`'s `relevant_code_paths`, verbatim |
| Evidence bodies | **Re-worded** from `signal_finding` – see below |
| Walkthrough steps (`intro`, `steps`) | Written from that item's own report and PR – the counts, latencies, branch names, and reviewer rationale are the real ones. The screenshots vary: `Error tracking` has real captures, the rest are design mocks – see Notes |

They're grouped by **discovery channel** rather than by product, because that's what the reports
record. `source_products` says how PostHog found the problem (a support conversation, an exception, a
session recording), not which product the bug lived in — a cohorts bug was found by Replay Vision, an
integrations bug by a support conversation. The affected product only exists in the commit scope.

### Three deliberate departures, all for privacy

1. **Evidence bodies are re-worded.** The stored `signal_finding` prose is 400–800 words carrying
   customer session ids, `exported_asset_id`s, customer team numbers, and in one case an end user's
   first name. That can't be reliably scrubbed with a pattern, so each body is rewritten to preserve
   the finding while dropping every identifier. The code paths beside them are verbatim, because repo
   paths are public.
2. **Nothing carries internal estimates or identities.** Reports hold a `dollar_value` impact figure
   on `priority_judgment`, plus reviewer emails, user ids and uuids. None of it is published here.
3. **Every scout run summary is rewritten.** This is the largest of the three, and it's why the Scouts
   tab is the one place where the "nothing is invented" promise holds only for a scout's *shape* and
   not its *findings*. What survives verbatim: names, owners, Canonical/Custom kind, cadences, next-run
   labels, per-run timestamps, durations and outcomes, and the filed/edited/learned/told totals. What
   was rewritten or dropped, per `scoutData.tsx`:
   - **Money.** `Ad spend` watches PostHog's paid-ads warehouse. Its real summaries carry campaign-level
     spend, cost-per-acquisition figures, and warehouse campaign IDs — PostHog's marketing spend, which
     is commercially sensitive. Every figure is gone. This scout reads noticeably thinner as a result,
     and that is the honest cost of including it.
   - **Our own reliability numbers.** `Apm` reports per-service error rates on PostHog's tracing data —
     the same class of figure this file already withholds from the APM *report*.
   - **Identifiers.** Report UUIDs, `us.posthog.com` report links, and the GitHub logins named in
     steering notes. Scout owners are kept, consistent with publishing real reviewer names above.

   The four were chosen partly for what they *don't* touch: none names a customer. The scouts that do —
   the account and outreach ones — are not on this page at all. `Website 404s` is the least altered,
   because it watches posthog.com, which is this repository.

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

Genuinely interactive: the Priority / Status / Sort filter bar, the Summary / Files changed tabs and
the diff's file tree and Unified / Split toggle, the evidence rail's search, the collapsible panels,
the signal selector in `SignalsToInbox`, on the Scouts tab both the scout search and each scout's
All / Emitted / Quiet / Failed run filter, and on the Settings tab every switch and both threshold
pickers. The PR, commit, and
reviewer-profile links all go to real places.

**The Source menu is gone.** The redesign dropped it from the bar, and the nested Scout group with it
— scouts are their own tab in the app now rather than a facet of this list. `sourceKeyOf()` survives
because the row's origin line and the detail header still resolve a source product through it.

Priority lists all of P0–P4 because that scale is part of the product, which means several levels
match nothing. Status lists all five, and the three closed ones (Resolved, Dismissed, Not actionable)
match nothing on purpose: a report nobody has acted on is the whole point of showing it here. That,
plus unticking every status, is what the list's empty state is for.

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
them. Adding a report to the inbox therefore can't leave a selector button that opens nothing.

Every walkthrough here runs **three** beats — **Signal → Report → PR** — by naming its own `stage`.
It skips Scout, since all of these were found by a signal source rather than a scout, and it skips
Merge: what the merge tab used to say now closes the PR tab's own copy, so the story ends on the pull
request rather than on a fifth screen.

Two things to know if you change this:

- The "Report" tab is the shared component's `investigate` stage with a per-step `label` override. The
  stage key is deliberately left alone. `SelfDrivingStory` is shared, and `/traces` renders all five
  of its stages positionally — renaming or removing one there would change that page too.
- `SignalsToInbox` passes no `onMerge`, so the shared component's "Merge pull request" button never
  rendered on this page even when the merge tab existed. Dropping the tab lost copy and one
  screenshot, not an interaction.

### Which walkthroughs have real screenshots

**`Error tracking` is the only one with genuine captures.** Its three are real screenshots of the
redesigned app and of a real merged pull request — the inbox list, a report detail with its evidence
rail, and `PostHog/posthog-js#4151` on GitHub, merged. Their filenames are `Clean_Shot_*` rather than
`*_Mock_*`, which is the quickest way to tell the two apart.

The other walkthroughs still carry **design mocks**. Those assets depict an invented example bug
("Lift the consent overlay off the buy button") with invented counts, and their filenames say `Mock`.
That's deliberate — the copy beside them describes how any report of that kind moves through the loop
rather than one specific fix, which is why the same captures suit whichever item they sit under — but
it is the one place on the page where something shown isn't real. Worth knowing before anyone cites
them as evidence of a particular PR.

`Error tracking`'s row and its captures are **the same piece of work**: the item is the rrweb
`Illegal invocation` report, and its pull request is `PostHog/posthog-js#4151`. It is also the only
item whose repo isn't `PostHog/posthog`, which is a useful exercise of `repoOf()` – the row names
`PostHog/posthog-js` purely because that's what its own `prUrl` says.

`Replay Vision`'s row and its captures match too: the item is the `fix(aio)` summarisation report its
scanners filed, and its pull request is `PostHog/posthog#86244`. It's the clearest example on the page
of why these are grouped by **discovery channel** rather than by product – the bug is in AI
observability's summarisation path, and nothing in AI observability noticed it. Replay Vision did, by
watching people hit it in recordings.

### Rule: screenshots and the row must describe the same work

When a walkthrough's captures are swapped, **re-point that item's pull request to match** – title,
`scope`, `summary`, `prUrl`, `prNumber`, `timeAgo`, and the `detail` payload. A row badged one PR
above a screenshot of another is two real things presented as one, which is exactly what the page
promises not to do, and real captures make it worse because they look authoritative.

Take the GitHub half verbatim from the public API (`/pulls/<n>`, `/reviews`, `/files`). **Never write
a diff hunk from memory** – fetch the real patch. Read the report half from the capture, re-wording
per the privacy rules above. Where a field isn't visible in the capture, mark it `NOT VERIFIED` in a
comment rather than guessing quietly; both items currently carry one such marker, on `priority`, which
the app only renders on the Files-changed tab.

Chrome that looks interactive but isn't: the search box, the Triage-mode chip, the
For-you/Entire-project scope picker, the Scouts and Settings tabs, and the detail view's action
buttons. Each carries a `Hint` tooltip explaining what it would do. The reviewer "Add" menu opens and
lists real options, but nothing is wired behind it.

### Settings is the one tab that needed no scrubbing

Its contents are real project-2 configuration and carry no customer data: the sources and their
on/off states, the thresholds, the GitHub connection, and the billing-period pull-request count. Two
identifying details are kept on purpose — "Connected to PostHog" and who created the connection —
for the same reason the Reports tab publishes real reviewer names. The usage figure is real too, and
happens to be the most on-message number on the page.

### The scout run strips are partial

A scout's run strip on the list, and the run list on its own page, show the runs actually captured from
the app — four or five each, with their real timestamps, durations and outcomes — not all 25. The
filter pills beside them carry the scout's **genuine** last-25 counts, which is why a pill can read
`Emitted 22` above five listed runs, and why picking `Failed` on a scout with none says so explicitly
rather than showing an empty box. Padding the strip out to 25 would have meant inventing the ordering
of runs nobody read.

### Two panels the app has and this doesn't

The redesigned detail view carries two panels in its left rail that aren't here:

- **Runs** – the Implementation / Research entries, each with a status dot and a link out to the run.
- **Activity** – the "N entries" log at the foot of the rail.

Neither is omitted for design reasons. `ReportDetail` has no field for either, and the app's own
values are run counts, per-run statuses, and timestamps that exist only in project 2. Filling them in
would mean inventing them, on a page whose whole claim is that it doesn't. Add the fields and the
panels appear the same way every other one does – only when an item has data for them.

The app also closes each write-up with an **embedded insight chart** (a bar series with a caption).
That's absent for the same reason: no item here carries the query behind it.

### The `product-analytics` placeholder

One item in `INBOX_ITEMS` – `product-analytics` – is **not** real. Its title reads "placeholder –
awaiting the real product analytics pull request" and it has no `prUrl`, `prNumber`, or `detail`. It
predates the unified list and was already rendering in the old Pull-requests tab; merging the lists
only makes it easier to notice.

It renders in the row like any other item, so it is visible to anyone who loads the page. Either give
it the real pull request's data or delete the entry – it should not ship as it stands.


Everything is responsive by container query, not viewport – the detail body goes two-column at `@3xl`
(evidence rail, then write-up), the file tree splits from the diff at `@2xl`, and the rail is its own
`@container` so the evidence footers can respond to their own width.
