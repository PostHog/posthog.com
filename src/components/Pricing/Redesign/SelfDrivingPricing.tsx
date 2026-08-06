import React from 'react'
import Link from 'components/Link'
import OSTable from 'components/OSTable'

/**
 * How self-driving is billed — the one thing on this page that isn't usage-based.
 *
 * Deliberately the plainest section here. Everything above sells a story (start free, add a
 * card when you outgrow it); this is an exception to that story, and exceptions should read
 * as fine print rather than as a second pitch. So: one sentence for the rule, then a table.
 *
 * **The four surfaces are a table, not cards.** An earlier version of this content used four
 * cards, which put a feature grid a few hundred pixels below `MoreOptions`' three cards and
 * read as the same component twice. The table also earns its keep: the "who bills the
 * tokens" column *is* the footnote that used to sit under those cards, so the one thing
 * that actually differs between the four surfaces is now the thing you scan for.
 */

const surfaces = [
    {
        name: 'PostHog Web',
        // No page of its own — the browser app is just app.posthog.com, and a signup link
        // inside a billing table would be the wrong CTA in the wrong place.
        url: undefined,
        what: 'In the browser, next to your data.',
        tokens: 'PostHog',
    },
    {
        name: 'PostHog Desktop',
        url: '/desktop',
        what: 'Local app, with repo access.',
        tokens: 'PostHog',
    },
    {
        name: 'PostHog CLI',
        url: '/docs/cli',
        what: 'Scriptable, fine to run in CI.',
        tokens: 'PostHog',
    },
    {
        name: 'PostHog MCP',
        url: '/mcp',
        what: 'Your own agent, your own key.',
        tokens: 'Your model provider – we charge nothing',
    },
]

export default function SelfDrivingPricing(): JSX.Element {
    const columns = [
        { name: 'Where you run it', align: 'left' as const, width: 'minmax(140px, 1fr)' },
        { name: 'What it is', align: 'left' as const, width: 'minmax(180px, 1.5fr)' },
        { name: 'Who bills the tokens', align: 'left' as const, width: 'minmax(160px, 1.5fr)' },
    ]

    const rows = surfaces.map(({ name, url, what, tokens }) => ({
        cells: [
            {
                // Underlined but not recoloured: three of the four rows are links, and three
                // red words down the first column would fight the table. The underline is also
                // what distinguishes them from Web, which has no page to link to.
                content: url ? (
                    <Link to={url} state={{ newWindow: true }} className="font-semibold underline">
                        {name}
                    </Link>
                ) : (
                    <span className="font-semibold">{name}</span>
                ),
            },
            { content: <span className="text-secondary">{what}</span> },
            { content: tokens },
        ],
    }))

    return (
        <div className="@container not-prose">
            <p className="text-[15px] mb-4">
                <Link
                    to="/self-driving"
                    state={{ newWindow: true }}
                    className="font-semibold text-red dark:text-yellow underline"
                >
                    Self-driving
                </Link>{' '}
                reads the data, opens the PR, and runs the experiment. It doesn't touch your usage bill – you're billed{' '}
                <strong>what the models cost us, plus about 27%</strong>, not per pull request and not per seat.
            </p>

            <OSTable columns={columns} rows={rows} size="md" className="text-sm" width="full" />
        </div>
    )
}
