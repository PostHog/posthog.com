import React from 'react'
import { Link } from 'gatsby'
import { IconCheck } from '@posthog/icons'
import OSTable from 'components/OSTable'
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

/** Each package with its description and monthly price. */
export function PlatformPackageList(): JSX.Element {
    const packages = usePlatformPackages()

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
                            <h3 className="text-xl font-semibold mb-2 mt-0">{addon.name}</h3>
                            <p className="text-secondary mb-2">{addon.description}</p>
                            {plan?.flat_rate && (
                                <div className="flex items-baseline mt-auto">
                                    {/* Enterprise is quote-only, so it gets a contact link where the
                                        others get a number. */}
                                    {addon.type === 'enterprise' ? (
                                        <Link
                                            to="/talk-to-a-human?edition=enterprise"
                                            className="text-lg font-bold text-red dark:text-yellow"
                                            state={{ newWindow: true }}
                                        >
                                            Contact us
                                        </Link>
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

/** Every feature across all packages, one row each, with a column per package. */
export function PlatformFeatureTable(): JSX.Element {
    const packages = usePlatformPackages()

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

    const rows = featureNames.map((featureName: string) => ({
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
                const feature = addon.plans[0].features.find((f: any) => f.name === featureName)
                return {
                    content: feature ? (
                        <div className="flex flex-col items-center justify-center min-h-[24px] gap-y-1">
                            {feature.note && <span className="text-center">{feature.note}</span>}
                            {feature.limit && (
                                <span className="text-center">
                                    {feature.limit} {feature.unit}
                                </span>
                            )}
                            {!feature.note && !feature.limit && <IconCheck className="w-5 h-5 text-green" />}
                        </div>
                    ) : null,
                }
            }),
        ],
    }))

    return <OSTable columns={columns} rows={rows} size="md" className="text-sm" width="full" />
}
