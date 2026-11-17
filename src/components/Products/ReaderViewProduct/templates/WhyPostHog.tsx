import React from 'react'
import { IconArrowRight } from '@posthog/icons'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import CustomerLogo from 'components/CustomerLogo'
import { Bang } from 'components/Icons'
import { colors } from '@posthog/brand/colors'
import { useCustomers } from 'hooks/useCustomers'
import type { SectionComponentProps } from '../types'
import { SECTION_H2 } from '../helpers'

const LINK_CLASSES = 'font-semibold text-red dark:text-yellow hover:underline'

interface Point {
    /** Tailwind border color class for the card, e.g. `border-blue`. */
    accent: string
    /** Tailwind background class for the title highlight, e.g. `bg-blue/20`. */
    highlight: string
    title: string
    description: React.ReactNode
}

interface CustomerRef {
    slug: string
    author: string
    caseStudyLabel: string
}

const CustomerCard = ({ slug, author, caseStudyLabel, product }: CustomerRef & { product: string }) => {
    const { getCustomer } = useCustomers()
    const customer = getCustomer(slug)
    const person = customer?.quotes?.[author]
    const quote = person?.products?.[product] ?? person?.quotes?.[0]
    if (!customer || !person || !quote) return null

    return (
        <figure className="m-0 flex flex-col gap-4 p-5 rounded-md border border-primary bg-primary">
            <CustomerLogo customer={customer} className="h-7 max-w-36" />
            <blockquote className="m-0 text-base leading-relaxed flex-1">"{quote}"</blockquote>
            <figcaption className="flex items-center gap-3">
                {person.image?.thumb && (
                    <CloudinaryImage
                        src={person.image.thumb as `https://res.cloudinary.com/${string}`}
                        alt={person.name}
                        imgClassName="size-10 rounded-full object-cover border border-primary"
                    />
                )}
                <span className="text-sm leading-tight">
                    <strong className="block">{person.name}</strong>
                    <span className="text-secondary">
                        {person.role}, {customer.name}
                    </span>
                </span>
            </figcaption>
            {customer.hasCaseStudy && (
                <Link to={`/customers/${slug}`} state={{ newWindow: true }} className={`text-sm ${LINK_CLASSES}`}>
                    {caseStudyLabel}
                    <IconArrowRight className="inline-block size-4 ml-1 relative -top-px" />
                </Link>
            )}
        </figure>
    )
}

/** A slowly spinning yellow starburst with a short label, like a sale sticker. */
const SpinningBadge = ({ label }: { label: string }) => (
    <span
        className="relative my-1 inline-flex size-28 @xl/reader-content:-my-6 @xl/reader-content:size-32 shrink-0 items-center justify-center"
        role="img"
        aria-label={label}
    >
        <Bang
            className="absolute inset-0 size-full motion-safe:animate-[spin_20s_linear_infinite]"
            color={colors.yellow.core}
        />
        <span
            className="relative max-w-[5.5rem] -rotate-6 text-center text-base font-black uppercase leading-tight"
            style={{ color: 'black' }}
            aria-hidden="true"
        >
            {label}
        </span>
    </span>
)

/**
 * The opinions behind PostHog for this product, as cards with highlighted
 * titles, then customer quotes. Reads `productData.whyPostHog`. An optional
 * `badge` shows as a spinning sticker after the heading.
 */
const WhyPostHog = ({ id, productData }: SectionComponentProps) => {
    const why = productData?.whyPostHog
    if (!why) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <div>
                <header className="mb-8">
                    <div className="flex flex-wrap items-center gap-x-2">
                        <h2 className={`${SECTION_H2} !mb-0 @xl/reader-content:!text-4xl`}>{why.title}</h2>
                        {why.badge && <SpinningBadge label={why.badge} />}
                    </div>
                    {why.lede && (
                        <p className="m-0 mt-3 max-w-prose text-lg leading-relaxed text-secondary">{why.lede}</p>
                    )}
                </header>
                <ol className="m-0 grid list-none grid-cols-1 gap-5 p-0 @xl/reader-content:grid-cols-2 @4xl/reader-content:grid-cols-3">
                    {why.points.map(({ accent, highlight, title, description }: Point, index: number) => (
                        <li
                            key={title}
                            className={`m-0 rounded-md border-2 border-l-[6px] bg-primary p-5 shadow-md transition-transform hover:-translate-y-1 hover:rotate-0 ${accent} ${
                                index % 2 ? 'rotate-[0.6deg]' : '-rotate-[0.6deg]'
                            }`}
                        >
                            <h3 className="m-0 mb-3 text-xl font-bold leading-snug text-primary @xl/reader-content:text-2xl">
                                <span className={`box-decoration-clone px-1 ${highlight}`}>{title}</span>
                            </h3>
                            <p className="m-0 text-[15px] leading-relaxed text-secondary">{description}</p>
                        </li>
                    ))}
                </ol>
            </div>

            {why.customers?.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-lg font-bold text-primary m-0 mb-4">{why.customersTitle}</h3>
                    <div className="grid grid-cols-1 @xl/reader-content:grid-cols-2 gap-4">
                        {why.customers.map((customer: CustomerRef) => (
                            <CustomerCard key={customer.slug} {...customer} product={productData.handle} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default WhyPostHog
