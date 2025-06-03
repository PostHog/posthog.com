import React, { useRef } from 'react'
import {
    IconGraph,
    IconPieChart,
    IconDocument,
    IconQuestion,
    IconMap,
    IconPiggyBank,
    IconStack,
    IconVideoCamera,
} from '@posthog/icons'
import Link from 'components/Link'
import { useApp } from '../../context/App'
import useProduct from 'hooks/useProduct'
import { IconDice, IconDemoThumb, IconMessages, IconDesktopRoadmap, IconImage } from 'components/OSIcons/Icons'
import ZoomHover from 'components/ZoomHover'

interface AppItem {
    label: string
    Icon: React.ComponentType<any> | string
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

const productLinks: AppItem[] = [
    {
        label: 'home.mdx',
        Icon: IconDocument,
        color: 'salmon',
        url: '/',
    },
    {
        label: 'Products',
        Icon: IconStack,
        color: 'blue',
        url: '/products',
    },
    {
        label: 'Pricing',
        Icon: IconPiggyBank,
        color: 'green',
        url: '/pricing',
    },
    {
        label: 'notable customers.mdx',
        Icon: IconDocument,
        color: 'salmon',
        url: '/customers',
    },
    {
        label: 'demo.mov',
        Icon: IconDemoThumb,
        color: 'blue',
        url: '/demo',
        className: '!size-14 -mt-4 -mb-3',
    },
    {
        label: 'Docs',
        Icon: IconDocument,
        color: 'salmon',
        url: '/docs',
    },
]

const apps: AppItem[] = [
    {
        label: 'Why PostHog?',
        Icon: 'https://res.cloudinary.com/dmukukwp6/image/upload/tour_8ae29710fc.png',
        color: 'orange',
        url: '/why',
    },
    {
        label: 'Roadmap',
        Icon: 'https://res.cloudinary.com/dmukukwp6/image/upload/roadmap_3691544cec.png',
        color: 'purple',
        url: '/roadmap',
    },
    {
        label: 'Forums',
        Icon: 'https://res.cloudinary.com/dmukukwp6/image/upload/forums_a48a37683e.png',
        color: 'blue',
        url: '/questions',
    },
    {
        label: 'Games',
        Icon: 'https://res.cloudinary.com/dmukukwp6/image/upload/games_6931a0e3a5.png',
        color: 'green',
        url: '/games',
    },
    {
        label: 'Photo booth',
        Icon: 'https://res.cloudinary.com/dmukukwp6/image/upload/photobooth_db172dc28e.png',
        color: 'orange',
        url: '/photobooth',
    },
]

const AppLink = ({ Icon, type, color, label, url, className }: AppItem) => {
    const ref = useRef<HTMLSpanElement>(null)
    
    return (
        <span ref={ref}>
            <Link
                to={url}
                state={{ newWindow: true }}
                className="group inline-flex flex-col justify-center items-center space-y-1 w-auto max-w-28 text-center select-none"
            >
                {typeof Icon === 'string' ? (
                    <IconImage url={Icon} className={`size-7 text-${color} ${className}`} />
                ) : (
                    <Icon className={`size-7 text-${color} ${className}`} />
                )}
                <p className="text-sm font-medium leading-tight">
                    <span className="bg-[rgba(238,239,233,0.75)] group-hover:bg-[rgba(238,239,233,1)] rounded-[2px] px-0.5">
                        {label}
                    </span>
                </p>
            </Link>
        </span>
    )
}

export default function Desktop() {
    const { taskbarHeight } = useApp()
    const products = useProduct() as Product[]

    return (
        <div data-app="Desktop" className="fixed size-full p-4">
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
                <ul className="py-1 px-0 m-0 list-none flex flex-col flex-wrap h-full content-start gap-x-8 gap-y-4">
                    {productLinks.map((app, index) => (
                        <li key={app.label + index} className="w-[110px] flex justify-center">
                            <ZoomHover>
                                <AppLink {...app} />
                            </ZoomHover>
                        </li>
                    ))}
                    {/* 
                    {products?.map((product, index) => (
                        <li key={product.name + index} className="w-[110px] flex justify-center">
                            <ZoomHover>
                                <AppLink
                                    label={product.name}
                                    url={product.slug}
                                    type="link"
                                    Icon={product.Icon}
                                    color={product.color}
                                />
                            </ZoomHover>
                        </li>
                    ))}
                     */}
                </ul>
                <ul className="p-0 m-0 list-none flex flex-col flex-wrap h-full content-start gap-x-8 gap-y-5">
                    {apps.map((app, index) => (
                        <li key={app.label + index} className="w-[110px] flex justify-center">
                            <ZoomHover>
                                <AppLink {...app} />
                            </ZoomHover>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
