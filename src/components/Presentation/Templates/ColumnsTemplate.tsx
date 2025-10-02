import React from 'react'
import ParseHtml from '../Utilities/parseHtml'
import CloudinaryImage from 'components/CloudinaryImage'
import useProduct from 'hooks/useProduct'

interface ContentItem {
    handle: string
    title: string
    description: string
    screenshot: string
}

interface ColumnsTemplateProps {
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
    slideKey?: string
    content?: ContentItem[]
}

// Component to render individual product content item
function ProductContentItem({ item }: { item: ContentItem }) {
    const productData = useProduct({ handle: item.handle }) as any
    if (!productData) return null

    const screenshotData = item.screenshot && productData.screenshots?.[item.screenshot]

    return (
        <div className="flex-1 flex flex-col gap-4">
            {screenshotData && (
                <div>
                    {screenshotData.srcDark ? (
                        <>
                            <CloudinaryImage
                                src={screenshotData.src as `https://res.cloudinary.com/${string}`}
                                alt={screenshotData.alt || ''}
                                className="dark:hidden rounded-md shadow-lg overflow-hidden"
                            />
                            <CloudinaryImage
                                src={screenshotData.srcDark as `https://res.cloudinary.com/${string}`}
                                alt={screenshotData.alt || ''}
                                className="hidden dark:block rounded-md shadow-lg overflow-hidden"
                            />
                        </>
                    ) : (
                        <CloudinaryImage
                            src={screenshotData.src as `https://res.cloudinary.com/${string}`}
                            alt={screenshotData.alt || ''}
                            className="rounded-md shadow-lg overflow-hidden"
                        />
                    )}
                </div>
            )}
            <div className="flex items-center gap-2">
                {productData.Icon && <productData.Icon className={`size-8 text-${productData.color}`} />}
                <div className="text-3xl font-bold">{item.title}</div>
            </div>
            {item.description && <ParseHtml content={item.description} className="prose text-2xl leading-snug" />}
        </div>
    )
}

export default function ColumnsTemplate({
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
    slideKey,
    content,
}: ColumnsTemplateProps) {
    return (
        <div className={`h-full flex flex-col @2xl:gap-8 bg-${bgColor} ${textColor}`}>
            <div className="pt-8 px-8">
                <h2 className={`text-5xl @2xl:text-6xl mb-4 font-bold leading-tight ${textColor}`}>{title}</h2>
                {description && (
                    <p className={`text-2xl @2xl:text-3xl leading-snug opacity-80 ${textColor}`}>{description}</p>
                )}
                {children && <div className="mt-6">{children}</div>}
            </div>

            {content && content.length > 0 && (
                <div className="flex gap-8 px-8 pb-8">
                    {content.map((item, index) => (
                        <ProductContentItem key={index} item={item} />
                    ))}
                </div>
            )}

            {/* {image && (
                <aside className="flex-1 flex items-center justify-center px-8 pb-8 @2xl:py-12">
                    {imageDark ? (
                        <>
                            <img
                                src={image}
                                alt={imageAlt || ''}
                                className="dark:hidden max-w-full h-auto"
                            />
                            <img src={imageDark} alt={imageAlt || ''} className="hidden dark:block max-w-full h-auto" />
                        </>
                    ) : (
                        <img src={image} alt={imageAlt || ''} className="max-w-full h-auto" />
                    )}
                </aside>
            )} */}
        </div>
    )
}
