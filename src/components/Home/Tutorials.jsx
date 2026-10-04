import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import React from 'react'
import { heading, section } from './classes'
import { ResponsiveImage } from 'components/Image'
import featuredTutorialsJson from '@data/content-featured-tutorials.json'

export default function Tutorials({ title, subtitle, cta }) {
    return (
        <section className={section()}>
            <h2 className={heading('md')}>{title}</h2>
            <h3 className={heading('sm', 'gray')}>{subtitle}</h3>
            <ul className="list-none p-0 m-0 grid lg:grid-cols-3 mt-9 gap-4">
                {featuredTutorialsJson.map(({ slug, title, image }, index) => {
                    return (
                        <li key={index} className="">
                            <Link
                                to={slug}
                                className="relative rounded block bg-light dark:bg-dark border border-primary"
                            >
                                <ResponsiveImage className="bg-accent" image={image ?? undefined} alt={title} />
                                <div className="rounded-md absolute p-4 top-0 left-0 w-full h-full">
                                    <h4 className="text-xl m-0 leading-6">{title}</h4>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            {cta?.url && cta?.title && (
                <div className="text-center mt-5">
                    <CallToAction to={cta?.url} type="outline">
                        {cta?.title}
                    </CallToAction>
                </div>
            )}
        </section>
    )
}
