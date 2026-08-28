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
                const feature = addon.plans[0].features.find((f: any) => f.name === featureName)
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

/**
 * What a package adds over the one before it: features the previous package does not have,
 * plus features whose limit or note improved (activity-log retention, alert counts, response
 * times). Support response time is folded into "Priority support" the same way the table does.
 */
function incrementalFeatures(addon: any, previous?: any): any[] {
    const features = (addon.plans[0].features || []).filter((f: any) => f.key !== 'support_response_time')
    if (!previous) return features
    const before = new Map<string, any>((previous.plans[0].features || []).map((f: any) => [f.key, f]))
    return features.filter((f: any) => {
        const prior = before.get(f.key)
        return !prior || prior.limit !== f.limit || prior.note !== f.note
    })
}

// Which benefits lead on the compact cards, most important first. Anything not listed falls in
// behind these, and anything past MAX_HIGHLIGHTS folds into a "+N more" link, so the three cards
// stay the same height.
const HIGHLIGHTS = [
    'hipaa_baa',
    'sso_enforcement',
    '2fa_enforcement',
    'saml',
    'scim',
    'role_based_access',
    'dedicated_support',
    'priority_support',
    'organizations_projects',
    'white_labelling',
    'access_control',
    'approvals',
    'training',
    'terms_and_conditions',
    'invoice_payments',
    'audit_logs',
    'real_time_alerts',
    'xaa_authentication',
    'property_access_control',
    'bespoke_pricing',
    'session_replay_data_retention',
]
const MAX_HIGHLIGHTS = 6

const rank = (f: any): number => {
    const i = HIGHLIGHTS.indexOf(f.key)
    return i === -1 ? HIGHLIGHTS.length : i
}

/** The number or note that qualifies a feature, e.g. "2 months", "Unlimited". */
const featureDetail = (f: any): string | null =>
    f.limit ? `${f.limit} ${pluralizeUnit(f.limit, f.unit)}`.trim() : f.note || null

/**
 * One card per package: name, price, description, and the top benefits that package adds over
 * the one before it (the rest are one link away). Used on /enterprise; the packages page keeps
 * the list + full table.
 */
export function PlatformPackageCards(): JSX.Element {
    const packages = usePlatformPackages()
    const getCTA = usePackageCTA()

    return (
        <div className="@container">
            <div className="grid gap-4 @2xl:grid-cols-3 @2xl:gap-6">
                {packages.map((addon: any, i: number) => {
                    const plan = addon.plans[addon.plans.length - 1]
                    const previous = packages[i - 1]
                    const ranked = incrementalFeatures(addon, previous).sort((a: any, b: any) => rank(a) - rank(b))
                    const features = ranked.slice(0, MAX_HIGHLIGHTS)
                    const more = ranked.length - features.length
                    return (
                        <div key={addon.name} className="flex flex-col rounded-md border border-primary bg-primary p-5">
                            <div className="flex items-baseline justify-between gap-3">
                                <h3 className="m-0 text-xl font-semibold">{addon.name}</h3>
                                {addon.type === 'enterprise' ? (
                                    <span className="whitespace-nowrap font-semibold">Custom pricing</span>
                                ) : (
                                    plan?.flat_rate && (
                                        <span className="whitespace-nowrap">
                                            <strong>${plan.unit_amount_usd.replace('.00', '')}</strong>
                                            <span className="text-sm text-secondary">/mo</span>
                                        </span>
                                    )
                                )}
                            </div>
                            <p className="mb-0 mt-2 text-sm text-secondary">{addon.description}</p>
                            {previous && (
                                <p className="mb-0 mt-4 text-sm font-semibold text-primary">
                                    Everything in {previous.name}, plus
                                </p>
                            )}
                            <ul className={`m-0 list-none space-y-1.5 p-0 text-sm ${previous ? 'mt-2' : 'mt-4'}`}>
                                {features.map((f: any) => {
                                    const detail = featureDetail(f)
                                    return (
                                        <li key={f.key} className="flex gap-2">
                                            <IconCheck className="mt-0.5 size-4 shrink-0 text-green" />
                                            <span>
                                                {f.name}
                                                {detail && <span className="text-secondary"> · {detail}</span>}
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>

                            {more > 0 && (
                                <Link
                                    to="/platform-packages"
                                    state={{ newWindow: true }}
                                    className="mt-2 text-sm text-secondary underline hover:text-primary"
                                >
                                    +{more} more on the packages page
                                </Link>
                            )}
                            <div className="mt-auto pt-5">
                                <PackageCTA addon={addon} getCTA={getCTA} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
