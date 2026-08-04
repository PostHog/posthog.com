import React from 'react'
import { useCustomers } from 'hooks/useCustomers'
import Link from 'components/Link'

/**
 * High-profile customers, curated for the pricing page.
 *
 * Data comes from `hooks/useCustomers` via `getCustomers()` – the same source as
 * /customers and the homepage logo wall – so logos and light/dark variants stay
 * in sync automatically.
 *
 * Deliberately a horizontal rail on a tinted band, not a centered grid: the
 * free-tier section is already an icon-and-label grid, and two grids in a row
 * read as the same component twice. One dense row of logos also says "lots of
 * companies" better than a tidy 3x4 matrix does.
 */
const TRUST_LOGOS = [
    'ycombinator',
    'airbus',
    'ukgovt',
    'elevenlabs',
    'mistralai',
    'lovable',
    'supabase',
    'raycast',
    'clerk',
    'resend',
    'researchgate',
    'startengine',
]

/**
 * `height` on customer records is a Tailwind scale value used by /customers.
 * Mapped to literal class names so Tailwind's scanner always generates them
 * (interpolated `h-${n}` classes are not safelisted in this repo).
 */
const LOGO_HEIGHT_CLASSES: Record<number, string> = {
    7: 'h-4',
    8: 'h-5',
    9: 'h-6',
    10: 'h-6',
    11: 'h-7',
    12: 'h-7',
    14: 'h-8',
}

const Logo = ({ customer }: { customer: any }) => {
    const heightClass = LOGO_HEIGHT_CLASSES[customer.height as number] ?? 'h-6'

    if (!customer.logo) {
        return <span className="text-sm font-semibold opacity-60">{customer.name}</span>
    }

    if (typeof customer.logo === 'function') {
        const LogoComponent = customer.logo
        return <LogoComponent className={`w-auto max-w-full fill-current object-contain ${heightClass}`} />
    }

    return (
        <>
            <img
                src={customer.logo.light}
                alt={customer.name}
                className={`w-auto max-w-full object-contain dark:hidden ${heightClass}`}
            />
            <img
                src={customer.logo.dark}
                alt={customer.name}
                className={`w-auto max-w-full object-contain hidden dark:block ${heightClass}`}
            />
        </>
    )
}

export default function CustomerLogos(): JSX.Element {
    const { getCustomers } = useCustomers()
    const customers = getCustomers(TRUST_LOGOS)

    return (
        <div className="@container not-prose">
            <div
                data-scheme="secondary"
                className="bg-primary border border-primary rounded-md px-5 py-4 flex flex-col @2xl:flex-row @2xl:items-center gap-4 @2xl:gap-6"
            >
                <div className="shrink-0 @2xl:max-w-[13rem]">
                    <p className="text-[15px] font-bold leading-tight mb-0.5">60,000+ companies</p>
                    <p className="text-sm text-secondary leading-tight mb-1">from side projects to public companies</p>
                    {/* This text should be the same color as all other links */}
                    <Link to="/customers" state={{ newWindow: true }} className="text-sm font-semibold   underline">
                        Customer stories
                    </Link>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 @2xl:border-l @2xl:border-primary @2xl:pl-6 opacity-90">
                    {customers.map((customer) => (
                        <Logo key={customer.slug} customer={customer} />
                    ))}
                </div>
            </div>
        </div>
    )
}
