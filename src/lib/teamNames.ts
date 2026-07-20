const POSTHOG_CODE_TEAM_NAME = 'PostHog Code'
const POSTHOG_DESKTOP_TEAM_NAME = 'PostHog Desktop'
const POSTHOG_CODE_TEAM_SLUG = 'posthog-code'
const POSTHOG_DESKTOP_TEAM_SLUG = 'posthog-desktop'

export const getTeamDisplayName = (name: string): string =>
    name === POSTHOG_CODE_TEAM_NAME ? POSTHOG_DESKTOP_TEAM_NAME : name

export const getTeamSlug = (slug: string): string =>
    slug === POSTHOG_CODE_TEAM_SLUG ? POSTHOG_DESKTOP_TEAM_SLUG : slug

export const getTeamCmsName = (name: string): string =>
    name === POSTHOG_DESKTOP_TEAM_NAME ? POSTHOG_CODE_TEAM_NAME : name
