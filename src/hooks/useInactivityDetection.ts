import { useEffect, useState, useRef, useCallback } from 'react'
import { INACTIVITY_TIMEOUTS } from '../constants'

interface UseInactivityDetectionOptions {
    focusedTimeout?: number
    unfocusedTimeout?: number
    enabled?: boolean
}

export const useInactivityDetection = ({
    focusedTimeout = INACTIVITY_TIMEOUTS.FOCUSED,
    unfocusedTimeout = INACTIVITY_TIMEOUTS.UNFOCUSED,
    enabled = true,
}: UseInactivityDetectionOptions = {}) => {
    const [isInactive, setIsInactive] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout>()
    const isWindowFocusedRef = useRef(true)

    const resetTimer = useCallback(() => {
        if (!enabled) return

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        setIsInactive(false)

        const timeout = isWindowFocusedRef.current ? focusedTimeout : unfocusedTimeout

        timeoutRef.current = setTimeout(() => {
            setIsInactive(true)
        }, timeout)
    }, [enabled, focusedTimeout, unfocusedTimeout])

    const handleActivity = useCallback(() => {
        resetTimer()
    }, [resetTimer])

    useEffect(() => {
        if (!enabled) {
            setIsInactive(false)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            return
        }

        // Activity events
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

        events.forEach((event) => {
            document.addEventListener(event, handleActivity)
        })

        // Window focus/blur events
        const handleFocus = () => {
            isWindowFocusedRef.current = true
            resetTimer()
        }

        const handleBlur = () => {
            isWindowFocusedRef.current = false
            resetTimer()
        }

        window.addEventListener('focus', handleFocus)
        window.addEventListener('blur', handleBlur)

        // Initial timer
        resetTimer()

        return () => {
            events.forEach((event) => {
                document.removeEventListener(event, handleActivity)
            })
            window.removeEventListener('focus', handleFocus)
            window.removeEventListener('blur', handleBlur)

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [enabled, handleActivity, resetTimer])

    const dismiss = useCallback(() => {
        setIsInactive(false)
        resetTimer()
    }, [resetTimer])

    return { isInactive, dismiss }
}
