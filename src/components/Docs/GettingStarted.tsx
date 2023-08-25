import React from 'react'
import { Analytics } from 'components/ProductIcons'
import { CallToAction } from 'components/CallToAction'

type ProductAnalyticsProps = {
    articleType: string
    title: string
    description: string
    link: string
    children: React.ReactNode
}

export const GettingStarted: React.FC<ProductAnalyticsProps> = ({
    articleType,
    title,
    description,
    link,
    children,
}) => {
    return (
        <div className="clear-both relative flex items-center py-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full items-center">
                <div className="flex-1 w-full">
                    <div className="flex flex-row items-center opacity-60 space-x-1 mb-2">
                        <span className="text-xs uppercase font-semibold">{articleType}</span>
                    </div>
                    <h3 className="mb-2 mt-0">{title}</h3>
                    <p className="max-w-md mb-0">{description}</p>
                </div>

                <aside className="w-full sm:w-auto sm:flex-shrink">
                    <CallToAction to={link}>Get started &rarr;</CallToAction>
                </aside>
            </div>

            <div className="hidden md:block absolute right-0 top-0 max-w-1/2 h-full">{children}</div>
        </div>
    )
}
