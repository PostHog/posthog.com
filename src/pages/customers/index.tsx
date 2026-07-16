import React, { useMemo, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import ReaderView from 'components/ReaderView'
import ViewerFilters from 'components/Viewer/ViewerFilters'
import OSTable from 'components/OSTable'
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
    'arena',
    'researchgate',
    'startengine',
    'exa',
    'convex',
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
            className="group inline-flex h-full items-center"
        >
            {children}
        </Link>
    ) : (
        <>{children}</>
    )
}

const LOGO_CLASS = 'h-8 w-auto max-w-[180px] object-contain fill-current'

const Customer = ({ number, customer, hasCaseStudy }: CustomerProps) => {
    const renderLogo = () => {
        if (!customer.logo) {
            return <span>{customer.name}</span>
        }

        // Check if logo is a React component (single SVG format)
        if (typeof customer.logo === 'function') {
            const LogoComponent = customer.logo

            return (
                <CustomerLink customer={customer} hasCaseStudy={hasCaseStudy}>
                    <LogoComponent className={LOGO_CLASS} />
                </CustomerLink>
            )
        }

        // Otherwise, it's the existing light/dark object format
        return (
            <CustomerLink customer={customer} hasCaseStudy={hasCaseStudy}>
                <img src={customer.logo.light} alt={customer.name} className={`${LOGO_CLASS} dark:hidden`} />
                <img src={customer.logo.dark} alt={customer.name} className={`${LOGO_CLASS} hidden dark:block`} />
            </CustomerLink>
        )
    }

    return {
        key: customer.name,
        cells: [
            { content: number },
            {
                content: <div className="flex h-8 items-center">{renderLogo()}</div>,
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
    { name: 'Company name', width: 'minmax(150px,1fr)', align: 'left' as const },
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
            <SEO title="Customers – PostHog" description="" image={`/images/og/customers.jpg`} />
            <ReaderView
                hideTitle
                proseSize="lg"
                showQuestions={false}
                hideRightSidebar
                hideLeftSidebar
                hideMenu
                defaultNavVisible={false}
            >
                <div className="w-full max-w-5xl mx-auto">
                    <h1 className="text-2xl font-bold">Customers</h1>
                    <p className="!mt-0 mb-2">Here are some customers who use PostHog.</p>
                    <p className="!mt-0">You can use the filters below to read how they use different products.</p>
                    <ViewerFilters
                        availableFilters={[
                            {
                                label: 'Product',
                                options: [
                                    { label: 'Any', value: undefined },
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
                                label: 'Case study',
                                options: [
                                    { label: 'Any', value: undefined },
                                    { label: 'Yes', value: true },
                                    { label: 'No', value: false },
                                ],
                                filter: (obj, value) => (value ? hasCaseStudy(obj.slug) : !hasCaseStudy(obj.slug)),
                                operator: 'equals',
                            },
                            {
                                label: 'Featured',
                                options: [
                                    { label: 'Any', value: undefined },
                                    { label: 'Yes', value: true },
                                    { label: 'No', value: false },
                                ],
                                filter: (obj, value) => (value ? isFeatured(obj.slug) : !isFeatured(obj.slug)),
                                operator: 'equals',
                                initialValue: true,
                            },
                        ]}
                        dataToFilter={customers}
                        onFilterChange={handleFilterChange}
                    />
                    <OSTable
                        className="mt-2"
                        columns={columns}
                        width="full"
                        rows={(filteredCustomers || customers).map((customer: any, index: number) => {
                            return Customer({
                                number: index + 1,
                                customer,
                                hasCaseStudy,
                            })
                        })}
                    />
                </div>
            </ReaderView>
        </>
    )
}
