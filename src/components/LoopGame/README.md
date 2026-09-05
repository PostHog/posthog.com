# LoopGame

**Ride the loop hype wave!** is a canvas rollercoaster tracing game for the "Are these loops or graphs?" blog post. It is registered as a global MDX shortcode with no props:

```mdx
<LoopGame />
```

## Playing

Each challenge generates a dashed blue track with one, two, or occasionally three loops (40%, 45%, and 15% of layouts). Trace it from START to FINISH in one stroke using a mouse, pen, or finger. The orange rails are the player's actual drawing, lightly smoothed to remove pointer jitter. Select **Launch Max** to ride those rails.

- **Difficulty** defaults to Easy. Easy adds grip and a 0.12-second bump grace period; Medium reduces both; Hard uses minimal grip and no grace period. Switching difficulty preserves the drawing and resets the ride result.
- **Launch speed** changes the starting momentum. It is locked during a ride.
- **Stop ride** stops the animation; the same rails can be launched again.
- **Clear** removes the drawing and keeps the current guide.
- **New track** generates another layout and resets its suggested launch speed.

The cart must reach FINISH and complete the guide's number of full turns. A straight shortcut is not a win. Results explain whether the cart stalled, lost contact upside down, or hit a bend too fast. Progress shows the proportion of rail traveled and the completed loop count.

## Implementation

`physics.ts` generates tracks, resamples and smooths drawings, and advances the ride. Tracks use a fixed 600 × 450 coordinate space, with samples approximately four units apart. Their arc lengths, tangents, and curvature determine cart position, rotation, and rail contact. Each ride follows stroke order, including at overlapping rails.

The physics is an arcade approximation. On Easy: gravity changes speed along the rail, friction removes energy, and an arcade grip allowance holds the cart through brief negative normal loads (up to 2 g). On Easy, a load below −2 g or above 16 g must persist for more than 0.12 seconds before the cart leaves the track. This makes hand-drawn bumps more forgiving. A detached cart follows a ballistic path. The loop counter measures full net tangent rotations, not circle accuracy. Suggested speeds are tuned to the generated loop sizes.

`index.tsx` owns pointer capture, controls, canvas rendering, and animation. Only the primary pointer can draw, cancellation discards an unfinished drawing, and drawing is disabled during a ride. A `ResizeObserver` preserves drawings and animation through resizing, and a body theme observer repaints for color changes. Both observers and the animation frame are cleaned up on unmount. Animation uses substeps no longer than 1/120 second and clamps elapsed time after a background-tab pause.

The rider reuses the existing superhero Max asset from `src/images/max.png`, loaded once and drawn on a small wheelbase that rotates with the track. The UI uses project colors, container queries, and the shared `OSButton`. Status messages use a live region. Drawing requires a pointing device; the launch, speed, stop, clear, and new-track controls are keyboard accessible. Nothing is persisted across visits.

## Verification

Run with Node 22:

```sh
pnpm exec node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test src/components/LoopGame/physics.test.ts
```

The tests cover 100 generated layouts, successful rides, stalling, derailment, shortcuts, repeated pointer points, empty strokes, and forgiving rides over small tracing wobbles. Browser checks should cover tracing, touch input, cancellation, replay, stop, new tracks, and resizing during a ride. Capture narrow/wide light/dark screenshots and before/after GIFs for visual changes.
