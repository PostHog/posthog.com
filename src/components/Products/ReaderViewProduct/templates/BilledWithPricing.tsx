import React from 'react'
import { IconCheck } from '@posthog/icons'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import type { SectionComponentProps } from '../types'

/**
 * Thin pricing explainer for products billed through another product's meter
 * (e.g. Web Analytics -> Product Analytics events). Pair with a link out to
 * the parent product's pricing page; skip `plans` / `calculator` so this
 * doesn't look like a separate SKU.
 *
 * Optional productData fields:
 * - `billedWith` / `billedWithSlug` – parent product name + URL slug
 * - `pricingLead` – short opening sentence (falls back to `pricingDescription`)
 * - `pricingHighlights` – bullet facts pulled out of the dense prose
 * - `pricingFooter` – closing line under the bullets
 * - `presenterNotes.pricing` – last-resort prose blob if nothing structured exists
 */
const BilledWithPricing = ({ id, productData, allProducts }: SectionComponentProps) => {
    const billedWith = productData?.billedWith as string | undefined
    const pricingLead = (productData?.pricingLead || productData?.pricingDescription) as string | undefined
    const pricingHighlights = productData?.pricingHighlights as string[] | undefined
    const pricingFooter = productData?.pricingFooter as string | undefined
    const overview = productData?.presenterNotes?.pricing
    const showEventsLink = productData?.pricingEventsLink !== false

    const parentSlug =
        (productData?.billedWithSlug as string | undefined) ||
        allProducts?.find((p: any) => p.name?.toLowerCase() === billedWith?.toLowerCase())?.slug

    const parent = parentSlug ? allProducts?.find((p: any) => p.slug === parentSlug) : undefined
    const ParentIcon = parent?.Icon
    const parentPricingUrl = parentSlug ? `/${parentSlug}/pricing` : undefined

    const hasStructured = Boolean(pricingLead || pricingHighlights?.length)

    return (
        <section id={id} className="scroll-mt-40 not-prose max-w-2xl">
            <h2 className="text-3xl font-bold text-primary mt-0 !mb-6">How pricing works</h2>

            {billedWith ? (
                <div className="flex items-center gap-3 mb-6">
                    {ParentIcon ? <ParentIcon className={`size-10 text-${parent?.color || 'primary'}`} /> : null}
                    <div>
                        <p className="text-xs uppercase tracking-wider text-secondary m-0 mb-0.5">Billed with</p>
                        <p className="text-lg font-semibold text-primary m-0 leading-tight">
                            {parentSlug ? (
                                <Link to={`/${parentSlug}`} state={{ newWindow: true }} className="hover:underline">
                                    {billedWith}
                                </Link>
                            ) : (
                                billedWith
                            )}
                        </p>
                    </div>
                </div>
            ) : null}

            {hasStructured ? (
                <>
                    {pricingLead ? (
                        <p className="text-lg text-primary leading-relaxed m-0 mb-5">{pricingLead}</p>
                    ) : null}

                    {pricingHighlights?.length ? (
                        <ul className="list-none m-0 mb-5 p-0 space-y-3">
                            {pricingHighlights.map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-base text-primary">
                                    <IconCheck className="size-5 text-green shrink-0 mt-0.5" />
                                    <span className="leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>
                    ) : null}

                    {pricingFooter || showEventsLink ? (
                        <p className="text-sm text-secondary leading-relaxed m-0 mb-6">
                            {pricingFooter ? <>{pricingFooter} </> : null}
                            {showEventsLink ? (
                                <Link
                                    to="/docs/data/anonymous-vs-identified-events"
                                    state={{ newWindow: true }}
                                    className="font-semibold underline"
                                >
                                    Anonymous vs identified events
                                </Link>
                            ) : null}
                        </p>
                    ) : null}
                </>
            ) : overview ? (
                <div className="text-base text-primary/80 leading-relaxed mb-6 [&_a]:underline [&_a]:font-semibold">
                    {overview}
                </div>
            ) : null}

            {parentPricingUrl ? (
                <OSButton variant="secondary" asLink to={parentPricingUrl} size="md">
                    See {billedWith} pricing
                </OSButton>
            ) : null}
        </section>
    )
}

export default BilledWithPricing
