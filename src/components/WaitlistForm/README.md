# WaitlistForm

A no-login email form for joining a coming-soon product's waitlist. Defaults to PostHog Desktop; other products pass their own `productHandle`, `productName`, and `surveyId` (see `src/pages/replay-vision.tsx`).

## What it captures on submit

Everything `SurveySignup` captures — `survey sent`, the `$feature_enrollment_update` enrollment event (stage `concept`, when a `flagKey` resolves), and the `email` person property — see [its README](../SurveySignup/README.md) for details. On top of that, this wrapper fires `subscribe_to_product_updates` with the email and selected product.

## Props

| Prop            | Type      | Default          | Notes                                                                                                                              |
| --------------- | --------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `productHandle` | `string`  | `'posthog_code'` | Product data lookup via `useProduct`.                                                                                              |
| `productName`   | `string`  | `'PostHog Desktop'` | Used in success copy.                                                                                                              |
| `surveyId`      | `string`  | —                | PostHog Survey to record the email against. No survey event fires when omitted.                                                    |
| `flagKey`       | `string`  | —                | Feature flag key of the concept-stage Early Access Feature. Defaults to `twig` (PostHog Desktop's flag) only when `productHandle` is `posthog_code`; other products must pass it explicitly or no enrollment event fires. |
| `autoFocus`     | `boolean` | `false`          |                                                                                                                                      |
| `confetti`      | `boolean` | `true`           | Triggers app-wide confetti via `useApp().setConfetti`.                                                                              |
| `showTitle`     | `boolean` | `true`           | Shows the "Join the waitlist" heading.                                                                                              |
| `buttonLabel`   | `string`  | `'Get updates'`  |                                                                                                                                      |
| `showDiscord`   | `boolean` | `true`           | Shows a "Join our Discord" link in the success state.                                                                               |
