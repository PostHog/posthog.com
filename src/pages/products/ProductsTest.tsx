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
            {
                label: 'Data I/O',
                handles: ['data_in', 'data_out'],
                afterLink: { label: 'View all integrations', url: '/data-stack/integrations-library' },
            },
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
                label: 'Understand product usage',
                colSpan: 2,
                columns: [
                    ['web_analytics', 'product_analytics', 'revenue_analytics', 'trends'],
                    ['funnels', 'user_paths', 'lifecycle', 'llm_traces'],
                    ['llm_generations', 'llm_evals', 'session_replay', 'heatmaps'],
                ],
            },
            {
                label: 'Debug & fix issues',
                handles: ['error_tracking', 'logs', 'session_replay', 'profiles'],
            },
            {
                label: 'Ship features & get feedback',
                colSpan: 2,
                columns: [
                    ['feature_flags', 'experiments', 'no_code_ab_testing', 'early_access', 'endpoints', 'webhooks'],
                    ['workflows_emails', 'surveys', 'product_tours', 'support', 'user_interviews'],
                ],
            },
        ],
    },
    {
        title: 'Tools',
        description: (
            <>
                <Link to="/ai" state={{ newWindow: true }} className="font-semibold">
                    PostHog AI
                </Link>{' '}
                can answer most questions directly, but dashboards give you at-a-glance metrics, notebooks let you
                compile insights and replays to support a deep dive, and the activity feed shows a real-time event
                timeline of what users are doing.
            </>
        ),
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
                            PostHog is like having a cracked dev team that handles all the stuff you used to have to do
                            manually
                        </h1>
                        <p className="text-lg leading-relaxed">
                            Devtools and product data infrastructure for AI agents to build successful products
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

                    <div className="space-y-6 text-lg leading-relaxed">
                        <h2 className="text-2xl font-bold">How we build things on the internet has changed a lot.</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg">Until ~2020: The prehistoric days of software development</h3>
                                <p>
                                    Analytics, A/B testing, error tracking, and other dev tools required manual
                                    implementation using dozens of vendors. (Entire companies were built <em>just</em>{' '}
                                    around routing data various places!)
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg">2020-2024: Multi-product SaaS companies</h3>
                                <p>
                                    We started seeing consolidation in B2B SaaS. It became more common to have multiple
                                    tools in the same UI.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg">2025+: Just write a prompt</h3>
                                <p>
                                    AI now makes it possible to both analyze data <em>and</em> build new features with
                                    tooling in place.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p>But building with AI still has two major flaws:</p>
                            <ol className="list-decimal list-inside space-y-2">
                                <li>
                                    <strong>AI is prone to yolo-ing.</strong> Sure, Claude can vibe code a lightweight
                                    analytics stack or a feature flag. But without proper infrastructure, it won't
                                    scale. And your tokens are better spent on building your core product than the
                                    tooling to support it.
                                </li>
                                <li>
                                    <strong>Context is key.</strong> Customer data still lives across various point
                                    solutions (database, CRM, support tool, analytics stack). And if you're asking AI to
                                    analyze data or write code – its output can only be as good as the context it has.
                                </li>
                            </ol>
                        </div>

                        <div className="space-y-3">
                            <p>PostHog solves this in a few ways:</p>
                            <ol className="list-decimal list-inside space-y-2">
                                <li>
                                    <strong>Unified data stack.</strong> Your data might originate elsewhere, but{' '}
                                    <em>everything</em> can be pushed into PostHog where it can be transformed, queried,
                                    and even exported.
                                </li>
                                <li>
                                    <strong>MCP.</strong> PostHog's dozens of tools are available to your LLM. You no
                                    longer need to learn a UI to run analysis or perform tasks like creating an
                                    experiment, survey, or feature flag.
                                </li>
                                <li>
                                    <strong>PostHog Code.</strong> Our AI code editor automatically analyzes signals
                                    from customer data, proposes improvements, and writes pull requests –{' '}
                                    <em>automatically</em>.
                                </li>
                            </ol>
                        </div>

                        <hr className="border-border" />

                        <p>
                            How we run analysis and build software has changed, but what <em>hasn't</em> changed is the
                            need for good data, good tooling, and a seamless way for them to operate together in
                            harmony.
                        </p>
                    </div>

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
                                        ? 'grid-cols-1 @md:grid-cols-2 @2xl:grid-cols-3'
                                        : 'grid-cols-1 @md:grid-cols-3'
                                }`}
                            >
                                {section.groups.map((group, gi) => {
                                    if ('columns' in group && group.columns) {
                                        const isFirstGroup = gi === 0
                                        const spanClass =
                                            group.colSpan === 2
                                                ? isFirstGroup
                                                    ? '@md:col-span-2 @2xl:col-span-3'
                                                    : '@md:col-span-2'
                                                : ''
                                        return (
                                            <div key={gi} className={spanClass}>
                                                {group.label && (
                                                    <h3 className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5">
                                                        {group.label}
                                                    </h3>
                                                )}
                                                <div
                                                    className={`grid gap-x-8 ${
                                                        isFirstGroup ? 'grid-cols-2 @2xl:grid-cols-3' : 'grid-cols-2'
                                                    }`}
                                                >
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
                                            {'afterLink' in group && group.afterLink && (
                                                <Link
                                                    to={group.afterLink.url}
                                                    state={{ newWindow: true }}
                                                    className="inline-flex items-center gap-1 text-sm font-medium mt-2"
                                                >
                                                    {group.afterLink.label} <IconArrowRight className="size-3.5" />
                                                </Link>
                                            )}
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
