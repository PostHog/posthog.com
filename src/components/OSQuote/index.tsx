import React from 'react'
import { useCustomers } from '../../hooks/useCustomers'
import CloudinaryImage from '../CloudinaryImage'

interface OSQuoteProps {
    customer: string
    author: string
    product: string
}

export const OSQuote: React.FC<OSQuoteProps> = ({ customer, author, product }) => {
    const { getCustomer } = useCustomers()
    const customerData = getCustomer(customer)

    if (!customerData || !customerData.quotes || !customerData.quotes[author]) {
        return null
    }

    const authorData = customerData.quotes[author]
    const quote = authorData.products[product]

    if (!quote) {
        return null
    }

    return (
        <div className="max-w-xl bg-light dark:bg-dark border border-primary rounded p-4 mb-4">
            <div className="flex items-center space-x-3">
                <div className="rounded-full border border-primary bg-light dark:bg-dark">
                    <div className="bg-accent rounded-full overflow-hidden block aspect-square m-px size-12">
                        <CloudinaryImage
                            src={authorData.image.thumb as `https://res.cloudinary.com/${string}`}
                            alt={authorData.name}
                            className="size-12"
                        />
                    </div>
                </div>
                <div>
                    <div className="text-lg font-semibold leading-tight">{authorData.name}</div>
                    <div className="text-secondary text-sm">
                        {authorData.role}, {customerData.name}
                    </div>
                </div>
            </div>
            <div className="pt-2 [&_*]:!leading-normal">
                <blockquote className="text-primary border-l-0 pl-0 not-italic m-0">{quote}</blockquote>
            </div>
        </div>
    )
}
