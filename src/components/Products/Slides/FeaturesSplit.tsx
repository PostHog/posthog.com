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
      <div className="@2xl:flex-1 pt-8 px-8 @2xl:py-8">
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
                  <div className="">
                    <div className="size-12 @2xl:size-10">
                      {feature.icon}
                    </div>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-4xl @2xl:text-3xl">{feature.title}</h3>
                  <p className="text-3xl @2xl:text-xl !leading-normal">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <aside className="@2xl:max-w-[40%] flex">
        {children && (
          <div>
            {children}
          </div>
        )}
      </aside>
    </div>
  )
}
