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

    const retryFitText = useCallback(() => {
        // Progressive retry with increasing delays to handle window animations
        // AppWindow animations can take up to 300ms, so we need to account for that
        const delays = [50, 150, 350, 600, 1000]

        delays.forEach((delay) => {
            setTimeout(() => {
                if (textRef.current) {
                    const container = textRef.current.parentElement
                    if (container && container.getBoundingClientRect().width > 0) {
                        fitText()
                    }
                }
            }, delay)
        })
    }, [fitText])

    useEffect(() => {
        // Immediate attempt
        fitText()

        // Retry with progressive delays for window animations
        retryFitText()

        // Refit on window resize
        const handleResize = () => {
            setTimeout(fitText, 100) // Debounce
        }

        window.addEventListener('resize', handleResize)

        // Use ResizeObserver if available for container size changes
        let resizeObserver: ResizeObserver | null = null
        if (textRef.current?.parentElement && 'ResizeObserver' in window) {
            resizeObserver = new ResizeObserver(() => {
                setTimeout(fitText, 50)
            })
            resizeObserver.observe(textRef.current.parentElement)
        }

        // Use IntersectionObserver to detect when element becomes visible
        let intersectionObserver: IntersectionObserver | null = null
        if (textRef.current && 'IntersectionObserver' in window) {
            intersectionObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && entry.intersectionRatio > 0) {
                            setTimeout(fitText, 100)
                        }
                    })
                },
                { threshold: 0.1 }
            )
            intersectionObserver.observe(textRef.current)
        }

        return () => {
            window.removeEventListener('resize', handleResize)
            if (resizeObserver) {
                resizeObserver.disconnect()
            }
            if (intersectionObserver) {
                intersectionObserver.disconnect()
            }
        }
    }, [fitText, retryFitText])

    // Additional effect to handle when the ref becomes available
    useEffect(() => {
        if (textRef.current) {
            // Element is now mounted, start the retry sequence
            retryFitText()
        }
    }, [textRef.current, retryFitText])

    return { fontSize, textRef }
}
