import React, { useState } from 'react'
import ParseHtml from '../Utilities/parseHtml'
import { DemoScheduler } from 'components/DemoScheduler'
import SalesRep from '../Utilities/SalesRep'
import Logos from '../Utilities/Logos'
import OSButton from 'components/OSButton'

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
    const [showScheduler, setShowScheduler] = useState(false)

    return (
        <div
            className={`h-full flex flex-col @2xl:flex-row gap-8 bg-gradient-to-b from-[#FFF1D5] to-[#DAE0EB] text-black`}
        >
            <div className="@2xl:max-w-[50%] pt-8 px-8 @2xl:py-12 flex flex-col">
                <Logos companyLogo={companyLogo} companyName={companyName || ''} />

                <div className="flex-1 mt-8">
                    <h2 className={`text-5xl mb-4 font-bold leading-tight`}>{title}</h2>
                    {description && (
                        <p
                            className={`text-2xl leading-snug opacity-80`}
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    )}
                    {children && <div className="mt-6">{children}</div>}

                    <div className="mt-4 mb-8 @2xl:mb-4">
                        <OSButton
                            asLink
                            to="https://app.posthog.com/signup"
                            state={{ newWindow: true }}
                            variant="primary"
                            size="xl"
                        >
                            Skip the call – I'll try it myself
                        </OSButton>
                    </div>
                </div>

                <SalesRep salesRep={salesRep} />
            </div>

            <aside className="flex-1 flex items-center justify-center">
                <div className="w-full h-full max-w-4xl mx-auto text-center bg-white border-t @2xl:border-t-0 @2xl:border-l border-primary shadow-2xl">
                    {!showScheduler ? (
                        <div className="h-full w-full flex flex-col items-center justify-center gap-2 px-4">
                            <OSButton variant="secondary" size="xl" onClick={() => setShowScheduler(true)}>
                                Load scheduler iframe
                            </OSButton>
                            <p className="text-sm opacity-75 text-balance max-w-md mt-2">
                                We use Default.com who may set a cookie, so we wanted to get your permission first.
                            </p>
                        </div>
                    ) : (
                        <iframe
                            src="https://scheduler.default.com/12920/queue/3441"
                            className="h-full w-full border-0"
                        />
                    )}
                </div>
                {image && (
                    <>
                        {imageDark ? (
                            <>
                                <img
                                    src={image}
                                    alt={imageAlt || ''}
                                    className="hidden dark:hidden block max-w-full h-auto"
                                />
                                <img
                                    src={imageDark}
                                    alt={imageAlt || ''}
                                    className="hidden dark:block max-w-full h-auto"
                                />
                            </>
                        ) : (
                            <img src={image} alt={imageAlt || ''} className="max-w-full h-auto" />
                        )}
                    </>
                )}
            </aside>
        </div>
    )
}
