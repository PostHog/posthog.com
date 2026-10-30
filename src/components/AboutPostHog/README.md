# AboutPostHog

Renders the standard "About PostHog" description as a `Blockquote`. This is the
single source of truth for that copy.

## Why it exists

The description used to be hard-coded inline in `ReaderView` (the auto-appended
"About" section on content pages). Other pages — e.g. the brand handbook's
standard-description section — need the exact same wording. Duplicating the text
let the two drift apart, so it now lives here once.

## Usage

In React:

```tsx
import AboutPostHog from 'components/AboutPostHog'

<AboutPostHog />
```

In MDX/Markdown content (registered as a global shortcode in
`src/mdxGlobalComponents.js` / `.ts`):

```mdx
<AboutPostHog />
```

## Updating the copy

Edit the text in `index.tsx`. Every place that renders `<AboutPostHog />`
(ReaderView's About blockquote and any content page that uses the shortcode)
updates automatically.
