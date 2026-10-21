import React from 'react'
import Link from 'components/Link'
import OSTable from 'components/OSTable'
import useProduct from 'hooks/useProduct'
import { useCustomers } from 'hooks/useCustomers'

interface CustomerData {
    headline: string
    description: string
}

interface Product {
    type: string
    name: string
    slug: string
    customers?: Record<string, CustomerData>
}

interface ProductCustomerTableProps {
    productType: string
}

type CellContent = number | string | JSX.Element | null

interface Cell {
    content: CellContent
    className?: string
}

interface Row {
    cells: Cell[]
}

const ProductCustomerTable = ({ productType }: ProductCustomerTableProps) => {
    const product = useProduct({ handle: productType }) as Product
    const { getCustomers, hasCaseStudy } = useCustomers()

    if (!product?.customers) {
        return null
    }

    const customerSlugs = Object.keys(product.customers)
    const customers = getCustomers(customerSlugs)

    const renderLogo = (customer: any): JSX.Element => {
        if (!customer.logo) {
            return <span>{customer.name}</span>
        }
        if (typeof customer.logo === 'function') {
            const LogoComponent = customer.logo
            return <LogoComponent className="w-auto object-contain fill-current" />
        }
        return (
            <>
                <img src={customer.logo.light} alt={customer.name} className="w-auto object-contain dark:hidden" />
                <img src={customer.logo.dark} alt={customer.name} className="w-auto object-contain hidden dark:block" />
            </>
        )
    }

    const columns = [
        { name: '', width: 'auto', align: 'center' as const },
        { name: 'Company', width: 'minmax(150px,1fr)', align: 'center' as const },
        { name: '', width: 'minmax(auto,550px)', align: 'left' as const },
        { name: 'Case study', width: 'minmax(auto,100px)', align: 'center' as const },
    ]

    const rows: Row[] = customers
        .map((customer, index) => {
            const customerData = product.customers?.[customer.slug]
            if (!customerData) return null

            return {
                cells: [
                    { content: index + 1 },
                    {
                        content: renderLogo(customer),
                        className: '!p-4',
                    },
                    {
                        content: (
                            <>
                                <strong>...{customerData.headline}</strong>
                                <span className="text-sm italic">"{customerData.description}"</span>
                            </>
                        ),
                        className: 'text-sm flex-col',
                    },
                    {
                        content: hasCaseStudy(customer.slug) ? (
                            <Link to={`/customers/${customer.slug}`}>Link</Link>
                        ) : null,
                    },
                ],
            }
        })
        .filter((row): row is Row => row !== null)

    return <OSTable columns={columns} rows={rows} />
}

export default ProductCustomerTable
