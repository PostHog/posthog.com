# WaitlistForm

A thin wrapper around [`SurveySignup`](../SurveySignup/README.md) preconfigured for the PostHog Code waitlist. Defaults to the "PostHog Code waitlist" survey and PostHog Code's concept-stage Early Access Feature flag (`twig` — the EAF is named "PostHog Code" but the flag key is `twig`); other products pass their own `surveyId`, `productHandle`, `productName`, and `flagKey` (see `src/pages/replay-vision.tsx`).

## What it captures on submit

Everything `SurveySignup` captures — `survey sent`, the `$feature_enrollment_update` enrollment event (stage `concept`, when a `flagKey` resolves), and the `email` person property — see [its README](../SurveySignup/README.md) for details. On top of that, this wrapper fires `subscribe_to_product_updates` with the email and selected product.

## Props

| Prop               | Type      | Default               | Notes                                                                                                                                                   |
| ------------------ | --------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `productHandle`    | `string`  | `'posthog_code'`      | Product data lookup via `useProduct`, used by the `subscribe_to_product_updates` event.                                                                 |
| `productName`      | `string`  | `'PostHog Code'`      | Used in success copy.                                                                                                                                   |
| `surveyId`         | `string`  | PostHog Code's survey | PostHog Survey to record the email against.                                                                                                             |
| `surveyQuestionId` | `string`  | —                     | Defaults to PostHog Code's question id only when using its survey.                                                                                      |
| `flagKey`          | `string`  | —                     | Concept-stage EAF flag key for the enrollment event. Defaults to `twig` only when using the PostHog Code survey; other callers must pass it explicitly. |
| `autoFocus`        | `boolean` | `false`               |                                                                                                                                                            |
| `confetti`         | `boolean` | `true`                | Triggers app-wide confetti via `useApp().setConfetti`.                                                                                                  |
| `showTitle`        | `boolean` | `true`                | Shows the "Join the waitlist" heading.                                                                                                                  |
| `buttonLabel`      | `string`  | `'Get updates'`       |                                                                                                                                                            |
| `showDiscord`      | `boolean` | `true`                | Shows a "Join our Discord" link in the success state.                                                                                                   |
