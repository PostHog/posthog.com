import React from 'react'
import { capitalizeFirstLetter, cn } from '../../../utils'

type KeySize = 'sm' | 'md'
type Platform = 'mac' | 'other'
export type KbdProps = React.HTMLAttributes<HTMLElement> & { size?: KeySize }
export type ShortcutProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
    keys: readonly string[]
    size?: KeySize
    platform?: Platform
}

type KeyLabel = [symbol: string, name: string]

const arrowKeys: Record<string, KeyLabel> = {
    arrowup: ['↑', 'Up arrow'],
    arrowdown: ['↓', 'Down arrow'],
    arrowleft: ['←', 'Left arrow'],
    arrowright: ['→', 'Right arrow'],
    up: ['↑', 'Up arrow'],
    down: ['↓', 'Down arrow'],
    left: ['←', 'Left arrow'],
    right: ['→', 'Right arrow'],
}

const sharedKeys: Record<string, KeyLabel> = {
    ...arrowKeys,
    escape: ['Esc', 'Escape'],
    esc: ['Esc', 'Escape'],
    space: ['Space', 'Space'],
}

const macKeys: Record<string, KeyLabel> = {
    ...sharedKeys,
    meta: ['⌘', 'Command'],
    cmd: ['⌘', 'Command'],
    ctrl: ['⌃', 'Control'],
    alt: ['⌥', 'Option'],
    option: ['⌥', 'Option'],
    shift: ['⇧', 'Shift'],
    enter: ['↵', 'Return'],
    tab: ['⇥', 'Tab'],
    backspace: ['⌫', 'Delete'],
    delete: ['⌦', 'Forward delete'],
}

const otherKeys: Record<string, KeyLabel> = {
    ...sharedKeys,
    meta: ['Ctrl', 'Control'],
    cmd: ['Ctrl', 'Control'],
    ctrl: ['Ctrl', 'Control'],
    alt: ['Alt', 'Alt'],
    option: ['Alt', 'Alt'],
    shift: ['Shift', 'Shift'],
    enter: ['Enter', 'Enter'],
    tab: ['Tab', 'Tab'],
    backspace: ['Backspace', 'Backspace'],
    delete: ['Del', 'Delete'],
}

const symbolKeys = new Set(Object.values(macKeys).map(([symbol]) => symbol))

function keyLabel(key: string, platform: Platform): KeyLabel {
    const known = (platform === 'mac' ? macKeys : otherKeys)[key.toLowerCase()]
    if (known) return known
    const display = capitalizeFirstLetter(key)
    return [display, display]
}

const keycapSizes: Record<KeySize, string> = {
    sm: 'h-[18px] min-w-[18px] px-[3px] text-[11px]',
    md: 'h-[22px] min-w-[22px] px-[5px] text-[12px]',
}

const Keycap = React.forwardRef<HTMLElement, KbdProps>(function Kbd({ size = 'md', className, ...props }, ref) {
    return (
        <kbd
            ref={ref}
            className={cn(
                'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[4px] border border-b-2 border-[rgb(var(--text-primary)/0.16)] border-b-[rgb(var(--text-primary)/0.3)] bg-white/60 align-middle font-code font-normal leading-none text-secondary shadow-[inset_0_1px_0_rgb(255_255_255/0.6)] dark:bg-white/[0.08] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]',
                keycapSizes[size],
                className
            )}
            {...props}
        />
    )
})

const Shortcut = React.forwardRef<HTMLSpanElement, ShortcutProps>(function Shortcut(
    { keys, size = 'md', platform = 'mac', className, ...props },
    ref
) {
    const labels = keys.map((key) => keyLabel(key, platform))
    return (
        <span
            ref={ref}
            role="group"
            aria-label={labels.map(([, name]) => name).join(' + ')}
            className={cn('inline-flex items-center gap-1 align-middle', className)}
            {...props}
        >
            {labels.map(([symbol], index) => (
                <Keycap
                    key={index}
                    size={size}
                    aria-hidden="true"
                    className={cn(symbolKeys.has(symbol) && symbol.length === 1 && 'font-sans')}
                >
                    {symbol}
                </Keycap>
            ))}
        </span>
    )
})

export const Kbd = Object.assign(Keycap, { Shortcut })
