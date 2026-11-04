// Shared surface classes — full literal strings so Tailwind JIT picks up every class.

/** In-content cards */
export const WINDOW_BG = 'bg-primary/75 backdrop-blur-3xl transform-gpu'

export const WINDOW_SCHEME = 'tertiary'

/** Reader sidebar overlays */
export const PANEL_BG = 'bg-primary transform-gpu'

/** Taskbar — solid, same --bg as the open windows */
export const TASKBAR_BG = 'bg-primary transform-gpu'

/** Promote a compositor layer while the taskbar is moving */
export const MOTION_LAYER = 'will-change-transform'
