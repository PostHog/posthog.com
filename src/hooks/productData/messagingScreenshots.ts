// Preview only: the transactional emails and messaging screenshots load from PostHog/pr-assets until they are
// uploaded to Cloudinary under these public IDs. Delete PREVIEW_IMAGES before merge to serve them from Cloudinary.
const PREVIEW_IMAGES: Record<string, string> = {
    messaging_audience_dark:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/7c40f0fd-cc6f-45bb-8d16-e23764fa30a4.png',
    messaging_audience_light:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/1d0e59e8-ef31-4058-ad79-9095be146c10.png',
    messaging_broadcast_results_dark:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/c3133fdc-f0e7-4599-918d-dd284462c2b1.png',
    messaging_broadcast_results_light:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/7be69352-08ee-4075-b859-52ee7df7a3fb.png',
    messaging_broadcasts_dark:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/8bed685f-d42c-4c64-ae62-b9cb6caaf22c.png',
    messaging_broadcasts_light:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/61186bc9-a48d-4e78-bd9c-0428240caaf5.png',
    messaging_channels_dark:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/e93b4fe9-f9d2-453b-9c72-56f93e9b771b.png',
    messaging_channels_light:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/5ee17125-daca-4383-8df9-4c6a27c5f75e.png',
    messaging_drip_campaign_dark:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/ac1969c1-5184-4602-a1d1-cf110ed56cd5.png',
    messaging_drip_campaign_light:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/a093910b-e50a-4afc-a64b-184ca979dd14.png',
    messaging_email_editor_dark:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/a9765278-a4e6-49c7-9b69-cc11cbc0776b.png',
    messaging_email_editor_light:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/cad6ab9f-f1d6-4424-ad18-0a2ea5760148.png',
    messaging_hero_dark:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/8a18c2d0-20c7-4839-bcaf-b89e0120fa87.png',
    messaging_hero_light:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/f5540226-99f2-4a8e-a299-ba22f667048f.png',
    messaging_opt_outs_dark:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/30b39a19-5e44-4610-b885-37080c30c9c9.png',
    messaging_opt_outs_light:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/98803c4c-a8f4-45a9-b78f-b84151261430.png',
    messaging_trigger_dark:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/778309ae-b499-48a0-bf5b-a018ed001256.png',
    messaging_trigger_light:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/90185114-544f-4954-9323-ecfa5e97eb14.png',
    transactional_emails_design_dark:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/a36c9a2b-8bff-4f73-bce6-ff127be04eb8.png',
    transactional_emails_design_light:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/f7cc8dab-661a-4862-b66e-d1b559dae27f.png',
    transactional_emails_hero_dark:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/5009ee20-29d5-49ac-bf40-17d9f3c3bbd5.png',
    transactional_emails_hero_light:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/48c0bf15-8362-4345-9960-f867247a12ed.png',
    transactional_emails_person_events_dark:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/0dcc8f5d-f03d-4874-898c-dca6ce185c3f.png',
    transactional_emails_person_events_light:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/60d505a6-9cb0-4304-bba3-8b39925c0708.png',
    transactional_emails_reputation_dark:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/10c1fe7e-4816-4535-ab5a-0785dd804865.png',
    transactional_emails_reputation_light:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/30d9db7e-1b3c-4fb2-a329-091424a70189.png',
    transactional_emails_sends_dark:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/aba63ead-b234-4a16-8be6-595e7d66805b.png',
    transactional_emails_sends_light:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/04bdd82f-5132-4726-ae8f-ed81ffb7319a.png',
    transactional_emails_sensitive_dark:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/507fa2fe-9513-4722-baae-ab1d3babaeae.png',
    transactional_emails_sensitive_light:
        'https://raw.githubusercontent.com/PostHog/pr-assets/aabd03ee278c13ce477ce8a6d9b15d4a735ef58b/2026/11/2b3aeede-2eec-4019-a971-513249e7bdd4.png',
}

export const cloudinary = (name: string): string =>
    PREVIEW_IMAGES[name] ?? `https://res.cloudinary.com/dmukukwp6/image/upload/${name}.png`
