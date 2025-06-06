import React, { useEffect, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import Editor from 'components/Editor'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import OSTable from 'components/OSTable'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { useCustomers } from 'hooks/useCustomers'

const CUSTOMER_ORDER = [
    'ycombinator',
    'mistralai',
    'elevenlabs',
    'raycast',
    'airbus',
    'dhl',
    'startengine',
    'assemblyai',
    'hasura',
    'trust',
    'researchgate',
    'posthog',
]

interface CustomerProps {
    number: number
    customer: {
        logo?: {
            light: string
            dark: string
        }
        name: string
        toolsUsed?: string[]
        slug: string
        notes?: string
    }
}

const Customer = ({ number, customer }: CustomerProps) => {
    const { hasCaseStudy } = useCustomers()
    return {
        cells: [
            { content: number },
            {
                content: customer.logo ? (
                    <>
                        <img
                            src={customer.logo.light}
                            alt={customer.name}
                            className="w-auto object-contain dark:hidden"
                        />
                        <img
                            src={customer.logo.dark}
                            alt={customer.name}
                            className="w-auto object-contain hidden dark:block"
                        />
                    </>
                ) : (
                    <span>{customer.name}</span>
                ),
                className: '!p-4',
            },
            { content: customer.toolsUsed?.join(', '), className: 'text-sm' },
            { content: hasCaseStudy(customer.slug) ? <Link to={`/customers/${customer.slug}`}>Link</Link> : null },
            { content: customer.notes || '', className: 'text-sm' },
        ],
    }
}

export default function Customers(): JSX.Element {
    const { getCustomers, hasCaseStudy } = useCustomers()
    const customers = getCustomers(CUSTOMER_ORDER)
    const [filteredCustomers, setFilteredCustomers] = useState<any>(null)

    const columns = [
        { name: '', width: 'auto', align: 'center' as const },
        { name: 'Company name', width: 'minmax(150px,1fr)', align: 'center' as const },
        { name: 'Product(s) used', width: 'minmax(auto,250px)' },
        { name: 'Case study?', width: 'minmax(auto,100px)', align: 'center' as const },
        { name: 'Notes', width: 'minmax(auto,180px)', align: 'center' as const },
    ]

    const rows = (filteredCustomers || customers).map((customer: any, index: number) => {
        return Customer({
            number: index + 1,
            customer,
        })
    })

    return (
        <>
            <SEO title="notable customers.mdx – PostHog" description="" image={`/images/og/customers.jpg`} />
            <Editor
                title="notable customers"
                type="mdx"
                slug="/customers"
                availableFilters={[
                    {
                        label: 'company name',
                        options: [
                            { label: 'Any', value: null },
                            ...customers.map((customer) => ({
                                label: customer.name,
                                value: customer.name,
                            })),
                        ],
                        filter: (obj, value) => obj['name'] === value,
                        operator: 'equals',
                    },
                    {
                        label: 'product(s) used',
                        options: [
                            { label: 'Any', value: null },
                            ...Array.from(
                                new Set(
                                    customers
                                        .filter((customer) => customer.toolsUsed?.length)
                                        .flatMap((customer) => customer.toolsUsed || [])
                                )
                            ).map((tool) => ({
                                label: tool,
                                value: tool,
                            })),
                        ],
                        filter: (obj, value) => obj['toolsUsed'].includes(value),
                        operator: 'includes',
                    },
                    {
                        label: 'case study',
                        options: [
                            { label: 'Any', value: null },
                            { label: 'TRUE', value: true },
                            { label: 'FALSE', value: false },
                        ],
                        filter: (obj, value) => (value ? hasCaseStudy(obj.slug) : !hasCaseStudy(obj.slug)),
                        operator: 'equals',
                    },
                ]}
                dataToFilter={customers}
                onFilterChange={(data) => setFilteredCustomers(data)}
            >
                <ScrollArea>
                    <OSTable columns={columns} rows={rows} />
                </ScrollArea>
            </Editor>
        </>
    )
}
