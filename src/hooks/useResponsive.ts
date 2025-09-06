import { useState, useEffect } from 'react'

// Tailwind md breakpoint (768px)
const MD_BREAKPOINT = 768

export function useResponsive() {
    const [isMobile, setIsMobile] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        // Check if window is available (client-side only)
        if (typeof window === 'undefined') {
            return
        }

        // Function to check screen size
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < MD_BREAKPOINT)
            setIsLoaded(true)
        }

        // Set initial value
        checkScreenSize()

        // Add event listener for resize
        window.addEventListener('resize', checkScreenSize)

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkScreenSize)
        }
    }, [])

    return { isMobile, isLoaded }
}
