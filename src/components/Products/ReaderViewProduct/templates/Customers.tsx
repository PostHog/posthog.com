import React from 'react'
import Link from 'components/Link'
import { SectionComponentProps } from '../types'

const renderLogo = (customer: any) => {
    if (!customer.logo) {
        return <span className="text-lg font-semibold text-primary">{customer.name}</span>
    }
    if (typeof customer.logo === 'function') {
        const LogoComponent = customer.logo
        return (
            <div style={{ maxHeight: customer.height ? customer.height * 5 + 'px' : '40px' }}>
                <LogoComponent className="fill-current object-contain max-w-full max-h-10 text-primary" />
            </div>
        )
    }
    return (
        <>
            <img src={customer.logo.light} alt={customer.name} className="w-auto object-contain max-h-10 dark:hidden" />
            <img
                src={customer.logo.dark}
                alt={customer.name}
                className="w-auto object-contain max-h-10 hidden dark:block"
            />
        </>
    )
}

const Customers = ({ id, productData, customers, hasCaseStudy }: SectionComponentProps) => {
    const customerData = productData?.customers || {}
    const items = customers.filter((customer: any) => customerData[customer.slug])

    if (!items.length) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-6">Customers using {productData?.name}</h2>
            <ul className="grid grid-cols-1 @2xl:grid-cols-2 gap-4 list-none m-0 p-0">
                {items.map((customer: any) => {
                    const data = customerData[customer.slug]
                    return (
                        <li
                            key={customer.slug}
                            className="m-0 p-5 border border-primary rounded bg-primary flex flex-col gap-3"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1 min-w-0">{renderLogo(customer)}</div>
                                {hasCaseStudy(customer.slug) && (
                                    <Link
                                        to={`/customers/${customer.slug}`}
                                        state={{ newWindow: true }}
                                        className="text-sm font-semibold underline whitespace-nowrap"
                                    >
                                        Read case study
                                    </Link>
                                )}
                            </div>
                            <p className="m-0 text-base font-semibold text-primary">{data.headline}</p>
                            <p className="m-0 text-sm italic text-secondary leading-relaxed">"{data.description}"</p>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default Customers
