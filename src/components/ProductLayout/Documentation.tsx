import React from 'react'
import GithubSlugger from 'github-slugger'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import { IDocumentation } from './types'

export default function Documentation({ documentation, title, tutorials }: IDocumentation) {
    const slugger = new GithubSlugger()
    return (
        <div className="max-w-2xl mx-auto">
            <div className="pb-4 mb-4 border-b border-dashed border-gray-accent-light flex justify-between items-end">
                <h2 className="m-0">Docs & resources</h2>
                <CallToAction size="sm" type="secondary" to={documentation?.indexURL}>
                    Visit docs
                </CallToAction>
            </div>
            <div>
                <h4 className="m-0 opacity-60">{title} docs</h4>
                <ul className="m-0 p-0 grid list-none divide-y-1 divide-dashed divide-gray-accent-light">
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
                <h4 className="m-0 opacity-60 mt-6 md:mt-12">Tutorials</h4>
                <ul className="m-0 p-0 list-none">
                    {tutorials.map(({ frontmatter, fields }: any) => {
                        const title = frontmatter?.title
                        const slug = fields?.slug
                        return (
                            <li
                                className="py-[2px] list-none border-t first:border-t-0 border-dashed border-gray-accent-light"
                                key={slug}
                            >
                                <Link
                                    className="font-semibold hover:bg-gray-accent-light rounded-sm block py-2 px-1 relative hover:scale-[1.01] active:top-[.5px] active:scale-[1]"
                                    to={slug}
                                >
                                    {title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
