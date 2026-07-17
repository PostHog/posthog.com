import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import { IconArrowUpRight } from '@posthog/icons'
import { SectionComponentProps } from '../types'
import ZoomHover from 'components/ZoomHover'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

const renderLogo = (customer: any, compact = false) => {
    const baseHeight = customer.height ? Math.max(customer.height - 3, 4) : 5
    const scaledHeight = compact ? Math.max(baseHeight - 1, 3) : baseHeight

    if (!customer.logo) {
        return <span className="text-sm font-semibold text-primary">{customer.name}</span>
    }

    if (typeof customer.logo === 'function') {
        const LogoComponent = customer.logo
        return <LogoComponent className={`fill-current object-contain max-w-full text-primary h-${scaledHeight}`} />
    }

    return (
        <>
            <img
                src={customer.logo.light}
                alt={customer.name}
                className={`w-auto object-contain dark:hidden max-h-${scaledHeight}`}
            />
            <img
                src={customer.logo.dark}
                alt={customer.name}
                className={`w-auto object-contain hidden dark:block max-h-${scaledHeight}`}
            />
        </>
    )
}

const Customers = ({ id, productData, customers, hasCaseStudy }: SectionComponentProps) => {
    const { name } = productData ?? {}
    const customerData = productData?.customers || {}
    const customerLogos = (customers || []).filter((customer: any) => customerData[customer.slug])

    const productUsageStatsData = useStaticQuery(graphql`
        query ProductUsageStatsQuery {
            allProductUsageStats {
                nodes {
                    product
                    unique_users
                    unique_orgs
                }
            }
        }
    `)
    const productUsageStats = productUsageStatsData?.allProductUsageStats?.nodes?.find(
        (n: { product: string }) => n.product === productData?.slug
    ) ?? { unique_users: null, unique_orgs: null }

    if (customerLogos.length === 0 && productUsageStats.unique_users == null) return null

    return (
        <section id={id} className="scroll-mt-32 not-prose space-y-6 @5xl/reader-content:-mt-12">
            <h2 className="mb-2">Who uses it?</h2>

            {productUsageStats.unique_users != null && productUsageStats.unique_orgs != null && (
                <p className="text-base">
                    In the last month, <strong>{productUsageStats.unique_users.toLocaleString('en-US')} people</strong>{' '}
                    across <strong>{productUsageStats.unique_orgs.toLocaleString('en-US')} teams</strong> used {name}.
                </p>
            )}

            {customerLogos.length > 0 && (
                <div className="grid grid-cols-[fit-content(110px)_1fr] gap-x-2 gap-y-3 leading-none @md/reader-content:items-center @5xl/reader-content:grid-cols-[fit-content(140px)_1fr_fit-content(140px)_1fr] @5xl/reader-content:gap-x-4 @5xl/reader-content:gap-y-6">
                    {customerLogos.map((customer: any) => {
                        const data = customerData[customer.slug]
                        const isCaseStudy = hasCaseStudy(customer.slug)

                        return (
                            <>
                                <div
                                    key={customer.slug}
                                    className="text-sm leading-none flex justify-end @5xl/reader-content:justify-start"
                                >
                                    {renderLogo(customer)}
                                </div>
                                <div>
                                    <span className="text-[15px] text-primary relative top-px">{data.headline}</span>
                                    {isCaseStudy && (
                                        <ZoomHover>
                                            <Link
                                                to={`/customers/${customer.slug}`}
                                                state={{ newWindow: true }}
                                                className="group border border-transparent hover:border-black/50 dark:hover:border-white/50 transition-all duration-100 rounded-full px-2 py-1 inline-flex items-center font-semibold whitespace-nowrap leading-none text-sm relative top-px -ml-1 hover:ml-1"
                                            >
                                                <span className="w-[0px] group-hover:w-10 max-w-auto transition-all duration-100 whitespace-nowrap overflow-hidden inline-block">
                                                    Read
                                                </span>
                                                <IconArrowUpRight className="size-3 relative top-px" aria-hidden />
                                            </Link>
                                        </ZoomHover>
                                    )}
                                </div>
                            </>
                        )
                    })}
                </div>
            )}
        </section>
    )
}

export default Customers
