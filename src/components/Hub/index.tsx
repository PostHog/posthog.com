import React, { useEffect, useState } from 'react'
import qs from 'qs'
import Link from 'components/Link'
import ZoomHover from 'components/ZoomHover'
import * as Icons from '@posthog/icons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import slugify from 'slugify'

export const tagOptions = {
    'Being a founder': {
        icon: 'IconPeople',
    },
    Culture: {
        icon: 'IconHandwave',
    },
    Fundraising: {
        icon: 'IconHandMoney',
    },
    Growth: {
        icon: 'IconTrends',
    },
    Marketing: {
        icon: 'IconMegaphone',
    },
    'Ops & finance': {
        icon: 'IconGear',
    },
    People: {
        icon: 'IconPeople',
    },
    Product: {
        icon: 'IconRocket',
    },
    'Product-market fit': {
        icon: 'IconTarget',
    },
    Revenue: {
        icon: 'IconPieChart',
    },
    'Sales & CS': {
        icon: 'IconPhone',
    },
    Founders: {
        icon: 'IconPeople',
    },
    'AB testing': {
        icon: 'IconFlask',
    },
    Engineering: {
        icon: 'IconBrackets',
    },
    Experiments: {
        icon: 'IconFlask',
    },
    'Feature flags': {
        icon: 'IconToggle',
    },
    'Feature management': {
        icon: 'IconGear',
    },
    'Growth engineering': {
        icon: 'IconTrends',
    },
    Guides: {
        icon: 'IconBook',
    },
    'Product analytics': {
        icon: 'IconGraph',
    },
    'Product engineers': {
        icon: 'IconPeople',
    },
    'Product metrics': {
        icon: 'IconPieChart',
    },
    'Session replay': {
        icon: 'IconRewindPlay',
    },
    Surveys: {
        icon: 'IconMessage',
    },
    'User research': {
        icon: 'IconSearch',
    },
    'Y Combinator': {
        icon: 'IconRocket',
    },
}

const HubSkeleteon = () => {
    return Array.from({ length: 14 }).map((_, index) => (
        <div key={index} className="bg-accent w-full h-20 rounded-md animate-pulse" />
    ))
}

export default function Hub({ folder, sidebar, title }: { folder: string; sidebar?: React.ReactNode; title: string }) {
    const [tags, setTags] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const query = qs.stringify(
            {
                pagination: {
                    pageSize: 100,
                },
                sort: ['label:asc'],
                filters: {
                    post_category: {
                        folder: {
                            $eq: folder,
                        },
                    },
                },
            },
            { encodeValuesOnly: true }
        )
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/post-tags?${query}`)
            .then((response) => response.json())
            .then((data) => {
                setTags(data.data)
                setLoading(false)
            })
    }, [])

    return (
        <div data-scheme="secondary" className="p-4 bg-primary text-primary h-full">
            <div className="flex gap-8 h-full">
                <section className="flex-1">
                    <ScrollArea>
                        <h2 className="mb-4">{title}</h2>

                        <div
                            data-scheme="primary"
                            className="grid grid-cols-[repeat(auto-fit,minmax(max(7rem,calc(100%/6)),1fr))] gap-4 relative items-start"
                        >
                            {loading ? (
                                <HubSkeleteon />
                            ) : (
                                tags?.map((tag: any, index: number) => {
                                    const {
                                        attributes: { label },
                                    } = tag
                                    const tagOption = tagOptions[label as keyof typeof tagOptions]
                                    const iconName = tagOption?.icon || 'IconApps'
                                    const Icon = Icons[iconName as keyof typeof Icons] as any
                                    return (
                                        <ZoomHover key={index} className="items-center text-center [&>span]:w-full">
                                            <Link
                                                to={`/${folder}/${slugify(label, { lower: true, strict: true })}`}
                                                className="bg-accent border border-transparent hover:border-primary px-2 py-4 rounded flex flex-col h-full justify-start items-center gap-2 w-full font-medium"
                                            >
                                                <div>
                                                    <Icon className="size-6 text-primary" />
                                                </div>
                                                <div className="text-sm leading-tight">{label}</div>
                                            </Link>
                                        </ZoomHover>
                                    )
                                })
                            )}
                        </div>
                    </ScrollArea>
                </section>

                {sidebar && (
                    <aside className="max-w-xs text-sm">
                        <ScrollArea>{sidebar}</ScrollArea>
                    </aside>
                )}
            </div>
        </div>
    )
}
