// OS window chrome — full literal strings so Tailwind JIT picks up every class.
// Default: frosted glass with blur. Reduce transparency: solid bg-primary, no blur.
// `reduce-transparency:` is a custom variant for prefers-reduced-transparency (macOS).

/** Solid opaque — used when reduce transparency is on */
export const WINDOW_BG = 'bg-primary transform-gpu reduce-transparency:!bg-primary'
export const PANEL_BG = 'bg-primary transform-gpu reduce-transparency:!bg-primary'

/** Taskbar — always blurred */
export const TASKBAR_BG =
    'bg-primary/50 backdrop-blur-3xl transform-gpu reduce-transparency:!bg-primary reduce-transparency:backdrop-blur-none'

/** Frosted glass (windows + sidebar overlays) — default when reduce transparency is off */
export const FROSTED_WINDOW_BG =
    'bg-primary/75 backdrop-blur-3xl transform-gpu reduce-transparency:!bg-primary reduce-transparency:backdrop-blur-none'
export const FROSTED_PANEL_BG =
    'bg-primary/75 dark:bg-primary backdrop-blur-3xl transform-gpu reduce-transparency:!bg-primary reduce-transparency:backdrop-blur-none'

/** Promote compositor layers while a surface is moving */
export const MOTION_LAYER = 'will-change-transform'
export const FROSTED_MOTION_LAYER = 'will-change-[transform,backdrop-filter]'

export const getWindowSurfaceBg = (reduceTransparency?: boolean) => (reduceTransparency ? WINDOW_BG : FROSTED_WINDOW_BG)
export const getTaskbarSurfaceBg = () => TASKBAR_BG
export const getPanelSurfaceBg = (reduceTransparency?: boolean) => (reduceTransparency ? PANEL_BG : FROSTED_PANEL_BG)
export const getSurfaceMotionLayer = (reduceTransparency?: boolean, active?: boolean) =>
    active ? (reduceTransparency ? MOTION_LAYER : FROSTED_MOTION_LAYER) : ''
/** Taskbar always blurs — promote backdrop-filter while animating. */
export const getTaskbarMotionLayer = (active?: boolean) => (active ? FROSTED_MOTION_LAYER : '')

/** @deprecated Use TASKBAR_BG / getTaskbarSurfaceBg() */
export const FROSTED_TASKBAR_BG = TASKBAR_BG
