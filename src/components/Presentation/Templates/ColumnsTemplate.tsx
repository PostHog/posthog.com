import React from 'react'
import ParseHtml from '../Utilities/parseHtml'

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
}: ColumnsTemplateProps) {
    return (
        <div className={`h-full flex flex-col @2xl:flex-row @2xl:gap-8 bg-${bgColor} ${textColor}`}>
            <div className="@2xl:max-w-[50%] pt-8 px-8 @2xl:py-12">
                <h2 className={`text-5xl @2xl:text-6xl mb-4 font-bold leading-tight ${textColor}`}>{title}</h2>
                {description && (
                    <p className={`text-2xl @2xl:text-3xl leading-snug opacity-80 ${textColor}`}>{description}</p>
                )}
                {children && <div className="mt-6">{children}</div>}
            </div>
            {image && (
                <aside className="flex-1 flex items-center justify-center px-8 pb-8 @2xl:py-12">
                    {imageDark ? (
                        <>
                            <img
                                src={image}
                                alt={imageAlt || ''}
                                className="hidden dark:hidden block max-w-full h-auto"
                            />
                            <img src={imageDark} alt={imageAlt || ''} className="hidden dark:block max-w-full h-auto" />
                        </>
                    ) : (
                        <img src={image} alt={imageAlt || ''} className="max-w-full h-auto" />
                    )}
                </aside>
            )}

            {slideKey === 'cta' && (
                <aside className="flex-1 flex items-center justify-center px-8 pb-8 @2xl:py-12">
                    <h1
                        className={`text-5xl @2xl:text-5xl mb-4 @2xl:mb-4 font-bold leading-tight text-balance text-center`}
                        dangerouslySetInnerHTML={{
                            __html: title.replace('{companyName}', companyName || ''),
                        }}
                    />
                    {description && (
                        <ParseHtml
                            content={description.replace('{companyName}', companyName || '')}
                            className={`prose text-2xl @2xl:text-2xl text-center text-balance`}
                        />
                    )}
                </aside>
            )}
        </div>
    )
}
