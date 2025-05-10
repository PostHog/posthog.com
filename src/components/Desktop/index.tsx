import React, { useRef } from 'react'
import { IconGraph, IconPieChart, IconDocument, IconQuestion, IconMap } from '@posthog/icons'
import Link from 'components/Link'
import { useApp } from '../../context/App'
import useProduct from 'hooks/useProduct'
import { IconDice, IconDemoThumb } from 'components/OSIcons/Icons'

interface AppItem {
    label: string
    Icon: React.ComponentType<any>
    color: string
    url: string
    type?: string
    className?: string
}

interface Product {
    name: string
    slug: string
    Icon: React.ComponentType<any>
    color: string
}

const apps: AppItem[] = [
    {
        label: 'notable customers.mdx',
        Icon: IconDocument,
        color: 'salmon',
        url: '/customers',
    },
    {
        label: 'Questions?',
        Icon: IconQuestion,
        color: 'blue',
        url: '/questions',
    },
    {
        label: 'Why PostHog?',
        Icon: IconQuestion,
        color: 'orange',
        url: '/why',
    },
    {
        label: 'Roadmap',
        Icon: IconMap,
        color: 'green',
        url: '/roadmap',
    },
    {
        label: 'demo.mov',
        Icon: IconDemoThumb,
        color: 'blue',
        url: '/demo',
        className: '!size-14 -my-3.5',
    },
    {
        label: 'Games',
        Icon: IconDice,
        color: 'green',
        url: '/games',
    },
]

const AppLink = ({ Icon, type, color, label, url, className }: AppItem) => {
    const ref = useRef<HTMLSpanElement>(null)
    return (
        <span ref={ref}>
            <Link
                to={url}
                state={{ newWindow: true }}
                className="flex flex-col justify-center items-center space-y-1 w-28 text-center"
            >
                <Icon className={`size-7 text-${color} ${className}`} />
                <p className="text-sm font-medium">{label}</p>
            </Link>
        </span>
    )
}

export default function Desktop() {
    const { taskbarHeight } = useApp()
    const products = useProduct() as Product[]

    return (
        <div className="fixed size-full p-5">
            <div
                className="absolute bottom-0 right-0 size-full bg-contain bg-no-repeat bg-right-bottom -z-10"
                style={{
                    backgroundImage:
                        "url('https://res.cloudinary.com/dmukukwp6/image/upload/Frame_10127_b7362fd913.png')",
                }}
            />
            <nav
                style={{
                    // paddingTop: `${taskbarHeight}px`,
                    height: `calc(100vh - ${taskbarHeight}px - 48px)`,
                }}
                className="overflow-hidden flex justify-between"
            >
                <ul className="p-0 m-0 list-none flex flex-col flex-wrap h-full content-start gap-x-8 gap-y-4">
                    {products?.map((product, index) => (
                        <li key={product.name + index} className="w-[110px]">
                            <AppLink
                                label={product.name}
                                url={product.slug}
                                type="link"
                                Icon={product.Icon}
                                color={product.color}
                            />
                        </li>
                    ))}
                </ul>
                <ul className="p-0 m-0 list-none flex flex-col flex-wrap h-full content-start gap-x-8 gap-y-4">
                    {apps.map((app, index) => (
                        <li key={app.label + index} className="w-[110px]">
                            <AppLink {...app} />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
