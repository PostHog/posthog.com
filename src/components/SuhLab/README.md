# Hedgehog measurement laboratory

`SuhLab` adds two calculators and two physics experiments to `/standard-unit-of-hedgehog`. It uses the existing OS form, button, slider, and fieldset components. It has no external data requirements or new dependencies.

## Units and calculations

`physics.ts` defines one hedgehog as seven inches (0.1778 meters), one snuffle as one second, and Earth gravity as 9.81 m/s². The page and laboratory share this length constant.

- The length converter accepts centimeters, meters, inches, feet, or hedgehogs.
- The box calculator accepts dimensions in meters and returns footprint area in h² and volume in h³. It uses squared and cubed length conversion factors.
- Free fall starts at rest. Distance is ½gt², speed is gt, and landing time is √(2H/g). Time clamps at landing; the final speed is the speed immediately before impact.
- The pendulum uses the small-angle approximation T = 2π√(L/g), with a 10° release angle. Its frequency is 1/T in hertzog. String length determines the physical period; the drawing is illustrative.

Both experiments omit air resistance. The pendulum also assumes a massless string, a point mass, and no friction. Formula sources are linked in the rendered page.

## Inputs and playback

Calculators keep text input state so blank inputs do not turn into zero. Values must be finite and between zero and one million. Invalid input shows a linked error message and suppresses the result. Experiment sliders constrain height and length to positive values.

Only one experiment plays at a time. Playback uses elapsed wall-clock time and cancels its animation frame on pause or unmount. Parameter changes stop playback and reset the affected experiment. Time sliders allow manual inspection, including when reduced motion disables playback. Nothing animates automatically.

`HedgehogRuler` is also exported for the page's static examples. It takes a nonnegative, finite `value` in hedgehogs. Above 30 hedgehogs, each icon represents a power-of-ten multiple, stated below the ruler. Fractional icons are clipped; at most 30 icons render. The accessible image label always gives the full measurement.

## Validation

Run the focused tests from the repository root with Node 22:

```sh
pnpm exec node --test src/components/SuhLab/physics.test.ts
```

Browser checks should cover unit selection, blank/negative/large inputs, zero dimensions, playback/pause/reset, slider keyboard controls, reduced motion, both themes, and narrow/wide app windows. Motion evidence belongs outside the source tree with other PR screenshots.
