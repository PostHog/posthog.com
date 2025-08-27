import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import chapters from '../navs/handbook.json'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { companyMenu } from '../navs'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'
import OSButton from 'components/OSButton'

export const HandbookToc: React.FC = () => {
    const { tabs, handleTabChange, tabContainerClassName, className } = useCompanyNavigation({
        value: '/chapters',
        content: (
            <section className="p-4 @xl:p-8 max-w-4xl mx-auto">
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
                        <h1>Company handbook</h1>
                        <p className="text-secondary">
                            This handbook simply explains how we work. It is one of the most important things we've ever
                            made.
                        </p>

                        <OSButton asLink to="/handbook" variant="secondary" size="md" state={{ newWindow: true }}>
                            Open the handbook
                        </OSButton>
                    </div>
                </div>

                {chapters.map((category) => {
                    return (
                        <div key={category.name}>
                            <h4 className="text-base font-normal text-secondary">{category.name}</h4>
                            <ol className="p-0 space-y-1 divide-y divide-primary">
                                {category.links.map((link) => {
                                    return (
                                        <li key={link.to} className="list-none px-0 pt-1 first:pt-0">
                                            <OSButton
                                                asLink
                                                to={link.to}
                                                state={{ newWindow: true }}
                                                size="md"
                                                width="full"
                                                hover="background"
                                            >
                                                <span className="flex-1">{link.name}</span>
                                                <span>{link.order}</span>
                                            </OSButton>
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
                            className="space-y-2 py-4 md:py-6 px-4 md:px-8 bg-accent border border-primary rounded"
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
        ),
    })
    return (
        <>
            <SEO image="/images/handbook.png" title="Handbook - PostHog" />
            <Editor
                maxWidth="100%"
                // title="Company"
                // type="about"
                proseSize="base"
                bookmark={{
                    title: 'Company',
                    description: 'Learn about PostHog',
                }}
            >
                <OSTabs
                    tabs={tabs}
                    defaultValue="/chapters"
                    onValueChange={handleTabChange}
                    frame={false}
                    tabContainerClassName={tabContainerClassName}
                    className={className}
                    triggerDataScheme="primary"
                />
            </Editor>
        </>
    )
}

export default HandbookToc
