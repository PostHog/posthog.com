// PostHog employees are identified by their @posthog.com email domain. They must
// authenticate via OAuth (the backend enforces this); the UI uses this to hide the
// password path and label account settings. Keep in sync with the backend's
// isPostHogEmail in squeak-strapi (oauth-guard.ts).
export const isPostHogEmail = (email?: string | null): boolean =>
    !!email && email.trim().toLowerCase().endsWith('@posthog.com')
