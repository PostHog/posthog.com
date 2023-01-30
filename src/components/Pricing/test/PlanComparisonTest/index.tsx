import { TrackedCTA } from 'components/CallToAction'
import Link from 'components/Link'
import Spinner from 'components/Spinner'
import Tooltip from 'components/Tooltip'
import usePostHog from '../../../../hooks/usePostHog'
import React, { useEffect, useState } from 'react'
import { BillingProductV2Type, BillingV2FeatureType, BillingV2PlanType } from 'types'
import CheckIcon from '../../../../images/check.svg'
import WarnIcon from '../../../../images/warning.svg'
import MinusIcon from '../../../../images/x.svg'
import './styles/index.scss'

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
        <div className="flex items-center text-xs text-muted">
            {!feature ? (
                <>
                    <img src={MinusIcon} alt="Checked" className="h-4 w-4 text-red-500" aria-hidden="true" />
                    <span className="sr-only">Not included</span>
                </>
            ) : feature.limit ? (
                <>
                    <img src={WarnIcon} alt="Checked" className="h-4 w-4 text-green-500 mr-4" aria-hidden="true" />
                    {feature.limit &&
                        `${convertLargeNumberToWords(feature.limit, null)} ${feature.unit && feature.unit}${
                            timeDenominator ? `/${timeDenominator}` : ''
                        }`}
                    {feature.note}
                </>
            ) : (
                <>
                    <img src={CheckIcon} alt="Checked" className="h-4 w-4 text-green-500 mr-4" aria-hidden="true" />
                    {feature.note}
                    <span className="sr-only">Included in {feature.name}</span>
                </>
            )}
        </div>
    )
}

const getProductTiers = (product?: BillingProductV2Type): JSX.Element => {
    const tiers = product?.tiers
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
                    return <></>
                }

                return (
                    <div key={product.name + '-tiers-' + i} className="pr-4">
                        {parseFloat(tier.unit_amount_usd) === 0 ? (
                            <div>
                                <span className="font-bold text-base">Free</span> for the{' '}
                                {convertLargeNumberToWords(tier.up_to, null, true, product.type)}
                            </div>
                        ) : (
                            <>
                                <span className="font-bold text-base">${parseFloat(tier.unit_amount_usd)}</span>
                                {/* the product types we have are plural, so we need to singularlize them and this works for now */}
                                <span className="text-gray">/{product.type.replace(/s$/, '')}</span>
                                <p className="text-sm mb-0">
                                    <Link
                                        to=""
                                        onClick={() => console.log('i clicked it')}
                                        className="text-red font-bold"
                                    >
                                        Volume discounts
                                    </Link>{' '}
                                    after first {convertLargeNumberToWords(tier.up_to)}/mo
                                </p>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
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
    const [numberOfColumns, setNumberOfColumns] = useState<number>(10)
    const comparisonFeaturesColumns = 3
    const planColumns = 2

    const excludedFeatures = ['dashboard_collaboration', 'ingestion_taxonomy']
    const borderStyle = 'border-b border-dashed border-gray-accent-light pb-6'

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
                console.log(data, 'THE DATA')
                setAvailablePlans(data.plans)
                setNumberOfColumns(data.plans?.length * 2 + comparisonFeaturesColumns)
            })
        }

        fetchPlans().catch((e) => console.error(e))
    }, [])

    return availablePlans?.length > 0 ? (
        <>
            <section className={className}>
                <div className={`w-full grid grid-cols-${numberOfColumns} relative mb-0`}>
                    {/* PLAN HEADERS */}
                    <div
                        className={`col-span-${comparisonFeaturesColumns} py-2 pr-6 text-[14px] font-medium text-almost-black sticky top-0 z-10 bg-opacity-95 bg-tan ${borderStyle}`}
                    >
                        <p className="font-bold mb-0">PostHog OS ships with all products</p>
                        <p className="text-black/50">
                            You can set billing limits for each, so you only pay for what you want and never receive an
                            unexpected bill.
                        </p>
                    </div>
                    {availablePlans.map((plan) => (
                        <div
                            key={`${plan.name}-header`}
                            className={`col-span-${planColumns} py-2 px-3 text-sm text-almost-black leading-tight sticky top-0 z-10 bg-opacity-95 bg-tan w-full ${borderStyle}`}
                        >
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <p className="font-bold mb-0">{plan.name}</p>
                                    <p className="text-black/50">{plan.description}</p>
                                </div>
                                <TrackedCTA
                                    event={{
                                        name: `clicked Get started - free`,
                                        type: 'cloud',
                                    }}
                                    type="primary"
                                    width="full lg:w-auto"
                                    className="shadow-md"
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
                    {/* PRODUCTS */}
                    {availablePlans?.[availablePlans.length - 1]?.products?.map((product) => (
                        <>
                            {product.feature_groups?.map((feature_group) => (
                                <>
                                    <div
                                        key={`${feature_group.name}-group`}
                                        className={`${
                                            product.tiered ? 'col-span-' + comparisonFeaturesColumns : 'col-span-full'
                                        } text-almost-black pt-6 pb-2`}
                                    >
                                        <h4>{feature_group.name}</h4>
                                    </div>
                                    {product.tiered
                                        ? availablePlans.map((plan) => (
                                              <div
                                                  className={`col-span-${planColumns} pl-8 pt-6`}
                                                  key={`${plan.key}-free-allocation-or-limit`}
                                              >
                                                  <div>
                                                      {getProductLimit(
                                                          plan.products?.find((p) => p.type === product.type)
                                                      )}
                                                  </div>
                                              </div>
                                          ))
                                        : null}

                                    {/* SUB-FEATURES */}
                                    {feature_group.features
                                        // don't include features that are in the excluded features list
                                        ?.filter((f) => !excludedFeatures.includes(f.key))
                                        ?.map((feature) => (
                                            <>
                                                <div
                                                    className={`col-span-${comparisonFeaturesColumns} mb-3 pl-8`}
                                                    key={`comparison-row-key-${feature.name}`}
                                                >
                                                    <Tooltip
                                                        content={
                                                            <div className="p-4">
                                                                <p className="font-bold mb-2">{feature.name}</p>
                                                                <p className="mb-0">{feature.description}</p>
                                                            </div>
                                                        }
                                                        tooltipClassName="max-w-xs m-4"
                                                    >
                                                        <span className={`pb-1 mb-2 ${borderStyle}`}>
                                                            {feature.name}
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                                {availablePlans.map((plan) => (
                                                    <div
                                                        className={`col-span-${planColumns} pl-8`}
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
                                            </>
                                        ))}
                                    {/* PRODUCT PRICING */}
                                    {product.tiers && (
                                        <>
                                            <div
                                                className={`col-span-${comparisonFeaturesColumns} mb-3 font-bold mt-4 pl-8`}
                                            >
                                                Pricing
                                            </div>
                                            {availablePlans.map((plan) => (
                                                <div
                                                    key={plan.name + '-' + product.name + '-' + 'pricing'}
                                                    className={`col-span-${planColumns} pl-8 text-sm font-medium text-almost-black mt-4`}
                                                >
                                                    {getProductTiers(
                                                        plan.products.find((p) => p.type === product.type)
                                                    )}
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    <div className={`col-span-full ${borderStyle} my-4`}></div>
                                </>
                            ))}
                        </>
                    ))}
                </div>
            </section>
        </>
    ) : (
        <Spinner />
    )
}
