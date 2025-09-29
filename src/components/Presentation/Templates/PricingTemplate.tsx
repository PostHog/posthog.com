import React from 'react'
import ParseHtml from '../Utilities/parseHtml'
import CloudinaryImage from 'components/CloudinaryImage'
import Logo from 'components/Logo'
import FreeTier from 'components/Pricing/Test/FreeTier'
import { Accordion } from 'components/Pricing/Test/PricingAccordion'
import { useState } from 'react'
import ScrollArea from 'components/RadixUI/ScrollArea'

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

interface PricingTemplateProps {
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

export default function PricingTemplate({
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
}: PricingTemplateProps) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className={`h-full flex flex-col relative bg-white text-black p-8`}>
            <h1 className="text-5xl text-center mb-4">Usage-based pricing with a monthly free tier</h1>
            <p className="text-center text-2xl mb-8 text-secondary">Pricing decreases with volume</p>

            <div className="grid @2xl:grid-cols-2 gap-4 mb-4">
                <fieldset className="">
                    <legend className="text-2xl font-semibold">1. Monthly free tier</legend>
                    <div className={`grid grid-cols-3 gap-x-2 gap-y-6 py-6`}>
                        <FreeTier size="large" />
                    </div>
                </fieldset>

                <fieldset className="">
                    <legend className="text-2xl font-semibold">2. Usage-based pricing</legend>
                    <div className="py-2">
                        <div className="h-96">
                            <ScrollArea className="min-h-0 h-full pr-4">
                                <Accordion allExpanded={expanded} setAllExpanded={setExpanded} />
                            </ScrollArea>
                        </div>
                    </div>
                </fieldset>
            </div>

            <p className="text-center text-2xl mb-4 text-secondary">
                Discounts available for startups, non-profits, and long-term relationships
            </p>
        </div>
    )
}
