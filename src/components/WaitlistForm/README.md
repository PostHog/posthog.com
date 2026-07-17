# WaitlistForm

A no-login email form for joining a coming-soon product's waitlist. Defaults to PostHog Code; other products pass their own `productHandle`, `productName`, and `surveyId` (see `src/pages/replay-vision.tsx`).

## What it captures on submit

1. `survey sent` — when a `surveyId` is provided, records the email as a survey response (`$survey_id`, `$survey_response`).
2. `subscribe_to_product_updates` — with the email and selected product.
3. `$feature_enrollment_update` — when a `flagKey` resolves (see below), mirrors the in-app coming-soon waitlist via `posthog.updateEarlyAccessFeatureEnrollment(flagKey, true, 'concept')`. The event carries `$feature_flag`, `$feature_enrollment: true`, `$feature_enrollment_stage: 'concept'`, and `$early_access_feature_name` (the form pre-loads the EAF list via `usePrimeEarlyAccessFeatures` — posthog-js only attaches the name when the list is in local persistence, and the Customer.io waitlist flow's trigger requires it). It also sets the `$feature_enrollment/<flagKey>: true` person property. Note: the SDK also overrides the flag to `true` in the visitor's local persistence — harmless on posthog.com, which doesn't gate anything on these app flags.
4. `email` person property — set on every submit so downstream flows (e.g. Customer.io triggered by the enrollment event) can reach the person. This creates a person profile for otherwise-anonymous visitors.

## Props

| Prop            | Type      | Default          | Notes                                                                                                                              |
| --------------- | --------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `productHandle` | `string`  | `'posthog_code'` | Product data lookup via `useProduct`.                                                                                              |
| `productName`   | `string`  | `'PostHog Code'` | Used in success copy.                                                                                                              |
| `surveyId`      | `string`  | —                | PostHog Survey to record the email against. No survey event fires when omitted.                                                    |
| `flagKey`       | `string`  | —                | Feature flag key of the concept-stage Early Access Feature. Defaults to `twig` (PostHog Code's flag) only when `productHandle` is `posthog_code`; other products must pass it explicitly or no enrollment event fires. |
| `autoFocus`     | `boolean` | `false`          |                                                                                                                                      |
| `confetti`      | `boolean` | `true`           | Triggers app-wide confetti via `useApp().setConfetti`.                                                                              |
| `showTitle`     | `boolean` | `true`           | Shows the "Join the waitlist" heading.                                                                                              |
| `buttonLabel`   | `string`  | `'Get updates'`  |                                                                                                                                      |
| `showDiscord`   | `boolean` | `true`           | Shows a "Join our Discord" link in the success state.                                                                               |
