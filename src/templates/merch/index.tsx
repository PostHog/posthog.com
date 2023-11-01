import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from 'components/Layout'
// import { getShopifyProduct } from './transforms'
import Pagination from 'components/Pagination'
import { Drawer } from 'components/Drawer'

export default function MerchPage(props) {
    const { data, pageContext } = props
    const [drawerIsOpen, setDrawerIsOpen] = React.useState<boolean>(false)

    return (
        <Layout className="[&_main]:pb-[200px]">
            <div className="container mx-auto">
                <h1>Products</h1>
                <h2 onClick={() => setDrawerIsOpen(true)}>Open Drawer</h2>
                <Drawer isOpen={drawerIsOpen} onClose={() => setDrawerIsOpen(false)}>
                    test
                </Drawer>
                <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-4">
                    {data.allShopifyProduct.edges.map(({ node }) => {
                        // const shopifyProduct = getShopifyProduct(node)
                        return (
                            <div key={node.shopifyId}>
                                <GatsbyImage
                                    className="w-[300px]"
                                    image={node.featuredMedia.preview.image.localFile.childImageSharp.gatsbyImageData}
                                    alt={node.title}
                                />
                                <h3>
                                    <Link to={`/products/${node.handle}`}>{node.title}</Link>
                                    {' - '}${node.priceRangeV2.minVariantPrice.amount}
                                </h3>
                                <p>{node.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Pagination currentPage={pageContext.currentPage} numPages={pageContext.numCollectionPages} base="/merch" />
        </Layout>
    )
}

export const query = graphql`
    query allProductsQuery($skip: Int!, $limit: Int!) {
        allShopifyProduct(sort: { order: ASC, fields: title }, limit: $limit, skip: $skip) {
            edges {
                node {
                    title
                    shopifyId
                    description
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
                }
            }
        }
    }
`
