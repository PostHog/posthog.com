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

### `platforms`
Shared platform data and device detection for the launch download UI. Download URLs use `https://desktop.posthog.com/download/*`, which resolves the latest matching artifact.

### `DownloadButtons`
Feature-flagged launch UI with a detected-platform download, an all-platforms dropdown, and a docs link. Mobile devices get the docs link instead of a download.

**Props:** `className`, `align`, `size`

### `DownloadContent`
Download UI for PostHog Desktop, shared by the `/code#download` hero swap and the standalone `/code/download` page. Detects the visitor's OS and architecture client-side (via `userAgentData` where available, with UA sniffing as the Linux fallback), highlights the matching platform, and opens the monorepo release list filtered to Desktop releases. Visitors choose the latest matching asset there.

**Props:** `className`

### `DownloadCTA`
Just the primary download button for the visitor's detected platform, plus the Intel/Apple Silicon alternate link on macOS. Shares the `useDetectedPlatform` hook with `DownloadContent`, but renders no heading or blurb, so docs pages can drop it into their own styled card without duplicating the page title.

**Props:** none

### `DownloadList`
Static list of every platform build, for docs pages that want all options rather than a detected one. Renders `PLATFORMS` through `components/List`, so it does no OS detection. Used by `/docs/posthog-desktop/download-posthog-desktop` and the quick tour.

**Props:** none

### Exported constants
`RELEASES_URL` and `PLATFORMS` are exported so MDX pages can link the same release list without redeclaring it. `RELEASES_URL` points at the monorepo releases filtered by the `desktop` search term.

### `SignalsCallout`
Grid display of signal types (In-app activity, Logs, Errors, etc.) with icons. Responsive: 3-col at `@2xl`, 2-col below.

### `FlowDiagram`
Five-step "old way" flow diagram (Analyze usage -> Decide what to build -> Prompt & context -> Build -> Ship) with Human/Machine actor labels. Responsive: horizontal at `@xl`, stacked below.

### `DottedConnection`
SVG dotted curved line connecting two elements (used between the "signals" word and the SignalsCallout box). Recalculates on resize. Desktop only (`@2xl`).

## Dependencies
- `rough-notation` (npm package)
- `@posthog/icons`
