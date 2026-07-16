import React, { useMemo, useState } from 'react'
import Link from 'components/Link'
import Tooltip from 'components/RadixUI/Tooltip'
import { getWizardFrameworkRows } from 'constants/installation-taxonomy'

/** Spotlight slugs for “Supports Next.js, React, Python, …” (labels come from taxonomy). */
const TEASER_SLUGS = ['nextjs', 'react', 'python'] as const

/**
 * Helper line + tooltip listing every wizard-supported framework (from installation taxonomy).
 */
export default function WizardFrameworksTeaser({ className }: { className?: string }): JSX.Element {
    const rows = useMemo(() => getWizardFrameworkRows(), [])

    const teaserLabels = useMemo(() => {
        const labels: string[] = []
        for (const slug of TEASER_SLUGS) {
            const row = rows.find((r) => r.slug === slug)
            if (row) labels.push(row.label)
        }
        return labels
    }, [rows])

    const moreCount = Math.max(0, rows.length - teaserLabels.length)

    const [tooltipOpen, setTooltipOpen] = useState(false)

    const rootClass = className ? `!text-[13px] text-secondary m-0 ${className}` : '!text-[13px] text-secondary m-0'

    return (
        <p className={rootClass}>
            Supports {teaserLabels.join(', ')}
            {moreCount > 0 ? (
                <>
                    , and{' '}
                    <Tooltip
                        open={tooltipOpen}
                        onOpenChange={setTooltipOpen}
                        delay={200}
                        side="bottom"
                        contentClassName="max-w-sm min-w-[240px] max-h-[min(420px,var(--radix-tooltip-content-available-height))] overflow-y-auto px-1 py-0 text-[13px] leading-snug"
                        trigger={
                            <button
                                type="button"
                                className="text-primary underline decoration-dotted underline-offset-2 cursor-help bg-transparent border-0 p-0 font-inherit"
                            >
                                {moreCount} more
                            </button>
                        }
                    >
                        <div className="flex flex-col gap-px py-1">
                            {rows.map((row) => (
                                <Link
                                    key={row.slug}
                                    to={row.url}
                                    contextMenu={false}
                                    externalNoIcon={row.external}
                                    state={row.external ? undefined : { newWindow: true }}
                                    onClick={() => setTooltipOpen(false)}
                                    className="flex w-full min-w-0 items-center gap-2 rounded-sm px-3 py-2 hover:bg-accent text-primary no-underline"
                                >
                                    {row.image ? (
                                        <img src={row.image} alt="" className="w-6 h-6 object-contain shrink-0" />
                                    ) : (
                                        <span className="w-6 h-6 shrink-0 rounded bg-accent" aria-hidden />
                                    )}
                                    <span className="flex-1 text-left text-sm leading-tight">{row.label}</span>
                                    {row.badge ? (
                                        <span className="text-[10px] uppercase text-muted shrink-0">{row.badge}</span>
                                    ) : null}
                                </Link>
                            ))}
                        </div>
                    </Tooltip>
                </>
            ) : null}
        </p>
    )
}
