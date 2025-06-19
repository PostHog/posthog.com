import { useEffect, useRef, useState, useCallback } from 'react'

export const useFitText = (text: string, maxWidth?: number) => {
    const [fontSize, setFontSize] = useState(16)
    const textRef = useRef<HTMLElement>(null)

    const fitText = useCallback(() => {
        if (!textRef.current) return

        const element = textRef.current
        const container = element.parentElement
        if (!container) return

        // Get container width
        const containerWidth = maxWidth || container.getBoundingClientRect().width
        if (containerWidth <= 0) return

        // Create measuring element
        const measurer = document.createElement('div')
        measurer.style.position = 'absolute'
        measurer.style.visibility = 'hidden'
        measurer.style.whiteSpace = 'nowrap'
        measurer.style.fontSize = '100px' // Start with a large size
        measurer.style.fontFamily = window.getComputedStyle(element).fontFamily
        measurer.style.fontWeight = window.getComputedStyle(element).fontWeight
        measurer.style.textTransform = window.getComputedStyle(element).textTransform
        measurer.style.letterSpacing = window.getComputedStyle(element).letterSpacing
        measurer.textContent = text

        document.body.appendChild(measurer)

        // Calculate the ratio to fit
        const textWidth = measurer.getBoundingClientRect().width
        const targetWidth = containerWidth * 1 // Add margin here if desired (eg * .9)
        const ratio = targetWidth / textWidth
        const newFontSize = Math.max(12, Math.floor(100 * ratio)) // Minimum 12px

        document.body.removeChild(measurer)
        setFontSize(newFontSize)
    }, [text, maxWidth])

    useEffect(() => {
        // Initial fit
        fitText()

        // Refit on window resize
        const handleResize = () => {
            setTimeout(fitText, 100) // Debounce
        }

        window.addEventListener('resize', handleResize)

        // Use ResizeObserver if available for container size changes
        let resizeObserver: ResizeObserver | null = null
        if (textRef.current?.parentElement && 'ResizeObserver' in window) {
            resizeObserver = new ResizeObserver(handleResize)
            resizeObserver.observe(textRef.current.parentElement)
        }

        return () => {
            window.removeEventListener('resize', handleResize)
            if (resizeObserver) {
                resizeObserver.disconnect()
            }
        }
    }, [fitText])

    return { fontSize, textRef }
}
