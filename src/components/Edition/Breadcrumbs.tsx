import Link from 'components/Link'
import { capitalize } from 'instantsearch.js/es/lib/utils'
import React from 'react'
import slugify from 'slugify'

type Props = {
    category: string
    tags?: string[]
}

export default function Breadcrumbs({ category, tags }: Props): JSX.Element {
    const hasTags = tags && tags.length > 0
    return (
        <nav>
            <ul className="m-0 p-0 !mb-2 flex space-x-2 list-none items-center whitespace-nowrap">
                <li className={`after:content-['→'] after:ml-2`}>
                    <Link className="text-base" to={`https://posthog.com/posts`}>
                        Posts
                    </Link>
                </li>
                <li className={`${hasTags ? `after:content-['→'] after:ml-2` : ''} overflow-hidden text-ellipsis`}>
                    <Link className="text-base" to={`/${slugify(category, { lower: true })}`}>
                        {category}
                    </Link>
                </li>
                {hasTags && (
                    <li className="!text-base font-semibold overflow-hidden text-ellipsis">
                        {tags.map((tag) => capitalize(tag)).join(', ')}
                    </li>
                )}
            </ul>
        </nav>
    )
}
