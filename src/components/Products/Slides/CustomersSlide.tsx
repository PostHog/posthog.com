import React from 'react'
import { Link } from 'gatsby'
import OSTable from 'components/OSTable'
import Logo from 'components/Logo'

interface Customer {
    slug: string
    name: string
    logo?: {
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

            return {
                cells: [
                    { content: index + 1 },
                    {
                        content: customer.logo ? (
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
                        ) : (
                            <span>{customer.name}</span>
                        ),
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
                            <Link to={`/customers/${customer.slug}`} state={{ newWindow: true }}>
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
