import React from 'react'
import useProduct from 'hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'
import ParseHtml from '../Utilities/parseHtml'

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
    const effectiveTextColor = productData.overview?.textColor || 'text-primary'
    const screenshotData = screenshot && productData.screenshots?.[screenshot]

    return (
        <div className={`h-full flex flex-col @2xl:gap-8 bg-${effectiveBgColor} ${effectiveTextColor}`}>
            <div className="flex justify-center pt-8 px-8">
                <div className="flex items-center gap-3 mb-4">
                    {productData.Icon && <productData.Icon className={`size-12 ${effectiveTextColor}`} />}
                    <span className={`text-3xl font-semibold leading-tight ${effectiveTextColor}`}>
                        {productData.name}
                    </span>
                </div>
            </div>

            <div className="grid @2xl:grid-cols-3 @2xl:items-center">
                <div className="px-8">
                    <div>
                        <h2
                            className={`flex-1 text-5xl @2xl:text-5xl mb-4 font-bold leading-tight ${effectiveTextColor}`}
                        >
                            {title}
                        </h2>

                        {description && (
                            <ParseHtml
                                content={description}
                                className={`prose text-2xl @2xl:text-3xl leading-snug opacity-80 ${effectiveTextColor} [&_a]:${effectiveTextColor}`}
                            />
                        )}
                    </div>
                </div>

                {screenshotData && (
                    <aside className="@2xl:col-span-2 flex items-center justify-center">
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
        </div>
    )
}
