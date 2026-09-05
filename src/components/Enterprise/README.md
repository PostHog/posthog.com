# Enterprise

Components for `/enterprise`.

## `BusinessProof` and `WorkWithUs`

`BusinessProof` is an oversized editorial index with a detail pane, under the title "5 reasons enterprises love PostHog" (the word "love" followed by the logomark, set in the same type as the index). Five numbered pillars run down the left (01 Compliance, 02 Security, 03 Scalability, 04 Trust, 05 Support), top-aligned, and beside them sits the active pillar's proof – a bold lead, a rule, then its points as a two-column inline list ("linked title: detail", links in the accent color) in a box with the site's thick `border-2` dialog border. A run of skyscraper floors (`skyscraper-tile.png`) runs behind the pane at the tower's x, fades in above the title, and runs past the block to fade out just above the hand-off section's resources column.

`WorkWithUs` is the hand-off: "Want your business to use PostHog?" with a link to `/talk-to-a-human`, plus `RESOURCES` – the public reading a security or procurement review needs.

```tsx
import { BusinessProof, WorkWithUs } from 'components/Enterprise/BusinessProof'

<BusinessProof />
<WorkWithUs />
```

### How the index works

- Radix `Tabs` with `orientation="vertical"` and `activationMode="manual"`: click switches, arrow keys move focus, Enter or Space activates. Hover does nothing on purpose.
- Every pane is mounted (`forceMount`) and stacked in one grid cell (`col-start-1 row-start-1`), so the pane area is always as tall as the tallest pane and the page never shifts when you switch. Inactive panes are `invisible opacity-0`, with a 300ms opacity/visibility transition (`motion-reduce:transition-none`); `invisible` keeps their links out of the tab order.
- Below `@2xl` the index wraps into a row above the pane; the tower run is hidden there, as the tower is.

### Keep every point checkable

Each entry in `PILLARS` traces to a public source: the security handbook, the privacy docs, the platform package data, the values page, the company story, or a customer story. Rules when editing:

- No certifications we do not hold. "SOC 2 Type 2" yes; "HIPAA certified" no – it is "HIPAA-ready with a BAA".
- No numbers we do not publish. No uptime percentage, no throughput guarantee, no Enterprise list price.
- No statements about the future or about ownership of the company. "Default alive" and "cashflow positive since December 2024" are from the public story; anything beyond that is not documented.
- Forward-deployed engineers are a separately paid, scoped service (`/services`), not part of Enterprise.
