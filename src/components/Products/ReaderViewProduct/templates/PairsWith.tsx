import React from 'react'
import Link from 'components/Link'
import Glow, { type GlowColor } from 'components/Glow'
import ToolsTicker, { DEFAULT_HANDLES } from 'components/Home/ToolsTicker'
import { isAppIconName, AppIcon } from 'components/OSIcons/AppIcon'
import { CARD_H3, SectionHeading } from '../helpers'
import { SectionComponentProps } from '../types'

interface PairItem {
    slug: string
    description: string
    /** Optional className passed to AppIcon when parentIcon is used (e.g. "!size-6"). */
    className?: string
}

const GLOW_COLORS: GlowColor[] = [
    'yellow',
    'blue',
    'red',
    'green',
    'green-2',
    'purple',
    'orange',
    'teal',
    'seagreen',
    'salmon',
    'black',
    'white',
]

/** Product colors are free-form strings; only some of them are valid glow colors. */
const toGlowColor = (color?: string): GlowColor | undefined => GLOW_COLORS.find((glowColor) => glowColor === color)

const PairsWith = ({ id, productData, allProducts }: SectionComponentProps) => {
    const pairsWith: PairItem[] = productData?.pairsWith || []
    if (!pairsWith.length) return null

    // The ticker is the long tail, so drop anything already carded above (plus
    // this product itself) or it just repeats what the reader has just read.
    // `productData.handle` directly, because not every product surfaces in
    // `allProducts` for the slug lookup to resolve — AI Observability doesn't,
    // and was advertising itself in its own ticker.
    const carded = new Set(
        [
            productData?.handle,
            ...[productData?.slug, ...pairsWith.map((pair) => pair.slug)].map(
                (slug) => allProducts.find((product: any) => product.slug === slug)?.handle
            ),
        ].filter(Boolean)
    )
    const tickerHandles = DEFAULT_HANDLES.filter((handle) => !carded.has(handle))

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <SectionHeading
                lede={`Use ${productData?.name} with these other PostHog apps to maximize shareholder value.`}
            >
                Works with other PostHog tools
            </SectionHeading>
            <ul className="grid grid-cols-1 @xl/reader-content:grid-cols-2 gap-3 list-none m-0 p-0">
                {pairsWith.map((pair) => {
                    const productDetails = allProducts.find((product: any) => product.slug === pair.slug)
                    if (!productDetails) return null

                    const glowColor = toGlowColor(productDetails.color)

                    const card = (
                        <Link
                            to={`/${pair.slug}`}
                            state={{ newWindow: true }}
                            className="flex items-start gap-2.5 h-full border border-primary rounded bg-primary p-3 hover:bg-accent transition-colors"
                        >
                            <span
                                className={`inline-block size-6 shrink-0 ${
                                    productDetails.color ? `text-${productDetails.color}` : 'text-primary opacity-50'
                                }`}
                            >
                                {productDetails.parentIcon && isAppIconName(productDetails.parentIcon) ? (
                                    <AppIcon name={productDetails.parentIcon} className={pair.className} />
                                ) : (
                                    productDetails.Icon && <productDetails.Icon className={pair.className} />
                                )}
                            </span>
                            <span className="min-w-0">
                                <strong className={`block underline ${CARD_H3}`}>{productDetails.name}</strong>
                                <span className="block text-sm text-secondary leading-relaxed">{pair.description}</span>
                            </span>
                        </Link>
                    )

                    return (
                        <li key={pair.slug} className="m-0">
                            {glowColor ? (
                                <Glow
                                    color={glowColor}
                                    size="sm"
                                    intensity="gentle"
                                    rounded="md"
                                    hover
                                    className="h-full"
                                >
                                    {card}
                                </Glow>
                            ) : (
                                card
                            )}
                        </li>
                    )
                })}
            </ul>
            {tickerHandles.length > 0 && (
                <ToolsTicker
                    handles={tickerHandles}
                    label="And the rest of PostHog:"
                    direction="right"
                    className="mt-6"
                />
            )}
        </section>
    )
}

export default PairsWith
