import React from 'react'
import { Link } from 'gatsby'
import { IconCheck } from '@posthog/icons'
import OSTable from 'components/OSTable'
import useCloud from 'hooks/useCloud'
import usePostHogInstance from 'hooks/usePostHogInstance'
import { usePlatform } from './usePlatform'

/**
 * The two blocks that answer "what's in a platform package": the packages themselves, and a
 * feature-by-feature comparison of them.
 *
 * Extracted from the /platform-packages page so the pricing page can expand the same content
 * inline without a second copy of the prices and feature lists. Deliberately two exports
 * rather than one component with a `showHeadings` flag — each caller introduces them
 * differently (page sections on /platform-packages, a subsection of a card on /pricing), so
 * headings belong to the caller.
 */

/**
 * The packages someone can actually subscribe to. `inclusion_only` addons exist to be
 * bundled into other packages and have no price of their own.
 */
const usePlatformPackages = () => {
    const platform = usePlatform()
    return platform.addons.filter((addon: any) => !addon.inclusion_only)
}

/**
 * Where each package's CTA goes. Boost and Scale are self-serve — you turn them on from
 * billing settings, so the CTA goes straight there rather than to a form. Enterprise is the
 * one you talk to someone about, and it reuses the page's "Talk to a human" wording so the
 * three CTAs read as one set.
 */
const usePackageCTA = () => {
    const cloud = useCloud()
    const posthogInstance = usePostHogInstance()
    const isEU = posthogInstance ? posthogInstance.includes('eu.posthog.com') : cloud === 'eu'
    const billingUrl = `https://${isEU ? 'eu' : 'app'}.posthog.com/organization/billing`

    return (addon: any) =>
        addon.type === 'enterprise'
            ? { label: 'Talk to a human', url: '/talk-to-a-human?edition=enterprise', newWindow: true }
            : { label: 'Enable in billing', url: billingUrl, newWindow: false }
}

const ctaClasses = 'text-[15px] font-semibold text-red dark:text-yellow whitespace-nowrap'

const PackageCTA = ({ addon, getCTA }: { addon: any; getCTA: ReturnType<typeof usePackageCTA> }): JSX.Element => {
    const { label, url, newWindow } = getCTA(addon)
    return (
        <Link to={url} state={newWindow ? { newWindow: true } : undefined} className={ctaClasses}>
            {label}
        </Link>
    )
}

/** Each package with its description, monthly price, and a way to turn it on. */
export function PlatformPackageList(): JSX.Element {
    const packages = usePlatformPackages()
    const getCTA = usePackageCTA()

    return (
        // Declares its own @container: ReaderView only wraps *mdx* bodies in one, so a page
        // that passes children (/platform-packages does) gives these queries nothing to
        // resolve against and the grid would never go multi-column.
        <div className="@container">
            <div className="grid @3xl:grid-cols-3 gap-8">
                {packages.map((addon: any) => {
                    const plan = addon.plans[addon.plans.length - 1]
                    return (
                        <div key={addon.name}>
                            {/* The CTA sits on the title line, not under the price: the price is
                                the thing you compare across the three, so anything below it
                                pushes the next package's title out of line. */}
                            <div className="flex items-baseline justify-between gap-4 mb-2">
                                <h3 className="text-xl font-semibold mb-0 mt-0">{addon.name}</h3>
                                <PackageCTA addon={addon} getCTA={getCTA} />
                            </div>
                            <p className="text-secondary mb-2">{addon.description}</p>
                            {plan?.flat_rate && (
                                <div className="flex items-baseline mt-auto">
                                    {/* Enterprise is quote-only — its list rate isn't the number
                                        anyone actually pays, so it gets a label where the others
                                        get a price. Its CTA is already on the title line. */}
                                    {addon.type === 'enterprise' ? (
                                        <strong className="text-lg">Custom pricing</strong>
                                    ) : (
                                        <>
                                            <strong className="text-lg">
                                                ${plan.unit_amount_usd.replace('.00', '')}
                                            </strong>
                                            <span className="text-sm opacity-60 ml-1">/mo</span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

/**
 * Billing sends units in whatever form fits one item ("configuration") or many ("alerts"),
 * and the limit next to it can be either, so match the unit to the number rather than
 * printing "5 configuration".
 */
const pluralizeUnit = (limit: unknown, unit?: string | null): string => {
    if (!unit) return ''
    const count = Number(limit)
    const isPlural = unit.endsWith('s')
    if (count === 1) return isPlural ? unit.slice(0, -1) : unit
    return isPlural ? unit : `${unit}s`
}

/** Every feature across all packages, one row each, with a column per package. */
export function PlatformFeatureTable(): JSX.Element {
    const packages = usePlatformPackages()
    const getCTA = usePackageCTA()

    const allFeatures = packages.flatMap((addon: any) => addon.plans[0].features || [])

    // Support response time is the one feature that differs by *degree* rather than presence,
    // and it reads as a support-tier question rather than a platform one. Left off the table.
    const featureNames: string[] = Array.from(
        new Set(allFeatures.filter((f: any) => f.key !== 'support_response_time').map((f: any) => f.name))
    )

    const columns = [
        { name: 'Feature', align: 'left' as const, width: 'minmax(200px, 2fr)' },
        ...packages.map((addon: any) => ({
            name: addon.name,
            align: 'center' as const,
            width: '1fr',
        })),
    ]

    const featureRows = featureNames.map((featureName: string) => ({
        cells: [
            {
                content: (
                    <div className="text-left">
                        <div className="font-semibold text-primary">{featureName}</div>
                        {/* A feature's description is the same wherever it appears, so take it from
                            whichever package happens to list it first. */}
                        {(() => {
                            const described = allFeatures.find((f: any) => f.name === featureName)
                            return described?.description ? (
                                <div className="text-sm text-secondary mt-1">{described.description}</div>
                            ) : null
                        })()}
                    </div>
                ),
            },
            ...packages.map((addon: any) => {
                const feature = addon.plans[0].features?.find((f: any) => f.name === featureName)
                return {
                    content: feature ? (
                        <div className="flex flex-col items-center justify-center min-h-[24px] gap-y-1">
                            {feature.note && <span className="text-center">{feature.note}</span>}
                            {feature.limit && (
                                <span className="text-center">
                                    {feature.limit} {pluralizeUnit(feature.limit, feature.unit)}
                                </span>
                            )}
                            {!feature.note && !feature.limit && <IconCheck className="w-5 h-5 text-green" />}
                        </div>
                    ) : null,
                }
            }),
        ],
    }))

    // The same three CTAs as the package list, repeated under the last feature. By the time
    // you've read the whole table the buttons that got you interested are a screen or two
    // above, and the column you've settled on is the one you're looking at.
    const ctaRow = {
        key: 'ctas',
        cells: [
            { content: null },
            ...packages.map((addon: any) => ({
                content: (
                    <div className="flex items-center justify-center">
                        <PackageCTA addon={addon} getCTA={getCTA} />
                    </div>
                ),
            })),
        ],
    }

    return <OSTable columns={columns} rows={[...featureRows, ctaRow]} size="md" className="text-sm" width="full" />
}
