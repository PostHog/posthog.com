import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import Logo from 'components/Logo'
import { IconHeartFilled } from '@posthog/icons'

// @TODOS
// - Right now the Hogzill image is hard-coded. We have support for a custom image (which will hide Hogzilla) but it's not formatted
// - Design basically expects content to fit around Hogzilla. Probably need ability to offset/shrink Hogzilla and/or allow right-padding to compensate for the width of an image.

interface SmartDescriptionProps {
    content: string
    className?: string
}

function SmartDescription({ content, className }: SmartDescriptionProps) {
    // Check if content starts with an HTML element
    const startsWithHtmlElement = /^<[a-zA-Z][^>]*>/.test(content.trim())

    if (startsWithHtmlElement) {
        return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
    }

    return <p className={className} dangerouslySetInnerHTML={{ __html: content }} />
}

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
    slideKey?: string
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
    slideKey,
}: StackedTemplateProps) {
    return (
        <div className={`h-full flex flex-col relative bg-${bgColor} text-black`}>
            <div className="relative z-10 pt-8 px-8 flex flex-col">
                <div className="flex justify-between items-center mb-8 @2xl:mb-4">
                    <div className="flex items-center gap-4">
                        <Logo noText className="size-20" />
                        {companyLogo && (
                            <>
                                <IconHeartFilled className="size-12 inline-block text-red" />
                                <img
                                    src={companyLogo}
                                    alt={companyName || 'Company logo'}
                                    className="h-12 @2xl:h-16 object-contain rounded"
                                />
                            </>
                        )}
                    </div>
                    {salesRep && (
                        <div className="flex items-center gap-3">
                            <CloudinaryImage
                                src={salesRep.photo as `https://res.cloudinary.com/${string}`}
                                alt={salesRep.name}
                                className={`size-20 rounded-full overflow-hidden border-2 border-${salesRep.color} p-[1.5px]`}
                                imgClassName={`object-cover rounded-full bg-${salesRep.color}`}
                                width={116}
                            />
                            <div className="text-left">
                                <div className="text-2xl font-semibold @2xl:leading-tight">{salesRep.name}</div>
                                <div className="text-xl opacity-75 @2xl:leading-tight">{salesRep.title}</div>
                                <a
                                    href={`mailto:${salesRep.email}`}
                                    className="block pt-0.5 text-lg underline font-semibold @2xl:leading-tight"
                                >
                                    {salesRep.email}
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                <h1
                    className={`text-5xl @2xl:text-4xl mb-4 @2xl:mb-4 font-bold leading-tight text-balance ${
                        image ? '' : '@2xl:max-w-xl'
                    }`}
                    dangerouslySetInnerHTML={{
                        __html: title.replace('{companyName}', companyName || ''),
                    }}
                />
                {description && (
                    <SmartDescription
                        content={description.replace('{companyName}', companyName || '')}
                        className={`prose text-2xl @2xl:text-xl text-balance ${image ? '' : '@2xl:max-w-2xl'}`}
                    />
                )}
            </div>

            {image ? (
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
            ) : (
                <>
                    {slideKey === 'overview' && (
                        <>
                            <div className="absolute inset-0 bg-gradient-to-b from-[#FFF1D5] to-[#DAE0EB]">
                                <CloudinaryImage
                                    loading="lazy"
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/hogzilla_bf40c5e271.png"
                                    alt=""
                                    width={2574}
                                    height={1256}
                                    className="absolute inset-0 flex items-end justify-end"
                                    imgClassName="max-w-none h-[44rem] -mr-12 @2xl:mr-0 @2xl:max-h-[628px] h-auto @2xl:w-full z-10"
                                />
                            </div>
                        </>
                    )}
                </>
            )}

            {children && <div className="px-4 pb-4 w-full">{children}</div>}
        </div>
    )
}
