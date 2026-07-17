# Desktop

The OS desktop surface rendered behind all app windows: wallpaper, desktop icons, screensaver, notifications, and the right-click context menu. Mounted once in `components/Wrapper` as a sibling of the window list, and memoized (`React.memo`) so window opens/closes don't re-render it.

## Files

- `index.tsx` – the desktop surface. Defines the icon data (`useProductLinks()` for the left column, `apps` for the right), applies wallpaper-driven icon glow, and composes the layers described below.
- `DesktopIcon.tsx` – a single icon cell: `<li data-icon-label>` → `ZoomHover` → `AppLink` (from `components/OSIcons/AppIcon`). The `data-icon-label` attribute is load-bearing: marquee selection uses it for hit-testing, keyed by the (unique) icon label.
- `useMarqueeSelection.ts` – rubber-band selection logic (see below).
- `Wallpapers.tsx` – wallpaper scenes with light/dark and scene-to-scene transitions.

## Layer stacking

The desktop container is `fixed inset-0 pointer-events-none` — the container itself never intercepts clicks (this protects the taskbar strip and anything stacked above). Because `fixed` creates a stacking context, paint/hit-test order inside it is self-contained. Children, in order:

1. **Wallpaper** – absolutely positioned, inert (inherits `pointer-events-none`).
2. **Capture layer** – a transparent `absolute pointer-events-auto` div starting at `top: DESKTOP_TOP_OFFSET` (below the taskbar). It exists so empty desktop space has a pointer target: it's what makes marquee selection and right-click → context menu work between the icon columns. Without it, clicks in the empty middle fall through to the window list wrapper.
3. **Icon nav** – `relative` so it paints/hit-tests above the capture layer. The `<ul>`s are `pointer-events-auto`; the empty space inside their tall columns also bubbles pointer events to the container.
4. **Marquee rectangle** – always mounted, `hidden`, `pointer-events-none`. Geometry is written imperatively during a drag.

Windows always paint and hit-test above all of this (the window list renders after `<Desktop />` with positioned roots), so a marquee sweeps *beneath* open windows — same as a real OS.

`DESKTOP_TOP_OFFSET` is a hardcoded taskbar clearance (8px container padding + 42px taskbar) rather than the live `taskbarHeight` from context, to avoid layout shift on SSR hydration.

## Marquee selection (`useMarqueeSelection`)

Drag on empty desktop space to select icons, like a real OS. **Visual-only v1**: selection highlights icons and persists; it doesn't enable dragging or opening them.

Behavior:

- Primary-button drag (mouse/pen; touch ignored) draws a rectangle after a 4px threshold. Icons intersecting it highlight live.
- Shift at drag start adds to the existing selection; a plain drag replaces it.
- Clears on: plain click on empty desktop, Escape, or pressing an icon (the icon still opens its app as usual — `AppLink` is untouched).
- Right-click is ignored by the marquee, so the context menu works as before.

Implementation notes:

- Pointer listeners are window-level and capture-phase for the duration of a drag, so it survives sweeping over open windows and releases outside the viewport (`e.buttons === 0` guard in pointermove).
- Icon rects are snapshotted once per drag from `li[data-icon-label]`, **filtering zero-size rects**: the `sm:hidden` mobile icon list duplicates every label at 0×0, which would otherwise false-select on marquees touching the top-left corner. The same filter makes narrow-viewport mouse selection work against the mobile grid.
- The rectangle's geometry is ref-driven (direct style writes); the only React state is the `ReadonlySet<string>` of selected labels, updated only when membership actually changes.
- Selection state is local to the desktop — nothing in `context/App.tsx` is involved.
