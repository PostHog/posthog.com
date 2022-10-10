import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import FullWidthBorderSlider from 'components/FullWidthBorderSlider'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'
import { FeatureWrapperRow } from './FeatureWrapper'

const Slide = ({ fields: { slug }, frontmatter: { title, thumbnail, featuredImage } }) => {
    const icon = getImage(thumbnail)
    return (
        <div>
            <div className="flex items-center space-x-2">
                <span>{icon && <GatsbyImage image={icon} alt={title} />}</span>
                <h5 className="text-lg m-0 text-black/75">{title}</h5>
                <p className="ml-auto m-0 text-sm font-normal">Free</p>
            </div>
        </div>
    )
}

export default function Apps() {
    const {
        apps: { nodes: apps },
    } = useStaticQuery(query)
    const [activeSlide, setActiveSlide] = useState(0)
    return (
        <FeatureWrapperRow
            id="apps"
            title="Apps"
            cta={{
                url: '/apps',
                title: 'Browse 50+ apps',
            }}
            description={
                <p className="m-0">
                    PostHog apps let you do literally <strong className="text-blue">apps</strong>olutely anything with
                    your data. Connect to your CS, marketing, and engineering clouds – or create your own app if it
                    doesn’t exist yet.
                </p>
            }
        />
    )
}

export const query = graphql`
    query AppsSliderQuery {
        apps: allMdx(filter: { fields: { slug: { regex: "/^/apps/" } } }, limit: 1000) {
            nodes {
                id
                fields {
                    slug
                }
                frontmatter {
                    title
                    thumbnail {
                        childImageSharp {
                            gatsbyImageData(width: 32, height: 32)
                        }
                    }
                    featuredImage {
                        childImageSharp {
                            gatsbyImageData(width: 514, height: 289)
                        }
                    }
                }
            }
        }
    }
`
