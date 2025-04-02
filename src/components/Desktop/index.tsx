import React from 'react'
import { IconGraph, IconPieChart } from '@posthog/icons'
import Link from 'components/Link'

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

export default function Desktop() {
    return (
        <div className="fixed size-full p-5">
            <nav>
                <ul className="p-0 m-0 list-none flex flex-col space-y-4 items-start">
                    {apps.map(({ Icon, type, color, label, url }, index) => {
                        return (
                            <li key={label + index}>
                                <Link
                                    to={url}
                                    state={{ newWindow: true }}
                                    className="flex flex-col justify-center items-center space-y-1 w-[90px] text-center"
                                >
                                    <Icon className={`size-7 text-${color}`} />
                                    <p className="text-sm">{label}</p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}
