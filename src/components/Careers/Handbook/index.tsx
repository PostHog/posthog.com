import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import chapters from '../../../navs/handbook.json'
import { StaticImage } from 'gatsby-plugin-image'

const CompanyHandbook: React.FC = () => {
    return (
        <section id="handbook" className="@container mb-12">
            <div className="relative mb-12">
                <h2>Get to know us in our company handbook</h2>

                <div className="@xl:float-right @xl:ml-4 @xl:-mt-8">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/search-hog-4.png"
                        alt="This hog has an answer"
                        height={250}
                        width={330}
                        placeholder="blurred"
                        imgClassName="w-48 @xl:w-64 @2xl:w-80"
                    />
                </div>

                <p className="mb-2">
                    Almost any question you'll have about working here is answered in our public handbook. But here are
                    some highlights you might be interested to know:
                </p>
                <ul className="mb-4 pl-4">
                    <li>Our revenue is over $10 million a year</li>
                    <li>
                        We're{' '}
                        <Link href="/handbook/finance" state={{ newWindow: true }}>
                            default alive
                        </Link>
                    </li>
                    <li>If you join us, you will be expected to take a stance on if pineapple belongs on pizza</li>
                </ul>
                <CallToAction href="/handbook" type="secondary" size="sm" state={{ newWindow: true }}>
                    Visit the handbook
                </CallToAction>
            </div>
            <aside>
                <div className="not-prose bg-white dark:bg-dark rounded p-4 @3xl:px-6 xl:py-6 xl:px-8 @3xl:w-auto border border-primary">
                    <h4 className="mb-3">Handbook chapters</h4>
                    {chapters.map((category) => {
                        return (
                            <div key={category.name} className="">
                                <ol className="p-0 -ml-4 -mr-4">
                                    {category.links.map((link) => {
                                        return (
                                            <li key={link.to} className="list-none px-1">
                                                <Link
                                                    to={link.to}
                                                    className="group flex justify-between baseline relative bg-bullet-light dark:bg-bullet-dark bg-repeat-x bg-center bg-[length:8px_8px] text-primary rounded border border-transparent hover:border-primary hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all min-h-[28px] py-1 text-sm font-medium no-underline"
                                                    state={{ newWindow: true }}
                                                >
                                                    <span className="relative inline-block pl-3 pr-2 bg-white -ml-px group-hover:ml-0 dark:bg-dark truncate no-underline">
                                                        {link.name}
                                                    </span>
                                                    <span className="relative pr-2 bg-white dark:bg-dark w-10 -mr-px group-hover:mr-0 text-center text-sm no-underline">
                                                        {link.order}
                                                    </span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ol>
                            </div>
                        )
                    })}
                </div>
            </aside>
        </section>
    )
}

export default CompanyHandbook
