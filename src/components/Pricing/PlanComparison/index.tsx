import { TrackedCTA } from 'components/CallToAction'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import usePostHog from '../../../hooks/usePostHog'
import React, { useState } from 'react'
import { BillingProductV2Type, BillingV2FeatureType, BillingV2PlanType } from 'types'
import CheckIcon from '../../../images/check.svg'
import MinusIcon from '../../../images/x.svg'
import './styles/index.scss'
import Modal from 'components/Modal'
import { capitalizeFirstLetter, toFixedMin } from '../../../utils'
import Label from 'components/Label'
import { graphql, useStaticQuery } from 'gatsby'
import { ExternalLink } from 'components/Icons'

const convertLargeNumberToWords = (
    // The number to convert
    num: number | null,
    // The previous tier's number
    previousNum?: number | null,
    // Whether we will be showing multiple tiers (to denote the first tier with 'first')
    multipleTiers = false,
    // The product type (to denote the unit)
    productType: BillingProductV2Type['type'] | null = null
): string => {
    if (!num && previousNum) {
        return `${convertLargeNumberToWords(previousNum, null)} +`
    }
    if (!num) {
        return ''
    }

    let denominator = 1

    if (num >= 1000000) {
        denominator = 1000000
    } else if (num >= 1000) {
        denominator = 1000
    }

    let prevDenominator = 1
    if (previousNum && previousNum >= 1000000) {
        prevDenominator = 1000000
    } else if (previousNum && previousNum >= 1000) {
        prevDenominator = 1000
    }

    return `${previousNum ? `${((previousNum + 1) / prevDenominator).toFixed(0)}-` : multipleTiers ? 'First ' : ''}${(
        num / denominator
    ).toFixed(0)}${denominator === 1000000 ? ' million' : denominator === 1000 ? 'k' : ''}${
        !previousNum && multipleTiers ? ` ${productType}s/mo` : ''
    }`
}

export function PlanIcon({
    feature,
    timeDenominator,
}: {
    feature?: BillingV2FeatureType
    timeDenominator?: string
}): JSX.Element {
    return (
        <div className="flex items-center text-[15px]">
            {!feature ? (
                <>
                    <img src={MinusIcon} alt="Checked" className="h-5 w-5 text-red-500" aria-hidden="true" />
                    <span className="sr-only">Not included</span>
                </>
            ) : feature.limit ? (
                <>
                    {feature.limit &&
                        `${convertLargeNumberToWords(feature.limit, null)} ${feature.unit && feature.unit}${
                            timeDenominator ? `/${timeDenominator}` : ''
                        }`}
                    {feature.note}
                </>
            ) : (
                <>
                    {feature.note ? (
                        <>{feature.note}</>
                    ) : (
                        <>
                            <img src={CheckIcon} alt="Checked" className="h-5 w-5 text-green-500" aria-hidden="true" />
                            <span className="sr-only">Included in {feature.name}</span>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

const ProductTiersModal = ({
    plan,
    modalOpen,
    setModalOpen,
}: {
    plan: BillingV2PlanType
    modalOpen: boolean
    setModalOpen: (open: boolean) => void
}): JSX.Element | null => {
    const tiers = plan?.tiers

    if (!plan || !tiers) {
        return null
    }
    const isFirstTierFree = parseFloat(tiers[0].unit_amount_usd) === 0
    const numberOfSigFigs = tiers.map((tier) => tier.unit_amount_usd.split('.')[1]?.length).sort((a, b) => b - a)[0]

    return (
        <Modal open={modalOpen} setOpen={setModalOpen}>
            <div className="flex items-center w-full h-full justify-center">
                <div className="text-left max-w-xl border border-border dark:border-dark shadow-xl bg-white dark:bg-accent-dark rounded-md relative w-full p-8 m-8">
                    <p className="mb-1 font-bold">{capitalizeFirstLetter(plan.name)} pricing</p>
                    <p className="mb-1">
                        <span className="font-bold text-base">
                            $
                            {parseFloat(
                                isFirstTierFree ? tiers?.[1]?.unit_amount_usd : tiers?.[0]?.unit_amount_usd
                            ).toFixed(numberOfSigFigs)}
                        </span>
                        {/* the product types we have are plural, so we need to singularlize them and this works for now */}
                        <span className="text-primary/50 dark:text-primary-dark/50">
                            /{plan.unit ? plan.unit.replace(/s$/, '') : 'unit'}
                        </span>
                    </p>
                    {isFirstTierFree && (
                        <p className="text-primary/50 dark:text-primary-dark/50">
                            First {convertLargeNumberToWords(tiers[0].up_to)} {plan.unit}s/mo free
                        </p>
                    )}
                    <div>
                        <p className="font-bold text-gray mb-1">Volume discounts</p>
                        <p className="text-sm text-red">
                            <Link
                                to="/docs/getting-started/estimating-usage-costs"
                                external={true}
                                className="flex items-center gap-x-1"
                            >
                                How do I estimate my usage? <ExternalLink className="!h-4 !w-4" />
                            </Link>
                        </p>
                        <div className="grid grid-cols-2">
                            {tiers.map((tier, i) => {
                                return (
                                    <React.Fragment key={`tiers-modal-${plan.product_key}-tier-${i}`}>
                                        <p className="col-span-1 mb-0 border-b border-border dark:border-dark py-1">
                                            {convertLargeNumberToWords(
                                                tier.up_to,
                                                tiers[i - 1]?.up_to,
                                                true,
                                                plan.unit
                                            )}
                                        </p>
                                        <p className="font-bold col-span-1 mb-0 border-b border-border dark:border-dark py-1">
                                            {isFirstTierFree && i === 0
                                                ? 'Free'
                                                : `$${parseFloat(tier.unit_amount_usd).toFixed(numberOfSigFigs)}`}
                                        </p>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

const ProductTiers = ({ plan }: { plan?: BillingV2PlanType }): JSX.Element => {
    const tiers = plan?.tiers
    const [modalOpen, setModalOpen] = useState(false)

    if (!plan || !tiers) {
        return (
            <>
                <span className="font-bold text-base">Free</span>
            </>
        )
    }
    return (
        <div>
            {tiers.map((tier, i) => {
                if ((parseFloat(tiers[0]?.unit_amount_usd) !== 0 && i > 0) || i > 1) {
                    return <React.Fragment key={plan.product_key + plan.plan_key + '-tiers-' + i}></React.Fragment>
                }

                return (
                    <div key={plan.product_key + plan.plan_key + '-tiers-' + i} className="pr-4">
                        {parseFloat(tier.unit_amount_usd) === 0 ? (
                            <div>
                                <span className="font-bold text-base">Free</span> up to{' '}
                                {convertLargeNumberToWords(tier.up_to, null, true, plan.unit)}, then
                            </div>
                        ) : (
                            <>
                                <span className="font-bold text-base">
                                    ${toFixedMin(parseFloat(tier.unit_amount_usd), 2)}
                                </span>
                                {/* the product types we have are plural, so we need to singularlize them and this works for now */}
                                <span className="text-gray">/{plan.unit ? plan.unit.replace(/s$/, '') : 'unit'}</span>
                                <p className="text-sm mb-0">
                                    <Link to="" onClick={() => setModalOpen(true)} className="text-red font-bold">
                                        Volume discounts
                                    </Link>{' '}
                                    after {convertLargeNumberToWords(tier.up_to)}/mo
                                    <ProductTiersModal modalOpen={modalOpen} setModalOpen={setModalOpen} plan={plan} />
                                </p>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export const getPlanLimit = (plan?: BillingV2PlanType): JSX.Element => {
    if (!plan) return <></>
    if (!plan.free_allocation) {
        return <span className="font-bold">Unlimited</span>
    }
    return (
        <span className="font-bold">
            {convertLargeNumberToWords(plan.free_allocation)} {plan.unit}s
            <span className="font-normal text-primary/50 dark:text-primary-dark/50">/mo</span>
        </span>
    )
}

const AddonTag = () => {
    return <Label text="Addon" className="ml-2" />
}

const AddonTooltipContent = ({
    addon,
    parentProductName,
}: {
    addon: BillingProductV2Type
    parentProductName: string
}): JSX.Element => {
    const referencePlan = addon.plans?.[0]
    const tiers = referencePlan?.tiers
    const isFirstTierFree = parseFloat(tiers?.[0].unit_amount_usd || '') === 0
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className="p-2">
            <p className="font-bold text-[15px] mb-2">
                {addon.name} <AddonTag />
            </p>
            <p className="text-sm mb-3">{addon.description}</p>
            <p className="text-sm text-primary/50 dark:text-primary-dark/75">
                {isFirstTierFree &&
                    `First ${convertLargeNumberToWords(tiers?.[0].up_to || null)} ${
                        referencePlan.unit
                    }s/mo free, then `}
                <span className="font-bold text-base text-primary dark:text-primary-dark/75">
                    ${parseFloat((isFirstTierFree ? tiers?.[1]?.unit_amount_usd : tiers?.[0]?.unit_amount_usd) || '')}
                </span>
                {/* the product types we have are plural, so we need to singularlize them and this works for now */}
                <span className="">/{addon.unit ? addon.unit.replace(/s$/, '') : 'unit'} with</span>{' '}
                <Link to="" onClick={() => setModalOpen(true)} className="text-red font-bold">
                    volume discounts
                </Link>
                , billed on top of {parentProductName}.
                <ProductTiersModal modalOpen={modalOpen} setModalOpen={setModalOpen} plan={referencePlan} />
            </p>
        </div>
    )
}

export const allProductsData = graphql`
    query GetAllProductData {
        allProductData {
            nodes {
                products {
                    description
                    docs_url
                    image_url
                    inclusion_only
                    contact_support
                    addons {
                        contact_support
                        description
                        docs_url
                        image_url
                        inclusion_only
                        name
                        type
                        unit
                        plans {
                            description
                            docs_url
                            image_url
                            name
                            plan_key
                            product_key
                            unit
                            features {
                                description
                                key
                                name
                            }
                            tiers {
                                current_amount_usd
                                current_usage
                                flat_amount_usd
                                unit_amount_usd
                                up_to
                            }
                        }
                    }
                    name
                    type
                    unit
                    usage_key
                    plans {
                        description
                        docs_url
                        features {
                            description
                            key
                            limit
                            name
                            note
                            unit
                        }
                        free_allocation
                        image_url
                        included_if
                        name
                        plan_key
                        product_key
                        tiers {
                            current_amount_usd
                            current_usage
                            flat_amount_usd
                            unit_amount_usd
                            up_to
                        }
                        unit
                    }
                }
            }
        }
    }
`

export const PlanComparison = ({
    groupsToShow,
    showCTA = true,
    showHeaders = true,
}: {
    groupsToShow?: string[]
    showCTA?: boolean
    showHeaders?: boolean
}): JSX.Element => {
    const posthog = usePostHog()

    const staticProducts: BillingProductV2Type[] = useStaticQuery(allProductsData).allProductData.nodes[0].products
    const staticPlans = staticProducts?.[0]?.plans

    const inclusionOnlyProducts = staticProducts
        .filter((product) => product.inclusion_only)
        .map((product) => product.type)
    console.log(inclusionOnlyProducts, 'inclusionOnlyProducts')

    const excludedFeatures = [
        'ingestion_taxonomy',
        'terms_and_conditions',
        'security_assessment',
        'app_metrics',
        'paths_advanced',
    ]

    const tooltipPlacement = typeof window !== 'undefined' && window.innerWidth > 767 ? 'right' : 'bottom'

    return (
        <div className={`w-full relative mb-0 space-y-4 -mt-8 md:mt-0`}>
            {/* PLAN HEADERS */}
            {showHeaders && (
                <div className="flex flex-wrap sticky top-[56px] lg:top-[108px] z-10 -mx-4 md:mx-0 bg-light dark:bg-dark">
                    <div
                        className={`basis-[100%] md:basis-0 flex-1 py-2 pr-6 text-[14px] font-medium border-b border-border dark:border-dark pb-4 pl-4 md:pl-0`}
                    >
                        <p className="font-bold mb-0">PostHog OS ships with all products</p>
                        <p className="text-primary/50 dark:text-primary-dark/50 text-sm mb-0">
                            Start with our generous free tiers and subcribe when you need more volume. Set billing
                            limits so you never receive an unexpected bill.
                        </p>
                    </div>

                    <div className="w-full md:flex-[0_0_60%] flex border-b border-border dark:border-dark px-4 md:gap-4">
                        {staticPlans.map((plan) => (
                            <div
                                key={`${plan.plan_key}-header`}
                                className={`py-2 px-2 text-sm leading-tight w-full pb-4  border-l border-accent dark:border-accent-dark first:border-l-0 md:pr-0 md:pl-0 md:border-0`}
                            >
                                <div className="flex-1 flex flex-col h-full justify-between">
                                    <div>
                                        {!groupsToShow ||
                                        !groupsToShow.some((product_name) =>
                                            inclusionOnlyProducts.includes(product_name)
                                        ) ? (
                                            <>
                                                <p className="font-bold mb-0 text-center md:text-left">
                                                    {plan.free_allocation ? 'Free' : 'Paid'}
                                                </p>
                                                <p className="hidden md:block text-primary/50 dark:text-primary-dark/50 text-sm mb-3">
                                                    {plan.free_allocation
                                                        ? 'Generous free usage on every product. Best for early-stage startups and hobbyists.'
                                                        : 'The whole hog. Pay per use with billing limits to control spend. Priority support.'}
                                                </p>
                                            </>
                                        ) : groupsToShow.some((product_name) =>
                                              inclusionOnlyProducts.includes(product_name)
                                          ) ? (
                                            <>
                                                <div className="mb-2">
                                                    <p className="font-bold mb-0 text-center md:text-left">
                                                        {plan.free_allocation ? 'Free' : 'Included'}
                                                    </p>
                                                    {!plan.free_allocation && (
                                                        <p className="hidden md:block text-primary/50 dark:text-primary-dark/50 text-sm mb-3">
                                                            With any paid product plan
                                                        </p>
                                                    )}
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                    {showCTA && (
                                        <TrackedCTA
                                            event={{
                                                name: `clicked Get started - free`,
                                                type: 'cloud',
                                            }}
                                            type="primary"
                                            size="md"
                                            className="shadow-md !w-auto"
                                            to={`https://${
                                                posthog?.isFeatureEnabled &&
                                                posthog?.isFeatureEnabled('direct-to-eu-cloud')
                                                    ? 'eu'
                                                    : 'app'
                                            }.posthog.com/signup`}
                                        >
                                            Get started - free
                                        </TrackedCTA>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* PRODUCTS */}
            {staticProducts
                ?.filter((product) => product.type !== 'data_warehouse')
                .map((product) => {
                    console.log(product.name)
                    if (groupsToShow && !groupsToShow.includes(product.type)) return null
                    // some products only have a paid plan, but we need to show something for the free plan, so we stub out values using this var
                    const stubMissingPlan = product.plans.length !== staticPlans.length
                    return (
                        <React.Fragment key={`product-${product.type}`}>
                            <div key={`product-${product.type}-feature-group-${product.type}`}>
                                <div className="flex flex-wrap">
                                    <div
                                        key={`${product.name}-group`}
                                        className={`flex-1 basis-[100%] md:basis-0 text-center pt-6 md:pb-2 md:text-left justify-center -mx-4 md:mx-0`}
                                    >
                                        <h4 className="mb-0 flex items-center gap-2 w-full justify-center md:justify-start bg-accent dark:bg-accent-dark md:!bg-transparent py-4 md:py-0 border-y border-border dark:border-dark md:border-0">
                                            <span className="inline-block h-6 w-6">
                                                <img
                                                    src={product.image_url}
                                                    alt={`logo for PostHog's ${product.name} product`}
                                                />
                                            </span>{' '}
                                            {product.name}
                                        </h4>
                                    </div>
                                    <div className="w-full md:flex-[0_0_60%] px-4 flex divide-x md:divide-x-0 divide-border dark:divide-border-dark md:gap-4">
                                        {product.plans?.map((plan, i) => (
                                            <React.Fragment
                                                key={`${plan.plan_key}-${product.type}-free-allocation-or-limit`}
                                            >
                                                {i === 0 && stubMissingPlan && <div className={`flex-1`} />}
                                                <div
                                                    className={`flex-1 text-center py-4 md:text-left md:pt-6 justify-center`}
                                                >
                                                    <div>{getPlanLimit(plan)}</div>
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                                {/* PRODUCT FEATURES & ADDONS */}
                                <div className="bg-accent dark:bg-accent-dark p-1 border border-light dark:border-dark rounded md:ml-6">
                                    {product.plans?.[product.plans.length - 1]?.features
                                        // don't include features that are in the excluded features list
                                        ?.filter((f) => !excludedFeatures.includes(f.key))
                                        ?.map((feature) => (
                                            <div
                                                className="md:p-2 rounded md:hover:bg-light dark:md:hover:bg-dark md:flex"
                                                key={`${product.type}-subfeature-${feature.name}`}
                                            >
                                                <div
                                                    className={`flex-1 bg-accent/25 dark:bg-accent-dark/25 rounded py-2 text-center md:py-0 md:!bg-transparent md:text-left`}
                                                    key={`comparison-row-key-${feature.name}`}
                                                >
                                                    <Tooltip
                                                        content={() => (
                                                            <div className="p-2">
                                                                <p className="font-bold text-[15px] mb-1">
                                                                    {feature.name}
                                                                </p>
                                                                <p className="mb-0 text-sm">{feature.description}</p>
                                                            </div>
                                                        )}
                                                        tooltipClassName="max-w-xs m-4"
                                                        placement={tooltipPlacement}
                                                    >
                                                        <span
                                                            className={`pb-0.5 cursor-default font-bold text-[15px] border-b border-border dark:border-dark`}
                                                        >
                                                            {feature.name}
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                                <div className="divide-x md:divide-x-0 divide-border dark:divide-border-dark w-full md:flex-[0_0_60%] flex md:gap-4">
                                                    {product.plans.map((plan, i) => (
                                                        <React.Fragment key={`${plan.plan_key}-${feature.key}-value`}>
                                                            {i === 0 && stubMissingPlan ? (
                                                                <div
                                                                    className={`flex-1 flex justify-center py-4 md:py-0 md:text-left md:justify-start md:border-none`}
                                                                    key={`stubbed-plan-${feature.key}-value`}
                                                                >
                                                                    <PlanIcon feature={undefined} />
                                                                </div>
                                                            ) : null}
                                                            <div
                                                                className={`flex-1 flex justify-center py-4 md:py-0 md:text-left md:justify-start md:border-none`}
                                                            >
                                                                <PlanIcon
                                                                    feature={plan.features?.find(
                                                                        (f) => f.name === feature.name
                                                                    )}
                                                                />
                                                            </div>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    {/* PRODUCT ADDONS */}
                                    {product.addons?.map((addon) => (
                                        <div
                                            className="md:p-2 rounded md:hover:bg-accent dark:md:hover:bg-accent-dark md:flex"
                                            key={`${product.type}-addon-${addon.type}`}
                                        >
                                            <div
                                                className={`flex-1 bg-accent/25 dark:bg-accent-dark/25 rounded py-2 text-center md:py-0 md:bg-transparent md:text-left`}
                                                key={`comparison-row-key-${addon.type}`}
                                            >
                                                <Tooltip
                                                    content={() => (
                                                        <AddonTooltipContent
                                                            addon={addon}
                                                            parentProductName={product.name}
                                                        />
                                                    )}
                                                    tooltipClassName="max-w-xs m-4"
                                                    placement={tooltipPlacement}
                                                >
                                                    <span>
                                                        <span
                                                            className={`pb-0.5 cursor-default font-bold text-[15px] border-b border-border dark:border-dark`}
                                                        >
                                                            {addon.name}{' '}
                                                        </span>
                                                        <AddonTag />
                                                    </span>
                                                </Tooltip>
                                            </div>
                                            <div className="divide-x md:divide-x-0 divide-border dark:divide-border-dark w-full md:flex-[0_0_60%] flex md:gap-4">
                                                {product.plans.map((plan) => (
                                                    <div
                                                        className={`flex-1 flex justify-center py-4 md:py-0 md:text-left md:justify-start md:border-none`}
                                                        key={`${plan.plan_key}-${addon.type}-value`}
                                                    >
                                                        {plan.free_allocation ? (
                                                            <PlanIcon />
                                                        ) : (
                                                            <Tooltip
                                                                content={() => (
                                                                    <AddonTooltipContent
                                                                        addon={addon}
                                                                        parentProductName={product.name}
                                                                    />
                                                                )}
                                                                tooltipClassName="max-w-xs m-4"
                                                                placement={tooltipPlacement}
                                                            >
                                                                <span
                                                                    className={`pb-0.25 cursor-default border-b border-border dark:border-dark`}
                                                                >
                                                                    Available
                                                                </span>
                                                            </Tooltip>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* PRODUCT PRICING */}
                                {
                                    // If there is any plan with tiers, show the pricing
                                    product.plans.find((plan) => plan.tiers && plan.tiers?.length > 0) && (
                                        <div className="flex flex-wrap md:pl-8 px-2">
                                            <div
                                                className={`hidden md:block basis-[100%] md:basis-0 flex-1 pt-4 text-center md:text-left font-bold md:bg-transparent`}
                                            >
                                                {product.name} pricing
                                            </div>
                                            <div className="w-full md:flex-[0_0_60%] flex">
                                                {product.plans?.map((plan) => (
                                                    <div
                                                        key={plan.plan_key + '-' + product.type + '-pricing'}
                                                        className={`flex-1 pl-2 first:pl-0 text-sm font-medium pt-4 md:border-none`}
                                                    >
                                                        <ProductTiers plan={plan} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </React.Fragment>
                    )
                })}
            <div className="flex flex-wrap z-10 -mx-4 md:mx-0 pb-6">
                <div
                    className={`basis-[100%] md:basis-0 flex-1 py-2 pr-6 text-[14px] font-medium bg-opacity-95 pb-4`}
                ></div>

                <div className="w-full md:flex-[0_0_60%] flex px-4 md:gap-4">
                    {staticPlans.map((plan) => (
                        <div
                            key={`${plan.plan_key}-header`}
                            className={`py-2 px-2 text-sm text-almost-black leading-tight w-full pb-4 border-l border-border dark:border-dark first:border-l-0 md:pr-0 md:pl-0 md:border-0`}
                        >
                            <div className="flex-1 flex flex-col h-full justify-between">
                                <div>
                                    {!groupsToShow ? (
                                        <p className="font-bold mb-2 text-center md:text-left">
                                            {plan.free_allocation ? 'Free' : 'Paid'}
                                        </p>
                                    ) : groupsToShow.some((product_name) =>
                                          inclusionOnlyProducts.includes(product_name)
                                      ) ? (
                                        <>
                                            <div className="mb-2">
                                                <p className="font-bold mb-0 text-center md:text-left">
                                                    {plan.free_allocation ? 'Free' : 'Included'}
                                                </p>
                                                {!plan.free_allocation && (
                                                    <p className="text-sm text-primary/50 dark:text-primary-dark/50">
                                                        With any paid product plan
                                                    </p>
                                                )}
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                                {showCTA && (
                                    <TrackedCTA
                                        event={{
                                            name: `clicked Get started - free`,
                                            type: 'cloud',
                                        }}
                                        type="primary"
                                        size="sm"
                                        className="shadow-md !w-auto"
                                        to={`https://${
                                            posthog?.isFeatureEnabled && posthog?.isFeatureEnabled('direct-to-eu-cloud')
                                                ? 'eu'
                                                : 'app'
                                        }.posthog.com/signup`}
                                    >
                                        Get started - free
                                    </TrackedCTA>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
