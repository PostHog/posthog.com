import React from 'react'
import useProducts from 'hooks/useProducts'
import useProduct from 'hooks/useProduct'
import OSTable from 'components/OSTable'
import { IconArrowUpRight } from '@posthog/icons'
import { Link } from 'gatsby'
import OSButton from 'components/OSButton'

const productsToShow = ['product_analytics', 'feature_flags', 'session_replay', 'data_warehouse']

function numberToWords(num: number): string {
    if (num >= 1_000_000) {
        return `${num / 1_000_000} million`
    } else if (num >= 1_000) {
        return num.toLocaleString()
    }
    return num.toString()
}

export default function Pricing() {
    const { products: initialProducts } = useProducts()
    const products = initialProducts.filter((product) => productsToShow.includes(product.handle))

    return (
        <div className="mt-4">
            <OSTable
                overflowX
                columns={[
                    { name: '', width: '50px', align: 'center' as const },
                    { name: 'Product', width: 'minmax(200px,1fr)', align: 'left' as const },
                    { name: 'Free tier', width: 'minmax(200px,1fr)', align: 'left' as const },
                    { name: 'Pricing (decreases with volume)', width: 'minmax(200px,2fr)', align: 'left' as const },
                ]}
                rows={products.map((product, index) => ({
                    cells: [
                        { content: index + 1 },
                        {
                            content: (
                                <Link to={`/${product.slug}`} state={{ newWindow: true }} className="flex items-center space-x-1">
                                    <product.Icon className={`inline-block size-4 text-${product.color}`} />
                                    <span>{product.name}</span>
                                </Link>
                            ),
                        },
                        { content: `${numberToWords(product.freeLimit)} ${product.unit}s/mo` },
                        {
                            content: (
                                <span>
                                    $
                                    {product.startsAt.length <= 3
                                        ? Number(product.startsAt).toFixed(2)
                                        : product.startsAt}
                                    /{product.unit}
                                </span>
                            ),
                        },
                    ],
                }))}
            />
            <p>
                <OSButton asLink variant="secondary" size="md" to="/pricing" state={{ newWindow: true }}>
                    Explore pricing
                </OSButton>
            </p>
        </div>
    )
}
