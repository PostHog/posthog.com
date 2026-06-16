# EarlyAccessOptIn

A small opt-in button that points visitors at a PostHog **early access feature in the app**, where the signed-in user can join a beta.

```tsx
import EarlyAccessOptIn from 'components/EarlyAccessOptIn'

// Gathering interest before the beta opens:
<EarlyAccessOptIn to="https://us.posthog.com/early_access_features/<id>" state="register_interest" />

// Beta is open, people can request access:
<EarlyAccessOptIn to="https://us.posthog.com/early_access_features/<id>" state="request_access" />
```

It's used in the header of product landing pages via `SlidesTemplate`'s `rightActionButtons` prop – see `src/pages/mcp-analytics/index.tsx`.

## State drives the CTA

An early access feature can be in one of two states, which sets the default button copy:

| `state`             | Maps to app stage | Default CTA          | Use when                                        |
| ------------------- | ----------------- | -------------------- | ----------------------------------------------- |
| `register_interest` | `concept`         | "Register interest"  | Gathering interest before the beta opens.       |
| `request_access`    | `beta`            | "Get early access"   | The beta is open and people can ask to join.    |

Pass `label` to override the copy for either state.

## Why it's a link, not a local enrollment

The obvious implementation would be to call `posthog.updateEarlyAccessFeatureEnrollment(flagKey, true)` on click and flip the flag right here on the marketing site. **Don't do that.**

Logins are **not shared** between `posthog.com` and the PostHog app. The PostHog instance running on the marketing site identifies the visitor as an anonymous website person – almost never the same identity as the user logged into the app. Enrolling that website person would:

- record the opt-in against the wrong (anonymous) person, and
- have no effect on the flag the app actually evaluates for the real user.

So instead, this component is a plain link to the early access feature in the app. The user follows it, lands in the app where they're authenticated, and opts into the beta there – against the identity that matters.

## Props

| Prop        | Type                                       | Default            | Notes                                                              |
| ----------- | ------------------------------------------ | ------------------ | ------------------------------------------------------------------ |
| `to`        | `string` (required)                        | –                  | URL of the early access feature in the app. Must point at the app. |
| `state`     | `'register_interest' \| 'request_access'`  | `'request_access'` | Sets the default CTA copy (see above).                             |
| `label`     | `string`                                   | label for `state`  | Override the CTA copy.                                             |
| `className` | `string`                                   | `''`               | Extra classes for the button.                                     |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`     | `'md'`             | Button size.                                                      |

## Finding the `to` URL

In the app, open the early access feature you want people to join and copy its URL – it looks like `https://us.posthog.com/early_access_features/<id>`. That page is where a signed-in user registers interest / enrolls.
