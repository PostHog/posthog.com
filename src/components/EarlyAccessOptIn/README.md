# EarlyAccessOptIn

A small opt-in button that points visitors at a PostHog **early access feature in the app**, where the signed-in user can join a beta.

```tsx
import EarlyAccessOptIn from 'components/EarlyAccessOptIn'

<EarlyAccessOptIn to="https://us.posthog.com/early_access_features/<id>" label="Get early access" />
```

It's used in the header of product landing pages via `SlidesTemplate`'s `rightActionButtons` prop — see `src/pages/mcp-analytics/index.tsx`.

## Why it's a link, not a local enrollment

The obvious implementation would be to call `posthog.updateEarlyAccessFeatureEnrollment(flagKey, true)` on click and flip the flag right here on the marketing site. **Don't do that.**

Logins are **not shared** between `posthog.com` and the PostHog app. The PostHog instance running on the marketing site identifies the visitor as an anonymous website person — almost never the same identity as the user logged into the app. Enrolling that website person would:

- record the opt-in against the wrong (anonymous) person, and
- have no effect on the flag the app actually evaluates for the real user.

So instead, this component is a plain link to the early access feature in the app. The user follows it, lands in the app where they're authenticated, and opts into the beta there — against the identity that matters.

## Props

| Prop        | Type                                   | Default              | Notes                                                                 |
| ----------- | -------------------------------------- | -------------------- | --------------------------------------------------------------------- |
| `to`        | `string` (required)                    | —                    | URL of the early access feature in the app. Must point at the app.    |
| `label`     | `string`                               | `'Get early access'` | Button copy.                                                          |
| `className` | `string`                               | `''`                 | Extra classes for the button.                                        |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`               | Button size.                                                          |

## Finding the `to` URL

In the app, open the early access feature you want people to join and copy its URL — it looks like `https://us.posthog.com/early_access_features/<id>`. That page is where a signed-in user registers interest / enrolls.
