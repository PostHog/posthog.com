import React from 'react'
import Link from 'components/Link'
import { useCustomers } from 'hooks/useCustomers'
import useProduct from 'hooks/useProduct'
import { IconArrowUpRight } from '@posthog/icons'

interface CustomerMetadataProps {
    customerKey: string
}

export default function CustomerMetadata({ customerKey }: CustomerMetadataProps) {
    const { getCustomer } = useCustomers()
    const customerData = getCustomer(customerKey)

    // Get all products (core + extended) using useProduct without a handle
    const allProducts = useProduct() as any[]

    if (!customerData) {
        return null
    }

    // Determine logo rendering logic - same as customers index page
    const renderLogo = () => {
        if (!customerData.logo) {
            return <span className="text-lg font-semibold">{customerData.name}</span>
        }

        // Check if logo is a React component (single SVG format)
        if (typeof customerData.logo === 'function') {
            const LogoComponent = customerData.logo
            const heightClass = customerData.height ? `h-${customerData.height}` : ''
            const className = `w-full fill-current object-contain ${heightClass}`.trim()

            return <LogoComponent className={className} />
        }

        // Otherwise, it's the existing light/dark object format
        const heightClass = customerData.height ? `max-h-${customerData.height}` : 'max-h-10'

        return (
            <>
                <img
                    src={customerData.logo.light}
                    alt={customerData.name}
                    className={`w-auto object-contain dark:hidden ${heightClass}`}
                />
                <img
                    src={customerData.logo.dark}
                    alt={customerData.name}
                    className={`w-auto object-contain hidden dark:block ${heightClass}`}
                />
            </>
        )
    }

    return (
        <div
            data-scheme="secondary"
            className="@md:float-right @md:w-60 @md:ml-4 mb-4 p-4 bg-primary rounded border border-primary mt-4 @md:mt-2 space-y-4 @xl:-mr-4"
        >
            <div className="flex flex-col justify-center">
                {customerData.logo && renderLogo()}

                {customerData.notes && (
                    <p className="text-sm text-balance mt-4 mb-0 text-center">{customerData.notes}</p>
                )}
            </div>
            {customerData.toolsUsedHandles && customerData.toolsUsedHandles.length > 0 && (
                <div>
                    <strong className="text-sm text-secondary">Products used:</strong>
                    <ul className="not-prose space-y-1 mt-1">
                        {customerData.toolsUsedHandles.map((toolHandle) => {
                            // Check if allProducts is an array
                            if (!Array.isArray(allProducts)) {
                                return null
                            }

                            // Find the product by its handle
                            const product = allProducts.find((p) => p?.handle === toolHandle)

                            // Check if we have a valid product with required fields
                            if (product && product.slug && product.name) {
                                return (
                                    <li key={toolHandle} className="text-sm">
                                        <Link
                                            to={`/${product.slug}`}
                                            state={{ newWindow: true }}
                                            className="group text-primary hover:underline flex gap-1 items-center"
                                        >
                                            {product.Icon && (
                                                <product.Icon className={`size-5 inline-block text-${product.color}`} />
                                            )}
                                            <div className="flex items-center">
                                                {product.name}
                                                <IconArrowUpRight className="size-4 text-muted group-hover:text-secondary relative top-px" />
                                            </div>
                                        </Link>
                                    </li>
                                )
                            } else {
                                return null
                            }
                        })}
                    </ul>
                </div>
            )}
            {customerData.industries && customerData.industries.length > 0 && (
                <div>
                    <strong className="text-sm text-secondary">Industries:</strong>
                    <ul className="my-0 space-y-1">
                        {customerData.industries.map((industry, index) => (
                            <li key={index} className="text-sm">
                                {industry}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {customerData.users && customerData.users.length > 0 && (
                <div>
                    <strong className="text-sm text-secondary">Users:</strong>
                    <ul className="my-0 space-y-1">
                        {customerData.users.map((user, index) => (
                            <li key={index} className="text-sm">
                                {user}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
