import React from 'react'
import { Link } from 'gatsby'
import footerLogo from '../../images/posthog-logo-footer.svg'
import Contributors from './Contributors'
import { Edit, Issue } from 'components/Icons/Icons'

const Divider = () => {
    return (
        <hr className="border-t-2 border-b-0 border-l-0 border-r-0 border-opacity-30 border-gray-accent-light  border-dashed my-10 md:w-screen w-[calc(100%+4rem)] -ml-8" />
    )
}

export default function Footer({ contributors, filePath, title }) {
    return (
        <footer className="text-white">
            <div className="bg-almost-black dark:bg-gray-accent-dark max-w-screen-2xl mx-auto rounded-lg relative overflow-hidden">
                <div className="py-14 2xl:max-w-[800px] max-w-full md:max-w-[calc(100%-224px-6rem)] xl:max-w-[650px] w-full xl:mx-auto ml-auto md:border-l border-opacity-30 border-gray-accent-light border-dashed px-8 md:box-content">
                    <h2 className="text-white">Reach out</h2>
                    <p>
                        If you need help on any of the above, feel free to create an issue on{' '}
                        <a href="https://github.com/PostHog/posthog">our repo</a>, or{' '}
                        <a href="/slack">join our Slack</a> where a member of our team can assist you! Chances are that
                        if you have a problem or question, someone else does too - so please don't hesitate to create a
                        new issue or ask us a question.
                    </p>
                    <div className="relative">
                        <Divider />
                        {
                            // In order to show contributors, a valid GitHub API key
                            // must be added as an environment variable GITHUB_API_KEY.
                            // If no contributors are found, this section shows nothing.
                            contributors && (
                                <div className="my-10">
                                    <h3 className="text-base text-white">Contributors</h3>
                                    <Contributors
                                        className="list-none m-0 p-0 flex space-x-2 mt-2 flex-wrap"
                                        contributors={contributors}
                                    />
                                </div>
                            )
                        }
                        <Divider />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-base text-white">Docs</h3>
                            <ul className="m-0 p-0 list-none flex flex-col space-y-2">
                                <li>
                                    <a
                                        className="text-white hover:text-white flex items-center space-x-1"
                                        href={`https://github.com/PostHog/posthog.com/tree/master/contents${filePath}`}
                                    >
                                        <Edit />
                                        <span>Edit this page</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="text-white hover:text-white flex items-center space-x-1"
                                        href={`https://github.com/PostHog/posthog.com/issues/new?title=Docs feedback on: ${title}&body=**Issue with: ${filePath}**\n\n`}
                                    >
                                        <Issue />
                                        <span>Raise an issue</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-base text-white">Community & support</h3>
                            <ul className="m-0 p-0 list-none">
                                <li>
                                    Join our{' '}
                                    <Link className="text-yellow hover:text-yellow" to="/slack">
                                        Slack community
                                    </Link>
                                </li>
                                <li>
                                    Add a{' '}
                                    <a
                                        className="text-yellow hover:text-yellow"
                                        href="https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement&template=feature_request.md&title="
                                    >
                                        feature request
                                    </a>
                                </li>
                                <li>
                                    Email us at{' '}
                                    <a className="text-yellow hover:text-yellow" href="mailto:hey@posthog.com">
                                        hey@posthog.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
