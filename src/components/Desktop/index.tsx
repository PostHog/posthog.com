import React, { useRef } from 'react'
import { IconRewindPlay } from '@posthog/icons'
import Link from 'components/Link'
import { useApp } from '../../context/App'
import useProduct from 'hooks/useProduct'
import { IconDice, IconDemoThumb, IconMessages, IconImage, AppIcon } from 'components/OSIcons'
import ZoomHover from 'components/ZoomHover'
import Screenshot from 'components/Screenshot'
import { AppLink, AppItem } from 'components/OSIcons/AppIcon'
import ContextMenu from 'components/RadixUI/ContextMenu'
import CloudinaryImage from 'components/CloudinaryImage'

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
        <ContextMenu
            menuItems={[
                {
                    type: 'item',
                    children: (
                        <Link to="/site-settings" state={{ newWindow: true }}>
                            Display options
                        </Link>
                    ),
                },
                {
                    type: 'item',
                    children: (
                        <Link to="/about" state={{ newWindow: true }}>
                            About PostHog
                        </Link>
                    ),
                },
            ]}
        >
            <div data-scheme="primary" data-app="Desktop" className="fixed size-full p-4">
                <div
                    className={`absolute bottom-0 right-0 size-full -z-10 
                        wallpaper-hogzilla:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/hogzilla_bf40c5e271.png')] wallpaper-hogzilla:bg-contain 
                        wallpaper-hogzilla:bg-no-repeat
                        wallpaper-hogzilla:bg-right-bottom

                        wallpaper-office-party:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/carpet_light_27d74f73b5.png')]
                        dark:wallpaper-office-party:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/carpet_dark_f1c9f5ce39.png')]

                        wallpaper-office-party:bg-repeat 
                        wallpaper-office-party:bg-[length:200px_198px]
                        wallpaper-keyboard-garden:bg-[#E1D7C2]
                        dark:wallpaper-keyboard-garden:bg-[#37422D]

                        wallpaper-2001-bliss:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/bliss_8bit_1x_27e9e47112.jpg')]
                        wallpaper-2001-bliss:bg-cover
                        wallpaper-2001-bliss:bg-no-repeat
                        wallpaper-2001-bliss:bg-center

                        wallpaper-coding-at-night:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/coding_at_night_5d7d21791e.png')]
                        wallpaper-coding-at-night:bg-[#54618E]
                        wallpaper-coding-at-night:bg-contain
                        wallpaper-coding-at-night:bg-no-repeat
                        wallpaper-coding-at-night:bg-bottom

                        wallpaper-parade:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/parade_light_ffe041646a.png')] 
                        dark:wallpaper-parade:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/parade_dark_238d90c5ef.png')] 
                        wallpaper-parade:bg-contain 
                        wallpaper-parade:bg-no-repeat
                        wallpaper-parade:bg-left-bottom

                        wallpaper-startup-monopoly:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/startup_monopoly_2ac9d45ce3.png')] 
                        wallpaper-startup-monopoly:bg-[length:1087px_540px]
                        wallpaper-startup-monopoly:bg-no-repeat
                        wallpaper-startup-monopoly:bg-right-top
                        wallpaper-startup-monopoly:bg-[#FEFCED]
                        dark:wallpaper-startup-monopoly:bg-[#393836]
                        
                    `}

                />
                <div className="hidden wallpaper-office-party:block absolute bottom-24 left-24">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/office_cc4ae8675f.png"
                        alt="Office party"
                        width={997}
                        height={858}
                        className="w-[498.5px] h-[429px]"
                    />
                </div>
                <div className="hidden wallpaper-keyboard-garden:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/keyboard_garden_7b4f9e93b6.png"
                        alt="Office party"
                        width={1242}
                        height={1128}
                        className="w-[621px] h-[564px]"
                    />
                </div>
                <div className="hidden wallpaper-2001-bliss:block absolute inset-0 bg-white/60 dark:bg-black/60">
                </div>

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
        </ContextMenu>
    )
}
