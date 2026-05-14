import React, { forwardRef, useEffect, useRef, useState } from 'react'
import type { GeneratorState } from './types'
import { CANVAS_DIMENSIONS, TEMPLATE_COMPONENTS } from './templates'

type Props = {
    state: GeneratorState
}

const Canvas = forwardRef<HTMLDivElement, Props>(function Canvas({ state }, ref) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)
    const { width, height } = CANVAS_DIMENSIONS[state.aspect]
    const Template = TEMPLATE_COMPONENTS[state.template][state.aspect]

    useEffect(() => {
        const wrapper = wrapperRef.current
        if (!wrapper) return
        const compute = () => {
            const rect = wrapper.getBoundingClientRect()
            const padding = 32
            const availW = rect.width - padding
            const availH = rect.height - padding
            const next = Math.min(availW / width, availH / height, 1)
            setScale(next > 0 ? next : 1)
        }
        compute()
        const observer = new ResizeObserver(compute)
        observer.observe(wrapper)
        return () => observer.disconnect()
    }, [width, height])

    return (
        <div ref={wrapperRef} className="w-full h-full flex items-center justify-center overflow-hidden bg-accent">
            <div
                style={{
                    width,
                    height,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
                }}
                className="flex-shrink-0"
            >
                <div ref={ref} style={{ width, height }} className="relative">
                    <Template state={state} />
                </div>
            </div>
        </div>
    )
})

export default Canvas
