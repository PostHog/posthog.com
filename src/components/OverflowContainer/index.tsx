import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function OverflowContainer({ children, ...other }) {
    const ref = useRef<HTMLDivElement>(null)
    const [padding, setPadding] = useState(0)
    const [overflowing, setOverflowing] = useState(false)

    const getPadding = useCallback(() => {
        const grandparent = document.querySelector('.reader-view-content-container')
        if (!ref.current || !grandparent) return

        const content = ref.current.querySelector('.w-fit')
        if (!content) return

        const { width: grandparentWidth } = grandparent.getBoundingClientRect()
        const { width: refWidth } = ref.current.getBoundingClientRect()
        const padding = (grandparentWidth - refWidth) / 2
        const isOverflowing = content.getBoundingClientRect().width + (overflowing ? 0 : padding) > grandparentWidth

        setPadding(padding <= 0 ? 0 : padding)
        setOverflowing(isOverflowing)
    }, [overflowing])

    useEffect(() => {
        getPadding()
        const grandparent = document.querySelector('.reader-view-content-container')
        if (!grandparent) return

        const resizeObserver = new ResizeObserver(getPadding)
        resizeObserver.observe(grandparent)

        return () => {
            resizeObserver.disconnect()
        }
    }, [getPadding])

    return (
        <div
            className="overflow-auto w-full box-content"
            style={{
                marginLeft: `-${padding}px`,
                paddingLeft: padding,
                paddingRight: padding,
            }}
            {...other}
        >
            <div className="whitespace-nowrap overflow-visible" ref={ref}>
                <div className="w-fit" style={{ paddingRight: overflowing ? padding : 0 }}>
                    {children}
                </div>
            </div>
        </div>
    )
}
