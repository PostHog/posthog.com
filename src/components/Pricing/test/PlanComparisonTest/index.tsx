import { TrackedCTA } from 'components/CallToAction'
import Link from 'components/Link'
import Spinner from 'components/Spinner'
import Tooltip from 'components/Tooltip'
import usePostHog from '../../../../hooks/usePostHog'
import React, { useEffect, useState } from 'react'
import { BillingProductV2Type, BillingV2FeatureType, BillingV2PlanType } from 'types'
import CheckIcon from '../../../../images/check.svg'
import { ProductIcons } from '../../../ProductIcons/ProductIcons'
import MinusIcon from '../../../../images/x.svg'
import './styles/index.scss'
import Modal from 'components/Modal'
import { capitalizeFirstLetter } from '../../../../utils'
import { feature } from 'components/Pricing/PricingTable/classes'

const getBorderStyle = (side: 'b' | 't' | 'l' | 'r' = 'b'): string => {
    return `border-${side} border-dashed border-gray-accent-light pb-6`
}

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
                            <img
                                src={CheckIcon}
                                alt="Checked"
                                className="h-5 w-5 text-green-500 mr-4"
                                aria-hidden="true"
                            />
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
                                        <p className="col-span-1 mb-0">
                                            {i === 0 && isFirstTierFree && 'First '}
                                            {convertLargeNumberToWords(
                                                tier.up_to,
                                                tiers[i - 1]?.up_to,
                                                true,
                                                product.type
                                            )}
                                        </p>
                                        <p className="font-bold col-span-1 mb-0">
                                            {isFirstTierFree && i === 0
                                                ? 'Free'
                                                : `$${parseFloat(tier.unit_amount_usd).toFixed(numberOfSigFigs)}`}
                                        </p>
                                        {i !== tiers.length - 1 && (
                                            <div className={`col-span-full ${getBorderStyle()} pb-2 mb-2`} />
                                        )}
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
                                <span className="font-bold text-base">Free</span> for the{' '}
                                {convertLargeNumberToWords(tier.up_to, null, true, product.type)}
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
                                    after first {convertLargeNumberToWords(tier.up_to)}/mo
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
    platform: ProductIcons.dataManagement,
    support: ProductIcons.analytics,
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
    const [numberOfColumns, setNumberOfColumns] = useState<number>(7)
    const [numberOfColumnsMobile, setNumberOfColumnsMobile] = useState<number>(4)
    const comparisonFeaturesColumns = 3
    const planColumns = 2

    const excludedFeatures = ['dashboard_collaboration', 'ingestion_taxonomy']

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
                setNumberOfColumns(data.plans?.length * 2 + comparisonFeaturesColumns)
                setNumberOfColumnsMobile(data.plans?.length * 2)
            })
        }

        fetchPlans().catch((e) => console.error(e))
    }, [])

    return availablePlans?.length > 0 ? (
        <>
            <section className={className}>
                <div
                    className={`w-full grid grid-cols-${numberOfColumnsMobile} lg:grid-cols-${numberOfColumns} relative mb-0 space-y-4`}
                >
                    {/* PLAN HEADERS */}
                    <div
                        className={`col-span-full lg:col-span-${comparisonFeaturesColumns} py-2 pr-6 text-[14px] font-medium text-almost-black sticky top-0 z-10 bg-opacity-95 bg-tan ${getBorderStyle()}`}
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
                            className={`col-span-${planColumns} py-2 px-3 text-sm text-almost-black leading-tight sticky top-0 z-10 bg-opacity-95 bg-tan w-full ${getBorderStyle()}`}
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
                        <React.Fragment key={`product-${product.type}`}>
                            {product.feature_groups?.map((feature_group) => (
                                <React.Fragment key={`product-${product.type}-feature-group-${feature_group.name}`}>
                                    <div
                                        key={`${feature_group.name}-group`}
                                        className={`col-span-full text-center ${
                                            product.tiered
                                                ? `lg:col-span-${comparisonFeaturesColumns}`
                                                : 'col-span-full'
                                        } text-primary pt-6 pb-2 lg:text-left justify-center`}
                                    >
                                        <h4>
                                            <span className="inline-block h-6 w-6">{icons[feature_group.group]}</span>{' '}
                                            {feature_group.name}
                                        </h4>
                                    </div>
                                    {product.tiered
                                        ? availablePlans.map((plan) => (
                                              <div
                                                  className={`col-span-${planColumns} text-center py-4 lg:text-left lg:pl-8 lg:pt-6 justify-center`}
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

                                    {/* SUB-FEATURES */}
                                    {feature_group.features
                                        // don't include features that are in the excluded features list
                                        ?.filter((f) => !excludedFeatures.includes(f.key))
                                        ?.map((feature) => (
                                            <React.Fragment key={`${feature_group.name}-subfeature-${feature.name}`}>
                                                <div
                                                    className={`col-span-full bg-gray-accent-light py-2 text-center
                                                                lg:col-span-${comparisonFeaturesColumns} lg:pl-8 lg:py-0 lg:bg-transparent lg:text-left`}
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
                                                        placement={window.innerWidth > 1024 ? 'right' : 'bottom'}
                                                    >
                                                        <span className={`pb-1 mb-2 ${getBorderStyle()}`}>
                                                            {feature.name}
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                                {availablePlans.map((plan, i) => (
                                                    <div
                                                        className={`col-span-${planColumns} flex justify-center pt-2 pb-8 ${
                                                            i !== availablePlans.length - 1 && getBorderStyle('r')
                                                        }
                                                                    lg:pl-8 lg:py-0 lg:text-left lg:justify-start lg:border-none`}
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
                                            </React.Fragment>
                                        ))}
                                    {/* PRODUCT PRICING */}
                                    {product.tiers && (
                                        <>
                                            <div
                                                className={`col-span-full lg:col-span-${comparisonFeaturesColumns} text-center lg:text-left lg:mb-3 font-bold lg:mt-4 py-2 lg:py-0 lg:pl-8 bg-gray-accent-light lg:bg-transparent`}
                                            >
                                                Pricing
                                            </div>
                                            {availablePlans.map((plan, i) => (
                                                <div
                                                    key={plan.name + '-' + product.name + '-' + 'pricing'}
                                                    className={`col-span-${planColumns} pl-8 text-sm font-medium text-almost-black pt-4 ${
                                                        i !== availablePlans.length - 1 && getBorderStyle('r')
                                                    } lg:border-none`}
                                                >
                                                    <ProductTiers
                                                        product={plan.products.find((p) => p.type === product.type)}
                                                        planKey={plan.key}
                                                    />
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    <div className={`col-span-full ${getBorderStyle()} my-4`}></div>
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </section>
        </>
    ) : (
        <Spinner />
    )
}
