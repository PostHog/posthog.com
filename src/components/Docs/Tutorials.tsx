import Link from 'components/Link'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

type TutorialsProps = {
    tutorials: {
        slug: string
        frontmatter: {
            title: string
            featuredImage: {
                childImageSharp: {
                    gatsbyImageData: IGatsbyImageData
                }
            }
        }
    }[]
}

export const Tutorials: React.FC<TutorialsProps> = ({ tutorials }) => {
    return (
        <ul className="list-none p-0 m-0 grid lg:grid-cols-3 lg:divide-x divide-y lg:divide-y-0 divide-dashed divide-gray-accent-light lg:border-r lg:border-l border-gray-accent-light border-dashed">
            {tutorials.map((tutorial, index) => {
                const {
                    slug,
                    frontmatter: { featuredImage, title },
                } = tutorial
                const image = getImage(featuredImage)

                return (
                    <li key={index} className="py-10 lg:px-10 lg:py-0">
                        <Link to={slug} className="relative block">
                            {image && (
                                <GatsbyImage className="bg-[#E5E7E0] dark:bg-[#2C2C2C]" image={image} alt={title} />
                            )}
                            <div className="rounded-md absolute p-4 top-0 left-0 w-full h-full">
                                <h4 className="text-lg m-0 leading-8">{title}</h4>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
