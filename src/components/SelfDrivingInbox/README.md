# SelfDrivingInbox

Renders self-driving scout templates as a **live inbox**: instead of browsing template
descriptions, a visitor reads a queue of real-shaped reports — the same artifact self-driving
would deliver to them. Clicking a report opens the template behind it.

The point is teaching by recognition. Nobody has to imagine what a self-driving report looks
like, because they're already reading one.

Used by `/templates/self-driving` (`src/pages/templates/self-driving.tsx`), and its
`ReportCard` is shared with `src/templates/Template.tsx` so each template page shows the
identical report.

---

## Authoring a template's report

The report lives in the template's **frontmatter**, not its MDX body. Add a `report` block to
`contents/templates/<slug>/index.mdx`:

```yaml
---
title: Silent failure in your core action
subtitle: 'Where does your most important flow fail without telling anyone?'
filters:
  type:
    - self-driving
report:
  title: Publish completions down 34% while attempts hold steady
  priority: P1
  source: Scout · core action funnel
  receivedAgo: 2h
  affected: 47 users affected
  body: >-
    Since the 14:02 deploy, publish attempts are flat but completions dropped from a 92% to a
    61% success rate. Replay shows users clicking **Publish**, watching the spinner, and
    leaving after ~8 seconds. Error tracking shows a new timeout, swallowed by the retry
    wrapper, so no error page was shown.
  suggestedAction: >-
    Surface the timeout to the user and fix the silent-swallow path.
  actionNote: An agent opens the pull request; you review and merge.
---
```

Do **not** also hand-write a "What lands in your inbox" section in the MDX body — the page
renders this block for you. Two copies drift.

### Fields

| Field | Required | Notes |
|---|---|---|
| `title` | yes | The finding as a **claim with its evidence in it**, not a topic. "Publish completions down 34% while attempts hold steady" — not "Checkout issues". This is the single most important line you write; in the gallery it's often all someone reads. |
| `priority` | yes | `P0`–`P4`. P0/P1 urgent, P2 notable, P3/P4 informational. Drives sort order and the dot color. Be honest — an inbox where everything is P1 teaches nothing. |
| `source` | yes | What surfaced it: `Scout · core action funnel`, `Error tracking`, `Support · ticket clustering`. The `·` separator is the house style. |
| `body` | yes | 2–4 sentences. Markdown: `**bold**`, `` `code` ``, and links render. Lead with the observation, then the corroborating evidence from other sources. |
| `suggestedAction` | no | What the agent proposes doing. Markdown. |
| `actionNote` | no | One line on what happens next, rendered dimmed. |
| `affected` | no | Impact, e.g. `47 users affected`. |
| `receivedAgo` | no | A static string like `2h`. See "no fake liveness" below. |

### Writing a report that earns trust

- **Name the evidence, not the vibe.** Every claim in the body should be something a reader
  could go verify. Numbers, event names, deploy times, replay behavior.
- **Corroborate across sources.** The most convincing reports triangulate: the metric moved,
  replay shows the behavior, error tracking has the cause. That's what a single dashboard
  can't do, and it's the whole argument for self-driving.
- **Match the priority to the stakes.** A ghost feature flag is not a P0. Inflating priorities
  is the fastest way to make the whole inbox read as noise.
- **Keep it the length of a thing someone actually reads.** If the body needs a fifth
  sentence, the finding probably isn't sharp enough yet.

## No fake liveness

`receivedAgo` is an authored static string, never a computed relative time. Reports do not
arrive, tick, or mark themselves unread.

This is a deliberate line: an honest demo of a real artifact builds trust, a simulated live
product does not. It also avoids the SSR hydration problems that relative timestamps cause
elsewhere on the site (see `suppressHydrationWarning` in `src/pages/self-driving/index.tsx`).

## These files are agent context too

A scout template is read by two audiences from one source. Humans get the inbox UI; agents get a
markdown mirror of the same page at `https://posthog.com/templates/<slug>.md`.

That mirror is produced by the site's existing pipeline, not a bespoke exporter:
`generateRawMarkdownPages()` in `gatsby/rawMarkdownUtils.ts` converts the **built HTML** of every
page under `MARKDOWN_CONTENT_PATHS` (`src/constants/index.ts`, which now includes `/templates`)
with turndown, and `generateLlmsTxt()` indexes the self-driving ones. `static/robots.txt` blocks
`/*.md$` from search crawlers, so the mirror exists for agents specifically.
`context-mill/context/docs.yaml` already consumes posthog.com `.md` URLs this way to feed the
setup wizard.

**The consequence that bites: anything not in the built HTML doesn't reach agents.** The detail
pane therefore renders server-side rather than waiting for hydration, and `scout.body` is
rendered on the page (inside a `<details>`) rather than only encoded into the deep-link payload.
If you gate content behind `interactive` or move it into a click-only surface, it silently
disappears from both the agent mirror and search engines.

The scout block is rendered in the canonical `SKILL.md` shape the monorepo uses
(`products/signals/skills/signals-scout-*/SKILL.md`; contract in
`authoring-scouts/references/scout-anatomy.md`) — `name` must match `signals-scout-<kebab>` or
the harness never runs it, and `description` doubles as the description on the config API. An
agent reading the mirror can create the scout verbatim instead of translating it.

## Rendering contract

- **Static-first.** The full list renders from `useStaticQuery` at build time and every row is
  a real `<Link>` anchor. With JavaScript disabled you get a readable, navigable list of
  reports. The preview pane, selection, and keyboard navigation are progressive enhancement.
  (Same contract as `components/LiveSelfDrivingLoop`.)
- **Container queries, never media queries.** Every page on this site is a resizable window, so
  breakpoints are `@[700px]:`-style and keyed to the container, not the viewport.
- **Project color tokens only.** Priority colors live in `PRIORITY_STYLES` in `types.ts`
  (`bg-red`, `bg-orange`, `bg-blue`, `bg-secondary`). Never stock Tailwind colors.
- **Reduced motion** collapses pane transitions to instant.

## Why `components/Inbox` is not reused

`src/components/Inbox/index.tsx` looks like the obvious thing to reuse — it's an Outlook-style
resizable 3-pane shell. It isn't reusable: it's welded to the Questions/Squeak product
(`useQuestions`, Strapi records, Algolia search, `QuestionForm`) and has no generic list/detail
API. This component mirrors its *layout patterns* (`ScrollArea`, `ToggleGroup` pane switcher,
framer-motion resize) without depending on it.

Don't retry the reuse; extract a shared shell from both only if a third consumer appears.

## Files

| File | Responsibility |
|---|---|
| `index.tsx` | The gallery: data query, selection state, two-pane layout |
| `ReportRow.tsx` | One inbox row — priority dot, title, source, time |
| `ReportCard.tsx` | The report body. `variant: 'preview' \| 'page'`. Shared with `Template.tsx` |
| `PriorityDot.tsx` | Priority → token + label |
| `types.ts` | `SelfDrivingReport`, `InboxTemplate`, priority tables |

The frontmatter type is declared in `gatsby/createSchemaCustomization.ts` (`FrontmatterReport`).
It's explicit rather than inferred because the field exists on only a handful of the ~30
template MDX nodes, and Gatsby's inference on sparse nested objects breaks the build the moment
someone adds a partial block.
