// Window settings for routes and dialogs. A module of its own so lib/navigation can read it without
// importing the app state.
export interface AppSetting {
    size?: {
        min: { width: number; height: number }
        fixed?: boolean
        autoHeight?: boolean
    }
    modal?: {
        type: 'standard' | 'side' | 'floating'
    }
    closeOnEscape?: boolean
    toolbar?: boolean
    hideTitle?: boolean
}

// Per-window settings, keyed by route or dialog key. A `fixed` size opens as a dialog over the page
// (a route opens through the `?dialog=` parameter, see lib/navigation).
export const appSettings: Record<string, AppSetting> = {
    '/talk-to-a-human': {
        size: { min: { width: 500, height: 500 }, fixed: true, autoHeight: true },
        modal: { type: 'standard' },
    },
    '/merch/orders': { size: { min: { width: 470, height: 299 }, fixed: true, autoHeight: true } },
    'pricing-free-tier': {
        size: { min: { width: 535, height: 400 }, fixed: true, autoHeight: true },
        modal: { type: 'standard' },
    },
    'pricing-event-types': {
        size: { min: { width: 800, height: 400 }, fixed: true, autoHeight: true },
        modal: { type: 'standard' },
    },
    'pricing-all-rates': {
        size: { min: { width: 800, height: 400 }, fixed: true, autoHeight: true },
        modal: { type: 'standard' },
    },
    '/signup': { size: { min: { width: 900, height: 750 }, fixed: true } },
    '/connect/posthog/redirect': { size: { min: { width: 425, height: 250 }, fixed: true, autoHeight: true } },
    '/display-options': {
        size: { min: { width: 600, height: 550 }, fixed: true, autoHeight: true },
        toolbar: true,
        closeOnEscape: true,
    },
    '/vibe-check': { size: { min: { width: 750, height: 575 }, fixed: true }, closeOnEscape: true },
    'research-talk': { size: { min: { width: 960, height: 682 }, autoHeight: true }, modal: { type: 'standard' } },
    '/demo': {
        size: { min: { width: 960, height: 682 }, fixed: true, autoHeight: true },
        toolbar: true,
        modal: { type: 'standard' },
    },
    '/changelog-video': { size: { min: { width: 960, height: 682 }, autoHeight: true } },
    '/videos/play': { size: { min: { width: 960, height: 480 }, autoHeight: true } },
    '/spicy.mov': { toolbar: true },
    'ask-max': { modal: { type: 'floating' } },
    'community-auth-signin': { size: { min: { width: 470, height: 299 }, fixed: true, autoHeight: true } },
    'community-auth-register': { size: { min: { width: 470, height: 299 }, fixed: true, autoHeight: true } },
    search: { size: { min: { width: 550, height: 72 }, fixed: true, autoHeight: true } },
    '/reset-password': { size: { min: { width: 470, height: 299 }, fixed: true, autoHeight: true } },
    'community-auth-forgot-password': { size: { min: { width: 470, height: 299 }, fixed: true, autoHeight: true } },
    share: { size: { min: { width: 500, height: 500 }, fixed: true, autoHeight: true } },
    'media-upload': { toolbar: true, modal: { type: 'standard' } },
    'hedgehog-generator': { size: { min: { width: 550, height: 650 }, autoHeight: true }, modal: { type: 'standard' } },
    'cool-tech-jobs-issue': { size: { min: { width: 500, height: 500 }, fixed: true, autoHeight: true } },
    'signup-embed': { size: { min: { width: 500, height: 400 }, fixed: true } },
    'ask-a-question': { size: { min: { width: 600, height: 500 }, fixed: true, autoHeight: true } },
    'side-project-form': { size: { min: { width: 560, height: 400 }, fixed: true, autoHeight: true } },
    'application-success': { size: { min: { width: 575, height: 500 }, fixed: true, autoHeight: true } },
    'edit-roadmap': { modal: { type: 'standard' } },
    '/achievements/manage': {
        size: { min: { width: 550, height: 700 }, fixed: true, autoHeight: true },
        toolbar: true,
    },
    '/community/achievements': { modal: { type: 'standard' } },
    '/community/reputation': {
        size: { min: { width: 500, height: 1000 }, autoHeight: true },
        modal: { type: 'standard' },
    },
    '/fm': { size: { min: { width: 1100, height: 660 }, fixed: true } },
    'fm/mixtapes': { size: { min: { width: 450, height: 709 }, fixed: true } },
    '/fm/mixtapes/new': { size: { min: { width: 850, height: 597 }, fixed: true } },
    '/fm/mixtapes/edit/:id': { size: { min: { width: 850, height: 597 }, fixed: true } },
    'fm/dance-mode': { size: { min: { width: 500, height: 500 }, fixed: true } },
    '/merch': { toolbar: true, hideTitle: true },
    '/trash': { toolbar: true },
    '/ai': { toolbar: true },
    '/hog': { toolbar: true },
    '/changelog': { toolbar: true },
    '/feet-pics': { toolbar: true },
}
