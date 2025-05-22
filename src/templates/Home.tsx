import React, { useEffect, useRef, useState } from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import Editor from 'components/Editor'
import Link from 'components/Link'
import OSTable from 'components/OSTable'
import { useCustomers } from 'hooks/useCustomers'
import CTA from 'components/Home/CTA'
import { IconArrowRight } from '@posthog/icons'
import Roadmap from 'components/Home/New/Roadmap'
import Pricing from 'components/Home/New/Pricing'
import OSButton from 'components/OSButton'
import useProduct from 'hooks/useProduct'
import { Accordion } from 'components/RadixUI/Accordion'
import {
    JsxComponentDescriptor,
    MDXEditor,
    frontmatterPlugin,
    headingsPlugin,
    jsxPlugin,
    linkPlugin,
    listsPlugin,
    toolbarPlugin,
    usePublisher,
    applyFormat$,
    currentFormat$,
    useCellValues,
    FORMAT,
    IS_BOLD,
    IS_ITALIC,
    IS_STRIKETHROUGH,
    activeEditor$,
} from '@mdxeditor/editor'
import {
    LexicalEditor,
    REDO_COMMAND,
    UNDO_COMMAND,
    FORMAT_ELEMENT_COMMAND,
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_CRITICAL,
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
} from 'lexical'
import { mergeRegister } from '@lexical/utils'
import Logo from 'components/Logo'
import { useApp } from '../context/App'
import { useWindow } from '../context/Window'

interface ProductButtonsProps {
    productTypes: string[]
    className?: string
}

const ProductButtons: React.FC<ProductButtonsProps> = ({ productTypes, className = '' }) => {
    const allProducts = useProduct()

    // Helper to get product by type or name
    const getProduct = (typeOrName: string) =>
        Array.isArray(allProducts)
            ? allProducts.find((p: any) => p.type === typeOrName || p.name === typeOrName)
            : undefined

    return (
        <span className={`flex flex-wrap gap-1 ${className}`}>
            {productTypes.map((type) => {
                const product = getProduct(type)
                return product ? (
                    <OSButton
                        key={product.type}
                        variant="ghost"
                        icon={product.Icon ? <product.Icon /> : undefined}
                        iconClassName={`text-${product.color}`}
                        color={product.color}
                        className="font-medium text-primary hover:text-primary"
                        to={`${product.slug}`}
                        state={{ newWindow: true }}
                        asLink
                    >
                        {product.name}
                    </OSButton>
                ) : null
            })}
        </span>
    )
}

const Products = () => {
    const allProducts = useProduct() // This returns the deduped array of products

    // Helper to get product by type or name
    const getProduct = (typeOrName) => allProducts.find((p) => p.type === typeOrName || p.name === typeOrName)

    const columns = [
        { name: '', width: 'auto', align: 'center' as const },
        { name: 'goal', width: 'minmax(150px,250px)', align: 'left' as const },
        { name: 'products', width: 'minmax(auto,1fr)', align: 'left' as const },
    ]

    const rows = [
        {
            cells: [
                { content: 1 },
                { content: 'understand product usage', className: 'font-bold' },
                {
                    content: <ProductButtons productTypes={['web_analytics', 'product_analytics', 'session_replay']} />,
                    className: 'text-sm flex-wrap gap-px',
                },
            ],
        },
        {
            cells: [
                { content: 2 },
                { content: 'test new features', className: 'font-bold' },
                {
                    content: <ProductButtons productTypes={['feature_flags', 'experiments', 'error_tracking']} />,
                    className: 'text-sm',
                },
            ],
        },
        {
            cells: [
                { content: 3 },
                { content: 'get feedback from users', className: 'font-bold' },
                {
                    content: <ProductButtons productTypes={['surveys']} />,
                    className: 'text-sm',
                },
            ],
        },
        {
            cells: [
                { content: 4 },
                { content: 'consolidate product usage data', className: 'font-bold' },
                {
                    content: <ProductButtons productTypes={['data_warehouse', 'data_pipelines']} />,
                    className: 'text-sm',
                },
            ],
        },
    ]

    return (
        <div>
            <OSTable columns={columns} rows={rows} size="sm" />
            <div className="bg-accent p-1 text-right text-xs border-primary border-x border-b">
                <Link to="/products" state={{ newWindow: true }} className="hover:underline">
                    Open product explorer <IconArrowRight className="inline-block -rotate-45 size-4 text-primary" />
                </Link>
            </div>
        </div>
    )
}

const sections = [
    {
        title: 'products',
        description: 'PostHog helps you...',
        content: <Products />,
    },
    {
        title: 'roadmap',
        description: "we haven't built our defining feature. customers help us decide what to build next.",
        content: <Roadmap frame={false} />,
    },
    {
        title: 'pricing',
        description:
            'our usage-based pricing means you don\'t have to "talk to sales". plus each product has a generous monthly free tier – in fact, 98% of customers use PostHog for free!',
        content: <Pricing />,
    },
    {
        title: 'logos',
        description:
            "here are some of our paying customers. (yes they actually use us, no it's not just some random engineer that tried us out 2+ years ago.)",
        content: '', // component with logos
    },
    {
        title: 'why PostHog?',
        description: "we're different from most companies for a bunch of reasons:",
        content: (
            <>
                <ul>
                    <li>
                        <strong>transparency.</strong> read our <Link to="/handbook">company handbook</Link>, our{' '}
                        <Link to="/sales-manual">sales manual</Link>, or <Link to="/strategy">company strategy</Link>
                    </li>
                    <li>
                        <strong>we ship fast.</strong> see our <Link to="/changelog">changelog</Link>
                    </li>
                    <li>
                        <strong>actually-technical support.</strong> our <Link to="/support">support people</Link> all
                        have engineering backgrounds.
                    </li>
                </ul>
                <p>
                    <Link to="/company-tour">take the company tour</Link> →
                </p>
            </>
        ),
    },
    {
        title: 'bedtime reading',
        description: 'here are some links that may be interesting to you:',
        content: (
            <>
                <ul>
                    <li>
                        <Link to="/demo.mov">demo.mov</Link>
                    </li>
                    <li>
                        <Link to="/technical-docs">technical docs</Link>
                    </li>
                    <li>
                        <Link to="/api">api</Link>
                    </li>
                    <li>
                        <Link to="/ask-a-question">ask a question</Link>
                    </li>
                    <li>
                        <Link to="/small-teams-at-posthog">small teams at PostHog</Link>
                    </li>
                </ul>
            </>
        ),
    },
    {
        title: 'shameless CTA',
        // description: 'we have a lot of features. here are some of them.',
        content: <CTA />,
    },
]

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

const PageNavigation = () => {
    const [showTableOfContents, setShowTableOfContents] = useState(false)
    return (
        <div className="mb-8">
            {!showTableOfContents && (
                <button
                    className="underline text-sm font-semibold"
                    onClick={() => setShowTableOfContents(!showTableOfContents)}
                >
                    table of contents
                </button>
            )}
            {showTableOfContents && (
                <Accordion
                    defaultValue="table-of-contents"
                    items={[
                        {
                            value: 'table-of-contents',
                            trigger: <strong>Contents</strong>,
                            content: (
                                <div data-scheme="primary">
                                    <ol className="pl-4">
                                        {sections.map((section) => (
                                            <li key={section.title}>
                                                <Link
                                                    to={`/#${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                                                    className="group flex items-center gap-1"
                                                >
                                                    <span>{section.title}</span>
                                                    <IconArrowRight className="inline-block rotate-90 size-3 text-primary opacity-0 group-hover:opacity-100" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            ),
                        },
                    ]}
                />
            )}
        </div>
    )
}

const Customers = () => {
    const { getCustomers } = useCustomers()
    const customers = getCustomers(CUSTOMER_ORDER)

    const columns = [
        { name: '', width: 'auto', align: 'center' as const },
        { name: 'Company name', width: 'minmax(150px,1fr)', align: 'center' as const },
        { name: 'Product(s) used', width: 'minmax(auto,250px)' },
        { name: 'Case study?', width: 'minmax(auto,100px)', align: 'center' as const },
        { name: 'Notes', width: 'minmax(auto,180px)', align: 'center' as const },
    ]

    const rows = customers.map((customer: CustomerProps, index: number) => {
        return Customer({
            number: index + 1,
            customer,
        })
    })

    return <OSTable columns={columns} rows={rows} size="sm" />
}

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
    {
        name: 'PageNavigation',
        kind: 'flow',
        props: [],
        Editor: () => <PageNavigation />,
    },
    {
        name: 'Products',
        kind: 'flow',
        props: [],
        Editor: () => <Products />,
    },
    {
        name: 'Roadmap',
        kind: 'flow',
        props: [],
        Editor: () => <Roadmap frame={false} />,
    },
    {
        name: 'Pricing',
        kind: 'flow',
        props: [],
        Editor: () => <Pricing />,
    },
    {
        name: 'Customers',
        kind: 'flow',
        props: [],
        Editor: () => <Customers />,
    },
    {
        name: 'CTA',
        kind: 'flow',
        props: [],
        Editor: () => <CTA />,
    },
    {
        name: 'Logo',
        kind: 'flow',
        props: [],
        Editor: () => <Logo noText className="inline-block" />,
    },
]

export default function Home({
    data,
}: {
    data: { mdx: { frontmatter: { title: string; template: string }; body: string; rawBody: string } }
}) {
    const [currentFormat, setCurrentFormat] = useState<FORMAT>(0)
    const [activeEditor, setActiveEditor] = useState<LexicalEditor>()
    const applyFormatRef = React.useRef<((value: any) => void) | null>(null)
    const [currentAlignment, setCurrentAlignment] = useState<'left' | 'center' | 'right' | 'justify'>('left')
    const [canUndo, setCanUndo] = React.useState(false)
    const [canRedo, setCanRedo] = React.useState(false)
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()

    useEffect(() => {
        if (activeEditor) {
            mergeRegister(
                activeEditor.registerCommand<boolean>(
                    CAN_UNDO_COMMAND,
                    (payload) => {
                        setCanUndo(payload)
                        return false
                    },
                    COMMAND_PRIORITY_CRITICAL
                ),
                activeEditor.registerCommand<boolean>(
                    CAN_REDO_COMMAND,
                    (payload) => {
                        setCanRedo(payload)
                        return false
                    },
                    COMMAND_PRIORITY_CRITICAL
                )
            )

            const removeUpdateListener = activeEditor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    const selection = $getSelection()
                    if (selection && $isRangeSelection(selection)) {
                        const anchorNode = selection.anchor.getNode()
                        const element = anchorNode.getParent()
                        if (element) {
                            const format = element.getFormat()
                            const alignment = format & 0x7
                            setCurrentAlignment(
                                alignment === 1
                                    ? 'left'
                                    : alignment === 2
                                    ? 'center'
                                    : alignment === 3
                                    ? 'right'
                                    : alignment === 4
                                    ? 'justify'
                                    : 'left'
                            )
                        }
                    }
                })
            })
            return () => removeUpdateListener()
        }
    }, [activeEditor])

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'home.mdx')
        }
    }, [])

    return (
        <Editor
            type="mdx"
            slug="/"
            actionButtons={{
                undo: {
                    onClick: () => activeEditor?.dispatchCommand(UNDO_COMMAND, undefined),
                    disabled: !canUndo,
                },
                redo: {
                    onClick: () => activeEditor?.dispatchCommand(REDO_COMMAND, undefined),
                    disabled: !canRedo,
                },
                bold: {
                    onClick: () => applyFormatRef.current?.('bold'),
                    active: (currentFormat & IS_BOLD) !== 0,
                },
                italic: {
                    onClick: () => applyFormatRef.current?.('italic'),
                    active: (currentFormat & IS_ITALIC) !== 0,
                },
                strikethrough: {
                    onClick: () => applyFormatRef.current?.('strikethrough'),
                    active: (currentFormat & IS_STRIKETHROUGH) !== 0,
                },
                leftAlign: {
                    onClick: () => activeEditor?.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left'),
                    active: currentAlignment === 'left',
                },
                centerAlign: {
                    onClick: () => activeEditor?.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center'),
                    active: currentAlignment === 'center',
                },
                rightAlign: {
                    onClick: () => activeEditor?.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right'),
                    active: currentAlignment === 'right',
                },
            }}
        >
            <MDXEditor
                contentEditableClassName="outline-none"
                markdown={data.mdx.rawBody}
                plugins={[
                    headingsPlugin(),
                    frontmatterPlugin(),
                    listsPlugin(),
                    linkPlugin(),
                    jsxPlugin({ jsxComponentDescriptors }),
                    toolbarPlugin({
                        toolbarContents: () => {
                            const [currentFormat, activeEditor] = useCellValues(currentFormat$, activeEditor$)
                            const applyFormat = usePublisher(applyFormat$)
                            useEffect(() => {
                                applyFormatRef.current = applyFormat
                            }, [])
                            useEffect(() => {
                                setCurrentFormat(currentFormat)
                            }, [currentFormat])
                            useEffect(() => {
                                setActiveEditor(activeEditor)
                            }, [activeEditor])
                            return null
                        },
                    }),
                ]}
            />
        </Editor>
    )
}

export const query = graphql`
    query HomeQuery($id: String!) {
        mdx(id: { eq: $id }) {
            frontmatter {
                title
                template
            }
            body
            rawBody
        }
    }
`
