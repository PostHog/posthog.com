import React from 'react'
import Link from 'components/Link'
import { useCustomers } from 'hooks/useCustomers'
import useProduct from 'hooks/useProduct'

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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-primary rounded-lg border border-primary">
            {customerData.toolsUsedHandles && customerData.toolsUsedHandles.length > 0 && (
                <div>
                    <strong className="text-sm text-secondary">Products used:</strong>
                    <ul className="mt-1 space-y-1">
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
                                            className="text-primary hover:text-red"
                                        >
                                            {product.name}
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
                    <ul className="mt-1 space-y-1">
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
                    <ul className="mt-1 space-y-1">
                        {customerData.users.map((user, index) => (
                            <li key={index} className="text-sm">
                                {user}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {customerData.notes && (
                <div>
                    <strong className="text-sm text-secondary">About:</strong>
                    <p className="mt-1 text-sm">{customerData.notes}</p>
                </div>
            )}
        </div>
    )
}
