# SurveySignup

A no-login email form that records a sign-up as a PostHog **Survey** response by
firing `posthog.capture('survey sent', { $survey_id, $survey_response: email })`.

This is the single waitlist mechanism on the site. It backs:

- the **/roadmap** "Coming soon" cards (survey id comes from each Early Access Feature's
  `payload.survey_id`),
- the **/code** waitlist (`WaitlistForm`),
- the **managed-warehouse** waitlist (`DuckDBWaitlistSurvey`).

Because every surface fires `survey sent` against the same survey, all sign-ups for a
feature — site or in-app — land in one place: that survey's responses. A PostHog Workflow
can then notify everyone when the feature ships (handled separately).

When `flagKey` is set, a successful submit also mirrors the in-app coming-soon waitlist by
calling `posthog.updateEarlyAccessFeatureEnrollment(flagKey, true, 'concept')`, which fires
`$feature_enrollment_update` with `$feature_flag`, `$feature_enrollment: true`,
`$feature_enrollment_stage: 'concept'`, and `$early_access_feature_name`, and sets the
`$feature_enrollment/<flagKey>: true` person property. The form pre-loads the EAF list via
`usePrimeEarlyAccessFeatures` — posthog-js only attaches the feature name when the list is
in local persistence, and the Customer.io "Waitlist, Alpha, Beta onboarding" flow triggers
only when both the name and stage properties are present. Every submit also sets the
`email` person property so downstream flows can reach the person. Note: the SDK call also
overrides the flag to `true` in the visitor's local persistence — harmless on posthog.com,
which doesn't gate anything on these app flags.

## Props

| Prop               | Type                       | Default                  | Notes |
| ------------------ | -------------------------- | ------------------------ | ----- |
| `surveyId`         | `string`                   | —                        | Survey to record against. If omitted, no survey event fires (form still calls `onSuccess`). |
| `surveyQuestionId` | `string`                   | —                        | When set, also sends ID-based `$survey_response_{id}`; otherwise legacy `$survey_response`. |
| `flagKey`          | `string`                   | —                        | Concept-stage Early Access Feature flag key. When set, submit also fires `$feature_enrollment_update` (stage `concept`). Only pass for concept-stage features — not alphas/betas. |
| `productName`      | `string`                   | —                        | Used in success copy. |
| `title`            | `React.ReactNode`          | —                        | Optional heading above the form (hidden once submitted). |
| `buttonLabel`      | `string`                   | `'Notify me at launch'`  | |
| `successTitle`     | `string`                   | `"You're on the list!"`  | |
| `successMessage`   | `React.ReactNode`          | derived from productName  | |
| `autoFocus`        | `boolean`                  | `false`                  | |
| `confetti`         | `boolean`                  | `true`                   | Triggers app-wide confetti via `useApp().setConfetti`. |
| `showDiscord`      | `boolean`                  | `false`                  | Shows a "Join our Discord" link in the success state. |
| `onSuccess`        | `(email: string) => void`  | —                        | Fires after a successful submit — e.g. to capture an extra analytics event. |
| `className`        | `string`                   | `''`                     | |

## No login, but a person profile is created

There's no login — the email is captured as the survey response. Submitting does, however,
set person properties (`email`, and `$feature_enrollment/<flagKey>` when `flagKey` is set),
which creates a person profile for otherwise-anonymous visitors. That's intentional: it's
what lets enrollment-triggered email flows reach the person.

## Example (roadmap Coming Soon card)

```tsx
<SurveySignup
    surveyId={feature.payload?.survey_id}
    surveyQuestionId={feature.payload?.survey_question_id}
    flagKey={feature.stage === 'concept' ? feature.flagKey : undefined}
    productName={feature.name}
/>
```
