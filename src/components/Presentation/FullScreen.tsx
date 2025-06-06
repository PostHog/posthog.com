import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { IconX } from '@posthog/icons'

interface PresentationModeProps {
  slides: Array<{ name: string; content: React.ReactNode }>
  onExit: () => void
  initialSlideIndex?: number
}

// Full-screen presentation component
const PresentationMode = ({
  slides,
  onExit,
  initialSlideIndex = 0
}: PresentationModeProps) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlideIndex)
  const [showControls, setShowControls] = useState(true)
  const [mouseTimer, setMouseTimer] = useState<NodeJS.Timeout | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const handleMouseMove = useCallback(() => {
    setShowControls(true)
    if (mouseTimer) {
      clearTimeout(mouseTimer)
    }
    const timer = setTimeout(() => {
      setShowControls(false)
    }, 3000)
    setMouseTimer(timer)
  }, [mouseTimer])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          event.preventDefault()
          nextSlide()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault()
          prevSlide()
          break
        case 'Escape':
          event.preventDefault()
          onExit()
          break
        case 'Home':
          event.preventDefault()
          setCurrentSlide(0)
          break
        case 'End':
          event.preventDefault()
          setCurrentSlide(slides.length - 1)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousemove', handleMouseMove)

    // Initial timer for hiding controls
    const timer = setTimeout(() => {
      setShowControls(false)
    }, 3000)
    setMouseTimer(timer)

    // Prevent scrolling on the body when in presentation mode
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousemove', handleMouseMove)
      if (mouseTimer) {
        clearTimeout(mouseTimer)
      }
      clearTimeout(timer)
      // Restore body scrolling
      document.body.style.overflow = ''
    }
  }, [nextSlide, prevSlide, onExit, handleMouseMove, mouseTimer])

  const presentationContent = (
    <div data-scheme="secondary" className="fixed inset-0 bg-primary z-[9999] flex items-center justify-center">
      {/* Exit button */}
      <div className={`absolute top-4 right-4 z-10 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={onExit}
          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
        >
          <IconX className="size-6" />
        </button>
      </div>

      {/* Slide counter */}
      <div className={`absolute top-4 left-4 z-10 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-black/50 text-white px-3 py-2 rounded-lg text-sm font-medium">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors"
        >
          <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors"
        >
          <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Current slide */}
      <div data-scheme="primary" className="w-full h-full max-w-7xl max-h-[90vh] mx-auto flex items-center justify-center p-8">
        <div className="aspect-video w-full h-full bg-primary rounded overflow-hidden shadow-2xl">
          {slides[currentSlide]?.content}
        </div>
      </div>

      {/* Slide thumbnails at bottom */}
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex space-x-2 bg-black/50 p-2 rounded-lg">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-7 rounded border-2 transition-colors ${index === currentSlide
                ? 'border-white bg-white/20'
                : 'border-white/30 bg-white/10 hover:bg-white/20'
                }`}
              title={slide.name}
            >
              <div className="w-full h-full rounded-sm bg-white/10"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  // Use portal to render outside of the current component tree
  return typeof document !== 'undefined' ? createPortal(presentationContent, document.body) : null
}

export default PresentationMode 