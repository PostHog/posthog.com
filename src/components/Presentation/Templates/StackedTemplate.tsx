import React from 'react'
import ParseHtml from '../Utilities/parseHtml'
import CloudinaryImage from 'components/CloudinaryImage'
import Logo from 'components/Logo'
import { IconHeartFilled } from '@posthog/icons'
import SalesRep from '../Utilities/SalesRep'
import Logos from '../Utilities/Logos'

// @TODOS
// - Right now the Hogzill image is hard-coded. We have support for a custom image (which will hide Hogzilla) but it's not formatted
// - Design basically expects content to fit around Hogzilla. Probably need ability to offset/shrink Hogzilla and/or allow right-padding to compensate for the width of an image.

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
    descriptionWidth?: string
    image?: string
    imageDark?: string
    imageAlt?: string
    imageClasses?: string
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
    descriptionWidth,
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
            {image ? (
                <div className="relative flex-1 w-full px-4">
                    {imageDark ? (
                        <>
                            <img src={image} alt={imageAlt || ''} className="dark:hidden max-w-full h-auto mx-auto" />
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
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/hogzilla_bf40c5e271.png"
                                    alt=""
                                    width={2574}
                                    height={1256}
                                    className="absolute inset-0 flex items-end justify-end"
                                    imgClassName="max-w-none @2xl/slide-thumbnails:h-full h-[44rem] -mr-12 @2xl:mr-0 @2xl:max-h-[628px] @2xl:w-full z-10"
                                />
                            </div>
                        </>
                    )}
                </>
            )}

            <div className="relative z-10 pt-8 px-8 flex flex-col">
                <div className="flex justify-between items-center mb-8 @2xl:mb-4">
                    <Logos companyLogo={companyLogo} companyName={companyName || ''} />

                    {salesRep && (
                        <>
                            <SalesRep salesRep={salesRep} />
                        </>
                    )}
                </div>

                {slideKey === 'overview' && (
                    <>
                        <h1
                            className={`text-5xl @2xl:text-4xl mb-4 @2xl:mb-4 font-bold leading-tight @2xl:text-balance ${
                                image ? '' : '@2xl:max-w-xl'
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: title.replace('{companyName}', companyName || ''),
                            }}
                        />
                        {description && (
                            <ParseHtml
                                content={description.replace('{companyName}', companyName || '')}
                                className={`prose text-2xl @2xl:text-xl @2xl:text-balance ${
                                    image ? '' : descriptionWidth
                                }`}
                            />
                        )}
                    </>
                )}
            </div>

            {children && <div className="px-4 pb-4 w-full">{children}</div>}
        </div>
    )
}
