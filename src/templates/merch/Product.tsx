import { CallToAction } from 'components/CallToAction'
import Layout from 'components/Layout'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import { cn } from '../../utils'
import { LoaderIcon } from './LoaderIcon'
import { Nav } from './Nav'
import { Price } from './Price'
import { ProductOptionSelect } from './ProductOptionSelect'
import { Quantity } from './Quantity'
import { useProduct } from './hooks'
import { useCartStore } from './store'
import { getProductMetafield } from './utils'

type ProductPageProps = {
    className?: string
}

export default function Product(props: ProductPageProps): React.ReactElement {
    console.log('🚀 ~ props:', props)
    const { data, pageContext } = props
    const product = data.shopifyProduct
    const [cartIsOpen, setCartIsOpen] = useState<boolean>(false)

    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [quantity, setQuantity] = useState<number>(1)
    const addToCart = useCartStore((state) => state.add)

    const subtitle = getProductMetafield(product, 'subtitle')
    const isNew = product.tags?.includes('new')

    const [
        selectedOptions,
        setOptionAtIndex,
        selections,
        selectedVariant, // use this for add to cart
    ] = useProduct({ product })

    const handleAddToCart = () => {
        setIsAdding(true)
        setTimeout(() => {
            addToCart(selectedVariant || product.variants[0], quantity)
            setCartIsOpen(true)
            setIsAdding(false)
        }, 500)
    }

    return (
        <Layout className="[&_main]:pb-[80px]">
            <Nav cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} />

            <div className="w-full px-4 mx-auto max-w-7xl">
                <div className="md:grid md:grid-cols-2 md:gap-8 space-y-6 md:space-y-0 md:mt-24 mb-36">
                    <div>
                        <div className="image-wrapper relative bg-white rounded-md border border-light dark:border-dark ">
                            {isNew && (
                                <div className="z-10 rotate-12 uppercase text-xs flex items-center justify-center bg-yellow rounded-full p-2 font-bold aspect-square absolute top-1 right-1 -translate-y-1/2 translate-x-1/2">
                                    New
                                </div>
                            )}
                            <GatsbyImage
                                className="w-full rounded-md overflow-hidden aspect-square"
                                image={product.featuredMedia.preview.image.localFile.childImageSharp.gatsbyImageData}
                                alt={product.title}
                            />
                        </div>
                    </div>
                    <div className="[&_*]:mb-0 space-y-4">
                        <h3 className="text-xl [&_a]:text-primary dark:[&_a]:text-primary-dark leading-snug">
                            {product.title}
                        </h3>
                        <p className="leading-tight">{subtitle}</p>
                        <p className="text-lg">
                            <Price price={product.priceRangeV2.minVariantPrice.amount} />
                        </p>

                        {selectedOptions.map((so, i) => {
                            return (
                                <ProductOptionSelect
                                    key={i}
                                    option={so.option}
                                    onChange={(val) => setOptionAtIndex(i, so.option, val)}
                                    value={so.selectedValue}
                                    selections={selections}
                                />
                            )
                        })}

                        <Quantity value={quantity} onChange={setQuantity} />

                        <CallToAction onClick={handleAddToCart} type="primary" className="relative w-full">
                            <span className={cn('', isAdding && 'invisible')}>Add to Cart</span>
                            <LoaderIcon
                                className={cn(
                                    'invisible absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2',
                                    isAdding && 'visible'
                                )}
                            />
                        </CallToAction>
                        {product.description && (
                            <div className="border-t border-light dark:border-dark pt-4">
                                <h3 className="text-lg mb-0">Description</h3>
                                <p className="text-[15px]">{product.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query ($handle: String) {
        shopifyProduct(handle: { eq: $handle }) {
            id
            title
            handle
            shopifyId
            description
            metafields {
                value
                key
            }
            priceRangeV2 {
                maxVariantPrice {
                    amount
                }
                minVariantPrice {
                    amount
                }
            }
            status
            featuredMedia {
                preview {
                    image {
                        localFile {
                            childImageSharp {
                                gatsbyImageData
                            }
                        }
                    }
                }
            }
            options {
                shopifyId
                name
                values
            }
            tags
            totalInventory
            variants {
                shopifyId
                title
                sku
                price
                availableForSale
                product {
                    title
                    featuredMedia {
                        preview {
                            image {
                                localFile {
                                    childImageSharp {
                                        gatsbyImageData
                                    }
                                }
                            }
                        }
                    }
                }
                media {
                    preview {
                        image {
                            localFile {
                                childImageSharp {
                                    gatsbyImageData
                                }
                            }
                        }
                    }
                }
                selectedOptions {
                    name
                    value
                }
            }
        }
    }
`
