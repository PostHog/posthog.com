import React from 'react'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import { IconArrowUpRight } from '@posthog/icons'
import * as Stickers from 'components/Stickers/Stickers'
import { Customer, CustomerPerson } from 'hooks/useCustomers'

export const RegionFlag = ({ region, className = 'size-5' }: { region?: string; className?: string }) => {
    if (!region) return null
    const Flag = (Stickers as Record<string, React.ComponentType<{ className?: string }>>)[`StickerFlag${region}`]
    // No flag asset for this country yet. Show nothing rather than a wrong or unknown flag.
    if (!Flag) return null
    return <Flag className={className} />
}

export const CustomerBadges = ({ customer }: { customer: Customer }): JSX.Element | null => {
    if (!customer.yc && !customer.aiPilled && !customer.region) return null
    return (
        <div className="flex flex-wrap items-center gap-2">
            <RegionFlag region={customer.region} />
            {customer.yc && (
                <span className="text-[11px] font-semibold uppercase tracking-wide leading-none text-orange dark:text-orange-dark">
                    YC {customer.yc}
                </span>
            )}
            {customer.aiPilled && (
                <span className="text-[11px] font-semibold uppercase tracking-wide leading-none text-blue-2 dark:text-blue-2-dark">
                    AI-pilled
                </span>
            )}
        </div>
    )
}

const LOGO_CLASS = 'h-7 w-auto max-w-[150px] object-contain fill-current'

const CustomerLogo = ({ customer }: { customer: Customer }): JSX.Element => {
    if (!customer.logo) return <span className="font-semibold">{customer.name}</span>
    if (typeof customer.logo === 'function') {
        const LogoComponent = customer.logo
        return <LogoComponent className={LOGO_CLASS} />
    }
    return (
        <>
            <img src={customer.logo.light} alt={customer.name} className={`${LOGO_CLASS} dark:hidden`} />
            <img src={customer.logo.dark} alt={customer.name} className={`${LOGO_CLASS} hidden dark:block`} />
        </>
    )
}

export interface CustomerCardProps {
    customer: Customer
    /** A quoted person, when we have permission for one. Without it the card falls back to `notes`. */
    person?: CustomerPerson
    hasCaseStudy?: boolean
}

export const CustomerCard = ({ customer, person, hasCaseStudy }: CustomerCardProps): JSX.Element => (
    <div className="flex flex-col gap-2 rounded border border-primary bg-light dark:bg-dark p-4">
        <div className="flex h-7 items-center">
            <CustomerLogo customer={customer} />
        </div>
        <CustomerBadges customer={customer} />
        {person?.quote ? (
            <>
                <blockquote className="m-0 border-l-0 p-0 not-italic text-primary text-[15px] leading-snug">
                    {person.quote}
                </blockquote>
                <div className="mt-auto flex items-center gap-2 pt-1">
                    {person.image?.thumb && (
                        <div className="size-8 overflow-hidden rounded-full bg-accent">
                            <CloudinaryImage
                                src={person.image.thumb as `https://res.cloudinary.com/${string}`}
                                alt={person.name}
                                imgClassName="size-8 object-cover object-center"
                            />
                        </div>
                    )}
                    <div className="text-xs leading-tight">
                        <div className="font-semibold">{person.name}</div>
                        <div className="text-secondary">{person.role}</div>
                    </div>
                </div>
            </>
        ) : (
            customer.notes && <p className="m-0 mt-auto text-[15px] leading-snug text-secondary">{customer.notes}</p>
        )}
        {hasCaseStudy && (
            <Link to={`/customers/${customer.slug}`} state={{ newWindow: true }} className="group text-sm">
                Read the story <IconArrowUpRight className="inline-block size-4 text-muted group-hover:text-primary" />
            </Link>
        )}
    </div>
)

export interface CustomerCardsProps {
    customers: Customer[]
    /** Keyed by customer slug. A customer with an entry renders a quote instead of its `notes` line. */
    people?: Record<string, CustomerPerson>
    hasCaseStudy?: (slug: string) => boolean
    className?: string
}

export const CustomerCards = ({
    customers,
    people = {},
    hasCaseStudy,
    className = '',
}: CustomerCardsProps): JSX.Element | null => {
    if (customers.length === 0) return null
    return (
        <div className={`grid grid-cols-1 gap-3 @xl:grid-cols-2 @4xl:grid-cols-3 ${className}`}>
            {customers.map((customer) => (
                <CustomerCard
                    key={customer.slug}
                    customer={customer}
                    person={people[customer.slug]}
                    hasCaseStudy={hasCaseStudy?.(customer.slug)}
                />
            ))}
        </div>
    )
}

export default CustomerCards
