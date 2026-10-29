# TouristInfoCallout

A "Tourist info" callout for visitors who arrive from a partner's docs. It welcomes them to PostHog and links to sign-up and the docs.

It copies the surface of `MCPAnalyticsAd` in `src/components/MCPLeaderboard/index.tsx` (`bg-accent`, `border-primary`, two `OSButton`s at `size="md"`), without the ad badge and the feature list.

## Usage

```mdx
import TouristInfoCallout from 'components/TouristInfoCallout'

<TouristInfoCallout className="mb-8" />
```

## Props

| Prop        | Type     | Description                           |
| ----------- | -------- | ------------------------------------- |
| `className` | `string` | Classes for the outer `aside`, for spacing. |

## Layout

The `HedgehogTourist` illustration shows only when the `reader-content` container is `@2xl` or wider.
