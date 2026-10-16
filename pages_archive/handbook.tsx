import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import { SEO } from 'components/seo'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { handbookSidebar } from '../navs'
import chapters from '../navs/handbook.json'
import Link from 'components/Link'

export const Handbook: React.FC = () => {
    return (
        <>
            <SEO image="/images/handbook.png" title="Handbook - PostHog" />
            <ReaderView
                title="Company Handbook"
                hideTitle={true}
                leftSidebar={<TreeMenu items={handbookSidebar} />}
                homeURL="/handbook"
                description="Learn how PostHog works"
                proseSize="base"
            >
                <section className="max-w-4xl">
                    <div className="flex flex-col @md:items-center @md:justify-end @md:flex-row-reverse gap-8 @md:gap-2 mb-8">
                        <div>
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/search-hog-4.png"
                                alt="This hog has an answer"
                                width={400}
                                placeholder="blurred"
                                className="max-w-[300px] @xl:max-w-[300px]"
                            />
                        </div>
                        <div className="md:flex-1">
                            <h1>Company handbook</h1>
                            <p className="text-secondary">
                                This handbook simply explains how we work. It is one of the most important things we've ever
                                made.
                            </p>
                        </div>
                    </div>

                    {chapters.map((category) => {
                        return (
                            <div key={category.name} className="mb-16">
                                <h4 className="text-base font-normal opacity-60">{category.name}</h4>
                                <ol className="p-0 -ml-3 -mr-2 space-y-0.5">
                                    {category.links.map((link) => {
                                        return (
                                            <li key={link.to} className="list-none">
                                                <Link
                                                    to={link.to}
                                                    className="flex justify-between baseline relative bg-bullet-light dark:bg-bullet-dark bg-repeat-x bg-center bg-[length:8px_8px] text-primary hover:text-primary dark:text-primary-dark hover:dark:text-primary-dark rounded border border-b-3 border-transparent hover:border hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all min-h-[34px] py-2"
                                                >
                                                    <span className="relative inline-block pl-3 pr-2 bg-light dark:bg-dark">
                                                        {link.name}
                                                    </span>
                                                    <span className="relative pr-2 bg-light dark:bg-dark w-10 text-center text-sm">
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
                </section>
            </ReaderView>
        </>
    )
}

export default Handbook