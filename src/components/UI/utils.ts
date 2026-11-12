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

export const useIsomorphicLayoutEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export const HEIGHT_CHANGE_MS = 200
export const motionEasing = 'cubic-bezier(0.23, 1, 0.32, 1)'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion(): boolean {
    return window.matchMedia(reducedMotionQuery).matches
}

function subscribeToReducedMotion(onChange: () => void): () => void {
    const query = window.matchMedia(reducedMotionQuery)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
}

export function usePrefersReducedMotion(): boolean {
    return useSyncExternalStore(subscribeToReducedMotion, prefersReducedMotion, () => true)
}

function subscribeToPageVisibility(onChange: () => void): () => void {
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
}

export function usePageVisible(): boolean {
    return useSyncExternalStore(
        subscribeToPageVisibility,
        () => !document.hidden,
        () => false
    )
}

export function useSmoothHeight(shouldAnimate?: () => boolean): (element: HTMLElement | null) => void {
    const stopObserving = React.useRef<() => void>()
    const shouldAnimateRef = React.useRef(shouldAnimate)
    shouldAnimateRef.current = shouldAnimate
    return React.useCallback((element: HTMLElement | null) => {
        stopObserving.current?.()
        stopObserving.current = undefined
        if (!element || typeof ResizeObserver === 'undefined') return
        let startHeight = element.offsetHeight
        let targetHeight = startHeight
        let running: Animation | null = null
        const animateHeight = (from: number, to: number): Animation => {
            const animation = element.animate(
                [
                    { height: `${from}px`, overflow: 'hidden' },
                    { height: `${to}px`, overflow: 'hidden' },
                ],
                { duration: HEIGHT_CHANGE_MS, easing: motionEasing }
            )
            const release = () => {
                if (running === animation) running = null
            }
            animation.onfinish = release
            animation.oncancel = release
            return animation
        }
        const animationAllowed = () =>
            !prefersReducedMotion() && (!shouldAnimateRef.current || shouldAnimateRef.current())
        const retarget = (animation: Animation) => {
            const elapsed = animation.currentTime
            const shownHeight = element.getBoundingClientRect().height
            running = null
            animation.cancel()
            const naturalHeight = element.offsetHeight
            if (prefersReducedMotion()) {
                startHeight = naturalHeight
                targetHeight = naturalHeight
                return
            }
            if (naturalHeight === targetHeight) {
                running = animateHeight(startHeight, targetHeight)
                running.currentTime = elapsed
                return
            }
            startHeight = shownHeight
            targetHeight = naturalHeight
            if (!animationAllowed()) {
                startHeight = naturalHeight
                return
            }
            running = animateHeight(shownHeight, naturalHeight)
        }
        const observer = new ResizeObserver(() => {
            if (running) {
                retarget(running)
                return
            }
            const nextHeight = element.offsetHeight
            if (nextHeight === targetHeight) return
            startHeight = targetHeight
            targetHeight = nextHeight
            if (!animationAllowed()) return
            running = animateHeight(startHeight, targetHeight)
        })
        observer.observe(element)
        stopObserving.current = () => observer.disconnect()
    }, [])
}

export function flattenFragments(children: React.ReactNode, fragmentKeys: React.Key[] = []): React.ReactNode[] {
    return React.Children.toArray(children).flatMap((child) => {
        if (!React.isValidElement<{ children?: React.ReactNode }>(child)) return [child]
        if (child.type !== React.Fragment && fragmentKeys.length === 0) return [child]
        const keys = [...fragmentKeys, child.key ?? '']
        if (child.type === React.Fragment) return flattenFragments(child.props.children, keys)
        return [React.cloneElement(child, { key: JSON.stringify(keys) })]
    })
}
