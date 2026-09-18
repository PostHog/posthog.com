# HeroCopy

The homepage hero headline and body copy, as an A/B test. The `homepage-hero-copy-v2` feature flag
selects the variant. This is the copy equivalent of [`HeroCTA`](../HeroCTA), which tests the hero's
call to action with the `homepage-cta` flag.

## Use

```tsx
import { HeroBody, HeroHeadline } from 'components/Home/HeroCopy'
;<HeroHeadline className="@xl:row-start-1 @xl:col-start-1" />
<div className="min-w-0 @xl:row-start-2 @xl:col-start-1">
    <HeroBody />
</div>
```

The headline and the body sit in different cells of the hero grid, so they are two components and
not one. Each component resolves the flag on its own, but both read the same flag value, so a
visitor always gets a matched headline and body. `HeroBody` renders a fragment. Give it a wrapper
element if you need grid or spacing classes.

## Variants

Each variant in `variants.tsx` has an `id` that must be the same as the feature flag variant key,
a `headline` (a `lead` clause and an `emphasis` clause that gets the blue highlight), and a `Body`
component. `HeroBody` adds the "Join 500,000+ teams" line after the variant body, because that line
is the same in all variants.

| Variant id | Headline                         | Body                                                                |
| ---------- | -------------------------------- | ------------------------------------------------------------------- |
| `control`  | Make your product self-driving   | PostHog already has your analytics and errors. Now it ships code... |
| `test`     | Give your agents product context | PostHog combines and stores your analytics, errors, replays...      |

To add a variant, add an entry to `HERO_COPY_VARIANTS` and add a variant with the same key to the
feature flag. An unknown or missing flag value falls back to `DEFAULT_HERO_COPY_VARIANT`, which is
`control`.

Each body gets one highlight annotation and one underline annotation. This keeps the animation the
same in both variants, so the test measures the words and not the motion.

## Server-side rendering

Both components use [`RenderInClient`](../../RenderInClient), because flags resolve in the browser.
The placeholder is the control copy, not `null`. The hero holds the page's only `h1`, and it must be
in the server-rendered HTML for SEO. The placeholder is invisible, so a visitor in the test variant
does not see the control copy flash before the assigned variant paints.

## Exposure

Each slot takes its variant from the variant map that `onFeatureFlags` passes, and not from
`getFeatureFlag`. The distinction matters for the experiment results:

- `getFeatureFlag` records the exposure. If it runs while the flag has no value, for example when
  an ad-blocker stops the flag request or when the browser holds a flag cache that predates the
  flag, posthog-js records a `$feature_flag_called` event with an empty response. The experiment
  then counts a visitor who has both an empty response and a real variant as `$multiple`, and drops
  that visitor from the results.
- The variant map carries the same value but records nothing, so a slot can wait for a real value
  and call `getFeatureFlag` once it has one.

The first real value wins for the rest of the visit. A later flag refresh cannot move a visitor from
one variant to the other, so one visitor contributes one variant to the results.
