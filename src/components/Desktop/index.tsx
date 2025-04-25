import React, { useRef } from 'react'
import { IconGraph, IconPieChart, IconDocument, IconQuestion } from '@posthog/icons'
import Link from 'components/Link'
import { useApp } from '../../context/App'
import useProduct from 'hooks/useProduct'

const apps = [
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
]

const AppLink = ({ Icon, type, color, label, url }) => {
    const ref = useRef<HTMLSpanElement>(null)
    return (
        <span ref={ref}>
            <Link
                to={url}
                state={{ newWindow: true }}
                className="flex flex-col justify-center items-center space-y-1 w-28 text-center"
            >
                <Icon className={`size-7 text-${color}`} />
                <p className="text-sm font-medium">{label}</p>
            </Link>
        </span>
    )
}

export default function Desktop() {
    const { taskbarHeight } = useApp()
    const products = useProduct()

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
                    {[
                        ...products.map((product) => ({
                            label: product.name,
                            url: product.slug,
                            type: 'link',
                            Icon: product.Icon,
                            color: product.color,
                        })),
                        ...apps,
                    ].map((app, index) => {
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
