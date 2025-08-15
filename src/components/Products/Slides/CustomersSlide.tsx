import React from 'react'
import { Link } from 'gatsby'
import OSTable from 'components/OSTable'
import Logo from 'components/Logo'
import { SlideContainer } from './SlidesTemplate'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

interface Customer {
    slug: string
    name: string
    logo?:
        | React.ComponentType<any>
        | {
              light: string
              dark: string
          }
    height?: number
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
        { name: '', width: 'minmax(auto,80px)', align: 'center' as const },
        { name: 'Company', width: 'minmax(150px,200px)', align: 'center' as const },
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
                    return <span className="text-2xl font-semibold">{customer.name}</span>
                }

                // Check if logo is a React component (single SVG format)
                if (typeof customer.logo === 'function') {
                    const LogoComponent = customer.logo
                    const heightClass = customer.height ? `h-${customer.height}` : ''
                    const className = `fill-current object-contain ${heightClass}`.trim()

                    return (
                        <div className="" style={{ maxHeight: customer.height ? customer.height * 5 + 'px' : '' }}>
                            <LogoComponent className={`${className}`} />
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
                            className={`w-auto object-contain dark:hidden ${heightClass}`}
                        />
                        <img
                            src={customer.logo.dark}
                            alt={customer.name}
                            className={`w-auto object-contain hidden dark:block ${heightClass}`}
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
        <SlideContainer>
            <ScrollArea className="h-full">
                <h2 className="text-4xl font-bold text-primary mb-6 text-center">
                    Customers who love <Logo noText fill="primary" className="h-14 inline-block relative -top-1 mx-1" />{' '}
                    {productName}
                </h2>

                <div className="@2xl:hidden space-y-6">
                    {customers
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
                                    const className = `max-w-full max-h-12 fill-current object-contain`.trim()

                                    return (
                                        <div
                                            className=""
                                            style={{ maxHeight: customer.height ? customer.height * 6 + 'px' : '' }}
                                        >
                                            <LogoComponent
                                                className={`${className} h-full`}
                                                style={{ maxHeight: customer.height ? customer.height * 4 + 'px' : '' }}
                                            />
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
                                            className={`w-auto object-contain max-h-12 dark:hidden ${heightClass}`}
                                        />
                                        <img
                                            src={customer.logo.dark}
                                            alt={customer.name}
                                            className={`w-auto object-contain max-h-12 hidden dark:block ${heightClass}`}
                                        />
                                    </>
                                )
                            }

                            return (
                                <div key={customer.slug} className="p-6 border border-primary bg-primary rounded">
                                    <div className="mb-4 flex justify-between gap-8">
                                        <div className="flex-1">{renderLogo()}</div>

                                        <div className="shrink-0">
                                            {hasCaseStudy(customer.slug) && (
                                                <OSButton
                                                    variant="secondary"
                                                    size="xl"
                                                    to={`/customers/${customer.slug}`}
                                                    asLink
                                                    state={{ newWindow: true }}
                                                    className="whitespace-nowrap"
                                                >
                                                    Read case study
                                                </OSButton>
                                            )}
                                        </div>
                                    </div>
                                    <div className="">
                                        <p className="text-4xl font-semibold mb-2">{data.headline}</p>
                                        <p className="text-2xl italic mb-0 leading-normal">"{data.description}"</p>
                                    </div>
                                </div>
                            )
                        })}
                </div>

                <div className="hidden @2xl:block">
                    <OSTable columns={customerTableColumns} rows={customerTableRows} className="bg-primary" />
                </div>
            </ScrollArea>
        </SlideContainer>
    )
}
