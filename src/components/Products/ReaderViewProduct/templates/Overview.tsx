import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import { SectionComponentProps } from '../types'
import OSTable from 'components/OSTable'
import Link from 'components/Link'
import Glow, { type GlowColor } from 'components/Glow'
import TabbedCarousel, { type TabbedCarouselTab } from 'components/TabbedCarousel'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import UseCaseSubmission from '../UseCaseSubmission'
import { CTAs } from 'components/CTAs'
import { IconArrowUpRight } from '@posthog/icons'
import OSButton from 'components/OSButton'
import Tooltip from 'components/RadixUI/Tooltip'

// Per-customer brand glow color. Tweak as desired; falls back to the product's color when unset.
const customerGlowColors: Record<string, GlowColor> = {
    hasura: 'blue',
    elevenlabs: 'purple',
    netdata: 'green',
    pry: 'yellow',
}

const renderLogo = (customer: any) => {
    const scaledHeight = customer.height ? Math.max(customer.height - 3, 4) : 5

    if (!customer.logo) {
        return <span className="text-sm font-semibold text-primary">{customer.name}</span>
    }

    if (typeof customer.logo === 'function') {
        const LogoComponent = customer.logo
        return <LogoComponent className={`fill-current object-contain max-w-full text-primary h-${scaledHeight}`} />
    }

    return (
        <>
            <img
                src={customer.logo.light}
                alt={customer.name}
                className={`w-auto object-contain dark:hidden max-h-${scaledHeight}`}
            />
            <img
                src={customer.logo.dark}
                alt={customer.name}
                className={`w-auto object-contain hidden dark:block max-h-${scaledHeight}`}
            />
        </>
    )
}

const CustomerSlide = ({
    customer,
    data,
    isCaseStudy,
}: {
    customer: any
    data: { headline: string; description: string }
    isCaseStudy: boolean
}) => {
    return (
        <div className="p-6 flex flex-col gap-2 leading-snug">
            <p className="m-0 text-sm font-bold text-primary">
                {customer.name} {data.headline}
            </p>
            <p className="m-0 text-base text-secondary">"{data.description}"</p>
            {isCaseStudy && (
                <Link
                    to={`/customers/${customer.slug}`}
                    state={{ newWindow: true }}
                    className="group inline-flex items-center gap-1.5 text-sm border border-secondary hover:border-primary px-2 py-1 rounded-full font-semibold text-primary w-fit hover:bg-secondary"
                >
                    Read case study
                    <IconArrowUpRight className="size-4 text-secondary group-hover:text-primary" />
                </Link>
            )}
        </div>
    )
}

const Overview = ({ id, productData, customers, hasCaseStudy }: SectionComponentProps) => {
    const { name, Icon, overview, screenshots, status } = productData ?? {}
    const customerData = productData?.customers || {}
    const customerLogos = (customers || []).filter((customer: any) => customerData[customer.slug])

    const customerTabs: TabbedCarouselTab[] = customerLogos.map((customer: any) => {
        const data = customerData[customer.slug]
        const isCaseStudy = hasCaseStudy(customer.slug)
        const glowColor = customerGlowColors[customer.slug] ?? productData?.color
        const bgColor = `bg-${glowColor}`
        return {
            value: customer.slug,
            label: glowColor ? (
                <Glow
                    as="span"
                    color={glowColor}
                    hover
                    size="sm"
                    intensity="medium"
                    rounded="md"
                    className="inline-block"
                >
                    {renderLogo(customer)}
                </Glow>
            ) : (
                <span className="inline-block">{renderLogo(customer)}</span>
            ),
            content: <CustomerSlide customer={customer} data={data} isCaseStudy={isCaseStudy} />,
            color: bgColor,
            activeText: 'text-primary',
            progressBar: bgColor,
            triggerClassName:
                '!min-w-0 px-3 py-3 flex items-center justify-center data-[state=active]:!bg-white dark:data-[state=active]:!bg-dark',
        }
    })

    const columns = [
        { name: 'Role', width: 'minmax(150px,auto)', align: 'left' as const },
        { name: 'Use cases', width: 'minmax(auto,1fr)', align: 'left' as const },
    ]

    const rows = [
        ['Product Engineers', "Debug production issues that can't be reproduced locally"],
        ['Support', 'Pinpoint the source of issues with visual verification and console logs'],
        ['PMs & Designers', 'Spot friction, dead ends, and rage clicks'],
        ['Growth', 'Investigate funnel drop-off and onboarding bleed'],
        ['QA', 'Validating releases by watching real users instead of staged flows'],
    ].map(([role, useCase]) => ({
        cells: [{ content: role }, { content: useCase }],
    }))

    return (
        <section id={id} className="scroll-mt-20 not-prose flex flex-col gap-12 max-w-7xl mx-auto">
            <header className="">
                {screenshots?.home?.src && (
                    <Glow
                        color={productData?.color}
                        className="mb-8 @3xl/reader-content:max-w-lg @3xl/reader-content:float-right @3xl/reader-content:ml-8"
                    >
                        <CloudinaryImage
                            src={screenshots.home.src as `https://res.cloudinary.com/${string}`}
                            alt={screenshots.home.alt || name}
                            className="w-full"
                            imgClassName="h-auto rounded-lg"
                        />
                    </Glow>
                )}

                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Glow color="white" size="md" intensity="strong" className="">
                            {Icon && <Icon className={`size-6 text-${productData?.color}`} />}
                        </Glow>
                        <span className="text-lg font-bold">{name}</span>
                        {status === 'beta' && (
                            <span className="font-bold uppercase border-2 border-current px-1 rounded text-xs">
                                Beta
                            </span>
                        )}
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold leading-tight">{overview?.title || name}</h2>
                        <p className="leading-relaxed">{overview?.description}</p>
                    </div>
                    <div>
                        <CTAs />
                    </div>
                </div>
            </header>

            <div>
                <h2>Who uses it?</h2>

                {customerLogos.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 items-center">
                        {customerLogos.map((customer: any) => {
                            const data = customerData[customer.slug]
                            const isCaseStudy = hasCaseStudy(customer.slug)

                            const logoNode = renderLogo(customer)
                            const glowColor = customerGlowColors[customer.slug] ?? productData?.color

                            const tooltipContent = (
                                <div className="max-w-xs flex flex-col gap-1.5 leading-snug">
                                    <p className="m-0 font-semibold text-primary">
                                        {customer.name} {data.headline}
                                    </p>
                                    <p className="m-0 text-sm italic text-secondary">"{data.description}"</p>
                                    {isCaseStudy && (
                                        <p className="m-0 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                                            <span className="inline-flex w-2.5 h-2.5 rounded-full bg-red shrink-0"></span>
                                            Read case study
                                        </p>
                                    )}
                                </div>
                            )

                            if (isCaseStudy) {
                                const logoLink = (
                                    <OSButton
                                        asLink
                                        to={`/customers/${customer.slug}`}
                                        state={{ newWindow: true }}
                                        className="border border-transparent hover:border-primary rounded-sm"
                                    >
                                        {logoNode}
                                    </OSButton>
                                )

                                const wrappedLogo = glowColor ? (
                                    <Glow
                                        as="span"
                                        color={glowColor}
                                        hover
                                        size="sm"
                                        intensity="medium"
                                        rounded="md"
                                        className="inline-block"
                                    >
                                        {logoLink}
                                    </Glow>
                                ) : (
                                    <span className="inline-block">{logoLink}</span>
                                )

                                return (
                                    <span key={customer.slug} className="relative inline-flex items-center">
                                        {wrappedLogo}
                                        <Tooltip
                                            trigger={
                                                <button
                                                    type="button"
                                                    aria-label={`About ${customer.name}`}
                                                    className="absolute -top-1 -right-1 inline-flex w-3 h-3 rounded-full bg-red border-2 border-white dark:border-dark cursor-pointer z-10 p-0"
                                                />
                                            }
                                            delay={150}
                                            sideOffset={20}
                                        >
                                            {tooltipContent}
                                        </Tooltip>
                                    </span>
                                )
                            }

                            const inner = <span className="inline-flex py-1.5 px-2">{logoNode}</span>

                            const trigger = glowColor ? (
                                <Glow
                                    as="span"
                                    color={glowColor}
                                    hover
                                    size="sm"
                                    intensity="medium"
                                    rounded="md"
                                    className="inline-block"
                                >
                                    {inner}
                                </Glow>
                            ) : (
                                <span className="inline-block">{inner}</span>
                            )

                            return (
                                <Tooltip key={customer.slug} trigger={trigger} delay={150} sideOffset={8}>
                                    {tooltipContent}
                                </Tooltip>
                            )
                        })}
                    </div>
                )}

                {customerTabs.length > 0 && (
                    <TabbedCarousel
                        tabs={customerTabs}
                        slideDuration={6000}
                        showActiveBg={false}
                        slideClassName="!min-h-0 !p-0 !rounded"
                        className="mt-4 mb-12"
                    />
                )}

                <OSTable
                    columns={columns}
                    rows={rows}
                    size="sm"
                    rowAlignment="top"
                    width="full"
                    // className="bg-white dark:bg-dark"
                    // shadow
                />
                <div className="mt-4">
                    <UseCaseSubmission productName={name} productSlug={productData?.slug} />
                </div>
            </div>

            <div>
                <h2>How it works</h2>
                <p className="leading-relaxed">{overview?.eli5}</p>
            </div>
        </section>
    )
}

export default Overview
