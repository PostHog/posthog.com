import FooterCTA from 'components/FooterCTA'
import React from 'react'
import Layout from '../Layout'
import { SEO } from '../seo'
import AppsByPostHog from '../AppsByPostHog'
import AppsList from '../AppsList'
import AppsListLegacyPlugin from '../AppsListLegacyPlugin'

function AppsPage() {
    return (
        <Layout>
            <header className="py-12">
                <h2 className="m-0 text-center text-[2.75rem] leading-[2.75rem]  md:text-6xl text-primary">
                    Do more with your data with <br className="hidden lg:block" />
                    <span className="text-blue">PostHog Apps</span>
                </h2>
                <p className="my-6 mx-auto text-center text-base md:text-lg font-semibold mt-2 lg:mt-4 text-primary max-w-2xl opacity-75">
                    50+ apps available
                </p>
            </header>
            <ul className="list-none m-0 p-0 grid grid-cols-2 md:grid-cols-4 border-b border-r border-dashed border-gray-accent-light">
                <AppsByPostHog />
                <AppsList />
                <AppsListLegacyPlugin />

                <li className="border-t border-l border-dashed border-gray-accent-light">
                    <a
                        href="/docs/plugins/build"
                        className="flex flex-col h-full items-center justify-center px-2 py-6 hover:bg-gray-accent-light"
                    >
                        <span className="text-red">Build your own app</span>
                    </a>
                </li>
            </ul>

            <div className="my-12 md:my-24 px-5 max-w-[960px] mx-auto">
                <FooterCTA />
            </div>
        </Layout>
    )
}

export default AppsPage
