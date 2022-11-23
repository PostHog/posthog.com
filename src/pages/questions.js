import { Blockquote } from 'components/BlockQuote'
import Breadcrumbs from 'components/Breadcrumbs'
import { MdxCodeBlock } from 'components/CodeBlock'
import { Days } from 'components/CommunityQuestions/Question'
import { Check } from 'components/Icons/Icons'
import { InlineCode } from 'components/InlineCode'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import Icon from 'components/SupportImages/Icon'
import { ZoomImage } from 'components/ZoomImage'
import { motion } from 'framer-motion'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { createHubSpotContact } from 'lib/utils'
import React, { useState } from 'react'
import Scroll from 'react-scroll'
import { Form, Squeak } from 'squeak-react'
import SearchBox from 'components/Search/SearchBox'

const Element = Scroll.Element
const scroller = Scroll.scroller

const TopLink = ({ title, description, link, icon }) => {
    return (
        <li className="w-full">
            <a
                href={link}
                className="flex flex-col items-center text-center text-black hover:text-black opacity-80 hover:opacity-100 hover:bg-gray-accent/25 dark:hover:bg-gray-accent/10 px-4 py-5 h-full space-y-1"
            >
                <Icon className="w-6 h-6 mb-2 text-gray" name={icon} />
                <h3 className="font-bold text-base mb-0 leading-none">{title}</h3>
                <p className="text-sm font-semibold text-gray dark:text-white dark:text-opacity-75 mb-0">
                    {description}
                </p>
            </a>
        </li>
    )
}

const Guide = ({ title, link, icon }) => {
    return (
        <li className="border-b border-dashed border-gray first:border-l">
            <Link
                to={link}
                className="flex justify-start items-center w-full h-full text-black hover:text-black hover:bg-gray-accent/20 dark:hover:bg-gray-accent/10 opacity-80 hover:opacity-100 p-4 space-x-3"
            >
                <Icon className="w-6 h-6 text-gray" name={icon} />
                <h3 className="font-bold text-base mb-0">{title}</h3>
            </Link>
        </li>
    )
}

const Question = ({ question }) => {
    const replies = question.childrenReply
    const { avatar, name, ts, childMdx } = replies[0]

    const components = {
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: MdxCodeBlock,
        img: ZoomImage,
    }
    return (
        <li className="mt-9 first:mt-7">
            <div className="flex space-x-2">
                {avatar ? (
                    <GatsbyImage className="rounded-full overflow-hidden" image={getImage(avatar)} />
                ) : (
                    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.0782 41.0392H5.42978C4.03134 41.0392 3.1173 40.1642 3.09386 38.7736C3.07823 37.7814 3.07042 36.797 3.10948 35.8048C3.15636 34.6329 3.72668 33.7345 4.74228 33.1798C8.0782 31.3595 11.4299 29.5783 14.7659 27.7658C15.0081 27.633 15.1565 27.758 15.3362 27.8517C18.1878 29.3439 21.0942 29.4689 24.0626 28.2267C24.1485 28.1955 24.2423 28.1721 24.3126 28.1096C24.9298 27.5861 25.4845 27.7971 26.1251 28.1486C29.1173 29.7971 32.1331 31.4143 35.1487 33.0238C36.4534 33.7191 37.094 34.766 37.0706 36.2426C37.0549 37.0785 37.0706 37.9067 37.0706 38.7426C37.0628 40.1254 36.1409 41.0395 34.7659 41.0395H20.0783L20.0782 41.0392Z"
                            fill="#BFBFBC"
                        />
                        <path
                            d="M19.8359 27.0625C17.0859 26.9687 14.8047 25.6094 13.1251 23.1953C10.3751 19.2344 10.7032 13.6093 13.8516 10.0001C17.2735 6.08599 22.9452 6.10943 26.336 10.0469C29.9376 14.2345 29.711 20.8437 25.8126 24.6405C24.2188 26.1952 22.3126 27.0312 19.8362 27.0624L19.8359 27.0625Z"
                            fill="#BFBFBC"
                        />
                    </svg>
                )}
                <p className="text-black dark:text-white m-0 text-[13px] font-semibold opacity-50 flex space-x-2">
                    {name} <Days ts={ts} url={`/questions/${question.id}`} />
                </p>
            </div>
            <div className="artcle-content my-2">
                <p className="m-0">{childMdx.excerpt}</p>
            </div>
            <Link className="text-red hover:red m-0 text-[14px] font-semibold" to={`/questions/${question.id}`}>
                {replies.length - 1} response{replies.length - 1 === 1 ? '' : 's'}
            </Link>
        </li>
    )
}

export default function FAQ() {
    return (
        <Layout>
            <SEO title={'Questions - PostHog'} />
            <Breadcrumbs
                crumbs={[{ title: 'Questions' }]}
                darkModeToggle
                className="px-4 mt-4 sticky top-[-2px] z-10 bg-tan dark:bg-primary"
            />
            <section className="px-4">
                <div className="relative">
                    <div className="max-w-4xl mx-auto my-12  flex flex-col items-center justify-center">
                        <h1 className="text-center">Questions?</h1>
                        <h5 className="text-center">Search answers across posthog.com</h5>
                        <SearchBox filter="question" />
                        <p className="mt-3 text-sm text-gray text-center font-semibold">
                            Can't find your answer?{' '}
                            <button
                                className="text-red"
                                onClick={() => scroller.scrollTo('squeak-bottom', { offset: -100, smooth: true })}
                            >
                                Ask a question
                            </button>
                        </p>
                    </div>

                    <span className="absolute bottom-[calc(-170px-3rem)] hidden mdlg:block md:-left-24 lg:-left-20 z-[-10] transition-all">
                        <StaticImage
                            src="../../contents/images/search-hog-1.png"
                            alt="This hog has an answer"
                            height={512}
                            width={440}
                            placeholder="blurred"
                            className="h-full xl:max-w-none ml-0 md:ml-0"
                        />
                    </span>

                    <span className="absolute bottom-[calc(-101px-3rem)] hidden mdlg:block md:-right-40 lg:-right-36 xl:-right-24 2xl:-right-14 z-[-20] transition-all">
                        <StaticImage
                            src="../../contents/images/search-hog-2.png"
                            alt="This hog has an answer"
                            height={407}
                            width={449}
                            placeholder="blurred"
                            className="h-full xl:max-w-none ml-0 md:ml-0"
                        />
                    </span>
                </div>

                <div className="border-t border-b border-dashed border-gray mb-12 -mx-4">
                    <div className="max-w-4xl w-full mx-auto">
                        <ol className="list-none m-0 p-0 md:grid md:grid-cols-5 justify-center divide-y md:divide-y-0 md:divide-x divide-dashed divide-gray">
                            <TopLink
                                title="Self-hosting"
                                description="Deployment options"
                                link="/docs/self-host#deployment-options"
                                icon="selfHost"
                            />
                            <TopLink
                                title="Partners"
                                description="Hosting & support"
                                link="/partners"
                                icon="partners"
                            />
                            <TopLink title="FAQ" description=" " link="/faq" icon="faq2" />
                            <TopLink
                                title="Report an issue"
                                description="via GitHub"
                                link="https://github.com/PostHog/posthog/issues"
                                icon="issue2"
                            />
                            <TopLink title="API" description="Apps, data I/O" link="/docs/api" icon="api" />
                        </ol>
                    </div>
                </div>

                <div className="max-w-4xl w-full mx-auto">
                    <h3>Product manuals</h3>
                </div>

                <div className="max-w-4xl w-full mx-auto">
                    <ol className="list-none m-0 p-0 grid md:grid-flow-col grid-cols-2 md:grid-cols-4 md:grid-rows-3 divide-x divide-dashed divide-gray justify-center border-t border-r border-dashed border-gray">
                        <Guide title="Trends" link="/docs/user-guides/trends" icon="trendz" />
                        <Guide title="Funnels" link="/docs/user-guides/funnels" icon="funnels" />
                        <Guide title="User paths" link="/docs/user-guides/paths" icon="user-paths" />
                        <Guide
                            title="Correlation analysis"
                            link="/docs/user-guides/correlation"
                            icon="correlation-analysis"
                        />
                        <Guide title="Session recording" link="/docs/user-guides/recordings" icon="session-recording" />
                        <Guide title="Feature flags" link="/docs/user-guides/feature-flags" icon="feature-flags" />
                        <Guide
                            title="Experimentation"
                            link="/docs/user-guides/experimentation"
                            icon="experimentation"
                        />
                        <Guide title="Heatmaps" link="/docs/user-guides/toolbar#toolbar-features" icon="heatmaps" />
                        <Guide title="Apps" link="/docs/apps" icon="apps" />
                        <Guide title="Toolbar" link="/docs/user-guides/toolbar" icon="toolbar" />
                        <Guide title="Insights" link="/docs/user-guides/insights" icon="insights" />
                        <Guide
                            title="Group Analytics"
                            link="/docs/user-guides/group-analytics"
                            icon="group-analytics"
                        />
                    </ol>
                    <a
                        href="/using-posthog"
                        className="border border-t-0 border-dashed border-gray p-3 text-lg font-semibold flex justify-center hover:bg-gray-accent/20 dark:hover:bg-gray-accent-dark"
                    >
                        View all (23)
                    </a>
                </div>

                <div className="max-w-4xl mx-auto my-12">
                    <h3>Recent questions</h3>
                    <Element name="squeak-top" />
                    <Squeak
                        onSignUp={(user) => createHubSpotContact(user)}
                        onSubmit={(_values, formType) =>
                            formType === 'question' && scroller.scrollTo('squeak-top', { smooth: true })
                        }
                        limit={20}
                        slug={null}
                        apiHost="https://squeak.cloud"
                        organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626"
                    />
                    <Element name="squeak-bottom" />
                </div>
            </section>
        </Layout>
    )
}
