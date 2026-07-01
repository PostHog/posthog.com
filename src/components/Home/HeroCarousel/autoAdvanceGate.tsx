import React from 'react'

export interface AutoAdvanceGate {
    /**
     * Acquire a hold that pauses the carousel's auto-advance. Returns a release
     * function; call it (or let the consuming effect clean up) to drop the hold.
     * Holds are reference-counted, so multiple concurrent holders are safe.
     */
    acquire: () => () => void
}

export const AutoAdvanceGateContext = React.createContext<AutoAdvanceGate | null>(null)

/**
 * Pause the parent `HeroCarousel`'s auto-advance while `active` is true — e.g. while a
 * Typecaast animation that runs longer than the carousel's dwell is still playing. The
 * hold is released automatically when `active` flips to false or the component unmounts.
 *
 * No-op when rendered outside a carousel (no provider), so it's safe to use from any
 * slide regardless of where it's mounted.
 */
export function usePauseAutoAdvance(active: boolean): void {
    const gate = React.useContext(AutoAdvanceGateContext)
    React.useEffect(() => {
        if (!active || !gate) return
        return gate.acquire()
    }, [active, gate])
}

/**
 * Whether the slide reading this is the carousel's currently-visible tab. The carousel
 * force-mounts every tab (so animations keep their place instead of restarting on switch),
 * so slides need this to know when to play/pause and when to hold auto-advance.
 *
 * Defaults to `true` outside a carousel (no provider), so a slide rendered standalone just
 * behaves as "active" and plays normally.
 */
export const SlideActiveContext = React.createContext<boolean>(true)

export function useSlideActive(): boolean {
    return React.useContext(SlideActiveContext)
}
