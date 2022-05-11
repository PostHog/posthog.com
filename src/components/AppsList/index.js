import Link from 'components/Link'
import React from 'react'

const Listing = ({ name, image, url }) => {
    return (
        <li className="border-t border-l border-dashed border-gray-accent-light">
            <Link
                to={url}
                className="flex flex-col h-full relative items-center text-center px-2 py-8 hover:bg-gray-accent-light"
            >
                <img className="icon w-6 h-6 mb-2" src={image} />

                <span className="text-primary">{name}</span>
                <div className="absolute top-4 right-4 inline-flex px-2 py-1 text-[12px] uppercase rounded-[2px] text-primary text-opacity-50">
                    Free
                </div>
            </Link>
        </li>
    )
}

export default function AppsList({ apps }) {
    return (
        <>
            {apps.map((app) => {
                const {
                    fields: { slug },
                    frontmatter: { thumbnail, title },
                } = app
                return <Listing key={slug} name={title} image={thumbnail?.publicURL} url={slug} />
            })}
        </>
    )
}
