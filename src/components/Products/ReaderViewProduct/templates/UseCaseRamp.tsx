import React from 'react'
import Link from 'components/Link'
import { ToolChips } from 'components/ToolChip'
import { SectionComponentProps } from '../types'

/**
 * Where a rung happens. These are products (the surfaces you access PostHog
 * through), not tools – so they're named and linked rather than rendered as
 * tool chips. PostHog Web has no marketing page and the inbox has no product
 * slug, hence the hand-written destinations.
 */
const surfaces: Record<string, { name: string; to?: string }> = {
    web: { name: 'PostHog Web' },
    ai: { name: 'PostHog AI', to: '/ai' },
    mcp: { name: 'PostHog MCP', to: '/mcp' },
    inbox: { name: 'Inbox', to: '/docs/self-driving/inbox' },
    slack: { name: 'PostHog Slack', to: '/slack' },
    desktop: { name: 'PostHog Desktop', to: '/desktop' },
}

/**
 * One rung of the ramp. The three rungs are the same everywhere: you do it,
 * you ask an agent, then it runs without being asked.
 */
interface Rung {
    /** Who's driving – kept identical across tools so the section reads the same. */
    level: string
    /** Keys into `surfaces`: the products this rung happens in. */
    surfaces?: string[]
    body: React.ReactNode
    /** Handles of tools this rung draws on, resolved against `allProducts`. */
    tools?: string[]
}

interface UseCaseRampData {
    rungs?: Rung[]
}

const SurfaceTag = ({ surface }: { surface: { name: string; to?: string } }): JSX.Element => {
    const className = 'rounded-sm bg-accent px-1.5 py-0.5 text-xs font-semibold text-secondary'
    return surface.to ? (
        <Link to={surface.to} state={{ newWindow: true }} className={`${className} hover:text-primary`}>
            {surface.name}
        </Link>
    ) : (
        <span className={className}>{surface.name}</span>
    )
}

const UseCaseRamp = ({ id, productData, allProducts }: SectionComponentProps): JSX.Element | null => {
    const ramp: UseCaseRampData | undefined = productData?.useCaseRamp
    const rungs = ramp?.rungs ?? []

    if (!rungs.length) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-2">Ramp to self-driving</h2>
            <p className="m-0 mb-5 text-[15px] text-secondary">
                Each step is useful on its own. Together they go from you doing the work, to asking for it, to it
                arriving without being asked.
            </p>
            <ol className="m-0 list-none space-y-3 p-0 @2xl/reader-content:max-w-3xl">
                {rungs.map((rung, index) => (
                    <li key={rung.level} className="flex gap-3 @md/reader-content:gap-4">
                        <div className="flex flex-col items-center">
                            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-highlight text-sm font-bold text-red dark:text-yellow">
                                {index + 1}
                            </span>
                            {index < rungs.length - 1 && (
                                <span aria-hidden="true" className="mt-1 flex-1 border-l border-primary" />
                            )}
                        </div>
                        <div className="flex-1 rounded-md border border-primary bg-primary p-3 @md/reader-content:p-4">
                            <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
                                <h3 className="m-0 text-base font-bold text-primary @md/reader-content:text-lg">
                                    {rung.level}
                                </h3>
                                {(rung.surfaces ?? []).map((key) =>
                                    surfaces[key] ? <SurfaceTag key={key} surface={surfaces[key]} /> : null
                                )}
                            </div>
                            <p className="m-0 text-[15px] leading-relaxed text-secondary">{rung.body}</p>
                            <ToolChips
                                handles={rung.tools}
                                products={allProducts}
                                label="Compounds with"
                                className="mt-3"
                            />
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    )
}

export default UseCaseRamp
