# PlatformInstall

A reusable copy-snippet installer that surfaces tailored instructions for each supported platform behind a single, schema-driven UI.

The default schema (`mcpInstallSchema`) renders the **PostHog MCP** install flow described in [/docs/model-context-protocol](https://posthog.com/docs/model-context-protocol), but the component is purely presentational — pass any `InstallSchema` to repurpose it for other multi-platform install snippets.

## Usage

```tsx
import PlatformInstall from "components/PlatformInstall"

;<PlatformInstall />
```

With a custom schema:

```tsx
import PlatformInstall, { type InstallSchema } from "components/PlatformInstall"

const mySchema: InstallSchema = {
    title: "Install the PostHog SDK",
    learnMoreHref: "/docs/getting-started/install",
    defaultCommand: "npx @posthog/wizard@latest",
    platforms: [
        /* … */
    ],
}

;<PlatformInstall schema={mySchema} />
```

## Layout

1. Header row — `title` with an optional `titleInfoAction` or `titleTooltip` (left) + optional `secondaryAction` (right).
2. Always-visible `defaultCommand` snippet with copy-to-clipboard + toast.
3. Icon row split with `justify-between`: `editors` group on the left, `platforms` group on the right. Each icon is a button wrapped in `<ZoomHover size="sm">` and a Radix tooltip showing the platform label.
4. Clicking an icon selects it and reveals an expanded section. Clicking the same icon again closes the section. Selected platforms reveal their label inline with a quick width/opacity transition.
5. The expanded section renders one of:
    - The platform's `content` (escape hatch for non-snippet flows like Lovable / Replit / v0).
    - Sub-tabs (when `subOptions` are present) — first sub-option auto-selected. Switching tabs swaps the methods list. Sub-options can themselves nest.
    - A list of `methods` rendered as labeled sections. Each method renders in this order: label → `helper` (pre-command instructions) → `command` (copyable snippet) → `note` (post-command tip) → `button` (deep-link / docs link) → `content` (arbitrary escape hatch).

## Schema shape

```ts
type InstallMethod = {
    label: string
    helper?: React.ReactNode // description / instructions, rendered before the command
    command?: string
    note?: React.ReactNode // post-command tip (e.g. "then run /mcp")
    button?: { label: string; href: string; external?: boolean }
    content?: React.ReactNode // arbitrary instructions escape hatch
}

type PlatformOption = {
    id: string
    label: string
    methods?: InstallMethod[]
    subOptions?: PlatformOption[]
    content?: React.ReactNode
}

type Platform = PlatformOption & {
    icon: React.ReactNode
    group: "editors" | "platforms"
}

type InstallSchema = {
    title: string
    titleInfoAction?: { label: string; to: string; state?: Record<string, unknown> }
    titleTooltip?: React.ReactNode
    secondaryAction?: { label: string; to: string; state?: Record<string, unknown>; icon?: React.ReactNode }
    defaultCommand: string
    platforms: Platform[]
}
```

A platform is rendered using whichever of `content`, `subOptions`, or `methods` is provided (in that order of precedence).

## Logos

Logos come from [`src/components/OSIcons/Icons.tsx`](../OSIcons/Icons.tsx). The default schema currently uses:

- `IconAnthropic` for Claude
- `IconOpenAI` for Codex
- `IconVercel` for v0

A small letter-tile placeholder stands in for Cursor, VS Code, Windsurf, Zed, Lovable, and Replit until dedicated glyphs are added to `Icons.tsx`. Swap the placeholder for the real icon import in [`schema.tsx`](./schema.tsx) once available.

## Files

- `index.tsx` — main component, snippet/tab rendering
- `CopyableCommand.tsx` — shared copy-to-clipboard snippet (gradient option); re-exported from the package root
- `schema.tsx` — types + default `mcpInstallSchema`
- `IconButton.tsx` — local button style (1px border, 2px bottom border, animated label reveal, ZoomHover, tooltip)

## Notes

- The button style is intentionally local while we evaluate it. If we promote it to a shared primitive, lift `IconButton.tsx` into `components/` and update consumers.
- All container queries / Tailwind tokens follow project conventions (no stock Tailwind colors, no media queries).
