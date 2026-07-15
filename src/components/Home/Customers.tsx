import React, { useState } from 'react'
import OSTable from 'components/OSTable'
import OSButton from 'components/OSButton'
import Tooltip from 'components/RadixUI/Tooltip'
import { IconRefresh } from '@posthog/icons'
import { useCustomers } from 'hooks/useCustomers'

export const COL1 = [
    'ycombinator',
    'airbus',
    'ukgovt',
    'nationaldesignstudio',
    'trust',
    'lovable',
    'startengine',
    'researchgate',
    'heygen',
]

export const COL2 = [
    'supabase',
    'mistralai',
    'elevenlabs',
    'exa',
    'convex',
    'hasura',
    'raycast',
    'clerk',
    'resend',
    'greptile',
    'wisprflow',
    'paper',
    'posthog',
]

export const companyBreakdowns = {
    VCsLoveThem: { col1: 'VCs love them', col2: 'Product engineers love them' },
    colorful: { col1: 'Colorful logos', col2: '"Sleek" logos' },
    hardware: { col1: 'Hardware companies', col2: 'Not hardware companies' },
    planes: { col1: 'Builds planes', col2: "Doesn't build planes (yet)" },
    highValue: { col1: "Companies with >1 $B's in their valuations", col2: 'Everyone else (for now)' },
    caseStudy: { col1: 'Companies with PostHog case studies', col2: 'Companies who should do case studies' },
    easyToYell: { col1: 'Names you can yell easily', col2: 'Names that require breath control' },
    goodBandName: { col1: 'Good band names', col2: 'Could be mistaken for pharmaceuticals' },
    explainable: {
        col1: 'Companies you can explain to your parents',
        col2: 'Companies your parents will never understand',
    },
    shortNames: { col1: 'Names with 7 letters or less', col2: 'Names you can easily mistype' },
    realWords: { col1: 'Real words', col2: 'Not real words' },
    american: { col1: 'Founded in America', col2: 'Not founded in America' },
    pokemon: { col1: 'Could be a Pokémon', col2: 'Could be a Bond Villain' },
    arr: { col1: 'Measured in ARR', col2: 'Measured in GDP' },
    devTool: { col1: 'Trendy devtool', col2: 'Trendy, but not a devtool' },
    usesPostHog: { col1: 'Uses PostHog', col2: 'Also uses PostHog' },
}

export const companyAttributes: Record<string, string[]> = {
    VCsLoveThem: [
        'ycombinator',
        'airbus',
        'nationaldesignstudio',
        'ukgovt',
        'trust',
        'lovable',
        'startengine',
        'researchgate',
        'heygen',
    ],
    colorful: [
        'ycombinator',
        'convex',
        'trust',
        'lovable',
        'supabase',
        'startengine',
        'mistralai',
        'raycast',
        'heygen',
        'posthog',
    ],
    hardware: ['airbus', 'ukgovt', 'posthog'],
    planes: ['airbus', 'ukgovt'],
    highValue: ['ukgovt', 'airbus', 'elevenlabs', 'lovable', 'supabase', 'hasura', 'mistralai'],
    caseStudy: ['ycombinator', 'elevenlabs', 'lovable', 'supabase', 'hasura', 'researchgate', 'exa', 'posthog'],
    easyToYell: [
        'airbus',
        'trust',
        'convex',
        'clerk',
        'raycast',
        'resend',
        'exa',
        'heygen',
        'posthog',
        'wisprflow',
        'paper',
        'ukgovt',
    ],
    goodBandName: [
        'elevenlabs',
        'lovable',
        'convex',
        'trust',
        'startengine',
        'raycast',
        'resend',
        'clerk',
        'researchgate',
        'nationaldesignstudio',
        'wisprflow',
        'paper',
        'posthog',
    ],
    explainable: [
        'ycombinator',
        'airbus',
        'lovable',
        'startengine',
        'researchgate',
        'exa',
        'nationaldesignstudio',
        'ukgovt',
        'wisprflow',
    ],
    shortNames: [
        'airbus',
        'trust',
        'lovable',
        'convex',
        'clerk',
        'hasura',
        'raycast',
        'resend',
        'exa',
        'heygen',
        'wisprflow',
        'ukgovt',
        'paper',
        'posthog',
    ],
    realWords: [
        'airbus',
        'convex',
        'trust',
        'lovable',
        'clerk',
        'elevenlabs',
        'startengine',
        'resend',
        'researchgate',
        'nationaldesignstudio',
        'wisprflow',
        'paper',
    ],
    american: [
        'ycombinator',
        'convex',
        'trust',
        'supabase',
        'hasura',
        'clerk',
        'startengine',
        'resend',
        'researchgate',
        'exa',
        'heygen',
        'nationaldesignstudio',
        'wisprflow',
        'greptile',
        'paper',
        'posthog',
    ],
    pokemon: [
        'lovable',
        'convex',
        'supabase',
        'hasura',
        'mistralai',
        'raycast',
        'resend',
        'exa',
        'heygen',
        'paper',
        'greptile',
    ],
    arr: [
        'ycombinator',
        'airbus',
        'elevenlabs',
        'trust',
        'lovable',
        'clerk',
        'convex',
        'supabase',
        'hasura',
        'startengine',
        'mistralai',
        'raycast',
        'resend',
        'researchgate',
        'exa',
        'heygen',
        'wisprflow',
        'greptile',
        'paper',
        'posthog',
    ],
    devTool: [
        'ycombinator',
        'elevenlabs',
        'convex',
        'supabase',
        'hasura',
        'mistralai',
        'raycast',
        'clerk',
        'resend',
        'exa',
        'greptile',
        'paper',
        'posthog',
    ],
    usesPostHog: ['ycombinator', 'airbus', 'trust', 'supabase', 'hasura', 'researchgate', 'heygen', 'posthog'],
}

export const Customers = ({ tableClassName = '' }: { tableClassName?: string }) => {
    const { getCustomers, hasCaseStudy } = useCustomers()
    const [currentBreakdown, setCurrentBreakdown] = useState('VCsLoveThem')
    const [isAnimating, setIsAnimating] = useState(false)
    const logoRefs = React.useRef<Record<string, HTMLElement>>({})

    const allCompanies = [...COL1, ...COL2]
    const companiesInCol1 = companyAttributes[currentBreakdown] || []
    const companiesInCol2 = allCompanies.filter((company) => !companiesInCol1.includes(company))

    const column1 = getCustomers(companiesInCol1)
    const column2 = getCustomers(companiesInCol2)

    const renderLogo = (customer: any) => {
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

    const toggleBreakdown = () => {
        if (isAnimating) return
        const beforePositions: Record<string, DOMRect> = {}
        Object.keys(logoRefs.current).forEach((slug) => {
            const element = logoRefs.current[slug]
            if (element) beforePositions[slug] = element.getBoundingClientRect()
        })
        setIsAnimating(true)
        const breakdownKeys = Object.keys(companyBreakdowns)
        const currentIndex = breakdownKeys.indexOf(currentBreakdown)
        const availableBreakdowns = breakdownKeys.filter((_, index) => index !== currentIndex)
        const randomIndex = Math.floor(Math.random() * availableBreakdowns.length)
        setCurrentBreakdown(availableBreakdowns[randomIndex])
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

    const currentLabels = companyBreakdowns[currentBreakdown as keyof typeof companyBreakdowns]
    const columns = [
        { name: currentLabels.col1, width: 'minmax(auto,1fr)', align: 'center' as const },
        { name: currentLabels.col2, width: 'minmax(auto,1fr)', align: 'center' as const },
    ]

    const renderCustomerWithLink = (customer: any) => (
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
            cells: [
                {
                    content: (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center items-center">
                            {column1.map(renderCustomerWithLink)}
                        </div>
                    ),
                    className: '!p-4',
                },
                {
                    content: (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center items-center">
                            {column2.map(renderCustomerWithLink)}
                        </div>
                    ),
                    className: '!p-4',
                },
            ],
        },
    ]

    return (
        <div id="customers">
            <h2>Social proof</h2>
            <p>Yes they actually use us, no it's not just some random engineer who tried us out 2+ years ago.</p>
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
                        onClick={toggleBreakdown}
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
            <OSButton asLink to="/customers" variant="secondary" size="md" className="mt-4" state={{ newWindow: true }}>
                Open Customers
            </OSButton>
        </div>
    )
}

export default Customers
