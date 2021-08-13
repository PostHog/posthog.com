import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import footerLogo from '../../images/posthog-logo-footer.svg'

export default function Footer({ contributors, filePath, title }) {
    return (
        <footer className="text-white">
            <div className="bg-[#371A51] px-4">
                <div className="py-14 max-w-[650px] 2xl:max-w-[800px] mx-auto relative">
                    <img className="absolute -top-6" src={footerLogo} />
                    <h2>Reach out</h2>
                    <p>
                        If you need help on any of the above, feel free to create an issue on our repo, or join our
                        Slack where a member of our team can assist you! Chances are that if you have a problem or
                        question, someone else does too - so please don't hesitate to create a new issue or ask us a
                        question.
                    </p>
                    <div className="my-10">
                        <h3 className="text-base">Contributors</h3>
                        <ul className="list-none m-0 p-0 flex space-x-2 mt-2 flex-wrap">
                            {contributors.map((contributor, index) => {
                                const { avatar, url, username } = contributor
                                const image = getImage(avatar)
                                return (
                                    <li key={index}>
                                        <a href={url}>
                                            <GatsbyImage
                                                className="rounded-full max-w-[37px]"
                                                image={image}
                                                alt={username}
                                                title={username}
                                            />
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-base">Docs</h3>
                            <ul className="m-0 p-0 list-none flex flex-col space-y-2">
                                <li>
                                    <a
                                        className="text-white hover:text-white flex items-center space-x-1"
                                        href={`https://github.com/PostHog/posthog.com/tree/master/contents${filePath}`}
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M11.086 4.06683L13.8881 6.8689L14.5567 6.20022L11.7547 3.39816L11.086 4.06683Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M3.62558 11.5357L6.42725 14.3381L13.4016 7.3658L10.5999 4.56334L3.62558 11.5357Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M15.6623 5.12968C16.1126 4.67936 16.1126 3.95886 15.6623 3.50855L14.4914 2.33773C14.0411 1.88742 13.2756 1.88742 12.8703 2.33773L12.2849 2.92314L15.1219 5.76012L15.6623 5.12968Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M2.01767 15.487C1.97263 15.6221 2.01767 15.7572 2.10773 15.8472C2.15276 15.8923 2.24282 15.9373 2.33289 15.9373C2.37792 15.9373 2.42295 15.9373 2.46798 15.9373L5.84533 14.7214L3.23351 12.1096L2.01767 15.487Z"
                                                fill="white"
                                            />
                                        </svg>
                                        <span>Edit this page</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="text-white hover:text-white flex items-center space-x-1"
                                        href={`https://github.com/PostHog/posthog.com/issues/new?title=Docs feedback on: ${title}&body=**Issue with: ${filePath}**\n\n`}
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.34524 13.071C8.53769 13.071 7.88086 13.7281 7.88086 14.5356C7.88086 15.3432 8.53769 16 9.34524 16C10.1528 16 10.8098 15.3432 10.8098 14.5356C10.8098 13.7281 10.1528 13.071 9.34524 13.071Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M8.60145 12.5085H10.0893C10.1872 12.5085 10.272 12.4405 10.2929 12.3447L12.1858 3.75563C12.2001 3.69087 12.1828 3.62324 12.139 3.57335L10.8206 2.0711C10.7809 2.02588 10.7239 2 10.6638 2H8.0269C7.96681 2 7.90979 2.02588 7.87007 2.0711L6.55174 3.57335C6.50794 3.62324 6.49063 3.69087 6.50489 3.75563L8.39778 12.3447C8.41876 12.4405 8.50349 12.5085 8.60145 12.5085Z"
                                                fill="white"
                                            />
                                        </svg>

                                        <span>Raise an issue</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-base">Community & support</h3>
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
