import React, { useEffect, useState, useRef, useCallback } from 'react'
import Lottie from 'react-lottie'

interface ScreensaverProps {
    isActive: boolean
    onDismiss: () => void
}

export const Screensaver: React.FC<ScreensaverProps> = ({ isActive, onDismiss }) => {
    const [position, setPosition] = useState({ x: 50, y: 50 })
    const [velocity, setVelocity] = useState({ x: 0.2, y: 0.15 }) // Slower, uniform speed
    const animationFrameRef = useRef<number>()
    const logoSizeRef = useRef({ width: 200, height: 200 })

    // Load the lottie animation
    const defaultOptions = {
        loop: true,
        autoplay: true,
        path: '/lotties/loading.json',
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    const updatePosition = useCallback(() => {
        if (!isActive) return

        setPosition(prev => {
            let newX = prev.x + velocity.x
            let newY = prev.y + velocity.y
            let newVelX = velocity.x
            let newVelY = velocity.y

            // Calculate logo boundaries as percentages
            const logoWidthPercent = (logoSizeRef.current.width / window.innerWidth) * 100
            const logoHeightPercent = (logoSizeRef.current.height / window.innerHeight) * 100

            // Check boundaries and bounce
            if (newX <= 0 || newX >= 100 - logoWidthPercent) {
                newVelX = -newVelX
                newX = newX <= 0 ? 0 : 100 - logoWidthPercent
            }
            if (newY <= 0 || newY >= 100 - logoHeightPercent) {
                newVelY = -newVelY
                newY = newY <= 0 ? 0 : 100 - logoHeightPercent
            }


            setVelocity({ x: newVelX, y: newVelY })
            return { x: newX, y: newY }
        })

        animationFrameRef.current = requestAnimationFrame(updatePosition)
    }, [velocity, isActive])

    useEffect(() => {
        if (isActive) {
            animationFrameRef.current = requestAnimationFrame(updatePosition)
        } else {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [isActive, updatePosition])



    // Mouse move handler
    useEffect(() => {
        const handleMouseMove = () => {
            if (isActive) {
                onDismiss()
            }
        }

        document.addEventListener('mousemove', handleMouseMove)
        return () => document.removeEventListener('mousemove', handleMouseMove)
    }, [isActive, onDismiss])

    if (!isActive) return null

    return (
        <div className="fixed inset-0 bg-black z-[9999] overflow-hidden" style={{ width: '100vw', height: '100vh' }}>
            <div
                className="absolute"
                style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    width: `${logoSizeRef.current.width}px`,
                    height: `${logoSizeRef.current.height}px`
                }}
            >
                <Lottie
                    options={defaultOptions}
                    height={logoSizeRef.current.height}
                    width={logoSizeRef.current.width}
                />
            </div>

            <div className="absolute bottom-8 w-full @md:w-auto @md:left-1/2 transform @md:-translate-x-1/2 text-white/50 text-sm text-center">
                Visit display options to disable screensaver
            </div>
        </div>
    )
}