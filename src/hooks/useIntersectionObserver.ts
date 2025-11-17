import { useRef, useState, useEffect } from 'react'

interface UseIntersectionObserverOptions {
    threshold?: number
    rootMargin?: string
    triggerOnce?: boolean
}

export const useIntersectionObserver = (options: UseIntersectionObserverOptions = {}) => {
    const { threshold = 0.1, rootMargin = '50px', triggerOnce = true } = options

    const elementRef = useRef<HTMLDivElement>(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        // Check if Intersection Observer is supported
        if (!('IntersectionObserver' in window)) {
            return
        }

        // Add a small delay to ensure the element is fully rendered in MDX context
        const setupObserver = () => {
            if (!elementRef.current) {
                setTimeout(setupObserver, 100)
                return
            }

            // Check if element is actually in the DOM
            if (!document.contains(elementRef.current)) {
                setTimeout(setupObserver, 100)
                return
            }

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsInView(true)
                        // If triggerOnce is true, disconnect after first trigger
                        if (triggerOnce) {
                            observer.disconnect()
                        }
                    } else if (!triggerOnce) {
                        // If not triggerOnce, update state when going out of view
                        setIsInView(false)
                    }
                },
                {
                    threshold,
                    rootMargin,
                }
            )

            observer.observe(elementRef.current)

            return () => {
                observer.disconnect()
            }
        }

        // Start the setup process
        const cleanup = setupObserver()

        return cleanup
    }, [threshold, rootMargin, triggerOnce])

    return { elementRef, isInView }
}
