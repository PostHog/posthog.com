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

                <h1>Join our Slack community</h1>
                <p>
                    Chat with the PostHog team, 4,000+ other PostHog users, and best of all, Max AI (our custom
                    chatbot)!
                </p>

                <CallToAction href="https://posthog.com/slack-invite" type="primary" width="84">
                    Join us on Slack
                </CallToAction>

                <div className="bg-gray-accent-light px-8 py-6 rounded mt-8 mb-6 max-w-2xl">
                    <h3 className="mb-1 text-lg">Need help?</h3>
                    <p className="text-[15px] mb-4">
                        We can't offer official support through Slack, but we have lots of other resources.
                    </p>

                    <ul className="p-0">
                        <li className="list-none">
                            <Link
                                to="/questions"
                                className="flex gap-3 px-4 py-2 text-primary hover:text-primary rounded relative hover:bg-black/5 hover:scale-[1.005] hover:top-[-0.5px] active:scale-[1] active:top-[.5px]"
                            >
                                <figure className="h-8 w-8 mt-1 opacity-60">
                                    <Help />
                                </figure>
                                <div>
                                    <p className="m-0 text-red">Ask in the forums</p>
                                    <p className="m-0 text-sm opacity-60">posthog.com/questions</p>
                                </div>
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link
                                to="/questions"
                                className="flex gap-3 p-4 text-primary hover:text-primary rounded relative hover:bg-black/5 hover:scale-[1.005] hover:top-[-0.5px] active:scale-[1] active:top-[.5px]"
                            >
                                <figure className="h-8 w-8 mt-1 opacity-60">
                                    <Docs />
                                </figure>
                                <div>
                                    <p className="m-0 text-red">Browse the docs</p>
                                    <p className="m-0 text-sm opacity-60">posthog.com/docs</p>
                                </div>
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link
                                to="/questions"
                                className="flex gap-3 p-4 text-primary hover:text-primary rounded relative hover:bg-black/5 hover:scale-[1.005] hover:top-[-0.5px] active:scale-[1] active:top-[.5px]"
                            >
                                <figure className="h-8 w-8 mt-1 opacity-60">
                                    <Slack />
                                </figure>
                                <div>
                                    <p className="m-0 text-red">Ask MaxAI</p>
                                    <p className="m-0 text-sm opacity-60">Our very own chatbot in Slack</p>
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
