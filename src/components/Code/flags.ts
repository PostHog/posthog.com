/**
 * Gates the PostHog Desktop launch: download CTAs in place of the waitlist, and
 * "available now" copy in place of "coming soon". Ships at 0% rollout so the
 * change can merge ahead of launch day.
 *
 * When this hits 100%, delete the flag along with every `FeatureFlagged`
 * wrapper that references it, the fallback branches, and `DownloadContent`.
 */
export const DESKTOP_LAUNCH_FLAG = 'posthog-desktop-launch'
