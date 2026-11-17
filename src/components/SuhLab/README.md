# Hedgehog measurement laboratory

`SuhLab` adds two calculators and two physics experiments to `/standard-unit-of-hedgehog`. It uses the existing OS form, button, slider, and fieldset components. It has no external data requirements or new dependencies.

## Units and calculations

`physics.ts` defines one hedgehog as seven inches (0.1778 meters), one snuffle as one second, and Earth gravity as 9.81 m/s². The page and laboratory share this length constant.

- The length converter accepts centimeters, meters, inches, feet, or hedgehogs.
- The box calculator accepts dimensions in meters and returns footprint area in h² and volume in h³. It uses squared and cubed length conversion factors.
- Free fall starts at rest. Distance is ½gt², speed is gt, and contact time is √(2H/g). Time stops at contact. The final speed is the speed immediately before contact.
- The pendulum uses the small-angle approximation T = 2π√(L/g), with a 10° initial angle. Its frequency is 1/T in hertzog. String length determines the period. The illustration does not indicate scale.

Both simulations exclude air resistance. The pendulum model assumes a massless string and a point mass. It excludes friction. The page links to the equation sources.

## Inputs and playback

Calculators keep text input state so blank inputs do not turn into zero. Values must be finite and between zero and one million. Invalid input shows a linked error message and suppresses the result. Experiment sliders constrain height and length to positive values.

Only one experiment plays at a time. Playback uses elapsed wall-clock time and cancels its animation frame on pause or unmount. Parameter changes stop playback and reset the affected experiment. Time sliders allow manual inspection, including when reduced motion disables playback. Nothing animates automatically.

The page's static examples also use `HedgehogRuler`. Its `value` parameter accepts a finite, nonnegative number in hedgehogs. Above 30 hedgehogs, each icon represents a power-of-ten multiple. A label below the ruler specifies this multiple. The ruler clips the final icon to show a fraction. It shows a maximum of 30 icons. The accessible image label gives the full measurement.

## Validation

Run the focused tests from the repository root with Node 22:

```sh
pnpm exec node --test src/components/SuhLab/physics.test.ts
```

Browser checks should cover unit selection, blank/negative/large inputs, zero dimensions, playback/pause/reset, slider keyboard controls, reduced motion, both themes, and narrow/wide app windows. Motion evidence belongs outside the source tree with other PR screenshots.
