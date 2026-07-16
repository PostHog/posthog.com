import React, { useEffect, useState } from 'react'
import { JsxComponentDescriptor } from '@mdxeditor/editor'
import { IconInfo, IconRefresh } from '@posthog/icons'
import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import { Accordion as RadixAccordionPrimitives } from 'radix-ui'
import { useInView } from 'react-intersection-observer'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import { Bang, Eco, TrendUp } from 'components/Icons'
import OSButton from 'components/OSButton'
import OSTable from 'components/OSTable'
import { AccordionContent, AccordionItem, AccordionTrigger } from 'components/RadixUI/Accordion'
import Tooltip from 'components/RadixUI/Tooltip'
import SmallTeam from 'components/SmallTeam'
import { heading } from 'components/Home/classes'
import { COL1, COL2, companyAttributes, companyBreakdowns } from 'components/Home/Customers'
import { Image } from 'components/Home/Decorations'
import usePostHog from 'hooks/usePostHog'
import useProducts from 'hooks/useProducts'
import { useCustomers } from 'hooks/useCustomers'
import { useApp } from '../../../context/App'
import { useWindow } from '../../../context/Window'

type TranslateFn = (value: string) => string
type CustomerLogo = { light: string; dark: string } | React.ComponentType<{ className?: string }>
type Customer = { slug: string; name: string; logo?: CustomerLogo; height?: number }

const identity = (value: string) => value
const productsToShow = ['product_analytics', 'feature_flags', 'session_replay', 'data_warehouse']

function numberToWords(num: number): string {
    if (num >= 1_000_000) {
        return `${num / 1_000_000} million`
    } else if (num >= 1_000) {
        return num.toLocaleString()
    }
    return num.toString()
}

export function KoreanPricing({ translate = identity }: { translate?: TranslateFn }): JSX.Element {
    const { products: initialProducts } = useProducts()
    const products = initialProducts.filter((product) => productsToShow.includes(product.handle))

    const columns = [
        { name: '', width: '50px', align: 'center' as const },
        { name: translate('Product'), width: 'minmax(200px,1fr)', align: 'left' as const },
        { name: translate('Free tier'), width: 'minmax(200px,1fr)', align: 'left' as const },
        { name: translate('Pricing (decreases with volume)'), width: 'minmax(200px,2fr)', align: 'left' as const },
    ]

    const rows = products.map((product, index) => ({
        cells: [
            { content: index + 1 },
            {
                content: (
                    <Link to={`/${product.slug}`} state={{ newWindow: true }} className="flex items-center space-x-1">
                        <product.Icon className={`inline-block size-4 text-${product.color}`} />
                        <span>{translate(product.name)}</span>
                    </Link>
                ),
            },
            { content: translate(`${numberToWords(product.freeLimit)} ${product.unit}s/mo`) },
            {
                content: (
                    <span>
                        {translate(
                            `$${
                                product.startsAt.length <= 3 ? Number(product.startsAt).toFixed(2) : product.startsAt
                            }/${product.unit}`
                        )}
                    </span>
                ),
            },
        ],
    }))

    return (
        <div>
            <div className="flex flex-col gap-4 @2xl:hidden mb-4">
                {products.map((product, index) => (
                    <div key={product.handle} className="border border-primary">
                        <div className="bg-input px-3 py-2 border-b border-primary">
                            <Link
                                to={`/${product.slug}`}
                                state={{ newWindow: true }}
                                className="flex items-center gap-1.5 font-bold text-sm"
                            >
                                <span>{index + 1}.</span>
                                <product.Icon className={`inline-block size-4 text-${product.color}`} />
                                <span>{translate(product.name)}</span>
                            </Link>
                        </div>
                        <div className="px-3 py-2 text-sm space-y-1">
                            <div>
                                <span className="text-muted">{translate('Free tier:')}</span>{' '}
                                {translate(`${numberToWords(product.freeLimit)} ${product.unit}s/mo`)}
                            </div>
                            <div>
                                <span className="text-muted">{translate('Pricing:')}</span>{' '}
                                {translate(
                                    `$${
                                        product.startsAt.length <= 3
                                            ? Number(product.startsAt).toFixed(2)
                                            : product.startsAt
                                    }/${product.unit}`
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden @2xl:block">
                <OSTable columns={columns} rows={rows} className="mb-4" />
            </div>
        </div>
    )
}

export function KoreanCustomers({
    tableClassName = '',
    translate = identity,
}: {
    tableClassName?: string
    translate?: TranslateFn
}): JSX.Element {
    const { getCustomers, hasCaseStudy } = useCustomers()
    const [currentBreakdown, setCurrentBreakdown] = React.useState('VCsLoveThem')
    const [isAnimating, setIsAnimating] = React.useState(false)
    const logoRefs = React.useRef<Record<string, HTMLElement>>({})

    const allCompanies = [...COL1, ...COL2]
    const companiesInCol1 = companyAttributes[currentBreakdown] || []
    const companiesInCol2 = allCompanies.filter((company) => !companiesInCol1.includes(company))

    const column1 = getCustomers(companiesInCol1)
    const column2 = getCustomers(companiesInCol2)

    const renderLogo = (customer: Customer): React.ReactNode => {
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

    const toggleBreakdown = (): void => {
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
        { name: translate(currentLabels.col1), width: 'minmax(auto,1fr)', align: 'center' as const },
        { name: translate(currentLabels.col2), width: 'minmax(auto,1fr)', align: 'center' as const },
    ]

    const renderCustomerWithLink = (customer: Customer): JSX.Element => (
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
                            {customer.slug === 'posthog'
                                ? translate('First PostHog customer!')
                                : translate('Read customer story')}
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
                            <>🔀 {translate('Shuffling...')}</>
                        ) : (
                            <>
                                <IconRefresh className="size-4 inline-block relative -top-px" />{' '}
                                {translate('Shuffle companies')}
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
                width="full"
                className={tableClassName || undefined}
            />
            <OSButton asLink to="/customers" variant="secondary" size="md" className="mt-4" state={{ newWindow: true }}>
                {translate('Open customers.mdx')}
            </OSButton>
        </>
    )
}

const ProductDetails = ({ translate = identity }: { translate?: TranslateFn }) => (
    <>
        <span className="bg-green inline-flex items-center gap-1 px-2 py-1 rounded-sm">
            <span className="w-3 h-3">
                <Eco />
            </span>
            <span className="uppercase font-semibold text-xs text-white">{translate('Eco-friendly')}</span>
        </span>
        <p className="text-4xl font-bold m-0 @xl:mt-2">PostHog Cloud</p>
        <p className="opacity-50 m-0 mb-4 text-sm">{translate('Digital download*')}</p>
    </>
)

const SignupEmbed: React.FC<Record<string, unknown>> = () => {
    const { setWindowTitle } = useApp()
    const { appWindow } = useWindow()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'Signup trends')
        }
    }, [])

    return (
        <iframe
            className="m-0 size-full"
            width="100%"
            height="100%"
            src="https://app.posthog.com/embedded/gQMqaRP0ZH0V3P3XXrSDnNcqDGoe7Q?refresh=true"
        />
    )
}

export function KoreanCTA({
    headline = true,
    translate = identity,
}: {
    headline?: boolean
    translate?: TranslateFn
}): JSX.Element {
    const { addWindow } = useApp()
    const posthog = usePostHog()
    const [version, setVersion] = useState('us')
    const [signupCountToday, setSignupCountToday] = useState(0)
    const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true })

    useEffect(() => {
        if (posthog?.isFeatureEnabled('direct-to-eu-cloud')) {
            setVersion('eu')
        }
        fetch(`/api/signup-count`)
            .then((res) => res.json())
            .then((count) => setSignupCountToday(count))
            .catch((err) => console.error(err))
    }, [])

    return (
        <section id="cta" ref={ref} className="pt-8 @xl:pt-0 px-5 lg:px-0">
            {headline && (
                <>
                    <h2 className={heading('lg')}>
                        {translate('This is the')}{' '}
                        <span className="text-red inline-block">{translate('call to action.')}</span>
                    </h2>
                    <h3 className={heading('sm')}>
                        {translate(
                            'If nothing else has sold you on PostHog, hopefully these classic marketing tactics will.'
                        )}
                    </h3>
                </>
            )}

            <div className="@xl:hidden py-12">
                <ProductDetails translate={translate} />
            </div>

            <div className="@xl:grid grid-cols-2 gap-16 @xl:pt-16 max-w-5xl mx-auto">
                <div className="relative text-right">
                    <div className="mb-2">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/images/cloud-cd.jpg"
                            alt="PostHog Cloud"
                            className="max-w-[443px]"
                        />
                    </div>
                    <div className="absolute -left-4 bottom-12 @xl:left-[-8px] @xl:bottom-24">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/images/g2-badge.png"
                            alt="People on G2 think we're great"
                            className="w-[90px]"
                        />
                    </div>

                    {inView && (
                        <motion.div
                            transition={{ duration: 1, type: 'tween' }}
                            initial={{ translateX: '-100vw' }}
                            animate={{ translateX: 0 }}
                            className="bg-blue text-left leading-none px-4 py-2 absolute -top-12 left-4 right-4 @xl:-left-4 @xl:right-auto rounded @xl:rounded-none"
                        >
                            <span className="text-sm font-bold text-white">
                                {translate('3 people (would have) added PostHog to their cart*')}
                            </span>
                            <br />
                            <span className="text-xs text-white">{translate('*if this were a real cart')}</span>
                        </motion.div>
                    )}
                    <div className="absolute top-4 -right-12">
                        <div className="relative">
                            <Bang className="w-[189px] animate-grow" />
                            <p className="px-8 text-center m-0 absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-black uppercase leading-none font-bold text-lg rotate-6">
                                <span className="text-xs">{translate('Famous celeb endorsement?')}</span>
                                {translate('Nope.')}
                            </p>
                        </div>
                    </div>
                    <p className="text-xs opacity-60 text-right break-keep">
                        {translate('*PostHog is a web product and cannot be installed by CD.')}
                        <br />
                        {translate('We did once send some customers a floppy disk but it was a Rickroll.')}
                    </p>
                </div>
                <div>
                    <div className="hidden @xl:block">
                        <ProductDetails translate={translate} />
                    </div>

                    <ul className="p-0 m-0 space-y-5">
                        <li className="list-none">
                            <strong className="text-lg block pb-1">{translate('Select your cloud')}</strong>
                            <ul className="flex gap-2 p-0 list-none">
                                <li>
                                    <button
                                        onClick={() => setVersion('us')}
                                        className={`py-2 px-3 font-bold border ${
                                            version === 'us'
                                                ? 'border-black dark:border-white'
                                                : 'border-transparent dark:border-transparent'
                                        }  hover:border-black dark:hover:border-white`}
                                    >
                                        {translate('US (Virginia)')}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setVersion('eu')}
                                        className={`py-2 px-3 font-bold border ${
                                            version === 'eu'
                                                ? 'border-black dark:border-white'
                                                : 'border-transparent dark:border-transparent'
                                        }  hover:border-black dark:hover:border-white`}
                                    >
                                        {translate('EU (Frankfurt)')}
                                    </button>
                                </li>
                            </ul>
                        </li>
                        <li className="list-none">
                            <strong className="text-lg block">{translate('Starts at:')}</strong>
                            <div className="flex items-baseline gap-1">
                                <s className="font-bold text-xl">$0</s>
                                <span className="font-bold text-red text-xl uppercase">{translate('Free')}</span>
                                <span className="text-xs opacity-50">
                                    &gt;<span className="text-sm">{translate('1 left at this price!!')}</span>
                                </span>
                            </div>
                        </li>
                    </ul>

                    <div className="py-6">
                        <CallToAction
                            type="primary"
                            size="absurd"
                            width="64"
                            to={`https://${version === 'us' ? 'app' : 'eu'}.posthog.com/signup`}
                            className="animate-grow-sm"
                            state={{ initialTab: 'signup' }}
                        >
                            {translate('Get started')}
                        </CallToAction>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="bg-accent rounded h-8 w-8 p-1">
                            <TrendUp className="opacity-75" />
                        </span>
                        <p className="text-sm text-secondary leading-tight mb-0">
                            <strong>{translate('Hurry')}:</strong>{' '}
                            {translate(`${signupCountToday || 'Tons of '} companies signed up`)}{' '}
                            <button
                                onClick={() =>
                                    addWindow(
                                        <SignupEmbed
                                            location={{ pathname: 'signup-embed' }}
                                            key="signup-embed"
                                            newWindow
                                        />
                                    )
                                }
                                className="font-bold dark:text-yellow text-red"
                            >
                                {translate('today')}
                            </button>
                            . <br className="hidden sm:block" />
                            {translate('Act now and get $0 off your first order.')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function KoreanFAQ({
    children,
    translate = identity,
}: {
    children: React.ReactNode
    translate?: TranslateFn
}): JSX.Element {
    const [value, setValue] = useState<string[]>([])

    const allValues = React.useMemo(() => {
        const values: string[] = []
        React.Children.forEach(children, (child) => {
            if (React.isValidElement<{ trigger?: string }>(child) && child.props.trigger) {
                values.push(child.props.trigger)
            }
        })
        return values
    }, [children])

    return (
        <div>
            <div className="flex justify-end mb-2">
                <OSButton variant="secondary" size="sm" onClick={() => setValue(allValues)}>
                    {translate('Expand all')}
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

export const KoreanFAQItem = ({ trigger, children }: { trigger: string; children: React.ReactNode }): JSX.Element => (
    <AccordionItem value={trigger} skin>
        <AccordionTrigger skin className="!text-base font-bold">
            {trigger}
        </AccordionTrigger>
        <AccordionContent skin>{children}</AccordionContent>
    </AccordionItem>
)

export function getKoreanSharedDescriptors(translate: TranslateFn = identity): JsxComponentDescriptor[] {
    return [
        {
            name: 'CTA',
            kind: 'flow',
            props: [],
            Editor: () => (
                <>
                    <p className="-mt-2">
                        {translate(
                            'If nothing else has sold you on PostHog, hopefully these classic marketing tactics will.'
                        )}
                    </p>
                    <KoreanCTA headline={false} translate={translate} />
                </>
            ),
        },
        {
            name: 'Pricing',
            kind: 'flow',
            props: [],
            Editor: () => <KoreanPricing translate={translate} />,
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
                    <p className="text-sm mb-0">{translate('You can also connect your own!')}</p>
                </Tooltip>
            ),
        },
        {
            name: 'SupportSmallTeamLink',
            kind: 'flow',
            props: [],
            Editor: () => (
                <SmallTeam slug="support" noMiniCrest>
                    {translate('support folks')}
                </SmallTeam>
            ),
        },
        {
            name: 'FAQ',
            kind: 'flow',
            props: [{ name: 'children', type: 'expression' }],
            Editor: ({ children }) => <KoreanFAQ translate={translate}>{children}</KoreanFAQ>,
        },
        {
            name: 'FAQItem',
            kind: 'flow',
            props: [
                { name: 'trigger', type: 'string' },
                { name: 'children', type: 'expression' },
            ],
            Editor: ({ trigger, children }) => <KoreanFAQItem trigger={trigger}>{children}</KoreanFAQItem>,
        },
    ]
}
