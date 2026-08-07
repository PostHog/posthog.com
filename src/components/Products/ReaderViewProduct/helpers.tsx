import React from 'react'

/** Title inside a bordered card or panel. Stays small on purpose. */
export const CARD_H3 = 'text-base font-bold text-primary mt-0 mb-1 leading-snug'

/**
 * Section header: a heading plus an optional lede paragraph.
 *
 * These sections are `not-prose`, where `global.css` sizes a bare `<h2>` at
 * 1.5rem – a touch small against the reader's `proseSize="lg"` body copy, hence
 * the nudge to 1.75rem. The lede restates `text-lg` for the same reason.
 */
export const SectionHeading = ({
    children,
    lede,
    className = '',
}: {
    children: React.ReactNode
    lede?: React.ReactNode
    className?: string
}) => (
    <header className={`mb-4 ${className}`}>
        <h2 className="text-[1.75rem] font-bold text-primary mt-0 mb-3 leading-tight text-balance">{children}</h2>
        {lede && <p className="text-lg text-secondary leading-relaxed m-0 mb-6 max-w-prose text-balance">{lede}</p>}
    </header>
)

export const LabeledList = ({
    items,
    columns = [1, 2],
    className = '',
}: {
    items: { label: React.ReactNode; description: React.ReactNode }[]
    columns?: [number, number]
    className?: string
}) => {
    const [labelCols, descCols] = columns
    const totalCols = labelCols + descCols
    const gridClass: Record<number, string> = { 3: '@lg:grid-cols-3', 4: '@lg:grid-cols-4', 5: '@lg:grid-cols-5' }
    const colSpanClass: Record<number, string> = {
        1: '@lg:col-span-1',
        2: '@lg:col-span-2',
        3: '@lg:col-span-3',
        4: '@lg:col-span-4',
    }
    return (
        <div
            className={`inline-grid @lg:[&>*:nth-child(n+3)]:border-t @lg:[&>*:nth-child(n+3)]:border-primary ${gridClass[totalCols]} ${className}`}
        >
            {items.map(({ label, description }, i) => (
                <React.Fragment key={typeof label === 'string' ? label : i}>
                    <div className={`pt-2 @lg:pt-4 @lg:pb-4 font-bold ${colSpanClass[labelCols]}`}>{label}</div>
                    <div
                        className={`pb-2 @lg:pt-4 @lg:pb-4 @lg:pl-4 text-secondary text-[15px] border-b border-primary last:border-b-0 @lg:border-b-0 text-balance ${colSpanClass[descCols]}`}
                    >
                        {description}
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}

export const FilterTag = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center text-xs font-medium px-1.5 py-1 rounded-sm leading-none bg-yellow/20 text-[#B56C00] dark:text-yellow dark:bg-yellow/20">
        {children}
    </span>
)

export const InlineCode = ({ children }: { children: React.ReactNode }) => (
    <code className="font-mono text-[0.82em] px-1 py-px rounded bg-yellow/10 border border-yellow/25 text-[#B56C00] dark:text-yellow dark:bg-yellow/20 dark:border-yellow/30 not-italic">
        {children}
    </code>
)
