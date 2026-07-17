// OS window chrome — full literal strings so Tailwind JIT picks up every class.
// Default (heaterMode): frosted glass with blur. Reduce transparency: solid bg-primary, no blur.
// `reduce-transparency:` is a custom variant for prefers-reduced-transparency (macOS).

/** Default — opaque, no blur */
export const WINDOW_BG = 'bg-primary transform-gpu reduce-transparency:!bg-primary'
export const PANEL_BG = 'bg-primary transform-gpu reduce-transparency:!bg-primary'

/** Taskbar — always blurred (unchanged from the original frosted taskbar) */
export const TASKBAR_BG =
    'bg-primary/50 backdrop-blur-3xl transform-gpu reduce-transparency:!bg-primary reduce-transparency:backdrop-blur-none'

/** Frosted glass (windows + sidebar overlays) — default when reduce transparency is off */
export const HEATER_WINDOW_BG =
    'bg-primary/75 backdrop-blur-3xl transform-gpu reduce-transparency:!bg-primary reduce-transparency:backdrop-blur-none'
export const HEATER_PANEL_BG =
    'bg-primary/75 dark:bg-primary backdrop-blur-3xl transform-gpu reduce-transparency:!bg-primary reduce-transparency:backdrop-blur-none'

/** Promote compositor layers while a surface is moving */
export const MOTION_LAYER = 'will-change-transform'
export const HEATER_MOTION_LAYER = 'will-change-[transform,backdrop-filter]'

export const getWindowSurfaceBg = (heaterMode?: boolean) => (heaterMode ? HEATER_WINDOW_BG : WINDOW_BG)
export const getTaskbarSurfaceBg = () => TASKBAR_BG
export const getPanelSurfaceBg = (heaterMode?: boolean) => (heaterMode ? HEATER_PANEL_BG : PANEL_BG)
export const getSurfaceMotionLayer = (heaterMode?: boolean, active?: boolean) =>
    active ? (heaterMode ? HEATER_MOTION_LAYER : MOTION_LAYER) : ''
/** Taskbar always blurs — promote backdrop-filter while animating. */
export const getTaskbarMotionLayer = (active?: boolean) => (active ? HEATER_MOTION_LAYER : '')

/** @deprecated Use getWindowSurfaceBg() */
export const FROSTED_WINDOW_BG = WINDOW_BG
/** @deprecated Use getTaskbarSurfaceBg() */
export const FROSTED_TASKBAR_BG = TASKBAR_BG
/** @deprecated Use getPanelSurfaceBg() */
export const FROSTED_PANEL_BG = PANEL_BG
/** @deprecated Use getSurfaceMotionLayer() */
export const FROSTED_MOTION_LAYER = MOTION_LAYER
