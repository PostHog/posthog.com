import React, { useRef } from 'react'
import { IconRewindPlay } from '@posthog/icons'
import Link from 'components/Link'
import { useApp } from '../../context/App'
import useProduct from 'hooks/useProduct'
import { IconDice, IconDemoThumb, IconMessages, IconImage, AppIcon } from 'components/OSIcons'
import ZoomHover from 'components/ZoomHover'
import Screenshot from 'components/Screenshot'
import { AppLink, AppItem } from 'components/OSIcons/AppIcon'

interface Product {
    name: string
    slug: string
    Icon: React.ComponentType<any>
    color?: string
}

const productLinks: AppItem[] = [
    {
        label: 'home.mdx',
        Icon: <AppIcon name="doc" />,
        url: '/',
    },
    {
        label: 'Products',
        Icon: <AppIcon name="folder" />,
        url: '/products',
    },
    {
        label: 'Pricing',
        Icon: <AppIcon name="pricing" />,
        url: '/pricing',
    },
    {
        label: 'notable customers.mdx',
        Icon: <AppIcon name="spreadsheet" />,
        url: '/customers',
    },
    {
        label: 'demo.mov',
        Icon: IconDemoThumb,
        url: '/demo',
        className: 'size-14 -my-1',
    },
    {
        label: 'Docs',
        Icon: <AppIcon name="notebook" />,
        url: '/docs',
    },
]

const apps: AppItem[] = [
    {
        label: 'Why PostHog?',
        Icon: <AppIcon name="tour" />,
        url: '/why',
    },
    {
        label: 'Company',
        Icon: <AppIcon name="posthog" />,
        url: '/about',
    },
    {
        label: 'Roadmap',
        Icon: <AppIcon name="map" />,
        url: '/roadmap',
    },
    {
        label: 'Forums',
        Icon: <AppIcon name="forums" />,
        url: '/questions',
    },
    {
        label: 'Games',
        Icon: <AppIcon name="games" />,
        url: '/games',
    },
    {
        label: 'Photo booth',
        Icon: <AppIcon name="photobooth" />,
        url: '/photobooth',
    },
    {
        label: 'Talk to a human',
        Icon: <AppIcon name="contact" />,
        url: '/talk-to-a-human',
    },
]

export default function Desktop() {
    const { taskbarHeight } = useApp()
    const products = useProduct() as Product[]

    return (
        <div data-scheme="primary" data-app="Desktop" className="fixed size-full p-4">
            <div
                className="absolute bottom-0 right-0 size-full bg-contain bg-no-repeat bg-right-bottom -z-10"
                style={{
                    backgroundImage:
                        "url('https://res.cloudinary.com/dmukukwp6/image/upload/Frame_10127_b7362fd913.png')",
                }}
            />

            <div className="hidden">
                <Screenshot
                    product="Session replay"
                    slug="session-replay"
                    icon={<IconRewindPlay />}
                    order={1}
                    className={``}
                />
            </div>

            <nav
                style={{
                    // paddingTop: `${taskbarHeight}px`,
                    height: `calc(100vh - ${taskbarHeight}px - 48px)`,
                }}
                className="overflow-hidden flex justify-between"
            >
                <ul className="py-1 px-0 m-0 list-none flex flex-col flex-wrap h-full content-start gap-x-8 gap-y-5">
                    {productLinks.map((app, index) => (
                        <li key={app.label + index} className="w-28 flex justify-center">
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
                        <li key={app.label + index} className="w-28 flex justify-center">
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
