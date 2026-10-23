// Shared surface classes — full literal strings so Tailwind JIT picks up every class.

/** In-content cards */
export const WINDOW_BG = 'bg-primary/75 backdrop-blur-3xl transform-gpu'

export const WINDOW_SCHEME = 'tertiary'

/** Reader sidebar overlays */
export const PANEL_BG = 'bg-primary/75 dark:bg-primary backdrop-blur-3xl transform-gpu'

/** Taskbar */
export const TASKBAR_BG = 'bg-primary/50 backdrop-blur-3xl transform-gpu'

/** Promote compositor layers while a surface is moving */
export const MOTION_LAYER = 'will-change-[transform,backdrop-filter]'
