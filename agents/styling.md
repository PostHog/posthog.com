# Styling

Reference this guide when working on CSS and Tailwind styles.

## Tailwind rules

- Do not add new Tailwind utilities or use stock colors
- Use only colors defined in `tailwind.config.js`
- Two modes (light/dark), three schemes (primary/secondary/tertiary)

## Color tokens

Use these project-specific classes:

**Backgrounds:**
- `bg-primary`, `bg-accent`

**Borders:**
- `border-primary`, `border-input`

**Text:**
- `text-primary`, `text-secondary`, `text-muted`, `text-input`

**Example:**

```tsx
// Correct
<div className="bg-primary text-secondary border-input" />

// Wrong - no stock Tailwind colors
<div className="bg-blue-500 text-gray-700" />
```

## Style priority

1. Prefer inline Tailwind classes
2. Custom CSS → `src/styles/global.css` with `@apply`
3. JIT classes if needed
4. Fallback to nested regular CSS

## Link styling

- `font-semibold`
- `text-right` (for alignment)
- `dark:text-yellow` (dark mode)
  - Most dark mode styling is handled by default in CSS, so there are few times where `dark:` is needed. Generally `text-primary`, `bg-primary` will handle changing color values when toggling color modes.

## Theming

PostHog.com supports multiple customization layers:

1. **Color mode:** auto, light (default), dark
2. **Theme (skin):** Button styles, window colors, desktop icons, icon underlining
3. **Desktop background:** Image, background color, icon label backgrounds

### Data attributes

| Attribute | Location | Purpose | Values |
|-----------|----------|---------|--------|
| `data-scheme` | Any element | Color theming for nested content | `primary` (foreground), `secondary` (accent/sidebars), `tertiary` (window header bar) |
| `data-skin` | `body` tag | Overall aesthetic | `modern` (default), `classic` (pre-Mac OS X vibes, visible button outlines) |
| `data-wallpaper` | `body` tag | Desktop background | `keyboard-garden`, `hogzilla`, etc. |

### Using data-scheme

```tsx
<div data-scheme="secondary" className="text-primary bg-primary">
  {/* Content uses secondary color scheme */}
</div>
```

- Reads `body` class (`light`/`dark`) and switches automatically—no need for `dark:text-{value}`
- Can be nested with different values

**Important:** There's rarely a need for Tailwind's `dark:` tag as colors are defined in [global.css](src/styles/global.css) in `utilities`. Colors are derived from their relevant values for each of the data schemes:

- `primary`: main focus of the page
- `secondary`: additional content, like a sidebar
- `tertiary`: mostly used for app chrome

### How theming works

Most customization uses Tailwind. Background images are set in `src/components/Desktop/index.tsx` via the `data-wallpaper` attribute on `body`. This enables per-background customizations for the desktop and taskbar.

**Not currently supported:**
- Custom desktop backgrounds
- Changing desktop background and theme styles together
