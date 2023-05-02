import React from 'react'
import Link from 'components/Link'
import { IDocumentation } from './types'

export default function Tutorials({ tutorials }: IDocumentation) {
    return (
        <div id="tutorials" className="max-w-2xl mx-auto">
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
    )
}
