import React, { useState } from 'react'
import OSButton from 'components/OSButton'
import Tooltip from 'components/RadixUI/Tooltip'
import { IconRefresh } from '@posthog/icons'
import { useCustomers } from 'hooks/useCustomers'
import { WINDOW_BG } from 'constants/frostedSurfaces'

export const COL1 = [
    'ycombinator',
    'airbus',
    'ukgovt',
    'nationaldesignstudio',
    'trust',
    'railway',
    'startengine',
    'researchgate',
    'heygen',
    'legora',
]

export const COL2 = [
    'supabase',
    'mistralai',
    'fireworksai',
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
    colorful: { col1: 'Colorful logos', col2: '"Sleek" logos' },
    hardware: { col1: 'Hardware companies', col2: 'Not hardware companies' },
    planes: { col1: 'Builds planes', col2: "Doesn't build planes (yet)" },
    caseStudy: { col1: 'Companies with PostHog case studies', col2: 'Companies who should do case studies' },
    easyToYell: { col1: 'Names you can yell easily', col2: 'Names that require breath control' },
    goodBandName: { col1: 'Good band names', col2: 'Could be mistaken for pharmaceuticals' },
    explainable: {
        col1: 'Companies you can explain to your parents',
        col2: 'Companies your parents will never understand',
    },
    shortNames: { col1: 'Names with 7 letters or fewer', col2: 'Names you can easily mistype' },
    realWords: { col1: 'Real words', col2: 'Not real words' },
    american: { col1: 'Founded in America', col2: 'Not founded in America' },
    pokemon: { col1: 'Could be a Pokémon', col2: 'Could be a Bond Villain' },
    arr: { col1: 'Measured in ARR', col2: 'Measured in GDP' },
    devTool: { col1: 'Trendy devtool', col2: 'Trendy, but not a devtool' },
    usesPostHog: { col1: 'Uses PostHog', col2: 'Also uses PostHog' },
}

export const companyAttributes: Record<string, string[]> = {
    colorful: [
        'ycombinator',
        'convex',
        'trust',
        'supabase',
        'startengine',
        'mistralai',
        'fireworksai',
        'raycast',
        'heygen',
        'posthog',
    ],
    hardware: ['airbus', 'ukgovt', 'posthog'],
    planes: ['airbus', 'ukgovt'],
    caseStudy: ['ycombinator', 'elevenlabs', 'supabase', 'hasura', 'researchgate', 'exa', 'posthog'],
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
        'railway',
        'fireworksai',
        'legora',
    ],
    goodBandName: [
        'elevenlabs',
        'railway',
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
        'fireworksai',
    ],
    explainable: [
        'ycombinator',
        'airbus',
        'railway',
        'startengine',
        'researchgate',
        'exa',
        'nationaldesignstudio',
        'ukgovt',
        'wisprflow',
        'legora',
    ],
    shortNames: [
        'airbus',
        'trust',
        'railway',
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
        'legora',
    ],
    realWords: [
        'airbus',
        'convex',
        'trust',
        'railway',
        'clerk',
        'elevenlabs',
        'startengine',
        'resend',
        'researchgate',
        'nationaldesignstudio',
        'wisprflow',
        'paper',
        'fireworksai',
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
        'railway',
        'fireworksai',
    ],
    pokemon: [
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
        'legora',
    ],
    arr: [
        'ycombinator',
        'airbus',
        'elevenlabs',
        'trust',
        'railway',
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
        'fireworksai',
        'legora',
    ],
    devTool: [
        'ycombinator',
        'elevenlabs',
        'convex',
        'supabase',
        'hasura',
        'mistralai',
        'fireworksai',
        'raycast',
        'clerk',
        'resend',
        'exa',
        'greptile',
        'paper',
        'posthog',
        'railway',
    ],
    usesPostHog: ['ycombinator', 'airbus', 'trust', 'supabase', 'hasura', 'researchgate', 'heygen', 'posthog'],
}

export const Customers = ({ tableClassName = '' }: { tableClassName?: string }) => {
    const { getCustomers, hasCaseStudy } = useCustomers()
    const [currentBreakdown, setCurrentBreakdown] = useState('colorful')
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
    const groups = [
        { label: currentLabels.col1, customers: column1 },
        { label: currentLabels.col2, customers: column2 },
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
                <span className="inline-flex py-1.5 px-2 text-primary">{renderLogo(customer)}</span>
            )}
        </div>
    )

    return (
        <div id="customers">
            <h2 className="mb-2">Social proof</h2>
            <p className="mt-0">
                Yes they actually use us, no it's not just some random engineer who tried us out 2+ years ago.
            </p>
            <div className="@container">
                <div className="relative grid grid-cols-2 gap-x-2 @lg:gap-x-4">
                    {groups.map((group, index) => (
                        <div
                            key={`card-${index}`}
                            className={`pointer-events-none row-start-1 rounded-lg border border-primary ${
                                index === 0 ? 'col-start-1' : 'col-start-2'
                            } ${WINDOW_BG}`}
                        />
                    ))}
                    <div className="relative z-10 col-span-2 col-start-1 row-start-1 grid grid-cols-2 gap-x-2 @lg:gap-x-4">
                        {groups.map((group, index) => (
                            <div key={`logos-${index}`} className="p-4">
                                <div className="mb-5 text-center text-sm font-bold text-primary">{group.label}</div>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center items-center">
                                    {group.customers.map(renderCustomerWithLink)}
                                </div>
                            </div>
                        ))}
                        <div className="pointer-events-auto absolute left-1/2 top-2 -translate-x-1/2">
                            <Tooltip
                                trigger={
                                    <button
                                        type="button"
                                        onClick={toggleBreakdown}
                                        disabled={isAnimating}
                                        aria-label="Shuffle companies"
                                        className={`flex size-9 items-center justify-center rounded-full border border-primary bg-primary text-primary disabled:cursor-default shadow-md scale-100 hover:top-[-0.5px] hover:scale-[1] active:top-[0.5px] active:scale-[.99] active:shadow-none relative`}
                                    >
                                        <IconRefresh
                                            className={`size-4.5 ${
                                                isAnimating ? 'animate-spin [animation-direction:reverse]' : ''
                                            }`}
                                        />
                                    </button>
                                }
                                delay={0}
                            >
                                <p className="text-sm mb-0">Shuffle companies</p>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers
