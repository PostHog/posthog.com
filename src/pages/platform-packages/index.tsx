import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import { usePlatform } from 'components/Pricing/Platform/usePlatform'
import OSTable from 'components/OSTable'
import { IconCheck } from '@posthog/icons'
import { TreeMenu } from 'components/TreeMenu'
import { productOSNav } from 'hooks/useProductOSNavigation'
import { Link } from 'gatsby'

const LeftSidebarContent = () => {
    return <TreeMenu items={productOSNav.children} />
}

export default function PlatformPackages() {
    // Get platform data from usePlatform hook
    const platform = usePlatform()
    const platformAddons = platform.addons.filter((addon: any) => !addon.inclusion_only)

    // Get all unique feature names for the comparison table
    const allFeatureNames: string[] = Array.from(
        new Set(
            platformAddons.flatMap((addon: any) =>
                (addon.plans[0].features || [])
                    .filter((f: any) => f.key !== 'support_response_time')
                    .map((f: any) => f.name)
            )
        )
    )

    // Create table data for OSTable
    const columns = [
        { name: 'Feature', align: 'left' as const, width: '1fr' },
        ...platformAddons.map((addon: any) => ({
            name: addon.name,
            align: 'center' as const,
            width: 'minmax(60px,140px)',
        })),
    ]

    const rows = allFeatureNames.map((featureName: string) => ({
        cells: [
            {
                content: (
                    <div className="text-left">
                        <div className="font-semibold text-primary">{featureName}</div>
                        {/* Find the description from any addon that has this feature */}
                        {(() => {
                            const featureWithDesc = platformAddons
                                .flatMap((addon: any) => addon.plans[0].features || [])
                                .find((f: any) => f.name === featureName)
                            return featureWithDesc?.description ? (
                                <div className="text-sm text-secondary mt-1">{featureWithDesc.description}</div>
                            ) : null
                        })()}
                    </div>
                ),
            },
            ...platformAddons.map((addon: any) => {
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

    return (
        <>
            <SEO
                title="Platform packages - PostHog"
                description="Our platform packages are designed to help you manage your teams securely and efficiently on PostHog as you grow."
                image="/images/og/default.png"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />}>
                <div className="space-y-8">
                    <div>
                        <h1>Platform packages</h1>
                        <div>
                            Our platform packages help you manage your teams securely and efficiently on PostHog as you
                            grow. You can{' '}
                            <Link to="https://app.posthog.com/organization/billing/">
                                {' '}
                                subscribe to packages after signing up for PostHog
                            </Link>
                            . Need more help getting started?{' '}
                            <Link to="/services">We also offer service packages.</Link>
                        </div>
                    </div>

                    {/* List of addons with name, description, and flat rate */}
                    <div>
                        <h2 className="mb-4">Available packages</h2>
                        <div className="grid @3xl:grid-cols-3 gap-8">
                            {platformAddons.map((addon: any) => {
                                const plan = addon.plans[addon.plans.length - 1]
                                return (
                                    <div key={addon.name} className="">
                                        <h3 className="text-xl font-semibold mb-2 mt-0">{addon.name}</h3>
                                        <p className="text-secondary mb-2">{addon.description}</p>
                                        {plan?.flat_rate && (
                                            <div className="flex items-baseline mt-auto">
                                                <strong className="text-lg">
                                                    ${plan.unit_amount_usd.replace('.00', '')}
                                                </strong>
                                                <span className="text-sm opacity-60 ml-1">/mo</span>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div>
                        <h2>Feature comparison</h2>
                        <p className="-mt-4 mb-6">Compare features across all platform packages:</p>
                        <OSTable columns={columns} rows={rows} size="md" className="text-sm" />
                    </div>

                    <div>
                        <h2>Get started</h2>
                        <p>
                            You can{' '}
                            <Link to="https://app.posthog.com/organization/billing/">
                                {' '}
                                subscribe to packages after signing up for PostHog
                            </Link>
                            , via your billing page. Need help getting started, or want advice on which package to
                            choose? <Link to="/services">Our engineers can help.</Link>
                        </p>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
