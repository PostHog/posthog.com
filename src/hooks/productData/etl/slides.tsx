import React from 'react'
import { IconDatabase, IconGraph, IconPlug, IconServer } from '@posthog/icons'
import Link from 'components/Link'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { features as f } from './features'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'

const style = {
    color: 'bg-light dark:bg-dark',
    activeText: 'text-primary',
    progressBar: 'bg-purple',
}

/** Applications = the ways a person shows up to ETL. */
export const applications: CarouselSlide[] = [
    {
        slug: 'sync-a-source',
        label: 'Sync a source',
        icon: <IconPlug className="size-5" />,
        ...style,
        layout: 'stack',
        heading: 'Connect a tool and pick its tables',
        description: (
            <>
                <p>
                    Choose a source, hand PostHog credentials, and select the tables worth syncing. PostHog reads the
                    schema, sets a schedule, and keeps going when a column changes underneath it.
                </p>
                <p>
                    Every connector has its own page covering the credentials it needs and the tables it offers. Start
                    with <Link to="/docs/data-warehouse/sources">the source list</Link>.
                </p>
                <div className="@container">
                    <LabeledList
                        className="mb-8"
                        items={f.sources.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'send-it-onward',
        label: 'Send it onward',
        icon: <IconServer className="size-5" />,
        ...style,
        layout: 'stack',
        heading: 'Write the same rows to your own warehouse',
        description: (
            <>
                <p>
                    A source can write to PostHog, to your own warehouse, or to both. Pick the destinations on the
                    source and every table follows, or override a single table that belongs somewhere else.
                </p>
                <p>
                    Adding a destination to a source that has already synced starts a full resync of its tables, and
                    each destination is billed for the rows it receives. The{' '}
                    <Link to="/docs/etl/destinations">destination docs</Link> cover what that costs before you turn it
                    on.
                </p>
                <div className="@container">
                    <LabeledList
                        className="mb-8"
                        items={f.destinations.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'watch-it-run',
        label: 'Watch it run',
        icon: <IconGraph className="size-5" />,
        ...style,
        layout: 'stack',
        heading: 'Find out a sync broke before a dashboard does',
        description: (
            <>
                <p>
                    The ETL page opens on what stopped. Under that sit the rows each destination received over time, the
                    number of tables syncing, and the runs in flight. The counts refresh every 30 seconds while you have
                    the page open.
                </p>
                <div className="@container">
                    <LabeledList
                        className="mb-8"
                        items={f.health.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'query-it',
        label: 'Query it',
        icon: <IconDatabase className="size-5" />,
        ...style,
        layout: 'stack',
        heading: 'Join business data to your product events',
        description: (
            <>
                <p>
                    Synced tables sit in the same query engine as the events your product sends, so revenue against
                    activation is one query rather than an export and a spreadsheet.
                </p>
                <div className="@container">
                    <LabeledList
                        className="mb-8"
                        items={f.query.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
    },
]

export const topFeatures: CarouselSlide[] = [
    {
        slug: 'sources',
        label: 'Sources',
        icon: <IconPlug className="size-5" />,
        ...style,
        layout: 'stack',
        heading: f.sources.headline,
        description: <p>{f.sources.description}</p>,
    },
    {
        slug: 'destinations',
        label: 'Destinations',
        icon: <IconServer className="size-5" />,
        ...style,
        layout: 'stack',
        heading: f.destinations.headline,
        description: <p>{f.destinations.description}</p>,
    },
    {
        slug: 'health',
        label: 'Health',
        icon: <IconGraph className="size-5" />,
        ...style,
        layout: 'stack',
        heading: f.health.headline,
        description: <p>{f.health.description}</p>,
    },
    {
        slug: 'query',
        label: 'Query',
        icon: <IconDatabase className="size-5" />,
        ...style,
        layout: 'stack',
        heading: f.query.headline,
        description: <p>{f.query.description}</p>,
    },
]
