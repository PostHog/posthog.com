import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import chapters from '../navs/handbook.json'

export const Handbook: React.FC = () => {
    return (
        <Layout>
            <SEO image="/images/handbook.png" title="Handbook - PostHog" />

            <PostLayout article={false} title={'Handbook'} hideSidebar hideSurvey>
                <section className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:items-center md:justify-end md:flex-row-reverse gap-8 md:gap-2">
                        <div className="-mt-16 md:-mt-12">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/search-hog-4.png"
                                alt="This hog has an answer"
                                width={400}
                                placeholder="blurred"
                            />
                        </div>
                        <div className="md:flex-1">
                            <h1 className="font-bold text-5xl mb-6">Company handbook</h1>
                            <h3 className="text-xl">👋 Welcome!</h3>
                            <h5 className="opacity-60 font-semibold leading-tight mb-8 max-w-lg">
                                This handbook simply explains how we work. It is one of the most important things we've
                                ever made.
                            </h5>
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
                                                    className="flex justify-between baseline relative bg-bullet-light dark:bg-bullet-dark bg-repeat-x bg-center bg-[length:8px_8px] text-primary hover:text-primary dark:text-primary-dark hover:dark:text-primary-dark rounded border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all min-h-[34px] py-2"
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

                    {/*
                    <h4>Top links</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {otherLinks.map((category) => {
                            return (
                                <div
                                    key={category.name}
                                    className="space-y-2 py-4 md:py-6 px-4 md:px-8 bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded"
                                >
                                    <h4 className="mb-0">{category.name}</h4>
                                    <ul className="p-0 space-y-1">
                                        {category.links.map((link) => {
                                            return (
                                                <li key={link.to} className="list-none">
                                                    <Link to={link.to}>{link.name}</Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                    */}
                </section>

                <section className="space-y-8"></section>
            </PostLayout>
        </Layout>
    )
}

export default Handbook
