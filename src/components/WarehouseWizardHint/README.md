# WarehouseWizardHint

An agent-flavored nudge that promotes the setup wizard CLI (`npx @posthog/wizard warehouse`) as
a faster alternative to configuring a data warehouse source by hand. Ported from the equivalent
component in the PostHog product app so the same prompt appears on the marketing site's
data-source pages.

It renders a dashed-border card with a sparkles icon, a short pitch, and a copyable command block
(via the shared [`WizardCommand`](../WizardCommand) component, which appends the correct
`--region` based on `useCloud()`). The card is dismissible; dismissal is persisted to
`localStorage` under the key `warehouse-wizard-hint-dismissed`, matching the product app.

## Usage

```tsx
import WarehouseWizardHint from 'components/WarehouseWizardHint'

<WarehouseWizardHint />
```

### Props

| Prop        | Type     | Default | Description                                    |
| ----------- | -------- | ------- | ---------------------------------------------- |
| `className` | `string` | `''`    | Extra classes applied to the outer card `div`. |

## Where it renders

- `/data-stack/sources` — added directly in `src/pages/data-stack/sources.tsx`.
- `/docs/data-warehouse/sources` and every page under that URL — for pages whose heading is
  rendered by `ReaderView` (the docs root and MDX source docs), it is injected once in
  `src/components/ReaderView/index.tsx`, gated on the pathname. For the pure-React warehouse
  source template it is added directly in `src/templates/DataWarehouseSource.tsx` (that template
  hides the `ReaderView` title and renders its own heading, so the shared injection is skipped
  for it via the `!hideTitle` guard).

## Notes

- SSR-safe: the card starts hidden and only appears after a client-side `useEffect` reads
  `localStorage`, so build/SSR renders nothing and previously-dismissed users see no flash.
