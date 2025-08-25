import React, { useEffect, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import Editor from 'components/Editor'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import OSTable from 'components/OSTable'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { useCustomers, Customer as CustomerType } from 'hooks/useCustomers'
import { IconArrowUpRight } from '@posthog/icons'
import useProduct from 'hooks/useProduct'

interface Skill {
    name: string
    percent: number
}

interface ProductData {
    name: string
    description?: string
    skills?: Skill[]
    handle: string
}

function isProductData(obj: unknown): obj is ProductData {
    return typeof obj === 'object' && obj !== null && 'name' in obj
}

const columnData = [
    { name: '#', width: 'minmax(50px, 0.5fr)', align: 'left' as const },
    { name: 'Agent', width: 'minmax(170px, 1fr)', align: 'left' as const },
    { name: 'Description', width: 'minmax(200px, 1.5fr)', align: 'left' as const },
    { name: 'Skills', width: 'minmax(200px, 2fr)', align: 'left' as const },
]

export default function AI(): JSX.Element {
    const allProducts = useProduct()

    const aiAgents = [
        { name: 'Max', handle: 'max_ai', slug: 'max' },
        { name: 'Raquel', handle: 'raquel_ai', slug: 'raquel' },
        { name: 'Annika', handle: 'annika', slug: 'annika' },
        { name: 'Marius', handle: 'marius', slug: 'marius' },
    ]

    const rowData = aiAgents.map((agent, index) => {
        const product = Array.isArray(allProducts)
            ? allProducts.find((p: unknown) => isProductData(p) && p.handle === agent.handle)
            : null

        const skills = (product && isProductData(product) ? product.skills : []) || []
        const skillsList = skills.map((skill: Skill) => `• ${skill.name}`).join('\n')

        return {
            cells: [
                {
                    content: index + 1,
                },
                {
                    content: (
                        <Link to={`/${agent.slug}`} state={{ newWindow: true }}>
                            {agent.name}
                        </Link>
                    ),
                },
                {
                    content: (product && isProductData(product) ? product.description : undefined) || 'AI Assistant',
                },
                {
                    content: skillsList || '• General AI assistance\n• Product knowledge\n• Task completion',
                    className: 'whitespace-pre-line',
                },
            ],
        }
    })

    return (
        <>
            <SEO title="AI agents.md – PostHog" description="" image={`/images/og/customers.jpg`} />
            <Editor
                title="AI agents"
                type="md"
                slug="/ai"
                bookmark={{
                    title: 'AI agents.md',
                    description: 'AI agents',
                }}
            >
                <ScrollArea>
                    <p>
                        Our family of agents work together to help you build context, assemble insights, find areas for
                        product improvement, and even create pull requests after writing code (alpha).
                    </p>

                    <OSTable columns={columnData} rows={rowData} editable={false} />
                </ScrollArea>
            </Editor>
        </>
    )
}
