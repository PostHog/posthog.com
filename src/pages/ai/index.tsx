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
import CloudinaryImage from 'components/CloudinaryImage'
import OSButton from 'components/OSButton'

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
            <SEO title="AI README.md – PostHog" description="" image={`/images/og/customers.jpg`} />
            <Editor
                title="AI README"
                type="md"
                slug="/ai"
                bookmark={{
                    title: 'AI README',
                    description: 'PostHog AI',
                }}
            >
                <ScrollArea>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/max_aeaeca84a3.png"
                        alt="Max AI"
                        className="float-right ml-4 max-w-48 @xl:max-w-64"
                    />
                    <p>
                        <Link to="/max" state={{ newWindow: true }}>
                            Max
                        </Link>{' '}
                        is our product assistant that helps you build context, assemble insights, find areas for product
                        improvement, and even create pull requests after writing code (alpha).
                    </p>

                    <p>Max is free to use during beta. (After that, we may charge a nominal flat monthly fee.)</p>

                    <h2>Why don’t I just ask ChatGPT instead?</h2>

                    <p>
                        Max has a nuanced understanding of your customers - it has access to errors, replays, event
                        data, and everything in your data warehouse. You can ask ChatGPT questions based on data from
                        one product at a time, but that’s like trying to understand a painting when you can only see the
                        color blue - you may get a rough idea, but it’s hardly the Mona Lisa.
                    </p>

                    <h2>More than chatting with your data...</h2>

                    <p>
                        Max can read and write. He can find, watch sessions, explain and summarize replays for you. He
                        can create insights, write and edit SQL, conduct multi-step deep research, and more. The goal is
                        to generate a rich understanding of your customers’ broad range of data.
                    </p>

                    <h2>Product autonomy</h2>

                    <p>
                        The goal long term is to help every developer to ship a product autonomously. There are many
                        steps to get there, many of which we are still to take, but we believe the technology today
                        exists to make very meaningful progress.
                    </p>

                    <p>
                        Right now, you can meaningfully detect issues and understand user behavior to inform what you
                        ship. As we give Max access to more tools, he’ll get smarter, more accurate, and more
                        intelligent.
                    </p>

                    <p>
                        Very shortly you’ll be able to detect and generate PRs for fixing UX issues and errors, before
                        you even wake up for the day. We’re working on <em>Max Code</em> - the ability to generate ideas
                        for what to work on, and to convert these into pull requests agentically. Stay tuned.
                    </p>
                    <OSButton asLink to="/max" variant="secondary" size="md" state={{ newWindow: true }}>
                        Learn more about Max
                    </OSButton>
                </ScrollArea>
            </Editor>
        </>
    )
}
