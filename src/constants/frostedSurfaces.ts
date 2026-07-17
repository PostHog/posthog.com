// Frosted OS chrome — full literal strings so Tailwind JIT picks up every class.
// `reduce-transparency:` is a custom variant for prefers-reduced-transparency (macOS).

/** Promote blur layers only while a surface is animating or being dragged. */
export const FROSTED_MOTION_LAYER = 'will-change-[transform,backdrop-filter]'

/** App window backgrounds */
export const FROSTED_WINDOW_BG =
    'bg-primary/75 backdrop-blur-xl transform-gpu reduce-transparency:!bg-primary reduce-transparency:backdrop-blur-none'

/** Taskbar / menu bar */
export const FROSTED_TASKBAR_BG =
    'bg-primary/50 backdrop-blur-xl transform-gpu reduce-transparency:!bg-primary reduce-transparency:backdrop-blur-none'

/** Reader sidebar panels and floating controls */
export const FROSTED_PANEL_BG =
    'bg-primary/75 dark:bg-primary backdrop-blur-xl transform-gpu reduce-transparency:!bg-primary reduce-transparency:backdrop-blur-none'
