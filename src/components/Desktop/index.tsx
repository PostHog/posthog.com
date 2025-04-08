import React, { useRef } from 'react'
import { IconGraph, IconPieChart } from '@posthog/icons'
import Link from 'components/Link'
import { useApp } from '../../context/App'

const apps = [
    {
        Icon: IconPieChart,
        type: 'link',
        label: 'Web analytics',
        color: '[#36C46F]',
        url: '/web-analytics',
    },
    {
        label: 'Product analytics',
        Icon: IconGraph,
        color: 'blue',
        url: '/product-analytics',
    },
]

const AppLink = ({ Icon, type, color, label, url }) => {
    const ref = useRef<HTMLSpanElement>(null)
    return (
        <span ref={ref}>
            <Link
                to={url}
                state={{ newWindow: true }}
                className="flex flex-col justify-center items-center space-y-1 w-[90px] text-center"
            >
                <Icon className={`size-7 text-${color}`} />
                <p className="text-sm font-semibold">{label}</p>
            </Link>
        </span>
    )
}

export default function Desktop() {
    const { taskbarHeight } = useApp()

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
                    paddingTop: `${taskbarHeight}px`,
                    height: `calc(100vh - ${taskbarHeight}px - 48px)`,
                }}
                className="overflow-hidden"
            >
                <ul className="p-0 m-0 list-none flex flex-col flex-wrap h-full content-start gap-x-8 gap-y-4">
                    {apps.map((app, index) => {
                        return (
                            <li key={app.label + index} className="w-[90px]">
                                <AppLink {...app} />
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}
