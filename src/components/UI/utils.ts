import React from 'react'
import { cn } from '../../utils'

export const useId: () => string = (React as typeof React & { useId: () => string }).useId

type SyncExternalStore = <Snapshot>(
    subscribe: (onChange: () => void) => () => void,
    getSnapshot: () => Snapshot,
    getServerSnapshot: () => Snapshot
) => Snapshot

export const useSyncExternalStore: SyncExternalStore = (
    React as typeof React & { useSyncExternalStore: SyncExternalStore }
).useSyncExternalStore

export type ClassNameProp<State> = string | ((state: State) => string | undefined) | undefined

export function mergeClassName<State>(baseClassName: string, className: ClassNameProp<State>): ClassNameProp<State> {
    if (typeof className === 'function') {
        return (state: State) => cn(baseClassName, className(state))
    }
    return cn(baseClassName, className)
}

type NamedComponent = { displayName?: string; name?: string }

export function withClassName<Component extends React.ElementType>(
    BaseComponent: Component,
    baseClassName: string,
    defaultProps: Partial<React.ComponentProps<Component>> = {}
): Component {
    const StyledComponent = React.forwardRef<unknown, { className?: ClassNameProp<unknown> }>(function StyledComponent(
        { className, ...props },
        ref
    ) {
        return React.createElement(BaseComponent, {
            ...defaultProps,
            ...props,
            ref,
            className: mergeClassName(baseClassName, className),
        })
    })
    const { displayName, name } = BaseComponent as NamedComponent
    StyledComponent.displayName = displayName ?? name
    return StyledComponent as unknown as Component
}

export const positionerPropNames = [
    'side',
    'sideOffset',
    'align',
    'alignOffset',
    'anchor',
    'arrowPadding',
    'collisionAvoidance',
    'collisionBoundary',
    'collisionPadding',
    'sticky',
    'disableAnchorTracking',
] as const

export type PositionerPropName = (typeof positionerPropNames)[number]

export function splitProps<Props, Key extends keyof Props>(
    props: Props,
    keys: readonly Key[]
): [Pick<Props, Key>, Omit<Props, Key>] {
    const picked: Partial<Pick<Props, Key>> = {}
    const rest: Partial<Props> = { ...props }
    for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            picked[key] = props[key]
        }
        delete rest[key]
    }
    return [picked as Pick<Props, Key>, rest as Omit<Props, Key>]
}

export function assignRef<Element>(ref: React.ForwardedRef<Element>, element: Element | null): void {
    if (typeof ref === 'function') ref(element)
    else if (ref) ref.current = element
}

export const HEIGHT_CHANGE_MS = 200
export const heightChangeEasing = 'cubic-bezier(0.23, 1, 0.32, 1)'

export function prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useSmoothHeight(shouldAnimate?: () => boolean): (element: HTMLElement | null) => void {
    const stopObserving = React.useRef<() => void>()
    const shouldAnimateRef = React.useRef(shouldAnimate)
    shouldAnimateRef.current = shouldAnimate
    return React.useCallback((element: HTMLElement | null) => {
        stopObserving.current?.()
        stopObserving.current = undefined
        if (!element || typeof ResizeObserver === 'undefined') return
        let settledHeight = element.offsetHeight
        let running: Animation | null = null
        const observer = new ResizeObserver(() => {
            if (running) return
            const nextHeight = element.offsetHeight
            if (nextHeight === settledHeight) return
            const startHeight = settledHeight
            settledHeight = nextHeight
            if (prefersReducedMotion()) return
            if (shouldAnimateRef.current && !shouldAnimateRef.current()) return
            running = element.animate(
                [
                    { height: `${startHeight}px`, overflow: 'hidden' },
                    { height: `${nextHeight}px`, overflow: 'hidden' },
                ],
                { duration: HEIGHT_CHANGE_MS, easing: heightChangeEasing }
            )
            const release = () => {
                running = null
            }
            running.onfinish = release
            running.oncancel = release
        })
        observer.observe(element)
        stopObserving.current = () => observer.disconnect()
    }, [])
}
