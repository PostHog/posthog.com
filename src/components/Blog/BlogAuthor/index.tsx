import React from 'react'
import { AuthorsData } from 'types'
import { socialLinks } from '../constants/categories'

interface AuthorDetails {
    authorDetails?: AuthorsData
    className?: string
    colorDark?: string
    color?: string
}

export function BlogAuthor({
    authorDetails,
    className,
    colorDark = 'primary-dark',
    color = 'primary',
}: AuthorDetails): JSX.Element | null {
    if (authorDetails?.handle) {
        const { image, name, link_type, link_url, role } = authorDetails
        return (
            <>
                <div className={className}>
                    <div className="flex-none">
                        <img src={image} className="w-10 h-10 rounded-full bg-white block m-auto shadow-2xl" />
                    </div>
                    <div>
                        <h6
                            className={`mb-0 font-sans normal-case opacity-80 font-bold text-${color} dark:text-${colorDark}`}
                        >
                            {name}
                        </h6>
                        <p className={`opacity-65 mb-2 text-sm text-${color} dark:text-${colorDark}`}>{role}</p>
                        <a
                            href={link_url}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-block opacity-75 hover:opacity-100 text-${color} hover:text-white dark:text-${colorDark}`}
                        >
                            {socialLinks[link_type]?.['icon']}
                        </a>
                    </div>
                </div>
            </>
        )
    }
    return null
}

export default BlogAuthor
