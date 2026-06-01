# StartupsCTA

A compact call-to-action banner promoting the [PostHog for Startups](/startups) program.

## Usage

```tsx
import StartupsCTA from 'components/StartupsCTA'

<StartupsCTA />
```

## Where it's used

Rendered at the top of the `/blog/categories/startups` page via `src/templates/BlogCategory.tsx`,
gated on `slug === 'startups'`. This category page ranks well in organic search for startup-related
queries and is a high-intent entry point for founders, so the CTA points them straight to the
startup program rather than leaving them in the blog listing.

## Notes

- Program details (credit amount, merch value, partner perks) mirror the copy on the
  `/startups` page (`src/pages/startups/[...slug].tsx`). If the offer changes there, update it here too.
- Links to `/startups` using the shared `CallToAction` component.
