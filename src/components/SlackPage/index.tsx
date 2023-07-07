import React, { useEffect, useState } from 'react'
import { CallToAction } from '../CallToAction'
import Layout from '../Layout'
import { StaticImage } from 'gatsby-plugin-image'
import SearchBox from 'components/Search/SearchBox'
import { Link } from 'gatsby'
import { Help, Docs, Slack } from 'components/NotProductIcons'

export default function SlackPage(): JSX.Element {
    return (
        <Layout>
            <div className="max-w-6xl px-4 lg:px-8 xl:px-0 mx-auto md:py-12">
                <figure className="md:float-right">
                    <StaticImage
                        src="../../images/max.png"
                        alt="The stars in the sky"
                        placeholder="blurred"
                        className="max-w-[250px] md:max-w-xs"
                    />
                </figure>

                <h1>Our Slack community has moved</h1>
                <p>We're no longer offering official support through Slack, but we have lots of other resources.</p>

                <div className="bg-accent dark:bg-accent-dark px-8 py-6 rounded mt-8 mb-6 max-w-2xl">
                    <h3 className="mb-1 text-lg">Need help?</h3>
                    <ul className="p-0">
                        <li className="list-none">
                            <Link
                                to="/questions"
                                className="flex gap-2 relative px-2.5 py-2 mb-1 rounded border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all group"
                            >
                                <figure className="h-8 w-8 m-0 text-primary/60 dark:text-primary-dark/60">
                                    <Help />
                                </figure>
                                <div>
                                    <p className="m-0 text-red dark:text-yellow">Ask in the forums</p>
                                    <p className="m-0 text-sm text-primary/60 dark:text-primary-dark/60">
                                        posthog.com/questions
                                    </p>
                                </div>
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link
                                to="/docs"
                                className="flex gap-2 relative px-2.5 py-2 mb-1 rounded border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all group"
                            >
                                <figure className="h-8 w-8 m-0 text-primary/60 dark:text-primary-dark/60">
                                    <Docs />
                                </figure>
                                <div>
                                    <p className="m-0 text-red dark:text-yellow">Browse the docs</p>
                                    <p className="m-0 text-sm text-primary/60 dark:text-primary-dark/60">
                                        posthog.com/docs
                                    </p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>

                <p className="text-sm pb-8">
                    <strong>Need to report a bug or ask for help specific to your account?</strong>
                    <br />
                    <span className="opacity-60">Click the help menu in the app.</span>
                </p>
            </div>
        </Layout>
    )
}
