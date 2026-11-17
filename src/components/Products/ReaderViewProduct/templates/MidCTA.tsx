import React from 'react'
import { CTAs } from 'components/CTAs'
import Link from 'components/Link'
import type { SectionComponentProps } from '../types'
import { SECTION_H2 } from '../helpers'

interface Platform {
    label: string
    description?: string
    Icon: React.ComponentType<{ className?: string }>
    /** Tailwind classes for the icon tile. */
    tile?: string
    to?: string
}

const PlatformRow = ({ label, description, Icon, tile = 'bg-primary' }: Platform) => (
    <span className="flex items-center gap-3">
        <span className={`flex size-9 shrink-0 items-center justify-center rounded-md border border-primary ${tile}`}>
            <Icon className="size-5" />
        </span>
        <span className="text-sm leading-snug">
            <strong className="block">{label}</strong>
            {description && <span className="text-secondary">{description}</span>}
        </span>
    </span>
)

/**
 * A short sign-up block between sections, with the places you can use the
 * product and a line on each. Reads `productData.midCTA`.
 */
const MidCTA = ({ id, productData }: SectionComponentProps) => {
    const cta = productData?.midCTA
    if (!cta) return null

    return (
        <section
            id={id}
            className="scroll-mt-20 not-prose border-2 border-blue rounded-md bg-blue/10 p-5 @xl/reader-content:p-8"
        >
            <div className="grid grid-cols-1 @3xl/reader-content:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className={SECTION_H2}>{cta.title}</h2>
                    <p className="text-lg text-secondary m-0 mb-5">{cta.description}</p>
                    <CTAs wizardCommand={productData?.wizardCommand} links={[]} />
                </div>
                <div>
                    <p className="text-base font-bold m-0 mb-3">{cta.platformsLabel}</p>
                    <ul className="grid gap-3 list-none m-0 p-0">
                        {cta.platforms.map((platform: Platform) => (
                            <li key={platform.label} className="m-0">
                                {platform.to ? (
                                    <Link
                                        to={platform.to}
                                        state={{ newWindow: true }}
                                        externalNoIcon
                                        className="block text-primary hover:text-red dark:hover:text-yellow"
                                    >
                                        <PlatformRow {...platform} />
                                    </Link>
                                ) : (
                                    <PlatformRow {...platform} />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default MidCTA
