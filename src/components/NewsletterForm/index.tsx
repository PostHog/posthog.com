import React, { useState } from 'react'
import { CallToAction } from '../CallToAction'
import { mergeClassList } from '../../lib/utils'

import emailSignup from './images/email-signup.svg'

export const NewsletterForm = ({
    compact = false,
    bgColor = '#08042f',
    className = '',
}: {
    compact?: boolean
    bgColor?: string
    className?: string
}): JSX.Element => {
    const [email, setEmail] = useState('')
    const classList = mergeClassList('mx-auto w-full md:w-auto pt-4 pb-6 relative z-10', className)

    return compact ? (
        <div className="w-full mx-auto my-12 text-center">
            <div className="flex w-full h-full p-1 border-t border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark">
                <div className={classList}>
                    <div className="flex flex-col md:flex-row space-x-4 items-center">
                        <figure className="shrink-0 grow-0 basis-12 m-0">
                            <img src={emailSignup} alt="Sign up for mailing list" className="block h-12 mb-0" />
                        </figure>

                        <span className="flex flex-col space-x-2 md:flex-row flex-grow font-bold md:justify-start md:text-left">
                            <span className="text-lg">Email updates from PostHog?</span>{' '}
                            <span className="text-sm md:text-lg">Where do I sign up?!</span>
                        </span>
                    </div>
                    <div className="md:ml-16 mt-2 md:mt-0">
                        <form
                            action="https://posthog.us19.list-manage.com/subscribe/post?u=292207b434c26e77b45153b96&id=97194afa0a"
                            method="post"
                            id="mc-embedded-subscribe-form"
                            name="mc-embedded-subscribe-form"
                            className="validate w-full flex flex-col md:flex-row items-center mb-0 space-y-2 md:space-y-0 md:space-x-2"
                            target="_blank"
                            noValidate
                        >
                            <input
                                type="email"
                                name="EMAIL"
                                className="block w-full px-4 py-2 flex-1 bg-gray-accent-light dark:bg-gray-accent-dark rounded-md border-0 text-lg font-bold md:text-[18px] md:text-left outline-none text-center max-w-sm"
                                id="mce-EMAIL"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@address.com"
                                value={email}
                                required
                            />
                            {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                                <input
                                    type="text"
                                    name="b_292207b434c26e77b45153b96_97194afa0a"
                                    tabIndex={-1}
                                    defaultValue
                                />
                            </div>
                            <input
                                type="submit"
                                className="bg-primary text-white text-base shrink-0 grow-0 basis-auto font-bold lg:mt-0 border-none cursor-pointer px-5 py-3 md:py-2 rounded-full w-full md:w-auto"
                                value="Subscribe"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="w-11/12 max-w-4xl mx-auto mb-48">
            <div className="bg-blue text-white w-full h-full p-1 rounded-xl">
                <div
                    className="rounded-lg flex justify-between flex-col lg:flex-row p-8 relative z-10"
                    style={{ backgroundColor: bgColor }}
                >
                    <div className="w-full lg:w-2/3 lg:mr-4 text-white">
                        <h5 className="text-white text-3xl gosha">Your inbox but better...</h5>
                        <p className="opacity-80 text-sm">
                            Our newsletter keeps you up to date on what great things we are doing here at PostHog, and
                            trust me you don’t want to miss a thing.
                        </p>
                        <p className="opacity-80 mt-2 text-sm">
                            Don't worry, you can unsubscribe at any time, no hard feelings.
                        </p>
                    </div>

                    <div className="w-full lg:w-1/3 lg:ml-4">
                        <form
                            action="https://posthog.us19.list-manage.com/subscribe/post?u=292207b434c26e77b45153b96&id=97194afa0a"
                            method="post"
                            id="mc-embedded-subscribe-form"
                            name="mc-embedded-subscribe-form"
                            className="validate"
                            target="_blank"
                            noValidate
                        >
                            <div id="mc_embed_signup_scroll">
                                <strong className="text-white gosha text-lg">Join our newsletter</strong>
                                <label className="text-white opacity-80 mt-3 block" htmlFor="mce-EMAIL">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="EMAIL"
                                    className="block w-full py-2 px-3 bg-white text-gray-900 rounded my-1"
                                    id="mce-EMAIL"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email address"
                                    value={email}
                                    required
                                />
                                {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                                <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                                    <input
                                        type="text"
                                        name="b_292207b434c26e77b45153b96_97194afa0a"
                                        tabIndex={-1}
                                        defaultValue
                                    />
                                </div>
                                <div className="clear">
                                    <CallToAction
                                        type="primary"
                                        icon="check"
                                        width="full"
                                        className="text-white border-white border-2 mt-2 hover:bg-white hover:bg-opacity-20"
                                        submit={true}
                                    >
                                        Join the List
                                    </CallToAction>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
