import Roadmap from 'components/Roadmap'
import Layout from 'components/Layout'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import groupBy from 'lodash.groupby'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import Section from 'components/ProductPage/Section'
import { FeatureSnapshot } from 'components/FeatureSnapshot'
import { SidecarLogo } from 'components/SidecarLogo/sidecarLogo'

import banner from '../../images/sidecar-screenshot.png'

export default function RoadmapPage() {
    const HomePage = ({ data }) => {
        return <div>{data.site.siteMetadata.description}</div>
    }

    return (
        <Layout>
            <SEO title="PostHog Roadmap" />
            <div className="">
                <PostLayout
                    darkMode={false}
                    article={false}
                    title={'Roadmap'}
                    hideSearch
                    hideSurvey
                    menu={[
                        { name: 'Questions', url: '/questions' },
                        { name: 'Roadmap', url: '/roadmap' },
                        { name: 'Contributors', url: '/contributors' },
                        { name: 'Core team', url: '/handbook/company/team' },
                    ]}
                >
                    <SidecarLogo className="h-20 mb-8 mx-auto" />

                    <h1 className="font-bold text-center text-5xl mb-4 xl:mt-0 hidden">PostHog Sidecar</h1>
                    <p className="font-medium text-center text-xl -mb-6 xl:mt-0">
                        A Chrome extension that shows a user's data from PostHog in any SaaS tool
                    </p>

                    <Section title="Test updates safely with feature flags" titleSize="md">
                        <FeatureSnapshot
                            image={banner}
                            features={[
                                <>
                                    <strong>More context for debugging</strong> get to session recordings, feature flags
                                    and events from any other SaaS product.
                                </>,
                                <>
                                    <strong>Context for support teams</strong> know if users are paying customers, which
                                    features they use and product actions they've taken.
                                </>,
                                <>
                                    <strong>User data in any tool</strong> with zero integration needed.
                                </>,
                            ]}
                        />
                    </Section>

                    <div className="article-content px-5 lg:px-12 w-full transition-all lg:max-w-3xl mx-auto pb-6">
                        <h3 className="font-bold text-5xl mb-8 xl:mt-0">How to install</h3>
                        <ol>
                            <li>
                                Join our <Link to="/questions">community chat</Link>, and join the
                                #team-website-and-docs channel - the zip file is pinned in the channel.
                            </li>
                            <li>Download the zip file and unzip it.</li>
                            <li>
                                Open the extensions menu in Chrome, switch to developer mode, then choose load unpacked
                                extension and upload it.
                            </li>
                            <li>
                                Chrome's extension store can be buggy - just restart after you enable developer mode if
                                you have any issues.
                            </li>
                        </ol>

                        <h3 className="font-bold text-5xl mb-8 xl:mt-0">How to use</h3>
                        <ol>
                            <li>
                                Once Sidecar is installed, go to your CRM / customer support tool or anywhere you might
                                find a customers's name.
                            </li>
                            <li>
                                The Sidecar slide out will appear. Select where your PostHog instance exists (if you use
                                cloud, you're probably on 'PostHog US')
                            </li>
                            <li>
                                Insert a personal API key by going to https://app.posthog.com/me/settings (or
                                https://example.com/me/settings if you self host)
                            </li>
                            <li>
                                If you have an ad-blocker enabled, you may need to disable this before hitting 'Next'.
                            </li>
                            <li>
                                Now you can select which fields you display on the page. These can be either person or
                                group properties.
                            </li>
                            <li>
                                If you now search, Sidecar will search your PostHog data by email or by distinct ID. It
                                will default search the string that is selected before you right click, but you can edit
                                the search manually afterwards.
                            </li>
                            <li>Happy dealing with customers, with much more context.</li>
                        </ol>

                        <h3 className="font-bold text-5xl mb-8 xl:mt-0">
                            I found a bug, have feedback, or want to contribute
                        </h3>

                        <p>
                            For feedback, please join our <Link to="/questions">community chat</Link>, and post it in
                            the #team-website-and-docs channel.
                        </p>
                        <p>
                            For bugs, <Link to="https://github.com/PostHog/sidecar/issues/new">create an issue</Link> in
                            the Sidecar repo
                        </p>
                        <p>
                            To contribute code, we're grateful for{' '}
                            <Link to="https://github.com/PostHog/sidecar">pull requests in the sidecar repo</Link>. To
                            make sure we can merge your work, we recommend talking about it with us in the Slack
                            channel. We give merch for cool features.
                        </p>

                        <h3 className="font-bold text-5xl mb-8 xl:mt-0">Feature ideas</h3>

                        <ul>
                            <li>Inserting data into a page automatically, so there's no need to right click</li>
                            <li>Inserting react components from PostHog into a page automatically</li>
                            <li>Editable product-specific templates</li>
                            <li>Community product-specific templates</li>
                            <li>Inserting react components into the toolbar automatically</li>
                            <li>Ability to update a user's data in the toolbar, and pushing it back into PostHog</li>
                            <li>
                                Ability to add customer user fields in the toolbar, and pushing it back into PostHog
                            </li>
                            <li>Ability to scrape a page and automatically update a user's profile</li>
                        </ul>
                    </div>
                </PostLayout>
            </div>
        </Layout>
    )
}

const query = graphql`
    {
        allSqueakRoadmap {
            nodes {
                beta_available
                complete
                dateCompleted
                title
                description
                team {
                    name
                }
                otherLinks
                githubPages {
                    title
                    html_url
                    number
                    closed_at
                    reactions {
                        hooray
                        heart
                        eyes
                        _1
                    }
                }
            }
        }
    }
`
