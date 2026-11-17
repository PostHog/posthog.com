import React from 'react'

const roles = [
    {
        className: 'text-2xl font-bold',
        metrics: '24/32',
        use: 'Section headings in UI outside the reader, such as a dashboard header.',
        sample: 'Create your first insight',
    },
    {
        className: 'text-xl font-bold',
        metrics: '20/28',
        use: 'A heading over a group of cards or a settings section.',
        sample: 'Filter by property',
    },
    {
        className: 'text-lg',
        metrics: '18/28',
        use: 'Lead text: one or two sentences under a heading. EmptyState titles add font-semibold.',
        sample: 'PostHog is the single platform to analyze, test, and ship.',
    },
    {
        className: 'text-base font-bold',
        metrics: '16/24',
        use: 'Dialog titles. Accordion triggers and panels use text-base at the normal weight.',
        sample: 'Delete this insight?',
    },
    {
        className: 'text-15 font-semibold',
        metrics: '15/22.5',
        use: 'Card and toast titles. Popover and fieldset titles use it with font-bold.',
        sample: 'Weekly product report',
    },
    {
        className: 'text-15',
        metrics: '15/22.5',
        use: 'Body text in a card or a panel, tabs, and lg controls. It matches the body text of the reader.',
        sample: 'Capture events, then build funnels and trends from them.',
    },
    {
        className: 'text-sm',
        metrics: '14/20',
        use: 'The default for form controls and lists: inputs, select and combobox options, table cells, and dialog descriptions. Labels add font-semibold.',
        sample: 'Applies to all environments in this project.',
    },
    {
        className: 'text-13 text-secondary',
        metrics: '13/18',
        use: 'Supporting text: field descriptions and errors, tooltips, card meta, status bars, and table column headings. Menu items and md buttons use text-13 in text-primary.',
        sample: 'Updated 3 minutes ago',
    },
    {
        className: 'text-xs',
        metrics: '12/16',
        use: 'md badges and sm buttons only.',
        sample: 'Beta',
    },
    {
        className: 'text-11 font-semibold uppercase',
        metrics: '11/14',
        use: 'Tiny labels: sm badges, sm field chips, menu group labels, and sm Kbd. Menu group labels add tracking-wide and text-muted.',
        sample: 'Recent',
    },
    {
        className: 'font-code text-13',
        metrics: '13/18',
        use: 'Code, IDs, and property values in UI, such as card meta. For code inside a sentence, use Snippet.Inline, which sizes itself to the text around it.',
        sample: "posthog.capture('signed_up')",
    },
]

export default function Scale(): JSX.Element {
    return (
        <div className="flex flex-col divide-y divide-[rgb(var(--text-primary)/0.1)]">
            {roles.map((role) => (
                <div
                    key={role.className}
                    className="grid gap-2 py-3 first:pt-0 last:pb-0 @lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @lg:items-baseline @lg:gap-6"
                >
                    <div className="flex min-w-0 flex-col gap-1">
                        <span className="flex items-baseline gap-2 text-13">
                            <span className="font-code text-primary">{role.className}</span>
                            <span className="text-secondary">{role.metrics}</span>
                        </span>
                        <span className="text-13 text-secondary">{role.use}</span>
                    </div>
                    <span className={`${role.className} min-w-0 text-primary`}>{role.sample}</span>
                </div>
            ))}
        </div>
    )
}
