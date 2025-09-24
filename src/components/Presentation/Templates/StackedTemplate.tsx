import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'

interface SalesRep {
    name: string
    title: string
    email: string
    photo: string
    color: string
}

interface StackedTemplateProps {
    title: string
    description?: string
    image?: string
    imageDark?: string
    imageAlt?: string
    children?: React.ReactNode
    bgColor?: string
    textColor?: string
    companyLogo?: string
    companyName?: string
    salesRep?: SalesRep
    isOverview?: boolean
}

export default function StackedTemplate({
    title,
    description,
    image,
    imageDark,
    imageAlt,
    children,
    bgColor = 'light',
    textColor = 'text-primary',
    companyLogo,
    companyName,
    salesRep,
    isOverview = false,
}: StackedTemplateProps) {
    return (
        <div className={`h-full flex flex-col items-center relative bg-${bgColor} ${textColor}`}>
            {/* Sales Rep Info - positioned in top right for overview slides */}
            {isOverview && salesRep && (
                <div className="absolute top-4 right-4 @2xl:top-8 @2xl:right-8 p-3 rounded-lg bg-white/90 dark:bg-dark/90 backdrop-blur-sm border border-primary/20 shadow-lg z-10">
                    <div className="flex items-center gap-3">
                        <CloudinaryImage
                            src={salesRep.photo as `https://res.cloudinary.com/${string}`}
                            alt={salesRep.name}
                            className={`size-12 @2xl:size-14 rounded-full overflow-hidden bg-${salesRep.color}`}
                            imgClassName="object-cover"
                            width={56}
                        />
                        <div className="text-left">
                            <div className="text-sm @2xl:text-base font-semibold text-primary">{salesRep.name}</div>
                            <div className="text-xs @2xl:text-sm text-secondary">{salesRep.title}</div>
                            <a
                                href={`mailto:${salesRep.email}`}
                                className="text-xs @2xl:text-sm text-blue hover:text-blue-dark hover:underline"
                            >
                                {salesRep.email}
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-8 px-4 @2xl:pt-12 @2xl:px-8 mb-4 w-full flex flex-col">
                {companyLogo && (
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <img
                            src={companyLogo}
                            alt={companyName || 'Company logo'}
                            className="h-12 @2xl:h-16 object-contain"
                        />
                    </div>
                )}
                <h1
                    className={`text-5xl @2xl:text-6xl mb-4 @2xl:mb-2 font-bold text-center leading-tight drop-shadow-2xl text-balance ${textColor}`}
                    dangerouslySetInnerHTML={{
                        __html: title.replace('{companyName}', companyName || ''),
                    }}
                />
                {description && (
                    <p
                        className={`text-2xl @2xl:text-3xl text-center leading-snug drop-shadow text-balance mx-auto ${textColor}`}
                    >
                        {description}
                    </p>
                )}
            </div>

            {image && (
                <div className="relative flex-1 w-full px-4">
                    {imageDark ? (
                        <>
                            <img
                                src={image}
                                alt={imageAlt || ''}
                                className="hidden dark:hidden block max-w-full h-auto mx-auto"
                            />
                            <img
                                src={imageDark}
                                alt={imageAlt || ''}
                                className="hidden dark:block max-w-full h-auto mx-auto"
                            />
                        </>
                    ) : (
                        <img src={image} alt={imageAlt || ''} className="max-w-full h-auto mx-auto" />
                    )}
                </div>
            )}

            {children && <div className="px-4 pb-4 w-full">{children}</div>}
        </div>
    )
}
