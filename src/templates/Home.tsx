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
    beta?: boolean
}

const ProductButtons: React.FC<ProductButtonsProps> = ({ productTypes, className = '', beta = false }) => {
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
                        {beta && <span className="text-xs opacity-50">beta</span>}
                    </OSButton>
                ) : null
            })}
        </span>
    )
}

const HappyHog = () => {
    return (
        <img
            src="https://res.cloudinary.com/dmukukwp6/image/upload/happy_hog_ebc59e4658.png"
            alt="happy hog"
            className="float-right max-w-[400px] max-h-48 -mt-2 -mr-2"
        />
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
                    content: <ProductButtons productTypes={['Web analytics', 'Product analytics', 'Session replay']} />,
                    className: 'text-sm flex-wrap gap-px',
                },
            ],
        },
        {
            cells: [
                { content: 2 },
                { content: 'test new features', className: 'font-bold' },
                {
                    content: <ProductButtons productTypes={['Feature flags', 'Experiments', 'Error tracking']} />,
                    className: 'text-sm',
                },
            ],
        },
        {
            cells: [
                { content: 3 },
                { content: 'talk to customers', className: 'font-bold' },
                {
                    content: <ProductButtons productTypes={['Surveys', 'messaging', 'User interviews', 'Broadcasts']} />,
                    className: 'text-sm',
                },
            ],
        },
        {
            cells: [
                { content: 4 },
                { content: 'organize usage data', className: 'font-bold' },
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

            <p className="mt-2 inline-flex items-center">
                <span>using these tools, you can track your findings with</span>
                <ProductButtons productTypes={['Dashboards']} />

                <span>or create</span>
                <ProductButtons productTypes={['Notebooks']} />
            </p>
        </div>
    )
}

const CUSTOMER_ORDER = ['ycombinator', 'airbus', 'dhl', 'startengine']

const HUGE = ['ycombinator', 'airbus', 'dhl', 'startengine']

const GONNA_BE_HUGE = [
    'supabase',
    'mistralai',
    'elevenlabs',
    'raycast',
    'assemblyai',
    'hasura',
    'trust',
    'researchgate',
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
    const hugeCustomers = getCustomers(HUGE)
    const gonnaBeHugeCustomers = getCustomers(GONNA_BE_HUGE)

    const columns = [
        { name: 'Huge companies', width: 'minmax(auto,1fr)', align: 'center' as const },
        { name: 'Gonna be huge companies', width: 'minmax(auto,1fr)', align: 'center' as const },
    ]

    const rows = [
        {
            cells: [
                {
                    content: (
                        <div className="flex flex-wrap gap-4 justify-center items-center">
                            {hugeCustomers.map((customer) =>
                                customer.logo ? (
                                    <div key={customer.slug} className="h-8 flex items-center justify-center">
                                        <img
                                            src={customer.logo.light}
                                            alt={customer.name}
                                            className={`h-full w-auto object-contain dark:hidden`}
                                            style={{ maxHeight: customer.height ? `${customer.height}px` : 'auto' }}
                                        />
                                        <img
                                            src={customer.logo.dark}
                                            alt={customer.name}
                                            className={`h-full w-auto object-contain hidden dark:block`}
                                            style={{ maxHeight: customer.height ? `${customer.height}px` : 'auto' }}
                                        />
                                    </div>
                                ) : null
                            )}
                        </div>
                    ),
                    className: '!p-4',
                },
                {
                    content: (
                        <div className="flex flex-wrap gap-4 justify-center items-center">
                            {gonnaBeHugeCustomers.map((customer) =>
                                customer.logo ? (
                                    <div key={customer.slug} className="h-8 flex items-center justify-center">
                                        <img
                                            src={customer.logo.light}
                                            alt={customer.name}
                                            className={`h-full w-auto object-contain dark:hidden`}
                                            style={{ maxHeight: customer.height ? `${customer.height}px` : 'auto' }}
                                        />
                                        <img
                                            src={customer.logo.dark}
                                            alt={customer.name}
                                            className={`h-full w-auto object-contain hidden dark:block`}
                                            style={{ maxHeight: customer.height ? `${customer.height}px` : 'auto' }}
                                        />
                                    </div>
                                ) : null
                            )}
                        </div>
                    ),
                    className: '!p-4',
                },
            ],
        },
    ]

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
        name: 'HappyHog',
        kind: 'flow',
        props: [],
        Editor: () => <HappyHog />,
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
