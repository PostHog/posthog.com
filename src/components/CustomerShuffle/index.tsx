import React, { useState } from 'react'
import OSTable from 'components/OSTable'
import OSButton from 'components/OSButton'
import Tooltip from 'components/RadixUI/Tooltip'
import { IconRefresh } from '@posthog/icons'
import { useCustomers, Customer } from 'hooks/useCustomers'

export interface Breakdown {
    col1: string
    col2: string
}

export interface CustomerShuffleProps {
    /** Slugs of every company on the board. */
    companies: string[]
    /** Column headings, keyed by breakdown. */
    breakdowns: Record<string, Breakdown>
    /** Slugs that belong in column 1, keyed by breakdown. Everything else falls into column 2. */
    attributes: Record<string, string[]>
    defaultBreakdown?: string
    /** Show a chip per breakdown, so a reader can pick one instead of only shuffling. */
    showPicker?: boolean
    className?: string
}

// A breakdown with almost nothing in column 1 reads as broken rather than funny, so it is hidden
// until someone fills the data in. This is what keeps an unpopulated category off the page.
const MIN_COL1 = 3

export const CustomerShuffle = ({
    companies,
    breakdowns,
    attributes,
    defaultBreakdown,
    showPicker = false,
    className = '',
}: CustomerShuffleProps): JSX.Element | null => {
    const { getCustomers, hasCaseStudy } = useCustomers()
    const usableBreakdowns = Object.keys(breakdowns).filter((key) => (attributes[key] || []).length >= MIN_COL1)
    const [currentBreakdown, setCurrentBreakdown] = useState(
        defaultBreakdown && usableBreakdowns.includes(defaultBreakdown) ? defaultBreakdown : usableBreakdowns[0]
    )
    const [isAnimating, setIsAnimating] = useState(false)
    const logoRefs = React.useRef<Record<string, HTMLElement>>({})

    if (!currentBreakdown) {
        return null
    }

    const companiesInCol1 = attributes[currentBreakdown] || []
    const column1 = getCustomers(companiesInCol1)
    const column2 = getCustomers(companies.filter((company) => !companiesInCol1.includes(company)))

    const renderLogo = (customer: Customer) => {
        if (!customer.logo) {
            return <span className="text-xs">{customer.name}</span>
        }
        if (typeof customer.logo === 'function') {
            const LogoComponent = customer.logo
            const heightClass = customer.height ? `h-${customer.height - 2}` : 'h-8'
            return <LogoComponent className={`w-full fill-current object-contain ${heightClass}`} />
        }
        const heightClass = customer.height ? `max-h-${customer.height}` : ''
        return (
            <>
                <img
                    src={customer.logo.light}
                    alt={customer.name}
                    className={`h-full w-auto object-contain dark:hidden ${heightClass}`}
                />
                <img
                    src={customer.logo.dark}
                    alt={customer.name}
                    className={`h-full w-auto object-contain hidden dark:block ${heightClass}`}
                />
            </>
        )
    }

    // FLIP: measure where every logo sits, swap the columns, then animate each logo back from its old spot.
    const changeBreakdown = (next: string) => {
        if (isAnimating || next === currentBreakdown) return
        const beforePositions: Record<string, DOMRect> = {}
        Object.keys(logoRefs.current).forEach((slug) => {
            const element = logoRefs.current[slug]
            if (element) beforePositions[slug] = element.getBoundingClientRect()
        })
        setIsAnimating(true)
        setCurrentBreakdown(next)
        requestAnimationFrame(() => {
            Object.keys(logoRefs.current).forEach((slug) => {
                const element = logoRefs.current[slug]
                if (element && beforePositions[slug]) {
                    const afterPosition = element.getBoundingClientRect()
                    const deltaX = beforePositions[slug].left - afterPosition.left
                    const deltaY = beforePositions[slug].top - afterPosition.top
                    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
                    element.style.transition = 'none'
                    requestAnimationFrame(() => {
                        element.style.transition = 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)'
                        element.style.transform = 'translate(0, 0)'
                    })
                }
            })
            setTimeout(() => {
                setIsAnimating(false)
                Object.keys(logoRefs.current).forEach((slug) => {
                    const element = logoRefs.current[slug]
                    if (element) {
                        element.style.transform = ''
                        element.style.transition = ''
                    }
                })
            }, 600)
        })
    }

    const shuffle = () => {
        const options = usableBreakdowns.filter((key) => key !== currentBreakdown)
        changeBreakdown(options[Math.floor(Math.random() * options.length)])
    }

    const currentLabels = breakdowns[currentBreakdown]
    const columns = [
        { name: currentLabels.col1, width: 'minmax(auto,1fr)', align: 'center' as const },
        { name: currentLabels.col2, width: 'minmax(auto,1fr)', align: 'center' as const },
    ]

    const renderCustomerWithLink = (customer: Customer) => (
        <div
            key={customer.slug}
            className="inline-block"
            ref={(el: HTMLElement | null) => {
                if (el) logoRefs.current[customer.slug] = el
            }}
        >
            {hasCaseStudy(customer.slug) || customer.slug === 'posthog' ? (
                <OSButton
                    asLink
                    to={customer.slug === 'posthog' ? '/blog/posthog-marketing' : `/customers/${customer.slug}`}
                    state={{ newWindow: true }}
                    className="relative border border-transparent hover:border-primary rounded-sm"
                >
                    {renderLogo(customer)}
                    <Tooltip
                        trigger={
                            <span className="absolute top-1 right-0 inline-flex w-4 h-4 rounded-full bg-red border-2 border-white dark:border-dark"></span>
                        }
                        delay={0}
                        sideOffset={14}
                    >
                        <p className="text-sm mb-0">
                            {customer.slug === 'posthog' ? 'First PostHog customer!' : 'Read customer story'}
                        </p>
                    </Tooltip>
                </OSButton>
            ) : (
                <span className="inline-flex py-1.5 px-2">{renderLogo(customer)}</span>
            )}
        </div>
    )

    const rows = [
        {
            cells: [column1, column2].map((column) => ({
                content: (
                    <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center items-center">
                        {column.map(renderCustomerWithLink)}
                    </div>
                ),
                className: '!p-4',
            })),
        },
    ]

    return (
        <div className={className}>
            <OSTable
                columns={columns}
                rows={rows}
                size="sm"
                rowAlignment="top"
                width="full"
                className="bg-white dark:bg-dark"
                shadow
            >
                <div className="absolute top-2 left-[calc(50%-17px)]">
                    <OSButton
                        onClick={shuffle}
                        variant="secondary"
                        size="sm"
                        className="font-semibold rounded-full [&_span]:rounded-full aspect-square [&_span]:aspect-square disabled:opacity-100"
                        disabled={isAnimating}
                        tooltip="Shuffle companies"
                        icon={
                            <IconRefresh
                                className={`size-4 inline-block relative -top-px ${
                                    isAnimating ? 'animate-spin [animation-direction:reverse]' : ''
                                }`}
                            />
                        }
                    />
                </div>
            </OSTable>
            {showPicker && (
                <div className="flex flex-wrap gap-1 mt-2">
                    {usableBreakdowns.map((key) => (
                        <button
                            key={key}
                            onClick={() => changeBreakdown(key)}
                            className={`text-xs px-2 py-1 rounded border transition-colors ${
                                key === currentBreakdown
                                    ? 'border-primary bg-accent font-semibold'
                                    : 'border-transparent text-secondary hover:border-primary'
                            }`}
                        >
                            {breakdowns[key].col1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CustomerShuffle
