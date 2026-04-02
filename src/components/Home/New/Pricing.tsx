import React from 'react'
import useProducts from 'hooks/useProducts'
import useProduct from 'hooks/useProduct'
import OSTable from 'components/OSTable'
import { IconArrowUpRight } from '@posthog/icons'
import { Link } from 'gatsby'
import OSButton from 'components/OSButton'
import { useLocale } from '../../../context/Locale'

const productsToShow = ['product_analytics', 'feature_flags', 'session_replay', 'data_warehouse']

const productNameKo: Record<string, string> = {
    'Product Analytics': '제품 분석',
    'Session Replay': '세션 리플레이',
    'Feature Flags': '기능 플래그',
    'Data warehouse': '데이터 웨어하우스',
}

const unitLabelKo: Record<string, string> = {
    event: '이벤트',
    recording: '녹화',
    request: '요청',
    row: '행',
}

function numberToWords(num: number, isKo: boolean): string {
    if (num >= 1_000_000) {
        return isKo ? `${num / 1_000_000}백만` : `${num / 1_000_000} million`
    } else if (num >= 1_000) {
        return num.toLocaleString(isKo ? 'ko-KR' : undefined)
    }
    return num.toString()
}

export default function Pricing() {
    const locale = useLocale()
    const isKo = locale === 'ko'
    const { products: initialProducts } = useProducts()
    const products = initialProducts.filter((product) => productsToShow.includes(product.handle))

    const columns = [
        { name: '', width: '50px', align: 'center' as const },
        { name: isKo ? '제품' : 'Product', width: 'minmax(200px,1fr)', align: 'left' as const },
        { name: isKo ? '무료 한도' : 'Free tier', width: 'minmax(200px,1fr)', align: 'left' as const },
        {
            name: isKo ? '요금 (사용량 많을수록 할인)' : 'Pricing (decreases with volume)',
            width: 'minmax(200px,2fr)',
            align: 'left' as const,
        },
    ]

    const rows = products.map((product, index) => {
        const unitLabel = isKo ? unitLabelKo[product.unit] ?? product.unit : `${product.unit}s`
        const name = isKo ? productNameKo[product.name] ?? product.name : product.name
        const perMonth = isKo ? '/월' : '/mo'
        return {
            cells: [
                { content: index + 1 },
                {
                    content: (
                        <Link
                            to={`/${product.slug}`}
                            state={{ newWindow: true }}
                            className="flex items-center space-x-1"
                        >
                            <product.Icon className={`inline-block size-4 text-${product.color}`} />
                            <span>{name}</span>
                        </Link>
                    ),
                },
                { content: `${numberToWords(product.freeLimit, isKo)} ${unitLabel}${perMonth}` },
                {
                    content: (
                        <span>
                            ${product.startsAt.length <= 3 ? Number(product.startsAt).toFixed(2) : product.startsAt}/
                            {isKo ? unitLabelKo[product.unit] ?? product.unit : product.unit}
                        </span>
                    ),
                },
            ],
        }
    })

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
                                <span>{isKo ? productNameKo[product.name] ?? product.name : product.name}</span>
                            </Link>
                        </div>
                        <div className="px-3 py-2 text-sm space-y-1">
                            <div>
                                <span className="text-muted">{isKo ? '무료 한도:' : 'Free tier:'}</span>{' '}
                                {numberToWords(product.freeLimit, isKo)}{' '}
                                {isKo ? unitLabelKo[product.unit] ?? product.unit : `${product.unit}s`}
                                {isKo ? '/월' : '/mo'}
                            </div>
                            <div>
                                <span className="text-muted">{isKo ? '요금:' : 'Pricing:'}</span> $
                                {product.startsAt.length <= 3 ? Number(product.startsAt).toFixed(2) : product.startsAt}/
                                {isKo ? unitLabelKo[product.unit] ?? product.unit : product.unit}
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
