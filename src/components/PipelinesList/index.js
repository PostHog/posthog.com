import Link from 'components/Link'
import React from 'react'
import builderHog from './builder-hog.png'

const Listing = ({ name, image, url, badge, price }) => {
    return (
        <li className="">
            <Link
                to={url}
                className="group flex items-center relative px-2 pt-1.5 pb-1 mb-1 rounded  border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
            >
                <img className="icon w-12 h-12 p-2 mr-2 rounded-sm" src={image} />

                <span className="text-primary">{name}</span>
                <div className="ml-auto inline-flex px-2 items-center text-[12px] uppercase text-primary text-opacity-50">
                    {badge && <span className="bg-gray-accent-light rounded-[2px] px-2 py-1">{badge}</span>}
                    {badge?.toLowerCase() !== 'built-in' && <span>{price || 'Free'}</span>}
                </div>
            </Link>
        </li>
    )
}

export default function PipelinesList({ pipelines, hideBuildYourOwn }) {
    return (
        <ul className="list-none m-0 p-0 max-w-2xl mx-auto">
            {pipelines.map((pipeline) => {
                const {
                    id,
                    fields: { slug },
                    frontmatter: { thumbnail, title, badge, price },
                } = pipeline
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
            {!hideBuildYourOwn && (
                <li className="">
                    <Link
                        className="group flex items-center relative px-2 pb-1 mb-1 rounded  border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
                        to="/docs/cdp/build"
                    >
                        <img className="w-16 -scale-x-1 icon h-16 p-2 -ml-2 mr-0" src={builderHog} alt="" />
                        <span className="text-red m-0 relative">Build your own &rarr;</span>
                    </Link>
                </li>
            )}
        </ul>
    )
}
