# TemplateCTA

The one-touch app link a template offers, built from frontmatter rather than from a `switch` in
the page component.

```yaml
cta:
  kind: ai
  value: Build me a dashboard tracking weekly active users, retention, and feature adoption
  label: Build this with PostHog AI
  fallback: /docs/product-analytics/dashboards
```

```tsx
<TemplateCTA cta={frontmatter.cta} secondary={{ href: '/docs/surveys', label: 'Read the docs' }} />
```

## Why it replaces `TemplateCTAs`

The old component returned `null` unless **both** a primary and a secondary URL were present, so
a template with one honest call to action rendered none at all. Here the primary stands alone, and
a primary that can't be built drops to the secondary instead of taking the block down with it.

## Kinds

Every kind was verified against the app before being added here. `precise` is the distinction
that matters: it says whether the link lands on the thing, or merely runs a search the reader
still has to sift.

| Kind | URL | Precise |
| --- | --- | --- |
| `ai` | `/ai?ask=<prompt>` | Yes – auto-submits, so PostHog AI actually builds it |
| `survey` | `/surveys/guided/new?template=<enum>` | Yes – prefills and skips the picker |
| `sql` | `/sql?open_query=<sql>` | Yes – loads the query, deliberately doesn't run it |
| `insight` | `/insights/new#q=<json>` or `#insight=TRENDS` | Yes |
| `dashboard` | `/dashboard?templateFilter=<text>#newDashboard=modal` | No – fuzzy full-text search |
| `workflow` | `/workflows?templateFilter=<text>#newWorkflow=modal` | No – fuzzy search |
| `url` | Used verbatim | Yes |
| `scout` | – | Always null, see below |

Imprecise kinds get "Find this in PostHog" as their default label. Enablement wording is reserved
for the kinds that deliver it – a button promising more than the app does costs more trust than
the click is worth.

`kind: scout` returns null on purpose. A scout link carries a base64 payload built from the
template's sibling `SKILL.md`, which is a GraphQL concern rather than a frontmatter one, so
`components/SelfDrivingInbox/scoutDeepLink.ts` owns it.

## Failing soft

`buildCta` returns null – and the component renders nothing – rather than emit a link the app
would ignore. Three ways to get there:

1. No `kind`, or a `kind` with no builder.
2. A builder that refused its value. `dashboard` and `workflow` reject anything under three
   characters, because the app silently ignores a shorter `templateFilter`.
3. A refusal with no `fallback` to fall back to.

## Keeping `survey` values valid

`kind: survey` matches an exact enum value in the monorepo
(`frontend/src/scenes/surveys/constants.tsx`), and nothing validates it at build time. Drift shows
up as the wizard opening on the template picker instead of the template – it fails soft in the
app, not loudly here. Set a `fallback` on survey CTAs so the button still goes somewhere useful.

## Related

- `components/SelfDrivingInbox/scoutDeepLink.ts` – the scout payload link, and the model this
  builder table follows
- `contents/templates/_starter/` – the authoring template
