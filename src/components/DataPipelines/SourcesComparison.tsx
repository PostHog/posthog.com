import React from 'react'
import { Logo } from '@posthog/brand/logo'
import { Table } from 'components/UI/Table'

const VENDORS = ['PostHog Sources', 'Fivetran', 'Airbyte Cloud']

const ROWS: { label: string; values: React.ReactNode[] }[] = [
    {
        label: '100M rows/month',
        values: ['$735', '$2,894', '$2,226 (Plus) / $3,010 (Standard)'],
    },
    {
        label: 'Free tier',
        values: ['1M rows/month, every month', '500,000 MAR', '30-day trial, 400 credits'],
    },
    {
        label: 'What you pay for',
        values: ['Rows synced', 'Monthly active rows, per connection', 'Credits (rows for APIs, GB for databases)'],
    },
    {
        label: 'Minimum spend',
        values: ['None', '$5/month per connection', '$20/month (Standard)'],
    },
    {
        label: 'Historical backfills',
        values: [
            "Free for each new source's first seven days (up to 100M rows on the free plan)",
            'Count toward usage',
            'Count toward credits',
        ],
    },
]

export default function SourcesComparison(): JSX.Element {
    return (
        <section className="not-prose">
            <h2 className="m-0 text-2xl font-bold text-primary @2xl/reader-content:text-3xl">
                Same pipes, smaller bill
            </h2>
            <p className="mb-0 mt-3 max-w-prose text-lg text-secondary">
                We put 100M rows a month into each vendor's public pricing calculator. Here's what came out.
            </p>
            <Table.Root
                appearance="plain"
                className="mt-6 min-w-[40rem] table-fixed"
                containerProps={{ className: 'min-w-0' }}
                aria-label="Pricing at 100 million rows a month"
            >
                <colgroup>
                    <col className="w-1/4" />
                    <col />
                    <col />
                    <col />
                </colgroup>
                <Table.Header>
                    <Table.Row>
                        <Table.Head>
                            <span className="sr-only">Comparison</span>
                        </Table.Head>
                        <Table.Head className="!text-sm !text-primary">
                            <span className="inline-flex items-center gap-2">
                                <Logo layout="logomark" variant="gradient" className="h-4 w-auto shrink-0" />
                                PostHog Sources
                            </span>
                        </Table.Head>
                        <Table.Head>Fivetran</Table.Head>
                        <Table.Head>Airbyte Cloud</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {ROWS.map((row) => (
                        <Table.Row key={row.label}>
                            <Table.Head scope="row" className="!whitespace-nowrap !font-normal !text-secondary">
                                {row.label}
                            </Table.Head>
                            {row.values.map((value, index) => (
                                <Table.Cell
                                    key={VENDORS[index]}
                                    className={
                                        index === 0
                                            ? row.label === '100M rows/month'
                                                ? '!text-xl !font-semibold'
                                                : '!font-semibold'
                                            : '!text-secondary !font-semibold'
                                    }
                                >
                                    {value}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </section>
    )
}
