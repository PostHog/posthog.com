import React, { useContext } from 'react'
import { PresentationModeContext } from '../RadixUI/Tabs'

interface ResponsiveSlideContentProps {
  mobileContent: React.ReactNode
  desktopContent: React.ReactNode
  className?: string
}

/**
 * Component that handles responsive content switching for slides.
 * In normal mode, uses container queries (@2xl breakpoint).
 * In presentation mode, uses viewport-based orientation detection.
 */
export const ResponsiveSlideContent: React.FC<ResponsiveSlideContentProps> = ({
  mobileContent,
  desktopContent,
  className = ''
}) => {
  const presentationContext = useContext(PresentationModeContext)

  // In presentation mode, use viewport-based orientation
  if (presentationContext.isPresenting) {
    const showMobileContent = presentationContext.isPortrait

    return (
      <div className={className}>
        {showMobileContent ? (
          <div className="bg-primary aspect-[9/16] relative rounded-md shadow-lg overflow-hidden">
            {mobileContent}
          </div>
        ) : (
          <div className="bg-primary aspect-video relative rounded-md shadow-lg overflow-hidden">
            {desktopContent}
          </div>
        )}
      </div>
    )
  }

  // In normal mode, use container queries
  return (
    <div className={className}>
      {/* Mobile view - 9:16 aspect ratio */}
      <div className="@2xl:hidden bg-primary aspect-[9/16] relative rounded-md shadow-lg overflow-hidden">
        {mobileContent}
      </div>
      {/* Desktop view - 16:9 aspect ratio */}
      <div className="hidden @2xl:block bg-primary aspect-video relative rounded-md shadow-lg overflow-hidden">
        {desktopContent}
      </div>
    </div>
  )
}

export default ResponsiveSlideContent
