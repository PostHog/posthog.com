# Window system

Reference this guide when working on window management or the desktop OS architecture.

For app templates and creating pages, see [Apps](apps.md).

## Overview

PostHog.com replicates a desktop operating system within the browser:

- MacOS-style global header bar
- Multiple windows open simultaneously
- Draggable, resizable windows that can be snapped, maximized, or minimized
- Panel to view all open windows

## Architecture

| Component | Location | Purpose |
|-----------|----------|---------|
| Desktop | `src/components/Desktop/index.tsx` | Renders the desktop, launches apps from icons |
| AppWindow | `src/components/AppWindow/index.tsx` | Wraps page content in window chrome |
| App context | `src/context/App.tsx` | Window management, settings, navigation |

## Window settings

Configure default and min/max dimensions in `src/context/App.tsx` via the `appSettings` object.

## Opening windows

Pass `state={{ newWindow: true }}` to open pages in new windows:

```tsx
navigate("/path", { state: { newWindow: true } })
```

This prevents the current window from being replaced when navigating to a different app.
