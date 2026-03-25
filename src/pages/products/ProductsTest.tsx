import React, { useMemo } from 'react'
import { navigate } from 'gatsby'
import SEO from 'components/seo'
import useProduct from '../../hooks/useProduct'
import { IconArrowRight } from '@posthog/icons'
import { IconApple } from 'components/OSIcons'
import Editor from 'components/Editor'
import WizardCommand from 'components/WizardCommand'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'

const statusDotColor: Record<string, string> = {
    beta: 'bg-yellow',
    alpha: 'bg-orange',
    WIP: 'bg-red',
}

const sections = [
    {
        title: 'Data platform',
        description:
            'Having all your product data in one place means you can make more informed decisions. Push all your data to PostHog, then send it anywhere else you need, too.',
        link: { label: 'Data stack readme.md', url: '/data-stack' },
        groups: [
            { label: 'Data I/O', handles: ['data_in', 'data_out'] },
            {
                label: 'Manage & query',
                colSpan: 2,
                columns: [
                    ['data_modeling', 'data_warehouse', 'cdp'],
                    ['sql_editor', 'bi'],
                ],
            },
        ],
    },
    {
        title: 'Automatic tooling',
        description:
            "In a previous era of building products, you'd need to configure most of these manually. Now, PostHog just handles it all behind the scenes automatically.",
        link: { label: 'Tooling readme.md', url: '/docs' },
        groups: [
            {
                label: 'Analytics',
                handles: [
                    'web_analytics',
                    'product_analytics',
                    'revenue_analytics',
                    'trends',
                    'funnels',
                    'user_paths',
                    'lifecycle',
                    'llm_traces',
                    'llm_generations',
                    'llm_evals',
                ],
            },
            {
                label: 'Debugging & analysis',
                handles: ['session_replay', 'heatmaps', 'error_tracking', 'logs', 'profiles', 'surveys', 'support'],
            },
            {
                label: 'Feature development',
                handles: [
                    'feature_flags',
                    'experiments',
                    'no_code_ab_testing',
                    'early_access',
                    'endpoints',
                    'product_tours',
                    'webhooks',
                    'workflows_emails',
                ],
            },
        ],
    },
    {
        title: 'Tools',
        description:
            'While PostHog AI is the main way to interact with PostHog, there are still some bespoke views that will come in handy.',
        groups: [
            {
                label: null,
                handles: ['dashboards', 'notebooks', 'activity'],
            },
        ],
    },
]

const ProductRow = ({ product }: { product: any }) => {
    const isWIP = product.status === 'WIP'

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        if (isWIP) return
        navigate(`/${product.slug}`, { state: { newWindow: true } })
    }

    return (
        <button
            onClick={handleClick}
            className={`flex items-center gap-2 py-0.5 group text-left w-full ${
                isWIP ? 'cursor-default opacity-60' : 'cursor-pointer'
            }`}
        >
            {product.Icon &&
                React.createElement(product.Icon, {
                    className: `size-4 shrink-0 text-${product.color}`,
                })}
            <span
                className={`text-sm text-primary ${
                    isWIP ? '' : 'group-hover:text-red group-hover:underline underline-offset-2'
                }`}
            >
                {product.name}
            </span>
            {product.status && (
                <span className={`size-1.5 shrink-0 rounded-full ${statusDotColor[product.status] || 'bg-muted'}`} />
            )}
        </button>
    )
}

export default function ProductsTest(): JSX.Element {
    const allProducts = useProduct() as any[]

    const productsByHandle = useMemo(() => {
        const map: Record<string, any> = {}
        for (const p of allProducts) {
            map[p.handle] = p
        }
        return map
    }, [allProducts])

    return (
        <>
            <SEO
                title="Product OS – PostHog"
                description="PostHog is the cracked technical co-founder that handles all the stuff you used to worry about."
                image="/images/og/default.png"
            />
            <Editor maxWidth={900}>
                <div className="space-y-10">
                    {/* Hero */}
                    <header className="space-y-4">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/coderhog_80987dd905.png"
                            className="@xl:float-right @xl:ml-4 w-56"
                        />
                        <h1 className="text-2xl @lg:text-3xl font-bold leading-tight">
                            The cracked technical co-founder that handles all the stuff you used to worry about
                        </h1>
                        <p className="text-[15px] leading-relaxed">
                            <strong>You have better things to do than run analysis and fix bugs.</strong> PostHog
                            handles all that for you &ndash; and answers your product usage questions to help you figure
                            out what to build next.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 not-prose">
                            <Link
                                to="/download"
                                state={{ newWindow: true }}
                                className="inline-flex items-center gap-2 bg-dark text-white dark:bg-white dark:text-dark font-semibold text-sm px-4 py-2.5 rounded-md hover:opacity-90 no-underline"
                            >
                                <IconApple className="size-4" />
                                Download for Mac
                                <IconArrowRight className="size-4" />
                            </Link>
                            <WizardCommand slim />
                        </div>

                        <div className="flex gap-4 text-sm">
                            <Link
                                to="/docs/libraries/vscode"
                                state={{ newWindow: true }}
                                className="underline underline-offset-2 font-medium"
                            >
                                Get our VS Code extension
                            </Link>
                            <span className="text-secondary">or</span>
                            <Link
                                to="/docs/model-context-protocol"
                                state={{ newWindow: true }}
                                className="underline underline-offset-2 font-medium"
                            >
                                Try the MCP
                            </Link>
                        </div>
                    </header>

                    {/* Sections */}
                    {sections.map((section) => (
                        <section key={section.title} className="space-y-3">
                            <h2 className="text-xl font-bold">{section.title}</h2>
                            <p className="text-[15px] leading-relaxed">
                                {section.description}
                                {section.link && (
                                    <>
                                        {' '}
                                        <Link
                                            to={section.link.url}
                                            state={{ newWindow: true }}
                                            className="inline-flex items-center gap-1 font-medium whitespace-nowrap"
                                        >
                                            {section.link.label} <IconArrowRight className="size-3.5" />
                                        </Link>
                                    </>
                                )}
                            </p>

                            <div
                                className={`grid gap-x-8 gap-y-6 ${
                                    section.groups.length >= 3
                                        ? 'grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3'
                                        : 'grid-cols-1 @md:grid-cols-3'
                                }`}
                            >
                                {section.groups.map((group, gi) => {
                                    if ('columns' in group && group.columns) {
                                        return (
                                            <div key={gi} className={group.colSpan === 2 ? '@md:col-span-2' : ''}>
                                                {group.label && (
                                                    <h3 className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5">
                                                        {group.label}
                                                    </h3>
                                                )}
                                                <div className="grid grid-cols-2 gap-x-8">
                                                    {group.columns.map((col: string[], ci: number) => (
                                                        <div key={ci} className="space-y-1">
                                                            {col.map((handle: string) => {
                                                                const product = productsByHandle[handle]
                                                                if (!product) return null
                                                                return <ProductRow key={handle} product={product} />
                                                            })}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    }

                                    return (
                                        <div key={gi} className="space-y-1">
                                            {group.label && (
                                                <h3 className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5">
                                                    {group.label}
                                                </h3>
                                            )}
                                            {group.handles?.map((handle: string) => {
                                                const product = productsByHandle[handle]
                                                if (!product) return null
                                                return <ProductRow key={handle} product={product} />
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            </Editor>
        </>
    )
}
