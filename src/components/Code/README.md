# Code Components

Animation primitives and content components for the `/code` (PostHog Desktop) marketing page.

## Animation primitives

### `ChoppyReveal`
Word-by-word text reveal triggered on scroll. Supports mixed children (text + React elements like icons and annotations). Uses `IntersectionObserver` with `triggerOnce` behavior.

**Props:** `wordDelay`, `initialDelay`, `threshold`, `onComplete`, `className`

### `RoughAnnotation`
Wrapper around the `rough-notation` library. Draws hand-drawn-style annotations (underline, highlight, box, circle, bracket) on child elements. Supports scroll-triggered or controlled (`show` prop) modes.

**Props:** `type`, `color`, `strokeWidth`, `animationDuration`, `padding`, `animateOnScroll`, `delay`, `show`, `brackets`, `iterations`, `multiline`, `className`, `onComplete`

### `IconPop`
Elastic scale + rotation animation for inline icons. Pops in when scrolled into view.

**Props:** `delay`, `animateOnScroll`, `show`, `className`

### `usePrefersReducedMotion`
Hook that returns `true` when the user has `prefers-reduced-motion: reduce` enabled. All animation components use this to skip animations gracefully.

## Content components

### `DownloadContent`
Download UI for PostHog Desktop, shared by the `/code#download` hero swap and the standalone `/code/download` page. Detects the visitor's OS and architecture client-side (via `userAgentData` where available, with UA sniffing as the Linux fallback) and links every button to `https://code.posthog.com/download/*`, a Cloudflare Worker that redirects to the matching asset on the latest published release. Arch-specific paths are used because browsers don't send `Sec-CH-UA-Arch` on cross-origin navigation, so the worker can't distinguish Intel from Apple Silicon on its own. GitHub is only linked for release notes.

**Props:** `className`

### `SignalsCallout`
Grid display of signal types (In-app activity, Logs, Errors, etc.) with icons. Responsive: 3-col at `@2xl`, 2-col below.

### `FlowDiagram`
Five-step "old way" flow diagram (Analyze usage -> Decide what to build -> Prompt & context -> Build -> Ship) with Human/Machine actor labels. Responsive: horizontal at `@xl`, stacked below.

### `DottedConnection`
SVG dotted curved line connecting two elements (used between the "signals" word and the SignalsCallout box). Recalculates on resize. Desktop only (`@2xl`).

## Dependencies
- `rough-notation` (npm package)
- `@posthog/icons`
