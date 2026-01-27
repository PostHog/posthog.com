import React from 'react'
import { Link } from 'gatsby'
import Logo from 'components/Logo'
import OSButton from 'components/OSButton'
import { useCustomers } from 'hooks/useCustomers'

interface CustomerData {
    headline: string
    description: string
}

interface CustomersSectionProps {
    productData: any
}

export default function CustomersSection({ productData }: CustomersSectionProps): JSX.Element {
    const { getCustomers, hasCaseStudy } = useCustomers()

    // Get customer slugs from product data and retrieve customer data
    const customerSlugs = productData?.customers ? Object.keys(productData.customers) : []
    const customers = getCustomers(customerSlugs)
    const customerData: Record<string, CustomerData> = productData?.customers || {}

    if (customers.length === 0) {
        return <></>
    }

    return (
        <section id="customers" className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Customers who love <Logo noText fill="primary" className="h-8 inline-block relative -top-0.5" />{' '}
                {productData?.name}
            </h2>

            <div className="space-y-6">
                {customers
                    .filter((customer) => customerData?.[customer.slug])
                    .map((customer) => {
                        const data = customerData?.[customer.slug]

                        // Determine logo rendering logic
                        const renderLogo = () => {
                            if (!customer.logo) {
                                return <span className="text-xl font-semibold">{customer.name}</span>
                            }

                            // Check if logo is a React component (single SVG format)
                            if (typeof customer.logo === 'function') {
                                const LogoComponent = customer.logo
                                return (
                                    <div
                                        className="max-h-10"
                                        style={{ maxHeight: customer.height ? customer.height * 4 + 'px' : '40px' }}
                                    >
                                        <LogoComponent className="max-w-full h-full fill-current object-contain" />
                                    </div>
                                )
                            }

                            // Otherwise, it's the existing light/dark object format
                            const heightClass = customer.height ? `max-h-${customer.height}` : 'max-h-10'

                            return (
                                <>
                                    <img
                                        src={customer.logo.light}
                                        alt={customer.name}
                                        className={`w-auto object-contain max-h-10 dark:hidden ${heightClass}`}
                                    />
                                    <img
                                        src={customer.logo.dark}
                                        alt={customer.name}
                                        className={`w-auto object-contain max-h-10 hidden dark:block ${heightClass}`}
                                    />
                                </>
                            )
                        }

                        return (
                            <div key={customer.slug} className="p-6 border border-primary bg-primary rounded">
                                <div className="mb-4 flex flex-wrap justify-between gap-4">
                                    <div className="flex-1">{renderLogo()}</div>

                                    {hasCaseStudy(customer.slug) && (
                                        <div className="shrink-0">
                                            <OSButton
                                                variant="secondary"
                                                size="sm"
                                                to={`/customers/${customer.slug}`}
                                                asLink
                                                state={{ newWindow: true }}
                                                className="whitespace-nowrap"
                                            >
                                                Read case study
                                            </OSButton>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-xl font-semibold mb-2">...{data.headline}</p>
                                    <p className="text-secondary italic mb-0 leading-normal">"{data.description}"</p>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </section>
    )
}
