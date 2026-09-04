# HeroCopy

The homepage hero headline and body copy, as an A/B test. The `homepage-hero-copy` feature flag
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

| Variant id  | Headline                          | Body                                                      |
| ----------- | --------------------------------- | --------------------------------------------------------- |
| `control`   | Shift your product into ...       | PostHog already knows your customers ...                  |
| `variant-1` | Make your product self-driving    | PostHog instruments your codebase ...                     |
| `variant-2` | Shift your product into ...       | PostHog agents generate reports ...                       |
| `variant-3` | Make your product self-driving    | PostHog already has your analytics and errors ...          |

To add a variant, add an entry to `HERO_COPY_VARIANTS` and add a variant with the same key to the
feature flag. An unknown or missing flag value falls back to `DEFAULT_HERO_COPY_VARIANT`, which is
`control`.

Each body gets one highlight annotation and one underline annotation, in the same style as the
control body. This keeps the animation the same in all variants, so the test measures the words and
not the motion.

## Server-side rendering

Both components use [`RenderInClient`](../../RenderInClient), because flags resolve in the browser.
The placeholder is the control copy, not `null`. The hero holds the page's only `h1`, and it must be
in the server-rendered HTML for SEO. The cost is that a visitor in a test variant sees the control
copy until the flags resolve, and then sees the copy change.
