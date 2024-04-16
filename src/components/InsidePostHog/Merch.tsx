import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'

export default function Merch() {
    const {
        shopifyProduct: {
            featuredMedia: {
                preview: {
                    image: {
                        localFile: {
                            childImageSharp: { gatsbyImageData },
                        },
                    },
                },
            },
        },
    } = useStaticQuery(graphql`
        {
            shopifyProduct {
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
    `)

    return (
        <div className="bg-white dark:bg-accent-dark p-4 border border-light dark:border-dark my-4">
            <h3 className="text-lg text-center italic leading-tight">"Some of the best company swag I've ever seen"</h3>
            {/* quote source: https://posthog.slack.com/archives/C011L071P8U/p1710758940243199 */}

            <GatsbyImage image={getImage(gatsbyImageData)} />
        </div>
    )
}
