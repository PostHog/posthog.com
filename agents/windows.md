# Window system

Reference this guide when working on the desktop OS paradigm or window management.

## Overview

PostHog.com replicates a desktop operating system within the browser:

- MacOS-style global header bar
- Multiple windows open simultaneously
- Draggable, resizable windows that can be snapped, maximized, or minimized
- Panel to view all open windows

## Architecture

**Desktop:** Rendered in `src/components/Desktop/index.tsx`. Apps (windows) launch from icons.

**App window:** `src/components/AppWindow/index.tsx` wraps page content in the window chrome.

**Settings:** `src/context/App.tsx` contains `appSettings` for window size configuration.

## Opening windows

Pass `state={{ newWindow: true }}` to open pages in new windows:

```tsx
navigate("/path", { state: { newWindow: true } })
```

## App templates

Different "apps" use various templates:

| App | Location |
|-----|----------|
| ReaderView | `src/components/ReaderView/index.tsx` |
| Wizard | `src/components/Wizard/index.tsx` |
| Explorer | `src/components/Explorer/index.tsx` |

## Key files

- `src/components/Desktop/index.tsx` - Desktop rendering
- `src/components/AppWindow/index.tsx` - Window component
- `src/context/App.tsx` - Window management, settings, navigation
- `src/pages/products/index.tsx` - Example page using window system
