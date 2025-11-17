---
title: PostHog.com site architecture
---

PostHog.com doesn’t behave like a normal website. Instead, it runs inside a desktop-style environment where every page is a draggable window. This guide explains how that system works under the hood.

## Core architecture

PostHog.com runs on Gatsby with a custom windowing system built using React context providers. The entire site operates inside a desktop-like environment where traditional page navigation is replaced by window management.

At a high level, every page is wrapped in the **App Provider**, which manages global state and window logic. The **Wrapper** renders the desktop interface, and each page is displayed inside an **AppWindow** component on the **Desktop**.

### Key components

* **App Provider** (`src/context/App.tsx`) – Core state management and window system
* **Wrapper** (`src/components/Wrapper/index.tsx`) – Desktop layout and window rendering
* **AppWindow** (`src/components/AppWindow/index.tsx`) – Individual window state management
* **Desktop** (`src/components/Desktop/index.tsx`) – Desktop environment with wallpapers and icons

## How pages become windows

Every page in the site is wrapped using Gatsby's `wrapPageElement` API in `gatsby-browser.tsx`:

```tsx
export const wrapPageElement = ({ element, props: { location } }) => {
    return (
        <Provider element={element} location={location}>
            <Wrapper />
        </Provider>
    )
}
```

When Gatsby loads a page, it passes:

* `element` – The page's React component
* `location` – Current route information

These get passed to the App Provider, which converts them into windows.

## The App Provider system

Located at `src/context/App.tsx`, the App Provider is the core of our windowing system.

### Window state management

The App Provider maintains an array of active windows in state:

```tsx
const [windows, setWindows] = useState<AppWindow[]>([])
```

Each window object contains:

* `element` – The React component to render
* `position` – X/Y coordinates
* `size` – Width/height dimensions
* `zIndex` – Window stacking order
* `minimized` – Minimized state
* `path` – Route path
* `appSettings` – Window-specific configuration

### Core functions

Key window management functions include:

* `addWindow()` – Creates and adds new windows to state
* `closeWindow()` – Removes windows from state
* `bringToFront()` – Updates z-index for window focus
* `minimizeWindow()` – Sets minimized state
* `updateWindow()` – Updates position, size, and other properties

### Window routing behavior

The App Provider decides whether to create, focus, or replace a window based on navigation state:

1. **New window** – If `newWindow: true` is passed in location state, or no existing window matches the path
2. **Focus existing** – If a window with the same path already exists, bring it to the front instead of creating a duplicate
3. **Replace** – For standard navigation without `newWindow: true`, replace the content of the focused window

This prevents duplicate windows for the same route while still allowing intentional multi-window behavior.

## App settings configuration

Window behavior is controlled by the `appSettings` object in `src/context/App.tsx`. Each route can have custom settings:

```tsx
const appSettings: AppSettings = {
    '/': {
        size: {
            min: { width: 700, height: 500 },
            max: { width: 800, height: 1000 },
            fixed: false,
        },
        position: {
            center: true,
            getPositionDefaults: (size, windows, getDesktopCenterPosition) => {
                // Custom positioning logic
                // Currently only offsets the homepage window
                // so the default background is always fully visible
            },
        },
    },
    // More route configurations...
}
```

### Configuration options

* **size.min/max** – Minimum and maximum window dimensions
* **size.fixed** – Whether window can be resized
* **size.autoHeight** – Auto-adjust height to content
* **position.center** – Center window on screen
* **position.getPositionDefaults** – Custom positioning function

## The Wrapper component

`src/components/Wrapper/index.tsx` handles the actual desktop rendering:

```tsx
export default function Wrapper() {
    const { windows, constraintsRef } = useApp()
    
    return (
        <div className="fixed inset-0 size-full flex flex-col">
            <TaskBarMenu />
            <div ref={constraintsRef} className="flex-grow relative">
                <Desktop />
                <AnimatePresence>
                    {windows.map((item) => (
                        <AppWindow item={item} key={item.key} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}
```

It renders:

* Desktop background and icons
* Taskbar at the top
* All active windows with animations

It also provides drag constraints for window movement via `constraintsRef`.

## Window implementation

Individual windows are implemented in `src/components/AppWindow/index.tsx` using Framer Motion for animations and drag interactions. Each window is wrapped in a Window Provider so that child components can access the current window object via the `useWindow` hook.

### Key features

* **Dragging** – Windows can be dragged around the desktop
* **Resizing** – Resize handles on window borders
* **Snapping** – Windows snap to screen edges
* **Minimizing** – Windows minimize to taskbar
* **Focus management** – Click to bring windows to front
* **Chrome** – Window controls (close, minimize, maximize buttons)

### Window lifecycle

1. **Creation** – New `AppWindow` object added to state
2. **Mounting** – Component mounts with entrance animation
3. **Interaction** – User can drag, resize, minimize, close
4. **Unmounting** – Exit animation before removal from state

## Experience modes

The site supports two experience modes controlled by `siteSettings.experience`:

* **posthog** – Full desktop OS experience with windows
* **boring** – Traditional website navigation (used on mobile or when explicitly toggled)

During development you can manually force boring mode by setting `siteSettings.experience = 'boring'`. This is useful for debugging.

## Keyboard shortcuts

Global keyboard shortcuts are handled in the App Provider:

**Navigation and search**

* `/` or `Cmd+K` – Open search
* `?` – Open chat

**Appearance**

* `,` – Display options
* `.` – Keyboard shortcuts
* `\` – Toggle theme
* `|` – Cycle wallpapers

**Window control**

* `Shift + Arrow keys` – Window snapping
* `Shift + W` – Close focused window
* `Shift + X` – Close all windows

## SEO compatibility

Despite the desktop interface, the site maintains full SEO compatibility:

* Pages are statically generated at build time
* Each route has proper HTML structure, canonical tags, and metadata
* Search engines crawl normal static files
* Client-side windowing does not affect crawling

## Development workflow

When working on the windowing system:

1. **Test window creation** – Ensure new pages create windows properly
2. **Check positioning** – Verify windows open in expected locations
3. **Test interactions** – Drag, resize, minimize, close functionality
4. **Verify animations** – Smooth entrance and exit animations
5. **Mobile compatibility** – Ensure fallback to boring mode works

## Common debugging

* **Windows not appearing** – Check `appSettings` configuration for the route
* **Positioning issues** – Verify `getPositionDefaults` logic
* **Animation problems** – Check Framer Motion configurations in AppWindow
* **State sync issues** – Use React DevTools to inspect App Provider state

This architecture allows PostHog.com to feel like a desktop operating system while maintaining the benefits of a static website for performance and SEO.