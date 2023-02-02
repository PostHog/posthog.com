import { TrackedCTA } from 'components/CallToAction'
import Link from 'components/Link'
import Spinner from 'components/Spinner'
import Tooltip from 'components/Tooltip'
import usePostHog from '../../../../hooks/usePostHog'
import React, { useEffect, useState } from 'react'
import { BillingProductV2Type, BillingV2FeatureType, BillingV2PlanType } from 'types'
import CheckIcon from '../../../../images/check.svg'
import { ProductIcons } from '../../../ProductIcons/ProductIcons'
import { NotProductIcons } from '../../../NotProductIcons/NotProductIcons'
import MinusIcon from '../../../../images/x.svg'
import './styles/index.scss'
import Modal from 'components/Modal'
import { capitalizeFirstLetter } from '../../../../utils'
import { feature } from 'components/Pricing/PricingTable/classes'

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

    return `${previousNum ? `${(previousNum / denominator).toFixed(0)}-` : multipleTiers ? 'first ' : ''}${(
        num / denominator
    ).toFixed(0)}${denominator === 1000000 ? ' million' : denominator === 1000 ? 'k' : ''}${
        !previousNum && multipleTiers ? ` ${productType}/mo` : ''
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
    product,
    modalOpen,
    setModalOpen,
}: {
    product: BillingProductV2Type
    modalOpen: boolean
    setModalOpen: (open: boolean) => void
}): JSX.Element | null => {
    const tiers = product?.tiers

    if (!product || !tiers) {
        return null
    }
    const isFirstTierFree = parseFloat(tiers[0].unit_amount_usd) === 0
    const numberOfSigFigs = tiers.map((tier) => tier.unit_amount_usd.split('.')[1]?.length).sort((a, b) => b - a)[0]

    return (
        <Modal open={modalOpen} setOpen={setModalOpen}>
            <div className="flex items-center w-full h-full justify-center">
                <div className="text-left max-w-xl bg-white rounded-md relative w-full p-8 m-8">
                    <p className="text-gray mb-1">{capitalizeFirstLetter(product.type)} pricing</p>
                    <p className="mb-1">
                        <span className="font-bold text-base">
                            $
                            {parseFloat(
                                isFirstTierFree ? tiers?.[1]?.unit_amount_usd : tiers?.[0]?.unit_amount_usd
                            ).toFixed(numberOfSigFigs)}
                        </span>
                        {/* the product types we have are plural, so we need to singularlize them and this works for now */}
                        <span className="text-gray">/{product.type.replace(/s$/, '')}</span>
                    </p>
                    {isFirstTierFree && (
                        <p className="text-gray">
                            First {convertLargeNumberToWords(tiers[0].up_to)} {product.type}/mo free
                        </p>
                    )}
                    <div>
                        <p className="text-gray">Volume discounts</p>
                        <div className="grid grid-cols-2">
                            {tiers.map((tier, i) => {
                                return (
                                    <React.Fragment key={`tiers-modal-${product.name}-tier-${i}`}>
                                        <p className="col-span-1 mb-0 border-b border-gray-accent-light border-dashed py-1">
                                            {capitalizeFirstLetter(
                                                convertLargeNumberToWords(
                                                    tier.up_to,
                                                    tiers[i - 1]?.up_to,
                                                    true,
                                                    product.type
                                                )
                                            )}
                                        </p>
                                        <p className="font-bold col-span-1 mb-0 border-b border-gray-accent-light border-dashed py-1">
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

const ProductTiers = ({ product, planKey }: { product?: BillingProductV2Type; planKey: string }): JSX.Element => {
    const tiers = product?.tiers
    const [modalOpen, setModalOpen] = useState(false)

    if (!product || !tiers) {
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
                    return <React.Fragment key={product.name + '-tiers-' + i}></React.Fragment>
                }

                return (
                    <div key={product.name + '-tiers-' + i} className="pr-4">
                        {parseFloat(tier.unit_amount_usd) === 0 ? (
                            <div>
                                <span className="font-bold text-base">Free</span> up to{' '}
                                {convertLargeNumberToWords(tier.up_to, null, true, product.type)}, then
                            </div>
                        ) : (
                            <>
                                <span className="font-bold text-base">${parseFloat(tier.unit_amount_usd)}</span>
                                {/* the product types we have are plural, so we need to singularlize them and this works for now */}
                                <span className="text-gray">/{product.type.replace(/s$/, '')}</span>
                                <p className="text-sm mb-0">
                                    <Link to="" onClick={() => setModalOpen(true)} className="text-red font-bold">
                                        Volume discounts
                                    </Link>{' '}
                                    after {convertLargeNumberToWords(tier.up_to)}/mo
                                    <ProductTiersModal
                                        modalOpen={modalOpen}
                                        setModalOpen={setModalOpen}
                                        product={product}
                                    />
                                </p>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

const icons = {
    product_analytics: ProductIcons.analytics,
    session_recording: ProductIcons.sessionRecording,
    feature_flags: ProductIcons.featureFlags,
    experiments: ProductIcons.experiments,
    integrations: ProductIcons.appLibrary,
    platform: NotProductIcons.platform,
    support: NotProductIcons.support,
}

export const getProductLimit = (product?: BillingProductV2Type): JSX.Element => {
    if (!product) return <></>
    if (!product.free_allocation) {
        return <span className="font-bold">Unlimited</span>
    }
    return (
        <span className="font-bold">
            {convertLargeNumberToWords(product.free_allocation)} {product.type}
            <span className="font-normal text-black/50">/mo</span>
        </span>
    )
}

export const PlanComparisonTest = ({ className = '' }) => {
    const posthog = usePostHog()
    const [availablePlans, setAvailablePlans] = useState<BillingV2PlanType[]>([])

    const excludedFeatures = [
        'dashboard_collaboration',
        'ingestion_taxonomy',
        'terms_and_conditions',
        'security_assessment',
        'app_metrics',
        'paths_advanced',
    ]

    useEffect(() => {
        const fetchPlans = async () => {
            const planKeys: string | null = 'starter-20230117,scale-20230117'
            const url = `${process.env.BILLING_SERVICE_URL + '/api/plans'}${planKeys ? `?keys=${planKeys}` : ''}`
            const headers = {
                'Content-Type': 'application/json',
            }
            const response = await fetch(url, {
                method: 'GET',
                headers: headers,
            })
            response.json().then((data) => {
                setAvailablePlans(data.plans)
            })
        }

        fetchPlans().catch((e) => console.error(e))
    }, [])

    return availablePlans?.length > 0 ? (
        <div className={`w-full relative mb-0 space-y-4 -mt-8 md:mt-0`}>
            {/* PLAN HEADERS */}
            <div className="flex flex-wrap sticky top-0 z-10 -mx-4 md:mx-0">
                <div
                    className={`basis-[100%] md:basis-0 flex-1 py-2 pr-6 text-[14px] font-medium text-almost-black bg-opacity-95 bg-tan border-b border-gray-accent-light pb-4 pl-4 md:pl-0`}
                >
                    <p className="font-bold mb-0">PostHog OS ships with all products</p>
                    <p className="text-black/50 text-sm mb-0">
                        You can set billing limits for each, so you only pay for what you want and never receive an
                        unexpected bill.
                    </p>
                </div>

                <div className="w-full bg-tan/90 md:flex-[0_0_60%] flex border-b border-gray-accent-light px-4 md:gap-4">
                    {availablePlans.map((plan) => (
                        <div
                            key={`${plan.name}-header`}
                            className={`py-2 px-2 text-sm text-almost-black leading-tight w-full pb-4  border-l border-gray-accent-light/50 first:border-l-0 md:pr-0 md:pl-0 md:border-0`}
                        >
                            <div className="flex-1 flex flex-col h-full justify-between">
                                <div>
                                    <p className="font-bold mb-0 text-center md:text-left">{plan.name}</p>
                                    <p className="hidden md:block text-black/50 text-sm mb-3">{plan.description}</p>
                                </div>
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
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* PRODUCTS */}
            {availablePlans?.[availablePlans.length - 1]?.products?.map((product) => (
                <React.Fragment key={`product-${product.type}`}>
                    {product.feature_groups?.map((feature_group) => (
                        <div key={`product-${product.type}-feature-group-${feature_group.name}`}>
                            <div className="flex flex-wrap">
                                <div
                                    key={`${feature_group.name}-group`}
                                    className={`flex-1 basis-[100%] md:basis-0 text-center text-primary pt-6 md:pb-2 md:text-left justify-center -mx-4 md:mx-0`}
                                >
                                    <h4 className="mb-0 flex items-center gap-2 w-full justify-center md:justify-start bg-gray-accent-light md:bg-transparent py-4 md:py-0 border-y border-gray-accent-light md:border-0">
                                        <span className="inline-block h-6 w-6">{icons[feature_group.group]}</span>{' '}
                                        {feature_group.name}
                                    </h4>
                                </div>
                                <div className="w-full md:flex-[0_0_60%] px-4 flex divide-x md:divide-x-0 divide-gray-accent-light/50 md:gap-4">
                                    {product.tiered
                                        ? availablePlans.map((plan) => (
                                              <div
                                                  className={`flex-1 text-center py-4 md:text-left md:pt-6 justify-center`}
                                                  key={`${plan.key}-${product.name}-free-allocation-or-limit`}
                                              >
                                                  <div>
                                                      {getProductLimit(
                                                          plan.products?.find((p) => p.type === product.type)
                                                      )}
                                                  </div>
                                              </div>
                                          ))
                                        : null}
                                </div>
                            </div>
                            {/* SUB-FEATURES */}
                            <div className="bg-gray-accent-light/80 p-1 rounded md:ml-6">
                                {feature_group.features
                                    // don't include features that are in the excluded features list
                                    ?.filter((f) => !excludedFeatures.includes(f.key))
                                    ?.map((feature) => (
                                        <div
                                            className="md:p-2 rounded md:hover:bg-gray-accent/50 md:flex"
                                            key={`${feature_group.name}-subfeature-${feature.name}`}
                                        >
                                            <div
                                                className={`flex-1 bg-gray-accent/25 rounded py-2 text-center md:py-0 md:bg-transparent md:text-left`}
                                                key={`comparison-row-key-${feature.name}`}
                                            >
                                                <Tooltip
                                                    content={
                                                        <div className="p-2">
                                                            <p className="font-bold text-[15px] mb-1">{feature.name}</p>
                                                            <p className="mb-0 text-sm">{feature.description}</p>
                                                        </div>
                                                    }
                                                    tooltipClassName="max-w-xs m-4"
                                                    placement={window.innerWidth > 767 ? 'right' : 'bottom'}
                                                >
                                                    <span
                                                        className={`pb-0.5 cursor-default font-bold text-[15px] border-b border-dashed border-gray-accent-light`}
                                                    >
                                                        {feature.name}
                                                    </span>
                                                </Tooltip>
                                            </div>
                                            <div className="divide-x md:divide-x-0 divide-gray-accent-light/50 w-full md:flex-[0_0_60%] flex md:gap-4">
                                                {availablePlans.map((plan, i) => (
                                                    <div
                                                        className={`flex-1 flex justify-center py-4 md:py-0 md:text-left md:justify-start md:border-none`}
                                                        key={`${plan.name}-${feature.name}-value`}
                                                    >
                                                        <PlanIcon
                                                            feature={plan.products
                                                                .find((p) => p.type === product.type)
                                                                ?.feature_groups?.find(
                                                                    (fg) => fg.name === feature_group.name
                                                                )
                                                                ?.features?.find((f) => f.name === feature.name)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            {/* PRODUCT PRICING */}
                            {product.tiers && (
                                <div className="flex flex-wrap md:pl-8 px-2">
                                    <div
                                        className={`hidden md:block basis-[100%] md:basis-0 flex-1 pt-4 text-center md:text-left font-bold md:bg-transparent`}
                                    >
                                        {feature_group.name} pricing
                                    </div>
                                    <div className="w-full md:flex-[0_0_60%] flex">
                                        {availablePlans.map((plan, i) => (
                                            <div
                                                key={plan.name + '-' + product.name + '-' + 'pricing'}
                                                className={`flex-1 pl-2 first:pl-0 text-sm font-medium text-almost-black pt-4 md:border-none`}
                                            >
                                                <ProductTiers
                                                    product={plan.products.find((p) => p.type === product.type)}
                                                    planKey={plan.key}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </React.Fragment>
            ))}
            <div className="flex flex-wrap z-10 -mx-4 md:mx-0 pb-6">
                <div
                    className={`basis-[100%] md:basis-0 flex-1 py-2 pr-6 text-[14px] font-medium text-almost-black bg-opacity-95 bg-tan pb-4`}
                ></div>

                <div className="w-full bg-tan/90 md:flex-[0_0_60%] flex px-4 md:gap-4">
                    {availablePlans.map((plan) => (
                        <div
                            key={`${plan.name}-header`}
                            className={`py-2 px-2 text-sm text-almost-black leading-tight w-full pb-4 border-l border-gray-accent-light/50 first:border-l-0 md:pr-0 md:pl-0 md:border-0`}
                        >
                            <div className="flex-1 flex flex-col h-full justify-between">
                                <div>
                                    <p className="font-bold mb-2 text-center md:text-left">{plan.name}</p>
                                </div>
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
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : (
        <div className="bg-gray-accent-light p-12 rounded flex justify-center">
            <Spinner />
        </div>
    )
}
