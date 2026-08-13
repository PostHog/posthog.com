# ContextWarehouseCTA

The CTA slot on `/context-warehouse`, behind the `context-warehouse-cta` experiment.

| Variant          | What renders                                                                       |
| ---------------- | ---------------------------------------------------------------------------------- |
| `control`        | The button the page shipped with, into `app.posthog.com/data-management/sources`    |
| `wizard-command` | `<WizardCommand command="warehouse" />` — copies `npx -y @posthog/wizard@latest warehouse` |

Anything other than `wizard-command` (including an unresolved or blocked flag) falls back to control, so
the page never renders without a CTA.

## Usage

```tsx
import ContextWarehouseCTA from 'components/ContextWarehouseCTA'

<ContextWarehouseCTA label="Get started" />
```

`label` sets the control button's text and is ignored by the wizard variant. Both CTAs on the page render
through this component, so a visitor gets one consistent path from top to bottom rather than a mix.

## Notes

- Client-only via `RenderInClient`, like `Home/HeroCTA` — a server-rendered variant would be wrong for half
  of visitors and cause a hydration mismatch. The placeholder reserves the CTA height so the surrounding
  card doesn't shift when flags resolve.
- Reading the flag inside the component is what emits the exposure event, so only people who actually load
  the page enter the experiment.
- Clicks are tracked as `contextwarehousecta-getstarted-clicked` and `contextwarehousecta-copy-clicked`,
  mirroring the homepage `homepagecta-*` naming so the two tests can be compared.

## Cleanup

When the experiment ends, inline the winning variant into `src/pages/context-warehouse/index.tsx` and delete
this component along with the `context-warehouse-cta` flag.
