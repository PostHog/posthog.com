# MCPInstallCTA

The compact "Install the PostHog MCP" call to action: the wizard command, a row of
client icons, and a link to PostHog Desktop.

It was first built for the home page hero carousel. It now also runs at the top and
the bottom of the MCP page, so it lives here instead of in the carousel slide file.

## Usage

```tsx
import MCPInstallCTA from 'components/MCPInstallCTA'

<MCPInstallCTA />
<MCPInstallCTA className="max-w-md" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `''` | Classes for the wrapper. Use it to set the width. |

## What it renders

`PlatformInstall` with a compact copy of `mcpInstallSchema`:

- `supports` is removed, because the "Supports …" line is too long for a narrow card.
- `secondaryAction` points at the MCP documentation.
- The platform row is cut to Claude, ChatGPT, Codex, Cursor, and VS Code. A full
  platform list does not fit beside the command.

The component sets `linkOnly`, so each icon is a direct install link and no platform
opens an instruction panel. For the complete installer with every platform and its
instructions, use `PlatformInstall` directly – see its README.

## Where it runs

- `src/components/Home/HeroCarousel/homeSlides.tsx` – the "Give agents product context" slide
- `src/components/MCPPage/index.tsx` – the page header and the closing call to action
