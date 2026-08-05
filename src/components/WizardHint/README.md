# WizardHint

Dismissible banner that nudges readers toward a `npx @posthog/wizard <command>` CLI flow as the automated alternative to manual setup. Visual design matches `WizardCTA` (wizard hedgehog, tan texture background, inline copyable command).

## Usage

```tsx
import WizardHint from 'components/WizardHint'

<WizardHint
    command="warehouse"
    title="Let AI connect your sources for you"
    subtitle="Skip the manual setup — run this in your project and the wizard auto-detects your databases and APIs and connects them to PostHog."
    dismissKey="warehouse-wizard-hint"
/>
```

Prefer the preconfigured variants where one exists:

- `components/WarehouseWizardHint` — data warehouse sources (`npx @posthog/wizard warehouse`). Rendered by `templates/DataWarehouseSource.tsx`, `templates/Handbook.tsx` (data warehouse source paths), and `pages/context-warehouse/sources.tsx`.
- `components/AIObservabilityWizardHint` — AI observability SDK installation (`npx @posthog/wizard ai-observability`). Rendered by `templates/Handbook.tsx` on `/docs/ai-observability/installation/*` pages.

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `command` | `string` | Wizard subcommand appended to `npx @posthog/wizard` |
| `title` | `string` | Bold headline |
| `subtitle` | `string` | Supporting line under the headline |
| `dismissKey` | `string` | Base name for the dismissal wiring (see below) |
| `className` | `string?` | Extra classes on the outer wrapper |

## Dismissal wiring

Dismissing stores `${dismissKey}-dismissed = '1'` in localStorage and adds the same class to `<html>`. To hide the hint before first paint on later visits, each variant needs two static registrations:

1. `static/scripts/theme-init.js` — add the key to the dismissed-hint list so the `<html>` class is set pre-paint.
2. `src/styles/global.css` — add a `html.<dismissKey>-dismissed .<dismissKey> { display: none; }` rule (the component puts `dismissKey` on its wrapper as a class).

The `warehouse-wizard-hint` key mirrors the product app's hint, which shares the same localStorage key.
