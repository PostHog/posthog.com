import React from 'react'
import { Link } from 'gatsby'
import OSTable from 'components/OSTable'
import Logo from 'components/Logo'

interface Customer {
    slug: string
    name: string
    logo?:
        | React.ComponentType<any>
        | {
              light: string
              dark: string
          }
}

interface CustomerData {
    headline: string
    description: string
}

interface CustomersSlideProps {
    productName: string
    customers: Customer[]
    customerData: Record<string, CustomerData>
    hasCaseStudy: (slug: string) => boolean
}

export default function CustomersSlide({ productName, customers, customerData, hasCaseStudy }: CustomersSlideProps) {
    // Create table structure for customers
    const customerTableColumns = [
        { name: '', width: 'minmax(auto,100px)', align: 'center' as const },
        { name: 'Company', width: 'minmax(150px,300px)', align: 'center' as const },
        { name: '', width: 'minmax(auto,1fr)', align: 'left' as const },
        { name: 'Case study', width: 'minmax(auto,100px)', align: 'center' as const },
    ]

    const customerTableRows = customers
        .filter((customer) => {
            return customerData?.[customer.slug]
        })
        .map((customer, index) => {
            const data = customerData?.[customer.slug]

            // Determine logo rendering logic
            const renderLogo = () => {
                if (!customer.logo) {
                    return <span>{customer.name}</span>
                }

                // Check if logo is a React component (single SVG format)
                if (typeof customer.logo === 'function') {
                    const LogoComponent = customer.logo
                    return (
                        <div className="fill-current">
                            <LogoComponent className="w-full object-contain max-h-6" />
                        </div>
                    )
                }

                // Otherwise, it's the existing light/dark object format
                return (
                    <>
                        <img
                            src={customer.logo.light}
                            alt={customer.name}
                            className="w-auto object-contain dark:hidden max-h-10"
                        />
                        <img
                            src={customer.logo.dark}
                            alt={customer.name}
                            className="w-auto object-contain hidden dark:block max-h-10"
                        />
                    </>
                )
            }

            return {
                cells: [
                    { content: index + 1 },
                    {
                        content: renderLogo(),
                        className: '!p-4',
                    },
                    {
                        content: (
                            <>
                                <strong>...{data.headline}</strong>
                                <span className="text-lg italic">"{data.description}"</span>
                            </>
                        ),
                        className: 'text-xl !px-8 !py-4',
                    },
                    {
                        content: hasCaseStudy(customer.slug) ? (
                            <Link
                                to={`/customers/${customer.slug}`}
                                state={{ newWindow: true }}
                                className="underline font-semibold"
                            >
                                Link
                            </Link>
                        ) : null,
                        className: 'text-lg',
                    },
                ],
            }
        })

    return (
        <div className="h-full p-12 bg-light dark:bg-dark">
            <h2 className="text-4xl font-bold text-primary mb-6 text-center">
                Customers who love <Logo noText fill="primary" className="h-14 inline-block relative -top-1 mx-1" />{' '}
                {productName}
            </h2>
            <OSTable columns={customerTableColumns} rows={customerTableRows} className="bg-primary" />
        </div>
    )
}
