# OSIcons

Desktop OS-style icons used across the site.

## GradientGlyphIcon

Renders any SVG path as a gradient-filled, glowing icon with a hover sweep animation. Designed for desktop icons that need richer visual treatment than `currentColor` SVGs.

### Usage

```tsx
import { GradientGlyphIcon } from 'components/OSIcons'

// Minimal — just pass a path, defaults handle the rest
<GradientGlyphIcon path="M13.132 1.977a1.75..." />

// Customized
<GradientGlyphIcon
  path="M13.132 1.977a1.75..."
  stops={[
    { offset: '0%', color: '#FFF8E6' },
    { offset: '50%', color: '#19FFBE' },
    { offset: '100%', color: '#FFF8E6' },
  ]}
  glowColor="#53FFCB"
  glowRadius={2}
  strokeColor="rgba(255,255,255,0.3)"
  strokeWidth={0.5}
  animationDuration={0.6}
  className="size-10"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `path` | `string` | **required** | SVG path `d` attribute |
| `viewBox` | `string` | `"0 0 24 24"` | SVG viewBox |
| `stops` | `GradientStop[]` | warm→green→warm | Gradient color stops. First and last colors should match for seamless animation. |
| `glowColor` | `string` | `#53FFCB` | Outer glow color |
| `glowRadius` | `number` | `1.5` | Glow blur radius (SVG units) |
| `strokeColor` | `string` | `rgba(255,255,255,0.25)` | Border stroke color |
| `strokeWidth` | `number` | `0.5` | Border stroke width |
| `animationDuration` | `number` | `0.5` | Hover sweep duration in seconds |
| `className` | `string` | — | Additional classes (size is `size-8` by default) |

### How it works

- **Gradient fill**: SVG `<linearGradient>` with `spreadMethod="repeat"` tiles the gradient along its diagonal. The stops are arranged to loop seamlessly (first and last colors match).
- **Glow**: SVG `<filter>` with `<feGaussianBlur>` + `<feFlood>` composited behind the icon shape.
- **Border**: SVG `stroke` on the path with `strokeLinejoin="round"`.
- **Hover animation**: SMIL `<animateTransform>` translates the gradient by one full period on hover. Because the gradient repeats, start and end frames are visually identical — seamless loop.

### Getting SVG paths from @posthog/icons

To extract a path from an npm icon for use with this component:

```js
node -e "
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { IconHomeFilled } = require('@posthog/icons');
console.log(renderToStaticMarkup(React.createElement(IconHomeFilled)));
"
```

Copy the `d` attribute from the output `<path>` element.

## AppIcon

Renders image-based app icons from the `PRODUCT_ICON_MAP`. Supports skin variants (classic/modern). See `AppIcon.tsx` for the full icon registry.

## AppLink

Wraps any icon (AppIcon, image URL, React element, or component) in a clickable figure with a label. Handles URL resolution, drag prevention, and orientation (row/column layout).
