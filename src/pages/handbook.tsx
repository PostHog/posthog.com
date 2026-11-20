import React from 'react'
import readingIsMagic from '@posthog/brand/hoggies/png/reading-is-magic'
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
                proseSize="base"
            >
                <section className="max-w-4xl">
                    <div className="flex flex-col @md:items-center @md:justify-end @md:flex-row-reverse gap-8 @md:gap-2 mb-8">
                        <div>
                            <img
                                src={readingIsMagic}
                                alt="A hedgehog reading a glowing book"
                                width={1000}
                                height={1000}
                                className="w-full max-w-[300px] h-auto"
                            />
                        </div>
                        <div className="md:flex-1">
                            <h1>Company handbook</h1>
                            <p className="text-secondary">
                                This handbook simply explains how we work. It is one of the most important things we've
                                ever made.
                            </p>
                        </div>
                    </div>

                    {chapters.map((category) => {
                        return (
                            <div key={category.name} className="mb-16">
                                <h4 className="text-base font-normal opacity-60">{category.name}</h4>
                                <ol className="p-0 -ml-3 -mr-2 space-y-0.5 not-prose">
                                    {category.links.map((link) => {
                                        return (
                                            <li key={link.to} className="list-none">
                                                <Link
                                                    to={link.to}
                                                    className="flex justify-between baseline relative text-primary hover:text-primary dark:text-primary-dark hover:dark:text-primary-dark rounded border border-b-3 border-transparent hover:border-primary hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all min-h-[34px] py-2"
                                                >
                                                    <span className="relative inline-block pl-3 pr-2">{link.name}</span>
                                                    <span className="flex-1 bg-repeat-x bg-center bg-[length:8px_8px] bg-bullet-light" />
                                                    <span className="relative pr-2 w-10 text-center text-sm">
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
