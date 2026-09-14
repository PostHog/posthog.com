import React from 'react'
import { useStaticQuery } from 'gatsby'
import OSButton from 'components/OSButton'
import { PricingTiers } from 'components/Pricing/Plans'
import { allProductsData } from 'components/Pricing/Pricing'
import { LabeledList } from 'components/Products/ReaderViewProduct'
import { SectionHeading } from 'components/Products/ReaderViewProduct/helpers'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct'

export const GroupAnalyticsHowToUse = ({ id }: SectionComponentProps) => (
    <section id={id} className="scroll-mt-20 not-prose">
        <SectionHeading>How do I use it?</SectionHeading>
        <ol className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-4 m-0 p-0 list-none">
            {[
                [
                    'Define a group type',
                    'Choose the entity you want to analyze, such as a company, project, or channel.',
                ],
                [
                    'Identify each group',
                    'Give every company, project, or channel a stable key and attach its properties.',
                ],
                ['Link events to the group', 'Associate events with the relevant group in your app or SDK.'],
                [
                    'Analyze at group level',
                    'Build trends, funnels, retention insights, flags, and experiments around groups.',
                ],
            ].map(([title, description], index) => (
                <li key={title} className="border border-primary rounded p-5 bg-primary">
                    <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                        Step {index + 1}
                    </span>
                    <h3 className="text-lg font-bold text-primary mt-2 mb-1">{title}</h3>
                    <p className="text-sm leading-relaxed text-secondary m-0">{description}</p>
                </li>
            ))}
        </ol>
    </section>
)

export const GroupAnalyticsTopFeatures = ({ id }: SectionComponentProps) => (
    <section id={id} className="scroll-mt-20 not-prose">
        <SectionHeading>Top features</SectionHeading>
        <LabeledList
            columns={[1, 2]}
            items={[
                {
                    label: 'Product analytics',
                    description: 'Aggregate trends, funnels, retention, and stickiness by company, project, or team.',
                },
                {
                    label: 'Feature flags',
                    description: 'Target a whole group so everyone in the same organization sees the same variant.',
                },
                {
                    label: 'Experiments',
                    description:
                        'Evaluate experiment results using group-level aggregations instead of individual users.',
                },
                {
                    label: 'Data warehouse',
                    description: 'Join group data to warehouse tables and calculate usage across company segments.',
                },
            ]}
        />
    </section>
)

export const GroupAnalyticsInstallation = ({ id }: SectionComponentProps) => (
    <section id={id} className="scroll-mt-20 not-prose mb-20">
        <SectionHeading>Install</SectionHeading>
        <p className="text-base leading-relaxed text-secondary mt-0 mb-5 max-w-3xl">
            Enable Group Analytics from your billing page, create a group type, then identify and link groups from your
            SDK. The documentation includes examples for every supported library.
        </p>
        <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-4">
            <OSButton asLink variant="primary" size="md" to="/signup" width="full">
                Get started – free
            </OSButton>
            <OSButton asLink variant="secondary" size="md" to="/docs/product-analytics/group-analytics" width="full">
                Read the documentation
            </OSButton>
        </div>
    </section>
)

const useGroupAnalyticsPricing = () => {
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)

    const productAddons = billingProducts.flatMap((product: any) => product.addons || [])
    const addon = productAddons.find(
        (candidate: any) =>
            candidate.name === 'Group Analytics' ||
            candidate.type === 'group_analytics' ||
            candidate.name?.toLowerCase().includes('group') ||
            candidate.type?.toLowerCase().includes('group')
    )
    const plan = addon?.plans?.[addon.plans.length - 1]
    const freeAllocation = plan?.tiers?.find((tier: any) => tier.unit_amount_usd === '0')?.up_to

    return { addon, plan, freeAllocation }
}

export const GroupAnalyticsPricing = ({ id }: SectionComponentProps) => {
    const { addon, plan, freeAllocation } = useGroupAnalyticsPricing()

    if (!addon || !plan) return null

    const firstPaidTier = plan.tiers?.find((tier: any) => tier.unit_amount_usd !== '0')

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <SectionHeading lede="Group Analytics is a paid add-on billed on identified events.">
                Group Analytics pricing
            </SectionHeading>

            <div className="border border-primary rounded p-6 bg-primary mb-8">
                {plan.flat_rate ? (
                    <div className="flex items-baseline">
                        <strong className="text-4xl text-primary">${plan.unit_amount_usd.replace('.00', '')}</strong>
                        <span className="text-base text-secondary ml-1">/mo</span>
                    </div>
                ) : (
                    <div>
                        <span className="text-sm text-secondary">Pricing starts at </span>
                        <strong className="text-3xl text-primary">${firstPaidTier?.unit_amount_usd}</strong>
                        <span className="text-sm text-secondary">/{addon.unit}</span>
                    </div>
                )}
                {freeAllocation && (
                    <p className="text-green text-sm font-medium mb-0 mt-2">
                        First <strong className="text-green">{freeAllocation.toLocaleString()}</strong> {addon.unit}s/mo
                        free
                    </p>
                )}
            </div>

            {!plan.flat_rate && addon.plans && (
                <div className="max-w-xl mb-10">
                    <h3 className="text-lg font-semibold text-primary mt-0 mb-4">Pricing breakdown</h3>
                    <div className="divide-y divide-primary">
                        <PricingTiers plans={addon.plans} type={addon.type} unit={addon.unit} />
                    </div>
                </div>
            )}

            <div className="border-l-4 border-yellow pl-4 max-w-3xl">
                <h3 className="text-base font-bold text-primary mt-0 mb-1">
                    All identified events count toward billing
                </h3>
                <p className="text-sm leading-relaxed text-secondary m-0">
                    Once you subscribe, billing applies to all identified events in your project, not only events with
                    group properties attached.
                </p>
            </div>
        </section>
    )
}

export const GroupAnalyticsPricingCTA = ({ id }: SectionComponentProps) => (
    <section id={id} className="scroll-mt-20 not-prose mb-20">
        <SectionHeading>Get started</SectionHeading>
        <p className="text-base leading-relaxed text-secondary mt-0 mb-5">Subscribe to add-ons after signing up.</p>
        <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-4">
            <OSButton asLink variant="primary" size="md" to="/signup" width="full">
                Get started – free
            </OSButton>
            <OSButton asLink variant="secondary" size="md" to="/pricing" width="full">
                Open pricing calculator
            </OSButton>
        </div>
    </section>
)
