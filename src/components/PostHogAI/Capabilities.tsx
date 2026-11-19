import React from 'react'
import Link from 'components/Link'
import useProduct from 'hooks/useProduct'
import { StickerRobot } from 'components/Stickers/Stickers'
import { IconMagic } from '@posthog/icons'
import ProductIcon from 'components/PostHogAI/ProductIcon'
import CloudinaryImage from 'components/CloudinaryImage'

const engineeringTools: {
    handle?: string
    product?: { name: string; Icon: React.ComponentType<{ className?: string }>; color: string }
    to: string
    task: string
}[] = [
    {
        handle: 'ai_observability',
        to: '/docs/ai-observability',
        task: 'Inspect prompts, responses, tool calls, latency, tokens, and cost in one trace.',
    },
    {
        handle: 'llm_evals',
        to: '/docs/ai-evals',
        task: 'Evaluate model output to find poor answers and catch regressions.',
    },
    {
        handle: 'mcp_analytics',
        to: '/docs/mcp-analytics',
        task: 'See agent intent, failed tool calls, and capabilities missing from your MCP server.',
    },
    {
        product: { name: 'Skills', Icon: IconMagic, color: 'purple' },
        to: '/docs/skills',
        task: 'Store agent skills with full version history, and share them with your team through MCP.',
    },
]

export function AIEngineering(): JSX.Element | null {
    const products = useProduct()
    if (!Array.isArray(products)) return null

    return (
        <section
            id="building-ai"
            className="my-12 rounded-md border border-blue bg-blue/10 p-5 shadow-xl @xl/reader-content:p-7"
        >
            <div className="grid items-center gap-6 @3xl/reader-content:grid-cols-[minmax(0,1fr)_14rem]">
                <div className="min-w-0">
                    <h2 className="m-0 flex items-center gap-2 text-xl font-bold @xl/reader-content:text-2xl">
                        <StickerRobot className="size-8 shrink-0 -rotate-6" />
                        Building your own AI?
                    </h2>
                    <p className="mb-5 mt-3 max-w-2xl text-base text-secondary">
                        PostHog AI works because it sits with your product data. Your AI can too.
                    </p>
                    <ul className="m-0 grid list-none gap-x-6 gap-y-4 p-0 @xl/reader-content:grid-cols-2">
                        {engineeringTools.map(({ handle, product: inlineProduct, to, task }) => {
                            const product = inlineProduct ?? products.find((item) => item.handle === handle)
                            if (!product) return null
                            return (
                                <li
                                    key={handle ?? product.name}
                                    className="border-t border-blue/30 pt-3 first:border-t-0 first:pt-0 @xl/reader-content:[&:nth-child(2)]:border-t-0 @xl/reader-content:[&:nth-child(2)]:pt-0"
                                >
                                    <Link to={to} state={{ newWindow: true }} className="group block !no-underline">
                                        <h3 className="m-0 flex items-center gap-2 text-base font-bold group-hover:underline">
                                            <ProductIcon product={product} className="size-5 shrink-0" />
                                            {product.name} →
                                        </h3>
                                        <p className="mb-0 mt-1 text-sm font-normal text-secondary">{task}</p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/transformer_hedgehog_2a379334d7.png"
                    alt=""
                    title="More than meets the AI"
                    loading="lazy"
                    width={360}
                    className="hidden @3xl/reader-content:block"
                    imgClassName="mx-auto max-h-56 w-auto"
                />
            </div>
        </section>
    )
}
