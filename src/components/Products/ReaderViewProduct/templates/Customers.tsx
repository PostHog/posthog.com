import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import { IconArrowUpRight } from '@posthog/icons'
import { SectionComponentProps } from '../types'

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
        <section id={id} className="scroll-mt-32 not-prose">
            <h2 className="mb-8">Who uses it?</h2>

            {productUsageStats.unique_users != null && productUsageStats.unique_orgs != null && (
                <p className="text-base mb-6">
                    In the last month, <strong>{productUsageStats.unique_users.toLocaleString('en-US')} people</strong>{' '}
                    across <strong>{productUsageStats.unique_orgs.toLocaleString('en-US')} teams</strong> used {name}.
                </p>
            )}

            {customerLogos.length > 0 && (
                <ul className="m-0 space-y-2">
                    {customerLogos.map((customer: any) => {
                        const data = customerData[customer.slug]
                        const isCaseStudy = hasCaseStudy(customer.slug)

                        return (
                            <li key={customer.slug} className="text-sm leading-snug">
                                <span className="inline-flex gap-2 align-middle w-24 justify-end">
                                    {renderLogo(customer)}
                                </span>
                                <span className="ml-4 text-[15px] text-primary relative top-px">{data.headline}</span>
                                {isCaseStudy && (
                                    <Link
                                        to={`/customers/${customer.slug}`}
                                        state={{ newWindow: true }}
                                        className="group border border-transparent hover:border-primary transition-all duration-100 rounded-full px-2 py-1 inline-flex items-center font-semibold whitespace-nowrap leading-none text-sm relative top-px ml-1"
                                    >
                                        <span className="w-[0px] group-hover:w-10 max-w-auto transition-all duration-100 whitespace-nowrap overflow-hidden inline-block">
                                            Read
                                        </span>
                                        <IconArrowUpRight className="size-3 relative top-px" aria-hidden />
                                    </Link>
                                )}
                            </li>
                        )
                    })}
                </ul>
            )}
        </section>
    )
}

export default Customers
