# Feature flagged

Renders its children only when a PostHog feature flag is enabled for the current visitor, with an optional fallback for everyone else. Use it to merge unreleased copy or UI into `master` behind a 0% rollout, then flip the flag to ship.

```tsx
import { FeatureFlagged } from 'components/FeatureFlagged'

<FeatureFlagged flag="posthog-desktop-launch" fallback={<WaitlistForm />}>
    <DownloadButtons />
</FeatureFlagged>
```

MDX files can import it the same way.

| Prop       | Type              | Default | Description                                      |
| ---------- | ----------------- | ------- | ------------------------------------------------ |
| `flag`     | `string`          | –       | Key of the feature flag that gates `children`     |
| `children` | `React.ReactNode` | –       | Rendered when the flag is enabled                 |
| `fallback` | `React.ReactNode` | `null`  | Rendered when the flag is off or not yet resolved |

Flags resolve in the browser, so this **fails closed**: the fallback is what renders during SSR and until [`useActiveFeatureFlags`](../../hooks/useActiveFeatureFlags.ts) reports in. Gated content never flashes to visitors who shouldn't see it, at the cost of a beat before it appears for those who should. Two consequences: the fallback is what crawlers index, so don't gate anything you need in the static HTML for SEO, and a flag at 100% still renders the fallback for that first beat.

When a flag reaches 100%, delete the wrapper along with its fallback branch and remove the flag in PostHog.
