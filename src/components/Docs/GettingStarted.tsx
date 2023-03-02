import React from 'react'

type ProductAnalyticsProps = {
    product: string
    title: string
    description: string
    link: string
    children: React.ReactNode
}

export const GettingStarted: React.FC<ProductAnalyticsProps> = ({ product, title, description, link, children }) => {
    return (
        <div className="relative flex items-center">
            <div>
                <div className="flex flex-col md:flex-row items-center opacity-40 space-x-1 mb-2">
                    <img src="/images/product-icons/product-analytics.svg" alt="Product analytics" />
                    <span className="text-xs uppercase font-bold">{product}</span>
                </div>
                <h3 className="mb-2 mt-0">{title}</h3>
                <p className="max-w-md">{description}</p>

                <a href={link}>Get Started &rarr;</a>
            </div>

            <div className="absolute right-0 top-0 w-1/2 h-full">{children}</div>
        </div>
    )
}
