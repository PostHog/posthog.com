import React from 'react'
import { IconGraph } from '@posthog/icons'
import Link from 'components/Link'
import { useFlowToolResolver } from 'hooks/skills'

/**
 * Renders a skill's `flow` (an ordered chain of PostHog MCP tool handles) as a
 * vertical, connected list — each step's icon is joined to the next by a line to
 * show the linear order. Each tool shows in monospace next to the icon of the
 * product it belongs to, linked to that product's page when known.
 */
export default function FlowChips({ flow }: { flow: string[] }): JSX.Element {
    const resolveTool = useFlowToolResolver()

    return (
        <ol className="list-none m-0 p-0">
            {flow.map((tool, i) => {
                const { product } = resolveTool(tool)
                const Icon = product?.Icon ?? IconGraph
                const iconColor = product?.color ? `text-${product.color}` : 'text-secondary'
                const isLast = i === flow.length - 1
                const label = <span className="font-mono text-xs break-all">{tool}</span>

                return (
                    <li key={`${tool}-${i}`} className="flex gap-2">
                        {/* Rail: icon, then a line that fills the row height to connect to the next icon */}
                        <div className="flex flex-col items-center self-stretch">
                            <Icon className={`size-4 flex-shrink-0 ${iconColor}`} />
                            {!isLast && <span className="w-px flex-1 bg-border my-1" />}
                        </div>
                        <div className={`min-w-0 ${isLast ? '' : 'pb-3'}`}>
                            {product?.href ? (
                                <Link
                                    to={product.href}
                                    state={{ newWindow: true }}
                                    title={product.name}
                                    className="hover:underline"
                                >
                                    {label}
                                </Link>
                            ) : (
                                label
                            )}
                        </div>
                    </li>
                )
            })}
        </ol>
    )
}
