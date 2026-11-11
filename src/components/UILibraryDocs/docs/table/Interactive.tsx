import React from 'react'
import Link from 'components/Link'
import { Table } from 'components/UI/Table'

const products = [
    { name: 'Product analytics', job: 'Funnels, trends, and retention', docs: '/docs/product-analytics' },
    { name: 'Session replay', job: 'Watch real user sessions', docs: '/docs/session-replay' },
    { name: 'Feature flags', job: 'Roll out changes safely', docs: '/docs/feature-flags' },
    { name: 'Surveys', job: 'Ask users questions in your app', docs: '/docs/surveys' },
]

export default function Interactive(): JSX.Element {
    return (
        <Table.Root interactive striped>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Product</Table.Head>
                    <Table.Head>Use it for</Table.Head>
                    <Table.Head align="end">
                        <span className="sr-only">Docs</span>
                    </Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {products.map(({ name, job, docs }) => (
                    <Table.Row key={name}>
                        <Table.Head scope="row">{name}</Table.Head>
                        <Table.Cell className="text-secondary">{job}</Table.Cell>
                        <Table.Cell align="end" className="whitespace-nowrap">
                            <Link to={docs} className="font-medium text-red dark:text-yellow">
                                Read docs
                            </Link>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}
