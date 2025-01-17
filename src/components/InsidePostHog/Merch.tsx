import CloudinaryImage from 'components/CloudinaryImage'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'

export default function Merch() {
    const data = useStaticQuery(graphql`
        {
            shopifyProduct {
                featuredMedia {
                    preview {
                        image {
                            width
                            height
                            originalSrc
                        }
                    }
                }
            }
        }
    `)

    const gatsbyImageData =
        data?.shopifyProduct?.featuredMedia?.preview?.image?.localFile?.childImageSharp?.gatsbyImageData

    return (
        <div>
            <div className="bg-white dark:bg-accent-dark p-4 border border-light dark:border-dark mt-4 mb-0 rounded">
                <h3 className="text-sm text-center italic leading-tight">
                    "This merch store has some of the best company swag I've ever seen"
                </h3>
                {/* quote source: https://posthog.slack.com/archives/C011L071P8U/p1710758940243199 */}

                <Link to="/merch">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/DSC_07383_3265x4897_crop_center_28e2007a77.jpg"
                        alt="PostHog stickers"
                        className="w-full"
                        width={500}
                    />
                    {/* <GatsbyImage image={getImage(gatsbyImageData)} /> */}
                </Link>
            </div>
        </div>
    )
}
