import React from 'react'
import GithubSlugger from 'github-slugger'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import { IDocumentation } from './types'

export default function Documentation({ documentation, title, image, tutorials }: IDocumentation) {
    const slugger = new GithubSlugger()
    const gatsbyImage = image && getImage(image)
    return (
        <>
            <div className="pb-4 mb-4 border-b border-dashed border-gray-accent-light flex justify-between items-end">
                <h2 className="m-0">Docs & resources</h2>
                <CallToAction size="sm" type="secondary" to={documentation?.indexURL}>
                    Visit docs
                </CallToAction>
            </div>
            <div className="grid md:grid-cols-2 gap-x-0 md:gap-y-0 gap-y-4 md:gap-x-8">
                <div>
                    <h4 className="m-0 opacity-60">{title} docs</h4>
                    <ul className="m-0 p-0 list-none grid divide-y-1 divide-dashed divide-gray-accent-light">
                        {documentation?.pages?.map(({ frontmatter, fields, headings }: any, index: number) => {
                            const slug = fields?.slug
                            return (
                                <li key={slug} className="py-4 flex space-x-4">
                                    <span className="font-bold text-sm opacity-60 mt-1.5 ml-1.5">{index + 1}.</span>
                                    <div className="w-full">
                                        <Link
                                            to={slug}
                                            className="block font-semibold text-sm px-2 py-1 -ml-2 rounded-sm relative  hover:bg-gray-accent-light hover:text-red hover:scale-[1.01] active:scale-[1] active:top-[.5px]"
                                        >
                                            <h5 className="text-[17px] m-0">{frontmatter.title}</h5>
                                        </Link>
                                        <ul className="m-0 p-0 list-none">
                                            {headings
                                                .filter(({ depth }: any) => depth <= 3)
                                                .slice(0, 3)
                                                .map(({ value }: any) => {
                                                    const id = slugger.slug(value)
                                                    return (
                                                        <li key={id} className="">
                                                            <Link
                                                                to={`${slug}#${id}`}
                                                                className="block text-primary/75 font-semibold text-sm px-2 py-1 -ml-2 rounded-[3px] relative hover:bg-gray-accent-light hover:text-primary hover:scale-[1.01] active:scale-[1] active:top-[.5px]"
                                                            >
                                                                {value}
                                                            </Link>
                                                        </li>
                                                    )
                                                })}
                                        </ul>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    {gatsbyImage && (
                        <figure className="m-0 p-4 rounded bg-gray-accent-light">
                            {gatsbyImage && <GatsbyImage alt={title} image={gatsbyImage} />}
                        </figure>
                    )}
                    <h4 className="m-0 opacity-60 mt-6 md:mt-12">Tutorials</h4>
                    <ul className="m-0 p-0 list-none grid divide-y-1 divide-dashed divide-gray-accent-light">
                        {tutorials.map(({ frontmatter, fields }: any) => {
                            const title = frontmatter?.title
                            const slug = fields?.slug
                            return (
                                <li className="py-2" key={slug}>
                                    <Link className="font-semibold" to={slug}>
                                        {title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}
