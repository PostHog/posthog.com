import React from 'react'
import { AuthorsData } from 'types'
import { socialLinks } from '../constants/categories'

interface AuthorDetails {
    authorDetails?: AuthorsData
}

function BlogAuthor({ authorDetails }: AuthorDetails) {
    if (authorDetails?.handle) {
        const { image, name, link_type, link_url, role } = authorDetails
        return (
            <>
                <img src={image} className="w-10 h-10 rounded-full bg-white block m-auto shadow-2xl" />
                <h5 className="mt-2 mb-0 text-center">{name}</h5>
                <p className="text-gray-500 mb-2  text-center">{role}</p>
                <a
                    href={link_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-center block m-auto"
                    style={{ width: 'fit-content' }}
                >
                    <img
                        src={socialLinks[link_type]?.['icon']}
                        alt={`${name}'s ${socialLinks[link_type]?.['label']}`}
                        className="inline-block"
                    />
                </a>
            </>
        )
    }
    return null
}

export default BlogAuthor
