import React, { useEffect, useRef, useState, useCallback } from 'react'

interface ScalableSlideProps {
  children: React.ReactNode
  baseWidth?: number
  baseHeight?: number
  className?: string
  mode?: 'thumbnail' | 'editor' | 'presentation'
}

const ScalableSlide: React.FC<ScalableSlideProps> = ({
  children,
  baseWidth = 1280,
  baseHeight = 720,
  className = '',
  mode = 'editor',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [isInitialized, setIsInitialized] = useState(false)
  const retryCountRef = useRef(0)
  const lastDimensionsRef = useRef({ width: 0, height: 0 })
  const dimensionStabilityCountRef = useRef(0)

  const updateScale = useCallback(() => {
    if (!containerRef.current) {
      if (mode === 'thumbnail') {
        console.log(`📏 ScalableSlide updateScale: No containerRef for thumbnail mode`)
      }
      return
    }

    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()

    if (mode === 'thumbnail') {
      console.log(`📏 ScalableSlide thumbnail updateScale:`, {
        containerWidth: containerRect.width,
        containerHeight: containerRect.height,
        baseWidth,
        baseHeight,
        retryCount: retryCountRef.current
      })
    }

    // Don't calculate if container has no dimensions yet
    if (containerRect.width === 0 || containerRect.height === 0) {
      if (mode === 'thumbnail') {
        console.log(`📏 ScalableSlide thumbnail: Zero dimensions, retrying...`)
      }
      // Retry up to 15 times with exponential backoff
      if (retryCountRef.current < 15) {
        retryCountRef.current++
        const delay = Math.min(50 * Math.pow(1.5, retryCountRef.current), 2000) // Up to 2 second delay
        setTimeout(updateScale, delay)
      }
      return
    }

    // Check if we're still in the middle of AppWindow scaling animation
    // by checking if the container is very small (indicating animation in progress)
    if (containerRect.width < 50 || containerRect.height < 30) {
      if (mode === 'thumbnail') {
        console.log(`📏 ScalableSlide thumbnail: Container too small (animation?), retrying...`)
      }
      // Retry after AppWindow animation should be complete (500ms to be safe)
      if (retryCountRef.current < 8) {
        retryCountRef.current++
        setTimeout(updateScale, 500)
      }
      return
    }

    // Check for dimension stability - wait for dimensions to be stable across multiple frames
    const currentDimensions = { width: containerRect.width, height: containerRect.height }
    const lastDimensions = lastDimensionsRef.current

    if (Math.abs(currentDimensions.width - lastDimensions.width) < 1 &&
      Math.abs(currentDimensions.height - lastDimensions.height) < 1) {
      dimensionStabilityCountRef.current++
    } else {
      dimensionStabilityCountRef.current = 0
      lastDimensionsRef.current = currentDimensions

      // If dimensions are still changing, wait a bit more
      if (retryCountRef.current < 10) {
        retryCountRef.current++
        requestAnimationFrame(() => {
          setTimeout(updateScale, 50)
        })
      }
      return
    }

    // Require at least 2 stable measurements before proceeding
    if (dimensionStabilityCountRef.current < 2) {
      requestAnimationFrame(updateScale)
      return
    }

    // Calculate scale to fit container while maintaining aspect ratio
    const scaleX = containerRect.width / baseWidth
    const scaleY = containerRect.height / baseHeight
    let newScale = Math.min(scaleX, scaleY)

    // Ensure reasonable minimum and maximum scales
    if (mode === 'thumbnail') {
      const originalScale = newScale
      newScale = Math.max(newScale, 0.05) // Minimum 5% scale
      newScale = Math.min(newScale, 0.5)  // Maximum 50% scale
      console.log(`📏 ScalableSlide thumbnail: Scale calculated`, {
        scaleX,
        scaleY,
        originalScale,
        finalScale: newScale,
        wasClipped: originalScale !== newScale
      })
    } else {
      newScale = Math.max(newScale, 0.1)  // Minimum 10% scale
      newScale = Math.min(newScale, 2)    // Maximum 200% scale
    }

    // Reset counters on successful calculation
    retryCountRef.current = 0
    dimensionStabilityCountRef.current = 0
    setScale(newScale)
    setIsInitialized(true)
  }, [baseWidth, baseHeight, mode])

  useEffect(() => {
    // More robust initialization that waits for layout to be complete
    const initializeScale = () => {
      // Use multiple requestAnimationFrame calls to ensure layout is complete
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Additional delay for any animations to complete
            setTimeout(() => {
              updateScale()
            }, 100)
          })
        })
      })
    }

    // Initial scale calculation with better timing
    initializeScale()

    // Set up resize observer
    const resizeObserver = new ResizeObserver(() => {
      // Reset stability tracking when container resizes
      dimensionStabilityCountRef.current = 0
      retryCountRef.current = 0
      // Small debounce to avoid too frequent updates
      setTimeout(updateScale, 10)
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Also listen for window resize
    const handleResize = () => {
      dimensionStabilityCountRef.current = 0
      retryCountRef.current = 0
      updateScale()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [updateScale])

  // Don't render scaled content until we have proper dimensions
  if (!isInitialized) {
    return (
      <div
        ref={containerRef}
        className={`relative w-full h-full overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      <div
        ref={contentRef}
        className="absolute top-1/2 left-1/2 origin-center shadow-2xl rounded border border-primary bg-primary"
        style={{
          width: baseWidth,
          height: baseHeight,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default ScalableSlide 