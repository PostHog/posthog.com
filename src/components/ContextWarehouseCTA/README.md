# ContextWarehouseCTA

The CTA slot on `/context-warehouse`, behind the `context-warehouse-cta` experiment.

| Variant           | What renders                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| `control`         | The button the page shipped with, into `app.posthog.com/data-management/sources`                 |
| `install-with-ai` | That button, plus an "Install with AI" button that reveals the wizard command — additive         |
| `wizard-command`  | The wizard command instead of the button, copying `npx -y @posthog/wizard@latest warehouse`      |

Any value other than a known variant key — control, an unresolved flag, an adblocked one — falls back to
control, so the page never renders without a CTA.

`install-with-ai` mirrors the pattern already used elsewhere on the site: "Get started" keeps its place and
the terminal route is offered next to it rather than replacing it.

## Usage

```tsx
import ContextWarehouseCTA from 'components/ContextWarehouseCTA'

<ContextWarehouseCTA label="Get started" />
```

`label` sets the "Get started" button's text and is ignored by `wizard-command`. Both CTAs on the page render
through this component, so a visitor gets one consistent path from top to bottom rather than a mix.

## Notes

- Client-only via `RenderInClient`, like `Home/HeroCTA` — a server-rendered variant would be wrong for most
  visitors and cause a hydration mismatch. The placeholder reserves the CTA height so the surrounding card
  doesn't shift when flags resolve.
- Reading the flag inside the component is what emits the exposure event, so only people who actually load
  the page enter the experiment.
- Clicks are tracked as `contextwarehousecta-getstarted-clicked`, `contextwarehousecta-installwithai-clicked`,
  and `contextwarehousecta-copy-clicked`, mirroring the homepage `homepagecta-*` naming so the two tests can
  be compared. The "Install with AI" event only fires when the panel is opened, not when it's collapsed again.

## Cleanup

When the experiment ends, inline the winning variant into `src/pages/context-warehouse/index.tsx` and delete
this component along with the `context-warehouse-cta` flag.
