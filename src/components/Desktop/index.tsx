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
import { IconDice, IconDemoThumb, IconMessages, IconImage, AppIcon } from 'components/OSIcons/Icons'
import ZoomHover from 'components/ZoomHover'

interface AppItem {
    label: string
    Icon: React.ComponentType<any> | string | React.ReactElement
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
        Icon: <AppIcon name="doc" />,
        color: 'salmon',
        url: '/',
    },
    {
        label: 'Products',
        Icon: <AppIcon name="product" />,
        color: 'blue',
        url: '/products',
    },
    {
        label: 'Pricing',
        Icon: <AppIcon name="pricing" />,
        color: 'green',
        url: '/pricing',
    },
    {
        label: 'notable customers.mdx',
        Icon: <AppIcon name="doc" />,
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
        Icon: <AppIcon name="doc" />,
        color: 'salmon',
        url: '/docs',
    },
]

const apps: AppItem[] = [
    {
        label: 'Why PostHog?',
        Icon: <AppIcon name="tour" />,
        color: 'orange',
        url: '/why',
    },
    {
        label: 'Roadmap',
        Icon: <AppIcon name="roadmap" />,
        color: 'purple',
        url: '/roadmap',
    },
    {
        label: 'Forums',
        Icon: <AppIcon name="forums" />,
        color: 'blue',
        url: '/questions',
    },
    {
        label: 'Games',
        Icon: <AppIcon name="games" />,
        color: 'green',
        url: '/games',
    },
    {
        label: 'Photo booth',
        Icon: <AppIcon name="photobooth" />,
        color: 'orange',
        url: '/photobooth',
    },
]

const AppLink = ({ Icon, type, color, label, url, className }: AppItem) => {
    const ref = useRef<HTMLSpanElement>(null)
    
    const renderIcon = () => {
        if (typeof Icon === 'string') {
            return <IconImage url={Icon} className={`size-7 text-${color} ${className}`} />
        }
        
        if (React.isValidElement(Icon)) {
            return React.cloneElement(Icon as React.ReactElement<any>, { 
                className: `size-7 text-${color} ${className}` 
            })
        }
        
        // Icon is a ComponentType
        const IconComponent = Icon as React.ComponentType<any>
        return <IconComponent className={`size-7 text-${color} ${className}`} />
    }
    
    return (
        <span ref={ref}>
            <Link
                to={url}
                state={{ newWindow: true }}
                className="group inline-flex flex-col justify-center items-center space-y-1 w-auto max-w-28 text-center select-none"
            >
                {renderIcon()}
                <p className="text-sm font-medium leading-tight">
                    <span className="bg-[rgba(238,239,233,0.75)] group-hover:bg-[rgba(238,239,233,1)] dark:bg-[rgba(1,1,1,0.75)] dark:group-hover:bg-[rgba(1,1,1,1)] rounded-[2px] px-0.5">
                        <span className="skin-classic:underline decoration-dotted decoration-primary underline-offset-[3px]">{label}</span>
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
                <ul className="py-1 px-0 m-0 list-none flex flex-col flex-wrap h-full content-start gap-x-8 gap-y-5">
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
                <ul className="py-1 px-0 m-0 list-none flex flex-col flex-wrap h-full content-start gap-x-8 gap-y-5">
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
