import Link from 'components/Link'
import React from 'react'
import builderHog from './builder-hog.png'

const Listing = ({ name, image, url, badge, price }) => {
    return (
        <li className="">
            <Link
                to={url}
                className="flex flex-col relative items-center text-center px-2 py-8 justify-center hover:bg-gray-accent-light"
            >
                <img className="icon w-20 h-20 p-2 mb-2 rounded-sm" src={image} />

                <span className="text-primary">{name}</span>
                <div className="absolute top-4 right-4 inline-flex space-x-2 items-center text-[12px] uppercase text-primary text-opacity-50">
                    {badge && <span className="bg-gray-accent-light rounded-[2px] px-2 py-1">{badge}</span>}
                    {badge?.toLowerCase() !== 'built-in' && <span>{price || 'Free'}</span>}
                </div>
            </Link>
        </li>
    )
}

export default function TemplatesList({ templates }) {
    return (
        <ul className="list-none m-0 p-0 grid grid-cols-2 md:grid-cols-4 max-w-screen-2xl mx-auto">
            {templates.map((template) => {
                const {
                    id,
                    fields: { slug },
                    frontmatter: { thumbnail, title, badge, price },
                } = template
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
            <li className="border-dashed border-gray-accent-light inline-flex items-center justify-center relative overflow-hidden bg-red min-h-[160px]">
                <Link
                    className="flex justify-center space-x-4 items-center w-full h-full"
                    to="https://app.posthog.com/dashboard"
                >
                    <img
                        className="md:absolute left-[-37px] bottom-[-32px] -scale-x-1 max-w-[32%] min-w-[100px]"
                        src={builderHog}
                        alt=""
                    />
                    <h3 className="m-0 text-[1.2rem] md:text-[1.5rem] text-white relative">Build your own</h3>
                </Link>
            </li>
        </ul>
    )
}
