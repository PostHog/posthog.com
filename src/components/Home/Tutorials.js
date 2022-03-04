import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { heading, section } from './classes'

export default function Tutorials({ title, subtitle, cta }) {
    const {
        tutorials: { nodes },
    } = useStaticQuery(query)
    return (
        <section className={section()}>
            <h2 className={heading('md')}>{title}</h2>
            <h3 className={heading('sm', 'gray')}>{subtitle}</h3>
            <ul className="list-none p-0 m-0 grid lg:grid-cols-3 mt-9 lg:divide-x divide-y lg:divide-y-0 divide-dashed divide-gray-accent-light lg:border-r lg:border-l border-gray-accent-light border-dashed">
                {nodes.map((tutorial, index) => {
                    const {
                        slug,
                        frontmatter: { featuredImage, title },
                    } = tutorial
                    const image = getImage(featuredImage)
                    return (
                        <li key={index} className="lg:p-10 py-10">
                            <Link to={slug}>
                                <GatsbyImage
                                    className="bg-[#E5E7E0] dark:bg-[#2C2C2C] rounded-md"
                                    image={image}
                                    alt={title}
                                />
                                <h4 className="leading-snug">{title}</h4>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            {cta?.url && cta?.title && (
                <div className="text-center mt-5">
                    <CallToAction to={cta?.url} type="outline">
                        {cta?.title}
                    </CallToAction>
                </div>
            )}
        </section>
    )
}

const query = graphql`
    query Tutorials {
        tutorials: allMdx(filter: { frontmatter: { featuredTutorial: { eq: true } } }) {
            nodes {
                slug
                frontmatter {
                    title
                    featuredImage {
                        childImageSharp {
                            gatsbyImageData(placeholder: NONE)
                        }
                    }
                }
            }
        }
    }
`
