# FeatureFlagged

Renders its children only when a PostHog feature flag is enabled for the current visitor, with an optional fallback for everyone else. Use it to merge unreleased copy, CTAs, or whole sections into `master` behind a 0% rollout, then flip the flag to ship.

```tsx
import { FeatureFlagged } from 'components/FeatureFlagged'

<FeatureFlagged flag="posthog-desktop-launch" fallback={<WaitlistForm />}>
    <DownloadButtons />
</FeatureFlagged>
```

It works in MDX too, since MDX files can import components directly:

```mdx
import { FeatureFlagged } from 'components/FeatureFlagged'

<FeatureFlagged flag="posthog-desktop-launch" fallback={<p>Coming soon.</p>}>
  <p>Available now.</p>
</FeatureFlagged>
```

## Props

| Prop       | Type              | Default | Description                                        |
| ---------- | ----------------- | ------- | -------------------------------------------------- |
| `flag`     | `string`          | –       | Key of the feature flag that gates `children`       |
| `children` | `React.ReactNode` | –       | Rendered when the flag is enabled                   |
| `fallback` | `React.ReactNode` | `null`  | Rendered when the flag is off or not yet resolved   |

## Behavior

Flags resolve in the browser, so this component **fails closed**: during SSR and until `onFeatureFlags` fires, the fallback is what renders. Flagged content never flashes to visitors who shouldn't see it, at the cost of a beat before it appears for those who should.

Because the fallback is what gets server-rendered, avoid gating anything that needs to be in the static HTML for SEO – flag-gated content is invisible to crawlers.

Built on [`useActiveFeatureFlags`](../../hooks/useActiveFeatureFlags.ts), which subscribes to flag changes and returns `null` until they load.

## Cleaning up

Flag gates are temporary. When a flag reaches 100%, delete the `FeatureFlagged` wrapper along with the fallback branch, and remove the flag in PostHog.
