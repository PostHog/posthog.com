import React from 'react'
import useProduct from 'hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'
import ParseHtml from '../Utilities/parseHtml'
import Logos from '../Utilities/Logos'

interface ProductTemplateProps {
    handle: string
    screenshot?: string
    screenshotClasses?: string
    title: string
    description?: string
    contentWidth?: string
    bgColor?: string
    textColor?: string
    companyLogo?: string
    companyName?: string
}

export default function ProductTemplate({
    handle,
    screenshot,
    screenshotClasses = 'rounded-md shadow-2xl overflow-hidden',
    title,
    description,
    contentWidth = '@2xl:basis-4/12',
    bgColor,
    textColor,
    companyLogo,
    companyName,
}: ProductTemplateProps) {
    const productData = useProduct({ handle }) as any

    if (!productData) {
        return <div className="h-full flex items-center justify-center">Loading product data...</div>
    }

    const effectiveBgColor = bgColor || productData.color || 'light'
    const effectiveTextColor = productData.overview?.textColor || 'text-primary'
    const screenshotData = screenshot && productData.screenshots?.[screenshot]

    return (
        <div className={`h-full flex flex-col gap-8 bg-${effectiveBgColor} ${effectiveTextColor}`}>
            <div className="flex-1 flex flex-col gap-8">
                <div className="px-8 pt-8">
                    <h2
                        className={`flex-1 text-5xl @2xl:text-5xl font-bold leading-tight text-center @2xl:text-left ${effectiveTextColor}`}
                    >
                        {title}
                    </h2>
                </div>

                <div className="flex-1 flex flex-col @2xl:flex-row @2xl:items-start gap-8">
                    <div className={`px-8 @2xl:pr-0 ${contentWidth}`}>
                        {description && (
                            <ParseHtml
                                content={description}
                                className={`prose text-3xl leading-snug ${effectiveTextColor} [&_a]:${effectiveTextColor}`}
                            />
                        )}
                    </div>

                    {screenshotData && (
                        <aside className="@2xl:flex-1 flex items-center justify-center px-8 @2xl:pl-0">
                            {screenshotData.srcDark ? (
                                <>
                                    <CloudinaryImage
                                        src={screenshotData.src as `https://res.cloudinary.com/${string}`}
                                        alt={screenshotData.alt || ''}
                                        className={`dark:hidden ${screenshotClasses || ''}`}
                                        imgClassName={screenshotData.imgClasses || ''}
                                    />
                                    <CloudinaryImage
                                        src={screenshotData.srcDark as `https://res.cloudinary.com/${string}`}
                                        alt={screenshotData.alt || ''}
                                        className={`hidden dark:block ${screenshotClasses || ''}`}
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
            <div
                className={`basis-auto flex gap-4 justify-between items-center pt-4 pb-6 border-t-2 border-${effectiveTextColor}/50 mx-8`}
            >
                <div>
                    <Logos companyLogo={companyLogo} companyName={companyName} color={effectiveTextColor} size="sm" />
                </div>
                <div className="flex items-center gap-3 pt-1 shrink-auto">
                    {productData.Icon && <productData.Icon className={`size-10 ${effectiveTextColor}`} />}
                    <span className={`text-2xl font-semibold leading-tight ${effectiveTextColor}`}>
                        {productData.name}
                    </span>
                </div>
            </div>
        </div>
    )
}
