import React from 'react'
import useProduct from 'hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'

interface ProductTemplateProps {
    handle: string
    screenshot?: string
    title: string
    description?: string
    bgColor?: string
    textColor?: string
}

export default function ProductTemplate({
    handle,
    screenshot,
    title,
    description,
    bgColor,
    textColor,
}: ProductTemplateProps) {
    const productData = useProduct({ handle }) as any

    if (!productData) {
        return <div className="h-full flex items-center justify-center">Loading product data...</div>
    }

    const effectiveBgColor = bgColor || productData.color || 'light'
    const effectiveTextColor = textColor || productData.overview?.textColor || 'text-primary'
    const screenshotData = screenshot && productData.screenshots?.[screenshot]

    return (
        <div className={`h-full flex flex-col @2xl:flex-row @2xl:gap-8 bg-${effectiveBgColor} ${effectiveTextColor}`}>
            <div className="@2xl:max-w-[45%] pt-8 px-8 @2xl:py-12">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        {productData.Icon && (
                            <productData.Icon className={`size-12 @2xl:size-16 ${effectiveTextColor}`} />
                        )}
                        <span className={`text-3xl @2xl:text-4xl font-semibold ${effectiveTextColor}`}>
                            {productData.name}
                        </span>
                    </div>
                    <h2 className={`text-5xl @2xl:text-6xl mb-4 font-bold leading-tight ${effectiveTextColor}`}>
                        {title}
                    </h2>
                    {description && (
                        <p className={`text-2xl @2xl:text-3xl leading-snug opacity-80 ${effectiveTextColor}`}>
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {screenshotData && (
                <aside className="flex-1 flex items-center justify-center px-4 pb-8 @2xl:py-12">
                    {screenshotData.srcDark ? (
                        <>
                            <CloudinaryImage
                                src={screenshotData.src as `https://res.cloudinary.com/${string}`}
                                alt={screenshotData.alt || ''}
                                className={`dark:hidden ${screenshotData.classes || ''}`}
                                imgClassName={screenshotData.imgClasses || ''}
                            />
                            <CloudinaryImage
                                src={screenshotData.srcDark as `https://res.cloudinary.com/${string}`}
                                alt={screenshotData.alt || ''}
                                className={`hidden dark:block ${screenshotData.classes || ''}`}
                                imgClassName={screenshotData.imgClasses || ''}
                            />
                        </>
                    ) : (
                        <CloudinaryImage
                            src={screenshotData.src as `https://res.cloudinary.com/${string}`}
                            alt={screenshotData.alt || ''}
                            className={screenshotData.classes || ''}
                            imgClassName={screenshotData.imgClasses || ''}
                        />
                    )}
                </aside>
            )}
        </div>
    )
}
