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
