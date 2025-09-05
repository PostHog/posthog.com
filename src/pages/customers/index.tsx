import React, { useEffect, useMemo, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import Editor from 'components/Editor'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import OSTable from 'components/OSTable'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { useCustomers, Customer as CustomerType } from 'hooks/useCustomers'
import { IconArrowUpRight } from '@posthog/icons'

// add `featured: true` to useCustomers.ts (for filtering), then set the order below:
const CUSTOMER_ORDER = [
    'ycombinator',
    'mistralai',
    'supabase',
    'elevenlabs',
    'lovable',
    'raycast',
    'airbus',
    'researchgate',
    'startengine',
    'hasura',
    'trust',
    'heygen',
    'posthog',
]

interface CustomerProps {
    number: number
    customer: CustomerType
    hasCaseStudy: (slug: string) => boolean
}

const CustomerLink = ({
    customer,
    hasCaseStudy,
    children,
}: {
    customer: CustomerType
    hasCaseStudy: (slug: string) => boolean
    children: React.ReactNode
}) => {
    return hasCaseStudy(customer.slug) || customer.slug === 'posthog' ? (
        <Link
            to={customer.slug === 'posthog' ? '/blog/posthog-marketing' : `/customers/${customer.slug}`}
            state={{ newWindow: true }}
            className="group"
        >
            {children}
        </Link>
    ) : (
        <>{children}</>
    )
}

const Customer = ({ number, customer, hasCaseStudy }: CustomerProps) => {
    // Determine logo rendering logic - same as CustomersSlide.tsx
    const renderLogo = () => {
        if (!customer.logo) {
            return <span>{customer.name}</span>
        }

        // Check if logo is a React component (single SVG format)
        if (typeof customer.logo === 'function') {
            const LogoComponent = customer.logo
            const heightClass = customer.height ? `h-${customer.height}` : ''
            const className = `w-full fill-current object-contain ${heightClass}`.trim()

            return (
                <CustomerLink customer={customer} hasCaseStudy={hasCaseStudy}>
                    <LogoComponent className={className} />
                </CustomerLink>
            )
        }

        // Otherwise, it's the existing light/dark object format
        const heightClass = customer.height ? `max-h-${customer.height}` : 'max-h-10'

        return (
            <CustomerLink customer={customer} hasCaseStudy={hasCaseStudy}>
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
            </CustomerLink>
        )
    }

    return {
        key: customer.name,
        cells: [
            { content: number },
            {
                content: renderLogo(),
                className: '!p-4',
            },
            { content: customer.toolsUsed?.join(', '), className: 'text-sm' },
            {
                content:
                    hasCaseStudy(customer.slug) || customer.slug === 'posthog' ? (
                        <CustomerLink customer={customer} hasCaseStudy={hasCaseStudy}>
                            Link{' '}
                            <IconArrowUpRight className="size-4 inline-block text-muted group-hover:text-primary" />
                        </CustomerLink>
                    ) : null,
            },
            { content: customer.notes || '', className: 'text-sm' },
        ],
    }
}

const sortCustomers = (customers: CustomerType[]) => {
    return [...customers].sort((a, b) => {
        const aIndex = CUSTOMER_ORDER.indexOf(a.slug)
        const bIndex = CUSTOMER_ORDER.indexOf(b.slug)
        const aOrder = aIndex === -1 ? Infinity : aIndex
        const bOrder = bIndex === -1 ? Infinity : bIndex
        return aOrder - bOrder
    })
}

const columns = [
    { name: '', width: 'auto', align: 'center' as const },
    { name: 'Company name', width: 'minmax(150px,1fr)', align: 'center' as const },
    { name: 'Product(s) used', width: 'minmax(auto,250px)', align: 'left' },
    { name: 'Case study', width: 'minmax(auto,100px)', align: 'center' as const },
    { name: 'Notes', width: 'minmax(auto,180px)', align: 'left' as const },
]

export default function Customers(): JSX.Element {
    const { hasCaseStudy, isFeatured, customers: allCustomers } = useCustomers()
    const customers = useMemo(() => sortCustomers(Object.values(allCustomers)), [allCustomers])
    const [filteredCustomers, setFilteredCustomers] = useState<any>(customers.filter((customer) => customer.featured))

    const handleFilterChange = (filters: any) => {
        setFilteredCustomers(sortCustomers(filters))
    }

    return (
        <>
            <SEO title="customers.mdx – PostHog" description="" image={`/images/og/customers.jpg`} />
            <Editor
                showFilters
                title="customers"
                type="mdx"
                slug="/customers"
                bookmark={{
                    title: 'Customers',
                    description: 'Customers who use PostHog',
                }}
                availableFilters={[
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
                        filter: (obj, value) => obj['toolsUsed']?.includes(value),
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
                    {
                        label: 'featured',
                        options: [
                            { label: 'Any', value: null },
                            { label: 'TRUE', value: true },
                            { label: 'FALSE', value: false },
                        ],
                        filter: (obj, value) => (value ? isFeatured(obj.slug) : !isFeatured(obj.slug)),
                        operator: 'equals',
                        initialValue: true,
                    },
                ]}
                dataToFilter={customers}
                onFilterChange={handleFilterChange}
            >
                <ScrollArea>
                    <p className="!mt-0 mb-2">Here are some customers who use PostHog.</p>
                    <p className="!mt-0">You can use the filters (above) to read how they use different products.</p>
                    <OSTable
                        columns={columns}
                        rows={(filteredCustomers || customers).map((customer: any, index: number) => {
                            return Customer({
                                number: index + 1,
                                customer,
                                hasCaseStudy,
                            })
                        })}
                    />
                </ScrollArea>
            </Editor>
        </>
    )
}
