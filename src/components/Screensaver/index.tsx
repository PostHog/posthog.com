import React, { useEffect, useRef, lazy, Suspense } from 'react'

// react-lottie bundles lottie-web (~600 KiB); load it on demand instead of on every page.
const Lottie = typeof window !== 'undefined' ? lazy(() => import('react-lottie')) : () => null

interface ScreensaverProps {
    isActive: boolean
    onDismiss: () => void
}

const LOGO_SIZE = 200

// Pixels per animation frame (~60fps). Kept slow and roughly uniform so the logo
// drifts gently rather than racing around the screen.
const VELOCITY = { x: 2, y: 1.5 }

// Module-level constant so the options object identity is stable — react-lottie
// reloads the animation when its `options` prop changes reference.
const lottieOptions = {
    loop: true,
    autoplay: true,
    path: '/lotties/loading.json',
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
}

export const Screensaver: React.FC<ScreensaverProps> = ({ isActive, onDismiss }) => {
    // The bouncing logo is moved by mutating a ref + CSS transform inside the rAF
    // loop. Nothing here lives in React state, so the screensaver subtree never
    // re-renders per frame (previously it did ~120 setState-driven re-renders a
    // second, which pegged a CPU core on idle).
    const logoRef = useRef<HTMLDivElement>(null)
    const animationFrameRef = useRef<number>()
    const positionRef = useRef({ x: 50, y: 50 })
    const velocityRef = useRef({ ...VELOCITY })

    useEffect(() => {
        if (!isActive) return

        // Reset motion each time the screensaver activates.
        positionRef.current = { x: 50, y: 50 }
        velocityRef.current = { ...VELOCITY }

        const step = () => {
            const pos = positionRef.current
            const vel = velocityRef.current

            const maxX = Math.max(0, window.innerWidth - LOGO_SIZE)
            const maxY = Math.max(0, window.innerHeight - LOGO_SIZE)

            let { x, y } = pos
            x += vel.x
            y += vel.y

            // Bounce off the edges.
            if (x <= 0 || x >= maxX) {
                vel.x = -vel.x
                x = x <= 0 ? 0 : maxX
            }
            if (y <= 0 || y >= maxY) {
                vel.y = -vel.y
                y = y <= 0 ? 0 : maxY
            }

            pos.x = x
            pos.y = y

            if (logoRef.current) {
                logoRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
            }

            animationFrameRef.current = requestAnimationFrame(step)
        }

        animationFrameRef.current = requestAnimationFrame(step)

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
                animationFrameRef.current = undefined
            }
        }
    }, [isActive])

    // Any mouse movement dismisses the screensaver.
    useEffect(() => {
        if (!isActive) return

        const handleMouseMove = () => onDismiss()
        document.addEventListener('mousemove', handleMouseMove)
        return () => document.removeEventListener('mousemove', handleMouseMove)
    }, [isActive, onDismiss])

    if (!isActive) return null

    return (
        <div className="fixed inset-0 bg-black z-[9999] overflow-hidden" style={{ width: '100vw', height: '100vh' }}>
            <div
                ref={logoRef}
                className="absolute top-0 left-0 will-change-transform"
                style={{
                    width: `${LOGO_SIZE}px`,
                    height: `${LOGO_SIZE}px`,
                    transform: `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`,
                }}
            >
                <Suspense fallback={null}>
                    <Lottie options={lottieOptions} height={LOGO_SIZE} width={LOGO_SIZE} eventListeners={[]} />
                </Suspense>
            </div>

            <div className="absolute bottom-8 w-full @md:w-auto @md:left-1/2 transform @md:-translate-x-1/2 text-white/50 text-sm text-center">
                Visit display options to disable screensaver
            </div>
        </div>
    )
}
