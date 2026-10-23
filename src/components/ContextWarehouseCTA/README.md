# ContextWarehouseCTA

The CTA slot on `/context-warehouse`: a "Get started" button into in-app source setup, with an
"Install with AI" button beside it that reveals `npx @posthog/wizard warehouse`.

Additive on purpose — the button keeps its place and the terminal route is offered next to it, matching the
pattern used elsewhere on the site. The wizard scans the user's codebase for databases and APIs and connects
every source it finds, rather than having them configure sources one at a time.

## Usage

```tsx
import ContextWarehouseCTA from 'components/ContextWarehouseCTA'

<ContextWarehouseCTA label="Get started" />
```

`label` sets the "Get started" button's text. Both CTAs on the page render through this component, so a
visitor gets one consistent path from top to bottom rather than a mix.

## Notes

- `WizardCommand` displays the clean `npx @posthog/wizard warehouse` and copies the pinned
  `npx -y @posthog/wizard@latest warehouse`.
- The reveal animates `grid-template-rows` rather than height, so it stays smooth without measuring the
  command's height (which varies with the card's width).
- Clicks are tracked as `contextwarehousecta-getstarted-clicked`, `contextwarehousecta-installwithai-clicked`,
  and `contextwarehousecta-copy-clicked`, mirroring the homepage `homepagecta-*` naming. These aren't wired to
  an experiment — they're here so the split between the two routes stays visible in the data. The
  "Install with AI" event only fires when the panel is opened, not when it's collapsed again.
