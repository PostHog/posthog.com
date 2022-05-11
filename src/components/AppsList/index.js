import Link from 'components/Link'
import React from 'react'

const Listing = ({ name, image, url, badge, price }) => {
    return (
        <li className="border-b border-r border-dashed border-gray-accent-light">
            <Link
                to={url}
                className="flex flex-col h-full relative items-center text-center px-2 py-8 hover:bg-gray-accent-light"
            >
                <img className="icon w-6 h-6 mb-2" src={image} />

                <span className="text-primary">{name}</span>
                <div className="absolute top-4 right-4 inline-flex space-x-2 items-center text-[12px] uppercase text-primary text-opacity-50">
                    {badge && <span className="bg-gray-accent-light rounded-[2px] px-2 py-1">{badge}</span>}
                    {badge?.toLowerCase() !== 'built-in' && <span>{price || 'Free'}</span>}
                </div>
            </Link>
        </li>
    )
}

export default function AppsList({ apps }) {
    return (
        <ul className="list-none m-0 p-0 grid grid-cols-2 md:grid-cols-4 border-t border-l border-dashed border-gray-accent-light max-w-screen-2xl mx-auto">
            {apps.map((app) => {
                const {
                    id,
                    fields: { slug },
                    frontmatter: { thumbnail, title, badge, price },
                } = app
                return (
                    <Listing
                        key={id}
                        badge={badge}
                        name={title}
                        image={thumbnail?.publicURL}
                        url={slug}
                        price={price}
                    />
                )
            })}
        </ul>
    )
}
