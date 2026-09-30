import React from 'react'
import useProducts from 'hooks/useProducts'
import useProduct from 'hooks/useProduct'
import OSTable from 'components/OSTable'
import { IconArrowUpRight } from '@posthog/icons'
import { Link } from 'gatsby'
import OSButton from 'components/OSButton'
import { useTranslation } from 'i18n'

const productsToShow = ['product_analytics', 'feature_flags', 'session_replay', 'data_warehouse']

// section.5.product.<n> in src/i18n/locales. English builds these strings from the live product data, so
// only a translated page reads them from the locale file.
const translationIndex: Record<string, number> = {
    product_analytics: 1,
    session_replay: 2,
    feature_flags: 3,
    data_warehouse: 4,
}

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
    const { locale, t } = useTranslation()

    const freeTier = (product: any) =>
        locale === 'en'
            ? `${numberToWords(product.freeLimit)} ${product.unit}s/mo`
            : t(`section.5.product.${translationIndex[product.handle]}.freetier`)
    const pricing = (product: any) =>
        locale === 'en'
            ? `$${product.startsAt.length <= 3 ? Number(product.startsAt).toFixed(2) : product.startsAt}/${
                  product.unit
              }`
            : t(`section.5.product.${translationIndex[product.handle]}.pricing`)

    const columns = [
        { name: '', width: '50px', align: 'center' as const },
        { name: t('section.5.label.product'), width: 'minmax(200px,1fr)', align: 'left' as const },
        { name: t('section.5.label.freetier'), width: 'minmax(200px,1fr)', align: 'left' as const },
        { name: t('section.5.label.pricing_table'), width: 'minmax(200px,2fr)', align: 'left' as const },
    ]

    const rows = products.map((product, index) => ({
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
            { content: freeTier(product) },
            { content: <span>{pricing(product)}</span> },
        ],
    }))

    return (
        <div>
            {/* Small container: Stacked card layout */}
            <div className="flex flex-col gap-4 @2xl:hidden mb-4">
                {products.map((product, index) => (
                    <div key={product.handle} className="border border-primary">
                        <div className="bg-input px-3 py-2 border-b border-primary">
                            <Link
                                to={`/${product.slug}`}
                                state={{ newWindow: true }}
                                className="flex items-center gap-1.5 font-bold text-sm"
                            >
                                <span>{index + 1}.</span>
                                <product.Icon className={`inline-block size-4 text-${product.color}`} />
                                <span>{product.name}</span>
                            </Link>
                        </div>
                        <div className="px-3 py-2 text-sm space-y-1">
                            <div>
                                <span className="text-muted">{t('section.5.label.freetier')}:</span> {freeTier(product)}
                            </div>
                            <div>
                                <span className="text-muted">{t('section.5.label.pricing')}:</span> {pricing(product)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Larger container: Table layout */}
            <div className="hidden @2xl:block">
                <OSTable columns={columns} rows={rows} className="mb-4" />
            </div>
        </div>
    )
}
