import React from 'react'
import ProductImage from './Image'

interface Feature {
  title: string
  description: string
  icon?: React.ReactNode
}

interface FeaturesGridProps {
  headline: string
  description?: string
  icon?: React.ReactNode
  features?: Feature[]
  images?: Array<{ src: string; alt: string; stylize?: boolean; shadow?: boolean; className?: string }>
  children?: React.ReactNode
}

// Function to determine optimal column count based on feature count
const getColumnCount = (featureCount: number): number => {
  switch (featureCount) {
    case 2:
      return 2
    case 3:
      return 3
    case 4:
      return 4
    case 5:
      return 3 // 3 cols and wrap
    case 6:
      return 3
    case 7:
      return 4
    case 8:
      return 4
    default:
      return 4 // fallback for edge cases
  }
}

export default function FeaturesGrid({ headline, description, icon, features, images, children }: FeaturesGridProps) {
  // Determine column count based on features length
  const columnCount = features ? getColumnCount(features.length) : 4
  const gridColsClass = `grid-cols-${columnCount}`

  return (
    <div className="h-full bg-primary text-primary">
      <div className="pt-12 px-4 pb-8">
        <h2 className="text-5xl mb-0 text-center">
          {headline}
        </h2>
        {description && (
          <p
            className="mt-4 text-xl text-center [&_code]:text-xl"
            {...(typeof description === 'string'
              ? { dangerouslySetInnerHTML: { __html: description } }
              : { children: description })}
          />
        )}
        {icon && (
          <div className="flex justify-center mt-6">
            <div className="bg-accent rounded-full p-4">
              <div className="size-8">
                {icon}
              </div>
            </div>
          </div>
        )}
      </div>

      {features && features.length > 0 && (
        <div className={`grid ${gridColsClass} gap-4 px-4 mb-8`}>
          {features.map((feature: Feature, index: number) => (
            <div key={index} className="text-center">
              {feature.icon && (
                <div className="flex justify-center mb-3">
                  <div className="bg-accent rounded-full p-4">
                    <div className="size-8">
                      {feature.icon}
                    </div>
                  </div>
                </div>
              )}
              <h3 className="text-2xl mb-1">{feature.title}</h3>
              <p className="text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      )}

      {images && images.length > 0 && (
        <div className="max-w-3xl mx-auto px-4">
          <ProductImage
            images={images.map(img => ({
              src: img.src,
              alt: img.alt,
              stylize: img.stylize || false,
              shadow: img.shadow || false,
              className: img.className || ''
            }))}
          />
        </div>
      )}

      {children && (
        <div className="px-4 mt-8">
          {children}
        </div>
      )}
    </div>
  )
}
