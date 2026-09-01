# LoopGame

A small canvas game for MDX content: the reader draws a loop in one stroke and gets a 0-100 score for how loop-like it is, plus a one-line verdict. Built for the "Are these loops or graphs?" blog post - low scores are declared graphs.

## Usage

Registered as a global MDX shortcode, so any MDX file can use it directly:

```mdx
<LoopGame />
```

No props.

## How scoring works

On pointer release the stroke is scored against an ideal circle:

- **Centroid fit** - the centroid and mean radius of the drawn points define the ideal circle (drawn as a dashed overlay after scoring).
- **Circularity** - RMS deviation of point radii from the mean radius, normalized by the mean radius.
- **Closure** - distance between the stroke's first and last points, relative to the mean radius.
- **Coverage** - total angle swept around the centroid. Under ~260 degrees is called an arc; over ~1.6 laps is called `while(true)`.

`score = 100 x circularity x (0.55 + 0.45 x closure) x coverage`, with early exits (too few points, too small, arc, multi-lap) mapped to fixed low scores and bespoke verdicts.

## Implementation notes

- Pointer events with pointer capture, so it works with mouse and touch; `touch-action: none` stops the page scrolling mid-draw.
- The canvas backing store is sized from its CSS box and `devicePixelRatio` on demand (no ResizeObserver) - resolution is set on the first draw after any resize.
- Stroke color is PostHog red (`#f54e00`), fitted circle PostHog blue (`#1d4aff`), on `bg-primary`, so it reads in both color modes.
- Best score is component state only - it resets on navigation, deliberately (no storage).
- All styling uses project color tokens (`bg-accent`, `bg-primary`, `border-primary`, `text-primary`, `text-secondary`, `text-muted`).
