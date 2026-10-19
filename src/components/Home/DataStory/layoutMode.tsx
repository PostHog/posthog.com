import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

export type LayoutMode = 'split' | 'cinematic'

export const LayoutModeContext = createContext<LayoutMode>('split')

export const useLayoutMode = (): LayoutMode => useContext(LayoutModeContext)

export interface StepLayout {
    grid: string
    text: string
    visual: string
}

const CINEMATIC_LAYOUT: StepLayout = {
    grid: 'relative mx-auto flex max-w-[58rem] flex-col gap-5',
    text: 'max-w-2xl [&_h3]:!mb-1 [&_h3]:!text-lg [&_p]:!mb-0 [&_p]:!text-[15px] [&_p]:text-secondary',
    visual: 'w-full',
}

export const useStepLayout = (split: StepLayout): StepLayout =>
    useLayoutMode() === 'cinematic' ? CINEMATIC_LAYOUT : split

const CINEMATIC_CONTENT_WIDTH_PX = 560
const MAX_CINEMATIC_SCALE = 1.26

export const CinematicScale = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const cinematic = useLayoutMode() === 'cinematic'
    const frameRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [fit, setFit] = useState({ scale: 1, height: 0 })

    useEffect(() => {
        const frame = frameRef.current
        const content = contentRef.current
        if (!cinematic || !frame || !content) {
            setFit({ scale: 1, height: 0 })
            return
        }
        const measure = () => {
            const scale = Math.min(MAX_CINEMATIC_SCALE, Math.max(1, frame.clientWidth / CINEMATIC_CONTENT_WIDTH_PX))
            setFit({ scale, height: content.offsetHeight * scale })
        }
        measure()
        const resize = new ResizeObserver(measure)
        resize.observe(frame)
        resize.observe(content)
        return () => resize.disconnect()
    }, [cinematic])

    const scaled = fit.scale !== 1
    return (
        <div ref={frameRef} style={scaled ? { height: fit.height } : undefined}>
            <div
                ref={contentRef}
                className="@container"
                style={
                    scaled
                        ? {
                              width: `${100 / fit.scale}%`,
                              transform: `scale(${fit.scale})`,
                              transformOrigin: 'top left',
                          }
                        : undefined
                }
            >
                {children}
            </div>
        </div>
    )
}
