import React from 'react'
import { AuthorsData } from 'types'
import { socialLinks } from '../constants/categories'

interface AuthorDetails {
    authorDetails?: AuthorsData
    className?: string
}

export function BlogAuthor({ authorDetails, className }: AuthorDetails): JSX.Element | null {
    if (authorDetails?.handle) {
        const { image, name, link_type, link_url, role } = authorDetails
        return (
            <>
                <div className={className}>
                    <div className="flex-none">
                        <img src={image} className="w-10 h-10 rounded-full bg-white block m-auto shadow-2xl" />
                    </div>
                    <div>
                        <h6 className="mb-0 text-white font-sans normal-case opacity-80 font-bold">{name}</h6>
                        <p className="opacity-65 mb-2 text-sm">{role}</p>
                        <a
                            href={link_url}
                            target="_blank"
                            rel="noreferrer"
                            className="block opacity-75 hover:opacity-100"
                        >
                            <img
                                src={socialLinks[link_type]?.['icon']}
                                alt={`${name}'s ${socialLinks[link_type]?.['label']}`}
                                className="inline-block"
                            />
                        </a>
                    </div>
                </div>
            </>
        )
    }
    return null
}

export default BlogAuthor
