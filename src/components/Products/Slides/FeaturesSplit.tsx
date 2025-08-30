import React from 'react'
import ProductImage from './Image'

interface Feature {
  title: string
  description: string
  icon?: React.ReactNode
}

interface FeaturesSplitProps {
  headline: string
  description?: string
  icon?: React.ReactNode
  features?: Feature[]
  images?: Array<{ src: string; srcDark?: string; alt: string; stylize?: boolean; shadow?: boolean; className?: string }>
  children?: React.ReactNode
  bgColor?: string
  textColor?: string
}

export default function FeaturesSplit({ headline, description, icon, features, images, children, bgColor, textColor }: FeaturesSplitProps) {
  return (
    <div className={`h-full flex flex-col @2xl:flex-row @2xl:gap-4 bg-${bgColor} ${textColor}`}>
      <div className="@2xl:max-w-[40%] p-8">
        <div className="mb-8">
          {icon && (
            <div className="flex justify-center mb-4">
              <div className="size-8">
                {icon}
              </div>
            </div>
          )}
          <h2 className="text-6xl @2xl:text-5xl mb-0">
            {headline}
          </h2>
          {description && (
            <p
              className="mt-3 opacity-80 text-3xl @2xl:text-2xl [&_code]:text-2xl"
              {...(typeof description === 'string'
                ? { dangerouslySetInnerHTML: { __html: description } }
                : { children: description })}
            />
          )}
        </div>

        {features && features.length > 0 && (
          <div className="space-y-2">
            {features.map((feature: Feature, index: number) => (
              <div key={index} className="flex gap-4 items-start">
                {feature.icon && (
                  <div className="pt-0.5 @2xl:pt-1">
                    <div className="size-8 @2xl:size-6">
                      {feature.icon}
                    </div>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-3xl @2xl:text-2xl">{feature.title}</h3>
                  <p className="text-2xl @2xl:text-lg">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {children && (
          <div className="mt-8">
            {children}
          </div>
        )}
      </div>
      <aside className="flex-1 flex">

        {images && images.length > 0 && (
          <ProductImage
            images={images.map(img => ({
              src: img.src,
              srcDark: img.srcDark || '',
              alt: img.alt,
              stylize: img.stylize || false,
              shadow: img.shadow || false,
              className: img.className || ''
            }))}
          />
        )}

      </aside>


    </div>
  )
}
