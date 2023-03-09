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
                        <li key={index} className="py-10 lg:px-10 lg:py-0">
                            <Link to={slug} className="relative block">
                                <GatsbyImage className="bg-[#E5E7E0] dark:bg-[#2C2C2C]" image={image} alt={title} />
                                <div className="rounded-md absolute p-4 top-0 left-0 w-full h-full">
                                    <h4 className="text-2xl m-0 leading-8">{title}</h4>
                                </div>
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
