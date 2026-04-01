import React, { useState } from 'react'
import Link from 'components/Link'
import OSTable from 'components/OSTable'
import { useCustomers } from 'hooks/useCustomers'
import CTA from 'components/Home/CTA'
import { IconInfo, IconRefresh } from '@posthog/icons'
import OSButton from 'components/OSButton'
import useProduct from 'hooks/useProduct'
import { AccordionItem, AccordionTrigger, AccordionContent } from 'components/RadixUI/Accordion'
import { Accordion as RadixAccordionPrimitives } from 'radix-ui'
import Tooltip from 'components/RadixUI/Tooltip'
import CloudinaryImage from 'components/CloudinaryImage'
import SmallTeam from 'components/SmallTeam'
import Pricing from 'components/Home/New/Pricing'
import { JsxComponentDescriptor } from '@mdxeditor/editor'

interface ProductButtonsProps {
    productTypes: string[]
    className?: string
    beta?: boolean
}

export const ProductButtons: React.FC<ProductButtonsProps> = ({ productTypes, className = '', beta = false }) => {
    const allProducts = useProduct()

    const getProduct = (handle: string) =>
        Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === handle) : undefined

    return (
        <span className={`flex flex-wrap gap-1 pt-1 ${className}`}>
            {productTypes.map((type, index) => {
                const product = getProduct(type)
                return product ? (
                    <OSButton
                        key={type}
                        icon={product.Icon ? <product.Icon /> : undefined}
                        iconClassName={`text-${product.color}`}
                        color={product.color}
                        className="font-medium text-primary hover:text-primary"
                        to={`/${product.slug}`}
                        state={{ newWindow: true }}
                        asLink
                    >
                        {product.name}
                        {beta && <span className="text-xs opacity-50">beta</span>}
                    </OSButton>
                ) : null
            })}
        </span>
    )
}

export const HomeHappyHog = () => {
    return (
        <img
            src="https://res.cloudinary.com/dmukukwp6/image/upload/happy_hog_ebc59e4658.png"
            alt="happy hog"
            className="@xl:float-right @xl:ml-2 max-w-[400px] max-h-48 -mt-2 -mr-2"
        />
    )
}

export const Image = ({ src, className = '', alt = '' }: { src: string; className?: string; alt?: string }) => (
    <CloudinaryImage src={src} alt={alt} className={className} />
)

// --- Company data ---

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
    'convex',
    'hasura',
    'exa',
    'raycast',
    'resend',
    'greptile',
    'wisprflow',
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
    easyToYell: ['airbus', 'trust', 'convex', 'raycast', 'resend', 'exa', 'heygen', 'posthog', 'wisprflow', 'ukgovt'],
    goodBandName: [
        'elevenlabs',
        'lovable',
        'convex',
        'trust',
        'startengine',
        'raycast',
        'resend',
        'researchgate',
        'nationaldesignstudio',
        'wisprflow',
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
        'hasura',
        'raycast',
        'resend',
        'exa',
        'heygen',
        'wisprflow',
        'ukgovt',
        'posthog',
    ],
    realWords: [
        'airbus',
        'convex',
        'trust',
        'lovable',
        'elevenlabs',
        'startengine',
        'resend',
        'researchgate',
        'nationaldesignstudio',
        'wisprflow',
        'posthog',
    ],
    american: [
        'ycombinator',
        'convex',
        'trust',
        'supabase',
        'hasura',
        'startengine',
        'resend',
        'researchgate',
        'exa',
        'heygen',
        'nationaldesignstudio',
        'wisprflow',
        'greptile',
        'posthog',
    ],
    pokemon: ['lovable', 'convex', 'supabase', 'hasura', 'mistralai', 'raycast', 'resend', 'exa', 'heygen', 'greptile'],
    arr: [
        'ycombinator',
        'airbus',
        'elevenlabs',
        'trust',
        'lovable',
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
        'resend',
        'exa',
        'greptile',
        'posthog',
    ],
}

// --- Customers component ---

export const Customers = ({ tableClassName = '' }: { tableClassName?: string }) => {
    const { getCustomers, hasCaseStudy } = useCustomers()
    const [currentBreakdown, setCurrentBreakdown] = React.useState('VCsLoveThem')
    const [isAnimating, setIsAnimating] = React.useState(false)
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
        <>
            <div className="inline-block">
                <div className="relative @xl:pt-1 pb-2 @xl:pb-0 @4xl:mt-8">
                    <div className="@xl:absolute right-0 -top-8">
                        <OSButton
                            onClick={toggleBreakdown}
                            variant="secondary"
                            size="sm"
                            className="font-semibold [&_span]:min-w-[146px]"
                            disabled={isAnimating}
                        >
                            {isAnimating ? (
                                '🔀 Shuffling...'
                            ) : (
                                <>
                                    <IconRefresh className="size-4 inline-block relative -top-px" /> Shuffle companies
                                </>
                            )}
                        </OSButton>
                    </div>
                </div>
                <OSTable
                    columns={columns}
                    rows={rows}
                    size="sm"
                    rowAlignment="top"
                    className={tableClassName || undefined}
                />
                <OSButton
                    asLink
                    to="/customers"
                    variant="secondary"
                    size="md"
                    className="mt-4"
                    state={{ newWindow: true }}
                >
                    Open customers.mdx
                </OSButton>
            </div>
        </>
    )
}

// --- FAQ components ---

export const FAQ = ({ children }: { children: React.ReactNode }) => {
    const [value, setValue] = useState<string[]>([])

    const allValues = React.useMemo(() => {
        const values: string[] = []
        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child) && child.props.trigger) {
                values.push(child.props.trigger)
            }
        })
        return values
    }, [children])

    return (
        <div>
            <div className="flex justify-end mb-2">
                <OSButton variant="secondary" size="sm" onClick={() => setValue(allValues)}>
                    Expand all
                </OSButton>
            </div>
            <RadixAccordionPrimitives.Root
                className="rounded border border-primary"
                type="multiple"
                value={value}
                onValueChange={setValue}
                data-scheme="primary"
            >
                {children}
            </RadixAccordionPrimitives.Root>
        </div>
    )
}

export const FAQItem = ({ trigger, children }: { trigger: string; children: React.ReactNode }) => (
    <AccordionItem value={trigger} skin>
        <AccordionTrigger skin className="!text-base font-bold">
            {trigger}
        </AccordionTrigger>
        <AccordionContent skin>{children}</AccordionContent>
    </AccordionItem>
)

// --- Shared jsxComponentDescriptors ---

export function getSharedDescriptors(): JsxComponentDescriptor[] {
    return [
        {
            name: 'CTA',
            kind: 'flow',
            props: [],
            Editor: () => (
                <>
                    <p className="-mt-2">
                        If nothing else has sold you on PostHog, hopefully these classic marketing tactics will.
                    </p>
                    <CTA headline={false} />
                </>
            ),
        },
        {
            name: 'Pricing',
            kind: 'flow',
            props: [],
            Editor: () => <Pricing />,
        },
        {
            name: 'ImageDW',
            kind: 'flow',
            props: [],
            Editor: () => (
                <Image
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/data_warehouse_2c3928e9ad.png"
                    className="max-w-[213px] absolute bottom-[-4px] right-0 rounded-br-sm"
                />
            ),
        },
        {
            name: 'ImageMoney',
            kind: 'flow',
            props: [],
            Editor: () => (
                <Image
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/dont_burn_money_28d5861fad.png"
                    className="float-right max-w-[120px] @sm:max-w-[200px] ml-2 @sm:ml-4 mb-2 @sm:-mt-4"
                />
            ),
        },
        {
            name: 'ImageReading1',
            kind: 'flow',
            props: [],
            Editor: () => (
                <Image
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/reading_at_night_8397c5198c.png"
                    className="@md:hidden @xl:block @lg:float-right max-w-full @xl:max-w-xs rotate-1 shadow-2xl rounded border-4 border-white dark:border-primary -mb-2 @lg:mb-2 @lg:ml-4 @lg:-mt-2"
                />
            ),
        },
        {
            name: 'ImageReading2',
            kind: 'flow',
            props: [],
            Editor: () => (
                <Image
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/reading_at_night_8397c5198c.png"
                    className="hidden @md:block @md:float-right @xl:hidden @md:max-w-60 @xl:max-w-xs @sm:ml-4 @sm:mb-2 rotate-1 shadow-2xl rounded border-4 border-white dark:border-primary"
                />
            ),
        },
        {
            name: 'TooltipDW',
            kind: 'flow',
            props: [],
            Editor: () => (
                <Tooltip
                    trigger={
                        <span>
                            <IconInfo className="size-4 inline-block relative -top-px" />
                        </span>
                    }
                    delay={0}
                >
                    <p className="text-sm mb-0">You can also connect your own!</p>
                </Tooltip>
            ),
        },
        {
            name: 'SupportSmallTeamLink',
            kind: 'flow',
            props: [],
            Editor: () => (
                <SmallTeam slug="support" noMiniCrest>
                    support folks
                </SmallTeam>
            ),
        },
        {
            name: 'FAQ',
            kind: 'flow',
            props: [{ name: 'children', type: 'expression' }],
            Editor: ({ children }) => <FAQ>{children}</FAQ>,
        },
        {
            name: 'FAQItem',
            kind: 'flow',
            props: [
                { name: 'trigger', type: 'string' },
                { name: 'children', type: 'expression' },
            ],
            Editor: ({ trigger, children }) => <FAQItem trigger={trigger}>{children}</FAQItem>,
        },
    ]
}
